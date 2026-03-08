const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SIAT",
  alternateName: ["SIAT Group", "SIAT Training Institute", "RH Software", "SIAT Consultancy"],
  url: "https://www.siat.in",
  logo: "https://www.siat.in/siat-logo.png",
  description: "Bihar's Leading Training Institute, IT Company & Consultancy Organization in Saharsa. Mobile repairing, AC repair, laptop repairing, CCTV installation courses. Website, app & AI development. MBBS admission, B.Tech admission, ISO certification, MSME registration. Government skill training partner.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Road",
    addressLocality: "Saharsa",
    addressRegion: "Bihar",
    postalCode: "852201",
    addressCountry: "IN",
  },
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+91-7004216219", contactType: "customer service", areaServed: "IN", availableLanguage: ["Hindi", "English"] },
    { "@type": "ContactPoint", telephone: "+91-9342470019", contactType: "customer service", areaServed: "IN", availableLanguage: ["Hindi", "English"] },
  ],
  sameAs: [],
  founder: { "@type": "Person", name: "Md Parwez Alam" },
  areaServed: [
    { "@type": "State", name: "Bihar" },
    { "@type": "City", name: "Saharsa" },
  ],
  knowsAbout: [
    "Mobile Repairing Training", "AC Repairing Course", "Laptop Repairing", "CCTV Installation Training",
    "Website Development", "App Development", "Software Development", "AI Development",
    "MBBS Admission Consultancy", "B.Tech Admission", "ISO Certification", "MSME Registration",
    "Government Skill Training", "PMKVY Training Center",
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "SIAT Training Institute",
  url: "https://www.siat.in",
  telephone: "+91-7004216219",
  email: "siat.sws@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Road",
    addressLocality: "Saharsa",
    addressRegion: "Bihar",
    postalCode: "852201",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: "25.88", longitude: "86.56" },
  priceRange: "₹₹",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Training Courses",
    itemListElement: [
      { "@type": "Course", name: "Mobile Repairing Course Bihar", description: "Chip-level mobile repair training with placement support in Saharsa, Bihar" },
      { "@type": "Course", name: "AC Repairing Course Bihar", description: "Split & window AC installation, servicing, gas charging training in Bihar" },
      { "@type": "Course", name: "Laptop Repairing Course Bihar", description: "Hardware & software laptop repair training in Saharsa" },
      { "@type": "Course", name: "CCTV Installation Training Bihar", description: "Complete CCTV setup, DVR/NVR configuration training in Bihar" },
    ],
  },
};

const itCompanySchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "RH Software",
  alternateName: "RH Software Company Bihar",
  url: "https://www.siat.in/rh-software",
  parentOrganization: { "@type": "Organization", name: "SIAT Group" },
  description: "Website development, app development, software development & AI development company in Bihar. Serving businesses across India from Saharsa.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Saharsa",
    addressRegion: "Bihar",
    postalCode: "852201",
    addressCountry: "IN",
  },
  areaServed: { "@type": "Country", name: "India" },
  knowsAbout: ["Website Development", "Mobile App Development", "Software Development", "AI Development", "ERP Solutions", "CRM Development"],
};

const consultancySchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SIAT Consultancy Services",
  url: "https://www.siat.in/consultancy-services",
  description: "Education consultancy for MBBS, B.Tech, BCA, Nursing admissions in Bihar. ISO certification and MSME registration services.",
  areaServed: { "@type": "State", name: "Bihar" },
  knowsAbout: ["MBBS Admission Bihar", "B.Tech Admission Bihar", "ISO Certification Bihar", "MSME Registration", "Best College in Bihar", "Admission After 12th Bihar"],
};

const OrganizationSchema = () => (
  <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itCompanySchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(consultancySchema) }} />
  </>
);

export default OrganizationSchema;
