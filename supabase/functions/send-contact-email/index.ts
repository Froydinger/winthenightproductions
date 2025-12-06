import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Input validation
const validateContactInput = (data: unknown): { valid: true; data: { name: string; email: string; message: string } } | { valid: false; error: string } => {
  if (typeof data !== 'object' || data === null) {
    return { valid: false, error: 'Invalid request body' };
  }

  const { name, email, message } = data as Record<string, unknown>;

  // Validate name
  if (typeof name !== 'string' || name.trim().length === 0) {
    return { valid: false, error: 'Name is required' };
  }
  if (name.length > 100) {
    return { valid: false, error: 'Name must be less than 100 characters' };
  }

  // Validate email
  if (typeof email !== 'string' || email.trim().length === 0) {
    return { valid: false, error: 'Email is required' };
  }
  if (email.length > 255) {
    return { valid: false, error: 'Email must be less than 255 characters' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  // Validate message
  if (typeof message !== 'string' || message.trim().length === 0) {
    return { valid: false, error: 'Message is required' };
  }
  if (message.length > 5000) {
    return { valid: false, error: 'Message must be less than 5000 characters' };
  }

  return {
    valid: true,
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    }
  };
};

// HTML escape function to prevent HTML injection
const escapeHtml = (text: string): string => {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Validate input
    const validation = validateContactInput(body);
    if (!validation.valid) {
      console.error("Validation error:", validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, message } = validation.data;

    // Escape HTML to prevent injection in email
    const safeName = escapeHtml(name);
    const safeMessage = escapeHtml(message);

    console.log("Processing contact form submission from:", email);

    // Send email to j@froydinger.com
    const emailResponse = await resend.emails.send({
      from: "Win The Night <onboarding@resend.dev>",
      to: ["j@froydinger.com"],
      replyTo: email,
      subject: `New Contact Form Message from ${safeName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-contact-email function:", errorMessage);
    return new Response(
      JSON.stringify({ error: "Failed to send message. Please try again later." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
