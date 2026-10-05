import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUp, ArrowUpRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import rhLogo from "@/assets/rh-logo.png";
import "@/styles/rh-theme.css";

const navLinks = [
  { label: "Home", href: "/rhsoftware" }, { label: "Services", href: "/rhsoftware/services" },
  { label: "Portfolio", href: "/rhsoftware/portfolio" }, { label: "Pricing", href: "/rhsoftware/pricing" },
  { label: "Blog", href: "/rhsoftware/blog" }, { label: "Contact", href: "/rhsoftware/contact" },
];

export default function RHLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 48);
    handle(); window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);
  useEffect(() => {
    setMobileOpen(false); window.scrollTo({ top: 0 });
    const id = "rh-onest-font";
    if (!document.getElementById(id)) {
      const link = document.createElement("link"); link.id = id; link.rel = "stylesheet";
      link.href = "/landing-pages/secret-pathways-assets/fonts.css"; document.head.appendChild(link);
    }
  }, [location.pathname]);
  const active = (href: string) => href === "/rhsoftware" ? location.pathname === href : location.pathname.startsWith(href);
  return (
    <div className="rh-root min-h-screen relative overflow-x-hidden">
      <div aria-hidden="true" className="rh-grain" />
      <motion.div style={{ scaleX: progress }} className="rh-progress fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left" />
      <header className={`rh-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="rh-header-inner">
          <Link to="/rhsoftware" className="rh-brand" aria-label="RH Software home">
            <img src={rhLogo} alt="" width={48} height={48} /><div><strong>RH Software</strong><small>Product Engineering Studio</small></div>
          </Link>
          <nav aria-label="RH Software navigation" className="rh-nav hidden lg:flex">
            {navLinks.map(link => <Link key={link.href} to={link.href} aria-current={active(link.href) ? "page" : undefined}>{link.label}</Link>)}
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex text-muted-foreground"><Link to="/">SIAT <ExternalLink /></Link></Button>
            <Button asChild className="rh-btn rh-btn-primary rh-header-cta"><Link to="/rhsoftware/contact">Let's talk <ArrowUpRight /></Link></Button>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</Button>
          </div>
        </div>
        <AnimatePresence>{mobileOpen && <motion.nav aria-label="RH mobile navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="rh-mobile-nav lg:hidden">{navLinks.map(link => <Link key={link.href} to={link.href} aria-current={active(link.href) ? "page" : undefined}>{link.label}</Link>)}<Link to="/">← Back to SIAT</Link></motion.nav>}</AnimatePresence>
      </header>
      <main className="relative z-10"><Outlet /></main>
      <footer className="rh-footer relative z-10"><div className="max-w-7xl mx-auto"><div className="rh-chapter"><span>RH SOFTWARE</span><span>A division of SIAT</span></div><div className="rh-footer-wordmark">Let's build what's next.</div><Button asChild variant="outline" className="rh-btn rh-btn-ghost mb-12"><Link to="/rhsoftware/contact">Start a conversation <ArrowUpRight /></Link></Button><div className="rh-footer-bottom"><p>© {new Date().getFullYear()} RH Software · A division of SIAT</p><nav className="flex flex-wrap gap-6" aria-label="RH footer navigation">{navLinks.slice(1).map(link => <Link key={link.href} to={link.href}>{link.label}</Link>)}<Link to="/">SIAT</Link></nav></div></div></footer>
      {scrolled && <Button variant="outline" size="icon" className="fixed bottom-6 left-6 z-50 bg-background" aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUp /></Button>}
    </div>
  );
}
