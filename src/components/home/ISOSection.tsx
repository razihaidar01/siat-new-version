import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const isoList = [
  { name: "ISO 9001", desc: "Quality Management System" },
  { name: "ISO 14001", desc: "Environmental Management" },
  { name: "ISO 45001", desc: "Occupational Health & Safety" },
  { name: "ISO 27001", desc: "Information Security" },
  { name: "ISO 22000", desc: "Food Safety Management" },
  { name: "ISO 29990", desc: "Learning Services" },
  { name: "ISO 13485", desc: "Medical Devices" },
  { name: "ISO 26000", desc: "Social Responsibility" },
  { name: "SA 8000", desc: "Social Accountability" },
  { name: "CE", desc: "European Conformity" },
  { name: "HACCP", desc: "Hazard Analysis" },
  { name: "ROHS", desc: "Restriction of Hazardous Substances" },
  { name: "FCC", desc: "Federal Communications" },
];

const ISOSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding" style={{ background: "var(--gradient-section)" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <ShieldCheck className="w-4 h-4" /> ISO Certified Organization
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground mb-4">
            Certifications <span className="gradient-text">Offered</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            SIAT provides comprehensive ISO and international certification services for businesses across Bihar and India.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {isoList.map((iso, i) => (
            <motion.div
              key={iso.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-card-hover p-4 text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <p className="font-display font-bold text-foreground text-sm">{iso.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{iso.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link to="/consultancy-services/iso-certification-bihar" className="btn-primary-glow !py-3 !px-6 !text-sm">
            Get ISO Certified →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ISOSection;
