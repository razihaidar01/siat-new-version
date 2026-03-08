import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building, Award, Users, Wrench, MapPin, FileCheck, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const capabilities = [
  { icon: Building, title: "Infrastructure", desc: "5000+ sq ft training facility with modern labs, classrooms, aur workshop space." },
  { icon: Users, title: "Faculty", desc: "20+ experienced trainers with industry background aur teaching expertise." },
  { icon: Award, title: "Certifications", desc: "ISO 9001:2015 certified. NSDC registered. Multiple government empanelments." },
  { icon: Wrench, title: "Equipment", desc: "Latest training equipment — mobile repair tools, AC units, laptops, CCTV systems." },
  { icon: MapPin, title: "Location", desc: "Centrally located in Saharsa, Bihar — accessible from surrounding districts." },
  { icon: FileCheck, title: "Track Record", desc: "10+ years experience. 5000+ students trained. 50+ government projects completed." },
];

const CapabilityStatementPage = () => (
  <>
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Government Projects</span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Capability <span className="gradient-text">Statement</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          SIAT ki capabilities — infrastructure, experience, certifications aur proven track record. Government aur corporate partnerships ke liye fully equipped.
        </motion.p>
        <Link to="/contact-us" className="btn-primary-glow">Request Detailed Profile</Link>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-display font-black text-foreground text-center mb-12">Our <span className="gradient-text">Capabilities</span></h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((c) => (
            <div key={c.title} className="glass-card p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><c.icon className="w-6 h-6 text-primary" /></div>
              <h3 className="font-display font-bold text-foreground mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">Key Differentiators</h2>
        <div className="space-y-3">
          {["ISO 9001:2015 certified quality management", "10+ years of operational experience", "Modern infrastructure with fully-equipped labs", "Experienced faculty with industry background", "Proven placement track record", "End-to-end project delivery capability", "Strong compliance and documentation", "Pan-Bihar operational reach"].map((d) => (
            <div key={d} className="flex items-center gap-3 glass-card p-4"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground text-sm font-medium">{d}</span></div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-background text-center">
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/government-projects/empanelment" className="btn-outline-glow !py-3 !px-5 !text-sm">Empanelment</Link>
        <Link to="/government-projects" className="btn-outline-glow !py-3 !px-5 !text-sm">All Projects</Link>
        <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
      </div>
    </section>
  </>
);

export default CapabilityStatementPage;
