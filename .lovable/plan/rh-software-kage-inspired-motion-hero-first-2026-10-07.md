# RH Software — Kage-inspired motion, hero first

## Scope and safeguards
- Change only the visual and animation layer of `/rhsoftware/*`.
- Preserve every existing heading, paragraph, logo, price, project, photo, button destination, page, route, SEO setting and form behavior.
- Do not change SIAT pages, certificates, gallery, authentication or Lovable Cloud.
- Keep current RH near-black, pale sage-white and vermilion colors and Onest typography.
- No full Kage iframe, Kyoto text, temple branding or separate demo page. Keep the canonical reference assets unchanged.
- Preview only. Publishing requires separate explicit approval.

## Stage 1 — Homepage hero only, after this plan is approved
Keep the existing RH Software title, supporting text, two buttons and three metrics in their current reading order.

Add a full-bleed, live WebGL background with the existing cinematic gateway composition as its visual reference: restrained depth, textured surfaces and vermilion edge lighting, not random floating shapes. The scene must remain visible behind a readable text scrim.

**Effects:**
- Small, smoothly eased camera movement following the pointer; no cursor replacement or pointer lock.
- A restrained change in perspective as the opening section scrolls out of view.
- Staggered chapter label, title, supporting copy, buttons and metrics entering with slow easing.
- Keep a glimpse of the following section visible rather than forcing an oversized opening screen.

**Review checkpoint:** Show the working homepage hero in preview. Stop here for your feedback; do not animate the remaining sections yet.

## Stage 2 — Homepage sections, only after hero approval
| Existing section | Planned effect |
| --- | --- |
| Trust outcomes | Calm staggered reveal; no automatic marquee or changes to metrics. |
| Services | Chapter-style heading reveal, staggered cards and a subtle pointer-following border highlight. |
| Featured portfolio | Reveal each existing project visual and caption in sequence; slight visual-only parallax without changing previews, text or links. |
| Process | Draw the existing connecting line as the section enters; reveal the six existing steps progressively. |
| Engineering proof | Separate reveals for the heading and existing editor; no fake live output or changes to code text. |
| Founder | Gentle portrait parallax and a slower reveal for the existing message; photo remains non-interactive. |
| Pricing | Stagger existing plans with a quiet border emphasis; prices and features stay identical. |
| Closing call to action and footer | Slow reveal, restrained button response and existing progress styling; destinations unchanged. |

Avoid long pinned sections, scroll hijacking, repeated WebGL canvases and exaggerated tilting.

## Stage 3 — Other RH pages
After the homepage motion is reviewed, reuse the approved effects on Services, Portfolio, Pricing, Blog, Contact and existing service, city, article and case-study pages. Keep their current content and reading order. Use restrained introduction reveals and section transitions; no separate scene engine for every card.

## Mobile, accessibility and speed
- Touch/mobile uses the existing static cinematic background rather than continuous 3D rendering; no cursor effects.
- Reduced-motion preference disables parallax, animated entrances and continuous rendering; all content stays visible.
- WebGL failure or loading keeps a static fallback visible and never blocks navigation or reading.
- Pause rendering when the hero is offscreen or the tab is hidden; limit pixel ratio and scene complexity.
- Keep native scrolling, keyboard focus, clickable buttons and readable contrast.

## Technical approach
- Reference inspected: local `public/landing-pages/kage.html` and its assets. The requested `src/shaders/landing-pages/` and `src/shaders/threeui.css` are absent; the existing ThreeUI package supplies the embedding implementation. No recreation of missing canonical files is needed for the RH motion layer.
- Reimplement the useful scroll/cursor/scene patterns as RH-owned React behavior, not copied iframe content.
- Use existing React 18-compatible React Three Fiber/Three.js for the scene and Motion for text/section transitions.
- Put colors, lighting roles and appearance values in scoped RH tokens. Keep the scene lazy-loaded with a static fallback.
- Before implementation, read the matching 3D scene, geometry/model-sourcing, camera and animation guidance. If recognizable 3D objects are needed, source suitable models rather than primitive stand-ins.

## Checks before each review
Verify the real scene renders, pointer movement affects it, scrolling remains normal, and buttons still navigate correctly. Check desktop, mobile, reduced-motion and fallback states; confirm SIAT pages remain unchanged and check current build/runtime errors. No inquiry will be submitted and nothing will be published.

## Approval requested
Approve **Stage 1 only** now. The remaining stages describe the intended rollout, not permission to implement them before the hero review.
