import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, GraduationCap, Users, Building } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const areas = [
  { title: "Skill Development Training", desc: "Technical aur vocational training programs for underprivileged youth." },
  { title: "Digital Literacy", desc: "Computer basics, internet, aur digital skills for rural communities." },
  { title: "Women Empowerment", desc: "Skill training specifically designed for women — self-reliance ke liye." },
  { title: "Infrastructure Support", desc: "Labs, equipment, aur training material funding for educational centers." },
];

const CSREducationPage = () => (
  <>
    <SEOHead title="CSR Education Projects – SIAT Bihar" description="Partner with SIAT for CSR education projects in Bihar. Skill development, digital literacy, and women empowerment programs." />
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Government Projects</span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          CSR Education <span className="gradient-text">Projects</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Corporate Social Responsibility ke through education aur skill development initiatives. Companies SIAT ke saath partner karke Bihar mein impact create kar sakti hain.
        </motion.p>
        <Link to="/contact-us" className="btn-primary-glow">Partner With Us</Link>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">CSR <span className="gradient-text">Focus Areas</span></h2>
        <div className="grid md:grid-cols-2 gap-6">
          {areas.map((a) => (
            <div key={a.title} className="glass-card p-6">
              <h3 className="font-display font-bold text-foreground mb-2">{a.title}</h3>
              <p className="text-sm text-muted-foreground">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">CSR Ke Through Education — Real Impact</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>Companies Act 2013 ke under, qualifying companies ko apni net profit ka 2% CSR activities par spend karna hota hai. Education aur skill development sabse impactful CSR areas mein se ek hai.</p>
          <p>SIAT companies ke saath partner karke Bihar mein quality skill development programs implement karta hai. Hum end-to-end project management provide karte hain — need assessment se impact reporting tak.</p>
          <p>Hamare CSR projects mein underprivileged youth, women, aur rural communities ko priority di jaati hai. Training ke baad placement support bhi diya jaata hai taaki training ka real-world impact ho.</p>
        </div>
      </div>
    </section>

    <section className="section-padding bg-background text-center">
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/government-projects/capability-statement" className="btn-outline-glow !py-3 !px-5 !text-sm">Capability Statement</Link>
        <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Discuss CSR Partnership</Link>
      </div>
    </section>
  </>
);

export default CSREducationPage;
