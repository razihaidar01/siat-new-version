import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import KageLandingPage from "@designcodeio/threeui/components/KageLandingPage";
import "@designcodeio/threeui/style.css";
import "@/styles/rh-theme.css";
import rhLogo from "@/assets/rh-logo.png";
import { useSEO } from "@/hooks/useSEO";
import {
  RH_BASE_URL,
  rhOrganizationSchema,
  rhLocalBusinessSchema,
  rhWebsiteSchema,
  rhBreadcrumb,
  rhFaqSchema,
} from "@/lib/rhSeo";

/* ============================================================
   RH Software homepage — the Kage landing experience.
   Full-screen standalone frame (the Kage page carries its own
   fixed navigation), with a floating RH pill for site navigation.
   ============================================================ */

const pillLinks = [
  { label: "Studio", href: "/rhsoftware/studio" },
  { label: "Services", href: "/rhsoftware/services" },
  { label: "Portfolio", href: "/rhsoftware/portfolio" },
  { label: "Pricing", href: "/rhsoftware/pricing" },
  { label: "Blog", href: "/rhsoftware/blog" },
];

const RHKageHomePage = () => {
  const [pillOpen, setPillOpen] = useState(false);

  useSEO({
    title: "RH Software | Best Website, App & AI Development Company in Bihar",
    description:
      "RH Software (by SIAT) — Bihar's #1 software company. Best website developer, app developer & AI development company in Patna, Saharsa, Madhepura, Purnia, Supaul, Darbhanga & all Bihar. 40+ products shipped. Get a free quote.",
    keywords:
      "RH Software, best software company in Bihar, website developer in Bihar, app developer in Patna, AI development company Bihar, software company Saharsa, software company Madhepura, website banane wali company Bihar, वेबसाइट डेवलपर बिहार, ऐप डेवलपर पटना, सॉफ्टवेयर कंपनी बिहार",
    canonical: `${RH_BASE_URL}/rhsoftware`,
    ogType: "website",
    schema: [
      rhOrganizationSchema,
      rhLocalBusinessSchema,
      rhWebsiteSchema,
      rhBreadcrumb([
        { name: "Home", url: RH_BASE_URL },
        { name: "RH Software", url: `${RH_BASE_URL}/rhsoftware` },
      ]),
      rhFaqSchema([
        {
          q: "Which is the best software company in Bihar?",
          a: "RH Software (by SIAT) is widely recognized among the best software companies in Bihar, delivering web, mobile, AI and SaaS products to clients across Patna, Saharsa, Madhepura, Purnia, Supaul, Darbhanga and beyond.",
        },
        {
          q: "Do you build websites and apps for clients in Patna and Saharsa?",
          a: "Yes. RH Software serves every major Bihar city — including Patna, Saharsa, Madhepura, Purnia, Supaul, Darbhanga, Katihar, Bhagalpur and Muzaffarpur — with on-call support and remote-first delivery.",
        },
        {
          q: "How much does a website or app cost from RH Software?",
          a: "Launch (marketing sites) starts from ₹14,999. Scale (custom web applications) starts from ₹49,999. Enterprise engagements are custom-scoped. Book a free strategy call for an exact quote.",
        },
        {
          q: "Do you offer AI development services in Bihar?",
          a: "Yes. We build production-grade AI systems including RAG pipelines, LLM agents, NLP automation and custom ML — wired into real business workflows for Bihar-based and pan-India clients.",
        },
      ]),
    ],
  });

  return (
    <div className="rh-root relative min-h-[100dvh] bg-[#07070A]">
      {/* Kage landing experience — exact ThreeUI source */}
      <div className="shader-frame">
        <KageLandingPage
          headingFont="onest"
          bodyFont="onest"
          headingWeight="400"
          bodyWeight="300"
          primaryColor="#e0231c"
          headingSize={46}
          bodySize={17}
          headingLetterSpacing={-0.012}
        />
      </div>

      {/* Floating RH navigation pill */}
      <div className="rh-float-pill-wrap fixed bottom-5 right-5 z-[70]">
        <AnimatePresence>
          {pillOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="rh-float-menu absolute bottom-[calc(100%+12px)] right-0 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#07070A]/90 backdrop-blur-2xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)]"
            >
              <div className="p-2">
                {pillLinks.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setPillOpen(false)}
                    className="block rounded-xl px-4 py-2.5 text-[13.5px] font-medium text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="my-2 h-px bg-white/[0.08]" />
                <Link
                  to="/rhsoftware/contact"
                  onClick={() => setPillOpen(false)}
                  className="block rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] px-4 py-2.5 text-center text-[13.5px] font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Book a Call
                </Link>
                <Link
                  to="/"
                  onClick={() => setPillOpen(false)}
                  className="mt-1 block rounded-xl px-4 py-2.5 text-center text-[12px] font-medium text-white/45 transition-colors hover:bg-white/[0.04] hover:text-white/80"
                >
                  ← SIAT
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setPillOpen((v) => !v)}
          aria-label="RH Software menu"
          className="rh-float-pill flex items-center gap-2.5 rounded-full border border-white/10 bg-[#07070A]/75 py-2 pl-2 pr-4 backdrop-blur-2xl transition-colors hover:border-[#7C3AED]/50"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] p-[6px]">
            <img src={rhLogo} alt="RH Software" className="h-full w-full object-contain" />
          </span>
          <span className="hidden text-[13px] font-semibold tracking-tight text-white sm:inline">
            RH Software
          </span>
          <span className="text-white/60">
            {pillOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </span>
        </button>
      </div>
    </div>
  );
};

export default RHKageHomePage;
