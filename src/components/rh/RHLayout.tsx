import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUp } from "lucide-react";
import ScrollToTopButton from "@/components/ScrollToTopButton";

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

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          <Link to="/rhsoftware" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
              RH
            </div>
            <span className="font-bold text-lg tracking-tight">RH Software</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all text-white/60 hover:text-white hover:bg-white/5"
            >
              SIAT Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  location.pathname === link.href ? "text-white bg-white/10" : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/rhsoftware/contact" className="hidden md:block px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              Start Your Project
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-white/60 hover:text-white">
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
              className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/5"
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link key={link.href} to={link.href} className="block px-4 py-3 text-white/80 hover:text-white font-medium rounded-lg hover:bg-white/5">
                    {link.label}
                  </Link>
                ))}
                <Link to="/rhsoftware/contact" className="block text-center mt-4 px-5 py-3 font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500">
                  Start Your Project
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-16 md:pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative bg-black border-t border-white/5 overflow-hidden">
        <div className="py-20 text-center">
          <h2 className="text-[6rem] md:text-[10rem] lg:text-[14rem] font-black tracking-tighter leading-none text-white/[0.03] select-none" style={{ fontFamily: "'Outfit', sans-serif" }}>
            RH SOFTWARE
          </h2>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-10 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10 text-sm text-white/40">
            <p>© {new Date().getFullYear()} RH Software. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/" className="hover:text-white transition-colors">SIAT Home</Link>
              <Link to="/rhsoftware/services" className="hover:text-white transition-colors">Services</Link>
              <Link to="/rhsoftware/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <AnimatePresence>
        <ScrollToTopBtn />
      </AnimatePresence>
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

  return visible ? (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
    >
      <ArrowUp className="w-5 h-5" />
    </motion.button>
  ) : null;
};

export default RHLayout;
