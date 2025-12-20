import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const RESEND_API_URL = "https://api.resend.com/emails";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  fullName?: string;
  signupDate: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getDisplayName(email: string, fullName?: string): string {
  if (fullName && fullName.trim()) {
    return fullName.trim();
  }
  // Extract username from email (before @)
  return email.split('@')[0];
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-welcome-email function invoked");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, fullName, signupDate }: WelcomeEmailRequest = await req.json();
    
    console.log("Processing welcome email for:", email);

    const nameOrEmail = getDisplayName(email, fullName);
    const formattedDate = formatDate(signupDate);

    const subject = `🚀 Your Financial Journey Starts Here, ${nameOrEmail}!`;
    
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to LoanPal</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to LoanPal! 🎉</h1>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px;">Hi <strong>${nameOrEmail}</strong>,</p>
    
    <p style="font-size: 16px;">Welcome to LoanPal! 👋 We're thrilled to have you join us on <strong>${formattedDate}</strong>.</p>
    
    <p style="font-size: 16px;">From today forward, you have a smart, AI-powered financial partner on your side. Whether you are looking for your first loan or planning your next big milestone, we are here to make the process transparent, fast, and stress-free.</p>
    
    <h2 style="color: #667eea; font-size: 20px; margin-top: 25px;">Here is what you can do right now:</h2>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 10px 0; font-size: 15px;">💰 <strong>Smart EMI Calculations:</strong> Get instant, accurate monthly payment estimates using our dynamic calculator.</p>
      
      <p style="margin: 10px 0; font-size: 15px;">🤖 <strong>AI-Powered Insights:</strong> Let our AI assess your profile and show you the best available loan offers instantly.</p>
      
      <p style="margin: 10px 0; font-size: 15px;">⚡ <strong>Fast Disbursement:</strong> Once approved, get funds in your account in as little as 2 to 24 hours.</p>
      
      <p style="margin: 10px 0; font-size: 15px;">🔒 <strong>Secure & Transparent:</strong> Your data is protected by 256-bit SSL encryption and follows strict RBI digital lending guidelines.</p>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://loanpal.lovable.app/dashboard" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">Go to my Dashboard →</a>
    </div>
    
    <p style="font-size: 14px; color: #666; margin-top: 25px;">If you have any questions, our support team is available Monday to Saturday, 9:00 AM to 7:00 PM IST. You can also reach us directly at <a href="mailto:thakurneerajkumar017@gmail.com" style="color: #667eea;">thakurneerajkumar017@gmail.com</a>.</p>
    
    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 25px 0;">
    
    <p style="font-size: 15px; margin-bottom: 5px;">Let's build your financial future together,</p>
    <p style="font-size: 16px; font-weight: bold; color: #667eea; margin-top: 5px;">The LoanPal Team</p>
    <p style="font-size: 13px; color: #888; margin-top: 0;">Your AI Financial Assistant 🤖</p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #888; font-size: 12px;">
    <p>© ${new Date().getFullYear()} LoanPal. All rights reserved.</p>
  </div>
</body>
</html>
    `;

    console.log("Sending welcome email to:", email);

    const emailResponse = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "LoanPal <onboarding@resend.dev>",
        to: [email],
        subject: subject,
        html: htmlBody,
      }),
    });

    const emailData = await emailResponse.json();
    
    if (!emailResponse.ok) {
      console.error("Resend API error:", emailData);
      throw new Error(emailData.message || "Failed to send email");
    }

    console.log("Email sent successfully:", emailData);

    return new Response(JSON.stringify({ success: true, data: emailData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
