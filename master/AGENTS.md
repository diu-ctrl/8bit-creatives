# AGENTS.md — 8Bit Creatives Landing Page (Rebuild v2)

> **CRITICAL: This is a FRESH BUILD, not an improvement of the existing index.html.**
> The previous attempt produced a poor result because Antigravity was improvising on top of the existing file. THIS TIME, on Phase 0, you MUST delete (or fully overwrite) any existing index.html, styles.css, app.js at the project root and start from a blank file. Treat every section as if no code exists yet. Do NOT reference, import, or extend any pre-existing styles, classes, or scripts.
>
> **Speed and precision**: There is NO time bound. Be SLOW. Be PRECISE. One section at a time, with 4 rounds of verification per section (see Phase 2). If a section takes 30 minutes to perfect, that is correct. If you finish the whole page in 5 minutes, you did it wrong — go back and do it properly.

---

## 🧠 MODEL STRATEGY (swap models between phases for best results)

Different LLMs excel at different tasks. Use Antigravity's `/model <name> <prompt>` command to swap mid-session.

### Recommended primary model (default for whole build):
**`Claude Sonnet 4.5`** (or whichever Sonnet-class model is available in your Antigravity install).
- Best balance of visual reasoning + clean code + instruction following
- Use this as your default for Phase 1 (blueprint) and Phase 2 (section building)

### Model swap schedule:

| Phase / Task | Recommended model | Why |
|--------------|-------------------|-----|
| Phase 1 — Visual blueprinting from Figma screenshot | **Claude Sonnet 4.5** or **Gemini 2.5 Pro** | Strongest at visual-to-semantic mapping |
| Phase 2 — Hero canvas particle system (complex JS) | **Claude Sonnet 4.5** | Best at writing correct, bug-free JS on first try |
| Phase 2 — About section red eclipse + rotation math | **Claude Sonnet 4.5** | Best at CSS transforms, keyframes, geometry |
| Phase 2 — Founders section (rounded-square images, hover scale) | **Claude Sonnet 4.5** | Reliable on precise CSS shape specs |
| Phase 2 — Footer perspective-tilt logo JS | **Claude Sonnet 4.5** | Best at small JS interactions |
| Debugging any GSAP/timeline/transform errors | `/model Claude Opus 4.1 debug this section: <paste>` | Opus is the strongest reasoner for tricky bugs |
| Final responsive QA pass | **Claude Sonnet 4.5** | Reliable at viewport testing logic |

**How to swap mid-session**: type `/model claude-sonnet-4.5 <your next prompt>` or `/model gemini-2.5-pro <your next prompt>`. The conversation history is preserved — only the model changes.

**Default to Sonnet 4.5 for everything unless you hit a wall. Then `/model claude-opus-4.1` for that single debugging prompt, then switch back.**

---

## 🛠️ SYSTEM CONFIGURATION & STACK

- **Framework**: Single-file vanilla HTML5 + CSS3 + JavaScript. No React, no Tailwind, no Vue, no build step. `index.html` + `styles.css` + `app.js` — double-click to run.
- **Font (STRICT)**: **Geist ONLY.** Loaded from Google Fonts CDN. The ONLY acceptable font-family declarations are:
  ```css
  font-family: 'Geist', sans-serif;       /* for everything readable */
  font-family: 'Geist Mono', monospace;   /* only for tiny mono captions, stat numbers */
  ```
  **Forbidden fonts**: Inter, Helvetica, Arial, system-ui, Impact, Roboto, Poppins, Montserrat, Space Grotesk, JetBrains Mono (use Geist Mono instead). If you are tempted to write `font-family: -apple-system, BlinkMacSystemFont...` — DON'T. Write `'Geist', sans-serif`.
  **Required Geist weights** (load all of these): 100 (Thin), 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold), 900 (Black).
- **Color Palette (STRICT — 6 hexes only)**:
  | Token | Hex | Use |
  |------|-----|-----|
  | `--white` | `#FFFFFF` | Light section backgrounds, text on dark |
  | `--orange-light` | `#FFB658` | Gradient stops, soft highlights |
  | `--orange-mid` | `#FF9041` | Gradient mid-tones |
  | `--orange-red` | `#FF5931` | Primary accent — buttons, links, hover text, active states |
  | `--red-deep` | `#B21C01` | Deep gradient ends, eclipse dark core, CTA section deep red |
  | `--black` | `#000000` | Dark section backgrounds, text on white |
  **Rule**: Every solid color, gradient stop, blur tint, shadow color, border color, and overlay color on the page must be one of these 6 hexes — OR a `rgba()`/`hsla()` of one of these hexes. The ONLY exceptions: the hero canvas particle dispersal color (`#FF4D00`, per the user's pasted code), the photography/portrait images, the logo PNG itself, and case-study campaign images. EVERYWHERE ELSE: palette only. No `#e63946`. No `#c1121f`. No `#f5f5f5`. No `#888`. No `#ccc`. If you need a gray, use `rgba(0,0,0,0.5)` or `rgba(255,255,255,0.5)`.
- **Image folder**: `/images-for-landing-page/` at the project root. File naming: `<section>-<purpose>.png` (e.g., `hero-bg.png`, `logo_2.png`, `about-character-1.png`, `creator-mortal.png`, `founder-thug.png`, `case-study-chess.png`, `footer-logo.png`). If a referenced file does NOT exist, render a branded placeholder div (palette gradient + Geist label showing the filename) — NEVER show a broken-image icon, NEVER silently use the wrong file.
- **Spacing**: Container max-width `1280px`, side padding `48px` desktop / `20px` mobile. Section vertical padding `96px` desktop / `64px` mobile.
- **Border radius discipline**:
  - Buttons (primary CTAs): pill `999px` (fully rounded ends)
  - Cards: `20px` rounded square (NOT pill, NOT sharp)
  - Founder portrait images: `16px` rounded square (squircle) — NOT circle, NOT sharp. **Aspect ratio 1:1.**
  - Creator portrait images: `16px` rounded corners, **aspect ratio 4:5** (NOT square)
  - Curved section transitions (Founders top, CTA bottom): `48px` on the curved edges only
- **Glassmorphism recipe** (use this exact recipe everywhere glassmorphism is specified — do not invent your own):
  ```css
  background: rgba(255, 255, 255, 0.08);   /* on dark sections */
  background: rgba(255, 255, 255, 0.7);    /* on light sections (rare) */
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);  /* on dark */
  border: 1px solid rgba(0, 0, 0, 0.06);          /* on light */
  ```
  **Critical**: include `-webkit-backdrop-filter` ALWAYS (Safari support). Apply glassmorphism to `<div>` elements, not directly to `<img>` elements.
- **Smooth scroll**: `html { scroll-behavior: smooth; }` + `section { scroll-margin-top: 80px; }`.

---

## 🔄 EXECUTION PROTOCOL (follow sequentially — no skipping)

### Phase 0 — Fresh Start (CRITICAL — do this FIRST)

1. Delete or overwrite `index.html`, `styles.css`, `app.js` at the project root. Start with empty files.
2. Confirm the Figma reference image (`Landing Page.png`) is attached to the conversation. You WILL compare against it 4 times per section.
3. Confirm the image folder exists at `C:\Users\levol\Desktop\8bit\Images for Landing Page\` (or `/images-for-landing-page/` relative to project root — they are the same folder).
4. **State out loud** (in your response): "Phase 0 complete. Existing files cleared. Building from scratch."

### Phase 1 — Visual Blueprinting & Component Breakdown

1. Read the attached Figma screenshot `Landing Page.png` **completely** before writing any code. Re-examine it for every section.
2. Output a text-based **Component Blueprint** for each of the 9 sections (Navbar, Hero, About, Creators, Case Studies, Services, Founders, CTA, Footer). For each:
   - Layout grid (columns, alignment, max-width)
   - Background color + any gradient + any curve transition
   - Every text element with exact wording (quoted) + Geist weight (Thin 100 / Light 300 / Regular 400 / Medium 500 / Bold 700 / Black 900)
   - Every image asset with its filename
   - Every interaction
3. **Do not write any HTML/CSS/JS in Phase 1.** Only the blueprint. Wait for full blueprint completion before Phase 2.

### Phase 2 — Section-by-Section Build (4 verification rounds per section)

Build in this exact order: Navbar → Hero → About → Creators → Case Studies → Services → Founders → CTA → Footer.

For EACH section, run this loop:

**Round 1 — DRAFT**: Generate the section's HTML + CSS + JS from scratch. Match the Figma reference exactly.

**Round 2 — SELF-CHECK (compile + palette + font audit)**:
- Verify HTML parses (no unclosed tags)
- Verify CSS loads with no syntax errors
- Verify JS executes with no console errors
- Verify EVERY `color`, `background`, `border`, `box-shadow`, `filter` value is one of the 6 palette hexes (or rgba of them) — no out-of-palette colors
- Verify EVERY `font-family` is `'Geist'` or `'Geist Mono'` — no other fonts
- If any check fails: STOP, fix it, re-check. Do not proceed to Round 3.

**Round 3 — REFERENCE COMPARISON (the most important round)**:
- Open the Figma screenshot `Landing Page.png` and look ONLY at this section
- Compare your rendered section side-by-side with the reference
- Check these specific things (per section, see the per-section specs below for what to verify):
  - Layout shape (full circle vs half? circle vs rounded square? 4:5 vs 1:1? vertical rectangle vs square?)
  - Position (where on the page? top-left? centered? absolute positioned?)
  - Colors (does the red eclipse match the ref's red? does the gradient match?)
  - Font weight (thin? regular? bold? black?)
  - Spacing (is there enough breathing room? does it match the ref's negative space?)
  - Interactions (does hover do what the ref implies?)
- If your section does NOT match the reference: STOP, list the differences out loud, fix them, re-compare. **Do not proceed to Round 4 until the section visually matches the reference.**

**Round 4 — CROSS-SECTION CONSISTENCY CHECK**:
- Verify this section's font stack matches the previous sections
- Verify this section's color usage matches the global palette
- Verify this section's button styles match the global button system
- Verify this section's spacing rhythm matches the global spacing scale
- If any inconsistency: fix it. Then proceed to the next section.

**Only after all 4 rounds pass for one section, move to the next.** This is slow. This is correct.

### Phase 3 — Global Responsive & Polish

1. Test at 1440px (desktop), 768px (tablet), 375px (mobile)
2. All grids collapse correctly. Hero stacks. Creators become horizontal scroll. Services stack vertically. Footer columns stack.
3. Consolidate duplicate animations. Verify all `requestAnimationFrame` loops (canvas, marquee, eclipse rotation) pause when off-screen via IntersectionObserver.
4. Final color audit: open the rendered page, inspect every computed color — confirm only the 6 palette hexes are used (exception: `#FF4D00` in canvas).

### Phase 4 — Final QA Checklist (17 items — do not skip)

- [ ] Geist font loaded (ONLY font on the page — verify in DevTools → Network → Fonts)
- [ ] Only 6 palette colors used (exception: `#FF4D00` in canvas, photography, logo PNG)
- [ ] All 9 sections render correctly on desktop, tablet, mobile
- [ ] Navbar is glassmorphism (NOT solid), transparent over the hero, with 8bit logo left + nav links center + Start Campaign button right (red pill)
- [ ] Hero bg image is blurred + has inner shadow + vignette INSIDE the image (blur does NOT bleed outside image bounds)
- [ ] Hero canvas particle logo initializes from `logo_2.png` and reacts to mouse hover
- [ ] Hero buttons are solid red-orange `#FF5931` pills, white text, Geist Medium 500
- [ ] About marquee scrolls seamlessly, brand names + clockwise-rotating icon on the extreme left
- [ ] About red eclipse is a HALF ellipse/circle (NOT full circle) — see spec below
- [ ] About characters sit ON the eclipse edge, NOT in the red core, NOT floating randomly
- [ ] About 3 curve lines are concentric, blurred, thin white, rotate WITH the eclipse
- [ ] About eclipse uses the correct red gradient (NOT solid red, NOT pink, NOT maroon — see spec)
- [ ] Stats numbers are 50+ / 100M+ / 3B+ / 300+ with correct captions, displayed as in ref (NOT scattered, NOT misaligned)
- [ ] Creators section: 5 cards, center normal + sides perspective-tilted, 4:5 rounded-corner images, social numbers tappable → red on tap + open external link
- [ ] Case studies: list on left (Global Chess League S4 first), image on right, hover swaps image with 150ms fade
- [ ] Services: 3 vertical rectangle cards (NOT 3:4, NOT square) — aspect ratio 9:16 or 2:3, taller than wide. Hover reveals a gradient background (orange-light → orange-red gradient). Slide-up + glassmorphism button reveal.
- [ ] Founders: 3 red glassmorphism cards. Founder portraits are ROUNDED SQUARES (1:1, 16px radius), NOT circles. Hover scales image + frame slightly larger.
- [ ] CTA section is correct (black-to-red gradient, curved-bottom, glassmorphism button)
- [ ] Footer: 8bit logo is LARGE and centered, perspective-tilts on hover. Foreground gradient overlay applied (radial glow). White-orange gradient bg. "Made with ❤️ by Divyaraj Chauhan" links to https://divyarajchauhan.in. 8BITCreatives wordmark at the bottom with Black 900 + Thin 100 weight mix.
- [ ] All clickable items show visible hover states, but `href="#"` (no actual subpage routing yet)
- [ ] Lighthouse: performance ≥ 85, accessibility ≥ 90, best practices ≥ 90, SEO ≥ 90

---

## ⚠️ ANTI-FAILURE RULES (lessons from the previous failed build)

### Rule 1 — FRESH BUILD, not improvement
The previous attempt failed because Antigravity was improvising on top of the existing index.html. **This time, on Phase 0, delete or overwrite any existing index.html, styles.css, app.js.** Treat every section as if no code exists. Do NOT reuse classes, do NOT extend styles, do NOT "fix" the previous file. Build from a blank file.

### Rule 2 — Geist ONLY. The end.
If you write `font-family: -apple-system` or `font-family: Inter` or anything other than `'Geist'` or `'Geist Mono'`, you have failed. The previous build used Impact and Helvetica — that was wrong. This build uses Geist at every weight (100 Thin, 300 Light, 400 Regular, 500 Medium, 700 Bold, 900 Black). Load all 6 weights from Google Fonts.

### Rule 3 — Palette ONLY.
The previous build used random colors (`#e63946`, `#c1121f`, random grays). That was wrong. This build uses ONLY these 6 hexes: `#FFFFFF`, `#FFB658`, `#FF9041`, `#FF5931`, `#B21C01`, `#000000` — plus `rgba()` of these hexes for translucency. The canvas particle color `#FF4D00` is the ONLY exception, and only inside the canvas.

### Rule 4 — Half eclipse, NOT full circle
The previous build made the About section's red eclipse a full circle with random characters floating around it. The reference image and the user's instruction specify a **HALF ellipse/circle** — the top half of the circle is visible, the bottom half is below the section's bottom edge (cut off). It is positioned at the TOP of the About section, behind the text. Characters sit on the visible arc of the half circle, NOT scattered around a full circle. **This is critical — re-examine the reference image before building this section.**

### Rule 5 — Rounded square founder photos, NOT circles
The previous build made founder portraits circular. The reference image shows them as **ROUNDED SQUARES (squircles)** with `border-radius: 16px` and `aspect-ratio: 1/1`. On hover, the image + frame scale UP slightly (e.g., `transform: scale(1.05)` + a slightly larger frame border). NOT circular. NOT 3:4.

### Rule 6 — Vertical rectangle services cards, NOT 3:4, NOT square
The previous build made services cards 3:4 or square. The reference image shows them as **VERTICAL RECTANGLES** — taller than wide, roughly 9:16 or 2:3 aspect ratio (e.g., `min-height: 480px` with `aspect-ratio: 9/16` or natural width / tall height). On hover, the card background fills with an **orange-light → orange-red gradient** (`linear-gradient(180deg, #FFB658, #FF5931)` or similar — match the ref). The previous build had NO gradient on hover — that was wrong.

### Rule 7 — Hero bg blur stays INSIDE the image
The previous build let the blur bleed outside the image bounds. The user explicitly said: "keep our clear borders only the blur effect should be applied in the image and not outside the border." Apply `filter: blur(8px)` to the `<img>` element directly, AND set `overflow: hidden` on the image's wrapper div. The wrapper's borders stay sharp; the image inside is blurred.

### Rule 8 — Buttons are solid red-orange pills, NOT default HTML buttons
The previous build used default unstyled HTML buttons. The user said: "keep the buttons solid and as same in colours." All primary CTAs ("Start Campaign", "Explore Creators", "Start a Campaign") are:
```css
background: #FF5931;
color: #FFFFFF;
font-family: 'Geist', sans-serif;
font-weight: 500;
font-size: 14px;
padding: 16px 32px;
border-radius: 999px;  /* pill */
border: none;
cursor: pointer;
transition: background-color 150ms ease;
/* hover */
:hover { background: #B21C01; }
```
NEVER use the default browser button style. NEVER use `border: 1px solid gray`. NEVER use sharp corners on CTAs.

### Rule 9 — 8Bit logo hover interaction MUST work
The previous build's hero canvas particle interaction did not work. The hero canvas must:
1. Initialize from `/images-for-landing-page/logo_2.png`
2. Read the image's pixels and create a particle for each non-transparent pixel
3. On mouse hover over the canvas, particles disperse away from the cursor (within `HOVER_RADIUS = 80px`)
4. Dispersed particles turn `#FF4D00` (the canvas orange)
5. When the cursor leaves, particles spring back to their original positions
6. Animation loop pauses when canvas is off-screen (IntersectionObserver)
7. Canvas has `pointer-events: auto` so it can track mouse; the rest of the hero has `pointer-events: auto` too (do NOT block other interactions)

### Rule 10 — Footer logo is LARGE and has perspective-tilt on hover
The previous build made the footer logo tiny and applied no tilt effect. The user explicitly said: "8bit logo in the top middle, it has perspective or tilting effect which reacts on our hover, if we hover on it then it tilts accordingly." The footer logo must be LARGE (e.g., `font-size: 48px` if text, or `height: 80px` if image). On mouse move over the logo, it tilts in 3D following the cursor (rotateX, rotateY up to ±20deg). See the JS snippet in the Footer spec below.

### Rule 11 — Footer foreground gradient MUST be applied
The previous build did not apply the footer's foreground gradient. The user said: "this section has one gradient image in the foreground and white-orange(up-down) gradient in the bg." The footer has TWO gradient layers:
1. Background (up-down): `linear-gradient(180deg, #FFFFFF 0%, #FFB658 100%)` — white at top, orange-light at bottom.
2. Foreground overlay: a radial glow from the bottom center — `radial-gradient(ellipse at 50% 100%, rgba(255, 89, 49, 0.35) 0%, transparent 70%)` — applied as a pseudo-element or absolutely-positioned div on top of the bg, BEHIND the footer content. If you have a PNG for it (`/images-for-landing-page/footer-foreground-overlay.png`), use that. If not, use the CSS radial gradient above.

### Rule 12 — Founders section is called "Founders", NOT "Backbones"
The H2 says "Founders". Period.

### Rule 13 — All buttons route to `#` for now
No subpages yet. All buttons (`View All`, `Show All`, `Know More`, `Read More`, `Explore Creators`, `Start Campaign`, `About Us`, `Apply for Representation`, etc.) have `href="#"` and visible hover states.

### Rule 14 — Don't guess image filenames
The user has provided images in `C:\Users\levol\Desktop\8bit\Images for Landing Page\` with descriptive filenames. Use those exact filenames. If a file is missing, render a branded placeholder div (palette gradient + Geist Mono label showing the intended filename) — NEVER silently use a different file, NEVER use Unsplash URLs, NEVER use external images.

### Rule 15 — Geist weight usage map (follow this exactly)
| Element | Geist weight |
|--------|--------------|
| Hero H1 headline ("The People Behind the Screentime") | 700 (Bold) |
| Hero subtitle | 400 (Regular) |
| Section H2 headings ("Creators", "Case Studies", "Our Services", "Founders") | 700 (Bold) |
| Card titles (founder names, service titles, case study titles) | 700 (Bold) |
| Card body / descriptions | 300 (Light) or 400 (Regular) — match the ref |
| Founder "Known as" alias (e.g., "8Bit Thug") | 400 (Regular), orange-red color |
| Buttons (all CTAs) | 500 (Medium) |
| Nav links | 400 (Regular) or 500 (Medium) |
| Stats numbers (50+, 100M+, 3B+, 300+) | 900 (Black), Geist Mono |
| Stats captions | 400 (Regular) |
| Stats descriptions (single-line) | 300 (Light) |
| Marquee brand names | 500 (Medium), uppercase |
| Footer "8BITCreatives" wordmark | "8BIT" = 900 (Black), "Creatives" = 100 (Thin) |
| Footer links | 500 (Medium) |
| Footer address / copyright | 300 (Light) or 400 (Regular) |
| Eyebrow labels / mono captions | 400 Geist Mono |

### Rule 16 — Don't over-rotate the eclipse
Eclipse rotation: `animation-duration: 60s` minimum. Slow. Meditative. Same for the 3 curve rings (rotate WITH the eclipse, same speed, same direction — anti-clockwise). Marquee: `30s linear infinite`. Footer logo tilt: mouse-driven, not auto-rotating.

### Rule 17 — Be slow. Be precise.
The previous build was fast and wrong. This build must be slow and right. Spend the time. Re-examine the reference. Verify 4 rounds per section. If something feels off, fix it before moving on.

---

## 📐 SECTION-BY-SECTION BUILD SPECIFICATION

### Section 0 — Global Setup (`<head>` + base CSS)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#000000">
  <title>8Bit Creatives — The Gaming Creator Agency</title>
  <meta name="description" content="8Bit Creatives manages the creators, campaigns and live moments that move India's gaming audience.">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100;300;400;500;700;900&family=Geist+Mono:wght@400;500;700&display=swap" rel="stylesheet">

  <link rel="icon" type="image/png" href="/images-for-landing-page/favicon.png">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- 9 sections -->
  <script src="app.js"></script>
</body>
</html>
```

CSS `:root` tokens:
```css
:root {
  --white: #FFFFFF;
  --orange-light: #FFB658;
  --orange-mid: #FF9041;
  --orange-red: #FF5931;
  --red-deep: #B21C01;
  --black: #000000;
  --canvas-orange: #FF4D00; /* particle canvas only */

  --font: 'Geist', sans-serif;
  --font-mono: 'Geist Mono', monospace;

  --container: 1280px;
  --gutter: 48px;
  --section-pad: 96px;

  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --t-fast: 150ms;
  --t-base: 250ms;
  --t-slow: 400ms;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: var(--font); background: var(--white); color: var(--black); overflow-x: hidden; }
section { scroll-margin-top: 80px; padding: var(--section-pad) 0; }
.container { max-width: var(--container); margin: 0 auto; padding: 0 var(--gutter); }

/* Global button recipe — use this for ALL primary CTAs */
.btn-primary {
  display: inline-block;
  background: var(--orange-red);
  color: var(--white);
  font-family: var(--font);
  font-weight: 500;
  font-size: 14px;
  padding: 16px 32px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: background-color var(--t-fast) var(--ease);
}
.btn-primary:hover { background: var(--red-deep); }

/* Global glassmorphism recipe */
.glass-dark {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.glass-light {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(0, 0, 0, 0.06);
}
```

### Section 1 — Navbar (Glassmorphism, fixed top)

- **Position**: `position: fixed; top: 0; left: 0; right: 0; z-index: 100;`
- **Background**: Glassmorphism (use `.glass-dark` recipe). Plus `border-bottom: 1px solid rgba(255, 255, 255, 0.12)`. The navbar is TRANSPARENT over the hero — you can see the blurred hero bg through it. NOT solid. NOT white.
- **Layout**: flex row, height `72px`, padding `0 48px` (or use `.container`).
  - **Left**: 8BIT wordmark logo — text-based mark in Geist Black 900, 24px, white. Optionally a small pixel-square icon in `#FF5931` before the text. If you have a logo PNG (`/images-for-landing-page/navbar-logo.png`), use it at `height: 32px`.
  - **Center**: nav links — `Home | About | Creators | Work | Services | Founders | Contact` separated by thin pipes (`|`) in `rgba(255,255,255,0.3)`. Link text in Geist Regular 400, 14px, color `rgba(255,255,255,0.85)`. Hover: link color → `#FF5931`, 150ms ease.
  - **Right**: "Start Campaign" button — use `.btn-primary` recipe (solid `#FF5931`, white text, pill).
- **Mobile (<768px)**: hamburger icon replaces center links. Tapping opens a glassmorphism dropdown panel below with links stacked vertically.
- **Ref comparison check (Round 3)**: navbar must look TRANSPARENT with blur, NOT solid black, NOT solid white. Buttons must be solid red-orange pills, NOT default HTML buttons.

### Section 2 — Hero

- **Background**: `#FFFFFF` section bg, with the hero image as a full-bleed background.
- **Hero image**: `<div class="hero-bg-wrap" style="overflow: hidden; position: absolute; inset: 0;"><img src="/images-for-landing-page/hero-bg.png" style="width: 100%; height: 100%; object-fit: cover; filter: blur(8px); box-shadow: inset 0 0 200px 80px rgba(0,0,0,0.6);"></div>` — the wrapper has `overflow: hidden` to clip the blur inside, the image inside is blurred with an inner shadow + vignette.
- **Layout**: two-column grid (60/40 desktop, stacks on mobile). Vertical padding `120px top, 120px bottom`. Content sits above the bg image (`position: relative; z-index: 2`).
- **Left column** (60%):
  - **8Bit logo** (small, top-left of the column): if you have a logo PNG, use it. Otherwise text "8BIT" in Geist Black 900, 28px, white.
  - **Headline**: `"The People Behind the Screentime"` — Geist Bold 700, `clamp(40px, 6vw, 80px)`, white, line-height `1.05`, letter-spacing `-0.03em`. The word "Screentime" can be `#FF5931` (orange-red) for emphasis.
  - **Subtitle**: `"8Bit Creatives manages the creators, campaigns and live moments that move India's gaming audience."` — Geist Regular 400, 18px, `rgba(255,255,255,0.75)`, max-width `480px`, margin-top `24px`, line-height `1.6`.
  - **Buttons** (flex row, gap `16px`, margin-top `40px`):
    - "Start Campaign" — `.btn-primary` recipe.
    - "Explore Creators" — same `.btn-primary` recipe (solid `#FF5931`, white text, pill). The user explicitly said "keep the buttons solid and as same in colours."
- **Right column** (40%):
  - **Top-right button**: "Start Campaign" — `.btn-primary` recipe, positioned `position: absolute; top: 100px; right: 48px;` (or top of the right column flex).
  - **Interactive 8bit logo canvas** (center of the right column): use the user's pasted canvas code verbatim with these adjustments:
    1. Initialize from `/images-for-landing-page/logo_2.png`
    2. Pause animation when canvas is off-screen (IntersectionObserver)
    3. Container is `1:1` aspect ratio, max `500px` wide, centered.
    ```html
    <div class="canvas-container" style="aspect-ratio: 1/1; width: 100%; max-width: 500px; margin: 0 auto;">
      <canvas id="heroCanvas" style="width: 100%; height: 100%;"></canvas>
    </div>
    ```
    ```javascript
    // In app.js — initialize after DOMContentLoaded
    function initHeroCanvas() {
      const canvas = document.getElementById('heroCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      const PARTICLE_SIZE = 4;
      const HOVER_RADIUS = 80;
      const BRAND_ORANGE = '#FF4D00';
      let particlesArray = [];
      let mouse = { x: null, y: null, radius: HOVER_RADIUS };
      let animationId = null;

      window.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.x - rect.left;
        mouse.y = event.y - rect.top;
      });

      class Particle {
        constructor(x, y, color) {
          this.x = x + (Math.random() - 0.5) * 10;
          this.y = y + (Math.random() - 0.5) * 10;
          this.originX = x;
          this.originY = y;
          this.baseColor = color;
          this.color = color;
          this.density = (Math.random() * 30) + 1;
        }
        update() {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let force = (mouse.radius - distance) / mouse.radius;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;
            this.x -= directionX;
            this.y -= directionY;
            this.color = BRAND_ORANGE;
          } else {
            this.color = this.baseColor;
            if (this.x !== this.originX) { let dx = this.x - this.originX; this.x -= dx / 10; }
            if (this.y !== this.originY) { let dy = this.y - this.originY; this.y -= dy / 10; }
          }
        }
        draw() {
          ctx.fillStyle = this.color;
          ctx.fillRect(this.x, this.y, PARTICLE_SIZE, PARTICLE_SIZE);
        }
      }

      function initMosaic(imageSource) {
        const image = new Image();
        image.src = imageSource;
        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          for (let y = 0; y < canvas.height; y += PARTICLE_SIZE) {
            for (let x = 0; x < canvas.width; x += PARTICLE_SIZE) {
              let index = (y * canvas.width + x) * 4;
              let alpha = pixels[index + 3];
              if (alpha > 128) {
                let r = pixels[index], g = pixels[index + 1], b = pixels[index + 2];
                let color = `rgb(${r},${g},${b})`;
                particlesArray.push(new Particle(x, y, color));
              }
            }
          }
          animate();
        };
        image.onerror = () => {
          // Branded placeholder if logo_2.png is missing
          const container = canvas.parentElement;
          container.innerHTML = '<div style="width:100%;aspect-ratio:1/1;background:linear-gradient(135deg,#FF5931,#B21C01);display:flex;align-items:center;justify-content:center;font-family:Geist,sans-serif;font-weight:900;color:#FFFFFF;font-size:48px;">8BIT</div>';
        };
      }

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update();
          particlesArray[i].draw();
        }
        animationId = requestAnimationFrame(animate);
      }

      function stopAnimation() {
        if (animationId) { cancelAnimationFrame(animationId); animationId = null; }
      }

      const canvasObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animationId) animate();
          if (!entry.isIntersecting && animationId) stopAnimation();
        });
      }, { threshold: 0.05 });
      canvasObserver.observe(canvas);

      initMosaic('/images-for-landing-page/logo_2.png');
    }
    ```
- **Ref comparison check (Round 3)**: blur stays INSIDE the image bounds (no bleed). Buttons are solid red-orange pills. Canvas is centered and reacts to mouse. Font is Geist.

### Section 3 — About (white → black → white)

The About section has THREE sub-blocks stacked vertically: top (white marquee), middle (black with HALF-eclipse red), bottom (white stats). The pattern is white-black-white.

#### 3a — Marquee (top, white background)
- **Background**: `#FFFFFF`.
- **Layout**: full-width strip, vertical padding `32px 0`.
- **Content**: horizontally scrolling marquee of brand names + a leading icon. Brand names: Samsung, iQOO, Red Bull, Monster Energy, OnePlus, Krafton, Mamaearth, Lenovo, AMD, Logitech, Riot Games, Realme, Cricbuzz, Netflix. Render each as text + a small geometric icon (SVG: a small black square or diamond).
- **Leading icon (extreme left)**: a clockwise-rotating decoration. Use SVG (a small gear or pixel-square) with `animation: spin 8s linear infinite;` (clockwise).
- **Text style**: Geist Medium 500, 14px, `#000000`, uppercase, letter-spacing `0.1em`, opacity `0.7`. Black brand text on white bg. The marquee scrolls at `30s linear infinite` (right to left). Duplicate content twice for seamless loop.
- **Ref comparison check (Round 3)**: marquee is seamless, no jumps. Brand text is uppercase, small, with letter-spacing. Leading icon rotates clockwise. The marquee LOOKS like a polished agency client strip — NOT a third-class scrolling text.

#### 3b — Red HALF-Eclipse (middle, black background)
- **Background**: `#000000`.
- **Layout**: full-width, vertical padding `120px top, 80px bottom`. `position: relative; overflow: hidden;`.
- **Red HALF-Eclipse** (CRITICAL — this is a HALF ellipse/circle, NOT a full circle):
  - A half-circle is the TOP half of a circle. The flat edge is at the BOTTOM, where it intersects with the section's bottom edge (so the bottom half is cut off / below the section).
  - Position: top of the About section, centered horizontally. The flat edge of the half-circle is at the section's bottom edge.
  - CSS:
    ```css
    .eclipse {
      position: absolute;
      bottom: -300px;             /* half of the circle's height — so only the top half shows */
      left: 50%;
      transform: translateX(-50%);
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle at 50% 50%,
        #B21C01 0%,
        #FF5931 35%,
        rgba(255, 89, 49, 0.4) 70%,
        transparent 100%);
      box-shadow: 0 0 200px 80px rgba(178, 28, 1, 0.4);
      animation: eclipse-rotate 60s linear infinite;
    }
    @keyframes eclipse-rotate {
      0% { transform: translateX(-50%) rotate(0deg); }
      100% { transform: translateX(-50%) rotate(-360deg); }
    }
    /* The .eclipse-container has overflow: hidden so only the top half is visible */
    .eclipse-container {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 50%;             /* top half only */
      overflow: hidden;
      pointer-events: none;
    }
    ```
    Wait — actually re-examine. The "half eclipse" means the visible shape is a half-circle (like a sunrise behind the horizon). To achieve this, put the full circle inside a container with `overflow: hidden` and only show the top portion. The circle's bottom edge sits AT the section's vertical middle (or wherever the horizon line is in the ref image).
  - **Visual check**: in the final render, you should see ONLY the top half of a red circle glowing behind the About text. The bottom half is hidden. The red is the palette's red gradient (NOT solid red, NOT pink, NOT maroon — it's `#B21C01` at center, fading to `#FF5931` and then transparent at the edges).
- **3 curve lines**: 3 concentric circular SVG paths around the half-eclipse, each `stroke: rgba(255,255,255,0.4)`, `stroke-width: 1`, `filter: blur(2px)`. They rotate WITH the eclipse (same 60s anti-clockwise). Use SVG `<circle>` elements with different radii (e.g., 320, 360, 400).
- **Character placements**: 4-5 small PNG character images placed ON the visible arc of the half-eclipse (i.e., on the top half of the circle's edge). They sit on the curve, slightly overlapping the white ring strokes, but NEVER in the red core area. They rotate with the eclipse (60s anti-clockwise).
  - File paths: `/images-for-landing-page/about-character-1.png` through `about-character-5.png`. If missing, render a small placeholder div (60x80px, palette gradient, "CHAR" label).
  - Size: ~80px tall, maintain aspect ratio.
  - Taller characters extend ABOVE the About Us button (z-index higher in the upper area), but the button is z-index 10 in front of them.
- **About text content** (centered, z-index 10, max-width `720px`, sits IN FRONT of the half-eclipse):
  - Paragraph 1 (Geist Regular 400, white, 20px, line-height 1.6): `"Thug, Goldy and Mortal started 8Bit in 2018 because creators needed more than brand deals."`
  - Paragraph 2 (Geist Light 300, white, 18px, opacity 0.85, margin-top 16px): `"They needed people who understood the room, the audience and the work after the stream ends."`
  - Paragraph 3 (Geist Light 300, white, 16px, opacity 0.65, margin-top 12px): `"Today, that means managing 50+ creators, producing multi-camera broadcasts and building campaigns that can be measured after the comments stop moving. With S8UL Esports and Gaming House 2.0, the agency sits inside the culture it represents."`
- **About Us button** (margin-top `40px`, glassmorphism): use `.glass-dark` recipe. Text "About Us" in Geist Medium 500, white, 14px. Padding `14px 32px`, pill. Hover: bg → `rgba(255,89,49,0.2)`, border → `#FF5931`, text → `#FF5931`, 200ms ease.
- **Ref comparison check (Round 3)**: it MUST be a half-eclipse (top half only), NOT a full circle. Characters sit ON the visible arc, NOT floating randomly. The 3 white curve lines are concentric, blurred, thin. The red is the palette gradient (NOT solid red, NOT pink). Verify all of this against the Figma reference.

#### 3c — Stats Bar (bottom, white background)
- **Background**: `#FFFFFF`.
- **Layout**: 4-column grid, equal widths, vertical padding `80px 0`. Hairline dividers between columns: `1px solid rgba(0,0,0,0.1)`.
- **Content** (each column center-aligned, EXACTLY as in ref):
  1. `"50+"` — Geist Black 900, Geist Mono, `clamp(48px, 5vw, 72px)`, `#000000`, line-height 1. Caption below: `"Creators"` in Geist Regular 400, 14px, `rgba(0,0,0,0.6)`. Single-line description: `"Under exclusive management"` in Geist Light 300, 13px, `rgba(0,0,0,0.4)`.
  2. `"100M+"` — Caption: `"Combined Reach"`. Description: `"Across YouTube, Instagram, Kick"`.
  3. `"3B+"` — Caption: `"Annual Video Views"`. Description: `"Trailing 12 months across platforms"`.
  4. `"300+"` — Caption: `"Campaigns Shipped"`. Description: `"Since 2018, with verifiable numbers"`.
- **Counter animation**: on scroll-into-view, animate each number from 0 to target (50, 100, 3, 300) over 800ms ease-out. Suffix (+, M+, B+, +) appears after. Geist Mono for the counting numbers.
- **Ref comparison check (Round 3)**: numbers are LARGE (Black 900, Geist Mono), captions are smaller and regular weight, descriptions are tiny and light. All 4 columns aligned. NOT scattered, NOT misaligned.

### Section 4 — Creators

- **Background**: `#000000`.
- **Vertical padding**: `96px 0`.
- **Header**: `"Creators"` — Geist Bold 700, white, `clamp(36px, 4vw, 56px)`, uppercase, letter-spacing `-0.02em`, centered, margin-bottom `64px`.
- **Layout**: horizontal gallery of 5 creator portrait cards in a flex row. The CENTER card is normal; the side cards are perspective-tilted.
  - **Center card**: `transform: none`, `scale(1.05)`, `z-index: 2`.
  - **Side cards**: `transform: perspective(1000px) rotateY(±15deg)`. Left cards rotate `+15deg`, right cards rotate `-15deg`. `z-index: 1`, `opacity: 0.85`.
- **Card structure** (each):
  - **Image**: **4:5 aspect ratio**, `border-radius: 16px`, `overflow: hidden`. File paths: `/images-for-landing-page/creator-mortal.png`, `creator-payal.png`, `creator-snax.png`, `creator-4.png`, `creator-5.png`. 5 cards total: Mortal centered, Payal + Snax on either side, 2 placeholder creators on the outer edges.
  - **Below image** (padding `16px top`):
    - **Real name**: `"Raj Verma"` (or actual name per creator) — Geist Regular 400, white, 18px.
    - **Alias**: `"Snax Gaming"` — Geist Light 300, `rgba(255,255,255,0.7)`, 16px, margin-top `4px`.
    - **Social stats** (flex column, gap `8px`, margin-top `16px`):
      - `"Instagram 1.3M"` — Geist Mono 400, `rgba(255,255,255,0.7)`, 13px. **Tappable**: `cursor: pointer`. On tap: text color → `#FF5931`, opens `https://instagram.com/<handle>` in new tab. Hover: text → `#FF5931`.
      - `"YouTube 2.63M"` — same style, tappable, links to `https://youtube.com/@<handle>`.
- **View All button** (below gallery, centered, margin-top `64px`): glassmorphism (`.glass-dark`), text `"View All"` in Geist Medium 500, white. Pill. Hover: bg → `rgba(255,89,49,0.2)`, border → `#FF5931`, text → `#FF5931`. `href="#"`.
- **Mobile**: horizontal scroll (`overflow-x: auto`, `scroll-snap-type: x mandatory`), each card `min-width: 280px`. Perspective tilts disabled.

### Section 5 — Case Studies / Work

- **Background**: `#FFFFFF`.
- **Foreground**: black curved container — `background: #000000`, `border-radius: 48px`, `margin: 0 24px`. Vertical padding `96px`.
- **Layout**: two-column grid (40/60) inside the black container.
- **Left column** (40%):
  - **Title**: `"Case Studies"` — Geist Bold 700, white, `clamp(28px, 3vw, 40px)`, uppercase, margin-bottom `40px`.
  - **List items** (vertical stack, gap `20px`). Order = latest first:
    1. `"Global Chess League S4"` — Geist Medium 500, white, 18px. (Latest — broadcast & event management partner.)
    2. `"Kick India — Day One Migration"` — Geist Medium 500, `rgba(255,255,255,0.8)`, 18px.
    3. `"iQOO Flagship Smartphone Launch"` — Geist Medium 500, `rgba(255,255,255,0.8)`, 18px.
    4. `"Monster Athlete Programme"` — Geist Medium 500, `rgba(255,255,255,0.8)`, 18px.
    5. `"Red Bull MEO Season"` — Geist Medium 500, `rgba(255,255,255,0.8)`, 18px.
  - **Interaction**: hovering an item turns its text → `#FF5931` AND swaps the right-column image. Default: first item ("Global Chess League S4") is active (orange-red), its image shows on the right.
  - **Show All button** (bottom-left, margin-top `48px`): text `"Show All →"` in Geist Medium 500, white, 16px, `cursor: pointer`. Hover: text → `#FF5931`. `href="#"`.
- **Right column** (60%):
  - **Top-right caption**: `"Verified results across smartphone launches, live sports broadcasting, and platform migrations. Hover any case to inspect."` — Geist Light 300, `rgba(255,255,255,0.5)`, 13px, text-align right, max-width `320px`, margin-bottom `24px`.
  - **Featured image**: `aspect-ratio: 4/3` or `1/1`, `border-radius: 24px`, `overflow: hidden`. File paths: `/images-for-landing-page/case-study-chess.png`, `case-study-kick.png`, `case-study-iqoo.png`, `case-study-monster.png`, `case-study-redbull.png`. Default: chess.
  - **Image swap**: on list-item hover, fade current image out (opacity 0, 150ms), swap `src`, fade in (opacity 1, 150ms).
  - **Caption below image**: title of currently-shown case — Geist Bold 700, white, 24px. Below it, a metric line in Geist Mono: e.g., `"Multi-camera live broadcast · 9-day event"` for chess.

### Section 6 — Services

- **Background**: `#FFFFFF`.
- **Vertical padding**: `96px 0`.
- **Title**: `"Our Services"` — Geist Bold 700, `#000000`, `clamp(36px, 4vw, 56px)`, uppercase, centered.
  - **Two thin lines**: above and below the title, horizontally centered. Each `width: 60px`, `height: 2px`, `background: #000000`. Margin `16px 0` above and below the title.
- **Layout**: 3-column grid, equal width, gap `24px`, margin-top `64px`.
- **Cards** (CRITICAL — these are VERTICAL RECTANGLES, NOT 3:4, NOT square):
  - **Card**: `background: #000000`, `border-radius: 20px`, `padding: 40px`, **`aspect-ratio: 9/16`** (or `min-height: 480px` with `width: 100%`), `position: relative`, `overflow: hidden`, `transition: all 250ms var(--ease)`.
  - **Title**: Geist Bold 700, white, 24px, uppercase.
  - **Body**: Geist Light 300, `rgba(255,255,255,0.7)`, 15px, line-height 1.6, margin-top `12px`.
  - **Hidden button**: glassmorphism button hidden below the body, revealed on hover (see interaction).
- **Three cards**:
  1. **"For Brands"** — body: `"Campaigns, consulting & activations that reach India's 500M+ gamers — verified, measurable, and built for the room."`
  2. **"For Creators"** — body: `"Management, brand deals & platform partnerships for digital talent. The career infrastructure that turns a stream into a business."`
  3. **"For Platforms"** — body: `"Guaranteed talent migration & localized content strategies. The institutional partner for platforms entering Indian gaming."`
- **Interaction on hover** (CRITICAL — gradient bg MUST appear):
  - Title and body **slide up by 12px** (`transform: translateY(-12px)`, 250ms ease).
  - Card background **transitions to a gradient**: `linear-gradient(180deg, #FFB658 0%, #FF5931 100%)` — orange-light at top, orange-red at bottom. Text stays white (for contrast on the gradient).
  - A glassmorphism button **fades in below** (opacity 0 → 1, 250ms ease, 100ms delay). Text per card:
    - For Brands: `"Start a Campaign"`
    - For Creators: `"Apply for Representation"`
    - For Platforms: `"Discuss Platform Partnership"`
  - Button style: use `.glass-dark` recipe. Text in Geist Medium 500, white, 14px. Padding `12px 24px`, pill. Hover: bg → `rgba(255,89,49,0.3)`, border → `#FF5931`, text → `#FF5931`. `href="#"`.
- **Know More button** (below the 3 cards, centered, margin-top `64px`): text `"Know More"` in Geist Medium 500, `#000000`, 16px, `cursor: pointer`, subtle underline. Hover: text → `#FF5931`. `href="#"`.
- **Mobile**: 3 cards stack vertically. Hover still works (tap → reveal button + gradient).

### Section 7 — Founders (called "Founders", NOT "Backbones")

- **Background**: `#000000` curved from the top — `border-top-left-radius: 48px`, `border-top-right-radius: 48px`, with `box-shadow: 0 -32px 64px rgba(0,0,0,0.4)` (drop shadow UP, onto the white Services section above). Vertical padding `120px top, 96px bottom`.
- **Title**: `"Founders"` — Geist Bold 700, white, `clamp(36px, 4vw, 56px)`, uppercase, centered, margin-bottom `64px`.
- **Layout**: 3-column grid, equal width, gap `24px`.
- **Cards** (red glassmorphism):
  - **Card**: `background: rgba(178, 28, 1, 0.15)` + `backdrop-filter: blur(20px) saturate(180%)` + `-webkit-backdrop-filter` + `border: 1px solid rgba(255, 255, 255, 0.18)`, `border-radius: 20px`, `padding: 32px`, `position: relative`, `min-height: 360px`. Hover: subtle lift `translateY(-4px)` + shadow increase.
  - **Top-left**: designation label — `"CEO & Founder"` / `"COO & Co-Founder"` / `"Chief Creator & Co-Founder"` — Geist Mono 400, `rgba(255,255,255,0.6)`, 11px, uppercase, letter-spacing `0.15em`.
  - **Top-right**: person photo — **ROUNDED SQUARE (squircle)**, NOT circle. `width: 100px, height: 100px`, `border-radius: 16px`, `object-fit: cover`, with a thin white stroke (`border: 2px solid rgba(255,255,255,0.4)`) AND a gradient background (palette gradient `linear-gradient(135deg, #FFB658, #FF5931, #B21C01)` as the image's bg, achieved by wrapping the `<img>` in a div with the gradient bg + padding `4px`). Also a thin white stroke on the card itself (already specified above).
  - **Hover effect on photo** (CRITICAL — apply this): on card hover, the person photo + its frame scale UP slightly. `transform: scale(1.08)`, `transition: transform 250ms var(--ease)`. The frame border also thickens slightly (e.g., from 2px to 3px).
  - **Name** (margin-top `24px`): `"Animesh Agarwal"` / `"Lokesh Jain"` / `"Naman Mathur"` — Geist Bold 700, white, 20px.
  - **Known name** (margin-top `4px`): `'"8Bit Thug"'` / `'"8Bit Goldy"'` / `'"Mortal"'` — Geist Regular 400, `#FF5931`, 14px.
  - **Body** (margin-top `16px`):
    - Thug: `"Pioneer of Indian gaming content. Started 8Bit in 2018 because no Indian gaming creator had a manager who actually understood the games. He still picks up the phone when Mortal calls."`
    - Goldy: `"Built the back office that turned 8Bit from a friend group into a company. Reviews every creator contract before it goes out. Leads esports operations and publisher relations."`
    - Mortal: `"The face of Indian gaming. Co-founded 8Bit because he wanted the next generation of creators to have the management he wished he had at 19. 4× Esports Awards nominee."`
    - Style: Geist Light 300, `rgba(255,255,255,0.7)`, 14px, line-height 1.6.
  - **Read More button** (bottom of card, margin-top `24px`): text `"Read More"` in Geist Medium 500, `#FF5931`, 13px, `cursor: pointer`, subtle underline. Hover: text → `#FFB658`. `href="#"`.
- **File paths**: `/images-for-landing-page/founder-thug.png`, `founder-goldy.png`, `founder-mortal.png`. If missing, render a branded placeholder rounded square with the gradient bg + the founder's first initial in Geist Black 900, white.

### Section 8 — CTA

- **Background**: gradient continuing from previous black Founders section, transitioning into red — `background: linear-gradient(180deg, #000000 0%, #B21C01 50%, #FF5931 100%)`. Curved from the bottom — `border-bottom-left-radius: 48px`, `border-bottom-right-radius: 48px`, with `box-shadow: 0 32px 64px rgba(178, 28, 1, 0.4)` (drop shadow DOWN, onto the Footer below).
- **Vertical padding**: `120px top, 96px bottom`.
- **Layout**: centered text, max-width `800px`, margin `0 auto`.
- **Content**:
  - **Headline**: `"Let's Make the Moments that Count"` — Geist Regular 400 (NOT bold — user specified "title heading text is regular"), white, `clamp(36px, 5vw, 64px)`, line-height `1.1`, letter-spacing `-0.02em`, uppercase, text-align center. Highlight "Moments" or "Count" in `#FFB658` — design choice.
  - **Subtext** (margin-top `24px`): `"Whether you're planning a tier-1 product launch or looking for agency representation, our leadership team answers within 24 hours."` — Geist Light 300, `rgba(255,255,255,0.8)`, 18px, line-height 1.6, text-align center, max-width `600px`, margin `24px auto 0`.
  - **Button** (margin-top `48px`, centered): glassmorphism "Start a Campaign" — use `.glass-dark` recipe. Color white, Geist Medium 500, 16px, padding `18px 40px`, pill. Hover: bg → `rgba(255,255,255,0.2)`, border → `#FFFFFF`. `href="#"`.

### Section 9 — Footer

- **Background**: white-orange gradient (up-down) — `background: linear-gradient(180deg, #FFFFFF 0%, #FFB658 100%)`. Plus a foreground gradient overlay: `radial-gradient(ellipse at 50% 100%, rgba(255, 89, 49, 0.35) 0%, transparent 70%)` — applied as a pseudo-element or absolutely-positioned div on top of the bg, BEHIND the footer content. If you have a PNG (`/images-for-landing-page/footer-foreground-overlay.png`), use it. Otherwise use the CSS radial gradient above.
- **Vertical padding**: `96px top, 48px bottom`.
- **8Bit logo top-center** (CRITICAL — LARGE, with perspective tilt on hover):
  - Use the logo PNG at `/images-for-landing-page/footer-logo.png` at `height: 80px` (LARGE). If no PNG, render text "8BIT" in Geist Black 900, `#000000`, `48px`, centered.
  - **Perspective-tilt hover effect** (apply this JS):
    ```javascript
    function initFooterLogoTilt() {
      const footerLogo = document.querySelector('.footer-logo');
      if (!footerLogo) return;
      footerLogo.style.transition = 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)';
      footerLogo.style.transformStyle = 'preserve-3d';
      footerLogo.addEventListener('mousemove', (e) => {
        const rect = footerLogo.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 to 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        footerLogo.style.transform = `perspective(800px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;
      });
      footerLogo.addEventListener('mouseleave', () => {
        footerLogo.style.transform = 'perspective(800px) rotateY(0) rotateX(0)';
      });
    }
    ```
- **Address** (below the logo, centered, margin-top `24px`): `"C/o Hotel Matri Residency, Ground Floor, Patliputra Colony Road, Kankarbagh, Patna, Bihar, India — 800018"` — Geist Regular 400, `rgba(0,0,0,0.6)`, 13px, text-align center, max-width `400px`, margin `0 auto`.
- **Social icons row** (below address, centered, margin-top `24px`): LinkedIn, Instagram, YouTube, Twitter/X — each as a circular glassmorphism button (`background: rgba(255,255,255,0.4)`, `backdrop-filter: blur(10px)`, `-webkit-backdrop-filter`, `border: 1px solid rgba(0,0,0,0.1)`, `border-radius: 50%`, `width: 40px, height: 40px`, flex-centered icon). Icons in `#000000`. Hover: bg → `rgba(255,89,49,0.3)`, icon → `#FF5931`. Use Font Awesome CDN or inline SVG.
- **3-column grid below socials** (margin-top `64px`):
  - **Left column** (redirections):
    - Links: `"Home"`, `"About"`, `"Creators"`, `"Work"`, `"Services"`, `"Founders"`, `"Contact"` — Geist Medium 500, `#000000`, 15px, stacked vertically with `8px` gap. Hover: text → `#FF5931`. `href="#"` for each.
    - Below the links, the **copyrights line**: `"© 2026 8Bit Creatives. All rights reserved."` — Geist Light 300, `rgba(0,0,0,0.5)`, 12px, margin-top `24px`.
  - **Center column**: empty OR a small "↑ Back to Top" link (`"↑ Back to Top"`, Geist Medium 500, `#000000`, 14px, `cursor: pointer`, hover → `#FF5931`).
  - **Right column** (enquiry):
    - Heading: `"Enquiry"` — Geist Bold 700, `#000000`, 18px.
    - Below: `"business@8bitcreatives.in"` — Geist Regular 400, `#000000`, 15px, `mailto:` link, hover → `#FF5931` + underline.
    - Below (margin-top `16px`): `"For press, partnerships, or talent inquiries — we respond within 24 hours."` — Geist Light 300, `rgba(0,0,0,0.6)`, 13px, line-height 1.6, max-width `280px`.
    - Below (margin-top `24px`): `"Privacy Policy"` — Geist Medium 500, `#000000`, 13px, `cursor: pointer`, hover → `#FF5931`. `href="#"`.
- **Signature line** (centered, margin-top `64px`): `"Made with ❤️ by Divyaraj Chauhan"` — Geist Regular 400, `rgba(0,0,0,0.7)`, 13px. The text `"Divyaraj Chauhan"` is a link — `color: #000000`, `font-weight: 700`, `text-decoration: underline`, `href="https://divyarajchauhan.in"`, `target="_blank"`. Hover: text → `#FF5931`.
- **Thin divider line** (margin-top `24px`): `1px solid rgba(0,0,0,0.15)`, full width.
- **8BITCreatives wordmark** (centered, margin-top `32px`): `"8BIT"` in Geist Black 900 + `"Creatives"` in Geist Thin 100 — both in `#000000`, size `clamp(40px, 5vw, 64px)`, line-height 1, letter-spacing `-0.04em`. The mix of Black 900 + Thin 100 is the signature touch.

---

## ✅ FINAL DEFINITION OF DONE

The landing page is complete when ALL of the following are true:

1. `index.html`, `styles.css`, `app.js` exist at the project root, double-clickable, run in any modern browser with no console errors.
2. Geist is the only font loaded (verify in DevTools → Network → Fonts — only Geist + Geist Mono requests).
3. Only the 6 palette hexes are used anywhere (exception: `#FF4D00` in the hero canvas). Inspect every computed color in DevTools.
4. Navbar is glassmorphism (transparent with blur, NOT solid).
5. Hero bg image is blurred + inner-shadowed, blur stays INSIDE the image bounds (no bleed).
6. Hero canvas particle logo initializes from `logo_2.png`, reacts to mouse, pauses when off-screen.
7. Hero buttons are solid red-orange pills (`#FF5931`), white text, Geist Medium 500.
8. About marquee scrolls seamlessly, brand text in Geist Medium uppercase, leading icon rotates clockwise.
9. About red eclipse is a HALF circle (NOT full), positioned at the top of the section, characters sit on the visible arc.
10. About 3 white curve lines are concentric, blurred, thin, rotate with the eclipse (60s anti-clockwise).
11. About red is the palette gradient (`#B21C01` center → `#FF5931` → transparent), NOT solid red.
12. Stats numbers are 50+ / 100M+ / 3B+ / 300+ (Black 900 Geist Mono), with correct captions.
13. Creators section: 5 cards, center normal + sides perspective-tilted, 4:5 rounded-corner images, social numbers tappable → red on tap + open external link.
14. Case studies: list on left (Global Chess League S4 first), image on right, hover swaps image with 150ms fade.
15. Services: 3 VERTICAL RECTANGLE cards (9:16 aspect ratio, NOT 3:4, NOT square). Hover reveals gradient background (`#FFB658` → `#FF5931`) + slides title/body up + reveals glassmorphism button.
16. Founders: 3 red glassmorphism cards. Founder portraits are ROUNDED SQUARES (1:1, 16px radius), NOT circles. Hover scales image + frame slightly larger (`scale(1.08)` + thicker border).
17. CTA section: black-to-red gradient, curved-bottom, glassmorphism "Start a Campaign" button. (User confirmed this section was good.)
18. Footer: 8bit logo is LARGE (80px tall or 48px text), centered, perspective-tilts on hover. Foreground gradient overlay applied. White-orange up-down gradient bg. "Made with ❤️ by Divyaraj Chauhan" links to `https://divyarajchauhan.in`. 8BITCreatives wordmark at bottom with Black 900 + Thin 100 weight mix.
19. All buttons (`View All`, `Show All`, `Know More`, `Read More`, `Explore Creators`, `Start Campaign`, `About Us`, `Apply for Representation`, `Discuss Platform Partnership`) have `href="#"` and visible hover states.
20. Lighthouse: performance ≥ 85, accessibility ≥ 90, best practices ≥ 90, SEO ≥ 90.

**No follow-up questions. Iterate internally until all 20 items are true. Be SLOW. Be PRECISE. Re-examine the Figma reference for every section. Run all 4 verification rounds per section. Then deliver the final `index.html` + `styles.css` + `app.js` (+ any image placeholders you had to render).**
