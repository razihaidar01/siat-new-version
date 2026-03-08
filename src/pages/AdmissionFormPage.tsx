import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ClipboardList, FileText } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const AdmissionFormPage = () => (
  <>
    <SEOHead title="Admission Form – SIAT Training Institute Bihar" description="Download the SIAT admission form for technical training courses in Bihar. Apply for mobile repairing, AC repair, laptop repair courses." />
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-4 mb-6">
          Admission <span className="gradient-text">Form</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          SIAT mein admission ke liye form bharein. Online ya offline — dono tarike se apply kar sakte hain.
        </motion.p>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-2xl mx-auto text-center">
        <div className="glass-card p-10">
          <ClipboardList className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">Apply for Admission</h2>
          <p className="text-muted-foreground mb-4">Admission process simple hai:</p>
          <div className="space-y-3 text-left max-w-sm mx-auto mb-8">
            {["Contact us ya visit karein", "Course select karein", "Documents submit karein (Aadhar, photo, marksheet)", "Fees payment karein", "Training shuru!"].map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary">{i + 1}</span>
                <span className="text-sm text-muted-foreground">{s}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact-us" className="btn-primary-glow">Apply Now</Link>
            <Link to="/training-institute/course-fees" className="btn-outline-glow">View Fees</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default AdmissionFormPage;
