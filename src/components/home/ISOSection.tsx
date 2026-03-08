import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Shield, Leaf, HeartPulse, Cpu, Factory, BookOpen, Users, Globe, FileCheck, CircuitBoard, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const certifications = [
  { name: "ISO 9001", desc: "Quality Management System", icon: Shield },
  { name: "ISO 14001", desc: "Environmental Management", icon: Leaf },
  { name: "ISO 45001", desc: "Occupational Health & Safety", icon: HeartPulse },
  { name: "ISO 27001", desc: "Information Security", icon: Cpu },
  { name: "ISO 22000", desc: "Food Safety Management", icon: Factory },
  { name: "ISO 29990", desc: "Learning Services", icon: BookOpen },
  { name: "ISO 13485", desc: "Medical Devices Quality", icon: HeartPulse },
  { name: "ISO 26000", desc: "Social Responsibility", icon: Users },
  { name: "SA 8000", desc: "Social Accountability", icon: Users },
  { name: "CE", desc: "European Conformity", icon: Globe },
  { name: "HACCP", desc: "Hazard Analysis", icon: FileCheck },
  { name: "ROHS", desc: "Hazardous Substances", icon: Leaf },
  { name: "FCC", desc: "Federal Communications", icon: CircuitBoard },
];

const ISOSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={ref} className="section-padding overflow-hidden relative" style={{ background: "hsl(215 50% 7%)" }}>
      {/* Sliding background text */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none overflow-hidden">
        <motion.p style={{ x: x1 }} className="text-[8rem] md:text-[12rem] font-display font-black whitespace-nowrap leading-none"
          style={{ color: "hsl(0 0% 100% / 0.02)", x: x1 }}>
          ISO CERTIFIED · QUALITY · TRUST · EXCELLENCE ·
        </motion.p>
        <motion.p style={{ x: x2 }} className="text-[8rem] md:text-[12rem] font-display font-black whitespace-nowrap leading-none"
          style={{ color: "hsl(0 0% 100% / 0.02)", x: x2 }}>
          · STANDARDS · COMPLIANCE · ASSURANCE · RELIABILITY
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="section-label inline-block mb-6"
          >
            Certifications Offered
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-heading mb-6"
          >
            ISO Certified — <span className="gradient-text">Quality You Can Trust</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ color: "hsl(0 0% 100% / 0.5)" }}
          >
            SIAT ek ISO certified organization hai jo international quality standards follow karta hai.
            Apne business ke liye bhi certification chahiye? Hum madad karenge.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.04, type: "spring", stiffness: 100 }}
              className="glass-card-hover p-4 text-center group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110"
                style={{ background: "var(--gradient-glow)" }}>
                <cert.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-display font-bold mb-1" style={{ color: "white" }}>{cert.name}</h3>
              <p className="text-xs leading-snug" style={{ color: "hsl(0 0% 100% / 0.4)" }}>{cert.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link to="/consultancy-services/iso-certification-bihar"
            className="inline-flex items-center gap-2 btn-primary-glow !text-base">
            ISO Certification Paayein <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ISOSection;
