import { Component, Suspense, lazy, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import studioImage from "@/assets/rh-cinematic-studio.jpg";
import type { GatewayPalette } from "./RHGatewayScene";

const RHGatewayScene = lazy(() => import("./RHGatewayScene"));
class SceneFallback extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

type Props = { chapter: string; eyebrow: string; title: ReactNode; description: string; children?: ReactNode; home?: boolean };

export default function RHCinematicHero({ chapter, eyebrow, title, description, children, home = false }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [palette, setPalette] = useState<GatewayPalette | null>(null);
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });
  const onReady = useCallback(() => setReady(true), []);
  useEffect(() => {
    const element = ref.current;
    if (!home || !element) return;
    const media = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => {
      setReady(false);
      if (!media.matches) { setPalette(null); return; }
      const styles = getComputedStyle(element);
      const token = (name: string) => styles.getPropertyValue(name).trim();
      setPalette({ background: token("--rh-scene-bg"), metal: token("--rh-scene-metal"), floor: token("--rh-scene-floor"), accent: token("--rh-scene-accent"), light: token("--rh-scene-light") });
    };
    let inView = true;
    const updateActivity = () => setActive(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; updateActivity(); });
    observer.observe(element);
    update();
    media.addEventListener("change", update);
    document.addEventListener("visibilitychange", updateActivity);
    return () => { observer.disconnect(); media.removeEventListener("change", update); document.removeEventListener("visibilitychange", updateActivity); };
  }, [home]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]);
  const enter = (order: number) => ({ initial: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: reduced ? 0 : 0.9, delay: reduced || !home ? 0 : order * 0.13, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } });
  return (
    <section ref={ref} className={`rh-cinematic-hero ${home ? "rh-cinematic-home" : ""}`}
      onPointerMove={home ? (event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        pointer.current.x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
        pointer.current.y = 1 - (event.clientY - bounds.top) / bounds.height * 2;
      } : undefined}
      onPointerLeave={home ? () => { pointer.current = { x: 0, y: 0 }; } : undefined}>
      <motion.div className="rh-cinematic-media" style={{ y }} aria-hidden="true">
        <img src={studioImage} alt="" width={1920} height={1088} fetchPriority="high" />
      </motion.div>
      {home && palette && <div className={`rh-gateway-scene ${ready ? "is-ready" : ""}`} aria-hidden="true">
        <SceneFallback><Suspense fallback={null}>
          <RHGatewayScene palette={palette} pointer={pointer} progress={scrollYProgress} active={active} onReady={onReady} />
        </Suspense></SceneFallback>
      </div>}
      <div className="rh-cinematic-scrim" aria-hidden="true" />
      <div className="rh-cinematic-inner">
        <motion.div {...enter(0)} className="rh-chapter"><span>{chapter}</span><span>{eyebrow}</span></motion.div>
        <motion.h1 {...enter(1)} className="rh-cinematic-title">{title}</motion.h1>
        <motion.p {...enter(2)} className="rh-cinematic-description">{description}</motion.p>
        {children && <motion.div {...enter(3)} className="rh-cinematic-actions">{children}</motion.div>}
      </div>
      <div className="rh-cinematic-bottom"><span>RH Software · Bihar, India</span><ArrowDown size={16} aria-hidden="true" /></div>
    </section>
  );
}
