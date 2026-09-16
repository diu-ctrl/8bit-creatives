# 8Bit Creatives — Website & Ops Portal

**Live site:** [8bit-creatives.vercel.app](https://8bit-creatives.vercel.app)

The website, internal operations portal, and partner dashboards for **8Bit Creatives** — India's gaming-native creator agency. Built as a single static site, deployed on Vercel, hardened with a strict Content Security Policy, and structured to scale across public pages, an internal team dashboard, and three external partner dashboards.

---

## What is 8Bit Creatives?

8Bit Creatives is a gaming-first creator agency representing some of India's biggest gaming creators and esports talent. The agency was founded in a Mumbai LAN room in 2018 and has since shipped 300+ campaigns for brands including ASUS, Red Bull, Krafton, Netflix, Realme, Cricbuzz, Vivo, and Amazon. The agency also operates the **8Bit Esports** competitive BGMI roster.

This repository contains everything that powers the public face of the agency (the website) plus the internal tooling the team uses to run operations (the ops portal) and three external dashboards (one each for creators, brands, and platform partners).

---

## Features at a glance

- **9 public pages** — Landing, About, Creator Roster, Case Study Archive, Services, Esports Roster, Full Case Study (Global Chess League S4), Privacy Policy, Contact
- **Internal ops portal** — 9 views for the operations team (dashboard, roster, approvals, campaign pipeline, brief intake, file vault, reports, guide, settings)
- **3 partner dashboards** — separate interfaces for creators, brands, and platform partners (Kick, YouTube, Loco)
- **Security-hardened** — Content Security Policy, HSTS preload, X-Frame-Options, Referrer-Policy, Permissions-Policy, SRI hashes on external scripts, honeypot-protected contact form
- **Mobile-responsive** — every page works from 320px wide up to ultrawide desktop
- **Animated 8BIT letter backgrounds** — a brand signature across the hero and esports sections
- **Custom 404 page** — minimalist black canvas with a giant thin "404"
- **Clean URLs** — no `.html` extensions in production (Vercel `cleanUrls`), with 308 redirects from old long slugs

---

## Tech stack

| Layer | What's used |
|---|---|
| Markup | Hand-written HTML5 — no framework, no JSX, no template engine |
| Styles | Hand-written CSS3 in `styles.css` (one shared file across all pages) plus per-page inline `<style>` blocks for page-specific overrides |
| Interactivity | Vanilla JavaScript in `app.js` and `navbar.js` — no React, no Vue, no build step |
| Animations | [GSAP 3.12.5](https://gsap.com/) + ScrollTrigger from cdnjs (loaded with SRI hashes) |
| Smooth scroll | Lenis (lazy-loaded on capable devices) |
| Physics | Matter.js for the rotating red eclipse with 12 game characters on the landing page |
| 3D | CSS `perspective` + `rotateY` for the creator coverflow carousel |
| Background gradients | Velaris shader (WebGL) for the live gradient on the CTA section and the esports hero |
| Hero game | Canvas 2D for the playable dino runner on the landing page |
| India map | Server-side render of geographic data baked into the About page |
| Typography | [Geist Sans](https://fonts.google.com/specimen/Geist) from Google Fonts (weights 100, 300, 400, 500, 700, 900) |
| Fonts (legacy) | `Fonts/` folder holds original brand font files for offline reference |
| Icons | Inline SVG — no icon library, no external icon font |
| Deployment | Vercel (static site, no serverless functions) |
| Forms | Contact form wired to [Formspree](https://formspree.io) with inline success/error handling |

The site has **no build step**. Every HTML file is hand-edited, every CSS rule is hand-written, and every JS function is hand-crafted. Push to `main` and Vercel ships it.

---

## Project structure

```
8bit-creatives/
├── Public website pages (HTML)
│   ├── index.html                     Landing page — hero, about, creators, case studies, services, esports, founders, CTA
│   ├── about.html                     About page — positioning statement, narrative, principles, India map
│   ├── creators.html                  Creator roster — 12 creators with morphing dialog cards
│   ├── work.html                      Case study archive — 17 case studies with morphing dialogs
│   ├── services.html                  Services page — 9 sections including capabilities hover effect
│   ├── esports.html                   Esports roster — BGMI roster, KPIs, tournament table, iQOO partner
│   ├── gcl-season-4.html             Full case study — Global Chess League S4 (9 sections)
│   ├── privacy-policy.html            Privacy policy — 13 sections, DPDP Act 2023 compliant
│   ├── contact.html                   Contact page — 3-step brief form
│   └── 404.html                       Custom 404 — minimalist black canvas
│
├── Ops portal & partner dashboards
│   ├── ops.html                       Internal ops portal — 9 views for the operations team
│   ├── creator-dashboard.html         Creator's personal dashboard
│   ├── brand-dashboard.html           Brand partner's dashboard
│   └── platform-dashboard.html        Platform partner's dashboard (Kick, YouTube, Loco)
│
├── Styles & scripts
│   ├── styles.css                     Shared stylesheet (all pages)
│   ├── app.js                         Main JavaScript file — animations, observers, interactions
│   └── navbar.js                      Navbar behavior — bg-observer, mobile menu, scroll states
│
├── Configuration
│   ├── vercel.json                    Vercel config — cleanUrls, 308 redirects, 6 security headers
│   ├── robots.txt                     Disallow /ops.html, /favicon/, /images-for-landing-page/
│   ├── sitemap.xml                    9 URLs submitted to search engines
│   ├── .gitignore                     Standard gitignore
│   ├── .vercelignore                  Prevents docs/assets from deploying
│   ├── package.json                   Dev dependencies only (live-server for local preview)
│   └── package-lock.json              Lockfile
│
├── Favicon set
│   └── favicon/                       Full multi-size favicon set (ICO + PNG + manifest)
│
├── Brand & asset folders
│   ├── images-for-landing-page/       All optimized web images (the canonical image folder)
│   ├── Images for Landing Page/        Original/source images (pre-optimization, kept for reference)
│   ├── services-images/                Images specific to the Services page
│   ├── Branding/                       Brand guidelines, logo variants, color tokens
│   ├── highquality logo/               High-resolution source logos
│   ├── Fonts/                          Brand font files for offline reference
│   ├── assets/                         Misc shared assets
│   ├── styles/                         Misc style snippets / overrides
│   └── scripts/                        Helper scripts
│
├── Reference / archive
│   ├── components/ui/                  Shadcn/ui-style component reference (unused in production)
│   ├── lib/                            Utility library reference (unused in production)
│   ├── gsap-skills-main/               GSAP animation skill reference
│   ├── master/                         Master/working copies of ops portal files
│   ├── index-archive.html              Archived older version of the homepage
│   ├── characters.html                 Archived characters page
│   ├── dino.html                       Standalone dino game (development reference)
│   ├── esports-section.html            Standalone esports section (development reference)
│   ├── gradient.html                   Standalone gradient demo
│   ├── grass.html                      Standalone grass shader demo
│   ├── map-about.html                  Standalone India map (development reference)
│   └── minecraft-hang.html             Standalone Minecraft hang minigame reference
│
├── Documentation
│   ├── 8Bit_Insider_Cps_Portal.docx    Ops portal internal documentation
│   ├── 8Bit_Lead_Capture_Form_Strategy.md   Lead capture form strategy notes
│   ├── esports-strategy.md             Esports section content strategy
│   ├── privacy-policy-strategy.md      Privacy policy content strategy
│   └── services-strategy.md            Services page content strategy
│
├── Root-level images
│   ├── logo.png                        Square logo (legacy)
│   ├── logo_2.png                     Square logo (current)
│   └── esports_preview.png            Esports section preview image
```

---

## Public website pages

### Landing page — `index.html`

The homepage. Nine sections in order:

1. **Hero** — "The People Behind the Screentime" headline, a playable dino runner game, animated 8BIT letter background, and the 8Bit logo
2. **About** — rotating red half-eclipse featuring 12 game characters, plus a brand marquee strip (300+ campaigns shipped for ASUS, Red Bull, Krafton, Netflix, etc.)
3. **Creators** — 3D coverflow carousel showing Mortal, Payal, Snax, Jokerkihaveli, and more
4. **Case Studies** — two-column layout (list + hover-to-show image)
5. **Services** — three cards (For Brands / For Creators / For Platforms)
6. **Esports** — black card with animated 8BIT background, team description, View Roster + See KIE Report + Instagram buttons
7. **Founders** — three founder cards (Thug, Goldy, Beg4Mercy)
8. **CTA** — live gradient background with "Start Campaign" button
9. **Footer** — 8Bit logo block, S8UL block, navigation, address, enquiry email, Instagram + LinkedIn social icons

### About page — `about.html`

- Hero: "We are India's first gaming-native talent agency"
- Narrative text about 8Bit's founding in 2018
- Three principles: **Seasoned professionals**, **Dedicated to your success**, **Tech-driven strategies**
- Embedded India map ("Built in India, watched everywhere") showing Delhi NCR and Guwahati markers
- Black-to-white smooth gradient transition throughout
- Back-to-top button

### Creator roster — `creators.html`

A searchable, filterable archive of 12 8Bit creators:

> **Mortal · Payal · Snax · Jokerkihaveli · Soul Goblin · Mamba · Viper · Pahadi · Thug · Goldy · Beg4Mercy · Regaltos**

Each creator card shows handle, real name, role, category tags, subscriber counts, and Instagram + YouTube social icons. A filter bar with category tags (BGMI, Variety, GTA V RP, etc.) and a search bar. Clicking a card smoothly expands it into a detailed creator view.

### Case study archive — `work.html`

A searchable, filterable archive of 17 case studies. Filter by category (Brand campaigns, Broadcast & production, Platform migration, Tournament). Each card has a thumbnail that expands into a detailed case study with challenge, approach, execution, metrics, and a "View Case Study" button linking to the full case study page.

### Services page — `services.html`

Nine sections: hero with positioning statement → positioning paragraph → services breakdown (3 numbered blocks: For Brands / For Creators / For Platforms) → The Approach (3 steps: Brief, Build, Measure) → Selected Work (3 case study cards) → Capabilities (6 items in a 2-column list) → Brands logo strip → CTA → Footer.

### Esports roster — `esports.html`

The competitive BGMI roster page:

1. Hero with "8Bit Esports" title, subtitle, meta row (Game, Region, Founded, Roster), team portrait — live gradient background
2. KPI ribbon (Tournaments played, Total finishes, Best placement, Prize money)
3. Roster grid — 5 player cards (Juicy, Sarangg, Skipz, Shubh, Shorty) with avatars, handles, real names, roles, and Instagram + YouTube icons
4. Mentoring & support staff (Mercy as Mentor, ROCKY BTC as Analyst)
5. Tournament history table (6 tournaments with Position Points, Finish Points, Overall Points, Tournament Position)
6. Partners (iQOO)
7. Animated 8BIT letter background in the white body area

### Full case study — `gcl-season-4.html`

A complete case study with 9 sections: hero (project name, client, service, year, tier) → Brief → Challenge → Approach (3 pillars: talent-first commentary, real-time telemetry, social-first distribution) → Solution with editorial blocks, pull-quotes, and stat callouts → Deliverables list (8 items) → Outcomes (12M+ reach, 9 days, 6 angles, 54 hours, 45+ clips) → Testimonial → Credits. Plus a chapter index that stays visible while scrolling and a Next Project link.

### Privacy policy — `privacy-policy.html`

A dark-mode, text-heavy privacy policy page with 13 numbered sections covering: about 8Bit and the policy, information collected, how data is used, legal basis (DPDP Act 2023), cookies, sharing, international transfers, data retention, user rights, security measures, children's data, changes to the policy, and contact/grievance officer.

### Contact page — `contact.html`

A conversational 3-step brief form for brands to submit campaign requirements. Fields: brand name, campaign title, category, timeline, desired creators, deliverable formats, Google Drive link. Submissions are wired to Formspree and land in the team inbox with inline success/error handling (no page redirect), honeypot protection, and debounce protection.

### 404 page — `404.html`

Minimalist black canvas with a giant thin "404". Returns HTTP 404 status (not 200) so search engines correctly classify missing pages.

---

## Ops portal & partner dashboards

### Ops portal — `ops.html`

An internal dashboard for the 8Bit Creatives operations team. Uses the same dark-mode design language as the public website. Has 9 views:

1. **Dashboard** — stats row (active campaigns, available creators, pending approvals, deliverables due) + Kanban board (Briefing → In production → Pending approval → Delivered)
2. **Roster** — creator grid with avatar, handle, real name, status, subscriber count. "+ Add creator" form. Click a creator to see campaigns, deliverables count, payment status, contract, and performance
3. **Approvals** — 3-column Kanban (internal review, brand approval, approved)
4. **Campaign Pipeline** — full Kanban (Brief intake → In production → Pending approval → Delivered → Live & reporting). Click a card to see the campaign's brief, timeline, creators, deliverables checklist (with status: Not Started / In Progress / In Review / Delivered), SOW, next steps, and communication log
5. **Brief Intake** — form (brand name, campaign title, category, timeline, desired creators, deliverable formats, objective, Google Drive link)
6. **File Vault** — deliverable storage table linked to Google Drive
7. **Reports** — post-campaign metrics and performance reports
8. **Guide** — plain-English documentation page (12 accordion sections explaining every feature)
9. **Settings & Permissions** — account configuration and access management

### Creator dashboard — `creator-dashboard.html`

A creator's personal dashboard. Sections: stats row (active campaigns, deliverables due, payments pending, total views), my active campaigns, my deliverables checklist, my payments (per-campaign status), my contract, my performance metrics. Sidebar: My Dashboard, My Campaigns, My Deliverables, My Payments, My Contract, Guide.

### Brand dashboard — `brand-dashboard.html`

A brand partner's dashboard. Sections: stats row (active campaigns, deliverables delivered, total reach, campaign ROI), my campaigns with performance metrics, deliverables status (progress bars), assigned creators, budget tracking (spent vs allocated), campaign performance per campaign. Sidebar: My Dashboard, My Campaigns, My Deliverables, My Creators, My Reports, Guide.

### Platform dashboard — `platform-dashboard.html`

A platform partner's dashboard (Kick, YouTube, etc.). Sections: stats row (creators migrated, total watch hours, subscriber growth, active content), talent migration status, content performance per creator, growth metrics (subscriber/viewer growth), contract status. Sidebar: My Dashboard, Talent Migration, Content Performance, Growth Metrics, My Contract, Guide.

---

## Google Drive integration

A shared Google Drive folder structure for asset collection and management. Folders:

- `01_Brand_Campaigns/` — per brand → per campaign → Briefs, Creative Assets, Deliverables, SOW Contracts, Reports
- `02_Creator_Assets/` — per creator → Profile Photos, Channel Art, Reels, Long Form
- `03_Templates/` — SOW, Contract, Brief, Report templates
- `04_Finance/` — Invoices, Payments, Budgets
- `05_Internal/` — Meeting Notes, Strategy Docs, Team Handbook
- `06_Platform_Partnerships/` — Kick, YouTube, Loco
- `07_Archive/` — Completed Campaigns

---

## Security hardening

This site ships with a strict security posture configured in `vercel.json`:

| Header | Value |
|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` (2-year HSTS with preload list eligibility) |
| `Content-Security-Policy` | Restrictive — blocks mixed content, limits script sources to self + cdnjs + GA, blocks iframe embedding from other origins, limits form submissions to self + Formspree |
| `X-Content-Type-Options` | `nosniff` — prevents MIME-sniffing attacks |
| `X-Frame-Options` | `SAMEORIGIN` — clickjacking protection |
| `Referrer-Policy` | `strict-origin-when-cross-origin` — limits referrer leakage |
| `Permissions-Policy` | Locks down camera, microphone, geolocation, payments, USB, magnetometer, gyroscope, accelerometer, interest-cohort |
| `Cross-Origin-Opener-Policy` | `same-origin` — process-isolation |
| `Cross-Origin-Resource-Policy` | `same-origin` — cross-origin resource protection |

Additional protections:

- **SRI hashes** on every external CDN script (GSAP, ScrollTrigger) so a compromised CDN can't inject malicious JS
- **Honeypot field** on the contact form — bots fill it in, humans don't; submissions from bots are silently dropped
- **Debounce** on the contact form submit button — 2-second cooldown prevents double-click spam
- **Custom 404 returns HTTP 404 status** — not 200 — so search engines and analytics correctly classify missing pages
- **308 permanent redirects** from old long slugs (`/case-study-global-chess-league` → `/gcl-season-4`, `/esports-inside` → `/esports`) so SEO backlinks keep working
- **`robots.txt`** hides `/ops.html` (the admin portal), `/favicon/`, and `/images-for-landing-page/` from search engine indexing
- **`sitemap.xml`** lists 9 canonical URLs for search engines

---

## Performance

- **No framework runtime** — vanilla HTML/CSS/JS means zero KB of framework shipped to the browser
- **IntersectionObserver** pauses animations when sections scroll off-screen
- **Passive scroll listeners** prevent scroll-jank
- **`content-visibility: auto`** on long sections skips rendering off-screen content
- **`will-change` hints** on animated elements let the browser optimize compositing
- **`requestAnimationFrame` throttling** for the dino game and the 8BIT letter background
- **Lazy-loaded images** with `loading="lazy"` on non-critical assets
- **Google Fonts preconnect** with `crossorigin="anonymous"` for parallel font fetching
- **Vercel edge network** — global CDN with HTTP/2 and Brotli compression

---

## Browser support

Tested and working on:

- Chrome 110+ (desktop + Android)
- Firefox 110+ (desktop)
- Safari 16+ (macOS + iOS)
- Edge 110+ (desktop)

Not officially supported: Internet Explorer (any version), Safari 15 and below, Chrome on Android below 100.

---

## Local development

This is a static site — no build step, no Node.js server, no environment variables needed.

### Prerequisites

- Any modern browser (Chrome recommended for devtools)
- Optional: [Node.js](https://nodejs.org) 18+ if you want to use the local dev server

### Run locally

```bash
# Clone the repo
git clone https://github.com/diu-ctrl/8bit-creatives.git
cd 8bit-creatives

# Option 1: open index.html directly in a browser
# (just double-click the file)

# Option 2: use a local dev server (recommended — relative paths work properly)
npx serve .
# or
npx live-server
```

Open `http://localhost:3000` (or whatever port the dev server reports) in your browser.

### Edit cycle

1. Open any `.html` file, `styles.css`, or `app.js` in your editor
2. Save changes
3. Refresh the browser — no rebuild needed

### Local form testing

The contact form posts to a Formspree endpoint. To test the form locally without spamming the production endpoint, change the `action` attribute on the `<form>` element in `contact.html` to a Formspree test endpoint (or a [Webhook.site](https://webhook.site) URL) — just remember to revert before committing.

---

## Deployment

The site is deployed on **Vercel** as a static site. Every push to `main` triggers an automatic redeploy.

### How to deploy your own copy

1. Fork this repo
2. Go to [vercel.com/new](https://vercel.com/new) and import the fork
3. Vercel auto-detects "Other" as the framework (correct — there's no framework)
4. Set the output directory to `./` (project root)
5. Click Deploy — you're live in ~30 seconds
6. Optional: add your custom domain in Vercel project settings

The `vercel.json` file in the repo root handles:

- `cleanUrls: true` — serves `about.html` as `/about` (no `.html` extension in the URL)
- `trailingSlash: false` — canonical URLs without trailing slashes
- `redirects` — 308 permanent redirects from old long slugs to the new short ones
- `headers` — all 6 security headers applied to every route

---

## Strategy & documentation files

The repository contains four strategy markdown files that document the content and UX decisions behind major sections:

| File | What it covers |
|---|---|
| `8Bit_Lead_Capture_Form_Strategy.md` | The 3-step brief form structure, field choices, conversion rationale |
| `esports-strategy.md` | The esports roster page — section order, KPI choices, tournament table design |
| `privacy-policy-strategy.md` | The 13-section privacy policy structure, DPDP Act 2023 compliance mapping |
| `services-strategy.md` | The 9-section services page — positioning, deliverable tags, capabilities list |

Plus one internal document:

| File | What it covers |
|---|---|
| `8Bit_Insider_Cps_Portal.docx` | Internal ops portal documentation — every view, every workflow, every access level |

---

## Credits

- **Design & development:** 8Bit Creatives internal team
- **Founders:** Animesh "Thug" Agarwal · Lokesh "Goldy" Jain · Mrinmoy "Beg4Mercy" Lahkar
- **Esports roster:** Juicy · Sarangg · Skipz · Shubh · Shorty · Mercy (mentor) · ROCKY BTC (analyst)
- **Creators represented:** Mortal · Payal · Snax · Jokerkihaveli · Soul Goblin · Mamba · Viper · Pahadi · Thug · Goldy · Beg4Mercy · Regaltos
- **Brand partners:** ASUS · Red Bull · Krafton · Netflix · Realme · Cricbuzz · Vivo · Amazon · iQOO · Tech Mahindra (Global Chess League S4)
- **Typography:** Geist Sans (Google Fonts)
- **Animations:** GSAP (GreenSock)
- **Hosting:** Vercel
- **Forms:** Formspree

---

## Contact

- **Website:** [8bit-creatives.vercel.app](https://8bit-creatives.vercel.app)
- **Start a campaign:** [8bit-creatives.vercel.app/contact](https://8bit-creatives.vercel.app/contact)
- **GitHub:** [github.com/diu-ctrl/8bit-creatives](https://github.com/diu-ctrl/8bit-creatives)
- **Instagram:** [@8bit_creatives](https://www.instagram.com/8bit_creatives)
- **LinkedIn:** [8bit-creatives](https://in.linkedin.com/company/8bit-creatives)

For private briefs, partnership inquiries, or talent representation, use the [contact form](https://8bit-creatives.vercel.app/contact) — submissions land directly in the team inbox.

---

## License

© 2026 8Bit Creatives. All rights reserved.

This repository and its contents are the proprietary property of 8Bit Creatives. The code, design system, brand assets, copy, and structure are shared here for reference and collaborative development with authorized contributors. No part of this repository may be copied, reproduced, republished, or used to create derivative works without explicit written permission from 8Bit Creatives.

The 8Bit name, 8Bit logo, 8Bit Esports name, and all creator likenesses referenced in this repository are the property of their respective owners. Use of any creator name, handle, or likeness requires separate permission from the individual creator.

---

## Repository metadata

- **Owner:** [@diu-ctrl](https://github.com/diu-ctrl)
- **Production branch:** `main`
- **Live deployment:** auto-triggered on every push to `main`
- **Vercel project:** [8bit-creatives](https://vercel.com/divyaraj-s-projects/8bit-creatives)
- **Page count:** 9 public pages + 1 ops portal + 3 partner dashboards + 1 custom 404 = 14 HTML pages in production
- **Last updated:** September 2026

---

*Built in seven days, by one person. Every page, every animation, every interaction — designed and deployed end-to-end. In 90 hours over 7 days.*
