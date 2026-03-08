import { useRef, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import siatLogo from "@/assets/siat-logo.png";

const ParticleBackground = lazy(() => import("@/components/ParticleBackground"));

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.85]);

  return (
    <section ref={ref} className="relative min-h-[100vh] flex items-center overflow-hidden noise-overlay" style={{ background: "var(--gradient-hero)" }}>
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

      {/* Cinematic gradient orbs */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full opacity-[0.12] blur-[120px] pointer-events-none"
        style={{ background: "hsl(260 70% 50%)", top: "-20%", left: "-15%" }}
        animate={{ x: [0, 80, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.1] blur-[100px] pointer-events-none"
        style={{ background: "hsl(185 90% 55%)", bottom: "-10%", right: "-10%" }}
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-[0.08] blur-[80px] pointer-events-none"
        style={{ background: "hsl(215 80% 48%)", top: "50%", left: "50%" }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={{ y, opacity, scale }} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <motion.img
              src={siatLogo}
              alt="SIAT Logo"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full"
              style={{ boxShadow: "0 0 30px hsl(215 80% 48% / 0.4)" }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
            />
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold border"
              style={{
                background: "hsl(var(--primary) / 0.1)",
                borderColor: "hsl(var(--primary) / 0.3)",
                color: "hsl(var(--neon-cyan))",
              }}>
              Bihar's Most Trusted Organization
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="hero-giant-text mb-8"
          >
            SIAT –{" "}
            <span className="gradient-text">Bihar's Leading</span>{" "}
            Training, IT & Consultancy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl max-w-2xl mb-4 leading-relaxed"
            style={{ color: "hsl(0 0% 100% / 0.6)" }}
          >
            Empowering students, businesses, and government initiatives through skill development, technology, and consultancy.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base max-w-2xl mb-12 leading-relaxed italic"
            style={{ color: "hsl(0 0% 100% / 0.35)" }}
          >
            "Apna future banayein SIAT ke saath — skill seekhein, technology apnaayein, aur Bihar ko aage le jaayein!"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/contact-us" className="btn-primary-glow">
              Apply Now
            </Link>
            <Link to="/about-us" className="btn-outline-glow">
              Explore Services
            </Link>
          </motion.div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 md:gap-16 mt-20">
            {[
              { value: "10K+", label: "Students Trained" },
              { value: "500+", label: "Projects Delivered" },
              { value: "50+", label: "Gov. Partnerships" },
              { value: "ISO", label: "Certified" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 100 }}
              >
                <p className="text-3xl md:text-5xl font-display font-black gradient-text">{stat.value}</p>
                <p className="text-sm mt-1" style={{ color: "hsl(0 0% 100% / 0.4)" }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full flex items-start justify-center p-1.5"
          style={{ border: "2px solid hsl(0 0% 100% / 0.15)" }}>
          <motion.div
            className="w-1.5 h-3 rounded-full"
            style={{ background: "hsl(var(--neon-cyan))" }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
