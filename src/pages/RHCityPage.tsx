import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight, CheckCircle2, ChevronRight, MapPin, Globe, Smartphone,
  Brain, Database, LayoutGrid, TrendingUp, Quote, ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import { getRhCityBySlug, rhCities, baseServices } from "@/data/rhCities";
import {
  RH_BASE_URL, rhOrganizationSchema, rhLocalBusinessSchema, rhBreadcrumb, rhFaqSchema,
} from "@/lib/rhSeo";

const SERVICE_ICONS = [Globe, Smartphone, Brain, Database, LayoutGrid, TrendingUp];

const RHCityPage = () => {
  const { city, lang } = useParams<{ city: string; lang?: string }>();
  const cityData = city ? getRhCityBySlug(city) : null;
  if (!cityData) return <Navigate to="/rhsoftware" replace />;

  const language: "en" | "hi" = lang === "hi" ? "hi" : "en";
  const c = cityData.copy[language];
  const otherLang: "en" | "hi" = language === "en" ? "hi" : "en";

  const baseUrl = `${RH_BASE_URL}/rhsoftware/bihar/${cityData.slug}`;
  const enUrl = baseUrl;
  const hiUrl = `${baseUrl}/hi`;
  const currentUrl = language === "en" ? enUrl : hiUrl;
  const localeCode = language === "hi" ? "hi-IN" : "en-IN";

  useSEO({
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    canonical: currentUrl,
    locale: localeCode,
    hreflang: [
      { lang: "en-IN", url: enUrl },
      { lang: "hi-IN", url: hiUrl },
    ],
    schema: [
      rhOrganizationSchema,
      {
        ...rhLocalBusinessSchema,
        "@id": `${baseUrl}#localbusiness`,
        name: `RH Software — ${cityData.name.en}`,
        areaServed: { "@type": "City", name: cityData.name.en },
        ...(cityData.lat && cityData.lng
          ? { geo: { "@type": "GeoCoordinates", latitude: cityData.lat, longitude: cityData.lng } }
          : {}),
      },
      rhBreadcrumb([
        { name: "Home", url: RH_BASE_URL },
        { name: "RH Software", url: `${RH_BASE_URL}/rhsoftware` },
        { name: "Bihar", url: `${RH_BASE_URL}/rhsoftware` },
        { name: cityData.name.en, url: enUrl },
      ]),
      rhFaqSchema(c.faqs),
    ],
  });

  return (
    <div className="px-6 md:px-10 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb + lang switcher */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <nav className="flex items-center gap-2 text-[12px] text-white/40 flex-wrap">
            <Link to="/rhsoftware" className="hover:text-white/70">RH Software</Link>
            <ChevronRight className="w-3 h-3" />
            <span>Bihar</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/70">{cityData.name.en}</span>
          </nav>
          <Link
            to={otherLang === "en" ? enUrl.replace(RH_BASE_URL, "") : hiUrl.replace(RH_BASE_URL, "")}
            className="text-[12px] px-3 py-1.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors"
          >
            {language === "en" ? "हिंदी में पढ़ें" : "Read in English"}
          </Link>
        </div>

        {/* Hero */}
        <span className="rh-eyebrow"><MapPin className="w-3 h-3" /> {cityData.district}, Bihar</span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[38px] md:text-[58px] leading-[1.05] font-semibold tracking-[-0.02em] mt-5"
          lang={localeCode}
        >
          {c.h1}
        </motion.h1>
        <p className="mt-6 text-[16px] md:text-[17.5px] rh-text-muted max-w-3xl leading-relaxed" lang={localeCode}>
          {c.intro}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/rhsoftware/contact" className="rh-btn rh-btn-primary">
            {language === "hi" ? "फ्री कोटेशन लें" : "Get a free quote"} <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link to="/rhsoftware/portfolio" className="rh-btn rh-btn-ghost">
            {language === "hi" ? "हमारा काम देखें" : "See our work"}
          </Link>
        </div>

        {/* Why us */}
        <section className="mt-20">
          <h2 className="text-[28px] md:text-[36px] font-semibold tracking-tight">
            {language === "hi" ? `${cityData.name.hi} में हम क्यों?` : `Why ${cityData.name.en} businesses pick RH Software`}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {c.whyItems.map((w) => (
              <div key={w.title} className="rh-surface p-6">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-4" />
                <h3 className="text-[16px] font-semibold tracking-tight" lang={localeCode}>{w.title}</h3>
                <p className="text-[13.5px] rh-text-muted mt-2 leading-relaxed" lang={localeCode}>{w.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="mt-20">
          <h2 className="text-[28px] md:text-[36px] font-semibold tracking-tight" lang={localeCode}>{c.servicesHeading}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {baseServices.map((s, i) => {
              const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
              return (
                <Link
                  key={s}
                  to="/rhsoftware/services"
                  className="rh-surface rh-card-hover p-5 group flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-[#A78BFA]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[13.5px] font-medium">{s}</div>
                    <div className="text-[11px] rh-text-dim mt-0.5">in {cityData.name.en}</div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white transition-colors" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-20">
          <h2 className="text-[28px] md:text-[36px] font-semibold tracking-tight">
            {language === "hi" ? `${cityData.name.hi} के क्लाइंट्स की राय` : `What ${cityData.name.en} clients say`}
          </h2>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {c.testimonials.map((t) => (
              <div key={t.name} className="rh-surface p-6">
                <Quote className="w-5 h-5 text-[#A78BFA]/60 mb-3" />
                <p className="text-[14px] text-white/80 leading-relaxed" lang={localeCode}>"{t.quote}"</p>
                <div className="mt-5 pt-4 border-t border-white/[0.06]">
                  <div className="text-[13px] font-semibold">{t.name}</div>
                  <div className="text-[11.5px] rh-text-dim mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-20">
          <h2 className="text-[28px] md:text-[36px] font-semibold tracking-tight">
            {language === "hi" ? "अक्सर पूछे जाने वाले सवाल" : "Frequently asked questions"}
          </h2>
          <div className="mt-8 space-y-3">
            {c.faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} lang={localeCode} />)}
          </div>
        </section>

        {/* Internal links — other cities */}
        <section className="mt-20">
          <h2 className="text-[20px] font-semibold tracking-tight">
            {language === "hi" ? "बिहार के अन्य शहरों में भी सेवा" : "Also serving these Bihar cities"}
          </h2>
          <div className="flex flex-wrap gap-2 mt-5">
            {rhCities.filter((o) => o.slug !== cityData.slug).map((o) => (
              <Link
                key={o.slug}
                to={`/rhsoftware/bihar/${o.slug}${language === "hi" ? "/hi" : ""}`}
                className="px-3.5 py-2 rounded-full text-[12.5px] border border-white/[0.08] bg-white/[0.02] text-white/70 hover:text-white hover:border-[#7C3AED]/40 transition-colors"
              >
                {language === "hi" ? o.name.hi : o.name.en}
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rh-surface-elevated p-8 md:p-12 mt-20 text-center relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 opacity-50"
            style={{ background: "radial-gradient(600px 240px at 50% 0%, rgba(124,58,237,0.25), transparent 70%)" }} />
          <div className="relative">
            <h3 className="text-[28px] md:text-[40px] font-semibold tracking-tight" lang={localeCode}>{c.ctaTitle}</h3>
            <p className="rh-text-muted mt-4 text-[14.5px] max-w-xl mx-auto" lang={localeCode}>{c.ctaSub}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/rhsoftware/contact" className="rh-btn rh-btn-primary">
                {language === "hi" ? "अभी संपर्क करें" : "Book a strategy call"}
              </Link>
              <Link to="/rhsoftware/portfolio" className="rh-btn rh-btn-ghost">
                {language === "hi" ? "केस स्टडीज देखें" : "See case studies"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FaqItem = ({ q, a, lang }: { q: string; a: string; lang: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rh-surface overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className="text-[14.5px] font-medium" lang={lang}>{q}</span>
        <ChevronDown className={`w-4 h-4 text-white/50 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-[13.5px] rh-text-muted leading-relaxed border-t border-white/[0.05] pt-4" lang={lang}>
          {a}
        </div>
      )}
    </div>
  );
};

export default RHCityPage;
