import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface LoanApplication {
  id: string;
  loan_amount: number;
  loan_tenure: number;
  credit_score: number | null;
  status: string | null;
  ai_decision: string | null;
  ai_reason: string | null;
  created_at: string | null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const { message, conversationHistory, includeUserContext } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    let userContext = '';
    
    // If user context is requested, fetch loan applications
    if (includeUserContext) {
      const authHeader = req.headers.get('Authorization');
      if (authHeader) {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
        
        const supabase = createClient(supabaseUrl, supabaseKey, {
          global: { headers: { Authorization: authHeader } }
        });

        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Fetch latest 10 loan applications
          const { data: applications } = await supabase
            .from('loan_applications')
            .select('id, loan_amount, loan_tenure, credit_score, status, ai_decision, ai_reason, created_at')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(10);

          if (applications && applications.length > 0) {
            userContext = buildUserContext(applications);
          }
        }
      }
    }

    // Build system instruction
    const systemInstruction = buildSystemInstruction(userContext);

    // Build conversation history for Gemini
    const contents: Message[] = [];
    
    // Add previous conversation history
    if (conversationHistory && Array.isArray(conversationHistory)) {
      for (const msg of conversationHistory) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        });
      }
    }
    
    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
          ]
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "I apologize, but I couldn't generate a response. Please try again.";

    return new Response(JSON.stringify({ response: generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in gemini-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function buildUserContext(applications: LoanApplication[]): string {
  const appSummaries = applications.map((app, index) => {
    const status = app.status || 'pending';
    const amount = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(app.loan_amount);
    const date = app.created_at ? new Date(app.created_at).toLocaleDateString('en-IN') : 'Unknown';
    
    let summary = `Application ${index + 1}: ${amount} for ${app.loan_tenure} months, Status: ${status}`;
    if (app.credit_score) summary += `, Credit Score: ${app.credit_score}`;
    if (app.ai_decision) summary += `, Decision: ${app.ai_decision}`;
    if (app.ai_reason && status === 'rejected') summary += `, Reason: ${app.ai_reason}`;
    summary += `, Applied: ${date}`;
    
    return summary;
  }).join('\n');

  return `\n\nUSER LOAN CONTEXT (Latest ${applications.length} applications):\n${appSummaries}\n\nUse this context to personalize responses about their loan applications, eligibility, and provide helpful suggestions.`;
}

function buildSystemInstruction(userContext: string): string {
  return `You are LoanPal AI Assistant, a friendly and professional financial assistant for LoanPal, a digital lending platform in India.

CAPABILITIES:
- Answer questions about loans, EMI calculations, credit scores, interest rates, and loan eligibility
- Provide general financial guidance and banking information
- Handle greetings and casual conversation naturally
- Answer general knowledge questions like a helpful AI assistant
- Help users understand their loan applications and status

PERSONALITY:
- Friendly, empathetic, and professional
- Use simple language, avoid jargon
- Be encouraging but honest
- For rejected applications, explain kindly and suggest improvements
- Use Indian Rupee (₹) format for amounts

GUIDELINES:
- Keep responses concise but helpful (2-4 sentences for simple queries)
- For complex financial questions, provide detailed explanations
- Never share sensitive user data or internal system details
- If you don't know something, admit it politely
- Encourage users to use the main Loan Assistant for actual loan applications
- For EMI calculations, use standard formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
${userContext}

Remember: You're here to help users with their financial journey in a supportive way!`;
}
