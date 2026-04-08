import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, FileText, Users, IndianRupee, Clock, Shield,
  Phone, Globe, MapPin, ChevronDown, ChevronUp, ArrowRight,
  GraduationCap, AlertCircle, Send, Lock
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import siatLogo from "@/assets/siat-logo.png";
import { supabase } from "@/integrations/supabase/client";

/* ─── Reveal wrapper ─────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
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
  "B.Tech / B.E. / B.Sc (Engineering — All Branches)",
  "B.Tech / B.E. Lateral Entry (All Branches)",
  "Polytechnic (Diploma Engineering — All Branches)",
  "B.B.A", "B.C.A",
  "Master in Journalism & Mass Communication",
  "B.Sc (Hospitality & Hotel Administration)",
  "B.A (Journalism & Mass Communication)",
  "B.COM LLB", "BHMCT", "MBA", "MCA", "M.COM",
  "BPT", "BHM (BHMCT)", "B.Pharma",
  "LLB (Integrated)", "BBA + LLB", "BA + LLB", "BOT",
  "B.Sc (Forensic Science / Criminology / Cyberforensic)",
  "B.Sc (Microbiology)",
  "B.Sc Design (Interior / Cosmetic / Textile)",
  "B.Sc (Fashion Designing)", "M.Tech", "B.Ed", "D.El.Ed",
  "PhD", "D.Pharma", "B.Sc (Biomedical)",
  "M.Sc (Biotechnology / Microbiology)",
  "BHMS", "BNYS", "Hotel Management", "B.Sc Agriculture",
  "Other Technical / Professional Course",
];

const FAQS = [
  { q: "What is the maximum support amount?", a: "Up to ₹4,00,000 (4 Lakh) under Bihar Student Credit Card Yojana. This covers tuition fees, hostel charges, food expenses, and books/stationery." },
  { q: "Is there any processing fee from SIAT?", a: "Absolutely NO — SIAT provides complete end-to-end Bihar Student Credit Card application support 100% FREE of charge. We charge nothing." },
  { q: "When does repayment start?", a: "Repayment starts 1 year after course completion OR 6 months after getting a job — whichever is earlier. No EMI while studying!" },
  { q: "Can students from all income groups apply?", a: "Yes! There is NO income bar. Students from ALL family income groups are eligible for Bihar Student Credit Card." },
  { q: "How long does approval take?", a: "Typically 15-30 working days after successful submission at DRCC (District Registration & Counselling Centre)." },
  { q: "What if my application is rejected?", a: "SIAT's team will guide you through the re-application process and help fix any documentation issues." },
  { q: "Which colleges accept Bihar Credit Card?", a: "All NAAC (A, A+) rated, NBA approved, and NIRF ranked colleges across India. Both government and private recognized institutions." },
];

/* ─── COLLEGES DATA ──────────────────────────────────────── */
interface CollegeInfo {
  name: string;
  location: string;
  note?: string;
  courses: { course: string; duration: string; fee: string }[];
}

const COLLEGES: CollegeInfo[] = [
  {
    name: "Maharishi Markandeshwar (Deemed to be University)",
    location: "Mullana-Ambala, Haryana",
    note: "Online admission form charge is ₹1,200 (Non-Refundable).",
    courses: [
      { course: "B.Tech CSE", duration: "4 Year", fee: "₹9,50,000" },
      { course: "B.Tech (BioTech)", duration: "4 Year", fee: "₹8,00,000" },
      { course: "B.Tech (Mech, ECE, EE, Civil)", duration: "4 Year", fee: "₹6,50,000" },
      { course: "B.Tech LEET (CSE)", duration: "3 Year", fee: "₹6,00,000" },
      { course: "B.Tech LEET (Other branches)", duration: "3 Year", fee: "₹5,00,000" },
      { course: "BBA, BCA, B.Com", duration: "3 Year", fee: "₹4,70,000" },
      { course: "B.Sc. Hospitality & Hotel Admin", duration: "3 Year", fee: "₹4,60,000" },
      { course: "BA - Journalism & Mass Comm", duration: "4 Year", fee: "₹4,20,000" },
      { course: "B.Sc. Agriculture", duration: "5 Year", fee: "₹8,20,000" },
      { course: "B.Com LLB", duration: "4 Year", fee: "₹7,00,000" },
      { course: "BHMCT", duration: "4 Year", fee: "₹5,90,000" },
      { course: "B.Sc. Bio Technology", duration: "3 Year", fee: "₹4,20,000" },
      { course: "MBA", duration: "2 Year", fee: "₹4,45,000" },
      { course: "MCA", duration: "2 Year", fee: "₹4,25,000" },
    ],
  },
  {
    name: "Mewar University",
    location: "Gangarar, Rajasthan",
    note: "Registration charge is ₹3,000 (Adjustable in fee).",
    courses: [
      { course: "Polytechnic Diploma", duration: "3 Year", fee: "₹3,30,000" },
      { course: "B.Tech (CSE, AI, DS, ML)", duration: "4 Year", fee: "₹5,60,000" },
      { course: "B.Tech Core Branches", duration: "4 Year", fee: "₹4,80,000" },
      { course: "BPT", duration: "4 Year", fee: "₹5,60,000" },
      { course: "BBA", duration: "3 Year", fee: "₹3,90,000" },
      { course: "MBA", duration: "2 Year", fee: "₹2,60,000" },
      { course: "B.Pharma", duration: "4 Year", fee: "₹6,40,000" },
      { course: "BCA (Specializations)", duration: "3 Year", fee: "₹3,90,000" },
      { course: "LLB (Integrated)", duration: "5 Year", fee: "₹6,00,000" },
      { course: "B.Sc. Agriculture", duration: "4 Year", fee: "₹4,80,000" },
    ],
  },
  {
    name: "Ganpat University",
    location: "Mehsana-Gandhinagar Highway, North Gujarat",
    courses: [
      { course: "Diploma (All Branches)", duration: "3 Year", fee: "₹3,60,000" },
      { course: "B.Tech (Core Branches)", duration: "4 Year", fee: "₹6,00,000" },
      { course: "B.Tech (CSE/IT/EC)", duration: "4 Year", fee: "₹7,68,000" },
      { course: "B.Tech CSE (IBM Oriented)", duration: "4 Year", fee: "₹8,88,000" },
      { course: "BCA / MCA", duration: "3/2 Year", fee: "₹4,35,000 / ₹4,00,000" },
      { course: "B. Pharm.", duration: "4 Year", fee: "₹8,60,000" },
      { course: "B. Design (Various)", duration: "4 Year", fee: "₹12,20,000" },
    ],
  },
  {
    name: "Noida International University",
    location: "Yamuna Expressway, Uttar Pradesh",
    courses: [
      { course: "B.Tech CSE/Data Science/AI&ML", duration: "4 Year", fee: "₹7,08,000" },
      { course: "B.Tech CSE (Drone Tech with IBM)", duration: "4 Year", fee: "₹12,01,000" },
      { course: "BBA", duration: "3 Year", fee: "₹3,42,500" },
      { course: "MBA Elite", duration: "2 Year", fee: "₹6,80,000" },
      { course: "B.Sc. Agriculture", duration: "4 Year", fee: "₹3,01,000" },
      { course: "Polytechnic (All Branches)", duration: "3 Year", fee: "₹4,87,000" },
    ],
  },
  {
    name: "Excel Group of Institutions",
    location: "Namakkal Dt., Tamilnadu",
    courses: [
      { course: "B.Tech (CSE/AI&DS/AI&ML)", duration: "4 Year", fee: "₹6,21,000" },
      { course: "B.E. Safety & Fire Eng.", duration: "4 Year", fee: "₹4,81,000" },
      { course: "BNYS / BHMS", duration: "5.5 Year", fee: "₹10,50,000" },
      { course: "Pharma D", duration: "6 Year", fee: "₹18,00,000" },
      { course: "B.Sc. Nursing", duration: "4 Year", fee: "₹7,80,000" },
    ],
  },
  {
    name: "IIMT University",
    location: "Meerut, Uttar Pradesh",
    courses: [
      { course: "B.Tech (CS)", duration: "4 Year", fee: "₹9,20,680" },
      { course: "B.Tech (CS, AI&ML)", duration: "4 Year", fee: "₹9,74,680" },
      { course: "BCA", duration: "3 Year", fee: "₹4,87,785" },
      { course: "B.Sc. (Hons.) Agriculture", duration: "4 Year", fee: "₹5,77,780" },
      { course: "BA LLB / BBA LLB (Integrated)", duration: "5 Year", fee: "₹7,48,100" },
    ],
  },
  {
    name: "Sandip University",
    location: "Nashik (Maharashtra) & Patna (Bihar)",
    note: "Two campuses — Nashik and Patna (Sijoul). Bihar package rates apply.",
    courses: [
      { course: "B.Tech CSE (Nashik)", duration: "4 Year", fee: "₹8,00,000" },
      { course: "B.Pharmacy (Nashik)", duration: "4 Year", fee: "₹8,00,000" },
      { course: "BBA/BCA (Nashik)", duration: "3 Year", fee: "₹4,60,000" },
      { course: "B.Tech CSE (Patna, With Hostel)", duration: "4 Year", fee: "₹6,00,000" },
      { course: "B.Sc. Agriculture (Patna, With Hostel)", duration: "4 Year", fee: "₹6,20,000" },
      { course: "Polytechnic (Patna, With Hostel)", duration: "3 Year", fee: "₹3,95,000" },
      { course: "MBA (Patna, With Hostel)", duration: "2 Year", fee: "₹3,80,000" },
    ],
  },
  {
    name: "Shobhit University",
    location: "Meerut, Uttar Pradesh",
    courses: [
      { course: "B.Tech CSE (With Hostel)", duration: "4 Year", fee: "₹6,90,000" },
      { course: "B.Tech CSE (Without Hostel)", duration: "4 Year", fee: "₹5,40,000" },
      { course: "BBA Specialization (With Hostel)", duration: "3 Year", fee: "₹4,50,000" },
      { course: "BBA Specialization (Without Hostel)", duration: "3 Year", fee: "₹2,40,000" },
      { course: "BA LLB / BBA LLB (With Hostel)", duration: "5 Year", fee: "₹5,50,000+" },
      { course: "BA LLB / BBA LLB (Without Hostel)", duration: "5 Year", fee: "₹3,50,000+" },
    ],
  },
  {
    name: "Guru Kashi University",
    location: "Talwandi Sabo, Punjab",
    courses: [
      { course: "B.Tech (CSE, AIML)", duration: "4 Year", fee: "₹6,00,000" },
      { course: "B.Pharmacy", duration: "4 Year", fee: "₹6,40,000" },
      { course: "B.A. LLB (Hons.)", duration: "5 Year", fee: "₹6,45,000" },
    ],
  },
  {
    name: "Gulzar Group of Institutions",
    location: "Khanna, Punjab",
    courses: [
      { course: "B.Tech (CSE/AIML/DS)", duration: "4 Year", fee: "₹6,30,000" },
      { course: "MBA", duration: "2 Year", fee: "₹3,45,000" },
      { course: "BCA", duration: "3 Year", fee: "₹3,90,000" },
    ],
  },
  {
    name: "GNIOT Group of Institutions",
    location: "Greater Noida, Uttar Pradesh",
    courses: [
      { course: "B.Tech (CSE/IT)", duration: "4 Year", fee: "₹7,05,000" },
      { course: "MBA", duration: "2 Year", fee: "₹4,95,000" },
      { course: "B.Pharma", duration: "4 Year", fee: "₹7,05,000" },
    ],
  },
  {
    name: "Shri Ram College & Oxford Group",
    location: "Muzaffarnagar (UP) & Patna (Bihar)",
    note: "Shri Ram College (Muzaffarnagar) & Oxford Group (Patna).",
    courses: [
      { course: "B.Sc. Agriculture (Shri Ram)", duration: "4 Year", fee: "₹5,20,000" },
      { course: "BCA (Shri Ram)", duration: "3 Year", fee: "₹3,77,000" },
      { course: "BBA/BCA (Oxford, Patna)", duration: "3 Year", fee: "₹3,86,000" },
    ],
  },
];

/* ─── College Card ────────────────────────────────────────── */
function CollegeCard({ college, index }: { college: CollegeInfo; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const showCourses = expanded ? college.courses : college.courses.slice(0, 4);

  return (
    <Reveal delay={0.05}>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{index + 1}</span>
              <h3 className="font-display font-bold text-gray-900 text-lg mt-2">{college.name}</h3>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
            <MapPin className="w-3.5 h-3.5" /> {college.location}
          </div>
          {college.note && (
            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-4">
              📌 {college.note}
            </p>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 pr-4 text-gray-500 font-medium text-xs">Course</th>
                  <th className="text-left py-2 pr-4 text-gray-500 font-medium text-xs">Duration</th>
                  <th className="text-right py-2 text-gray-500 font-medium text-xs">Total Fee</th>
                </tr>
              </thead>
              <tbody>
                {showCourses.map((c, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-2.5 pr-4 text-gray-800 font-medium">{c.course}</td>
                    <td className="py-2.5 pr-4 text-gray-500">{c.duration}</td>
                    <td className="py-2.5 text-right font-bold text-blue-600">{c.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {college.courses.length > 4 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-600 text-xs font-semibold mt-3 hover:text-blue-700 flex items-center gap-1"
            >
              {expanded ? "Show Less" : `+${college.courses.length - 4} more courses`}
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}
        </div>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════ */
/*  MAIN PAGE                                                   */
/* ═══════════════════════════════════════════════════════════ */
export default function BiharCreditCardPage() {
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);

  const handleGateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    const fd = new FormData(e.currentTarget);

    const studentName = (fd.get("student_name") as string).trim();
    const phone = (fd.get("phone") as string).trim();
    const courseApplied = (fd.get("course") as string) || null;

    if (studentName.length < 2 || studentName.length > 100 || !/^[A-Za-z\s.'\-]+$/.test(studentName)) {
      setFormError("Please enter a valid name (letters only, 2-100 characters)."); setFormLoading(false); return;
    }
    const cleanPhone = phone.replace(/[\s\-()]/g, "");
    if (!/^(\+91)?[6-9]\d{9}$/.test(cleanPhone)) {
      setFormError("Please enter a valid 10-digit Indian mobile number."); setFormLoading(false); return;
    }
    const spamPattern = /(\b(fuck|shit|ass|bitch|damn|sex|porn|xxx|hack|free money|lottery|viagra)\b)/i;
    if (spamPattern.test(studentName)) {
      setFormError("Please use appropriate language."); setFormLoading(false); return;
    }

    const { error } = await supabase.from("credit_card_applications").insert({
      student_name: studentName,
      phone: cleanPhone,
      course_applied: courseApplied,
    });
    setFormLoading(false);
    if (error) {
      setFormError("Something went wrong. Please try again.");
      return;
    }
    setUnlocked(true);
  };

  /* ─── GATE SCREEN ──────────────────────────────────────── */
  if (!unlocked) {
    return (
      <>
        <SEOHead
          title="Bihar Student Credit Card Yojana — Free Help | SIAT"
          description="Bihar Student Credit Card Yojana ke liye free apply karein. Up to ₹4 lakh financial support. SIAT aapki poori application process bilkul FREE mein karega."
        />
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-4">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-500/20" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-indigo-500/15" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 w-full max-w-md"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-6 text-center text-white">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center p-1.5">
                    <img src={siatLogo} alt="SIAT" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm leading-tight">SIAT</p>
                    <p className="text-blue-200 text-xs leading-tight">Saharsa Institute of Advance Technology</p>
                  </div>
                </div>
                <h1 className="font-display font-black text-xl sm:text-2xl mb-2">
                  Bihar Student <span className="text-amber-300">Credit Card</span>
                </h1>
                <p className="text-blue-100 text-sm">
                  Get up to ₹4 lakh for higher education at minimal interest. We process it completely <strong className="text-amber-300">FREE</strong>.
                </p>
                <div className="flex gap-3 justify-center mt-4">
                  <span className="text-xs bg-white/15 border border-white/25 rounded-full px-3 py-1.5 font-semibold">₹4 Lakh Max</span>
                  <span className="text-xs bg-white/15 border border-white/25 rounded-full px-3 py-1.5 font-semibold">100% Free Processing</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleGateSubmit} className="p-6 sm:p-8 space-y-4">
                <div className="text-center mb-2">
                  <Lock className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-700">Fill your details to view colleges & scheme info</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name *</label>
                  <input name="student_name" type="text" required placeholder="Apna poora naam likhein"
                    maxLength={100} minLength={2}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number *</label>
                  <input name="phone" type="tel" required placeholder="10-digit mobile number"
                    maxLength={13}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Course Interest</label>
                  <select name="course"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 text-sm bg-white">
                    <option value="">-- Select Course --</option>
                    {COURSES.map((c, i) => <option key={i} value={c}>{c}</option>)}
                  </select>
                </div>

                {formError && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <p className="text-sm text-red-600">{formError}</p>
                  </div>
                )}

                <button type="submit" disabled={formLoading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60">
                  {formLoading ? "Submitting..." : <><Send className="w-4 h-4" /> View All Details — Free</>}
                </button>
                <p className="text-center text-xs text-gray-400">
                  Your details are safe. We'll contact you for free guidance.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  /* ─── MAIN CONTENT (UNLOCKED) ──────────────────────────── */
  return (
    <>
      <SEOHead
        title="Bihar Student Credit Card Yojana — Free Help | SIAT"
        description="Bihar Student Credit Card Yojana ke liye free apply karein. Up to ₹4 lakh financial support. SIAT aapki poori application process bilkul FREE mein karega."
      />

      <div className="min-h-screen bg-white overflow-x-hidden">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-500/30" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-indigo-500/20" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center p-1.5">
                <img src={siatLogo} alt="SIAT" className="w-full h-full object-contain" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm leading-tight">SIAT</p>
                <p className="text-blue-200 text-xs leading-tight">Saharsa Institute of Advance Technology</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 rounded-full px-4 py-2 mb-5">
              <Shield className="w-4 h-4 text-amber-300" />
              <span className="text-amber-200 font-semibold text-xs sm:text-sm tracking-wide">Bihar Government Official Scheme · 7 Nischay Yojana</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="font-display font-black text-3xl sm:text-5xl md:text-6xl leading-tight tracking-tight mb-4">
              Bihar Student<br /><span className="text-amber-300">Credit Card</span> Yojana
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }} className="text-blue-100 text-base sm:text-lg max-w-xl mx-auto mb-3 leading-relaxed">
              Get up to <strong className="text-white">₹4 lakh</strong> financial support for higher education. Bihar government's flagship scheme — we process it completely <strong className="text-amber-300">FREE.</strong>
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }} className="flex flex-wrap gap-3 justify-center mb-10">
              {[
                { icon: "₹", label: "₹4 Lakh Max" },
                { icon: "🎓", label: "Easy Repayment" },
                { icon: "✅", label: "100% Free Processing" },
                { icon: "🏛️", label: "Govt. Approved" },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-2 text-sm font-semibold">
                  <span>{p.icon}</span> {p.label}
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.68 }} className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://wa.me/919942115058?text=Bihar%20Student%20Credit%20Card%20ke%20baare%20mein%20jaankari%20chahiye" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base bg-amber-400 text-gray-900 shadow-lg shadow-amber-500/30 hover:bg-amber-300 hover:-translate-y-1 transition-all duration-200">
                📲 WhatsApp Us <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          <div className="relative h-12 sm:h-16 -mb-1">
            <svg viewBox="0 0 1440 60" className="absolute bottom-0 w-full" preserveAspectRatio="none">
              <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* ── KEY FACTS ─────────────────────────────────────── */}
        <section className="py-14 sm:py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: IndianRupee, val: "₹4,00,000", label: "Maximum Support", sub: "Under Bihar 7 Nischay Scheme", color: "bg-blue-50 text-blue-600" },
                { icon: Clock, val: "Easy", label: "Repayment Terms", sub: "Start after getting job", color: "bg-green-50 text-green-600" },
                { icon: Shield, val: "No Guarantor", label: "Required", sub: "Simple documentation", color: "bg-purple-50 text-purple-600" },
                { icon: GraduationCap, val: "Repay After", label: "Getting Job", sub: "No EMI while studying", color: "bg-amber-50 text-amber-600" },
              ].map((s, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <motion.div whileHover={{ y: -4 }} className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className={`w-11 h-11 rounded-xl ${s.color} flex items-center justify-center mx-auto mb-3`}>
                      <s.icon className="w-5 h-5" />
                    </div>
                    <p className="font-display font-black text-gray-900 text-lg sm:text-xl leading-tight mb-1">{s.val}</p>
                    <p className="font-semibold text-gray-700 text-xs sm:text-sm">{s.label}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{s.sub}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT SCHEME ──────────────────────────────────── */}
        <section className="py-14 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <Reveal>
                  <p className="text-blue-600 font-bold text-xs tracking-[4px] uppercase mb-2">About the Scheme</p>
                  <h2 className="font-display font-black text-gray-900 text-2xl sm:text-3xl md:text-4xl leading-tight mb-5">
                    What is Bihar<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Student Credit Card?</span>
                  </h2>
                </Reveal>
                <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                  {[
                    "Bihar government's flagship initiative under \"7 Nischay — Arthik Hal Yuvaon Ko Bal\" by CM Nitish Kumar.",
                    "Provides up to ₹4 lakh Sahyog for higher education after 12th. Covers tuition fees, hostel, food expenses, and books & stationery.",
                    "Very low interest rate. Repayment starts 2 year after course or after getting a job.",
                    "No income bar — ALL families are eligible regardless of income.",
                  ].map((text, i) => (
                    <Reveal key={i} delay={i * 0.1}>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <p>{text}</p>
                      </div>
                    </Reveal>
                  ))}
                  <Reveal delay={0.4}>
                    <div className="flex items-center gap-2 bg-blue-100 border border-blue-200 rounded-xl px-4 py-3 mt-2">
                      <Globe className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <p className="text-xs font-semibold text-blue-700">
                        Official portal: <a href="https://7nishchay-yuvaupmission.bihar.gov.in" target="_blank" rel="noopener noreferrer" className="underline">7nishchay-yuvaupmission.bihar.gov.in</a>
                      </p>
                    </div>
                  </Reveal>
                </div>
              </div>
              <Reveal delay={0.2}>
                <div className="bg-white rounded-3xl border border-blue-100 p-7 shadow-sm">
                  <p className="font-display font-bold text-gray-900 text-lg mb-5 text-center">Who Can Apply?</p>
                  <div className="space-y-3">
                    {[
                      "Bihar domicile student (residential certificate required)",
                      "Age 25 years or below",
                      "Passed 12th from a recognized board",
                      "Admission in a recognized college / university",
                      "No income bar — ALL family income groups eligible",
                      "Both boys and girls can apply",
                    ].map((item, i) => (
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
          </div>
        </section>

        {/* ── DOCUMENTS REQUIRED ────────────────────────────── */}
        <section className="py-14 sm:py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <Reveal><p className="text-blue-600 font-bold text-xs tracking-[4px] uppercase mb-2">Documents Required</p></Reveal>
              <Reveal delay={0.1}><h2 className="font-display font-black text-gray-900 text-2xl sm:text-3xl md:text-4xl">Documents <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Checklist</span></h2></Reveal>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                {
                  icon: "👤", title: "Student (Applicant)", color: "border-blue-200 bg-blue-50/40",
                  items: ["Email ID / Mobile Number", "Passport Size Photo (2 pieces)", "Aadhaar Card", "Residential / Domicile Certificate", "Bank Passbook", "10th Marksheet & Certificate", "12th Marksheet / Provisional", "Graduation Marksheet (if applicable)"],
                },
                {
                  icon: "👨‍👩‍👧", title: "Parent / Guardian", color: "border-purple-200 bg-purple-50/40",
                  items: ["Email ID / Mobile Number", "Passport Size Photo (2 pieces)", "Aadhaar Card"],
                },
                {
                  icon: "🏫", title: "College Documents", color: "border-amber-200 bg-amber-50/40",
                  items: ["Bonafide Certificate — ₹10,000 (adjustable in fees)", "Registration Fee — ₹2,000"],
                },
              ].map((doc, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.div whileHover={{ y: -4 }} className={`border-2 ${doc.color} rounded-2xl p-6 h-full`}>
                    <div className="text-3xl mb-3">{doc.icon}</div>
                    <h3 className="font-display font-bold text-gray-900 mb-4">{doc.title}</h3>
                    <ul className="space-y-2">
                      {doc.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW WE HELP ───────────────────────────────────── */}
        <section className="py-14 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="max-w-5xl mx-auto text-center">
            <Reveal><p className="text-green-600 font-bold text-xs tracking-[4px] uppercase mb-2">How We Help You Apply</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display font-black text-gray-900 text-2xl sm:text-3xl md:text-4xl mb-3">
                End-to-End Support — <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Completely Free</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-gray-500 text-sm sm:text-base mb-10 max-w-md mx-auto">विकसित बिहार के 7 निश्चय — आर्थिक हल, युवाओं को बल</p>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: "📋", step: "1", title: "Contact Us", desc: "Call or WhatsApp us with your basic details" },
                { icon: "✅", step: "2", title: "Eligibility Check", desc: "We verify if you qualify for BSCC" },
                { icon: "📁", step: "3", title: "Document Collection", desc: "We give you the exact checklist" },
                { icon: "💻", step: "4", title: "Online Application", desc: "We fill the portal for you at 7nishchay-yuvaupmission.bihar.gov.in" },
                { icon: "🏦", step: "5", title: "DRCC Verification", desc: "We coordinate with the District office" },
                { icon: "💰", step: "6", title: "Disbursement", desc: "Amount goes directly to the college" },
              ].map((s, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl border border-green-100 p-6 text-left shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center text-xl">{s.icon}</div>
                      <span className="text-xs font-bold text-green-600 bg-green-50 border border-green-200 rounded-full px-3 py-1">Step {s.step}</span>
                    </div>
                    <h3 className="font-display font-bold text-gray-900 mb-2">{s.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── APPROVED COURSES ──────────────────────────────── */}
        <section className="py-14 sm:py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <Reveal><p className="text-blue-600 font-bold text-xs tracking-[4px] uppercase mb-2">Eligible Courses</p></Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display font-black text-gray-900 text-2xl sm:text-3xl md:text-4xl mb-3">
                  Approved Courses <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">(36+ Courses)</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
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

        {/* ── PARTNER COLLEGES ──────────────────────────────── */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Reveal><p className="text-blue-600 font-bold text-xs tracking-[4px] uppercase mb-2">Partner Colleges</p></Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display font-black text-gray-900 text-2xl sm:text-3xl md:text-4xl mb-3">
                  Our Partner <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Colleges & Universities</span>
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-gray-500 text-sm max-w-lg mx-auto">
                  25+ colleges across India. Fee packages include hostel where mentioned. Contact us for latest updates and more options.
                </p>
              </Reveal>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {COLLEGES.map((college, i) => (
                <CollegeCard key={i} college={college} index={i} />
              ))}
            </div>
            <Reveal delay={0.2}>
              <div className="text-center mt-10 bg-white rounded-2xl border border-blue-100 p-8">
                <p className="font-display font-bold text-gray-900 text-lg mb-2">And many more colleges...</p>
                <p className="text-gray-500 text-sm mb-4">25+ partner colleges across India. Contact us for the complete list and latest fee structures.</p>
                <a href="https://wa.me/919942115058?text=Bihar%20Student%20Credit%20Card%20colleges%20ki%20list%20chahiye" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-green-600 hover:bg-green-700 transition-colors">
                  📲 WhatsApp for Full List
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FAQs ──────────────────────────────────────────── */}
        <section className="py-14 sm:py-16 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <Reveal><p className="text-blue-600 font-bold text-xs tracking-[4px] uppercase mb-2">FAQs</p></Reveal>
              <Reveal delay={0.1}><h2 className="font-display font-black text-gray-900 text-2xl sm:text-3xl md:text-4xl">Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Questions</span></h2></Reveal>
            </div>
            <Reveal delay={0.15}>
              <div className="space-y-3">
                {FAQS.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CONTACT ───────────────────────────────────────── */}
        <section className="py-14 sm:py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <p className="text-green-600 font-bold text-xs tracking-[4px] uppercase mb-2">Contact</p>
              <h2 className="font-display font-black text-gray-900 text-2xl sm:text-3xl md:text-4xl mb-3">
                Get Free Help <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Now</span>
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-3 gap-4 mb-10 mt-8">
              {[
                { icon: Phone, title: "Call / WhatsApp", lines: ["+91 99421 15058", "+91 70042 16219"], href: "https://wa.me/919942115058", color: "bg-green-50 border-green-200 text-green-600" },
                { icon: MapPin, title: "Visit Us", lines: ["B/O Station Road, Gamhariya", "Bajnathpur Chowk, Saharsa"], href: "https://maps.google.com/?q=Gamharia+Saharsa", color: "bg-blue-50 border-blue-200 text-blue-600" },
                { icon: Globe, title: "Website", lines: ["www.siat.in", "Mon–Sat · 9AM–6PM"], href: "https://www.siat.in", color: "bg-purple-50 border-purple-200 text-purple-600" },
              ].map((c, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.a href={c.href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ y: -4 }}
                    className={`block bg-white border-2 ${c.color.split(" ")[1]} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all`}>
                    <div className={`w-11 h-11 rounded-xl ${c.color.split(" ")[0]} flex items-center justify-center mx-auto mb-3`}>
                      <c.icon className={`w-5 h-5 ${c.color.split(" ")[2]}`} />
                    </div>
                    <p className="font-bold text-gray-900 text-sm mb-2">{c.title}</p>
                    {c.lines.map((line, j) => <p key={j} className="text-gray-500 text-xs">{line}</p>)}
                  </motion.a>
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
                <p className="text-blue-100 text-sm mb-5 max-w-sm mx-auto">
                  Empowering Skills · Building Careers<br />Bihar Student Credit Card — 100% Free Processing
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="https://wa.me/919942115058" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm text-gray-900 bg-amber-400 hover:bg-amber-300 hover:-translate-y-0.5 transition-all">
                    📲 WhatsApp — Free Help
                  </a>
                  <Link to="/"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm text-white bg-white/15 border border-white/30 hover:bg-white/25 hover:-translate-y-0.5 transition-all">
                    🌐 Visit SIAT Website
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────────────── */}
        <footer className="bg-gray-900 text-white py-8 px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img src={siatLogo} alt="SIAT" className="w-8 h-8 rounded-lg object-contain" />
            <div className="text-left">
              <p className="font-bold text-sm">SIAT</p>
              <p className="text-gray-400 text-xs">Saharsa Institute of Advance Technology</p>
            </div>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed mb-2">
            Reg. No.: SH-6061 · UDYAM-BR-29-0035052 · ISO 9001:2015 Certified
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center text-xs">
            <a href="https://www.siat.in" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">🌐 www.siat.in</a>
            <a href="tel:+919942115058" className="text-gray-400 hover:text-white">📞 +91 99421 15058</a>
            <a href="tel:+917004216219" className="text-gray-400 hover:text-white">📞 +91 70042 16219</a>
          </div>
        </footer>

      </div>
    </>
  );
}
