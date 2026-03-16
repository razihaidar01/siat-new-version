import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Globe, Clock, Calendar, Users, Award, Star, ArrowRight, ExternalLink } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import siatLogo from "@/assets/siat-logo.png";

/* ─── Types ──────────────────────────────────────────────── */
interface TimeLeft { d: number; h: number; m: number; s: number }

/* ─── Countdown hook ─────────────────────────────────────── */
const TARGET = new Date("2026-03-22T10:30:00+05:30");

function useCountdown(): TimeLeft {
  const calc = useCallback((): TimeLeft => {
    const diff = TARGET.getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86_400_000),
      h: Math.floor((diff % 86_400_000) / 3_600_000),
      m: Math.floor((diff % 3_600_000) / 60_000),
      s: Math.floor((diff % 60_000) / 1_000),
    };
  }, []);
  const [t, setT] = useState<TimeLeft>(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);
  return t;
}

/* ─── Reveal wrapper ─────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  y = 32,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Countdown box ──────────────────────────────────────── */
function CountBox({ val, label }: { val: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <motion.div
        key={val}
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="bg-white border-2 border-purple-200 rounded-2xl shadow-lg shadow-purple-100 
                   flex items-center justify-center
                   w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
      >
        <span className="font-display font-black text-purple-700 text-2xl sm:text-3xl md:text-4xl leading-none tracking-tight">
          {String(val).padStart(2, "0")}
        </span>
      </motion.div>
      <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-gray-400">
        {label}
      </span>
    </div>
  );
}

/* ─── Feature card ───────────────────────────────────────── */
function FeatureCard({ icon: Icon, title, desc, delay }: {
  icon: React.ElementType;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-white rounded-2xl border border-purple-100 p-6 shadow-sm shadow-purple-50
                   hover:shadow-xl hover:shadow-purple-100 hover:border-purple-300 transition-shadow duration-300"
      >
        <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
          <Icon className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="font-display font-bold text-gray-900 text-base mb-2">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
      </motion.div>
    </Reveal>
  );
}

/* ─── Event info card ────────────────────────────────────── */
function EventCard({ icon: Icon, label, value, color, delay }: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 280 }}
        className="bg-white rounded-2xl border-2 border-amber-100 p-6 text-center
                   shadow-sm hover:shadow-lg hover:border-amber-300 transition-shadow duration-300"
      >
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mx-auto mb-3`}>
          <Icon className="w-5 h-5" />
        </div>
        <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">{label}</p>
        <p className="font-display font-bold text-gray-900 text-sm sm:text-base">{value}</p>
      </motion.div>
    </Reveal>
  );
}

/* ─── Contact card ───────────────────────────────────────── */
function ContactCard({ icon: Icon, title, sub, href, linkText, borderColor, iconBg, iconColor, delay }: {
  icon: React.ElementType;
  title: string;
  sub: string;
  href: string;
  linkText: string;
  borderColor: string;
  iconBg: string;
  iconColor: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <motion.a
        href={href}
        target={href.startsWith("http") || href.startsWith("tel") || href.startsWith("mailto") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 280 }}
        className={`block bg-white rounded-2xl border-2 ${borderColor} p-5 shadow-sm
                    hover:shadow-lg transition-shadow duration-300 group`}
      >
        <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center mb-3`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <p className="font-bold text-gray-900 text-sm mb-0.5">{title}</p>
        <p className="text-xs text-gray-400 mb-2">{sub}</p>
        <span className={`text-sm font-semibold ${iconColor} group-hover:underline flex items-center gap-1`}>
          {linkText} <ArrowRight className="w-3 h-3" />
        </span>
      </motion.a>
    </Reveal>
  );
}

/* ─── Stat card ──────────────────────────────────────────── */
function StatCard({ num, label, delay }: { num: string; label: string; delay: number }) {
  return (
    <Reveal delay={delay}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 280 }}
        className="bg-white rounded-2xl border border-purple-100 p-6 text-center shadow-sm hover:shadow-md transition-shadow"
      >
        <p className="font-display font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-br from-amber-500 to-orange-500 mb-2">
          {num}
        </p>
        <p className="text-xs sm:text-sm text-gray-500 font-medium">{label}</p>
      </motion.div>
    </Reveal>
  );
}

/* ─── Confetti particle ──────────────────────────────────── */
function ConfettiPiece({ i }: { i: number }) {
  const colors = ["#f59e0b", "#8b5cf6", "#ec4899", "#3b82f6", "#10b981", "#ef4444", "#f97316"];
  const color = colors[i % colors.length];
  const x = 5 + (i * 4.13) % 90;
  const delay = (i * 0.38) % 4;
  const dur = 3.5 + (i * 0.52) % 4;
  const size = 6 + i % 6;
  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: -10,
        width: size,
        height: size,
        background: color,
        borderRadius: i % 2 === 0 ? "50%" : "2px",
        opacity: 0.75,
      }}
      animate={{
        y: ["0vh", "105vh"],
        rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
        opacity: [0.75, 0.2],
      }}
      transition={{
        duration: dur,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

/* ─── Ticker ─────────────────────────────────────────────── */
const TICK_ITEMS = [
  "🎉 Grand Opening — 22 March 2026",
  "📍 Gamharia, Baijanatpur Chowk, Saharsa",
  "⏰ 10:30 AM",
  "🌐 www.siat.in",
  "📞 +91 7004216219 / +91 9342470019",
  "🏆 ISO 9001:2015 Certified",
  "🎓 5000+ Students Trained",
  "🎊 FREE Entry — Sabka Swagat!",
];

/* ══════════════════════════════════════════════════════════ */
/*  MAIN PAGE                                                  */
/* ══════════════════════════════════════════════════════════ */
export default function OpeningPage() {
  const { d, h, m, s } = useCountdown();
  const isLive = TARGET.getTime() <= Date.now();

  return (
    <>
      <SEOHead
        title="Grand Opening – SIAT Saharsa | 22 March 2026"
        description="SIAT ke naye branch ka grand opening — 22 March 2026, 10:30 AM. Station Road Gamharia, Baijanatpur Chowk, Saharsa Kosi Seemanchal. Free entry!"
      />

      {/* Global font override for this page */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        .opening-page { font-family: 'Space Grotesk', sans-serif; }
        .opening-page .font-display { font-family: 'Outfit', sans-serif; }
        @keyframes op-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes op-spin { to { transform: rotate(360deg); } }
        @keyframes op-spinr { to { transform: rotate(-360deg); } }
        @keyframes op-pulse { 0%,100% { transform: scale(1); opacity:.7; } 50% { transform: scale(1.2); opacity:1; } }
        @keyframes op-wave { 0%,100% { transform: skewX(0deg); } 50% { transform: skewX(-2deg); } }
        .op-ticker-inner { animation: op-ticker 24s linear infinite; }
        .op-ticker-inner:hover { animation-play-state: paused; }
        .op-ring1 { animation: op-spin 35s linear infinite; }
        .op-ring2 { animation: op-spinr 25s linear infinite; }
        .op-dot-pulse { animation: op-pulse 1.5s ease-in-out infinite; }
        .op-wave { animation: op-wave 3s ease-in-out infinite; }
        @keyframes op-glow { 0%,100%{box-shadow:0 0 20px rgba(245,158,11,.25)} 50%{box-shadow:0 0 45px rgba(245,158,11,.5)} }
        .op-glow { animation: op-glow 2.5s ease-in-out infinite; }
      `}</style>

      <div className="opening-page min-h-screen overflow-x-hidden">

        {/* ── TICKER ─────────────────────────────────────── */}
        <div className="overflow-hidden bg-gradient-to-r from-purple-700 via-violet-600 to-purple-700 py-2.5">
          <div className="op-ticker-inner flex whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <span key={i} className="flex items-center">
                {TICK_ITEMS.map((item, j) => (
                  <span key={j} className="inline-block px-7 text-white text-[12.5px] font-semibold tracking-wide">
                    {item}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ── HERO ───────────────────────────────────────── */}
        <section className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center
                            px-4 sm:px-6 md:px-10 pt-12 pb-20 text-center
                            bg-gradient-to-br from-amber-50 via-white to-purple-50">

          {/* Confetti */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
            {Array.from({ length: 32 }, (_, i) => <ConfettiPiece key={i} i={i} />)}
          </div>

          {/* Deco rings */}
          <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="op-ring1 absolute w-[min(520px,90vw)] h-[min(520px,90vw)] rounded-full
                            border-2 border-dashed border-purple-200/60" />
            <div className="op-ring2 absolute w-[min(360px,65vw)] h-[min(360px,65vw)] rounded-full
                            border-2 border-dashed border-amber-200/70" />
          </div>

          {/* Stars decoration */}
          {["✨","⭐","✨","🌟","✨","⭐"].map((s, i) => (
            <span key={i} aria-hidden
              className="absolute text-sm sm:text-base pointer-events-none opacity-60 op-dot-pulse"
              style={{
                left: `${8 + i * 16}%`,
                top: `${15 + (i % 3) * 22}%`,
                animationDelay: `${i * 0.3}s`,
                fontSize: i % 2 === 0 ? 14 : 18,
              }}
            >
              {s}
            </span>
          ))}

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mb-4 sm:mb-6"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-3xl bg-white 
                            shadow-xl shadow-purple-100 border-2 border-purple-100 
                            flex items-center justify-center p-2 mx-auto">
              <img src={siatLogo} alt="SIAT Logo" className="w-full h-full object-contain" />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-10 inline-flex items-center gap-2 bg-amber-50 border-2 border-amber-300
                       rounded-full px-4 py-2 mb-5 shadow-sm"
          >
            <span className="op-dot-pulse w-2 h-2 rounded-full bg-amber-500 inline-block" />
            <span className="text-amber-800 font-bold text-xs sm:text-sm tracking-wide">
              🎊 Saharsa Kosi Seemanchal — Naya Branch!
            </span>
          </motion.div>

          {/* Grand Opening heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mb-3"
          >
            <p className="font-display font-bold text-purple-400 tracking-[6px] sm:tracking-[10px]
                          text-sm sm:text-base uppercase mb-1">
              ✨ &nbsp;Grand &nbsp;✨
            </p>
            <h1 className="font-display font-black leading-[0.88] tracking-tight
                           text-[clamp(3.8rem,14vw,9rem)]
                           text-transparent bg-clip-text bg-gradient-to-br from-amber-500 via-orange-400 to-amber-600
                           op-wave">
              OPENING
            </h1>
          </motion.div>

          {/* Institute name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="relative z-10 mb-2"
          >
            <p className="font-display font-semibold text-purple-800 text-base sm:text-lg md:text-xl">
              Saharsa Institute of Advance Technology
            </p>
          </motion.div>

          {/* Date & location */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.78 }}
            className="relative z-10 mb-1"
          >
            <p className="font-display font-black text-gray-900 text-xl sm:text-2xl md:text-3xl tracking-tight">
              🗓️ 22 March 2026 &nbsp;·&nbsp; ⏰ 10:30 AM
            </p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="relative z-10 text-gray-500 text-xs sm:text-sm mb-10 px-4"
          >
            📍 Station Road Gamharia, Baijanatpur Chowk, Saharsa (Kosi Seemanchal)
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="relative z-10 mb-10"
          >
            {isLive ? (
              <div className="bg-green-50 border-2 border-green-300 rounded-2xl px-8 py-4 inline-block shadow-sm">
                <p className="font-display font-black text-green-700 text-xl sm:text-2xl">
                  🎉 Aaj hai Grand Opening! Aayiye!
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-3 sm:gap-4 md:gap-5 justify-center flex-wrap">
                <CountBox val={d} label="Days" />
                <span className="font-display font-black text-purple-300 text-3xl sm:text-4xl mb-4">:</span>
                <CountBox val={h} label="Hours" />
                <span className="font-display font-black text-purple-300 text-3xl sm:text-4xl mb-4">:</span>
                <CountBox val={m} label="Mins" />
                <span className="font-display font-black text-purple-300 text-3xl sm:text-4xl mb-4">:</span>
                <CountBox val={s} label="Secs" />
              </div>
            )}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="relative z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full max-w-lg px-4"
          >
            <a
              href="https://wa.me/917004216219?text=SIAT%20Grand%20Opening%20ke%20baare%20mein%20jaankari%20chahiye"
              target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl
                         font-bold text-sm sm:text-base text-white
                         bg-gradient-to-r from-green-500 to-emerald-500
                         shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300
                         hover:-translate-y-1 transition-all duration-250"
            >
              📲 WhatsApp Us
            </a>
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl
                         font-bold text-sm sm:text-base text-purple-700
                         bg-white border-2 border-purple-200
                         shadow-sm hover:shadow-md hover:border-purple-400
                         hover:-translate-y-1 transition-all duration-250"
            >
              🌐 Visit SIAT Website
            </Link>
            <a
              href="https://maps.google.com/?q=Gamharia+Saharsa+Bihar"
              target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl
                         font-bold text-sm sm:text-base text-amber-800
                         bg-amber-50 border-2 border-amber-200
                         shadow-sm hover:shadow-md hover:border-amber-400
                         hover:-translate-y-1 transition-all duration-250"
            >
              📍 Get Directions
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5
                       opacity-40 z-10"
          >
            <div className="w-px h-8 bg-gradient-to-b from-transparent to-gray-400" />
            <p className="text-[10px] font-semibold tracking-[3px] uppercase text-gray-500">Scroll</p>
          </motion.div>
        </section>

        {/* ── ABOUT SECTION ──────────────────────────────── */}
        <section className="bg-gradient-to-br from-purple-50 to-violet-50 py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <Reveal>
                <p className="text-purple-500 font-bold text-xs tracking-[4px] uppercase mb-2">About SIAT</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display font-black text-gray-900 text-2xl sm:text-3xl md:text-4xl leading-tight mb-3">
                  Bihar ke Youth ka{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-500">
                    Ujjwal Bhavishya
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                  SIAT ek ISO 9001:2015 certified vocational &amp; technical training institute hai —
                  5000+ students train ho chuke hain, aur ab Saharsa mein naya chapter shuru ho raha hai!
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {[
                { icon: Award, title: "Certified Courses", desc: "Mobile, AC, Laptop repairing — government-recognized certs with placement support." },
                { icon: Star, title: "ISO 9001:2015", desc: "Quality-certified. Reg. No. SH-6061 (Saharsa) & UDYAM-BR-29-0035052." },
                { icon: Users, title: "100% Placement", desc: "Dedicated placement cell helping graduates find jobs across Bihar & beyond." },
                { icon: Award, title: "Govt. Partner", desc: "PMKVY, Skill India & CSR education empanelled training partner." },
                { icon: Globe, title: "RH Software", desc: "Web, App & AI development wing for modern tech skills and freelancing." },
                { icon: MapPin, title: "New Branch", desc: "Gamharia, Baijanatpur Chowk — easily accessible from Saharsa city centre." },
              ].map((f, i) => (
                <FeatureCard key={i} delay={i * 0.07} {...f} />
              ))}
            </div>
          </div>
        </section>

        {/* ── EVENT DETAILS ──────────────────────────────── */}
        <section className="bg-gradient-to-br from-amber-50 via-white to-orange-50 py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <Reveal>
                <p className="text-amber-600 font-bold text-xs tracking-[4px] uppercase mb-2">Event Details</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display font-black text-gray-900 text-2xl sm:text-3xl md:text-4xl leading-tight">
                  Aayiye, Saath{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                    Jashn Manayein!
                  </span>{" "}
                  🎊
                </h2>
              </Reveal>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
              {[
                { icon: Calendar, label: "Date", value: "22 March 2026", color: "bg-amber-100 text-amber-600" },
                { icon: Clock, label: "Time", value: "10:30 AM onwards", color: "bg-orange-100 text-orange-600" },
                { icon: MapPin, label: "Location", value: "Gamharia, Saharsa", color: "bg-rose-100 text-rose-600" },
                { icon: Star, label: "Entry", value: "FREE — All Welcome!", color: "bg-green-100 text-green-600" },
              ].map((e, i) => (
                <EventCard key={i} delay={i * 0.08} {...e} />
              ))}
            </div>

            {/* Highlight box */}
            <Reveal delay={0.2}>
              <div className="op-glow bg-gradient-to-br from-purple-50 to-violet-100 border-2 border-purple-200
                              rounded-3xl p-6 sm:p-8 md:p-10 text-center relative overflow-hidden">
                <div aria-hidden className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-purple-200/30" />
                <div aria-hidden className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-amber-200/30" />

                <div className="relative z-10">
                  <p className="text-4xl mb-4">🙏</p>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 max-w-lg mx-auto">
                    Aap sabhi ka SIAT ke naye branch ke grand opening mein heartily swagat hai!
                    <br className="hidden sm:block" />
                    Aapke parivaar ke saath aayein — sabke liye kuch na kuch special hai!
                    <br /><br />
                    <strong className="text-purple-700 font-bold">
                      📍 Station Road Gamharia, Baijanatpur Chowk,<br className="hidden sm:block" />
                      Saharsa (Kosi Seemanchal)
                    </strong>
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="https://wa.me/917004216219" target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                                  font-bold text-sm text-white bg-gradient-to-r from-green-500 to-emerald-500
                                  shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                      📲 +91 7004216219
                    </a>
                    <a href="https://wa.me/919342470019" target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                                  font-bold text-sm text-white bg-gradient-to-r from-green-500 to-emerald-500
                                  shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                      📲 +91 9342470019
                    </a>
                    <a href="tel:+917004216219"
                       className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                                  font-bold text-sm text-purple-700 bg-white border-2 border-purple-200
                                  shadow-sm hover:border-purple-400 hover:-translate-y-0.5 transition-all duration-200">
                      📞 Call Us
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── STATS ──────────────────────────────────────── */}
        <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 md:px-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <Reveal>
                <p className="text-purple-500 font-bold text-xs tracking-[4px] uppercase mb-2">SIAT by Numbers</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display font-black text-gray-900 text-2xl sm:text-3xl md:text-4xl">
                  10+ Saal ki{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-500">
                    Mehnat aur Vishwas
                  </span>{" "}
                  💪
                </h2>
              </Reveal>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard num="5000+" label="Students Trained" delay={0} />
              <StatCard num="10+" label="Years Experience" delay={0.09} />
              <StatCard num="ISO" label="9001:2015 Certified" delay={0.18} />
              <StatCard num="100%" label="Placement Support" delay={0.27} />
            </div>
          </div>
        </section>

        {/* ── CONTACT ────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-purple-50 to-violet-50 py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <Reveal>
                <p className="text-green-600 font-bold text-xs tracking-[4px] uppercase mb-2">Contact Us</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display font-black text-gray-900 text-2xl sm:text-3xl md:text-4xl mb-3">
                  Aaiye &amp;{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                    Miliye Hum Se!
                  </span>{" "}
                  👋
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
                  Course details, admissions, ya kisi bhi jaankari ke liye — hum always ready hain!
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <ContactCard
                icon={Phone} title="WhatsApp — Primary" sub="Mon–Sat · 9 AM – 6 PM"
                href="https://wa.me/917004216219" linkText="+91 7004216219"
                borderColor="border-green-200 hover:border-green-400"
                iconBg="bg-green-50" iconColor="text-green-600" delay={0}
              />
              <ContactCard
                icon={Phone} title="WhatsApp — Alternate" sub="Admissions & Events"
                href="https://wa.me/919342470019" linkText="+91 9342470019"
                borderColor="border-purple-200 hover:border-purple-400"
                iconBg="bg-purple-50" iconColor="text-purple-600" delay={0.08}
              />
              <ContactCard
                icon={Mail} title="Email" sub="Reply within 24 hours"
                href="mailto:siat.sws@gmail.com" linkText="siat.sws@gmail.com"
                borderColor="border-amber-200 hover:border-amber-400"
                iconBg="bg-amber-50" iconColor="text-amber-600" delay={0.16}
              />
              <ContactCard
                icon={Globe} title="Website" sub="Courses, gallery & more"
                href="https://www.siat.in" linkText="www.siat.in"
                borderColor="border-blue-200 hover:border-blue-400"
                iconBg="bg-blue-50" iconColor="text-blue-600" delay={0.24}
              />
            </div>

            {/* Big SIAT.in CTA */}
            <Reveal delay={0.3}>
              <div className="op-glow bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300
                              rounded-3xl p-7 sm:p-10 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <img src={siatLogo} alt="SIAT" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-contain" />
                  <div className="text-left">
                    <p className="font-display font-black text-gray-900 text-base sm:text-lg leading-tight">
                      SAHARSA INSTITUTE OF
                    </p>
                    <p className="font-display font-black text-gray-900 text-base sm:text-lg leading-tight">
                      ADVANCE TECHNOLOGY
                    </p>
                  </div>
                </div>
                <p className="text-amber-800 text-sm sm:text-base font-medium mb-6 max-w-md mx-auto leading-relaxed">
                  🏫 Hamare saare courses, certifications, gallery, aur bahut kuch dekhne ke liye — visit karein{" "}
                  <strong>www.siat.in</strong> — Bihar ka sabse trusted technical training institute!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl
                               font-bold text-base text-white
                               bg-gradient-to-r from-amber-500 to-orange-500
                               shadow-lg shadow-amber-200 hover:shadow-xl hover:shadow-amber-300
                               hover:-translate-y-1 transition-all duration-250"
                  >
                    🌐 Visit SIAT Website <ExternalLink className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/training-institute"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl
                               font-bold text-base text-amber-800
                               bg-white border-2 border-amber-300
                               shadow-sm hover:border-amber-500 hover:-translate-y-1 transition-all duration-250"
                  >
                    🎓 View All Courses <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FOOTER ─────────────────────────────────────── */}
        <footer className="bg-gray-900 text-white py-8 sm:py-10 px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={siatLogo} alt="SIAT" className="w-9 h-9 rounded-xl object-contain" />
            <div className="text-left">
              <p className="font-display font-black text-sm leading-tight">SIAT</p>
              <p className="text-gray-400 text-xs leading-tight">Saharsa Institute of Advance Technology</p>
            </div>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed mb-3">
            Reg. No.: SH-6061 (Saharsa) &nbsp;·&nbsp; UDYAM-BR-29-0035052 &nbsp;·&nbsp; ISO 9001:2015 Certified
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 justify-center text-xs">
            <a href="https://www.siat.in" target="_blank" rel="noopener noreferrer"
               className="text-purple-400 hover:text-purple-300 transition-colors">🌐 www.siat.in</a>
            <a href="tel:+917004216219" className="text-gray-400 hover:text-white transition-colors">
              📞 +91 7004216219
            </a>
            <a href="tel:+919342470019" className="text-gray-400 hover:text-white transition-colors">
              📞 +91 9342470019
            </a>
            <a href="mailto:siat.sws@gmail.com" className="text-gray-400 hover:text-white transition-colors">
              ✉️ siat.sws@gmail.com
            </a>
          </div>
        </footer>

      </div>
    </>
  );
}
