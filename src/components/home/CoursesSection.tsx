import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Smartphone, Wind, Laptop, Camera } from "lucide-react";

const courses = [
  { icon: Smartphone, title: "Mobile Repairing Course", duration: "3–6 Months", href: "/training-institute/mobile-repairing-course-bihar", description: "Chip-level mobile repair seekhein — latest smartphones par hands-on training.", hinglish: "Mobile repair ka complete course — apna shop kholein!" },
  { icon: Wind, title: "AC Repairing Course", duration: "3–6 Months", href: "/training-institute/ac-repairing-course-bihar", description: "Split & Window AC installation, servicing, aur gas charging master karein.", hinglish: "AC technician banein — demand bahut hai!" },
  { icon: Laptop, title: "Laptop Repairing Course", duration: "4–6 Months", href: "/training-institute/laptop-repairing-course-bihar", description: "Hardware & software repair — motherboard, BGA rework, OS troubleshooting.", hinglish: "Laptop repair seekhein — high-demand skill!" },
  { icon: Camera, title: "CCTV Installation Training", duration: "2–3 Months", href: "/training-institute/cctv-installation-training-bihar", description: "Complete CCTV setup, networking, DVR/NVR configuration aur maintenance.", hinglish: "CCTV expert banein — har jagah demand hai!" },
];

const CoursesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding overflow-hidden" style={{ background: "hsl(215 50% 7%)" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label">Popular Programs</span>
          <h2 className="section-heading mt-3">
            Skill Development <span className="gradient-text">Courses</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "hsl(0 0% 100% / 0.5)" }}>
            Industry-focused training with placement support aur QR-verified certificates.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, type: "spring", stiffness: 80 }}
            >
              <Link to={course.href} className="block glass-card-hover p-6 h-full group relative overflow-hidden">
                {/* Hover glow */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                  style={{ background: "hsl(var(--neon-cyan))" }} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                    style={{ background: "hsl(0 0% 100% / 0.06)" }}>
                    <course.icon className="w-6 h-6" style={{ color: "hsl(var(--neon-cyan))" }} />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-1 transition-colors" style={{ color: "white" }}>
                    {course.title}
                  </h3>
                  <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-3"
                    style={{ background: "hsl(var(--neon-cyan) / 0.1)", color: "hsl(var(--neon-cyan))" }}>
                    {course.duration}
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(0 0% 100% / 0.5)" }}>{course.description}</p>
                  <p className="text-xs italic mt-2" style={{ color: "hsl(var(--primary) / 0.6)" }}>{course.hinglish}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/training-institute" className="btn-outline-glow !py-3 !px-6 !text-sm">
            View All Courses →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
