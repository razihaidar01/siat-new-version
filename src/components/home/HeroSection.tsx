import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const FloatingShape = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <div className={`absolute rounded-full opacity-20 blur-3xl ${className}`} style={style} />
);

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  return (
    <section ref={ref} className="relative min-h-[100vh] flex items-center overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      {/* Floating shapes */}
      <FloatingShape className="w-[500px] h-[500px] bg-primary/30 top-[-100px] right-[-100px] animate-float" />
      <FloatingShape className="w-[400px] h-[400px] bg-accent/20 bottom-[-50px] left-[-50px] animate-float" style={{ animationDelay: "3s" } as any} />
      <FloatingShape className="w-[200px] h-[200px] bg-gold/20 top-[30%] left-[60%] animate-float" style={{ animationDelay: "1.5s" } as any} />

      <motion.div style={{ y, opacity, scale }} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20">
              Bihar's Most Trusted Organization
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-7xl font-display font-black leading-[1.1] text-foreground mb-6"
          >
            SIAT Group –{" "}
            <span className="gradient-text">Bihar's Leading</span>{" "}
            Training, IT & Consultancy Organization
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            Empowering students, businesses, and government initiatives through skill development, technology, and consultancy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/contact-us" className="btn-primary-glow">
              Apply Now
            </Link>
            <Link to="/contact-us" className="btn-outline-glow">
              Contact Us
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-8 md:gap-14 mt-16"
          >
            {[
              { value: "10K+", label: "Students Trained" },
              { value: "500+", label: "Projects Delivered" },
              { value: "50+", label: "Gov. Partnerships" },
              { value: "ISO", label: "Certified" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-display font-black text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
