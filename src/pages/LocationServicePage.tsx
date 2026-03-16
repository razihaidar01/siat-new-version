import { useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { CheckCircle, MapPin, Phone, Mail, Star, Globe, Smartphone, Brain, Code, Award, ShieldCheck, Clock } from "lucide-react";
import SEOHead from "@/components/SEOHead";

// All Bihar districts/cities
const locations: Record<string, { name: string; district: string; region: string }> = {
  "saharsa": { name: "Saharsa", district: "Saharsa", region: "Kosi" },
  "supaul": { name: "Supaul", district: "Supaul", region: "Kosi" },
  "madhepura": { name: "Madhepura", district: "Madhepura", region: "Kosi" },
  "purnia": { name: "Purnia", district: "Purnia", region: "Purnia" },
  "katihar": { name: "Katihar", district: "Katihar", region: "Purnia" },
  "araria": { name: "Araria", district: "Araria", region: "Purnia" },
  "kishanganj": { name: "Kishanganj", district: "Kishanganj", region: "Purnia" },
  "khagaria": { name: "Khagaria", district: "Khagaria", region: "Kosi" },
  "begusarai": { name: "Begusarai", district: "Begusarai", region: "Munger" },
  "munger": { name: "Munger", district: "Munger", region: "Munger" },
  "bhagalpur": { name: "Bhagalpur", district: "Bhagalpur", region: "Bhagalpur" },
  "banka": { name: "Banka", district: "Banka", region: "Bhagalpur" },
  "darbhanga": { name: "Darbhanga", district: "Darbhanga", region: "Tirhut" },
  "madhubani": { name: "Madhubani", district: "Madhubani", region: "Tirhut" },
  "sitamarhi": { name: "Sitamarhi", district: "Sitamarhi", region: "Tirhut" },
  "sheohar": { name: "Sheohar", district: "Sheohar", region: "Tirhut" },
  "muzaffarpur": { name: "Muzaffarpur", district: "Muzaffarpur", region: "Tirhut" },
  "east-champaran": { name: "East Champaran", district: "East Champaran", region: "Tirhut" },
  "west-champaran": { name: "West Champaran", district: "West Champaran", region: "Tirhut" },
  "patna": { name: "Patna", district: "Patna", region: "Patna" },
  "nalanda": { name: "Nalanda", district: "Nalanda", region: "Patna" },
  "gaya": { name: "Gaya", district: "Gaya", region: "Magadh" },
  "nawada": { name: "Nawada", district: "Nawada", region: "Magadh" },
  "aurangabad": { name: "Aurangabad", district: "Aurangabad", region: "Magadh" },
  "jehanabad": { name: "Jehanabad", district: "Jehanabad", region: "Magadh" },
  "arwal": { name: "Arwal", district: "Arwal", region: "Magadh" },
  "chapra": { name: "Chapra", district: "Saran", region: "Saran" },
  "siwan": { name: "Siwan", district: "Siwan", region: "Saran" },
  "gopalganj": { name: "Gopalganj", district: "Gopalganj", region: "Saran" },
  "vaishali": { name: "Vaishali", district: "Vaishali", region: "Tirhut" },
  "hajipur": { name: "Hajipur", district: "Vaishali", region: "Tirhut" },
  "buxar": { name: "Buxar", district: "Buxar", region: "Bhojpur" },
  "bhojpur": { name: "Bhojpur", district: "Bhojpur", region: "Bhojpur" },
  "rohtas": { name: "Rohtas", district: "Rohtas", region: "Shahabad" },
  "kaimur": { name: "Kaimur", district: "Kaimur", region: "Shahabad" },
  "jamui": { name: "Jamui", district: "Jamui", region: "Munger" },
  "lakhisarai": { name: "Lakhisarai", district: "Lakhisarai", region: "Munger" },
  "sheikhpura": { name: "Sheikhpura", district: "Sheikhpura", region: "Munger" },
};

// Service types
const serviceTypes: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  services: string[];
  icon: any;
  color: string;
  cta: string;
  ctaLink: string;
}> = {
  "website-development": {
    title: "Website Development",
    subtitle: "Professional Website Design & Development",
    description: "Get a professional, fast, and SEO-optimized website for your business.",
    services: ["Business & Corporate Websites", "E-commerce Stores", "Educational Portals", "Government Websites", "Landing Pages", "Web Applications", "WordPress Development", "SEO Optimization"],
    icon: Globe,
    color: "text-blue-500",
    cta: "Get Free Quote",
    ctaLink: "/rhsoftware/contact",
  },
  "app-development": {
    title: "App Development",
    subtitle: "Android, iOS & Cross-Platform Apps",
    description: "Build powerful mobile apps for Android and iOS that grow your business.",
    services: ["Android App Development", "iOS App Development", "React Native / Flutter", "E-commerce Apps", "On-Demand Apps", "Educational Apps", "App Store Publishing", "UI/UX Design"],
    icon: Smartphone,
    color: "text-green-500",
    cta: "Get Free Quote",
    ctaLink: "/rhsoftware/contact",
  },
  "software-development": {
    title: "Software Development",
    subtitle: "Custom Software & ERP/CRM Solutions",
    description: "Custom software solutions, ERP systems, and CRM platforms built for Bihar businesses.",
    services: ["Custom Software Development", "ERP System Development", "CRM Development", "School Management Software", "Hospital Management System", "Inventory Management", "Payroll Software", "API Development"],
    icon: Code,
    color: "text-purple-500",
    cta: "Get Free Quote",
    ctaLink: "/rhsoftware/contact",
  },
  "ai-development": {
    title: "AI Development",
    subtitle: "Artificial Intelligence & ML Solutions",
    description: "AI-powered solutions, chatbots, automation, and machine learning for modern businesses.",
    services: ["AI Chatbot Development", "Machine Learning Solutions", "Natural Language Processing", "Computer Vision", "AI Automation", "Predictive Analytics", "AI-powered Web Apps", "Data Science Solutions"],
    icon: Brain,
    color: "text-orange-500",
    cta: "Get Free Quote",
    ctaLink: "/rhsoftware/contact",
  },
  "iso-certification": {
    title: "ISO Certification",
    subtitle: "All Types of ISO — IAF & Non-IAF",
    description: "Get ISO 9001, ISO 14001, ISO 45001, ISO 27001 and all other ISO certifications. IAF and non-IAF both available.",
    services: ["ISO 9001:2015 — Quality Management", "ISO 14001:2015 — Environment", "ISO 45001:2018 — Safety", "ISO 27001 — Information Security", "ISO 22000 — Food Safety", "CE Marking", "GMP Certification", "HACCP Certification"],
    icon: Award,
    color: "text-yellow-500",
    cta: "Get Free Consultation",
    ctaLink: "/contact-us",
  },
  "training": {
    title: "Technical Training",
    subtitle: "Job-Ready Skill Development Courses",
    description: "Learn mobile repairing, laptop repairing, AC repairing, CCTV installation and more. Get certified and job-ready.",
    services: ["Mobile Repairing Course", "Laptop Repairing Course", "AC Repairing Course", "CCTV Installation Training", "Computer Basics", "Tally & Accounting", "Web Design Course", "Government Skill Programs (PMKVY)"],
    icon: ShieldCheck,
    color: "text-teal-500",
    cta: "Enroll Now",
    ctaLink: "/contact-us",
  },
};

const LocationServicePage = () => {
  const { location, service } = useParams<{ location: string; service: string }>();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const locationData = location ? locations[location] : null;
  const serviceData = service ? serviceTypes[service] : null;

  if (!locationData || !serviceData) {
    return <Navigate to="/404" replace />;
  }

  const { name: cityName } = locationData;
  const ServiceIcon = serviceData.icon;

  const pageTitle = `${serviceData.title} in ${cityName}, Bihar`;
  const metaDesc = `Best ${serviceData.title.toLowerCase()} company in ${cityName}, Bihar. ${serviceData.description} Contact SIAT / RH Software — serving all of ${locationData.district} district. Call: +91 7004216219`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is there a ${serviceData.title.toLowerCase()} company in ${cityName}?`,
        acceptedAnswer: { "@type": "Answer", text: `Yes! SIAT and RH Software provide professional ${serviceData.title.toLowerCase()} services in ${cityName}, Bihar. We serve all of ${locationData.district} district and surrounding areas. Contact us at +91 7004216219.` }
      },
      {
        "@type": "Question",
        name: `How much does ${serviceData.title.toLowerCase()} cost in ${cityName}?`,
        acceptedAnswer: { "@type": "Answer", text: `We offer the most competitive pricing for ${serviceData.title.toLowerCase()} in ${cityName} and all of Bihar. Contact us for a free consultation and custom quote based on your requirements.` }
      },
      {
        "@type": "Question",
        name: `Where is SIAT located near ${cityName}?`,
        acceptedAnswer: { "@type": "Answer", text: `SIAT is headquartered in Saharsa, Bihar — serving all of Kosi division including ${cityName}, and the entire state of Bihar. We provide on-site and remote services across all districts.` }
      },
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `SIAT — ${serviceData.title} in ${cityName}`,
    "url": `https://www.siat.in/bihar/${location}/${service}`,
    "telephone": "+91-7004216219",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Saharsa",
      "addressRegion": "Bihar",
      "addressCountry": "IN"
    },
    "areaServed": {
      "@type": "City",
      "name": cityName
    },
    "description": metaDesc,
  };

  return (
    <>
      <SEOHead
        title={`${pageTitle} | SIAT`}
        description={metaDesc}
        canonical={`https://www.siat.in/bihar/${location}/${service}`}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* Hero */}
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">{cityName}, Bihar</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-foreground mt-2 mb-6">
            {serviceData.subtitle} <span className="gradient-text">in {cityName}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            SIAT aur RH Software — {cityName} aur poore {locationData.district} district mein best {serviceData.title.toLowerCase()} services. Professional, affordable, aur trusted.
          </p>
          <p className="text-base text-muted-foreground/80 italic mb-8">
            "{cityName} ke logon ke liye — world-class {serviceData.title.toLowerCase()} services!"
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={serviceData.ctaLink} className="btn-primary-glow">{serviceData.cta}</Link>
            <a href="tel:+917004216219" className="btn-outline-glow">Call: +91 7004216219</a>
          </div>
        </div>
      </section>

      {/* About serving this city */}
      <section className="py-8 bg-primary">
        <div className="max-w-5xl mx-auto px-6 text-center text-white">
          <p className="text-lg font-semibold">
            🏆 Serving {cityName}, {locationData.district} & all surrounding areas of {locationData.region} division, Bihar
          </p>
        </div>
      </section>

      {/* Why Choose */}
      <section ref={ref} className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-12">
            Why {cityName} Chooses <span className="gradient-text">SIAT?</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Star, title: "Trusted in Bihar", desc: `Hundreds of satisfied clients across ${cityName} and all Bihar districts` },
              { icon: Clock, title: "Fast Delivery", desc: "Quick turnaround — we value your time and business goals" },
              { icon: ShieldCheck, title: "Quality Guaranteed", desc: "ISO certified organization — quality is our commitment" },
              { icon: Phone, title: "Local Support", desc: `Dedicated support for ${cityName} clients — call anytime` },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }} className="glass-card-hover p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground text-center mb-4">
            {serviceData.title} Services <span className="gradient-text">in {cityName}</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12">{serviceData.description}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {serviceData.services.map((s) => (
              <div key={s} className="flex items-center gap-3 glass-card p-4">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground text-sm font-medium">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-black text-foreground text-center mb-12">
            {cityName} ke Log Poochte Hain — <span className="gradient-text">FAQ</span>
          </h2>
          <div className="space-y-4">
            {[
              {
                q: `${cityName} mein ${serviceData.title.toLowerCase()} ke liye SIAT se kaise contact karein?`,
                a: `Aap humse directly call kar sakte hain: +91 7004216219 ya +91 9342470019. Email: siatgroup.sws@gmail.com. Hum ${cityName} aur poore ${locationData.district} district mein service dete hain.`
              },
              {
                q: `Kya SIAT ${cityName} mein on-site service deta hai?`,
                a: `Haan! SIAT ${cityName} aur aaspaas ke sabhi ilakon mein on-site service provide karta hai. Hum Saharsa se operate karte hain aur poore Kosi aur Bihar region mein visit karte hain.`
              },
              {
                q: `${cityName} mein ${serviceData.title.toLowerCase()} ki cost kitni hogi?`,
                a: `Cost aapki zaroorat ke hisaab se alag hogi. Hum Bihar mein sabse competitive pricing offer karte hain. Free consultation ke liye call karein: +91 7004216219.`
              },
            ].map((faq) => (
              <details key={faq.q} className="glass-card p-6 group cursor-pointer">
                <summary className="font-display font-bold text-foreground list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-primary group-open:rotate-45 transition-transform text-xl flex-shrink-0 ml-4">+</span>
                </summary>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other locations */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-display font-black text-foreground text-center mb-8">
            We Also Serve <span className="gradient-text">These Cities</span>
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.entries(locations)
              .filter(([slug]) => slug !== location)
              .slice(0, 16)
              .map(([slug, loc]) => (
                <Link
                  key={slug}
                  to={`/bihar/${slug}/${service}`}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary hover:text-white transition-all"
                >
                  {loc.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-display font-black text-foreground mb-4">
            {cityName} mein <span className="gradient-text">{serviceData.title}</span> chahiye?
          </h2>
          <p className="text-muted-foreground mb-8">Abhi call karein ya message bhejein — free consultation ke saath shuruwat karein!</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={serviceData.ctaLink} className="btn-primary-glow">{serviceData.cta}</Link>
            <a href="tel:+917004216219" className="btn-outline-glow flex items-center gap-2"><Phone className="w-4 h-4" /> +91 7004216219</a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 justify-center text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-primary" /> Saharsa, Bihar</span>
            <span className="flex items-center gap-1"><Mail className="w-4 h-4 text-primary" /> siatgroup.sws@gmail.com</span>
            <span className="flex items-center gap-1"><Phone className="w-4 h-4 text-primary" /> +91 9342470019</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default LocationServicePage;