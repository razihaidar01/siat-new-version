/**
 * ════════════════════════════════════════════════════════════
 * STEP 5 — useSEO.ts (Custom SEO Hook)
 *
 * File location: src/hooks/useSEO.ts
 *
 * HOW TO USE:
 * Add this to the TOP of any page component:
 *
 *   import { useSEO } from "@/hooks/useSEO";
 *
 *   const RHSoftwarePage = () => {
 *     useSEO({
 *       title: "RH Software – Best Website Developer in Bihar",
 *       description: "Bihar's #1 software company...",
 *       keywords: "best website developer bihar, ...",
 *       canonical: "https://www.siat.in/rhsoftware",
 *       ogImage: "https://www.siat.in/og-image.png",
 *     });
 *     return (...);
 *   };
 * ════════════════════════════════════════════════════════════
 */

import { useEffect } from "react";

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  schema?: object | object[];
  noIndex?: boolean;
  /** language code, e.g. "en-IN" or "hi-IN" */
  locale?: string;
  /** alternate language URLs for hreflang tags */
  hreflang?: { lang: string; url: string }[];
}

const HREFLANG_GROUP_ID = "page-hreflang";

export const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = "https://www.siat.in/og-image.png",
  ogType = "website",
  schema,
  noIndex = false,
  locale = "en-IN",
  hreflang,
}: SEOConfig) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute("content", content);
    };

    setMeta('meta[name="description"]', description);
    if (keywords) setMeta('meta[name="keywords"]', keywords);
    setMeta('meta[name="robots"]', noIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large");

    document.documentElement.setAttribute("lang", locale.split("-")[0]);

    if (canonical) {
      const canonicalEl = document.querySelector('link[rel="canonical"]');
      if (canonicalEl) canonicalEl.setAttribute("href", canonical);
    }

    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:type"]', ogType);
    setMeta('meta[property="og:image"]', ogImage);
    setMeta('meta[property="og:locale"]', locale.replace("-", "_"));
    if (canonical) setMeta('meta[property="og:url"]', canonical);

    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', ogImage);

    document.querySelectorAll(`link[data-group="${HREFLANG_GROUP_ID}"]`).forEach((n) => n.remove());
    if (hreflang?.length) {
      hreflang.forEach(({ lang, url }) => {
        const link = document.createElement("link");
        link.setAttribute("rel", "alternate");
        link.setAttribute("hreflang", lang);
        link.setAttribute("href", url);
        link.setAttribute("data-group", HREFLANG_GROUP_ID);
        document.head.appendChild(link);
      });
      const xDefault = document.createElement("link");
      xDefault.setAttribute("rel", "alternate");
      xDefault.setAttribute("hreflang", "x-default");
      xDefault.setAttribute("href", hreflang[0].url);
      xDefault.setAttribute("data-group", HREFLANG_GROUP_ID);
      document.head.appendChild(xDefault);
    }

    if (schema) {
      const schemaId = "page-schema";
      const existing = document.getElementById(schemaId);
      if (existing) existing.remove();

      const schemas = Array.isArray(schema) ? schema : [schema];
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = schemaId;
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": schemas,
      });
      document.head.appendChild(script);
    }

    return () => {
      const schemaEl = document.getElementById("page-schema");
      if (schemaEl) schemaEl.remove();
      document.querySelectorAll(`link[data-group="${HREFLANG_GROUP_ID}"]`).forEach((n) => n.remove());
    };
  }, [title, description, keywords, canonical, ogImage, ogType, schema, noIndex, locale, hreflang]);
};


/**
 * ════════════════════════════════════════════════════════════
 * USAGE EXAMPLES FOR EACH KEY PAGE
 * ════════════════════════════════════════════════════════════
 *
 * ─── RHSoftwarePage.tsx ───
 *
 * useSEO({
 *   title: "RH Software – Best Website Developer & Software Company in Bihar | SIAT",
 *   description: "RH Software by SIAT is Bihar's #1 software company. Best website developer, app developer & AI developer in Saharsa, Madhepura, Purnia, Supaul & all Bihar. 40+ projects. Free quote!",
 *   keywords: "best website developer saharsa, best software company bihar, app developer madhepura, web designer purnia, RH Software, SIAT",
 *   canonical: "https://www.siat.in/rhsoftware",
 *   schema: {
 *     "@type": "WebPage",
 *     "name": "RH Software – Best Software Company Bihar",
 *     "url": "https://www.siat.in/rhsoftware",
 *   }
 * });
 *
 * ─── RHServicesPage.tsx ───
 *
 * useSEO({
 *   title: "Website Development, App Development, AI Services in Bihar | RH Software SIAT",
 *   description: "Complete IT services in Bihar: Website development, Mobile app development, AI solutions, ERP software, ISO certification. RH Software by SIAT – serving all Bihar districts.",
 *   canonical: "https://www.siat.in/rhsoftware/services",
 * });
 *
 * ─── ISOCertificationPage.tsx ───
 *
 * useSEO({
 *   title: "ISO Certification Bihar | GMP, Trademark, MSME Registration | SIAT",
 *   description: "Get ISO 9001, GMP certification, Trademark registration, Company registration in Bihar. SIAT provides fast, affordable ISO certification across Saharsa, Madhepura, Purnia & all Bihar.",
 *   keywords: "ISO certification bihar, GMP certification bihar, trademark registration bihar, MSME registration, company registration bihar, ISO certification saharsa",
 *   canonical: "https://www.siat.in/consultancy-services/iso-certification-bihar",
 * });
 * ════════════════════════════════════════════════════════════
 */
