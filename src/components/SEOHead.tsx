import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  type?: string;
  noIndex?: boolean;
}

const BASE_URL = "https://www.siat.in";

const SEOHead = ({
  title,
  description,
  canonical,
  ogImage = "/og-image.png",
  type = "website",
  noIndex = false,
}: SEOHeadProps) => {
  const { pathname } = useLocation();
  const fullCanonical = canonical || `${BASE_URL}${pathname}`;
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;
  const fullTitle = title.includes("SIAT") ? title : `${title} | SIAT`;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Helper to set/create meta tags
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
    if (noIndex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else {
      setMeta("name", "robots", "index, follow");
    }

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", fullCanonical);
    setMeta("property", "og:image", fullOgImage);
    setMeta("property", "og:site_name", "SIAT");

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", fullOgImage);

    // Canonical link
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", fullCanonical);

    // Scroll GA pageview
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", "G-V3QTW8QZN5", { page_path: pathname });
    }
  }, [fullTitle, description, fullCanonical, fullOgImage, type, noIndex, pathname]);

  return null;
};

export default SEOHead;
