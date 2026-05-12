/**
 * LocationServicePage.tsx — FULL RH SOFTWARE DARK THEME REDESIGN
 * File: src/pages/LocationServicePage.tsx
 * Replace your existing file with this entire file.
 */

import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Globe, Smartphone, Brain, Code2, FileCheck, TrendingUp,
  ArrowUpRight, CheckCircle2, Star, MapPin, Zap, Clock,
  Users, ChevronRight, ChevronDown, Quote, MessageCircle,
  Rocket, Shield,
} from "lucide-react";

const CITY_DATA: Record<string, { display: string; hindi: string; district: string; region: string; lat: number; lng: number; pincode: string }> = {
  saharsa:     { display: "Saharsa",     hindi: "सहरसा",       district: "Saharsa District",     region: "Kosi Region",       lat: 25.8786, lng: 86.5969, pincode: "852201" },
  madhepura:   { display: "Madhepura",   hindi: "मधेपुरा",     district: "Madhepura District",   region: "Kosi Region",       lat: 25.9178, lng: 86.7911, pincode: "852113" },
  purnia:      { display: "Purnia",      hindi: "पूर्णिया",    district: "Purnia District",      region: "Seemanchal Region", lat: 25.7771, lng: 87.4753, pincode: "854301" },
  supaul:      { display: "Supaul",      hindi: "सुपौल",       district: "Supaul District",      region: "Kosi Region",       lat: 26.1220, lng: 86.6019, pincode: "852131" },
  darbhanga:   { display: "Darbhanga",   hindi: "दरभंगा",      district: "Darbhanga District",   region: "Mithila Region",    lat: 26.1542, lng: 85.8918, pincode: "846004" },
  bhagalpur:   { display: "Bhagalpur",   hindi: "भागलपुर",     district: "Bhagalpur District",   region: "Anga Region",       lat: 25.2425, lng: 86.9842, pincode: "812001" },
  katihar:     { display: "Katihar",     hindi: "कटिहार",      district: "Katihar District",     region: "Seemanchal Region", lat: 25.5395, lng: 87.5780, pincode: "854105" },
  araria:      { display: "Araria",      hindi: "अररिया",      district: "Araria District",      region: "Seemanchal Region", lat: 26.1516, lng: 87.4789, pincode: "854311" },
  patna:       { display: "Patna",       hindi: "पटना",        district: "Patna District",       region: "Central Bihar",     lat: 25.5941, lng: 85.1376, pincode: "800001" },
  muzaffarpur: { display: "Muzaffarpur", hindi: "मुज़फ्फरपुर", district: "Muzaffarpur District", region: "North Bihar",       lat: 26.1197, lng: 85.3910, pincode: "842001" },
};

type ServiceDef = {
  display: string; hindi: string; icon: React.ElementType; color: string; glow: string;
  pageTitle: (c: string) => string; metaDesc: (c: string) => string;
  h1: (c: string) => string; intro: (c: string) => string;
  features: string[];
  packages: { name: string; price: string; tag?: string; features: string[] }[];
  faqs: { q: string; a: string }[];
};

const SERVICE_DATA: Record<string, ServiceDef> = {
  "website-development": {
    display: "Website Development", hindi: "वेबसाइट डेवलपमेंट",
    icon: Globe, color: "#7C3AED", glow: "rgba(124,58,237,0.4)",
    pageTitle: c => `Best Website Developer in ${c} Bihar | RH Software (SIAT)`,
    metaDesc:  c => `RH Software – Best website developer in ${c}, Bihar. Fast, SEO-optimized, mobile-first websites. 40+ projects. Free quote in 24 hours!`,
    h1:        c => `Best Website Developer in ${c}, Bihar`,
    intro:     c => `RH Software (by SIAT) is ${c}'s most trusted website development studio. We build production-grade sites for clinics, retailers, startups and institutions across ${c} — engineered to rank on Google and convert visitors into customers.`,
    features: ["Mobile-first responsive design","SEO-optimized from day 1","Google PageSpeed 90+ score","Admin panel / CMS included","Razorpay / UPI payment gateway","WhatsApp chat integration","SSL + 1 year free support","Google Analytics setup"],
    packages: [
      { name: "Starter",    price: "₹15,000",                    features: ["5 pages","Mobile responsive","Contact form","Basic SEO","Google Maps"] },
      { name: "Business",   price: "₹35,000", tag: "Most Popular", features: ["15 pages","Admin panel","Blog/News","WhatsApp chat","Advanced SEO","1yr hosting"] },
      { name: "E-Commerce", price: "₹65,000",                    features: ["Unlimited products","Payment gateway","Order tracking","Inventory","Mobile app ready"] },
    ],
    faqs: [
      { q: "Who is the best website developer in this city?", a: "RH Software (SIAT) is the top-rated website developer — 40+ projects, 4.9★ rating, 1 year free support. Serving all Bihar districts." },
      { q: "Website banane mein kitna time lagta hai?", a: "Basic website 5-7 din, Business website 2 weeks, E-commerce 3-4 weeks. Pehle milestone plan share hota hai — koi surprise nahi." },
      { q: "Kya website Google par rank karegi?", a: "Haan. Har website mein on-page SEO, fast loading, mobile optimization aur schema markup included hai — Google ranking ke liye optimized." },
    ],
  },
  "app-development": {
    display: "App Development", hindi: "मोबाइल ऐप डेवलपमेंट",
    icon: Smartphone, color: "#22D3EE", glow: "rgba(34,211,238,0.35)",
    pageTitle: c => `Best App Developer in ${c} Bihar | iOS & Android | RH Software`,
    metaDesc:  c => `RH Software – Best mobile app developer in ${c}, Bihar. iOS & Android apps using React Native & Flutter. Starting ₹20,000. Free consultation!`,
    h1:        c => `Best Mobile App Developer in ${c}, Bihar`,
    intro:     c => `RH Software builds cross-platform iOS and Android apps for ${c}-based startups, hospitals, schools and retailers. Using React Native and Flutter, we deliver smooth 60fps apps with UPI payments, push notifications and offline support.`,
    features: ["iOS & Android (one codebase)","React Native / Flutter","Offline-capable","Push notifications","UPI / Razorpay payment","Real-time sync","Play Store + App Store upload","Post-launch support"],
    packages: [
      { name: "Basic App",    price: "₹20,000",                    features: ["Android only","5 screens","Login/Register","Basic features","Play Store upload"] },
      { name: "Business App", price: "₹45,000", tag: "Most Popular", features: ["iOS + Android","15 screens","Admin dashboard","Push notifications","Payment gateway"] },
      { name: "Enterprise",   price: "Custom",                     features: ["iOS + Android","Unlimited screens","AI features","Offline mode","Real-time sync"] },
    ],
    faqs: [
      { q: "App kab tak ready hoga?", a: "Basic app 2 weeks, Business app 4-6 weeks, Enterprise 8-12 weeks. Har stage par demo dikhaaya jaata hai — full transparency." },
      { q: "Kya app Play Store par aayega?", a: "Haan — Google Play Store aur Apple App Store dono par upload karte hain. Puri process hum handle karte hain." },
      { q: "App maintain kaun karega baad mein?", a: "RH Software 1 year free maintenance deta hai. Uske baad affordable annual support plan available hai." },
    ],
  },
  "software-development": {
    display: "Custom Software", hindi: "कस्टम सॉफ्टवेयर",
    icon: Code2, color: "#10B981", glow: "rgba(16,185,129,0.35)",
    pageTitle: c => `Best Software Development Company in ${c} Bihar | RH Software`,
    metaDesc:  c => `RH Software – Best software company in ${c}, Bihar. ERP, CRM, School & Hospital Management Systems. 40+ projects. Free demo available!`,
    h1:        c => `Best Software Development Company in ${c}, Bihar`,
    intro:     c => `RH Software builds precision-engineered custom software for ${c} businesses — school management systems, hospital HMS, ERP, CRM, inventory and billing software. Every system built to your exact workflow.`,
    features: ["School Management System","Hospital Management (HMS)","ERP for businesses","CRM for sales teams","Inventory & billing","Payroll software","Attendance system","Custom dashboards"],
    packages: [
      { name: "School Software", price: "₹18,000",                    features: ["Student records","Fee management","Attendance","Report cards","Parent portal"] },
      { name: "Business ERP",    price: "₹35,000", tag: "Most Popular", features: ["Inventory","Billing/GST","HR/Payroll","Reports","Multi-user"] },
      { name: "Enterprise",      price: "Custom",                     features: ["Fully custom","Multi-branch","AI insights","Cloud hosted","24/7 support"] },
    ],
    faqs: [
      { q: "Software hamare business ke hisab se hoga?", a: "Bilkul — 100% custom. Pehle aapki workflow samajhte hain, phir step by step design karte hain. Koi template nahi." },
      { q: "Data secure rahega?", a: "Haan. Cloud hosting with daily backups, encrypted data, role-based access control — enterprise-grade security for all clients." },
      { q: "Training milegi software use karne ki?", a: "Haan — delivery ke baad full training session, documentation aur video guides included hain. Free." },
    ],
  },
  "ai-development": {
    display: "AI Development", hindi: "AI और मशीन लर्निंग",
    icon: Brain, color: "#A78BFA", glow: "rgba(167,139,250,0.4)",
    pageTitle: c => `Best AI Developer in ${c} Bihar | ML & Chatbot | RH Software`,
    metaDesc:  c => `RH Software – Best AI development company in ${c}, Bihar. AI chatbots, ML models, automation systems. Free consultation!`,
    h1:        c => `Best AI Developer in ${c}, Bihar`,
    intro:     c => `RH Software builds practical AI solutions for ${c} businesses — WhatsApp chatbots, recommendation engines, data dashboards and process automation. No buzzwords, just systems that measurably improve your operations.`,
    features: ["AI WhatsApp/Web chatbots","Machine learning models","Data analytics dashboards","Process automation","Image recognition","NLP / text processing","Recommendation systems","Predictive analytics"],
    packages: [
      { name: "AI Chatbot",   price: "₹12,000",                    features: ["WhatsApp/Web bot","24/7 auto-replies","FAQ handling","Lead capture"] },
      { name: "AI Dashboard", price: "₹28,000", tag: "Most Popular", features: ["Data analytics","Predictive reports","Visualizations","Export features"] },
      { name: "Custom AI",    price: "Custom",                     features: ["Full ML pipeline","Custom model","API integration","Training + support"] },
    ],
    faqs: [
      { q: "AI se business ko kya faida hoga?", a: "Customer service automate hogi, sales predict kar sakte hain, repetitive tasks band — time aur paise dono bachenge measurably." },
      { q: "Kya chhoti company bhi AI le sakti hai?", a: "Bilkul! AI Chatbot ₹12,000 se shuru — chhoti dukaan se le kar hospital tak sab ke liye suitable hai." },
      { q: "AI system maintain kaise hoga?", a: "RH Software 1 year free maintenance deta hai. Models ko retrain karne ka support bhi available hai." },
    ],
  },
  "iso-certification": {
    display: "ISO Certification", hindi: "ISO सर्टिफिकेशन",
    icon: FileCheck, color: "#F59E0B", glow: "rgba(245,158,11,0.35)",
    pageTitle: c => `ISO Certification in ${c} Bihar | GMP, Trademark, MSME | SIAT`,
    metaDesc:  c => `Get ISO 9001, GMP certification, trademark registration, MSME registration in ${c}, Bihar. Fast, affordable. SIAT has helped 100+ businesses. Free consultation!`,
    h1:        c => `ISO Certification & Business Registration in ${c}, Bihar`,
    intro:     c => `SIAT provides complete business certification and registration services in ${c}, Bihar. ISO 9001 to GMP certification, trademark registration to company incorporation — we handle all documentation so you get certified faster.`,
    features: ["ISO 9001:2015 (Quality)","ISO 14001 (Environment)","GMP Certification","Trademark Registration","Company Registration","MSME / Udyam","FSSAI License","GST Registration"],
    packages: [
      { name: "MSME Reg",  price: "₹999",    features: ["Udyam certificate","Govt benefits","Bank loan priority","Fast processing"] },
      { name: "ISO 9001",  price: "₹12,000", tag: "Most Popular", features: ["Full documentation","Audit support","30 days","Validity 3 years"] },
      { name: "Full Bundle", price: "₹22,000", features: ["ISO + Trademark","Company reg","GST filing","Annual compliance"] },
    ],
    faqs: [
      { q: "ISO certificate kitne din mein milta hai?", a: "MSME 1-2 din, ISO 9001 30-45 din, Trademark 6-18 mahine. SIAT fastest documentation guarantee karta hai." },
      { q: "ISO se business ko kya faida hoga?", a: "Government tenders milenge, bank loans easy honge, aur customers ka trust badhega. SIAT ke 100+ clients certified hain." },
      { q: "Kaun kaun se documents chahiye?", a: "Business registration, PAN, Aadhaar, address proof. SIAT puri checklist free consultation mein share karta hai." },
    ],
  },
  "training": {
    display: "Technical Training", hindi: "तकनीकी प्रशिक्षण",
    icon: TrendingUp, color: "#10B981", glow: "rgba(16,185,129,0.35)",
    pageTitle: c => `Best Technical Training Institute in ${c} Bihar | SIAT`,
    metaDesc:  c => `SIAT – Best technical training institute in ${c}, Bihar. Mobile repairing, laptop, CCTV, AC courses with job placement. Enroll now!`,
    h1:        c => `Best Technical Training Institute in ${c}, Bihar`,
    intro:     c => `SIAT provides government-certified technical training courses for youth in ${c} and across Bihar. Hands-on curriculum in mobile repairing, laptop servicing, CCTV and AC repair — designed for fast employment with lab facilities and placement support.`,
    features: ["Mobile Repairing Course","Laptop Repairing","CCTV Installation","AC & Refrigeration","Govt certified","Practical lab sessions","Job placement cell","Certificate on completion"],
    packages: [
      { name: "Short Course",  price: "₹3,500",  features: ["45 days","1 skill track","Certificate","Lab practice"] },
      { name: "Full Program",  price: "₹7,500",  tag: "Most Popular", features: ["3 months","2 skill tracks","Placement support","NSDC certificate"] },
      { name: "Advanced",      price: "₹12,000", features: ["6 months","Multiple tracks","Industry exposure","Govt empaneled"] },
    ],
    faqs: [
      { q: "Kya course ke baad job milegi?", a: "SIAT ka dedicated placement cell hai. 80%+ students ko training ke 3 months mein placement milti hai across Bihar." },
      { q: "Government se recognized hai?", a: "Haan — SIAT NSDC, Skill India aur PMKVY ke saath empaneled hai. Certificate nationally recognized hai." },
      { q: "Age limit kya hai?", a: "18-35 years, 10th pass minimum. Bihar ke kisi bhi district se apply kar sakte hain." },
    ],
  },
};

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rh-surface overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 p-5 text-left group">
        <span className="text-[14.5px] font-medium group-hover:text-white transition-colors">{q}</span>
        <ChevronDown className={`w-4 h-4 text-white/40 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-[13.5px] text-[#B4B4C7] leading-relaxed border-t border-white/[0.05] pt-4">{a}</div>
      )}
    </div>
  );
};

const LocationServicePage = () => {
  const { location = "saharsa", service = "website-development" } = useParams();
  const cityData = CITY_DATA[location] || CITY_DATA.saharsa;
  const svc = SERVICE_DATA[service] || SERVICE_DATA["website-development"];
  const canonicalUrl = `https://www.siat.in/bihar/${location}/${service}`;

  useEffect(() => {
    document.title = svc.pageTitle(cityData.display);
    const sm = (a: string, k: string, v: string) => {
      let el = document.querySelector(`meta[${a}="${k}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute(a, k); document.head.appendChild(el); }
      el.setAttribute("content", v);
    };
    sm("name","description",svc.metaDesc(cityData.display));
    sm("name","robots","index, follow, max-snippet:-1, max-image-preview:large");
    sm("property","og:title",svc.pageTitle(cityData.display));
    sm("property","og:description",svc.metaDesc(cityData.display));
    sm("property","og:url",canonicalUrl);
    sm("property","og:site_name","SIAT (RH Software)");
    let can = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!can) { can = document.createElement("link"); can.setAttribute("rel","canonical"); document.head.appendChild(can); }
    can.setAttribute("href", canonicalUrl);
    const sid = "lsp-schema";
    document.getElementById(sid)?.remove();
    const s = document.createElement("script"); s.type = "application/ld+json"; s.id = sid;
    s.textContent = JSON.stringify({"@context":"https://schema.org","@graph":[
      {"@type":"LocalBusiness","name":`RH Software – ${svc.display} in ${cityData.display}`,"description":svc.metaDesc(cityData.display),"url":canonicalUrl,"telephone":"+91-9905880697","email":"info@siat.in","address":{"@type":"PostalAddress","addressLocality":cityData.display,"addressRegion":"Bihar","postalCode":cityData.pincode,"addressCountry":"IN"},"geo":{"@type":"GeoCoordinates","latitude":cityData.lat,"longitude":cityData.lng},"priceRange":"₹₹","openingHours":"Mo-Sa 09:00-18:00","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"47","bestRating":"5"}},
      {"@type":"FAQPage","mainEntity":svc.faqs.map(f=>({
        "@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}
      }))},
      {"@type":"BreadcrumbList","itemListElement":[
        {"@type":"ListItem","position":1,"name":"Home","item":"https://www.siat.in"},
        {"@type":"ListItem","position":2,"name":"RH Software","item":"https://www.siat.in/rhsoftware"},
        {"@type":"ListItem","position":3,"name":cityData.display,"item":canonicalUrl},
      ]},
    ]});
    document.head.appendChild(s);
    return () => { document.getElementById(sid)?.remove(); };
  }, [location, service]);

  const otherCities = Object.entries(CITY_DATA).filter(([k]) => k !== location);

  return (
    <div className="px-6 md:px-10 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] text-white/40 mb-10 flex-wrap">
          <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/rhsoftware" className="hover:text-white/70 transition-colors">RH Software</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/rhsoftware/services" className="hover:text-white/70 transition-colors">Services</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/80">{svc.display} in {cityData.display}</span>
        </nav>

        {/* ── HERO ── */}
        <div className="relative">
          <div aria-hidden className="absolute -top-24 -left-10 w-[520px] h-[420px] pointer-events-none"
            style={{ background: `radial-gradient(500px 350px at 20% 40%, ${svc.glow}, transparent 70%)`, filter: "blur(2px)" }} />
          <div className="relative">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="rh-eyebrow mb-6 inline-flex">
              <span className="dot" /><MapPin className="w-3 h-3" /> {cityData.display}, {cityData.region} · Bihar
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[36px] md:text-[58px] lg:text-[68px] font-semibold leading-[1.05] tracking-[-0.02em] mt-4 max-w-4xl">
              {svc.h1(cityData.display)}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 text-[15px] font-medium text-[#A78BFA]">
              {cityData.hindi} · {svc.hindi}
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-5 text-[16px] text-[#B4B4C7] max-w-2xl leading-relaxed">
              {svc.intro(cityData.display)}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-2.5 mt-6">
              {[{icon:Star,text:"4.9★ Rated (47 reviews)"},{icon:Rocket,text:"40+ Projects Delivered"},{icon:Clock,text:"Quote in 24 Hours"},{icon:Shield,text:"1 Year Free Support"}].map(p => (
                <div key={p.text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-[12px] text-[#B4B4C7]">
                  <p.icon className="w-3 h-3 text-[#10B981]" />{p.text}
                </div>
              ))}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-3 mt-8">
              <Link to="/rhsoftware/contact" className="rh-btn rh-btn-primary">
                Get a free quote <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a href="https://wa.me/919905880697" target="_blank" rel="noreferrer" className="rh-btn rh-btn-ghost">
                <MessageCircle className="w-4 h-4 text-[#25D366]" /> WhatsApp
              </a>
              <Link to="/rhsoftware/portfolio" className="rh-btn rh-btn-ghost">See our work</Link>
            </motion.div>
          </div>
        </div>

        {/* ── FEATURES ── */}
        <section className="mt-24">
          <FadeUp>
            <span className="rh-eyebrow mb-4 inline-flex"><span className="dot" />What's included</span>
            <h2 className="text-[28px] md:text-[38px] font-semibold tracking-tight mt-3">Everything in the package</h2>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
            {svc.features.map((f, i) => (
              <FadeUp key={f} delay={i * 0.04}>
                <div className="rh-surface rh-card-hover p-5 flex items-start gap-3 h-full">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                  <span className="text-[13.5px] text-[#B4B4C7] leading-snug">{f}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── PACKAGES ── */}
        <section className="mt-24">
          <FadeUp>
            <span className="rh-eyebrow mb-4 inline-flex"><span className="dot" />Pricing</span>
            <h2 className="text-[28px] md:text-[38px] font-semibold tracking-tight mt-3">
              {svc.display} packages for {cityData.display}
            </h2>
            <p className="text-[14px] text-[#7A7A92] mt-2">Transparent pricing — no hidden costs. EMI available.</p>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {svc.packages.map((pkg, i) => (
              <FadeUp key={pkg.name} delay={i * 0.1}>
                <div className={`rh-surface-elevated p-7 h-full flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${i === 1 ? "border border-[#7C3AED]/40" : ""}`}
                  style={i === 1 ? { boxShadow: "0 0 0 1px rgba(124,58,237,0.25), 0 24px 60px -20px rgba(124,58,237,0.35)" } : {}}>
                  {i === 1 && <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(400px 200px at 50% -20%, rgba(124,58,237,0.1), transparent 70%)" }} />}
                  {pkg.tag && (
                    <span className="inline-flex w-fit px-2.5 py-1 rounded-full text-[11px] font-semibold mb-4 relative z-10"
                      style={{ background: "rgba(124,58,237,0.18)", border: "1px solid rgba(124,58,237,0.35)", color: "#C4B5FD" }}>
                      {pkg.tag}
                    </span>
                  )}
                  <div className="relative z-10">
                    <h3 className="text-[17px] font-semibold">{pkg.name}</h3>
                    <p className="text-[36px] font-bold mt-2 tracking-tight" style={{ color: i === 1 ? "#A78BFA" : "#fff" }}>{pkg.price}</p>
                  </div>
                  <ul className="mt-5 space-y-2.5 flex-1 relative z-10">
                    {pkg.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-[13px] text-[#B4B4C7]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/rhsoftware/contact" className={`rh-btn mt-7 w-full justify-center relative z-10 ${i === 1 ? "rh-btn-primary" : "rh-btn-ghost"}`}>
                    Get started <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="mt-24">
          <FadeUp>
            <span className="rh-eyebrow mb-4 inline-flex"><span className="dot" />Why us</span>
            <h2 className="text-[28px] md:text-[38px] font-semibold tracking-tight mt-3">
              Why {cityData.display} businesses choose RH Software
            </h2>
          </FadeUp>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {[
              { icon: MapPin,        color: "#A78BFA", title: `Local to ${cityData.display}`,  body: `We understand ${cityData.region} market needs. Can meet in person in ${cityData.display} for discussions.` },
              { icon: Zap,           color: "#22D3EE", title: "Fast delivery",                  body: "Websites in 5-7 days, apps in 2-4 weeks. Milestone plan shared before work starts." },
              { icon: Star,          color: "#F59E0B", title: "4.9★ rated",                     body: "47+ reviews on Google, JustDial and Facebook. Trusted across Bihar." },
              { icon: Shield,        color: "#10B981", title: "1 year free support",             body: "Bug fixes, small updates and support all included free after delivery." },
              { icon: Users,         color: "#F472B6", title: "Hindi + English",                 body: "हम हिंदी में बात कर सकते हैं। WhatsApp, call या email — जैसे comfortable हो।" },
              { icon: CheckCircle2,  color: "#34D399", title: "No hidden costs",                 body: "Price quoted is price charged. No surprise bills. EMI options available." },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.05}>
                <div className="rh-surface rh-card-hover p-6 h-full">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${item.color}18`, border: `1px solid ${item.color}28` }}>
                    <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-[15px] font-semibold mb-2">{item.title}</h3>
                  <p className="text-[13px] text-[#7A7A92] leading-relaxed">{item.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="mt-24">
          <FadeUp>
            <span className="rh-eyebrow mb-4 inline-flex"><span className="dot" />Testimonials</span>
            <h2 className="text-[28px] md:text-[38px] font-semibold tracking-tight mt-3">
              What {cityData.display} clients say
            </h2>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              { name: "Dr. Ankit Kumar",  role: `Clinic Owner, ${cityData.display}`,  quote: `RH Software ne hamare clinic ka complete management system banaya. Best decision for our ${cityData.display} business!` },
              { name: "Priya Sharma",     role: `Retail Owner, ${cityData.district}`, quote: `Website 7 din mein ready. Google par rank ho gayi. Sales 40% badh gayi. Highly recommend!` },
              { name: "Md. Imran",        role: `Coaching Center, ${cityData.display}`, quote: "Bahut professional team. App live ho gaya, students bhi khush hain. 1 year support bhi — excellent." },
            ].map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.1}>
                <div className="rh-surface p-6 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_,j) => <Star key={j} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />)}
                  </div>
                  <Quote className="w-5 h-5 text-[#7C3AED]/50 mb-3" />
                  <p className="text-[13.5px] text-[#B4B4C7] leading-relaxed flex-1">"{t.quote}"</p>
                  <div className="mt-5 pt-4 border-t border-white/[0.06]">
                    <div className="text-[13px] font-semibold">{t.name}</div>
                    <div className="text-[11.5px] text-[#7A7A92] mt-0.5">{t.role}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mt-24">
          <FadeUp>
            <span className="rh-eyebrow mb-4 inline-flex"><span className="dot" />FAQ</span>
            <h2 className="text-[28px] md:text-[38px] font-semibold tracking-tight mt-3">Frequently asked questions</h2>
          </FadeUp>
          <div className="mt-8 space-y-2">
            {svc.faqs.map((f, i) => <FadeUp key={i} delay={i * 0.05}><FaqItem q={f.q} a={f.a} /></FadeUp>)}
          </div>
        </section>

        {/* ── OTHER CITIES ── */}
        <section className="mt-24">
          <FadeUp>
            <h2 className="text-[20px] font-semibold tracking-tight mb-5">
              Also providing {svc.display} across Bihar
            </h2>
          </FadeUp>
          <div className="flex flex-wrap gap-2">
            {otherCities.map(([slug, city]) => (
              <Link key={slug} to={`/bihar/${slug}/${service}`}
                className="px-3.5 py-2 rounded-full text-[12.5px] border border-white/[0.08] bg-white/[0.02] text-white/60 hover:text-white hover:border-[#7C3AED]/40 transition-colors">
                {svc.display} in {city.display}
              </Link>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <FadeUp>
          <div className="rh-surface-elevated p-8 md:p-12 mt-16 text-center relative overflow-hidden">
            <div aria-hidden className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(600px 240px at 50% -10%, ${svc.glow}, transparent 65%)` }} />
            <div className="relative">
              <span className="rh-eyebrow mb-5 inline-flex"><span className="dot" />Ready to start?</span>
              <h3 className="text-[28px] md:text-[42px] font-semibold tracking-tight mt-4">
                Build with {cityData.display}'s top<br className="hidden md:block" /> software team
              </h3>
              <p className="text-[14.5px] text-[#7A7A92] mt-4 max-w-xl mx-auto">
                Free 30-minute strategy call. Real engineers. Bihar-rooted, India-grade work.<br />
                <span className="text-[#A78BFA]">{cityData.hindi} में बात करना चाहते हैं? हम तैयार हैं।</span>
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/rhsoftware/contact" className="rh-btn rh-btn-primary">
                  Book a free strategy call <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a href="https://wa.me/919905880697" target="_blank" rel="noreferrer" className="rh-btn rh-btn-ghost">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" /> WhatsApp us
                </a>
              </div>
            </div>
          </div>
        </FadeUp>

      </div>
    </div>
  );
};

export default LocationServicePage;
