import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const empanelments = [
  "National Skill Development Corporation (NSDC)",
  "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
  "Skill India Mission",
  "Bihar Skill Development Mission",
  "District Administration, Saharsa",
  "MSME Development Institute",
];

const EmpanelmentPage = () => (
  <>
    <SEOHead title="Government Empanelment – SIAT Bihar" description="SIAT is empanelled with NSDC, PMKVY, Skill India Mission, and Bihar Skill Development Mission for government training projects." />
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Government Projects</span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Government <span className="gradient-text">Empanelment</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          SIAT multiple government bodies ke saath empanelled hai — proven credibility aur compliance ke saath.
        </motion.p>
        <Link to="/contact-us" className="btn-primary-glow">Request Details</Link>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">Our <span className="gradient-text">Empanelments</span></h2>
        <div className="space-y-4">
          {empanelments.map((e) => (
            <div key={e} className="flex items-center gap-4 glass-card p-5">
              <Shield className="w-6 h-6 text-primary flex-shrink-0" />
              <span className="text-foreground font-medium">{e}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">Empanelment — Trust & Credibility</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>Government empanelment ek organization ki credibility, capability aur compliance ka proof hai. SIAT ko multiple government bodies ne apne registered training partner ke roop mein empanel kiya hai.</p>
          <p>Ye empanelments prove karti hain ki SIAT ke paas required infrastructure, qualified faculty, aur quality training delivery ki capability hai. Government projects mein participate karne ke liye ye empanelments essential hain.</p>
          <p>Agar aap SIAT ke saath partnership ya sub-contracting mein interested hain, toh humse contact karein. Hum detailed empanelment documents aur credentials share kar sakte hain.</p>
        </div>
      </div>
    </section>

    <section className="section-padding bg-background text-center">
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/government-projects/capability-statement" className="btn-outline-glow !py-3 !px-5 !text-sm">Capability Statement</Link>
        <Link to="/government-projects" className="btn-outline-glow !py-3 !px-5 !text-sm">All Projects</Link>
        <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
      </div>
    </section>
  </>
);

export default EmpanelmentPage;
