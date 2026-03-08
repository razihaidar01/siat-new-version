import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Download, FileText } from "lucide-react";

const BrochurePage = () => (
  <>
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Download <span className="gradient-text">Brochure</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          SIAT ka detailed brochure download karein — courses, fees, infrastructure aur placement details sab ek jagah.
        </motion.p>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-2xl mx-auto text-center">
        <div className="glass-card p-10">
          <FileText className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">SIAT Information Brochure</h2>
          <p className="text-muted-foreground mb-6">Is brochure mein SIAT ke sabhi courses, fees structure, placement details, infrastructure aur contact information available hai.</p>
          <p className="text-sm text-muted-foreground mb-8">Brochure ka latest version humse request karein — hum WhatsApp ya email par bhej denge.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Request Brochure</Link>
            <Link to="/training-institute/course-fees" className="btn-outline-glow">View Fees Online</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default BrochurePage;
