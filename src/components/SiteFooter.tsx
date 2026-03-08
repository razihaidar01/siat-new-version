import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import siatLogo from "@/assets/siat-logo.png";

const footerLinks = [
  {
    title: "Training",
    links: [
      { label: "Mobile Repairing", href: "/training-institute/mobile-repairing-course-bihar" },
      { label: "AC Repairing", href: "/training-institute/ac-repairing-course-bihar" },
      { label: "Laptop Repairing", href: "/training-institute/laptop-repairing-course-bihar" },
      { label: "CCTV Installation", href: "/training-institute/cctv-installation-training-bihar" },
      { label: "Placement Support", href: "/training-institute/placement-support" },
    ],
  },
  {
    title: "RH Software",
    links: [
      { label: "Website Development", href: "/rh-software/website-development-company-bihar" },
      { label: "App Development", href: "/rh-software/app-development-company-bihar" },
      { label: "AI Development", href: "/rh-software/ai-development-company-bihar" },
      { label: "Portfolio", href: "/rh-software/portfolio" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Consultancy", href: "/consultancy-services" },
      { label: "Government Projects", href: "/government-projects" },
      { label: "ISO Certification", href: "/consultancy-services/iso-certification-bihar" },
      { label: "MSME Registration", href: "/consultancy-services/msme-registration" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Blog", href: "/blog" },
      { label: "Gallery", href: "/gallery" },
      { label: "Verify Certificate", href: "/verify-certificate" },
      { label: "Contact", href: "/contact-us" },
    ],
  },
];

const SiteFooter = () => {
  return (
    <footer style={{ background: "hsl(215 50% 5%)" }}>
      {/* Giant SIAT text */}
      <div className="overflow-hidden py-16 relative">
        <motion.p
          className="text-[6rem] md:text-[10rem] lg:text-[16rem] font-display font-black tracking-tighter leading-none text-center select-none"
          style={{ color: "hsl(0 0% 100% / 0.03)" }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          SIAT
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16" style={{ borderTop: "1px solid hsl(0 0% 100% / 0.06)" }}>
        <div className="flex items-center gap-3 mb-12">
          <img src={siatLogo} alt="SIAT Logo" className="w-14 h-14 rounded-full" />
          <div>
            <span className="font-display font-bold text-2xl" style={{ color: "white" }}>SIAT</span>
            <p className="text-sm" style={{ color: "hsl(0 0% 100% / 0.4)" }}>Bihar's Leading Training, IT & Consultancy Organization</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-display font-bold text-lg mb-4" style={{ color: "white" }}>{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm transition-colors hover:text-white"
                      style={{ color: "hsl(0 0% 100% / 0.4)" }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-12 py-8" style={{ borderTop: "1px solid hsl(0 0% 100% / 0.06)" }}>
          <a href="mailto:siat.sws@gmail.com" className="flex items-center gap-2 text-sm transition-colors hover:text-white"
            style={{ color: "hsl(0 0% 100% / 0.4)" }}>
            <Mail className="w-4 h-4" /> siat.sws@gmail.com
          </a>
          <a href="tel:+917004216219" className="flex items-center gap-2 text-sm transition-colors hover:text-white"
            style={{ color: "hsl(0 0% 100% / 0.4)" }}>
            <Phone className="w-4 h-4" /> +91 7004216219
          </a>
          <a href="tel:+919342470019" className="flex items-center gap-2 text-sm transition-colors hover:text-white"
            style={{ color: "hsl(0 0% 100% / 0.4)" }}>
            <Phone className="w-4 h-4" /> +91 9342470019
          </a>
          <span className="flex items-center gap-2 text-sm" style={{ color: "hsl(0 0% 100% / 0.4)" }}>
            <MapPin className="w-4 h-4" /> Saharsa, Bihar, India
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-xs"
          style={{ borderTop: "1px solid hsl(0 0% 100% / 0.06)", color: "hsl(0 0% 100% / 0.25)" }}>
          <p>© {new Date().getFullYear()} SIAT. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
