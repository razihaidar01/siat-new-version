import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 600);
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "hsl(var(--background))" }}
        >
          {/* Animated ring */}
          <motion.div
            className="absolute w-32 h-32 rounded-full border-2 border-primary/20"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-48 h-48 rounded-full border border-primary/10"
            animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />

          <div className="flex flex-col items-center gap-6">
            {/* SIAT text rising from bottom */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 80 }}
                className="text-6xl md:text-8xl font-display font-black gradient-text"
              >
                SIAT
              </motion.h1>
            </div>

            {/* Tagline */}
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-sm md:text-base text-muted-foreground tracking-[0.3em] uppercase font-medium"
              >
                Training · IT · Consultancy
              </motion.p>
            </div>

            {/* Loading bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ duration: 1.8, delay: 0.4, ease: "easeInOut" }}
              className="h-0.5 rounded-full"
              style={{ background: "var(--gradient-blue)" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
