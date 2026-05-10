/**
 * Blog post data module — stub.
 * Real authored posts are managed via RHBlogPage placeholders.
 * This module exposes the minimum API required by RHBlogPostPage.
 */

export interface BlogPostSection {
  heading: string;
  body: string;
}

export interface BlogPostFAQ {
  q: string;
  a: string;
}

export interface BlogPost {
  faqs?: BlogPostFAQ[];
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  category: string;
  categorySlug?: string;
  date: string;
  dateISO?: string;
  readTime: string;
  author: string;
  authorRole?: string;
  excerpt: string;
  grad?: string;
  tags?: string[];
  relatedCities?: string[];
  content?: {
    intro: string;
    sections: BlogPostSection[];
    faqs?: BlogPostFAQ[];
    conclusion?: string;
    cta?: string;
  };
}

export const blogPosts: BlogPost[] = [];

export const blogCategories: { name: string; slug: string }[] = [
  { name: "AI", slug: "ai" },
  { name: "Web Development", slug: "web-development" },
  { name: "Mobile", slug: "mobile" },
  { name: "Engineering", slug: "engineering" },
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);

export const getRelatedPosts = (slug: string, limit = 3): BlogPost[] =>
  blogPosts.filter((p) => p.slug !== slug).slice(0, limit);

export const getPostsByCategory = (categorySlug: string): BlogPost[] =>
  blogPosts.filter((p) => p.categorySlug === categorySlug);
