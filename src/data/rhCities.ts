/**
 * RH Software — bilingual city landing data.
 * Drives /rhsoftware/bihar/:city  (English, default)
 *    and /rhsoftware/bihar/:city/hi  (Hindi)
 */

export type RHCityLang = "en" | "hi";

export type RHCityCopy = {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  h1: string;
  intro: string;
  whyItems: { title: string; body: string }[];
  servicesHeading: string;
  faqs: { q: string; a: string }[];
  testimonials: { name: string; role: string; quote: string }[];
  ctaTitle: string;
  ctaSub: string;
};

export type RHCity = {
  slug: string;
  name: { en: string; hi: string };
  district: string;
  population?: string;
  lat?: number;
  lng?: number;
  copy: Record<RHCityLang, RHCityCopy>;
};

const baseServices = ["Website Development", "Mobile App Development", "AI Development", "SaaS / ERP", "UI / UX", "SEO & Growth"];

const make = (
  cityEn: string,
  cityHi: string,
  district: string,
  hindiBlurb: string,
): RHCity["copy"] => ({
  en: {
    metaTitle: `Best Website, App & Software Developer in ${cityEn} | RH Software (by SIAT)`,
    metaDescription: `RH Software is the best website developer, mobile app developer and AI software company in ${cityEn}, Bihar. Trusted by ${district} businesses, doctors, schools and startups. Free quote in 24 hours.`,
    keywords: `website developer in ${cityEn}, app developer ${cityEn}, software company ${cityEn}, AI development ${cityEn}, web designer ${cityEn} bihar, best IT company ${cityEn}`,
    h1: `Best Website & Software Developer in ${cityEn}`,
    intro: `RH Software (by SIAT) is ${cityEn}'s most trusted product engineering studio — building production-grade websites, mobile apps, AI systems and SaaS platforms for businesses across ${district} and the wider Bihar region. From local clinics to multi-city retailers, we ship software that earns its keep.`,
    whyItems: [
      { title: `Local presence in ${cityEn}`, body: `On-call team familiar with ${district} businesses, languages and buying behaviour.` },
      { title: "Senior engineers only", body: "No outsourced juniors — your project is built by people you can call by name." },
      { title: "Fast 24-hour quotes", body: "Tell us your idea today; you'll get a clear roadmap and price within a working day." },
      { title: "Built for SEO from day one", body: `Every site we ship in ${cityEn} is built to rank on Google for your service + city.` },
      { title: "Bilingual delivery", body: "We brief, build and document in English + Hindi so your team understands every step." },
      { title: "Long-term support", body: "Most agencies disappear after launch. We stay on call — measured by your business outcomes." },
    ],
    servicesHeading: `Software services we provide in ${cityEn}`,
    faqs: [
      { q: `Who is the best website developer in ${cityEn}?`, a: `RH Software (by SIAT) is widely recognised as the leading website developer in ${cityEn}, Bihar — delivering 40+ production-grade web and mobile products with senior engineers, transparent pricing and on-call support.` },
      { q: `How much does it cost to make a website in ${cityEn}?`, a: `Marketing websites for ${cityEn} businesses start from ₹15,000–₹60,000. Custom web apps, dashboards and SaaS platforms typically range ₹1.5L–₹10L depending on scope. Book a free strategy call for an exact quote.` },
      { q: `Do you build mobile apps for ${cityEn} businesses?`, a: `Yes. We design and develop iOS + Android apps for ${cityEn}-based startups, retailers, hospitals and educational institutions — including Razorpay/UPI checkout, push notifications and offline-first features.` },
      { q: `Do you offer AI development services in ${cityEn}?`, a: `Yes. RH Software builds AI assistants, RAG systems, NLP automation and custom ML for ${cityEn} businesses — from auto-WhatsApp replies to full conversational support agents.` },
      { q: `How fast can you deliver a website in ${cityEn}?`, a: `Standard business websites for ${cityEn} clients launch in 7–14 days. Custom web apps take 4–10 weeks. We share a milestone plan upfront — no surprises.` },
    ],
    testimonials: [
      { name: "Dr. A. Kumar", role: `Hospital Director, ${cityEn}`, quote: `RH Software ne hamare hospital ka complete management software banaya — aaj sab kuch ek dashboard se chalta hai. Excellent team in ${cityEn}.` },
      { name: "Priya Sharma", role: `D2C Founder, ${district}`, quote: `Our store launched in 9 days. Razorpay, WhatsApp, SEO — sab sorted. Best decision for our ${cityEn} business.` },
      { name: "Md. Imran", role: `Coaching Owner, ${cityEn}`, quote: "Bahut professional team. LMS app live ho gaya, students bhi happy hain. Highly recommended for any Bihar business." },
    ],
    ctaTitle: `Build with ${cityEn}'s top software team`,
    ctaSub: `Free 30-minute strategy call. Real engineers. Bihar-rooted, India-grade work.`,
  },
  hi: {
    metaTitle: `${cityHi} में सबसे अच्छी वेबसाइट, ऐप और सॉफ्टवेयर डेवलपर कंपनी | RH Software`,
    metaDescription: `RH Software (by SIAT) ${cityHi}, बिहार की सबसे भरोसेमंद वेबसाइट डेवलपर, मोबाइल ऐप और AI सॉफ्टवेयर कंपनी है। ${district} के व्यवसायों के लिए मुफ्त 24-घंटे कोटेशन।`,
    keywords: `वेबसाइट डेवलपर ${cityHi}, ऐप डेवलपर ${cityHi}, सॉफ्टवेयर कंपनी ${cityHi}, वेबसाइट बनाने वाली कंपनी बिहार, AI सॉफ्टवेयर ${cityHi}`,
    h1: `${cityHi} में सबसे अच्छी वेबसाइट और सॉफ्टवेयर डेवलपर कंपनी`,
    intro: `RH Software (by SIAT) ${cityHi} की सबसे भरोसेमंद software development team है। ${hindiBlurb} हम websites, mobile apps, AI systems और SaaS platforms बनाते हैं जो आपके business को असली result देते हैं।`,
    whyItems: [
      { title: `${cityHi} में लोकल टीम`, body: `${district} के businesses, language और customer behaviour को समझने वाली on-call team.` },
      { title: "सीनियर इंजीनियर्स ही", body: "कोई outsourced junior नहीं — हर project senior engineers बनाते हैं." },
      { title: "24 घंटे में कोटेशन", body: "आज idea बताइए — एक working day में clear roadmap और price मिलेगा." },
      { title: "Day 1 से SEO ready", body: `${cityHi} में हमारी हर website Google पर रैंक करने के लिए optimized होती है.` },
      { title: "Hindi + English delivery", body: "हम brief, build और documentation दोनों भाषाओं में करते हैं." },
      { title: "Long-term support", body: "हम launch के बाद भी आपके साथ रहते हैं — आपके business outcome से measured." },
    ],
    servicesHeading: `${cityHi} में हमारी सॉफ्टवेयर सेवाएँ`,
    faqs: [
      { q: `${cityHi} में सबसे अच्छा वेबसाइट डेवलपर कौन है?`, a: `RH Software (by SIAT) ${cityHi}, बिहार की सबसे top website development company है — 40+ projects, senior engineers, transparent pricing और on-call support के साथ।` },
      { q: `${cityHi} में website बनाने का खर्चा कितना आता है?`, a: `${cityHi} के businesses के लिए basic website ₹15,000–₹60,000 से शुरू होती है। Custom web apps और SaaS platforms ₹1.5L–₹10L तक होते हैं। Free quote के लिए call कीजिए।` },
      { q: `क्या आप ${cityHi} के businesses के लिए mobile app बनाते हैं?`, a: `हाँ। हम ${cityHi} के startups, retailers, hospitals और schools के लिए iOS + Android apps design और develop करते हैं — Razorpay/UPI, push notifications और offline mode के साथ।` },
      { q: `क्या ${cityHi} में AI development services available हैं?`, a: `हाँ। RH Software ${cityHi} businesses के लिए AI assistants, RAG systems, NLP automation और custom ML solutions बनाता है।` },
      { q: `${cityHi} में website कितने दिन में deliver होती है?`, a: `Standard business websites 7–14 दिन में live हो जाती हैं। Custom web apps 4–10 हफ्ते लेते हैं। हम पहले से milestone plan share करते हैं।` },
    ],
    testimonials: [
      { name: "डॉ. ए. कुमार", role: `अस्पताल निदेशक, ${cityHi}`, quote: `RH Software ने हमारे hospital का पूरा management software बनाया — आज सब कुछ एक dashboard से चलता है।` },
      { name: "प्रिया शर्मा", role: `D2C founder, ${district}`, quote: `हमारा store 9 दिन में launch हुआ। Razorpay, WhatsApp, SEO — सब sorted। ${cityHi} में best team.` },
      { name: "मो. इमरान", role: `Coaching owner, ${cityHi}`, quote: "बहुत professional team. LMS app live हो गया, students भी खुश हैं। बिहार के किसी भी business के लिए recommend करूँगा." },
    ],
    ctaTitle: `${cityHi} की top software team के साथ काम कीजिए`,
    ctaSub: "Free 30-मिनट strategy call. Real engineers. Bihar-rooted, India-grade work.",
  },
});

export const rhCities: RHCity[] = [
  { slug: "patna", name: { en: "Patna", hi: "पटना" }, district: "Patna", lat: 25.5941, lng: 85.1376, copy: make("Patna", "पटना", "Patna", "हम Patna के startups, hospitals, schools और enterprise clients के साथ deeply काम करते हैं।") },
  { slug: "saharsa", name: { en: "Saharsa", hi: "सहरसा" }, district: "Saharsa", lat: 25.8773, lng: 86.5984, copy: make("Saharsa", "सहरसा", "Saharsa", "SIAT campus Saharsa में स्थित है — हम local businesses को सबसे करीब से support करते हैं।") },
  { slug: "madhepura", name: { en: "Madhepura", hi: "मधेपुरा" }, district: "Madhepura", lat: 25.9213, lng: 86.7916, copy: make("Madhepura", "मधेपुरा", "Madhepura", "Madhepura के व्यापारियों, schools और clinics के लिए local-first software builds।") },
  { slug: "purnea", name: { en: "Purnea", hi: "पूर्णिया" }, district: "Purnia", lat: 25.7771, lng: 87.4753, copy: make("Purnea", "पूर्णिया", "Purnia", "Purnea के growing businesses के लिए premium digital solutions।") },
  { slug: "supaul", name: { en: "Supaul", hi: "सुपौल" }, district: "Supaul", lat: 26.1267, lng: 86.6049, copy: make("Supaul", "सुपौल", "Supaul", "Supaul के enterprises और government tenders के लिए reliable engineering team।") },
  { slug: "darbhanga", name: { en: "Darbhanga", hi: "दरभंगा" }, district: "Darbhanga", lat: 26.1542, lng: 85.8918, copy: make("Darbhanga", "दरभंगा", "Darbhanga", "Darbhanga के medical, education और retail sectors के लिए custom software.") },
  { slug: "katihar", name: { en: "Katihar", hi: "कटिहार" }, district: "Katihar", lat: 25.5394, lng: 87.5800, copy: make("Katihar", "कटिहार", "Katihar", "Katihar businesses के लिए local-language friendly websites और apps.") },
  { slug: "bhagalpur", name: { en: "Bhagalpur", hi: "भागलपुर" }, district: "Bhagalpur", lat: 25.2425, lng: 87.0079, copy: make("Bhagalpur", "भागलपुर", "Bhagalpur", "Bhagalpur के silk industry, hospitals और SMEs के लिए premium software.") },
  { slug: "muzaffarpur", name: { en: "Muzaffarpur", hi: "मुज़फ़्फ़रपुर" }, district: "Muzaffarpur", lat: 26.1209, lng: 85.3647, copy: make("Muzaffarpur", "मुज़फ़्फ़रपुर", "Muzaffarpur", "Muzaffarpur के agri-businesses, schools और startups के लिए full-stack engineering.") },
];

export { baseServices };

export const getRhCityBySlug = (slug: string) =>
  rhCities.find((c) => c.slug === slug.toLowerCase());
