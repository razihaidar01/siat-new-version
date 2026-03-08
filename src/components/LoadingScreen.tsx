import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 700);
    }, 2600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "#1a1d23" }}
        >
          {/* Subtle background glow */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="flex flex-col items-center gap-8 relative">
            {/* Giant SIAT text — rising from bottom with mask */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.3,
                  type: "spring",
                  stiffness: 50,
                  damping: 15,
                }}
                className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-display font-black leading-none select-none"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "2px rgba(255,255,255,0.08)",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                SIAT
              </motion.h1>
            </div>

            {/* Glowing accent SIAT overlay — smaller, centered */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <span
                className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-[0.3em]"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent-blue, var(--primary))))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                SIAT
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-xs md:text-sm tracking-[0.4em] uppercase font-medium"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Training · IT · Consultancy
            </motion.p>

            {/* Loading bar */}
            <motion.div
              className="h-[2px] rounded-full overflow-hidden"
              style={{ width: 140, background: "rgba(255,255,255,0.06)" }}
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.2, delay: 0.5, repeat: 2, ease: "easeInOut" }}
                className="h-full w-full rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
