import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  type?: string;
  noIndex?: boolean;
  keywords?: string;
  schema?: object | object[];
}

const BASE_URL = "https://www.siat.in";

const SEOHead = ({
  title,
  description,
  canonical,
  ogImage = "/og-image.png",
  type = "website",
  noIndex = false,
  keywords,
  schema,
}: SEOHeadProps) => {
  const { pathname } = useLocation();
  const fullCanonical = canonical || `${BASE_URL}${pathname}`;
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;

  // ✅ FIX 1: Clean title — no ugly "Saharsa Institute of Advance Technology" suffix
  // Just use the title as-is (all page titles already include "SIAT" or "RH Software")
  const fullTitle = title;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Standard meta
    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);
    setMeta(
      "name",
      "robots",
      noIndex
        ? "noindex, nofollow"
        : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", fullCanonical);
    setMeta("property", "og:image", fullOgImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:locale", "en_IN");

    // ✅ FIX 2: og:site_name = "SIAT (RH Software)" — this is what Google shows
    setMeta("property", "og:site_name", "SIAT (RH Software)");

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", fullOgImage);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", fullCanonical);

    // ✅ FIX 3: Schema / JSON-LD injection (was completely missing before)
    if (schema) {
      const schemaId = "seohead-schema";
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

    // GA pageview
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", "G-V3QTW8QZN5", { page_path: pathname });
    }

    return () => {
      const s = document.getElementById("seohead-schema");
      if (s) s.remove();
    };
  }, [fullTitle, description, keywords, fullCanonical, fullOgImage, type, noIndex, schema, pathname]);

  return null;
};

export default SEOHead;
