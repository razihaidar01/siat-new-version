import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import siatLogo from "@/assets/siat-logo.png";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const TICK_ITEMS = [
  "✦ Double Celebration — 22 March 2026",
  "📜 MSME–ESDP Certificate Distribution — 8:30 AM",
  "🎊 Grand Opening Ceremony — 10:30 AM",
  "📍 Gamharia, Baijanatpur Chowk, Saharsa",
  "📞 +91 9342470019 / +91 7004216219",
  "🌐 www.siat.in",
  "👨‍🏫 Meet Instructors · Live Demo · Consultation",
  "☕ Refreshments · Academic Guidance · FREE Entry",
];

export default function CelebrationPage() {
  return (
    <>
      <SEOHead
        title="Double Celebration – MSME ESDP & Grand Opening | SIAT 22 March 2026"
        description="SIAT ka double celebration — MSME ESDP Program Certificate Distribution (8:30 AM) aur Grand Opening (10:30 AM) — Sunday 22 March 2026, Saharsa."
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');
        .cel-page { font-family: 'DM Sans', sans-serif; }
        .cel-page * { box-sizing: border-box; }
        @keyframes cel-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes cel-floatup { 0% { transform: translateY(0); opacity: .55; } 100% { transform: translateY(-100vh); opacity: 0; } }
        @keyframes cel-sparkle { 0%,100% { opacity:0; transform:scale(0) rotate(0deg); } 50% { opacity:1; transform:scale(1) rotate(180deg); } }
        @keyframes cel-shimmer { 0% { background-position: -400% center; } 100% { background-position: 400% center; } }
        @keyframes cel-spin { to { transform: rotate(360deg); } }
        @keyframes cel-spinr { to { transform: rotate(-360deg); } }
        @keyframes cel-border { 0%,100% { opacity:.45; } 50% { opacity:1; } }
        @keyframes cel-glow { 0%,100% { box-shadow: 0 0 22px rgba(184,134,11,.25); } 50% { box-shadow: 0 0 52px rgba(184,134,11,.55); } }
        @keyframes cel-fadein { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .cel-ticker-inner { animation: cel-ticker 22s linear infinite; }
        .cel-ticker-inner:hover { animation-play-state: paused; }
        .cel-ring1 { animation: cel-spin 35s linear infinite; }
        .cel-ring2 { animation: cel-spinr 24s linear infinite; }
        .cel-border1 { animation: cel-border 3s ease-in-out infinite; }
        .cel-border2 { animation: cel-border 3s ease-in-out infinite .6s; }
        .cel-glow { animation: cel-glow 3s ease-in-out infinite; }
        .cel-gold {
          background: linear-gradient(135deg, #b8860b, #ffd700, #daa520, #ffd700, #b8860b);
          background-size: 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: cel-shimmer 5s linear infinite;
        }
        .cel-gold2 {
          background: linear-gradient(135deg, #daa520, #fffacd, #ffd700, #fffacd, #daa520);
          background-size: 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: cel-shimmer 4s linear infinite;
        }
        .cel-btn {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 7px; padding: 12px 24px; border-radius: 50px;
          font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 14px;
          text-decoration: none; transition: all .25s ease; cursor: pointer; border: none;
        }
        .cel-btn:hover { transform: translateY(-3px); text-decoration: none; }
        .cel-btn-gold { background: linear-gradient(135deg,#b8860b,#daa520); color: #fff; box-shadow: 0 5px 22px rgba(184,134,11,.38); }
        .cel-btn-gold:hover { box-shadow: 0 10px 36px rgba(184,134,11,.58); color: #fff; }
        .cel-btn-wa { background: linear-gradient(135deg,#16a34a,#22c55e); color: #fff; box-shadow: 0 5px 22px rgba(34,197,94,.28); }
        .cel-btn-wa:hover { color: #fff; box-shadow: 0 10px 36px rgba(34,197,94,.44); }
        .cel-btn-out { background: transparent; color: #8b6914; border: 2px solid #daa520 !important; }
        .cel-btn-out:hover { background: #fef9ec; }
        .cel-ev-card {
          background: linear-gradient(135deg,#fef9ec,#fffdf5);
          border: 1.5px solid #daa520; border-radius: 18px;
          padding: 22px 16px; text-align: center; position: relative; overflow: hidden;
          box-shadow: 0 4px 22px rgba(184,134,11,.12);
        }
        .cel-ev-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:3px;
          background: linear-gradient(90deg,#b8860b,#ffd700,#b8860b);
        }
        .cel-info-card {
          background: #fff; border: 1.5px solid rgba(218,165,32,.3);
          border-radius: 18px; padding: 24px 18px; text-align: center;
          box-shadow: 0 2px 14px rgba(184,134,11,.07);
          transition: all .3s ease;
        }
        .cel-info-card:hover { transform: translateY(-4px); border-color: #daa520; box-shadow: 0 10px 30px rgba(184,134,11,.14); }
        .cel-hl-card {
          background: #fff; border: 1.5px solid rgba(218,165,32,.25);
          border-radius: 18px; padding: 22px 18px; text-align: center;
          transition: all .3s ease;
        }
        .cel-hl-card:hover { transform: translateY(-4px); border-color: #daa520; box-shadow: 0 10px 30px rgba(184,134,11,.13); }
        .cel-cc {
          background: #fff; border: 1.5px solid rgba(218,165,32,.22);
          border-radius: 16px; padding: 20px; transition: all .3s ease;
        }
        .cel-cc:hover { transform: translateY(-3px); border-color: #daa520; box-shadow: 0 8px 26px rgba(184,134,11,.12); }
        @media (max-width: 640px) {
          .cel-event-grid { grid-template-columns: 1fr !important; }
          .cel-btns-wrap { flex-direction: column !important; }
          .cel-btns-wrap a { width: 100% !important; justify-content: center !important; }
          .cel-schedule-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="cel-page" style={{ background: "#fffbf5", minHeight: "100vh", overflowX: "hidden" }}>

        {/* ── TICKER ─────────────────────────────────────── */}
        <div style={{ overflow: "hidden", background: "linear-gradient(90deg,#2d1f00,#8b6914,#5c3d00,#8b6914,#2d1f00)", padding: "10px 0", borderBottom: "1px solid rgba(255,215,0,.22)" }}>
          <div className="cel-ticker-inner" style={{ display: "flex", whiteSpace: "nowrap" }}>
            {[...Array(2)].map((_, ri) => (
              <span key={ri} style={{ display: "inline-flex" }}>
                {TICK_ITEMS.map((item, j) => (
                  <span key={j} style={{ padding: "0 26px", color: "#ffd700", fontSize: 12.5, fontWeight: 600, letterSpacing: .4 }}>{item}</span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ── HERO ───────────────────────────────────────── */}
        <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "56px 20px 72px", textAlign: "center", overflow: "hidden", background: "linear-gradient(160deg,#fdf6e3 0%,#fef9ec 35%,#fffdf8 60%,#fef6d6 100%)" }}>

          {/* Particles */}
          <div id="cel-particles" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }} aria-hidden />

          {/* Border frames */}
          <div className="cel-border1" style={{ position: "absolute", inset: 14, border: "1.5px solid rgba(184,134,11,.22)", borderRadius: 4, pointerEvents: "none" }} />
          <div className="cel-border2" style={{ position: "absolute", inset: 19, border: "1px solid rgba(218,165,32,.12)", borderRadius: 2, pointerEvents: "none" }} />

          {/* Spinning rings */}
          <div className="cel-ring1" style={{ position: "absolute", width: "min(480px,85vw)", height: "min(480px,85vw)", borderRadius: "50%", border: "1.5px dashed rgba(218,165,32,.18)", pointerEvents: "none" }} />
          <div className="cel-ring2" style={{ position: "absolute", width: "min(320px,60vw)", height: "min(320px,60vw)", borderRadius: "50%", border: "1px dashed rgba(184,134,11,.15)", pointerEvents: "none" }} />

          {/* Corner SVG decorations */}
          {[
            { style: { top: 28, left: 28 } },
            { style: { top: 28, right: 28, transform: "scaleX(-1)" } },
            { style: { bottom: 28, left: 28, transform: "scaleY(-1)" } },
            { style: { bottom: 28, right: 28, transform: "scale(-1,-1)" } },
          ].map((c, i) => (
            <div key={i} aria-hidden style={{ position: "absolute", width: 110, height: 110, opacity: .3, pointerEvents: "none", ...c.style }}>
              <svg viewBox="0 0 100 100" fill="none" width="110" height="110">
                <path d="M8 92 L8 8 L92 8" stroke="#daa520" strokeWidth="2" />
                <path d="M8 8 Q35 8 35 35" stroke="#daa520" strokeWidth="1.5" fill="none" />
                <circle cx="8" cy="8" r="4" fill="#daa520" />
                <circle cx="92" cy="8" r="2.5" fill="#daa520" opacity=".5" />
                <circle cx="8" cy="92" r="2.5" fill="#daa520" opacity=".5" />
              </svg>
            </div>
          ))}

          {/* Logo */}
          <div style={{ animation: "cel-fadein .7s ease .1s both", marginBottom: 16 }}>
            <div style={{ width: 72, height: 72, borderRadius: 20, background: "#fff", border: "1.5px solid #daa520", boxShadow: "0 4px 20px rgba(184,134,11,.2)", display: "flex", alignItems: "center", justifyContent: "center", padding: 8, margin: "0 auto" }}>
              <img src={siatLogo} alt="SIAT" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          </div>

          {/* Invite pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#fef9ec,#fffdf0)", border: "1.5px solid #daa520", borderRadius: 50, padding: "9px 24px", marginBottom: 18, boxShadow: "0 2px 20px rgba(184,134,11,.18)", animation: "cel-fadein .7s ease .2s both" }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: "#7a5500", letterSpacing: 2, textTransform: "uppercase" as const }}>✦ &nbsp; You Are Cordially Invited &nbsp; ✦</span>
          </div>

          {/* Script heading */}
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5.5vw,3.6rem)", fontStyle: "italic", fontWeight: 600, lineHeight: 1.1, marginBottom: 4, animation: "cel-fadein .8s ease .35s both" }}>
            <span className="cel-gold2">You are Cordially Invited</span>
          </div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(.85rem,2vw,1.1rem)", color: "#8b6914", fontStyle: "italic", marginBottom: 18, animation: "cel-fadein .8s ease .48s both" }}>
            To Our Double Celebration
          </p>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 auto 18px", maxWidth: 300, animation: "cel-fadein .8s ease .56s both" }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,transparent,#daa520,transparent)" }} />
            <div style={{ width: 8, height: 8, background: "#daa520", transform: "rotate(45deg)", flexShrink: 0 }} />
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#daa520,transparent)" }} />
          </div>

          {/* Institute name */}
          <div style={{ marginBottom: 22, animation: "cel-fadein .8s ease .63s both" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1rem,2.5vw,1.45rem)", fontWeight: 900, color: "#3d2b00", letterSpacing: .5, marginBottom: 3 }}>
              SAHARSA INSTITUTE OF ADVANCE TECHNOLOGY
            </p>
            <p style={{ fontSize: 12.5, color: "#8b6914", fontStyle: "italic" }}>(A Unit of SIAT)</p>
          </div>

          {/* Two event cards */}
          <div className="cel-event-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 580, width: "100%", margin: "0 auto 22px", animation: "cel-fadein .8s ease .76s both" }}>
            <div className="cel-ev-card">
              <div style={{ fontSize: 26, marginBottom: 8 }}>📜</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, fontWeight: 700, color: "#3d2b00", marginBottom: 7, lineHeight: 1.4 }}>
                MSME – ESDP Program<br />Certificate Distribution
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#8b6914", marginBottom: 4 }}>08:30 – 10:00 AM</div>
              <div style={{ fontSize: 11, color: "#a07830", lineHeight: 1.55 }}>बैजनाथपुर पुलिस स्टेशन के सामने</div>
            </div>
            <div className="cel-ev-card">
              <div style={{ fontSize: 26, marginBottom: 8 }}>🎊</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, fontWeight: 700, color: "#3d2b00", marginBottom: 7, lineHeight: 1.4 }}>
                Grand Opening<br />Ceremony
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#8b6914", marginBottom: 4 }}>10:30 AM – 01:00 PM</div>
              <div style={{ fontSize: 11, color: "#a07830", lineHeight: 1.55 }}>
                स्टेशन रोड गम्हरिया, बैजनाथपुर चौक<br />(सहरसा कोसी सीमांचल)
              </div>
            </div>
          </div>

          {/* Date pill */}
          <div style={{ background: "linear-gradient(135deg,#3d2b00,#5c3d00)", borderRadius: 50, padding: "14px 32px", display: "inline-block", margin: "0 auto 22px", animation: "cel-fadein .8s ease .88s both", boxShadow: "0 6px 28px rgba(61,43,0,.3)" }}>
            <p style={{ color: "rgba(255,215,0,.65)", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" as const, marginBottom: 3 }}>📅 Date</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.1rem,3vw,1.6rem)", fontWeight: 800, color: "#ffd700" }}>Sunday, 22 March 2026</p>
          </div>

          {/* Highlights box */}
          <div style={{ background: "linear-gradient(135deg,#fef9ec,#fffdf0)", border: "1.5px solid rgba(218,165,32,.45)", borderRadius: 20, padding: "22px 26px", maxWidth: 460, width: "100%", margin: "0 auto 26px", animation: "cel-fadein .8s ease .98s both", boxShadow: "0 4px 22px rgba(184,134,11,.1)" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: "#7a5500", marginBottom: 13, letterSpacing: .3 }}>✨ Highlights</div>
            {["🔑 Meet the Instructors", "🎯 Live Demo · Consultation", "📚 Academic Guidance", "☕ Refreshments"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i === 3 ? 0 : 9, fontSize: 13.5, color: "#3d2b00", fontWeight: 500 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#daa520", flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="cel-btns-wrap" style={{ display: "flex", flexWrap: "wrap" as const, gap: 11, justifyContent: "center", animation: "cel-fadein .8s ease 1.08s both" }}>
            <a href="https://wa.me/917004216219?text=SIAT%20Double%20Celebration%20ke%20baare%20mein%20jaankari%20chahiye" className="cel-btn cel-btn-wa" target="_blank" rel="noopener noreferrer">📲 +91 7004216219</a>
            <a href="https://wa.me/919342470019" className="cel-btn cel-btn-wa" target="_blank" rel="noopener noreferrer">📲 +91 9342470019</a>
            <Link to="/" className="cel-btn cel-btn-gold">🌐 Visit SIAT Website</Link>
            <a href="https://maps.google.com/?q=Gamharia+Saharsa+Bihar" className="cel-btn cel-btn-out" target="_blank" rel="noopener noreferrer">📍 Directions</a>
          </div>

          <p style={{ marginTop: 26, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(1rem,2.5vw,1.3rem)", color: "#b8860b", animation: "cel-fadein .8s ease 1.2s both" }}>
            "Innovating Education, Empowering Futures"
          </p>
        </section>

        {/* ── SCHEDULE SECTION ───────────────────────────── */}
        <section style={{ background: "linear-gradient(135deg,#fef9ec,#fffdf5)", padding: "64px 20px", borderTop: "1px solid rgba(218,165,32,.18)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <Reveal><p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase" as const, color: "#b8860b", fontWeight: 700, marginBottom: 10 }}>Full Schedule</p></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.7rem,4vw,2.8rem)", fontWeight: 700, color: "#3d2b00", marginBottom: 12 }}>Double Celebration <span className="cel-gold">Timeline</span></h2></Reveal>
            <Reveal delay={0.15}><p style={{ color: "#8b6914", fontSize: 14.5, lineHeight: 1.8, marginBottom: 36 }}>Sunday, 22 March 2026 — Ek din, do khushiyan!</p></Reveal>

            <div className="cel-schedule-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                {
                  num: "1", title: "MSME – ESDP Program\nCertificate Distribution",
                  rows: [
                    { icon: "⏰", label: "Time", val: "08:30 AM – 10:00 AM" },
                    { icon: "📍", label: "Venue", val: "बैजनाथपुर पुलिस स्टेशन के सामने" },
                    { icon: "📜", label: "About", val: "MSME – Entrepreneurship & Skill Development Programme certificate vitaran samaroh" },
                  ],
                  delay: 0,
                },
                {
                  num: "2", title: "Grand Opening\nCeremony",
                  rows: [
                    { icon: "⏰", label: "Time", val: "10:30 AM – 01:00 PM" },
                    { icon: "📍", label: "Venue", val: "Station Road Gamharia, Baijanatpur Chowk, Saharsa" },
                    { icon: "🎊", label: "About", val: "SIAT naye branch ka grand inauguration aur open house" },
                  ],
                  delay: 0.1,
                },
              ].map((card) => (
                <Reveal key={card.num} delay={card.delay}>
                  <div style={{ background: "#fff", border: "1.5px solid rgba(218,165,32,.35)", borderRadius: 20, overflow: "hidden", boxShadow: "0 3px 18px rgba(184,134,11,.08)", transition: "all .3s" }}>
                    <div style={{ background: "linear-gradient(135deg,#3d2b00,#5c3d00)", padding: "18px 20px" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: "50%", border: "1.5px solid #ffd700", color: "#ffd700", fontSize: 11, fontWeight: 800, marginBottom: 8 }}>{card.num}</div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: "#ffd700", lineHeight: 1.3, whiteSpace: "pre-line" }}>{card.title}</div>
                    </div>
                    <div style={{ padding: 20 }}>
                      {card.rows.map((row, ri) => (
                        <div key={ri} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: ri === card.rows.length - 1 ? 0 : 11 }}>
                          <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>{row.icon}</span>
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: "#b8860b", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 2 }}>{row.label}</div>
                            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#3d2b00", lineHeight: 1.4 }}>{row.val}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── HIGHLIGHTS SECTION ─────────────────────────── */}
        <section style={{ background: "#fffdf5", padding: "64px 20px", borderTop: "1px solid rgba(218,165,32,.12)" }}>
          <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}>
            <Reveal><p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase" as const, color: "#b8860b", fontWeight: 700, marginBottom: 10 }}>What to Expect</p></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.7rem,4vw,2.8rem)", fontWeight: 700, color: "#3d2b00", marginBottom: 12 }}>Event <span className="cel-gold">Highlights</span></h2></Reveal>
            <Reveal delay={0.15}><p style={{ color: "#8b6914", fontSize: 14.5, lineHeight: 1.8, marginBottom: 36 }}>Is khaas din par aapke liye bahut kuch tayyar hai!</p></Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(185px,1fr))", gap: 15 }}>
              {[
                { icon: "📜", title: "MSME–ESDP Certificates", desc: "Officially recognized ESDP programme certificates ka vitaran samaroh." },
                { icon: "👨‍🏫", title: "Meet Instructors", desc: "Hamare experienced trainers se seedha milne ka mauka paaiye." },
                { icon: "🎯", title: "Live Demo", desc: "Courses ka live demonstration dekhein aur sawaal poochein." },
                { icon: "📖", title: "Academic Guidance", desc: "Sahi course chunne mein expert guidance — bilkul free!" },
                { icon: "🤝", title: "Consultation", desc: "One-on-one career consultation with SIAT team members." },
                { icon: "☕", title: "Refreshments", desc: "Sab ke liye snacks aur refreshments ka intezaam hai!" },
              ].map((h, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="cel-hl-card">
                    <div style={{ fontSize: 28, marginBottom: 11 }}>{h.icon}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: "#3d2b00", marginBottom: 5 }}>{h.title}</div>
                    <div style={{ fontSize: 12, color: "#a07830", lineHeight: 1.6 }}>{h.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT SECTION ────────────────────────────── */}
        <section style={{ background: "linear-gradient(135deg,#fef9ec,#fffdf5)", padding: "64px 20px", borderTop: "1px solid rgba(218,165,32,.15)" }}>
          <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}>
            <Reveal><p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase" as const, color: "#b8860b", fontWeight: 700, marginBottom: 10 }}>Contact & Location</p></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.7rem,4vw,2.8rem)", fontWeight: 700, color: "#3d2b00", marginBottom: 12 }}>Aaiye & <span className="cel-gold">Miliye Hum Se</span></h2></Reveal>
            <Reveal delay={0.15}><p style={{ color: "#8b6914", fontSize: 14.5, lineHeight: 1.8, marginBottom: 36 }}>Kisi bhi jaankari ke liye sampark karein — aap sabka swagat hai!</p></Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(185px,1fr))", gap: 13, marginBottom: 36 }}>
              {[
                { icon: "📲", bg: "#f0fdf4", title: "WhatsApp Primary", sub: "Mon–Sat · 9 AM – 6 PM", href: "https://wa.me/917004216219", link: "+91 7004216219 →", color: "#16a34a" },
                { icon: "📱", bg: "#faf5ff", title: "WhatsApp Alternate", sub: "Admissions & Events", href: "https://wa.me/919342470019", link: "+91 9342470019 →", color: "#7c3aed" },
                { icon: "🌐", bg: "#fffbeb", title: "Website", sub: "Full Details Online", href: "https://www.siat.in", link: "www.siat.in →", color: "#b8860b" },
                { icon: "📍", bg: "#fef2f2", title: "Venue", sub: "Saharsa, Bihar", href: "https://maps.google.com/?q=Gamharia+Saharsa+Bihar", link: "Get Directions →", color: "#dc2626" },
              ].map((c, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="cel-cc">
                    <div style={{ width: 40, height: 40, borderRadius: 11, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, marginBottom: 11 }}>{c.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#3d2b00", marginBottom: 3 }}>{c.title}</div>
                    <div style={{ fontSize: 11, color: "#b8860b", marginBottom: 6 }}>{c.sub}</div>
                    <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, fontWeight: 700, color: c.color, textDecoration: "none" }}>{c.link}</a>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Big CTA */}
            <Reveal delay={0.3}>
              <div className="cel-glow" style={{ background: "linear-gradient(135deg,#2d1f00,#4a3000)", borderRadius: 24, padding: "36px 28px", textAlign: "center", boxShadow: "0 8px 40px rgba(45,31,0,.4)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 10 }}>
                  <img src={siatLogo} alt="SIAT" style={{ width: 44, height: 44, borderRadius: 12, objectFit: "contain" }} />
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1rem,2.5vw,1.3rem)", fontWeight: 700, color: "#ffd700", lineHeight: 1.2 }}>SIAT</p>
                    <p style={{ fontSize: 11, color: "rgba(255,215,0,.6)", lineHeight: 1.3 }}>Saharsa Institute of Advance Technology</p>
                  </div>
                </div>
                <p style={{ color: "rgba(255,215,0,.65)", fontSize: 13, marginBottom: 22, lineHeight: 1.75 }}>
                  Innovating Education, Empowering Futures<br />
                  ISO 9001:2015 Certified · Reg. No. SH-6061 · UDYAM-BR-29-0035052
                </p>
                <div className="cel-btns-wrap" style={{ display: "flex", flexWrap: "wrap" as const, gap: 11, justifyContent: "center" }}>
                  <Link to="/" className="cel-btn cel-btn-gold">🌐 Visit SIAT Website</Link>
                  <a href="https://wa.me/917004216219" className="cel-btn cel-btn-wa" target="_blank" rel="noopener noreferrer">📲 WhatsApp Now</a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FOOTER ─────────────────────────────────────── */}
        <footer style={{ background: "#0f0a00", padding: "26px 20px", textAlign: "center", borderTop: "1px solid rgba(255,215,0,.1)" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 13.5, color: "rgba(255,215,0,.45)", marginBottom: 10 }}>
            "Innovating Education, Empowering Futures"
          </p>
          <p style={{ color: "rgba(255,215,0,.3)", fontSize: 11.5, lineHeight: 2 }}>
            SIAT · Reg. No.: SH-6061 · UDYAM-BR-29-0035052 · ISO 9001:2015<br />
            <a href="https://www.siat.in" style={{ color: "rgba(255,215,0,.5)", textDecoration: "none" }} target="_blank" rel="noopener noreferrer">www.siat.in</a>
            &nbsp;·&nbsp;
            <a href="tel:+919342470019" style={{ color: "rgba(255,215,0,.5)", textDecoration: "none" }}>+91 9342470019</a>
            &nbsp;·&nbsp;
            <a href="tel:+917004216219" style={{ color: "rgba(255,215,0,.5)", textDecoration: "none" }}>+91 7004216219</a>
          </p>
        </footer>

      </div>

      {/* Particle script */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          const pw = document.getElementById('cel-particles');
          if (!pw) return;
          const gc = ['#ffd700','#daa520','#b8860b','#ffec8b','#ffe066'];
          for (let i = 0; i < 28; i++) {
            const p = document.createElement('div');
            const sz = 4 + i % 6;
            p.style.cssText = 'position:absolute;left:' + (4 + (i*3.5)%92) + '%;top:-8px;width:' + sz + 'px;height:' + sz + 'px;background:' + gc[i%5] + ';border-radius:' + (i%2===0?'50%':'2px') + ';opacity:.45;animation:cel-floatup ' + (3.5+(i*.45)%4) + 's ' + ((i*.3)%4) + 's ease-in infinite';
            pw.appendChild(p);
          }
          for (let i = 0; i < 16; i++) {
            const s = document.createElement('div');
            s.style.cssText = 'position:absolute;left:' + (6+(i*5.8)%88) + '%;top:' + (6+(i%5)*17) + '%;font-size:' + (9+i%11) + 'px;pointer-events:none;color:' + gc[i%5] + ';animation:cel-sparkle ' + (1.8+i*.28) + 's ' + (i*.18) + 's ease-in-out infinite;opacity:0';
            s.textContent = i%3===0 ? '✦' : i%3===1 ? '✧' : '❋';
            pw.appendChild(s);
          }
        })();
      ` }} />
    </>
  );
}
