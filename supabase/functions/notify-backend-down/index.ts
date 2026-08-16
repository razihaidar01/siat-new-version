import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ALERT_EMAIL = "info.razihaidar@gmail.com";
const COOLDOWN_MS = 15 * 60 * 1000;

// Per-instance throttle so a burst of visitors does not send a burst of emails
let lastSentAt = 0;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }

    const context = typeof body.context === "string" ? body.context.slice(0, 200) : "unknown";
    const detail = typeof body.detail === "string" ? body.detail.slice(0, 500) : "";
    const pageUrl = typeof body.pageUrl === "string" ? body.pageUrl.slice(0, 300) : "";
    const forceTest = body.test === true;

    // Independently confirm the database really is unreachable before alerting
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
    let dbReachable = false;
    let dbStatus = "no-response";

    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      try {
        const probe = await fetch(
          `${SUPABASE_URL}/rest/v1/certificates?select=id&limit=1`,
          {
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            },
          },
        );
        dbStatus = String(probe.status);
        dbReachable = probe.ok;
      } catch (e) {
        dbStatus = `fetch-failed: ${(e as Error).message}`;
      }
    }

    if (dbReachable && !forceTest) {
      return new Response(
        JSON.stringify({ alerted: false, reason: "database_healthy", dbStatus }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const now = Date.now();
    if (!forceTest && now - lastSentAt < COOLDOWN_MS) {
      return new Response(
        JSON.stringify({ alerted: false, reason: "cooldown" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "Email not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="color:#b91c1c;margin:0 0 12px;">⚠️ SIAT backend is unreachable</h2>
        <p style="color:#333;line-height:1.6;">
          A visitor action failed because the database did not respond. If the cloud backend is paused,
          please activate it so certificate verification keeps working.
        </p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#333;">
          <tr><td style="padding:6px 0;font-weight:bold;">Where:</td><td style="padding:6px 0;">${context}</td></tr>
          <tr><td style="padding:6px 0;font-weight:bold;">Page:</td><td style="padding:6px 0;">${pageUrl}</td></tr>
          <tr><td style="padding:6px 0;font-weight:bold;">DB probe:</td><td style="padding:6px 0;">${dbStatus}</td></tr>
          ${detail ? `<tr><td style="padding:6px 0;font-weight:bold;">Detail:</td><td style="padding:6px 0;">${detail}</td></tr>` : ""}
          <tr><td style="padding:6px 0;font-weight:bold;">Time (IST):</td><td style="padding:6px 0;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td></tr>
        </table>
        <p style="margin-top:20px;color:#666;font-size:12px;">Automated alert from siat.in — you will not get another for 15 minutes.</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "SIAT Alerts <onboarding@resend.dev>",
        to: [ALERT_EMAIL],
        subject: "⚠️ SIAT database unreachable — activate the cloud",
        html,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error(`Resend failed [${res.status}]:`, JSON.stringify(data));
      return new Response(
        JSON.stringify({ alerted: false, status: res.status, details: data }),
        { status: res.status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    lastSentAt = now;
    return new Response(JSON.stringify({ alerted: true, data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("notify-backend-down error:", (error as Error).message);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
