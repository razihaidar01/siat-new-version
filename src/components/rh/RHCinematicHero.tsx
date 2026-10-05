import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import studioImage from "@/assets/rh-cinematic-studio.jpg";

type Props = { chapter: string; eyebrow: string; title: ReactNode; description: string; children?: ReactNode; home?: boolean };

export default function RHCinematicHero({ chapter, eyebrow, title, description, children, home = false }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]);
  const enter = { initial: { opacity: 0, y: reduced ? 0 : 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: reduced ? 0 : 0.9 } };
  return (
    <section ref={ref} className={`rh-cinematic-hero ${home ? "rh-cinematic-home" : ""}`}>
      <motion.div className="rh-cinematic-media" style={{ y }} aria-hidden="true">
        <img src={studioImage} alt="" width={1920} height={1088} fetchPriority="high" />
      </motion.div>
      <div className="rh-cinematic-scrim" aria-hidden="true" />
      <div className="rh-cinematic-inner">
        <motion.div {...enter} className="rh-chapter"><span>{chapter}</span><span>{eyebrow}</span></motion.div>
        <motion.h1 {...enter} className="rh-cinematic-title">{title}</motion.h1>
        <motion.p {...enter} className="rh-cinematic-description">{description}</motion.p>
        {children && <motion.div {...enter} className="rh-cinematic-actions">{children}</motion.div>}
      </div>
      <div className="rh-cinematic-bottom"><span>RH Software · Bihar, India</span><ArrowDown size={16} aria-hidden="true" /></div>
    </section>
  );
}
