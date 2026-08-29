/**
 * Central advanced-SEO layer for the main SIAT site.
 *
 * Every route listed here automatically receives:
 *  - optimized keyword set
 *  - BreadcrumbList JSON-LD
 *  - Service / Course / EducationalOrganization JSON-LD tied to the
 *    sitewide Organization + LocalBusiness entities in index.html
 *
 * SEOHead reads this map by pathname, so pages don't need changes.
 */

export const SIAT_BASE_URL = "https://www.siat.in";
export const SIAT_ORG_ID = `${SIAT_BASE_URL}/#organization`;

export const SIAT_CITIES = [
  "Saharsa", "Madhepura", "Supaul", "Purnia", "Katihar",
  "Darbhanga", "Bhagalpur", "Khagaria", "Araria", "Patna",
];

const areaServed = [
  ...SIAT_CITIES.map((name) => ({ "@type": "City", name })),
  { "@type": "State", name: "Bihar" },
];

const provider = { "@id": SIAT_ORG_ID };

export const siatBreadcrumb = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SIAT_BASE_URL}${it.path}`,
  })),
});

export const siatServiceSchema = (
  name: string,
  description: string,
  path: string,
  serviceType?: string,
) => ({
  "@type": "Service",
  "@id": `${SIAT_BASE_URL}${path}#service`,
  name,
  description,
  serviceType: serviceType || name,
  url: `${SIAT_BASE_URL}${path}`,
  provider,
  areaServed,
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: `${SIAT_BASE_URL}${path}`,
    servicePhone: "+91-7004216219",
    serviceLocation: {
      "@type": "Place",
      name: "SIAT Campus, Saharsa",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Saharsa",
        addressRegion: "Bihar",
        postalCode: "852201",
        addressCountry: "IN",
      },
    },
  },
});

export const siatCourseSchema = (
  name: string,
  description: string,
  path: string,
) => ({
  "@type": "Course",
  "@id": `${SIAT_BASE_URL}${path}#course`,
  name,
  description,
  url: `${SIAT_BASE_URL}${path}`,
  inLanguage: ["hi-IN", "en-IN"],
  provider: {
    "@type": "EducationalOrganization",
    "@id": SIAT_ORG_ID,
    name: "Saharsa Institute of Advance Technology (SIAT)",
    url: SIAT_BASE_URL,
  },
  educationalCredentialAwarded: "SIAT Certificate (ISO 9001:2015 certified institute)",
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: ["Onsite", "Blended"],
    courseWorkload: "P3M",
    location: {
      "@type": "Place",
      name: "SIAT Saharsa",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Saharsa",
        addressRegion: "Bihar",
        addressCountry: "IN",
      },
    },
  },
});

export interface SiatSeoEntry {
  keywords: string;
  schema: object[];
}

type Def = {
  path: string;
  /** breadcrumb trail labels/paths after Home */
  trail: { name: string; path: string }[];
  keywords: string;
  /** primary entity type */
  kind: "service" | "course" | "page";
  name: string;
  description: string;
  serviceType?: string;
};

const HOME = { name: "Home", path: "/" };

const defs: Def[] = [
  /* ── Training silo ───────────────────────────────────────── */
  {
    path: "/training-institute",
    trail: [{ name: "Training Institute", path: "/training-institute" }],
    kind: "service",
    name: "Technical Training Institute in Bihar",
    serviceType: "Vocational and technical skill training",
    description:
      "ISO 9001:2015 certified technical training institute in Saharsa, Bihar offering mobile repairing, AC repairing, laptop repairing, CCTV installation and short-term job-oriented courses with placement support.",
    keywords:
      "technical training institute bihar, computer training institute saharsa, vocational training bihar, skill development course saharsa, job oriented course bihar, ट्रेनिंग इंस्टिट्यूट सहरसा",
  },
  {
    path: "/training-institute/mobile-repairing-course-bihar",
    trail: [
      { name: "Training Institute", path: "/training-institute" },
      { name: "Mobile Repairing Course", path: "/training-institute/mobile-repairing-course-bihar" },
    ],
    kind: "course",
    name: "Mobile Repairing Course in Bihar",
    description:
      "Practical mobile repairing course in Saharsa, Bihar — chip level training, software flashing, tools kit and placement support. Certificate from an ISO 9001:2015 certified institute.",
    keywords:
      "mobile repairing course bihar, mobile repairing course saharsa, chip level mobile repairing training, mobile repairing institute near me, मोबाइल रिपेयरिंग कोर्स सहरसा",
  },
  {
    path: "/training-institute/ac-repairing-course-bihar",
    trail: [
      { name: "Training Institute", path: "/training-institute" },
      { name: "AC Repairing Course", path: "/training-institute/ac-repairing-course-bihar" },
    ],
    kind: "course",
    name: "AC & Refrigeration Repairing Course in Bihar",
    description:
      "AC and refrigeration repairing course in Saharsa, Bihar with hands-on training on split AC, window AC, fridge gas charging and PCB repair, plus job assistance.",
    keywords:
      "ac repairing course bihar, ac mechanic course saharsa, refrigeration and air conditioning course bihar, fridge repairing training, एसी रिपेयरिंग कोर्स बिहार",
  },
  {
    path: "/training-institute/laptop-repairing-course-bihar",
    trail: [
      { name: "Training Institute", path: "/training-institute" },
      { name: "Laptop Repairing Course", path: "/training-institute/laptop-repairing-course-bihar" },
    ],
    kind: "course",
    name: "Laptop & Computer Repairing Course in Bihar",
    description:
      "Laptop and computer hardware repairing course in Saharsa, Bihar — motherboard chip level repair, OS installation, networking basics and placement support.",
    keywords:
      "laptop repairing course bihar, computer hardware course saharsa, chip level laptop repairing training bihar, computer repairing institute saharsa",
  },
  {
    path: "/training-institute/cctv-installation-training-bihar",
    trail: [
      { name: "Training Institute", path: "/training-institute" },
      { name: "CCTV Installation Training", path: "/training-institute/cctv-installation-training-bihar" },
    ],
    kind: "course",
    name: "CCTV Camera Installation Training in Bihar",
    description:
      "CCTV camera installation and DVR/NVR configuration training in Saharsa, Bihar — cabling, remote mobile viewing, biometric and security systems with job support.",
    keywords:
      "cctv installation course bihar, cctv technician training saharsa, dvr nvr configuration course, security camera training bihar, सीसीटीवी कोर्स सहरसा",
  },
  {
    path: "/training-institute/short-term-job-courses-bihar",
    trail: [
      { name: "Training Institute", path: "/training-institute" },
      { name: "Short Term Job Courses", path: "/training-institute/short-term-job-courses-bihar" },
    ],
    kind: "course",
    name: "Short Term Job Oriented Courses in Bihar",
    description:
      "3 to 6 month short-term job oriented courses in Bihar — computer basics, tally, DTP, hardware, repairing trades — designed for fast employment after 10th and 12th.",
    keywords:
      "short term courses bihar, job oriented course after 12th bihar, 3 month computer course saharsa, diploma course bihar, jaldi job wala course",
  },
  {
    path: "/training-institute/technical-training-institute-saharsa",
    trail: [
      { name: "Training Institute", path: "/training-institute" },
      { name: "Technical Training Institute Saharsa", path: "/training-institute/technical-training-institute-saharsa" },
    ],
    kind: "service",
    name: "Technical Training Institute in Saharsa",
    serviceType: "Technical education and skill training",
    description:
      "SIAT is Saharsa's leading technical training institute with modern labs, experienced faculty, government-recognized certification and placement assistance.",
    keywords:
      "technical training institute saharsa, best institute in saharsa, iti training saharsa bihar, skill center saharsa, सहरसा टेक्निकल इंस्टिट्यूट",
  },
  {
    path: "/training-institute/course-fees",
    trail: [
      { name: "Training Institute", path: "/training-institute" },
      { name: "Course Fees", path: "/training-institute/course-fees" },
    ],
    kind: "page",
    name: "SIAT Course Fees & Duration",
    description:
      "Transparent course fees, duration and installment options for all SIAT technical and vocational courses in Saharsa, Bihar.",
    keywords:
      "siat course fees, computer course fees bihar, mobile repairing course fees saharsa, training institute fees bihar, course fees installment",
  },
  {
    path: "/training-institute/placement-support",
    trail: [
      { name: "Training Institute", path: "/training-institute" },
      { name: "Placement Support", path: "/training-institute/placement-support" },
    ],
    kind: "service",
    name: "Placement Support for SIAT Students",
    serviceType: "Placement and career support",
    description:
      "SIAT placement cell support — interview preparation, resume building, employer tie-ups and self-employment guidance for students across Bihar.",
    keywords:
      "placement support bihar, job placement after course saharsa, training with placement bihar, career support siat",
  },
  {
    path: "/training-institute/student-testimonials",
    trail: [
      { name: "Training Institute", path: "/training-institute" },
      { name: "Student Testimonials", path: "/training-institute/student-testimonials" },
    ],
    kind: "page",
    name: "SIAT Student Reviews & Testimonials",
    description:
      "Real student reviews and success stories from SIAT Saharsa — training experience, certification and placement outcomes.",
    keywords:
      "siat reviews, siat saharsa student review, training institute reviews bihar, siat placement success story",
  },

  /* ── Consultancy silo ────────────────────────────────────── */
  {
    path: "/consultancy-services",
    trail: [{ name: "Consultancy Services", path: "/consultancy-services" }],
    kind: "service",
    name: "Education & Business Consultancy in Bihar",
    serviceType: "Education and business consultancy",
    description:
      "SIAT consultancy services in Bihar — college admission guidance, ISO certification, MSME/UDYAM registration, trademark and compliance support for students and businesses.",
    keywords:
      "consultancy services bihar, admission consultant saharsa, iso certification consultant bihar, msme registration consultant, business consultant saharsa",
  },
  {
    path: "/consultancy-services/iso-certification-bihar",
    trail: [
      { name: "Consultancy Services", path: "/consultancy-services" },
      { name: "ISO Certification Bihar", path: "/consultancy-services/iso-certification-bihar" },
    ],
    kind: "service",
    name: "ISO Certification in Bihar",
    serviceType: "ISO 9001 / GMP / HACCP certification consultancy",
    description:
      "Fast and affordable ISO 9001:2015, GMP, HACCP and CE certification consultancy in Bihar — documentation, audit support and certificate delivery for MSMEs across Saharsa, Purnia, Patna and all districts.",
    keywords:
      "iso certification bihar, iso 9001 certification saharsa, gmp certification bihar, haccp certification bihar, iso certificate kaise banaye, iso certification cost bihar",
  },
  {
    path: "/consultancy-services/msme-registration",
    trail: [
      { name: "Consultancy Services", path: "/consultancy-services" },
      { name: "MSME Registration", path: "/consultancy-services/msme-registration" },
    ],
    kind: "service",
    name: "MSME / UDYAM Registration in Bihar",
    serviceType: "MSME UDYAM registration and business compliance",
    description:
      "MSME UDYAM registration in Bihar with GST, trademark, company registration and subsidy guidance — complete online documentation handled by SIAT consultants.",
    keywords:
      "msme registration bihar, udyam registration saharsa, gst registration bihar, trademark registration bihar, company registration saharsa, msme certificate online",
  },
  {
    path: "/consultancy-services/best-college-in-bihar",
    trail: [
      { name: "Consultancy Services", path: "/consultancy-services" },
      { name: "Best College in Bihar", path: "/consultancy-services/best-college-in-bihar" },
    ],
    kind: "service",
    name: "Best College Admission Guidance in Bihar",
    serviceType: "College admission counselling",
    description:
      "Free college admission counselling in Bihar — compare top colleges for B.Tech, BCA, nursing, MBBS and paramedical courses with fees, cutoff and scholarship guidance.",
    keywords:
      "best college in bihar, top college saharsa, college admission consultant bihar, college admission guidance saharsa, bihar college list fees",
  },
  {
    path: "/consultancy-services/mbbs-admission-bihar",
    trail: [
      { name: "Consultancy Services", path: "/consultancy-services" },
      { name: "MBBS Admission Bihar", path: "/consultancy-services/mbbs-admission-bihar" },
    ],
    kind: "service",
    name: "MBBS Admission Guidance in Bihar",
    serviceType: "MBBS admission counselling",
    description:
      "MBBS admission guidance for Bihar students — NEET counselling, government and private medical college options, fees structure and document support.",
    keywords:
      "mbbs admission bihar, neet counselling bihar, medical college admission saharsa, mbbs fees bihar, mbbs admission consultant",
  },
  {
    path: "/consultancy-services/btech-admission-bihar",
    trail: [
      { name: "Consultancy Services", path: "/consultancy-services" },
      { name: "B.Tech Admission Bihar", path: "/consultancy-services/btech-admission-bihar" },
    ],
    kind: "service",
    name: "B.Tech Admission Guidance in Bihar",
    serviceType: "Engineering admission counselling",
    description:
      "B.Tech engineering admission guidance in Bihar — UGEAC/JEE counselling, branch selection, government engineering college fees and student credit card support.",
    keywords:
      "btech admission bihar, engineering college admission saharsa, ugeac counselling bihar, jee counselling bihar, btech fees bihar",
  },
  {
    path: "/consultancy-services/bca-college-bihar",
    trail: [
      { name: "Consultancy Services", path: "/consultancy-services" },
      { name: "BCA College Bihar", path: "/consultancy-services/bca-college-bihar" },
    ],
    kind: "service",
    name: "BCA College Admission in Bihar",
    serviceType: "BCA admission counselling",
    description:
      "BCA college admission guidance in Bihar — eligibility, fees, top colleges and IT career paths after BCA with SIAT counselling support.",
    keywords:
      "bca college bihar, bca admission saharsa, bca fees bihar, best bca college in bihar, computer degree course bihar",
  },
  {
    path: "/consultancy-services/nursing-college-bihar",
    trail: [
      { name: "Consultancy Services", path: "/consultancy-services" },
      { name: "Nursing College Bihar", path: "/consultancy-services/nursing-college-bihar" },
    ],
    kind: "service",
    name: "Nursing College Admission in Bihar",
    serviceType: "Nursing admission counselling",
    description:
      "GNM and B.Sc Nursing admission guidance in Bihar — eligibility, entrance exam, college list, fees and hostel details for students.",
    keywords:
      "nursing college bihar, gnm admission bihar, bsc nursing admission saharsa, nursing college fees bihar, paramedical admission bihar",
  },
  {
    path: "/consultancy-services/admission-after-12th-bihar",
    trail: [
      { name: "Consultancy Services", path: "/consultancy-services" },
      { name: "Admission After 12th", path: "/consultancy-services/admission-after-12th-bihar" },
    ],
    kind: "service",
    name: "Course & Admission Guidance After 12th in Bihar",
    serviceType: "Career and admission counselling after 12th",
    description:
      "Confused after 12th? Get free career counselling in Bihar — degree, diploma, technical and job-oriented course options with fees and scope explained.",
    keywords:
      "admission after 12th bihar, 12th ke baad kya kare, career counselling saharsa, course after 12th science arts commerce bihar",
  },
  {
    path: "/consultancy-services/bihar-student-credit-card-admission",
    trail: [
      { name: "Consultancy Services", path: "/consultancy-services" },
      { name: "Bihar Student Credit Card", path: "/consultancy-services/bihar-student-credit-card-admission" },
    ],
    kind: "service",
    name: "Bihar Student Credit Card Admission Support",
    serviceType: "Bihar Student Credit Card application assistance",
    description:
      "Bihar Student Credit Card Yojana support — eligibility check, document list, application process and college admission using the ₹4 lakh education loan scheme.",
    keywords:
      "bihar student credit card, student credit card yojana bihar, bscc apply online, education loan bihar 4 lakh, student credit card documents",
  },

  /* ── Government projects silo ────────────────────────────── */
  {
    path: "/government-projects",
    trail: [{ name: "Government Projects", path: "/government-projects" }],
    kind: "service",
    name: "Government Skill Development Projects — SIAT",
    serviceType: "Government skill training project delivery",
    description:
      "SIAT delivers government skill development projects in Bihar — PMKVY, Skill India, MSME education tenders and CSR training programs. GeM registered vendor with ISO 9001:2015 certification.",
    keywords:
      "government skill training bihar, pmkvy center bihar, skill india partner bihar, gem registered training vendor, government tender training partner bihar",
  },
  {
    path: "/government-projects/government-skill-training-bihar",
    trail: [
      { name: "Government Projects", path: "/government-projects" },
      { name: "Government Skill Training", path: "/government-projects/government-skill-training-bihar" },
    ],
    kind: "service",
    name: "Government Skill Training in Bihar",
    serviceType: "Government-funded skill training",
    description:
      "Free government skill training programs in Bihar delivered by SIAT — sector courses, government certification, stipend eligibility and placement support.",
    keywords:
      "government skill training bihar, free government course bihar, sarkari training center saharsa, bihar skill development mission training",
  },
  {
    path: "/government-projects/pmkvy-training-center-bihar",
    trail: [
      { name: "Government Projects", path: "/government-projects" },
      { name: "PMKVY Training Center", path: "/government-projects/pmkvy-training-center-bihar" },
    ],
    kind: "service",
    name: "PMKVY Training Center in Bihar",
    serviceType: "PMKVY skill training center",
    description:
      "SIAT is a registered PMKVY training center in Bihar offering free NSDC-certified skill training in IT, healthcare, electronics, retail and more with placement support.",
    keywords:
      "pmkvy training center bihar, pmkvy center saharsa, nsdc certified training bihar, free skill training with certificate bihar, pmkvy course list",
  },
  {
    path: "/government-projects/msme-education-tender",
    trail: [
      { name: "Government Projects", path: "/government-projects" },
      { name: "MSME Education Tender", path: "/government-projects/msme-education-tender" },
    ],
    kind: "service",
    name: "MSME Education & Training Tender Partner",
    serviceType: "MSME education tender participation",
    description:
      "SIAT participates in MSME education and skill training tenders in Bihar with full compliance documentation, infrastructure proof and proven delivery record.",
    keywords:
      "msme education tender bihar, training tender partner bihar, skill training tender participation, gem tender training vendor bihar",
  },
  {
    path: "/government-projects/skill-india-training-partner",
    trail: [
      { name: "Government Projects", path: "/government-projects" },
      { name: "Skill India Training Partner", path: "/government-projects/skill-india-training-partner" },
    ],
    kind: "service",
    name: "Skill India Training Partner in Bihar",
    serviceType: "Skill India Mission training partner",
    description:
      "SIAT is a Skill India Mission training partner in Bihar delivering NSQF-aligned courses with government certification and placement linkage.",
    keywords:
      "skill india training partner bihar, skill india center saharsa, nsqf course bihar, skill india certificate course",
  },
  {
    path: "/government-projects/csr-education-projects",
    trail: [
      { name: "Government Projects", path: "/government-projects" },
      { name: "CSR Education Projects", path: "/government-projects/csr-education-projects" },
    ],
    kind: "service",
    name: "CSR Education & Skilling Projects in Bihar",
    serviceType: "CSR education project implementation",
    description:
      "SIAT implements CSR education and skilling projects in Bihar for corporates and foundations — beneficiary mobilization, training delivery, impact reporting and audits.",
    keywords:
      "csr education project bihar, csr skill development partner bihar, csr implementation agency bihar, corporate skilling partner saharsa",
  },
  {
    path: "/government-projects/capability-statement",
    trail: [
      { name: "Government Projects", path: "/government-projects" },
      { name: "Capability Statement", path: "/government-projects/capability-statement" },
    ],
    kind: "page",
    name: "SIAT Capability Statement",
    description:
      "SIAT capability statement for government and corporate tenders — registrations (GeM, UDYAM, GST, ISO), infrastructure, faculty strength and delivery track record.",
    keywords:
      "siat capability statement, training institute capability statement bihar, gem seller siat, vendor profile skill training bihar",
  },
  {
    path: "/government-projects/empanelment",
    trail: [
      { name: "Government Projects", path: "/government-projects" },
      { name: "Empanelment", path: "/government-projects/empanelment" },
    ],
    kind: "page",
    name: "SIAT Empanelment & Registrations",
    description:
      "SIAT empanelment details and government registrations — GeM Seller ID, UDYAM, GST, ISO 9001:2015 and skill mission affiliations for project partnerships.",
    keywords:
      "siat empanelment, empanelled training partner bihar, gem registered vendor bihar, government empanelment skill training",
  },

  /* ── Authority / trust pages ─────────────────────────────── */
  {
    path: "/certifications",
    trail: [{ name: "Certifications", path: "/certifications" }],
    kind: "page",
    name: "SIAT Certifications & Government Registrations",
    description:
      "SIAT certifications and registrations — ISO 9001:2015, NSDC, Skill India, Bihar Skill Development Mission, GeM Seller ID YD6U260014809187, UDYAM-BR-29-0035052 and GSTN 10AGQPA2133G1Z4.",
    keywords:
      "siat iso certified, siat gst number, siat gem seller id, udyam registration siat, iso 9001 certified institute bihar",
  },
  {
    path: "/about-us",
    trail: [{ name: "About Us", path: "/about-us" }],
    kind: "page",
    name: "About SIAT — Saharsa Institute of Advance Technology",
    description:
      "About SIAT — an ISO 9001:2015 certified training institute, consultancy and IT company in Saharsa, Bihar serving students and businesses across the state.",
    keywords:
      "about siat, saharsa institute of advance technology, siat saharsa bihar, best institute saharsa about",
  },
  {
    path: "/contact-us",
    trail: [{ name: "Contact Us", path: "/contact-us" }],
    kind: "page",
    name: "Contact SIAT Saharsa",
    description:
      "Contact SIAT Saharsa — phone, WhatsApp, email and campus address for course admission, consultancy and IT project enquiries in Bihar.",
    keywords:
      "siat contact number, siat saharsa address, training institute contact saharsa, siat whatsapp number",
  },
  {
    path: "/verify-certificate",
    trail: [{ name: "Verify Certificate", path: "/verify-certificate" }],
    kind: "service",
    name: "SIAT Certificate Verification",
    serviceType: "Online certificate verification",
    description:
      "Verify any SIAT certificate online using certificate number or QR code — instant authenticity check for employers and institutions.",
    keywords:
      "siat certificate verification, verify siat certificate online, certificate number check siat, training certificate verification bihar",
  },
];

const buildEntry = (d: Def): SiatSeoEntry => {
  const schema: object[] = [siatBreadcrumb([HOME, ...d.trail])];
  if (d.kind === "service") {
    schema.push(siatServiceSchema(d.name, d.description, d.path, d.serviceType));
  } else if (d.kind === "course") {
    schema.push(siatCourseSchema(d.name, d.description, d.path));
  } else {
    schema.push({
      "@type": "WebPage",
      "@id": `${SIAT_BASE_URL}${d.path}#webpage`,
      name: d.name,
      description: d.description,
      url: `${SIAT_BASE_URL}${d.path}`,
      isPartOf: { "@id": `${SIAT_BASE_URL}#website` },
      about: { "@id": SIAT_ORG_ID },
      inLanguage: "en-IN",
    });
  }
  return { keywords: d.keywords, schema };
};

export const SIAT_PAGE_SEO: Record<string, SiatSeoEntry> = defs.reduce(
  (acc, d) => {
    acc[d.path] = buildEntry(d);
    return acc;
  },
  {} as Record<string, SiatSeoEntry>,
);

/** Lookup helper — tolerant of trailing slashes. */
export const getSiatPageSeo = (pathname: string): SiatSeoEntry | undefined => {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return SIAT_PAGE_SEO[clean];
};
