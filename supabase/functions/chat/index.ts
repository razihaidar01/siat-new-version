import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SIAT_SYSTEM_PROMPT = `You are SIAT's AI Assistant — a helpful, friendly, and knowledgeable support agent for SIAT (siat.in), Bihar's leading Training, IT & Consultancy organization based in Saharsa, Bihar.

You help visitors with questions about:

1. **Training Institute**: Mobile Repairing (3-6 months), AC Repairing (3-6 months), Laptop Repairing (4-6 months), CCTV Installation (2-3 months). All courses include hands-on practical training, ISO-verified certificates with QR code, and placement support.

2. **RH Software** (IT Division): Website development, app development (Android/iOS), AI development, software solutions, ERP/CRM. Bihar's leading IT company.

3. **Consultancy Services**: MBBS admission guidance, B.Tech/BCA/Nursing admission, ISO 9001:2015 certification, MSME registration, Bihar Student Credit Card support.

4. **Government Projects**: PMKVY training center, Skill India partner, MSME education tenders, CSR education projects.

Key facts:
- 10,000+ students trained
- 500+ IT projects delivered  
- 50+ government partnerships
- ISO 9001:2015 certified
- Location: Main Road, Saharsa, Bihar – 852201
- Phone: +91 7004216219, +91 9342470019
- Email: siat.sws@gmail.com
- WhatsApp: +91 7004216219

Respond in Hinglish (mix of Hindi and English) when appropriate. Be warm, professional, and always guide users toward contacting SIAT or visiting the relevant page. Keep responses concise (2-4 sentences). If unsure, suggest contacting SIAT directly.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SIAT_SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
