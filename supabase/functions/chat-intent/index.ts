import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface IntentRequest {
  userMessage: string;
  conversationHistory: { role: string; content: string }[];
  applicationContext?: {
    hasExistingApplication: boolean;
    applicationStatus?: string;
    rejectionReason?: string;
    loanAmount?: number;
    creditScore?: number;
  };
  currentStep: string;
  isCollectingField: boolean;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userMessage, conversationHistory, applicationContext, currentStep, isCollectingField }: IntentRequest = await req.json();
    
    const Lovable_API_KEY = Deno.env.get("Lovable_API_KEY");
    if (!Lovable_API_KEY) {
      throw new Error("Lovable_API_KEY is not configured");
    }

    const systemPrompt = `You are an intent classifier for a loan assistant chatbot. Your job is to understand the user's intent and provide a structured response.

CONTEXT:
- Current chat step: ${currentStep}
- Is collecting form field: ${isCollectingField}
- User has existing application: ${applicationContext?.hasExistingApplication || false}
- Application status: ${applicationContext?.applicationStatus || 'none'}
- Rejection reason: ${applicationContext?.rejectionReason || 'none'}

INTENT CATEGORIES:
1. "greeting" - User is greeting or starting conversation
2. "apply_loan" - User wants to apply for a new loan
3. "check_status" - User wants to know their application status
4. "rejection_reason" - User wants to know why their loan was rejected
5. "application_history" - User wants to see their past applications
6. "loan_info" - User has general questions about loans, EMI, interest rates
7. "form_response" - User is responding to a form question (providing name, amount, tenure, income)
8. "document_query" - User is asking about documents or upload process
9. "help" - User needs help or guidance
10. "continue_application" - User wants to continue an existing/pending application
11. "other" - Anything else

RESPONSE FORMAT (JSON only):
{
  "intent": "<intent_category>",
  "confidence": <0.0-1.0>,
  "suggestedResponse": "<natural conversational response based on intent and context>",
  "shouldContinueFlow": <true if the user is cooperating with the current flow, false if they're asking something else>
}

IMPORTANT RULES:
- If the user is in the middle of providing form data (isCollectingField=true) and their message looks like a form response, classify as "form_response" with shouldContinueFlow=true
- If user asks about rejection but has no rejected application, acknowledge this in suggestedResponse
- If user asks about status but has no application, inform them politely
- Be conversational and friendly in suggestedResponse
- If the user has a rejected application and asks "why", include the actual rejection reason in the response
- Never repeat the same onboarding message; be context-aware`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.slice(-6).map(m => ({ role: m.role, content: m.content })),
      { role: "user", content: userMessage }
    ];

    const response = await fetch("https://ai.gateway.Lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Lovable_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log("AI response:", content);
    
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      console.error("Failed to parse AI response:", content);
      parsed = {
        intent: "other",
        confidence: 0.5,
        suggestedResponse: "I'm here to help you with your loan application. How can I assist you today?",
        shouldContinueFlow: true
      };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("chat-intent error:", e);
    return new Response(JSON.stringify({ 
      error: e instanceof Error ? e.message : "Unknown error",
      intent: "other",
      confidence: 0,
      suggestedResponse: "I'm here to help! Would you like to apply for a loan or do you have questions about your existing application?",
      shouldContinueFlow: true
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
