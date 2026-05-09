import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUp, ExternalLink } from "lucide-react";
import rhLogo from "@/assets/rh-logo.png";
import "@/styles/rh-theme.css";

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
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0 });
  }, [location]);

  return (
    <div className="rh-root min-h-screen relative overflow-x-hidden">
      <div aria-hidden className="rh-aurora" />
      <div aria-hidden className="rh-grain" />

      {/* Scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left bg-gradient-to-r from-[#7C3AED] via-[#22D3EE] to-[#10B981]"
      />

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#07070A]/75 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-[72px]">
          <Link to="/rhsoftware" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 rounded-[10px] bg-white/[0.04] border border-white/[0.08] flex items-center justify-center p-[5px] group-hover:border-[#7C3AED]/50 transition-colors">
              <img src={rhLogo} alt="RH Software" className="w-full h-full object-contain" />
            </div>
            <div className="leading-tight">
              <div className="font-semibold text-[15px] tracking-tight text-white">RH Software</div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-white/40">Engineering Studio</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3.5 py-2 text-[13.5px] font-medium rounded-lg transition-all ${
                    active
                      ? "text-white bg-white/[0.06]"
                      : "text-white/55 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-white/50 border border-white/[0.08] hover:text-white hover:border-white/20 transition-all"
            >
              SIAT <ExternalLink className="w-3 h-3" />
            </Link>
            <Link to="/rhsoftware/contact" className="rh-btn rh-btn-primary hidden md:inline-flex !py-2.5">
              Book a Call
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white"
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
              className="lg:hidden overflow-hidden bg-[#07070A]/95 backdrop-blur-2xl border-t border-white/[0.06]"
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block px-4 py-3 text-white/80 hover:text-white font-medium rounded-lg hover:bg-white/5"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="rh-divider-x my-3" />
                <Link to="/" className="block px-4 py-3 text-white/50 text-sm rounded-lg hover:bg-white/5">
                  ← Back to SIAT
                </Link>
                <Link to="/rhsoftware/contact" className="rh-btn rh-btn-primary w-full justify-center mt-3">
                  Book a Call
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10 pt-16 md:pt-[72px]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] mt-24">
        <div className="py-14 text-center overflow-hidden">
          <h2
            className="text-[4.5rem] md:text-[8rem] lg:text-[12rem] font-bold tracking-tighter leading-none select-none"
            style={{
              fontFamily: "var(--rh-font-display)",
              background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(124,58,237,0.04) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            RH SOFTWARE
          </h2>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-10 pb-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5 pt-6 border-t border-white/[0.06] text-[13px] text-white/40">
            <p>© {new Date().getFullYear()} RH Software · A division of SIAT</p>
            <div className="flex gap-6">
              <Link to="/rhsoftware/services" className="hover:text-white transition-colors">Services</Link>
              <Link to="/rhsoftware/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
              <Link to="/rhsoftware/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link to="/" className="hover:text-white transition-colors">SIAT</Link>
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
          className="fixed bottom-6 left-6 z-50 w-11 h-11 rounded-full bg-white/[0.05] backdrop-blur-xl border border-white/[0.1] text-white flex items-center justify-center hover:bg-white/[0.1] hover:border-[#7C3AED]/40 transition-all"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default RHLayout;
