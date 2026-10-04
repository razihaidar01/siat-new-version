# AGENTS.md

## Architecture & technical decisions

- `/rhsoftware` homepage is the ThreeUI `<KageLandingPage />` (package `@designcodeio/threeui@1.2.0`) rendered inside `.shader-frame`; use the package's compiled source, never the extracted `src/shaders/*` TSX (they reference package-internal siblings and were deleted). Why: the task required exact registered source, and the package's `lib-dist` build is that exact source.
- Canonical Kage assets live in `public/landing-pages/` (kage.html + secret-pathways-assets/), copied verbatim from the package — do not edit them. Why: their SHA-256 hashes are registered; edits break the verified-source requirement.
- The RH studio homepage (bento hero, services, portfolio, process, founder, pricing) is served at `/rhsoftware/studio` instead of `/rhsoftware`. Why: the Kage experience occupies `/rhsoftware`; SEO content stays accessible for the silo.
- Site navigation on the Kage page is a floating RH pill (`RHKageHomePage.tsx`), not the global `RHLayout` header. Why: the Kage page ships its own fixed navigation; RHLayout would duplicate it.
- RH styles are scoped in `src/styles/rh-theme.css` and imported only by RH pages. Why: keep SIAT main-site styling untouched.
