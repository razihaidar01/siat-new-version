/**
 * ════════════════════════════════════════════════════════════
 * STEP 4A — LocationServicePage.tsx (UPGRADE)
 * 
 * File: src/pages/LocationServicePage.tsx
 * 
 * This is the SINGLE component that handles ALL city + service URLs:
 *   /bihar/saharsa/website-developer
 *   /bihar/madhepura/app-developer
 *   /bihar/purnia/iso-certification
 *   etc.
 * 
 * WHAT TO DO:
 * 1. Replace your existing src/pages/LocationServicePage.tsx with this file
 * 2. The route in App.tsx is already: /bihar/:location/:service
 *    (no change needed in App.tsx)
 * 
 * HOW IT WORKS:
 * - Reads :location and :service from URL params
 * - Auto-generates city-specific title, meta, H1, content
 * - Full Schema markup per page
 * - Hindi content included
 * - Converts to rank for "best website developer in X city"
 * ════════════════════════════════════════════════════════════
 */

import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Globe, Smartphone, Brain, Code2, Shield, FileCheck,
  ArrowRight, CheckCircle2, Star, Phone, Mail, MapPin,
  Zap, Clock, Users
} from "lucide-react";

/* ─── City data ─── */
const CITY_DATA: Record<string, {
  display: string;
  hindi: string;
  district: string;
  region: string;
  lat: number;
  lng: number;
  pincode: string;
  description: string;
}> = {
  saharsa: {
    display: "Saharsa",
    hindi: "सहरसा",
    district: "Saharsa District",
    region: "Kosi Region",
    lat: 25.8786,
    lng: 86.5969,
    pincode: "852201",
    description: "Saharsa is the headquarters of Saharsa district in Bihar's Kosi region.",
  },
  madhepura: {
    display: "Madhepura",
    hindi: "मधेपुरा",
    district: "Madhepura District",
    region: "Kosi Region",
    lat: 25.9178,
    lng: 86.7911,
    pincode: "852113",
    description: "Madhepura is a major city in Bihar's Kosi region, growing rapidly in IT adoption.",
  },
  purnia: {
    display: "Purnia",
    hindi: "पूर्णिया",
    district: "Purnia District",
    region: "Seemanchal Region",
    lat: 25.7771,
    lng: 87.4753,
    pincode: "854301",
    description: "Purnia is one of Bihar's major commercial hubs in the Seemanchal region.",
  },
  supaul: {
    display: "Supaul",
    hindi: "सुपौल",
    district: "Supaul District",
    region: "Kosi Region",
    lat: 26.1220,
    lng: 86.6019,
    pincode: "852131",
    description: "Supaul is an emerging city in Bihar's Kosi region with growing business activity.",
  },
  darbhanga: {
    display: "Darbhanga",
    hindi: "दरभंगा",
    district: "Darbhanga District",
    region: "Mithila Region",
    lat: 26.1542,
    lng: 85.8918,
    pincode: "846004",
    description: "Darbhanga is a major educational and cultural hub in Bihar's Mithila region.",
  },
  bhagalpur: {
    display: "Bhagalpur",
    hindi: "भागलपुर",
    district: "Bhagalpur District",
    region: "Anga Region",
    lat: 25.2425,
    lng: 86.9842,
    pincode: "812001",
    description: "Bhagalpur is Bihar's third largest city and a major commercial center.",
  },
  katihar: {
    display: "Katihar",
    hindi: "कटिहार",
    district: "Katihar District",
    region: "Seemanchal Region",
    lat: 25.5395,
    lng: 87.5780,
    pincode: "854105",
    description: "Katihar is a major railway junction city in Bihar's Seemanchal region.",
  },
  araria: {
    display: "Araria",
    hindi: "अररिया",
    district: "Araria District",
    region: "Seemanchal Region",
    lat: 26.1516,
    lng: 87.4789,
    pincode: "854311",
    description: "Araria is the headquarters of Araria district in Bihar's Seemanchal region.",
  },
  patna: {
    display: "Patna",
    hindi: "पटना",
    district: "Patna District",
    region: "Central Bihar",
    lat: 25.5941,
    lng: 85.1376,
    pincode: "800001",
    description: "Patna is the capital city of Bihar and the main commercial hub of the state.",
  },
  muzaffarpur: {
    display: "Muzaffarpur",
    hindi: "मुज़फ्फरपुर",
    district: "Muzaffarpur District",
    region: "North Bihar",
    lat: 26.1197,
    lng: 85.3910,
    pincode: "842001",
    description: "Muzaffarpur is Bihar's second largest city and North Bihar's main commercial center.",
  },
};

/* ─── Service data ─── */
const SERVICE_DATA: Record<string, {
  display: string;
  hindi: string;
  hindiDesc: string;
  icon: React.ElementType;
  color: string;
  pageTitle: (city: string) => string;
  metaDesc: (city: string) => string;
  h1: (city: string) => string;
  features: string[];
  packages: { name: string; price: string; features: string[] }[];
  faqHindi: { q: string; a: string }[];
}> = {
  "website-developer": {
    display: "Website Development",
    hindi: "वेबसाइट डेवलपमेंट",
    hindiDesc: "प्रोफेशनल वेबसाइट डिज़ाइन और डेवलपमेंट",
    icon: Globe,
    color: "#6366f1",
    pageTitle: (city) => `Best Website Developer in ${city} Bihar | RH Software (SIAT)`,
    metaDesc: (city) => `Looking for the best website developer in ${city}, Bihar? RH Software by SIAT builds modern, fast & SEO-optimized websites. 40+ projects delivered. Free quote in 2 hours! ☎ Call Now.`,
    h1: (city) => `Best Website Developer in ${city}, Bihar`,
    features: [
      "Modern, mobile-friendly design",
      "SEO-optimized from day one",
      "Fast loading (under 2 seconds)",
      "E-commerce & payment gateway",
      "Admin panel / CMS included",
      "1 year free support",
      "SSL certificate included",
      "Google Analytics setup",
    ],
    packages: [
      {
        name: "Basic Website",
        price: "₹4,999",
        features: ["5 pages", "Mobile responsive", "Contact form", "Google Maps", "Basic SEO"],
      },
      {
        name: "Business Website",
        price: "₹12,999",
        features: ["15 pages", "Admin panel", "Blog section", "WhatsApp chat", "Advanced SEO", "1yr hosting"],
      },
      {
        name: "E-Commerce Website",
        price: "₹24,999",
        features: ["Unlimited products", "Payment gateway", "Order tracking", "Inventory system", "Mobile app ready"],
      },
    ],
    faqHindi: [
      {
        q: "क्या आप सहरसा/मधेपुरा में आकर मिल सकते हैं?",
        a: "हाँ, हम पूरे कोसी-सीमांचल क्षेत्र में मिल सकते हैं। हम Saharsa, Madhepura, Purnia, Supaul में free consultation देते हैं।",
      },
      {
        q: "वेबसाइट बनने में कितना समय लगता है?",
        a: "Basic website 3-5 दिन में, Business website 7-14 दिन में, और E-commerce website 15-30 दिन में तैयार हो जाती है।",
      },
      {
        q: "क्या हम Bihar Student Credit Card से payment कर सकते हैं?",
        a: "हाँ, हम flexible payment options देते हैं। आप EMI, UPI, bank transfer सभी तरीकों से payment कर सकते हैं।",
      },
    ],
  },
  "app-developer": {
    display: "App Development",
    hindi: "मोबाइल ऐप डेवलपमेंट",
    hindiDesc: "iOS और Android मोबाइल ऐप बनाना",
    icon: Smartphone,
    color: "#06b6d4",
    pageTitle: (city) => `Best App Developer in ${city} Bihar | RH Software (SIAT)`,
    metaDesc: (city) => `Best mobile app developer in ${city}, Bihar. RH Software builds iOS & Android apps with smooth performance. React Native & Flutter experts. Free consultation! Call RH Software.`,
    h1: (city) => `Best Mobile App Developer in ${city}, Bihar`,
    features: [
      "iOS & Android apps",
      "React Native / Flutter",
      "Offline-capable apps",
      "Push notifications",
      "Payment integration",
      "Real-time features",
      "App Store submission",
      "Post-launch support",
    ],
    packages: [
      {
        name: "Basic App",
        price: "₹19,999",
        features: ["Android only", "5 screens", "Login/Register", "Basic features", "Play Store upload"],
      },
      {
        name: "Business App",
        price: "₹39,999",
        features: ["iOS + Android", "15 screens", "Admin dashboard", "Push notifications", "Payment gateway"],
      },
      {
        name: "Enterprise App",
        price: "₹79,999",
        features: ["iOS + Android", "Unlimited screens", "AI features", "Offline mode", "Real-time sync", "API integration"],
      },
    ],
    faqHindi: [
      {
        q: "App Play Store पर कैसे आएगा?",
        a: "हम आपका app Google Play Store और Apple App Store दोनों पर upload करते हैं। पूरी process हम handle करते हैं।",
      },
      {
        q: "क्या app बिना internet के भी काम करेगा?",
        a: "हाँ, हम offline-capable apps बना सकते हैं जो बिना internet के भी basic features use कर सकते हैं।",
      },
    ],
  },
  "software-company": {
    display: "Custom Software Development",
    hindi: "कस्टम सॉफ्टवेयर डेवलपमेंट",
    hindiDesc: "ERP, CRM, स्कूल मैनेजमेंट सॉफ्टवेयर",
    icon: Code2,
    color: "#10b981",
    pageTitle: (city) => `Best Software Company in ${city} Bihar | RH Software (SIAT)`,
    metaDesc: (city) => `Best software development company in ${city}, Bihar. RH Software builds ERP, CRM, school management, hospital management systems. 40+ projects. Free demo available!`,
    h1: (city) => `Best Software Development Company in ${city}, Bihar`,
    features: [
      "School Management System",
      "Hospital Management System",
      "ERP for businesses",
      "CRM for sales teams",
      "Inventory management",
      "Payroll software",
      "Attendance system",
      "Custom dashboards",
    ],
    packages: [
      {
        name: "School Software",
        price: "₹14,999",
        features: ["Student records", "Fee management", "Attendance", "Report cards", "Parent portal"],
      },
      {
        name: "Business ERP",
        price: "₹29,999",
        features: ["Inventory", "Billing/GST", "HR/Payroll", "Reports", "Multi-user"],
      },
      {
        name: "Enterprise System",
        price: "Custom",
        features: ["Fully custom", "Multi-branch", "AI insights", "Cloud hosted", "24/7 support"],
      },
    ],
    faqHindi: [
      {
        q: "क्या software हमारे business के हिसाब से customize होगा?",
        a: "हाँ, हम 100% custom software बनाते हैं। आपके business की जरूरत के अनुसार every feature design किया जाता है।",
      },
    ],
  },
  "ai-developer": {
    display: "AI Development",
    hindi: "AI और मशीन लर्निंग",
    hindiDesc: "आर्टिफिशियल इंटेलिजेंस सॉल्यूशन",
    icon: Brain,
    color: "#8b5cf6",
    pageTitle: (city) => `Best AI Developer in ${city} Bihar | RH Software (SIAT)`,
    metaDesc: (city) => `Best AI & machine learning developer in ${city}, Bihar. RH Software builds AI chatbots, recommendation systems, automation tools. Transform your business with AI!`,
    h1: (city) => `Best AI Developer in ${city}, Bihar`,
    features: [
      "AI chatbots",
      "Machine learning models",
      "Data analysis & insights",
      "Process automation",
      "Image recognition",
      "Natural language processing",
      "Recommendation systems",
      "Predictive analytics",
    ],
    packages: [
      {
        name: "AI Chatbot",
        price: "₹9,999",
        features: ["WhatsApp/Web bot", "24/7 automated replies", "FAQ handling", "Lead capture"],
      },
      {
        name: "AI Dashboard",
        price: "₹24,999",
        features: ["Data analytics", "Predictive reports", "Visualization", "Export features"],
      },
      {
        name: "Custom AI",
        price: "Custom",
        features: ["Full ML pipeline", "Custom model", "API integration", "Training & support"],
      },
    ],
    faqHindi: [
      {
        q: "AI से हमारे business को क्या फायदा होगा?",
        a: "AI से आप customer service automate कर सकते हैं, sales predict कर सकते हैं, और repetitive tasks बंद कर सकते हैं — जिससे समय और पैसा दोनों बचते हैं।",
      },
    ],
  },
  "iso-certification": {
    display: "ISO Certification",
    hindi: "ISO सर्टिफिकेशन",
    hindiDesc: "ISO, GMP, ट्रेडमार्क और कंपनी रजिस्ट्रेशन",
    icon: FileCheck,
    color: "#f59e0b",
    pageTitle: (city) => `ISO Certification in ${city} Bihar | SIAT – GMP, Trademark, MSME Registration`,
    metaDesc: (city) => `Get ISO 9001, GMP certification, trademark registration, company registration in ${city}, Bihar. SIAT provides fast, affordable certification services. Free consultation!`,
    h1: (city) => `ISO Certification & Business Registration Services in ${city}, Bihar`,
    features: [
      "ISO 9001:2015 (Quality Management)",
      "ISO 14001 (Environment)",
      "GMP Certification",
      "Trademark Registration",
      "Company Registration (Pvt Ltd/LLP)",
      "MSME / Udyam Registration",
      "FSSAI License",
      "GST Registration",
    ],
    packages: [
      {
        name: "MSME Registration",
        price: "₹999",
        features: ["Udyam certificate", "Govt benefits", "Bank loan priority", "Fast processing"],
      },
      {
        name: "ISO 9001 Certification",
        price: "₹9,999",
        features: ["Full documentation", "Audit support", "Certificate in 30 days", "Validity 3 years"],
      },
      {
        name: "Complete Package",
        price: "₹19,999",
        features: ["ISO + Trademark", "Company registration", "GST filing", "Annual compliance"],
      },
    ],
    faqHindi: [
      {
        q: "ISO certificate लेने में कितना समय लगता है?",
        a: "MSME registration 1-2 दिन में होती है। ISO 9001 certification 20-45 दिन में complete हो जाती है। Trademark registration 6-18 महीने (national process)।",
      },
      {
        q: "क्या ISO certificate से business को फायदा होता है?",
        a: "हाँ बिल्कुल! ISO certificate से government tenders मिलते हैं, bank loans आसान होते हैं, और customers का trust बढ़ता है।",
      },
    ],
  },
};

/* ─── Main Component ─── */

const LocationServicePage = () => {
  const { location = "saharsa", service = "website-developer" } = useParams();

  const cityData = CITY_DATA[location] || CITY_DATA.saharsa;
  const serviceData = SERVICE_DATA[service] || SERVICE_DATA["website-developer"];

  const pageTitle = serviceData.pageTitle(cityData.display);
  const metaDesc = serviceData.metaDesc(cityData.display);
  const h1 = serviceData.h1(cityData.display);

  /* ─── Dynamic SEO meta injection ─── */
  useEffect(() => {
    // Title
    document.title = pageTitle;

    // Meta description
    let descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute("content", metaDesc);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", `https://www.siat.in/bihar/${location}/${service}`);
    }

    // OG tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", pageTitle);
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", metaDesc);
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", `https://www.siat.in/bihar/${location}/${service}`);

    // Schema injection
    const schemaId = "city-service-schema";
    let existing = document.getElementById(schemaId);
    if (existing) existing.remove();

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `https://www.siat.in/bihar/${location}/${service}`,
          "url": `https://www.siat.in/bihar/${location}/${service}`,
          "name": pageTitle,
          "description": metaDesc,
          "inLanguage": "en-IN",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.siat.in" },
              { "@type": "ListItem", "position": 2, "name": "Bihar", "item": "https://www.siat.in/rhsoftware" },
              { "@type": "ListItem", "position": 3, "name": cityData.display, "item": `https://www.siat.in/bihar/${location}/${service}` },
            ],
          },
        },
        {
          "@type": "LocalBusiness",
          "name": `RH Software – ${serviceData.display} in ${cityData.display}`,
          "description": metaDesc,
          "url": `https://www.siat.in/bihar/${location}/${service}`,
          "telephone": "+91-9999999999",
          "email": "siat.sws@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": cityData.display,
            "addressRegion": "Bihar",
            "postalCode": cityData.pincode,
            "addressCountry": "IN",
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": cityData.lat,
            "longitude": cityData.lng,
          },
          "areaServed": {
            "@type": "City",
            "name": cityData.display,
          },
          "priceRange": "₹₹",
          "openingHours": "Mo-Sa 09:00-18:00",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "47",
            "bestRating": "5",
          },
        },
        {
          "@type": "FAQPage",
          "mainEntity": serviceData.faqHindi.map((faq) => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a },
          })),
        },
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = schemaId;
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const toRemove = document.getElementById(schemaId);
      if (toRemove) toRemove.remove();
    };
  }, [location, service, pageTitle, metaDesc]);

  const ServiceIcon = serviceData.icon;

  return (
    <div className="min-h-screen bg-white">

      {/* ─── HERO ─── */}
      <section
        className="relative py-20 md:py-28 px-6 md:px-10 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f8faff 0%, #eef2ff 50%, #f0fdf4 100%)" }}
      >
        {/* Breadcrumb */}
        <nav className="max-w-6xl mx-auto mb-8 text-sm text-gray-500 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>›</span>
          <Link to="/rhsoftware" className="hover:text-blue-600">RH Software</Link>
          <span>›</span>
          <span className="text-blue-700 font-medium">
            {serviceData.display} in {cityData.display}
          </span>
        </nav>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* City + Service badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold mb-5">
              <MapPin className="w-4 h-4" />
              {cityData.display}, Bihar · {cityData.region}
            </div>

            {/* H1 — Most important SEO element */}
            <h1
              className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {h1}
            </h1>

            {/* Hindi subtitle — ranks for Hindi searches */}
            <p className="text-lg text-blue-700 font-medium mb-4">
              {cityData.hindi} में {serviceData.hindi} — {serviceData.hindiDesc}
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              <strong>RH Software by SIAT</strong> is {cityData.display}'s most trusted{" "}
              {serviceData.display.toLowerCase()} company. We've delivered{" "}
              <strong>40+ projects</strong> across Bihar with{" "}
              <strong>4.9★ average rating</strong>. Get a free quote within 2 hours!
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Star, text: "4.9★ Rated (47 Reviews)" },
                { icon: CheckCircle2, text: "40+ Projects Delivered" },
                { icon: Clock, text: "Free Quote in 2 Hours" },
                { icon: Users, text: "Serving All Bihar Cities" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-gray-700">
                  <item.icon className="w-4 h-4 text-green-600" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/rhsoftware/contact"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
              >
                Get Free Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm bg-green-600 hover:bg-green-700 transition-colors"
              >
                WhatsApp Now
              </a>
              <a
                href="tel:+919999999999"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-bold text-sm hover:border-blue-400 transition-colors"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </motion.div>

          {/* Right side — Service card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              className="rounded-3xl p-8 text-white"
              style={{ background: `linear-gradient(135deg, ${serviceData.color}, ${serviceData.color}cc)` }}
            >
              <ServiceIcon className="w-12 h-12 mb-5 opacity-90" />
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {serviceData.display} in {cityData.display}
              </h2>
              <ul className="space-y-2">
                {serviceData.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-white/70 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── PACKAGES ─── */}
      <section className="py-20 px-6 md:px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-3"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {serviceData.display} Packages for {cityData.display}
            </h2>
            <p className="text-gray-600">
              Affordable, transparent pricing — no hidden costs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {serviceData.packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`rounded-2xl p-7 border-2 ${i === 1 ? "border-indigo-500 bg-white shadow-xl shadow-indigo-100" : "border-gray-200 bg-white"}`}
              >
                {i === 1 && (
                  <div className="inline-block px-3 py-1 rounded-full bg-indigo-500 text-white text-xs font-bold mb-3">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {pkg.name}
                </h3>
                <p className="text-3xl font-extrabold text-indigo-600 mb-5">
                  {pkg.price}
                </p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/rhsoftware/contact"
                  className={`block text-center py-3 rounded-xl font-bold text-sm transition-all ${
                    i === 1
                      ? "bg-indigo-500 text-white hover:bg-indigo-600"
                      : "border-2 border-gray-300 text-gray-700 hover:border-indigo-400"
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="py-20 px-6 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-12"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Why {cityData.display} Businesses Choose RH Software (SIAT)
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: `Local to ${cityData.display}`, desc: `We understand ${cityData.display} and ${cityData.region} market needs. We can meet you in person.` },
              { icon: Zap, title: "Fast Delivery", desc: "We deliver projects faster than any other company in Bihar. Websites in 5 days, apps in 2 weeks." },
              { icon: Star, title: "4.9★ Rated", desc: "47+ reviews across Google, JustDial and Facebook. Trusted by businesses from Saharsa to Patna." },
              { icon: Shield, title: "1 Year Free Support", desc: "After delivery, we provide 1 year of free maintenance, bug fixes and small updates." },
              { icon: Users, title: "Hindi-English Support", desc: "हम हिंदी में भी बात कर सकते हैं। WhatsApp, call या email — जैसे चाहें।" },
              { icon: CheckCircle2, title: "No Hidden Costs", desc: "Price quoted is price charged. EMI options available. No surprise bills after delivery." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:border-indigo-200 hover:bg-indigo-50 transition-all">
                <item.icon className="w-8 h-8 text-indigo-500 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HINDI FAQ ─── */}
      <section className="py-16 px-6 md:px-10 bg-indigo-50">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-10"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            अक्सर पूछे जाने वाले सवाल — {cityData.hindi}
          </h2>
          <div className="space-y-5">
            {serviceData.faqHindi.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 border border-indigo-100">
                <h3 className="font-bold text-gray-900 mb-2">❓ {faq.q}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">✅ {faq.a}</p>
              </div>
            ))}
            <div className="bg-white rounded-2xl p-6 border border-indigo-100">
              <h3 className="font-bold text-gray-900 mb-2">
                ❓ SIAT और RH Software में क्या फर्क है?
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                ✅ SIAT (Saharsa Institute of Advance Technology) मुख्य संस्था है। RH Software इसका IT और software development wing है।
                SIAT training, consultancy, और government projects भी संभालता है। एक ही छत के नीचे सभी सेवाएं।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OTHER CITIES ─── */}
      <section className="py-16 px-6 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            We Also Serve These Bihar Cities
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(CITY_DATA)
              .filter(([key]) => key !== location)
              .map(([key, city]) => (
                <Link
                  key={key}
                  to={`/bihar/${key}/${service}`}
                  className="px-4 py-2 rounded-full border border-gray-200 text-gray-700 text-sm hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                >
                  {serviceData.display} in {city.display}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section
        className="py-20 px-6 md:px-10 text-center"
        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-extrabold text-white mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Ready to grow your business in {cityData.display}?
          </h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Get a free consultation today. We respond within 2 hours.
            {" "}<span className="font-bold">{cityData.hindi}</span> में बात करना चाहते हैं? हम तैयार हैं।
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/rhsoftware/contact"
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Get Free Quote
            </Link>
            <a
              href="mailto:siat.sws@gmail.com"
              className="flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              <Mail className="w-4 h-4" /> Email Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LocationServicePage;
