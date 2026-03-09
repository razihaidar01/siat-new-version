import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, email, interest, message } = await req.json();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const CONTACT_EMAIL = Deno.env.get("CONTACT_EMAIL") || "siatgroup.sws@gmail.com";

    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "Email not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const htmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <h2 style="color:#1a56db;border-bottom:2px solid #1a56db;padding-bottom:10px;">New Contact Submission — SIAT</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;font-weight:bold;color:#333;">Name:</td><td style="padding:8px 0;">${name}</td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;color:#333;">Phone:</td><td style="padding:8px 0;">${phone}</td></tr>
          ${email ? `<tr><td style="padding:8px 0;font-weight:bold;color:#333;">Email:</td><td style="padding:8px 0;">${email}</td></tr>` : ""}
          <tr><td style="padding:8px 0;font-weight:bold;color:#333;">Interest:</td><td style="padding:8px 0;">${interest || "N/A"}</td></tr>
          ${message ? `<tr><td style="padding:8px 0;font-weight:bold;color:#333;">Message:</td><td style="padding:8px 0;">${message}</td></tr>` : ""}
        </table>
        <p style="margin-top:20px;color:#666;font-size:12px;">Sent from siat.in contact form</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "SIAT Contact <onboarding@resend.dev>",
        to: [CONTACT_EMAIL],
        subject: `New Contact: ${name} — ${interest || "General"}`,
        html: htmlBody,
      }),
    });

    const data = await res.json();

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
