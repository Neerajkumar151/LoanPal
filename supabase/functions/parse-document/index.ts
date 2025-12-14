import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { filePath, documentType, fileName } = await req.json();
    
    console.log(`Parsing document: ${fileName}, type: ${documentType}, path: ${filePath}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const LovableApiKey = Deno.env.get('Lovable_API_KEY');

    if (!LovableApiKey) {
      throw new Error('Lovable_API_KEY is not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Download the file from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('documents')
      .download(filePath);

    if (downloadError) {
      console.error('Error downloading file:', downloadError);
      throw new Error(`Failed to download file: ${downloadError.message}`);
    }

    // Convert file to base64 safely without spreading large arrays (avoids call stack overflow)
    const arrayBuffer = await fileData.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64Data = btoa(binary);

    // Determine MIME type
    const extension = fileName.split('.').pop()?.toLowerCase();
    let mimeType = 'application/octet-stream';
    if (extension === 'pdf') mimeType = 'application/pdf';
    else if (extension === 'jpg' || extension === 'jpeg') mimeType = 'image/jpeg';
    else if (extension === 'png') mimeType = 'image/png';
    else if (extension === 'doc') mimeType = 'application/msword';
    else if (extension === 'docx') mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    // Create prompt based on document type
    let prompt = '';
    if (documentType === 'salary_slip') {
      prompt = `Analyze this salary slip document and extract the following information in JSON format:
{
  "extractedName": "Full name of the employee",
  "extractedSalary": numeric value of net salary/take home pay (just the number, no currency symbols),
  "confidence": "high" | "medium" | "low",
  "rawDetails": "Brief summary of what you found"
}

If the document is not a salary slip or the data cannot be extracted, return:
{
  "extractedName": null,
  "extractedSalary": null,
  "confidence": "low",
  "rawDetails": "Explanation of why extraction failed"
}

Only respond with valid JSON, no markdown or extra text.`;
    } else if (documentType === 'credit_score') {
      prompt = `Analyze this credit score/CIBIL report document and extract the following information in JSON format:
{
  "extractedName": "Full name of the person",
  "creditScore": numeric credit score value (just the number, typically 300-900),
  "confidence": "high" | "medium" | "low",
  "rawDetails": "Brief summary of what you found"
}

If the document is not a credit report or the data cannot be extracted, return:
{
  "extractedName": null,
  "creditScore": null,
  "confidence": "low",
  "rawDetails": "Explanation of why extraction failed"
}

Only respond with valid JSON, no markdown or extra text.`;
    }

    console.log('Calling Lovable AI Gateway for document analysis...');

    // Call Lovable AI Gateway with gemini-2.5-flash model
    const aiResponse = await fetch('https://ai.gateway.Lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: `data:${mimeType};base64,${base64Data}`,
                },
              },
              {
                type: 'text',
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('Lovable AI error:', errorText);
      
      if (aiResponse.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      if (aiResponse.status === 402) {
        throw new Error('AI credits exhausted. Please add credits to continue.');
      }
      throw new Error(`AI API error: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    console.log('AI response received');

    const responseText = aiData.choices?.[0]?.message?.content || '';
    
    // Parse the JSON response
    let parsedData;
    try {
      // Clean up the response (remove markdown code blocks if present)
      const cleanedResponse = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsedData = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', responseText);
      parsedData = {
        extractedName: null,
        extractedSalary: null,
        creditScore: null,
        confidence: 'low',
        rawDetails: 'Failed to parse AI response',
      };
    }

    console.log('Parsed document data:', parsedData);

    return new Response(JSON.stringify({
      success: true,
      documentType,
      parsedData: {
        extractedName: parsedData.extractedName || null,
        extractedSalary: parsedData.extractedSalary || null,
        creditScore: parsedData.creditScore || null,
        confidence: parsedData.confidence || 'low',
        rawDetails: parsedData.rawDetails || '',
      },
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in parse-document function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage,
      parsedData: null,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
