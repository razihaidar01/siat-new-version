import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUp } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/rhsoftware" },
  { label: "Services", href: "/rhsoftware/services" },
  { label: "Portfolio", href: "/rhsoftware/portfolio" },
  { label: "Pricing", href: "/rhsoftware/pricing" },
  { label: "Blog", href: "/rhsoftware/blog" },
  { label: "Contact", href: "/rhsoftware/contact" },
];

const RHLayout = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mouse, setMouse] = useState({ x: -500, y: -500 });
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0 });
  }, [location]);

  return (
    <div
      className="min-h-screen text-white relative overflow-x-hidden"
      style={{
        backgroundColor: "#020408",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* Mesh gradient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(900px 600px at 12% 8%, rgba(99,102,241,0.18), transparent 60%), radial-gradient(900px 600px at 88% 18%, rgba(139,92,246,0.16), transparent 60%), radial-gradient(800px 500px at 50% 100%, rgba(16,185,129,0.10), transparent 60%)",
        }}
      />

      {/* Grid dot background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* Cursor glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed z-0 hidden md:block"
        style={{
          left: mouse.x - 250,
          top: mouse.y - 250,
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(99,102,241,0.18), rgba(139,92,246,0.08) 35%, transparent 70%)",
          transition: "transform 80ms linear",
          mixBlendMode: "screen",
        }}
      />

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      >
        <div className="h-full w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400" />
      </motion.div>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#020408]/70 backdrop-blur-2xl border-b border-white/[0.06]" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          <Link to="/rhsoftware" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-emerald-400 flex items-center justify-center text-white font-black text-sm shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              RH
            </div>
            <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-300">
              RH Software
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className="px-3.5 py-2 text-sm font-medium rounded-lg transition-all text-white/50 hover:text-white hover:bg-white/[0.05]"
            >
              SIAT Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                  location.pathname === link.href
                    ? "text-white bg-white/[0.08] border border-white/[0.08]"
                    : "text-white/55 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/rhsoftware/contact"
              className="hidden md:inline-flex px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
            >
              Hire Us
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white/70 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-[#020408]/95 backdrop-blur-2xl border-t border-white/[0.06]"
            >
              <div className="px-6 py-4 space-y-1">
                <Link to="/" className="block px-4 py-3 text-white/80 hover:text-white font-medium rounded-lg hover:bg-white/5">
                  SIAT Home
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block px-4 py-3 text-white/80 hover:text-white font-medium rounded-lg hover:bg-white/5"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/rhsoftware/contact"
                  className="block text-center mt-4 px-5 py-3 font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500"
                >
                  Hire Us
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10 pt-16 md:pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] overflow-hidden">
        <div className="py-16 text-center">
          <h2
            className="text-[5rem] md:text-[9rem] lg:text-[13rem] font-black tracking-tighter leading-none select-none"
            style={{
              fontFamily: "'Outfit', sans-serif",
              background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(99,102,241,0.04) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            RH SOFTWARE
          </h2>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-10 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10 text-sm text-white/40">
            <p>© {new Date().getFullYear()} RH Software · A division of SIAT.</p>
            <div className="flex gap-6">
              <Link to="/" className="hover:text-white transition-colors">SIAT Home</Link>
              <Link to="/rhsoftware/services" className="hover:text-white transition-colors">Services</Link>
              <Link to="/rhsoftware/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>

      <ScrollToTopBtn />
    </div>
  );
};

const ScrollToTopBtn = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/10 text-white flex items-center justify-center hover:bg-white/[0.12] hover:border-indigo-400/40 transition-all"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default RHLayout;
