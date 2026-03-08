import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, Code2, Briefcase, Landmark, ArrowRight } from "lucide-react";

const divisions = [
  {
    icon: GraduationCap,
    title: "Training Institute",
    description: "Industry-ready skill development programs — mobile, laptop & AC repairing, CCTV installation with placement support aur QR-verified certificates.",
    hinglish: "Practical training se career banayein — job-ready skills seekhein!",
    href: "/training-institute",
    features: ["Practical Labs", "Certified Instructors", "Job Placement"],
    glow: "hsl(185 90% 55%)",
  },
  {
    icon: Code2,
    title: "RH Software",
    description: "Full-stack IT solutions — website, app, software, aur AI development. Bihar ke businesses ko digital banayein.",
    hinglish: "Apna business online le jaayein — website se app tak sab banwayein!",
    href: "/rh-software",
    features: ["Web & Mobile Apps", "AI Solutions", "Enterprise Software"],
    glow: "hsl(260 70% 50%)",
  },
  {
    icon: Briefcase,
    title: "Consultancy Services",
    description: "College admissions (MBBS, B.Tech, BCA, Nursing), ISO certification, MSME registration, aur career counseling mein expert guidance.",
    hinglish: "Admission se certification tak — sab kuch ek jagah!",
    href: "/consultancy-services",
    features: ["MBBS Admission", "ISO Certification", "Career Counseling"],
    glow: "hsl(215 80% 48%)",
  },
  {
    icon: Landmark,
    title: "Government Projects",
    description: "PMKVY, Skill India, MSME tenders, aur CSR education projects ke liye trusted partner — proven infrastructure aur compliance.",
    hinglish: "Sarkar ka bharosemand partner — skill training aur project delivery mein!",
    href: "/government-projects",
    features: ["PMKVY Center", "Skill India Partner", "Tender Compliance"],
    glow: "hsl(40 85% 55%)",
  },
];

const DivisionsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "var(--gradient-section)" }}>
      {/* Giant background text */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none select-none flex items-center justify-center">
        <p className="text-[12rem] md:text-[20rem] font-display font-black leading-none"
          style={{ color: "hsl(0 0% 100% / 0.02)" }}>SIAT</p>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label">What We Do</span>
          <h2 className="section-heading mt-3">
            Our Four <span className="gradient-text">Divisions</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg" style={{ color: "hsl(0 0% 100% / 0.5)" }}>
            Ek complete ecosystem — Bihar ko education, technology, aur institutional growth se empower karna.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {divisions.map((div, i) => (
            <motion.div
              key={div.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, type: "spring", stiffness: 70 }}
            >
              <Link to={div.href} className="block glow-card glass-card-hover p-8 md:p-10 group relative overflow-hidden">
                {/* Glow orb on hover */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 blur-[60px] transition-opacity duration-700 pointer-events-none"
                  style={{ background: div.glow }} />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                    style={{ background: "var(--gradient-glow)" }}>
                    <div.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-2 flex items-center gap-2 transition-colors"
                    style={{ color: "white" }}>
                    {div.title}
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>
                  <p className="text-sm italic mb-3" style={{ color: "hsl(var(--neon-cyan) / 0.7)" }}>{div.hinglish}</p>
                  <p className="leading-relaxed mb-6" style={{ color: "hsl(0 0% 100% / 0.5)" }}>{div.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {div.features.map((f) => (
                      <span key={f} className="px-3 py-1 text-xs font-medium rounded-full"
                        style={{ background: "hsl(0 0% 100% / 0.06)", color: "hsl(0 0% 100% / 0.7)" }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DivisionsSection;
