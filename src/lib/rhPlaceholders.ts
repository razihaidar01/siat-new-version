/**
 * RH Software — centralized placeholder image config.
 *
 * Replace the URLs below with real RH Software assets later
 * (e.g. /rh-placeholders/dashboard-1.webp). Components import
 * by KEY only — no hardcoded URLs across the codebase.
 *
 * Current source: high-quality Unsplash photography (free use).
 * All URLs are normalized at the helper boundary so swapping to
 * local /public assets is a one-line change per key.
 */

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const RH_IMAGES = {
  // ---------- Dashboards / SaaS / Engineering visuals ----------
  dashboardAnalytics: u("photo-1551288049-bebda4e38f71"),
  dashboardSaas:      u("photo-1460925895917-afdab827c52f"),
  dashboardAdmin:     u("photo-1556761175-5973dc0f32e7"),
  dashboardCrm:       u("photo-1551434678-e076c223a692"),
  dashboardLms:       u("photo-1522202176988-66273c2fd55f"),
  dashboardHospital:  u("photo-1576091160550-2173dba999ef"),

  // ---------- Mobile / app previews ----------
  mobileApp1: u("photo-1512941937669-90a1b58e7e9c"),
  mobileApp2: u("photo-1601972602237-8c79241e468b"),
  mobileApp3: u("photo-1607252650355-f7fd0460ccdb"),

  // ---------- Engineering / dev workspace ----------
  devWorkspace1: u("photo-1517694712202-14dd9538aa97"),
  devWorkspace2: u("photo-1555066931-4365d14bab8c"),
  codeEditor:    u("photo-1550063873-ab792950096b"),
  serverRoom:    u("photo-1558494949-ef010cbdcc31"),
  architecture:  u("photo-1581090464777-f3220bbe1b8b"),

  // ---------- Office / consultation / team ----------
  office1:       u("photo-1497366216548-37526070297c"),
  meeting1:      u("photo-1552664730-d307ca884978"),
  consultation:  u("photo-1556761175-b413da4baf72"),
  founderAvatar: u("photo-1560250097-0b93528c311a", 600),

  // ---------- Blog editorial thumbnails ----------
  blogAi:          u("photo-1620712943543-bcc4688e7485"),
  blogMobile:      u("photo-1551650975-87deedd944c3"),
  blogWeb:         u("photo-1547658719-da2b51169166"),
  blogSaas:        u("photo-1531403009284-440f080d1e12"),
  blogPerformance: u("photo-1551288049-bebda4e38f71"),
  blogArchitecture:u("photo-1518770660439-4636190af475"),
  blogDevops:      u("photo-1605379399642-870262d3d051"),
  blogUxSystems:   u("photo-1559028012-481c04fa702d"),

  // ---------- Portfolio (industry-flavored) ----------
  pfHospital:  u("photo-1631815589968-fdb09a223b1e"),
  pfFleet:     u("photo-1486496146582-9ffcd0b2b2b7"),
  pfFintech:   u("photo-1611974789855-9c2a0a7236a3"),
  pfEcommerce: u("photo-1607082348824-0a96f2a4b9da"),
  pfRealEstate:u("photo-1560518883-ce09059eeffa"),
  pfEdTech:    u("photo-1503676260728-1c00da094a0b"),
  pfIot:       u("photo-1518770660439-4636190af475"),
  pfBanking:   u("photo-1601597111158-2fceff292cdc"),
} as const;

export type RHImageKey = keyof typeof RH_IMAGES;

/** Convenience helper for components that want a typed key lookup. */
export const rhImg = (key: RHImageKey) => RH_IMAGES[key];
