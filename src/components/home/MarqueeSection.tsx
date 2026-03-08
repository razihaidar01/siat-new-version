import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const MarqueeSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={ref} className="py-8 overflow-hidden" style={{ background: "var(--gradient-section)" }}>
      <motion.div style={{ x }} className="flex gap-8 whitespace-nowrap">
        {[...Array(3)].map((_, i) => (
          <span key={i} className="marquee-text text-foreground">
            SKILL &nbsp;·&nbsp; TECHNOLOGY &nbsp;·&nbsp; OPPORTUNITY &nbsp;·&nbsp; TRAINING &nbsp;·&nbsp; CONSULTANCY &nbsp;·&nbsp; INNOVATION &nbsp;·&nbsp; BUILDING BIHAR'S FUTURE &nbsp;·&nbsp;
          </span>
        ))}
      </motion.div>
    </section>
  );
};

export default MarqueeSection;
