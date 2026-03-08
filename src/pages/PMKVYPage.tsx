import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Award, Users, Building, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const sectors = ["IT/ITES Training", "Healthcare Training", "Electronics & Hardware", "Construction Skills", "Retail & Sales", "Automotive Skills", "Beauty & Wellness", "Agriculture Skills"];

const PMKVYPage = () => (
  <>
    <SEOHead title="PMKVY Training Center in Bihar – SIAT" description="SIAT is a registered PMKVY training center in Bihar. Free government skill training in IT, healthcare, electronics, and more sectors." />
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Government Projects</span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          PMKVY Training Center <span className="gradient-text">in Bihar</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Pradhan Mantri Kaushal Vikas Yojana (PMKVY) ka registered training center — free skill development training with government certification aur placement support.
        </motion.p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/contact-us" className="btn-primary-glow">Join PMKVY Training</Link>
          <Link to="/government-projects" className="btn-outline-glow">All Projects</Link>
        </div>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">Training <span className="gradient-text">Sectors</span></h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {sectors.map((s) => (<div key={s} className="flex items-center gap-3 glass-card p-4"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground text-sm font-medium">{s}</span></div>))}
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">PMKVY — Free Skill Training Scheme</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>PMKVY (Pradhan Mantri Kaushal Vikas Yojana) Bharat Sarkar ki flagship skill development scheme hai. Iske under youth ko free training di jaati hai — government certified certificate ke saath. SIAT is scheme ka registered training center hai Bihar mein.</p>
          <p>PMKVY ke under training bilkul free hoti hai — candidates ko koi fees nahi deni padti. Training complete hone par NSDC (National Skill Development Corporation) ka certificate milta hai jo puri India mein valid hai.</p>
          <p>SIAT ne PMKVY ke under hazaron candidates ko successfully train kiya hai. Hamare modern labs, experienced trainers aur structured curriculum ensure karta hai ki candidates industry-ready banein.</p>
        </div>
      </div>
    </section>

    <section className="section-padding bg-background text-center">
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/government-projects/skill-india-training-partner" className="btn-outline-glow !py-3 !px-5 !text-sm">Skill India</Link>
        <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Enroll Now</Link>
      </div>
    </section>
  </>
);

export default PMKVYPage;
