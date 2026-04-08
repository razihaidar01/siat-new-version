import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, Building, Star, MapPin, CheckCircle, CreditCard, IndianRupee, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const colleges = [
  { type: "Medical", examples: "AIIMS Patna, PMCH, Darbhanga Medical College, NMCH Patna", href: "/consultancy-services/mbbs-admission-bihar" },
  { type: "Engineering", examples: "NIT Patna, BIT Mesra, IIT Patna, LNMU Engineering", href: "/consultancy-services/btech-admission-bihar" },
  { type: "BCA/IT", examples: "Patna University, Magadh University, LNMU, BIT Patna", href: "/consultancy-services/bca-college-bihar" },
  { type: "Nursing", examples: "AIIMS Patna Nursing, IGIMS, Nalanda Medical College Nursing", href: "/consultancy-services/nursing-college-bihar" },
];

const BestCollegePage = () => (
  <>
    <SEOHead title="Best Colleges in Bihar – Admission Guidance by SIAT" description="Find the best colleges in Bihar for MBBS, B.Tech, BCA, Nursing. SIAT provides complete admission guidance and counseling." />
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Consultancy Services</span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Best Colleges <span className="gradient-text">in Bihar</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Bihar ke top colleges ki complete jaankari — Medical, Engineering, BCA, Nursing aur more. SIAT Consultancy se paayein expert admission guidance.
        </motion.p>
        <Link to="/contact-us" className="btn-primary-glow">Free Counseling</Link>
      </div>
    </section>

    {/* Bihar Student Credit Card CTA */}
    <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-8 md:p-12 text-white">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-indigo-500/20" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-6 h-6 text-amber-300" />
              <span className="text-amber-300 font-bold text-sm uppercase tracking-wider">Bihar Student Credit Card</span>
            </div>
            <h2 className="font-display font-black text-2xl md:text-4xl mb-4 leading-tight">
              Get up to <span className="text-amber-300">₹4 lakh</span> for higher education at minimal interest.
            </h2>
            <p className="text-blue-100 text-base md:text-lg mb-6 max-w-2xl">
              Bihar government's flagship scheme — we process it completely <strong className="text-amber-300">FREE</strong>.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-2 text-sm font-semibold">
                <IndianRupee className="w-4 h-4" /> ₹4 Lakh Max amount
              </div>
              <div className="flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-2 text-sm font-semibold">
                <CheckCircle className="w-4 h-4" /> 100% Free Processing
              </div>
            </div>
            <Link
              to="/creditcard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base bg-amber-400 text-gray-900 shadow-lg shadow-amber-500/30 hover:bg-amber-300 hover:-translate-y-1 transition-all duration-200"
            >
              Apply Now — It's Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-display font-black text-foreground text-center mb-12">Top Colleges <span className="gradient-text">by Category</span></h2>
        <div className="space-y-6">
          {colleges.map((c) => (
            <Link key={c.type} to={c.href} className="block glass-card-hover p-6 group">
              <h3 className="font-display font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">{c.type} Colleges</h3>
              <p className="text-sm text-muted-foreground">{c.examples}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">Bihar Ke Best Colleges — Complete Guide</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>Bihar mein bahut saare achhe colleges hain — lekin sahi college choose karna bahut zaroori hai. SIAT Consultancy aapko Bihar ke top colleges ki poori jaankari deta hai aur admission process mein madad karta hai.</p>
          <p>Chahein aap MBBS karna chahein, B.Tech, BCA, Nursing, ya koi aur course — hum aapke marks, budget aur career goals ke hisaab se best colleges suggest karte hain. Admission application, counseling dates, document preparation — sab mein guidance milti hai.</p>
          <p>Bihar Student Credit Card scheme ke through bhi admission possible hai — hum wo process bhi handle karte hain. Agar aap 12th ke baad confuse hain ki kya karein — SIAT se free counseling lein.</p>
        </div>
      </div>
    </section>

    <section className="section-padding bg-background text-center">
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/consultancy-services/admission-after-12th-bihar" className="btn-outline-glow !py-3 !px-5 !text-sm">After 12th Options</Link>
        <Link to="/creditcard" className="btn-outline-glow !py-3 !px-5 !text-sm">Student Credit Card</Link>
        <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
      </div>
    </section>
  </>
);

export default BestCollegePage;
