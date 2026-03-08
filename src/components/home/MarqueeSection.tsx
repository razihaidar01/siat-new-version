import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const lines = [
  "SKILL · TECHNOLOGY · OPPORTUNITY · TRAINING ·",
  "CONSULTANCY · INNOVATION · BUILDING BIHAR'S FUTURE ·",
  "YOUR FUTURE. OUR MISSION. SIAT. ·",
];

const MarqueeSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-15%", "10%"]);

  return (
    <section ref={ref} className="py-16 overflow-hidden relative" style={{ background: "hsl(215 50% 6%)" }}>
      {/* Line 1 */}
      <motion.div style={{ x: x1 }} className="flex gap-8 whitespace-nowrap mb-4">
        {[...Array(3)].map((_, i) => (
          <span key={i} className="marquee-text">
            {lines[0]} {lines[1]}
          </span>
        ))}
      </motion.div>
      {/* Line 2 — reverse direction */}
      <motion.div style={{ x: x2 }} className="flex gap-8 whitespace-nowrap">
        {[...Array(3)].map((_, i) => (
          <span key={i} className="text-5xl md:text-7xl lg:text-[8rem] font-display font-black tracking-tighter whitespace-nowrap"
            style={{ color: "hsl(0 0% 100% / 0.03)" }}>
            {lines[2]} {lines[0]}
          </span>
        ))}
      </motion.div>
    </section>
  );
};

export default MarqueeSection;
