import { supabase } from "@/integrations/supabase/client";

const THROTTLE_KEY = "siat_backend_alert_at";
const THROTTLE_MS = 15 * 60 * 1000;

/**
 * Notifies the site owner by email when the cloud backend / database is
 * unreachable (for example when the project is paused), so it can be activated.
 * Client-side throttled to avoid spamming from repeated retries.
 */
export async function reportBackendDown(context: string, detail?: string) {
  try {
    const last = Number(localStorage.getItem(THROTTLE_KEY) || 0);
    if (Date.now() - last < THROTTLE_MS) return;
    localStorage.setItem(THROTTLE_KEY, String(Date.now()));
  } catch (_) {
    // localStorage unavailable — still attempt the alert
  }

  try {
    await supabase.functions.invoke("notify-backend-down", {
      body: {
        context,
        detail: detail?.slice(0, 500),
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
      },
    });
  } catch (err) {
    console.error("Backend down alert failed:", err);
  }
}
