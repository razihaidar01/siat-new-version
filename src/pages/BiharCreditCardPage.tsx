import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  CheckCircle2, IndianRupee, Clock, Shield,
  Phone, Globe, MapPin, ChevronDown, ChevronUp, ArrowRight,
  GraduationCap, AlertCircle, Send, Star, BookOpen
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import siatLogo from "@/assets/siat-logo.png";
import { supabase } from "@/integrations/supabase/client";

/* ─── Partner Colleges ──────────────────────────────────── */
const COLLEGES = [
  { name: "Maharishi Markandeshwar University", grade: "A++", location: "Ambala, Haryana", state: "Haryana", rating: 4.5, courses: 6, fee: "₹2,00,000/yr" },
  { name: "Vivekanand Global University", grade: "A+", location: "Jaipur, Rajasthan", state: "Rajasthan", rating: 4.3, courses: 8, fee: "₹1,75,000/yr" },
  { name: "Mewar University", grade: "A+", location: "Chittorgarh, Rajasthan", state: "Rajasthan", rating: 4.0, courses: 7, fee: "₹82,500/yr" },
  { name: "Ganpat University", grade: "A", location: "Mehsana, Gujarat", state: "Gujarat", rating: 4.2, courses: 5, fee: "₹1,50,000/yr" },
  { name: "Noida International University", grade: "A", location: "Greater Noida, Uttar Pradesh", state: "Uttar Pradesh", rating: 4.1, courses: 5, fee: "₹1,50,000/yr" },
  { name: "IIBS Bangalore", grade: "A", location: "Bangalore, Karnataka", state: "Karnataka", rating: 4.4, courses: 4, fee: "₹2,00,000/yr" },
  { name: "SRM University Ghaziabad", grade: "A++", location: "Ghaziabad, Uttar Pradesh", state: "Uttar Pradesh", rating: 4.6, courses: 9, fee: "₹1,96,000/yr" },
  { name: "Sandip University Madhubani", grade: "A", location: "Madhubani, Bihar", state: "Bihar", rating: 4.0, courses: 6, fee: "₹1,00,000/yr" },
  { name: "Tula's Institute", grade: "A+", location: "Dehradun, Uttarakhand", state: "Uttarakhand", rating: 4.3, courses: 5, fee: "₹1,39,000/yr" },
  { name: "SRM University Sonepat", grade: "A+", location: "Sonepat, Haryana", state: "Haryana", rating: 4.4, courses: 5, fee: "₹2,57,000/yr" },
  { name: "Shobhit University", grade: "A", location: "Meerut, Uttar Pradesh", state: "Uttar Pradesh", rating: 4.0, courses: 5, fee: "₹1,20,000/yr" },
  { name: "Guru Kashi University", grade: "A", location: "Talwandi Sabo, Punjab", state: "Punjab", rating: 4.0, courses: 5, fee: "₹1,20,000/yr" },
  { name: "Oxford Business College", grade: "B+", location: "Patna, Bihar", state: "Bihar", rating: 3.8, courses: 3, fee: "₹65,000/yr" },
  { name: "MGM Group Patna", grade: "B+", location: "Patna, Bihar", state: "Bihar", rating: 3.8, courses: 6, fee: "₹64,125/yr" },
  { name: "MATS University", grade: "A+", location: "Raipur, Chhattisgarh", state: "Chhattisgarh", rating: 4.3, courses: 13, fee: "₹2,50,000/yr" },
  { name: "Desh Bhagat University", grade: "A+", location: "Mandi Gobindgarh, Punjab", state: "Punjab", rating: 4.3, courses: 30, fee: "₹1,89,000/yr" },
  { name: "K.R. Mangalam University", grade: "A", location: "Gurugram, Haryana", state: "Haryana", rating: 4.4, courses: 40, fee: "₹1,60,000/yr" },
];

const STATES = ["All States", "Bihar", "Chhattisgarh", "Gujarat", "Haryana", "Karnataka", "Punjab", "Rajasthan", "Uttar Pradesh", "Uttarakhand"];

/* ─── Reveal wrapper ─────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── FAQ Item ───────────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? "border-blue-300 shadow-md shadow-blue-50" : "border-gray-200"}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 p-5 text-left bg-white hover:bg-blue-50/40 transition-colors">
        <span className="font-semibold text-gray-800 text-sm sm:text-base">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
      </button>
      {open && <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed bg-blue-50/30">{a}</div>}
    </div>
  );
}

/* ─── COURSES LIST ───────────────────────────────────────── */
const COURSES = [
  "B.Tech / B.E. / B.Sc (Engineering — All Branches)", "B.Tech / B.E. Lateral Entry (All Branches)",
  "Polytechnic (Diploma Engineering — All Branches)", "B.B.A", "B.C.A",
  "Master in Journalism & Mass Communication", "B.Sc (Hospitality & Hotel Administration)",
  "B.A (Journalism & Mass Communication)", "B.COM LLB", "BHMCT", "MBA", "MCA", "M.COM",
  "BPT", "BHM (BHMCT)", "B.Pharma", "LLB (Integrated)", "BBA + LLB", "BA + LLB", "BOT",
  "B.Sc (Forensic Science / Criminology / Cyberforensic)", "B.Sc (Microbiology)",
  "B.Sc Design (Interior / Cosmetic / Textile)", "B.Sc (Fashion Designing)", "M.Tech", "B.Ed", "D.El.Ed",
  "PhD", "D.Pharma", "B.Sc (Biomedical)", "M.Sc (Biotechnology / Microbiology)",
  "BHMS", "BNYS", "Hotel Management", "B.Sc Agriculture", "Other Technical / Professional Course",
];

const FAQS = [
  { q: "What is the maximum loan amount?", a: "Up to ₹4,00,000 (4 Lakh) under Bihar Student Credit Card Yojana. This covers tuition fees, hostel charges, food expenses, and books/stationery." },
  { q: "Is there any processing fee from SIAT?", a: "Absolutely NO — SIAT provides complete end-to-end Bihar Student Credit Card application support 100% FREE of charge. We charge nothing." },
  { q: "When does repayment start?", a: "Repayment starts 1 year after course completion OR 6 months after getting a job — whichever is earlier. No EMI while studying!" },
  { q: "Can students from all income groups apply?", a: "Yes! There is NO income bar. Students from ALL family income groups are eligible for Bihar Student Credit Card." },
  { q: "How long does approval take?", a: "Typically 15-30 working days after successful submission at DRCC (District Registration & Counselling Centre)." },
  { q: "What if my application is rejected?", a: "SIAT's team will guide you through the re-application process and help fix any documentation issues." },
  { q: "Which colleges accept Bihar Credit Card?", a: "All NAAC (A, A+) rated, NBA approved, and NIRF ranked colleges across India. Both government and private recognized institutions." },
];

/* ─── Grade color helper ─────────────────────────────────── */
function gradeColor(g: string) {
  if (g === "A++") return "bg-green-100 text-green-700 border-green-200";
  if (g === "A+") return "bg-blue-100 text-blue-700 border-blue-200";
  if (g === "A") return "bg-indigo-100 text-indigo-700 border-indigo-200";
  return "bg-gray-100 text-gray-700 border-gray-200";
}

/* ═══════════════════════════════════════════════════════════ */
/*  MAIN PAGE                                                   */
/* ═══════════════════════════════════════════════════════════ */
export default function BiharCreditCardPage() {
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [quickForm, setQuickForm] = useState({ name: "", phone: "", course: "" });
  const [quickError, setQuickError] = useState<string | null>(null);
  const [quickLoading, setQuickLoading] = useState(false);
  const [stateFilter, setStateFilter] = useState("All States");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      student_name: fd.get("student_name") as string,
      phone: fd.get("phone") as string,
      email: (fd.get("email") as string) || null,
      date_of_birth: (fd.get("dob") as string) || null,
      district: (fd.get("district") as string) || null,
      course_applied: (fd.get("course") as string) || null,
      college_name: (fd.get("college") as string) || null,
      class_12_year: (fd.get("class12_year") as string) || null,
      family_income: (fd.get("family_income") as string) || null,
      message: (fd.get("message") as string) || null,
    };
    const { error } = await (supabase as any).from("credit_card_applications").insert(payload);
    setFormLoading(false);
    if (error) {
      setFormError("Kuch galat ho gaya. Dobara koshish karein ya WhatsApp pe contact karein.");
      return;
    }
    setFormSuccess(true);
    setLeadCaptured(true);
    (e.target as HTMLFormElement).reset();
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickForm.name.trim() || !quickForm.phone.trim() || !quickForm.course.trim()) {
      setQuickError("Please fill all required fields.");
      return;
    }
    if (!/^[0-9+\-\s()]{10,}$/.test(quickForm.phone.trim())) {
      setQuickError("Please enter a valid phone number.");
      return;
    }
    setQuickLoading(true);
    setQuickError(null);
    const { error } = await (supabase as any).from("credit_card_applications").insert({
      student_name: quickForm.name.trim(),
      phone: quickForm.phone.trim(),
      course_applied: quickForm.course.trim(),
    });
    setQuickLoading(false);
    if (error) {
      setQuickError("Something went wrong. Please try again.");
      return;
    }
    setLeadCaptured(true);
  };

  const filteredColleges = stateFilter === "All States" ? COLLEGES : COLLEGES.filter(c => c.state === stateFilter);

  /* ─── Lead Gate Form (shown if not captured) ─────────── */
  if (!leadCaptured) {
    return (
      <>
        <SEOHead title="Bihar Student Credit Card Yojana — Free Help | SIAT" description="Bihar Student Credit Card Yojana ke liye free apply karein. Up to ₹4 lakh education loan at minimal interest." />
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center px-4 py-12">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-500/20" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-indigo-500/15" />
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative z-10 w-full max-w-md">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center p-1.5">
                  <img src={siatLogo} alt="SIAT" className="w-full h-full object-contain" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-white text-sm">SIAT</p>
                  <p className="text-blue-200 text-xs">Saharsa Institute of Advance Technology</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 rounded-full px-4 py-2 mb-4">
                <Shield className="w-4 h-4 text-amber-300" />
                <span className="text-amber-200 font-semibold text-xs">Bihar Govt. Scheme · 7 Nischay</span>
              </div>
              <h1 className="font-display font-black text-white text-2xl sm:text-3xl mb-2">
                Bihar Student <span className="text-amber-300">Credit Card</span>
              </h1>
              <p className="text-blue-200 text-sm">Fill your details to view 17+ partner colleges, fees & courses</p>
            </div>

            <form onSubmit={handleQuickSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name *</label>
                <input type="text" required placeholder="Apna poora naam" value={quickForm.name} onChange={e => setQuickForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number *</label>
                <input type="tel" required placeholder="+91 XXXXX XXXXX" value={quickForm.phone} onChange={e => setQuickForm(p => ({ ...p, phone: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Course *</label>
                <select required value={quickForm.course} onChange={e => setQuickForm(p => ({ ...p, course: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 text-sm bg-white">
                  <option value="">-- Select Course --</option>
                  {COURSES.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
              </div>
              {quickError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600">{quickError}</p>
                </div>
              )}
              <button type="submit" disabled={quickLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60">
                {quickLoading ? "Processing..." : <><GraduationCap className="w-5 h-5" /> View Colleges & Apply Free</>}
              </button>
              <p className="text-center text-xs text-gray-400">100% Free · No charges · Your data is safe</p>
            </form>
          </motion.div>
        </div>
      </>
    );
  }

  /* ─── Main page (after lead capture) ─────────────────── */
  return (
    <>
      <SEOHead title="Bihar Student Credit Card Yojana — Free Help | SIAT" description="Bihar Student Credit Card Yojana ke liye free apply karein. Up to ₹4 lakh education loan at minimal interest." />
      <div className="min-h-screen bg-white overflow-x-hidden">

        {/* ── HERO ───────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-500/30" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-indigo-500/20" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center p-1.5">
                <img src={siatLogo} alt="SIAT" className="w-full h-full object-contain" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm leading-tight">SIAT</p>
                <p className="text-blue-200 text-xs leading-tight">Saharsa Institute of Advance Technology</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 rounded-full px-4 py-2 mb-5">
              <Shield className="w-4 h-4 text-amber-300" />
              <span className="text-amber-200 font-semibold text-xs sm:text-sm tracking-wide">Bihar Government Official Scheme · 7 Nischay Yojana</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="font-display font-black text-3xl sm:text-5xl md:text-6xl leading-tight tracking-tight mb-4">
              Bihar Student<br /><span className="text-amber-300">Credit Card</span> Yojana
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="text-blue-100 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Get up to <strong className="text-white">₹4 lakh</strong> for higher education at minimal interest. We process it completely <strong className="text-amber-300">FREE.</strong>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-3 justify-center">
              {[{ icon: "₹", label: "₹4 Lakh Max" }, { icon: "📉", label: "Very Low Interest" }, { icon: "✅", label: "100% Free Processing" }, { icon: "🏛️", label: "Govt. Approved" }].map((p, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-2 text-sm font-semibold">
                  <span>{p.icon}</span> {p.label}
                </div>
              ))}
            </motion.div>
          </div>
          <div className="relative h-12 sm:h-16 -mb-1">
            <svg viewBox="0 0 1440 60" className="absolute bottom-0 w-full" preserveAspectRatio="none">
              <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* ── KEY FACTS ──────────────────────────────────── */}
        <section className="py-14 sm:py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: IndianRupee, val: "₹4,00,000", label: "Maximum Loan", color: "bg-blue-50 text-blue-600" },
              { icon: Clock, val: "Very Low", label: "Interest Rate", color: "bg-green-50 text-green-600" },
              { icon: Shield, val: "No Guarantor", label: "Required", color: "bg-purple-50 text-purple-600" },
              { icon: GraduationCap, val: "Repay After", label: "Getting Job", color: "bg-amber-50 text-amber-600" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-11 h-11 rounded-xl ${s.color} flex items-center justify-center mx-auto mb-3`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <p className="font-display font-black text-gray-900 text-lg leading-tight mb-1">{s.val}</p>
                  <p className="font-semibold text-gray-700 text-xs">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── PARTNER COLLEGES ──────────────────────────── */}
        <section className="py-14 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <Reveal><p className="text-blue-600 font-bold text-xs tracking-[4px] uppercase mb-2">Partner Colleges</p></Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display font-black text-gray-900 text-2xl sm:text-3xl md:text-4xl mb-2">
                  17+ Top Colleges <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Across India</span>
                </h2>
              </Reveal>
            </div>
            {/* State filter pills */}
            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {STATES.map(s => (
                  <button key={s} onClick={() => setStateFilter(s)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${stateFilter === s ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </Reveal>
            {/* College cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredColleges.map((c, i) => (
                <Reveal key={c.name} delay={i * 0.05}>
                  <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display font-bold text-gray-900 text-sm leading-tight mb-1">{c.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" /> {c.location}
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${gradeColor(c.grade)}`}>{c.grade}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-gray-800">{c.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <BookOpen className="w-3 h-3" /> {c.courses} Courses
                      </div>
                      <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-semibold">Credit Card</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">Starting from <span className="font-bold text-gray-900">{c.fee}</span></p>
                      <a href="#apply-form" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">View Details →</a>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
            {filteredColleges.length === 0 && (
              <p className="text-center text-gray-400 py-8 text-sm">No colleges found for this state. Try "All States".</p>
            )}
          </div>
        </section>

        {/* ── ABOUT SCHEME ──────────────────────────────── */}
        <section className="py-14 sm:py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Reveal>
                <p className="text-blue-600 font-bold text-xs tracking-[4px] uppercase mb-2">About the Scheme</p>
                <h2 className="font-display font-black text-gray-900 text-2xl sm:text-3xl leading-tight mb-5">
                  What is Bihar <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Student Credit Card?</span>
                </h2>
              </Reveal>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                {[
                  "Bihar government's flagship initiative under \"7 Nischay — Arthik Hal Yuvaon Ko Bal\" by CM Nitish Kumar.",
                  "Provides up to ₹4 lakh loan for higher education after 12th. Covers tuition fees, hostel, food expenses, and books.",
                  "Very low interest rate. Repayment starts 1 year after course or 6 months after getting a job.",
                  "No income bar — ALL families are eligible regardless of income.",
                ].map((text, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p>{text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal delay={0.2}>
              <div className="bg-white rounded-3xl border border-blue-100 p-7 shadow-sm">
                <p className="font-display font-bold text-gray-900 text-lg mb-5 text-center">Who Can Apply?</p>
                <div className="space-y-3">
                  {["Bihar domicile student", "Age 25 years or below", "Passed 12th from a recognized board", "Admission in a recognized college / university", "No income bar — ALL groups eligible", "Both boys and girls can apply"].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── DOCUMENTS REQUIRED ─────────────────────────── */}
        <section className="py-14 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <Reveal><h2 className="font-display font-black text-gray-900 text-2xl sm:text-3xl">Documents <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Checklist</span></h2></Reveal>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { icon: "👤", title: "Student", color: "border-blue-200 bg-blue-50/40", items: ["Email ID / Mobile Number", "Passport Size Photo", "Aadhaar Card", "Residential Certificate", "Bank Passbook", "10th Marksheet", "12th Marksheet", "Graduation Marksheet (if applicable)"] },
                { icon: "👨‍👩‍👧", title: "Parent / Guardian", color: "border-purple-200 bg-purple-50/40", items: ["Email ID / Mobile Number", "Passport Size Photo", "Aadhaar Card"] },
                { icon: "🏫", title: "College Documents", color: "border-amber-200 bg-amber-50/40", items: ["Bonafide Certificate — ₹10,000", "Registration Fee — ₹2,000"] },
              ].map((doc, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className={`border-2 ${doc.color} rounded-2xl p-6 h-full`}>
                    <div className="text-3xl mb-3">{doc.icon}</div>
                    <h3 className="font-display font-bold text-gray-900 mb-4">{doc.title}</h3>
                    <ul className="space-y-2">
                      {doc.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW WE HELP ────────────────────────────────── */}
        <section className="py-14 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="max-w-5xl mx-auto text-center">
            <Reveal><h2 className="font-display font-black text-gray-900 text-2xl sm:text-3xl mb-8">
              End-to-End Support — <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Completely Free</span>
            </h2></Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: "📋", step: "1", title: "Contact Us", desc: "Call or WhatsApp us and we'll guide you from the start." },
                { icon: "✅", step: "2", title: "Eligibility Check", desc: "We verify if you qualify — quick and accurate." },
                { icon: "📁", step: "3", title: "Document Collection", desc: "Exact checklist so you don't miss anything." },
                { icon: "💻", step: "4", title: "Online Application", desc: "We fill the official portal for you." },
                { icon: "🏦", step: "5", title: "DRCC Verification", desc: "We coordinate with DRCC for you." },
                { icon: "💰", step: "6", title: "Disbursement", desc: "Loan goes to college. Education begins!" },
              ].map((s, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="bg-white rounded-2xl border border-green-100 p-6 text-left shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center text-xl">{s.icon}</div>
                      <span className="text-xs font-bold text-green-600 bg-green-50 border border-green-200 rounded-full px-3 py-1">Step {s.step}</span>
                    </div>
                    <h3 className="font-display font-bold text-gray-900 mb-2">{s.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── APPROVED COURSES ───────────────────────────── */}
        <section className="py-14 sm:py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <Reveal><h2 className="font-display font-black text-gray-900 text-2xl sm:text-3xl">
                Approved Courses <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">(36+)</span>
              </h2></Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100 p-6 sm:p-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {COURSES.map((course, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700 py-1.5">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                      {course}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── APPLICATION FORM ───────────────────────────── */}
        <section id="apply-form" className="py-14 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <Reveal>
                <h2 className="font-display font-black text-white text-2xl sm:text-3xl mb-3">
                  Apply for Credit Card Today — <span className="text-amber-300">It's FREE</span>
                </h2>
                <p className="text-blue-200 text-sm">Our team handles the entire process. You just bring the documents.</p>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              {formSuccess ? (
                <div className="bg-green-50 border-2 border-green-300 rounded-3xl p-10 text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="font-display font-black text-gray-900 text-2xl mb-3">Application Submitted! 🎉</h3>
                  <p className="text-gray-600 mb-2">Hamari team 24 ghante ke andar aapse contact karegi.</p>
                  <p className="text-gray-500 text-sm">Ya WhatsApp karein: <a href="https://wa.me/919342470019" className="text-blue-600 font-semibold">+91 9342470019</a></p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Student Name *</label>
                      <input name="student_name" type="text" required placeholder="Apna poora naam" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                      <input name="phone" type="tel" required placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 text-sm" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                      <input name="email" type="email" placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date of Birth</label>
                      <input name="dob" type="date" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 text-sm" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">District (Bihar)</label>
                      <input name="district" type="text" placeholder="E.g. Saharsa, Patna" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">12th Pass Year</label>
                      <input name="class12_year" type="text" placeholder="E.g. 2024" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Course</label>
                    <select name="course" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 text-sm bg-white">
                      <option value="">-- Select Course --</option>
                      {COURSES.map((c, i) => <option key={i} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">College / University Name</label>
                    <input name="college" type="text" placeholder="College ka naam" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Family Annual Income</label>
                    <select name="family_income" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 text-sm bg-white">
                      <option value="">-- Select Range --</option>
                      <option>Below ₹1 Lakh</option><option>₹1 – 3 Lakh</option><option>₹3 – 6 Lakh</option><option>₹6 – 10 Lakh</option><option>Above ₹10 Lakh</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Any Questions / Message</label>
                    <textarea name="message" rows={3} placeholder="Koi sawaal ho to yahan likhein..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 text-sm resize-none" />
                  </div>
                  {formError && (
                    <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <p className="text-sm text-red-600">{formError}</p>
                    </div>
                  )}
                  <button type="submit" disabled={formLoading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60">
                    {formLoading ? "Submitting..." : <><Send className="w-4 h-4" /> Submit Application — Free</>}
                  </button>
                  <p className="text-center text-xs text-gray-400">Hamari team 24 ghante ke andar contact karegi. Bilkul FREE.</p>
                </form>
              )}
            </Reveal>
          </div>
        </section>

        {/* ── FAQs ───────────────────────────────────────── */}
        <section className="py-14 sm:py-16 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <Reveal><h2 className="font-display font-black text-gray-900 text-2xl sm:text-3xl">Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Questions</span></h2></Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="space-y-3">
                {FAQS.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CONTACT ────────────────────────────────────── */}
        <section className="py-14 sm:py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h2 className="font-display font-black text-gray-900 text-2xl sm:text-3xl mb-8">
                Get Free Help <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Now</span>
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[
                { icon: Phone, title: "Call / WhatsApp", lines: ["+91 9342470019", "+91 9142082026"], href: "https://wa.me/919342470019", color: "bg-green-50 border-green-200 text-green-600" },
                { icon: MapPin, title: "Visit Us", lines: ["Station Road, Gamhariya", "Baijnatthpur Chowk, Saharsa"], href: "https://maps.google.com/?q=Gamharia+Saharsa", color: "bg-blue-50 border-blue-200 text-blue-600" },
                { icon: Globe, title: "Website", lines: ["www.siat.in", "Mon–Sat · 9AM–6PM"], href: "https://www.siat.in", color: "bg-purple-50 border-purple-200 text-purple-600" },
              ].map((c, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer"
                    className={`block bg-white border-2 ${c.color.split(" ")[1]} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all`}>
                    <div className={`w-11 h-11 rounded-xl ${c.color.split(" ")[0]} flex items-center justify-center mx-auto mb-3`}>
                      <c.icon className={`w-5 h-5 ${c.color.split(" ")[2]}`} />
                    </div>
                    <p className="font-bold text-gray-900 text-sm mb-2">{c.title}</p>
                    {c.lines.map((line, j) => <p key={j} className="text-gray-500 text-xs">{line}</p>)}
                  </a>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.3}>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <img src={siatLogo} alt="SIAT" className="w-10 h-10 rounded-xl object-contain" />
                  <div className="text-left">
                    <p className="font-bold text-sm">SIAT</p>
                    <p className="text-blue-200 text-xs">Saharsa Institute of Advance Technology</p>
                  </div>
                </div>
                <p className="text-blue-100 text-sm mb-5 max-w-sm mx-auto">Empowering Skills · Building Careers<br />Bihar Student Credit Card — 100% Free Processing</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="#apply-form" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm text-gray-900 bg-amber-400 hover:bg-amber-300 transition-all">🎓 Apply Now — Free</a>
                  <Link to="/" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm text-white bg-white/15 border border-white/30 hover:bg-white/25 transition-all">🌐 Visit SIAT Website</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FOOTER ─────────────────────────────────────── */}
        <footer className="bg-gray-900 text-white py-8 px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img src={siatLogo} alt="SIAT" className="w-8 h-8 rounded-lg object-contain" />
            <div className="text-left">
              <p className="font-bold text-sm">SIAT</p>
              <p className="text-gray-400 text-xs">Saharsa Institute of Advance Technology</p>
            </div>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed mb-2">Reg. No.: SH-6061 · UDYAM-BR-29-0035052 · ISO 9001:2015 Certified</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center text-xs">
            <a href="https://www.siat.in" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">🌐 www.siat.in</a>
            <a href="tel:+919342470019" className="text-gray-400 hover:text-white">📞 +91 9342470019</a>
            <a href="tel:+919142082026" className="text-gray-400 hover:text-white">📞 +91 9142082026</a>
          </div>
        </footer>
      </div>
    </>
  );
}
