import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, CheckCircle, Building2 } from "lucide-react";

const capabilities = ["MSME sector mein education aur skill training", "Tender compliance documentation", "Quality training delivery", "Infrastructure & lab facilities", "Experienced faculty pool", "Post-training placement support"];

const MSMEEducationTenderPage = () => (
  <>
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Government Projects</span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          MSME Education <span className="gradient-text">Tender</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          SIAT MSME sector mein education tender participation ke liye fully equipped hai — capability, compliance aur documentation sab ready.
        </motion.p>
        <Link to="/contact-us" className="btn-primary-glow">Partner With Us</Link>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground mb-8">Our <span className="gradient-text">Capabilities</span></h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {capabilities.map((c) => (<div key={c} className="flex items-center gap-3 glass-card p-4"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground text-sm font-medium">{c}</span></div>))}
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">MSME Education Tenders — SIAT Ka Experience</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>MSME sector mein education aur skill development ke liye government regularly tenders release karti hai. SIAT in tenders mein actively participate karta hai aur successfully projects deliver karta hai.</p>
          <p>Hamare paas tender compliance ke liye saari required documentation ready hai — ISO certification, MSME registration, previous project experience, infrastructure proof, faculty credentials sab.</p>
          <p>Agar aapki organization MSME education tender mein participate karna chahti hai aur training delivery ke liye partner dhundh rahi hai — SIAT ek reliable partner hai. Hum end-to-end training delivery — curriculum development se certification tak — handle karte hain.</p>
        </div>
      </div>
    </section>

    <section className="section-padding bg-background text-center">
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/government-projects/capability-statement" className="btn-outline-glow !py-3 !px-5 !text-sm">Capability Statement</Link>
        <Link to="/government-projects/empanelment" className="btn-outline-glow !py-3 !px-5 !text-sm">Empanelment</Link>
        <Link to="/contact-us" className="btn-primary-glow !py-3 !px-5 !text-sm">Contact Us</Link>
      </div>
    </section>
  </>
);

export default MSMEEducationTenderPage;
