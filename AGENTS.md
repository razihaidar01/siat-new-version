# AGENTS.md

## Architecture & technical decisions

- All `/rhsoftware` routes render their existing RH content within `RHLayout`; `/rhsoftware/studio` redirects to the homepage. Why: the user rejected a separate Kage demo replacing the business website.
- Use `RHCinematicHero` and scoped RH tokens for the cinematic design across RH pages; detail pages use the shared cinematic introduction treatment. Why: one visual system must cover the whole silo without affecting SIAT.
- Canonical Kage files in `public/landing-pages/` stay unmodified reference assets; only the bundled Onest font sheet is reused by RHLayout. Why: preserve registered sources without showing unrelated Kyoto content.
- RH styles are scoped in `src/styles/rh-theme.css` and imported only by RH pages. Why: keep SIAT main-site styling untouched.
