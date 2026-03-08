import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Monitor, BookOpen, Building, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const subjects = ["Programming (C, C++, Java, Python)", "Database Management Systems", "Data Structures & Algorithms", "Web Development", "Computer Networks", "Software Engineering", "Operating Systems", "Cyber Security Basics"];

const BCACollegePage = () => (
  <>
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Consultancy Services</span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          BCA College <span className="gradient-text">in Bihar</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Computer application mein career banayein — Bihar ke best BCA colleges ki jaankari aur admission support. IT industry mein apna future secure karein.
        </motion.p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/contact-us" className="btn-primary-glow">Admission Help</Link>
          <Link to="/consultancy-services/best-college-in-bihar" className="btn-outline-glow">All Colleges</Link>
        </div>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">BCA Mein Kya <span className="gradient-text">Seekhenge?</span></h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {subjects.map((s) => (<div key={s} className="flex items-center gap-3 glass-card p-4"><Monitor className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground text-sm font-medium">{s}</span></div>))}
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">BCA — IT Career Ka Gateway</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>BCA (Bachelor of Computer Applications) 3 saal ka undergraduate degree hai jo IT industry mein career ke liye ek achha gateway hai. Bihar mein kai universities BCA course offer karti hain — Patna University, Magadh University, LNMU, aur private colleges.</p>
          <p>BCA ke baad aap MCA kar sakte hain, ya directly software companies mein job le sakte hain. Web development, app development, data science, cyber security — bahut saare career options khulte hain.</p>
          <p>12th ke baad BCA ek smart choice hai — specially agar aapko computers mein interest hai. Bihar Student Credit Card se fees ka loan bhi mil sakta hai. SIAT aapko best college choose karne mein madad karega.</p>
        </div>
      </div>
    </section>

    <section className="section-padding bg-background text-center">
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/consultancy-services/admission-after-12th-bihar" className="btn-outline-glow !py-3 !px-5 !text-sm">After 12th Options</Link>
        <Link to="/rhsoftware" className="btn-outline-glow !py-3 !px-5 !text-sm">RH Software</Link>
        <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
      </div>
    </section>
  </>
);

export default BCACollegePage;
