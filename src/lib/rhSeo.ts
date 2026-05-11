/**
 * Shared SEO schema fragments for the RH Software sub-site.
 * Keeps Organization / WebSite / LocalBusiness JSON-LD consistent
 * across every /rhsoftware/* page.
 */

export const RH_BASE_URL = "https://www.siat.in";
export const RH_OG_IMAGE = `${RH_BASE_URL}/og-image.png`;

export const RH_TARGET_CITIES = [
  "Patna", "Saharsa", "Madhepura", "Purnia", "Supaul",
  "Darbhanga", "Katihar", "Bhagalpur", "Muzaffarpur",
];

/* Organization schema — applied on every RH page */
export const rhOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${RH_BASE_URL}/rhsoftware#organization`,
  name: "RH Software",
  alternateName: ["SIAT", "RH Software by SIAT"],
  url: `${RH_BASE_URL}/rhsoftware`,
  logo: `${RH_BASE_URL}/favicon.png`,
  image: RH_OG_IMAGE,
  description:
    "RH Software by SIAT — Bihar's premier software, web, mobile app and AI development company. Serving Patna, Saharsa, Madhepura, Purnia, Supaul, Darbhanga and all Bihar cities.",
  founder: {
    "@type": "Person",
    name: "Razi Haidar",
    jobTitle: "Founder & CEO",
  },
  sameAs: [
    "https://www.linkedin.com/company/siat-saharsa",
    "https://www.facebook.com/siat.saharsa",
    "https://www.instagram.com/siat.saharsa",
  ],
  areaServed: RH_TARGET_CITIES.map((c) => ({ "@type": "City", name: c })),
};

/* LocalBusiness schema — for local SEO across Bihar */
export const rhLocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${RH_BASE_URL}/rhsoftware#localbusiness`,
  name: "RH Software (by SIAT)",
  image: RH_OG_IMAGE,
  url: `${RH_BASE_URL}/rhsoftware`,
  telephone: "+91-9905880697",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "SIAT Campus, Saharsa",
    addressLocality: "Saharsa",
    addressRegion: "Bihar",
    postalCode: "852201",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 25.8773, longitude: 86.5984 },
  areaServed: RH_TARGET_CITIES,
};

/* WebSite schema with SearchAction */
export const rhWebsiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${RH_BASE_URL}#website`,
  name: "RH Software",
  alternateName: "SIAT",
  url: RH_BASE_URL,
  publisher: { "@id": `${RH_BASE_URL}/rhsoftware#organization` },
};

/* Helper: build a BreadcrumbList */
export const rhBreadcrumb = (
  items: { name: string; url: string }[],
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: it.url,
  })),
});

/* Helper: build Service schema */
export const rhServiceSchema = (
  name: string,
  description: string,
  url: string,
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url,
  provider: { "@id": `${RH_BASE_URL}/rhsoftware#organization` },
  areaServed: RH_TARGET_CITIES.map((c) => ({ "@type": "City", name: c })),
});

/* Helper: FAQ schema */
export const rhFaqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});
