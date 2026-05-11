import { RH_IMAGES } from "@/lib/rhPlaceholders";

export type RHProject = {
  slug: string;
  title: string;
  category: string;
  industry: string;
  image: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  accent: string;
  featured?: boolean;
  /** Service category for Service schema */
  serviceType?: string;
};

export const rhProjects: RHProject[] = [
  {
    slug: "medicore-hospital-management-system",
    title: "MediCore HMS",
    category: "SaaS",
    industry: "Healthcare",
    image: RH_IMAGES.dashboardHospital,
    challenge: "A 4-hospital chain managing patient records, billing and pharmacy on disconnected Excel and legacy software — losing hours every day.",
    solution: "Unified hospital management system with role-based modules for OPD, IPD, pharmacy, lab and billing — backed by a real-time analytics dashboard.",
    outcome: "Replaced 6 tools with one platform, reduced admin time by 70% and gave leadership live operational visibility.",
    metrics: [
      { label: "Workflows digitized", value: "15+" },
      { label: "Admin time saved", value: "-70%" },
      { label: "Daily active staff", value: "180+" },
    ],
    stack: ["Next.js", "Postgres", "Redis", "AWS", "Stripe"],
    accent: "from-[#7C3AED] to-[#22D3EE]",
    featured: true,
    serviceType: "Hospital Management Software Development",
  },
  {
    slug: "edunova-lms-platform",
    title: "EduNova LMS",
    category: "EdTech",
    industry: "Education",
    image: RH_IMAGES.dashboardLms,
    challenge: "A regional coaching network needed to scale online classes from 200 to 10,000 concurrent learners without freezing.",
    solution: "Custom LMS with adaptive video streaming, live classes via WebRTC, assessments, and certificate engine — built on a horizontally scalable stack.",
    outcome: "Scaled to 10k+ concurrent learners with zero downtime and unlocked a new B2B revenue line.",
    metrics: [
      { label: "Concurrent learners", value: "10k+" },
      { label: "Uptime", value: "99.99%" },
      { label: "Course completion", value: "+38%" },
    ],
    stack: ["React", "Node.js", "Mux", "Supabase", "WebRTC"],
    accent: "from-[#22D3EE] to-[#10B981]",
    featured: true,
    serviceType: "Learning Management System Development",
  },
  {
    slug: "fleetiq-tracker-iot",
    title: "FleetIQ Tracker",
    category: "IoT",
    industry: "Logistics",
    image: RH_IMAGES.pfFleet,
    challenge: "Trucking operator running a fleet of 80 vehicles with no visibility into routes, idle time or driver behavior.",
    solution: "Real-time GPS + telematics platform with route optimization, driver scoring, geofencing alerts and maintenance schedules.",
    outcome: "Cut fuel costs 22% and improved on-time delivery rate from 78% to 96%.",
    metrics: [
      { label: "Fuel savings", value: "-22%" },
      { label: "On-time deliveries", value: "96%" },
      { label: "Vehicles tracked", value: "80+" },
    ],
    stack: ["Flutter", "Mapbox", "MQTT", "Go", "TimescaleDB"],
    accent: "from-[#F59E0B] to-[#7C3AED]",
    serviceType: "IoT Fleet Tracking Software",
  },
  {
    slug: "banking-ai-assistant",
    title: "Banking AI Assistant",
    category: "AI",
    industry: "Finance",
    image: RH_IMAGES.pfBanking,
    challenge: "Mid-sized NBFC drowning in repetitive customer queries — 70% of agent time spent on balance, EMI, and statement requests.",
    solution: "Conversational AI agent with secure account context, transactional intent routing, and human handoff for complex queries.",
    outcome: "Resolved 64% of queries without human, reduced agent load and improved CSAT scores.",
    metrics: [
      { label: "Queries auto-resolved", value: "64%" },
      { label: "CSAT improvement", value: "+19%" },
      { label: "Agent capacity freed", value: "2.3×" },
    ],
    stack: ["LangChain", "OpenAI", "FastAPI", "Pinecone"],
    accent: "from-[#10B981] to-[#22D3EE]",
    serviceType: "Conversational AI Development",
  },
  {
    slug: "lumora-analytics-saas",
    title: "Lumora Analytics",
    category: "SaaS",
    industry: "Marketing",
    image: RH_IMAGES.dashboardAnalytics,
    challenge: "D2C brands stitching together 5+ tools to understand campaign ROI — none of which talked to each other.",
    solution: "Multi-source analytics platform with ETL pipelines from ad platforms + Shopify, attribution modeling, and weekly auto-insights.",
    outcome: "Customers cut reporting time from 6 hours/week to 15 minutes and surfaced spend leaks worth ₹40L+.",
    metrics: [
      { label: "Reporting time", value: "-95%" },
      { label: "Avg spend recovered", value: "₹4L/mo" },
      { label: "Brands onboarded", value: "60+" },
    ],
    stack: ["Next.js", "Python", "Postgres", "ClickHouse"],
    accent: "from-[#A78BFA] to-[#EC4899]",
    serviceType: "SaaS Analytics Platform Development",
  },
  {
    slug: "kasa-realty-platform",
    title: "Kasa Realty",
    category: "Web",
    industry: "Real Estate",
    image: RH_IMAGES.pfRealEstate,
    challenge: "Real estate firm losing leads to bigger portals — needed credibility, virtual tours and a serious lead engine.",
    solution: "Premium property platform with virtual 360 tours, mortgage calculator, agent matching and a CRM-integrated lead pipeline.",
    outcome: "Inbound leads tripled in 4 months; site converts 3.4× better than the industry benchmark.",
    metrics: [
      { label: "Lead growth", value: "3×" },
      { label: "Conversion rate", value: "4.8%" },
      { label: "Properties listed", value: "1,200+" },
    ],
    stack: ["Next.js", "Prisma", "Postgres", "Mapbox"],
    accent: "from-[#10B981] to-[#7C3AED]",
    serviceType: "Real Estate Web Platform Development",
  },
  {
    slug: "shopswift-mobile-commerce",
    title: "ShopSwift Mobile",
    category: "Mobile",
    industry: "E-Commerce",
    image: RH_IMAGES.mobileApp1,
    challenge: "D2C jewelry brand needed a mobile-first shopping experience with personalized recommendations and instant checkout.",
    solution: "Cross-platform shopping app with AI recommendations, push-led re-engagement, Razorpay one-tap checkout and AR try-on.",
    outcome: "App-driven revenue grew 5× in 6 months and became their highest-margin channel.",
    metrics: [
      { label: "Revenue from app", value: "5×" },
      { label: "Avg session", value: "6m 12s" },
      { label: "Repeat orders", value: "+47%" },
    ],
    stack: ["React Native", "Node.js", "MongoDB", "Razorpay"],
    accent: "from-[#EC4899] to-[#7C3AED]",
    serviceType: "E-commerce Mobile App Development",
  },
  {
    slug: "inventiq-inventory-saas",
    title: "InventIQ",
    category: "SaaS",
    industry: "Retail Ops",
    image: RH_IMAGES.dashboardCrm,
    challenge: "Multi-warehouse retailer constantly overstocking and stocking out — pure guesswork driving purchasing.",
    solution: "Cloud inventory platform with real-time stock sync, demand forecasting, automated reorder points and supplier portal.",
    outcome: "Reduced stockouts by 68%, cut overstock holding 31%, and shortened reorder cycle to under 2 hours.",
    metrics: [
      { label: "Stockouts", value: "-68%" },
      { label: "Overstock", value: "-31%" },
      { label: "Warehouses", value: "12" },
    ],
    stack: ["Vue.js", "Go", "Redis", "AWS"],
    accent: "from-[#22D3EE] to-[#10B981]",
    serviceType: "Inventory Management Software Development",
  },
];

export const getRhProjectBySlug = (slug: string) =>
  rhProjects.find((p) => p.slug === slug);
