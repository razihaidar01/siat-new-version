import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, Building, Star, MapPin, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const colleges = [
  { type: "Medical", examples: "AIIMS Patna, PMCH, Darbhanga Medical College, NMCH Patna", href: "/consultancy-services/mbbs-admission-bihar" },
  { type: "Engineering", examples: "NIT Patna, BIT Mesra, IIT Patna, LNMU Engineering", href: "/consultancy-services/btech-admission-bihar" },
  { type: "BCA/IT", examples: "Patna University, Magadh University, LNMU, BIT Patna", href: "/consultancy-services/bca-college-bihar" },
  { type: "Nursing", examples: "AIIMS Patna Nursing, IGIMS, Nalanda Medical College Nursing", href: "/consultancy-services/nursing-college-bihar" },
];

const BestCollegePage = () => (
  <>
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
        <Link to="/consultancy-services/bihar-student-credit-card-admission" className="btn-outline-glow !py-3 !px-5 !text-sm">Student Credit Card</Link>
        <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
      </div>
    </section>
  </>
);

export default BestCollegePage;
