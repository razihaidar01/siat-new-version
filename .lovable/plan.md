# RH Software — Premium Studio Redesign (Phase 1 First) + Future Scoped Video Manager

This is a large two-phase effort on a **live production site**.

For now, the ONLY priority is transforming RH Software into a premium international-level engineering studio experience.

All changes must remain strictly scoped to:  
`/rhsoftware/*`

SIAT main site, public gallery, staff portal, auth system, payment/credit-card flows, and all non-RH routes must remain untouched.

The redesign should feel:

- handcrafted
- cinematic
- premium
- technically believable
- startup-grade
- globally competitive

The final result must impress:

1. founders/business owners
2. senior developers/designers

The website should immediately communicate:

> “These developers build serious production-grade software.”

---

# IMPORTANT EXECUTION ORDER

We are NOT starting the RH video manager yet.

The redesign comes FIRST.

Execution order:

1. Part A → RH Premium Redesign (Highest Priority)
2. Part B → RH Scoped Video Manager (Later Phase)

Do NOT begin Part B until the redesign is approved.

---

# Part A — RH Software Premium Redesign (ONLY `/rhsoftware/*`)

## Main Goal

Transform RH Software from:

- a modern-looking agency site

into:

- a high-end product engineering studio website.

The site must NOT feel:

- AI generated
- template based
- crypto styled
- gaming styled
- overly futuristic
- cluttered

Avoid:

- excessive neon
- floating random shapes
- overloaded glassmorphism
- noisy gradients
- crowded 3D scenes

Everything must feel:

- intentional
- art directed
- restrained
- elegant
- performance-conscious

---

# Design System (Scoped)

Create a new:  
`src/styles/rh-theme.css`

Imported ONLY inside RH layout/components.

DO NOT leak styles into SIAT pages.

### RH Design Tokens

Backgrounds:

- `#07070A`
- `#0D0D12`
- `#111118`

Accent Colors:

- Violet → `#7C3AED`
- Cyan → `#22D3EE`
- Emerald → `#10B981`

Text:

- `#FFFFFF`
- `#B4B4C7`
- `#7A7A92`

Typography:

- Inter / General Sans for body
- Clash Display / Satoshi for headings

Motion:

- smooth cubic-bezier easing
- subtle premium animations
- respect `prefers-reduced-motion`

---

# Layout / Navigation

Rebuild `RHLayout`.

Navbar must feel:

- premium
- minimal
- sticky
- blurred
- elegant

Navigation:

- Home
- Services
- Portfolio
- Process
- About
- Contact

IMPORTANT:  
The current:  
“SIAT Home” + “Home”  
creates brand confusion.

Fix this by:

- making RH navigation primary
- converting SIAT return button into a small secondary chip button

Add:

- magnetic CTA interactions
- subtle hover glow
- smooth transitions

---

# Homepage (`RHSoftwarePage.tsx`) — Full Premium Rebuild

This is the MOST IMPORTANT part.

Current issue:  
The existing hero feels overcrowded with overlapping 3D objects.

Completely REMOVE the current heavy 3D hero.

Do NOT keep it behind a toggle.

Replace it with:

- a premium Bento-style composition
- cleaner layout
- more whitespace
- realistic product visuals
- believable SaaS/product engineering feel

NO fake floating shapes.

NO random futuristic objects.

---

# Homepage Sections

## 1. Hero (Bento Composition)

LEFT:

- powerful headline
- concise subheading
- 2 CTA buttons

RIGHT:

- realistic dashboard UI
- analytics cards
- mobile app preview
- engineering/code panels
- product mockups

Use:

- subtle aurora lighting
- soft cinematic gradients
- restrained depth

The hero should feel inspired by:

- Linear
- Vercel
- Stripe
- Framer

But still unique.

---

## 2. Trust Strip

Replace generic avatars with:

- measurable outcomes
- real metrics
- partner/tech logos

Examples:

- “Reduced manual operations by 70%”
- “Scaled platforms to 10k+ users”
- “Improved workflow speed by 3x”

Keep it clean and restrained.

---

## 3. Services Bento

Create elegant bento cards for:

- Web Development
- App Development
- AI Development
- SaaS Engineering
- Automation Systems
- UI/UX Systems

Each card should include:

- minimal iconography
- outcome-focused copy
- subtle hover interactions

Avoid generic AI-agency card designs.

---

## 4. Featured Portfolio

This section must become the strongest trust-builder.

IMPORTANT:  
Do NOT use simple gradient cards with icons.

Each project card must include:

- real UI preview
- device mockups
- product screenshots
- tech stack pills
- category labels
- measurable outcomes

Examples:

- “Digitized 15+ operational workflows”
- “Built scalable video-learning infrastructure”

Portfolio should feel:

- Dribbble quality
- Behance quality
- real SaaS products

Use:

- subtle parallax
- scroll reveal
- premium hover depth

---

## 5. Process Timeline

Create a premium process flow:

1. Discovery
2. Strategy
3. Design
4. Development
5. Launch
6. Scale

Use:

- cinematic transitions
- elegant timeline visuals
- scroll interactions

---

## 6. Engineering Proof

Add a lightweight engineering credibility section.

Include:

- syntax-highlighted code block
- faux terminal
- API response card
- deployment/infrastructure visuals

Purpose:  
prove real engineering capability.

This section should feel:

- authentic
- technical
- elite developer quality

NOT gimmicky.

---

## 7. Founder Note

Add a premium founder section.

Include:

- professional portrait
- short founder message
- calm confident tone

Example direction:  
“I founded RH Software to bring world-class engineering standards to businesses that need more than just a basic website.”

This section should build:

- trust
- authenticity
- human connection

---

## 8. Pricing Teaser

Create:

- 3 premium pricing cards
- Enterprise highlighted

Enterprise tier should feel:

- high-end
- scalable
- architecture-focused

Add:

- “Book Consultation”
- “Dedicated Engineering Team”
- “Custom Software Architecture”

---

## 9. CTA Footer Band

Strong premium closing section:  
“Book a Strategy Call”

Minimal but impactful.

---

# Other RH Pages (Light Premium Re-skin)

Apply the same design system to:

- RHServicesPage
- RHPortfolioPage
- RHPricingPage
- RHContactPage
- RHBlogPage

Goals:

- cleaner hierarchy
- calmer surfaces
- better spacing
- improved typography
- reduced visual noise
- better mobile UX

Do NOT overcomplicate these pages.

---

# Performance Requirements

CRITICAL:  
The site must remain extremely optimized.

Requirements:

- 90+ Lighthouse score
- optimized images
- WebP assets
- lazy loading
- responsive everywhere
- smooth animations
- no laggy heavy effects

Mobile experience must feel:

- custom designed
- premium
- native-like

NOT desktop squeezed into mobile.

---

# Part B — RH Scoped Video Manager (LATER PHASE)

DO NOT start this yet.

This will happen only AFTER redesign approval.

Future scope:

- dedicated RH-only video manager
- `category='rh-software'`
- RH showreel section
- ffmpeg compression pipeline
- admin upload flow

But this is NOT the current priority.

---

# Things You MUST NOT Touch

- SIAT homepage
- public gallery
- staff portal
- auth system
- RLS
- DB schema
- edge functions
- payment/credit-card flows
- non-RH styling

Everything must remain isolated to RH routes only.

---

# FINAL CREATIVE DIRECTION

The final website should feel like:

- a premium product engineering studio
- not a freelancer portfolio
- not a flashy template
- not an AI-generated landing page

Clients should feel:

> “These developers can build scalable production systems.”

Developers should feel:

> “This was designed with real product taste and engineering maturity.”