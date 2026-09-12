# 8Bit Creatives — Landing Page Build (Antigravity CLI Single-Shot Prompt)

> **How to use this file**
> Option A — Save this exact file as `AGENTS.md` at the root of your project, attach the Figma screenshot, then run: *"Analyze this design image according to the rules defined in AGENTS.md. Initiate the execution loop, check files continuously using the verification terminal tool, and assemble the landing page sequentially. Start with Phase 1 layout analysis."*
>
> Option B — Paste the entire contents of this file as your first Antigravity prompt, then attach the Figma screenshot and reply *"Begin Phase 1."*
>
> Antigravity should iterate internally — drafting, building, verifying, fixing — until the entire landing page is delivered as a working `index.html` (+ supporting CSS/JS files if separated). No time bound. Keep the loop going until done.

---

## 🛠️ System Configuration & Stack

- **Framework**: Single-file vanilla HTML5 + CSS3 + JavaScript (no React, no Tailwind, no build step — double-click `index.html` and it runs). You MAY split CSS into `styles.css` and JS into `app.js` if the file gets unwieldy — both loaded via plain `<link>` and `<script>` tags.
- **Design Philosophy**: Component-driven, mobile-first responsive design, strict semantic HTML, absolute fidelity to the provided Figma reference image. Pixel-perfect, not "inspired by."
- **Font**: Geist (variable, all weights from 100 Thin to 900 Black) — loaded from Google Fonts CDN. **Geist ONLY.** No Inter, no Helvetica, no system fallback beyond the Geist stack. If Geist Variable is not available, fall back to specific Geist weights: 100, 300, 400, 500, 700, 900. The only other typographic voice allowed is **Geist Mono** for tiny mono captions, IF needed — but prefer Geist at small sizes for visual consistency.
- **Color Palette (STRICT — only these 6 hexes anywhere on the page)**:
  | Token | Hex | Use |
  |------|-----|-----|
  | `--white` | `#FFFFFF` | Light section backgrounds, text on dark, button fills on dark |
  | `--orange-light` | `#FFB658` | Gradient stops, secondary highlights, soft glows |
  | `--orange-mid` | `#FF9041` | Gradient mid-tones, hover states |
  | `--orange-red` | `#FF5931` | Primary accent — CTAs, active states, links, hover text |
  | `--red-deep` | `#B21C01` | Deep gradient end, CTA section red, eclipse dark core |
  | `--black` | `#000000` | Dark section backgrounds, text on white, primary text |

  **Rule**: Every solid color, blurred glow, gradient stop, and shadow tint on the page must be one of these six hexes. The ONLY exception is character/portrait photography, the logo PNG itself, and case-study campaign images — those may contain intrinsic colors beyond the palette. Everywhere else (UI, backgrounds, overlays, buttons, text, borders, glows): palette only.
- **Accent for particle canvas**: Use `#FF4D00` for the canvas particle dispersal color (per the user's provided code snippet). This sits between `#FF9041` and `#FF5931` and is the only out-of-palette color allowed — and only inside the hero canvas.
- **Image folder**: All local images live at `/images-for-landing-page/` at the project root. File naming convention is `<section>-<purpose>.png` — see the per-section specs for exact filenames. If an image is missing on first build, render a branded placeholder div (palette gradient + Geist label) instead of a broken image icon. Do NOT use Unsplash or external URLs.
- **Spacing & layout**: Container max-width `1280px`, side padding `48px` desktop / `20px` mobile. Section vertical padding `96px` desktop / `64px` mobile. Generous whitespace — minimalism over density.
- **Border radius**: Use `border-radius` generously on cards (`20px`), buttons (pill `999px` for CTAs, `12px` for secondary), and curved section transitions (`48px` for the curved-top / curved-bottom section dividers — see specs).
- **Glassmorphism recipe**: `background: rgba(255,255,255,0.08)` on dark sections OR `rgba(255,255,255,0.7)` on light sections; `backdrop-filter: blur(20px) saturate(180%)`; `-webkit-backdrop-filter` prefix required for Safari; `border: 1px solid rgba(255,255,255,0.18)` on dark / `rgba(0,0,0,0.06)` on light.
- **Smooth scroll**: `html { scroll-behavior: smooth; }` + section `scroll-margin-top: 80px` to clear the fixed navbar.

---

## 🔄 Execution Protocol (follow sequentially — do not skip phases)

### Phase 1 — Visual Blueprinting & Component Breakdown
1. **Read the attached Figma screenshot entirely** before writing a single line of code. Map every visible element to a section + component.
2. Output a text-based **Component Blueprint** that lists, for each of the 8 sections (Navbar, Hero, About, Creators, Case Studies, Services, Founders, CTA, Footer — 9 total counting Navbar):
   - Layout grid (columns, alignment, max-width)
   - Background (color + any gradient + any curve transition from the previous section)
   - Every text element with its exact wording (quoted) + font weight (Thin 100 / Light 300 / Regular 400 / Medium 500 / Bold 700 / Black 900)
   - Every image asset with its filename under `/images-for-landing-page/`
   - Every interaction (hover, click, scroll-reveal, marquee, rotation, perspective tilt)
3. **Wait for the blueprint to render fully in the response before writing code.** This is mandatory. If you skip the blueprint, the build will drift.

### Phase 2 — Section-by-Section Incremental Execution
Do NOT write the whole page at once. Build in this order, one section at a time:
1. **Navbar** (glassmorphism, fixed top)
2. **Hero** (canvas particle logo + bg image + buttons)
3. **About** (marquee + red eclipse with rotating characters + stats numbers)
4. **Creators** (perspective-tilted portrait gallery + tappable social stats)
5. **Case Studies** (curved black foreground + hover-image-swap list)
6. **Services** (3 black cards + slide-up reveal on hover)
7. **Founders** (3 red glassmorphism cards + curved-top section)
8. **CTA** (red gradient + glassmorphism button + curved-bottom)
9. **Footer** (perspective-tilt logo + glassmorphism socials + 8BITCreatives wordmark)

For EACH section, run this subagent loop:
1. **Draft** — Generate the clean semantic HTML + CSS for the section.
2. **Interactive layer** — Add the section's JS (canvas init, marquee, IntersectionObserver reveals, hover state machines, perspective-tilt on mouse-move, accordion, etc.).
3. **Execution verification** — Open the rendered `index.html` in your headless browser tool (or run `python3 -m http.server` in the project root and curl it). Verify: HTML parses without errors, CSS loads, JS executes without throwing, all referenced image paths exist (or are replaced with branded placeholders).
4. **Self-correction protocol** — If any error is detected (missing file, JS exception, layout collapse, color outside palette, font other than Geist), pause, analyze the stack trace, correct the file in place, and re-verify. **Do NOT declare the section finished until terminal logs return code `0` and the section renders correctly.** Self-correct silently — do not ask the user for help on errors you can fix.
5. **Move forward** — Only after the current section passes verification, proceed to the next section.

### Phase 3 — Global Responsive Alignment & Polish
1. Review the entire file. Verify cross-section consistency (font stack, color tokens, glassmorphism recipe, button styles).
2. Test at 1440px (desktop), 768px (tablet), 375px (mobile). All grids collapse correctly. Hero stacks vertically. Creators gallery becomes horizontal scroll or 1-col stack. Services stack vertically. Footer columns stack.
3. Consolidate duplicate animations into unified global timelines. Ensure all `requestAnimationFrame` loops (canvas, marquee, eclipse rotation) pause when the section is off-screen via IntersectionObserver (battery saving).
4. Verify color discipline — open the rendered page, run a DOM color audit (manually inspect every computed background, color, border, shadow) — confirm only the 6 palette hexes (plus `#FF4D00` in the canvas) are used.

### Phase 4 — Final QA (do not skip)
- [ ] Geist font loaded (only font on the page)
- [ ] Only 6 palette colors used everywhere (exception: `#FF4D00` in canvas, photography, logo PNG)
- [ ] All 9 sections render correctly on desktop / tablet / mobile
- [ ] Canvas particle logo initializes from `logo_2.png`, reacts to mouse, pauses when off-screen
- [ ] Marquee infinite-scrolls seamlessly (no jumps)
- [ ] Red eclipse rotates anti-clockwise, characters rotate with it, 3 curve lines rotate together, characters don't overlap the eclipse
- [ ] Creators section: center image normal, side images perspective-tilted, social numbers tappable (turn red on tap, link opens in new tab)
- [ ] Case studies: hovering a list item turns it orange AND swaps the right-side image
- [ ] Services: all 3 cards black by default, hover slides title+body up and reveals glassmorphism button
- [ ] Founders: 3 red glassmorphism cards, person image with palette-gradient bg + thin white stroke on image and card
- [ ] Curved transitions: Founders section curved-top + drop-shadow up; CTA section curved-bottom + drop-shadow down
- [ ] Footer: logo perspective-tilts on hover, socials in glassmorphism, "Made with ❤️ by Divyaraj Chauhan" links to https://divyarajchauhan.in, 8BITCreatives wordmark at the very bottom with extra-bold + thin font mix
- [ ] All clickable items (View All, Show All, Know More, Read More, Explore Creators) show a visible hover state but DON'T need to route anywhere yet (subpages come later) — use `cursor: pointer` + hover style, but no actual navigation

---

## ⚠️ Anti-Failure Rules (where NOT to make mistakes)

1. **Geist ONLY.** If you are tempted to use Inter, Helvetica, system-ui, Arial, or any other font — STOP. Use Geist. The end.
2. **Palette ONLY.** If you are tempted to use a hex outside the 6 — STOP. If you genuinely need a slightly different shade for a gradient, you may use `rgba()` with the palette hexes (e.g., `rgba(255, 89, 49, 0.3)` for a translucent overlay) — but the base color must be a palette hex. No `#e63946`, no `#c1121f`, no `#f5f5f5` — those are wrong.
3. **Blur stays inside the image.** The hero bg image gets blurred with `filter: blur(8px)` AND an inner-shadow + vignette. The blur MUST be contained inside the image's bounding box — do not let it bleed outside the image edges (the user specifically called this out as a previous mistake). Use `overflow: hidden` on the image container and apply the blur to the `<img>` itself, not the container.
4. **Isolate canvas animation triggers.** The hero canvas particle animation must use its own `requestAnimationFrame` loop and pause via IntersectionObserver when the hero section scrolls out of view. Do NOT attach the animation to the global scroll event.
5. **Isolate ScrollTrigger / IntersectionObserver targets.** Every scroll-reveal element must be its own observed target — never attach observers to layout structural elements (the navbar, the section wrappers) to prevent layout thrashing.
6. **Asset fallbacks.** For every image path you reference, if the file does not exist on first build, render a branded placeholder div (palette gradient background + Geist Mono label showing the intended filename) instead of a broken `<img>`. The page must never show a broken-image icon.
7. **Double-verify font loading.** Add the Google Fonts `<link>` in `<head>` with both `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com`. Confirm the Geist CSS loads — if not, fall back to a system font stack with a console warning, but never silently render in the wrong font.
8. **Glassmorphism cross-browser.** Always include `-webkit-backdrop-filter` alongside `backdrop-filter` for Safari support. Test that the blur actually renders (Safari has known issues with `backdrop-filter` on some element types — use it on `div` elements, not on `<img>`).
9. **Don't over-rotate the eclipse.** The red eclipse rotates anti-clockwise at a SLOW speed — `animation-duration: 60s` minimum (it should feel meditative, not frenetic). Same for the 3 curve lines (they rotate WITH the eclipse, same speed, same direction). The marquee scrolls at `30s linear infinite`. The footer logo perspective-tilt is mouse-driven, not auto-rotating.
10. **Founders section is named "Founders"** — NOT "Backbones." The H2 says "Founders."
11. **CTAs and links route to `#`** for now (no subpages yet). All buttons (`View All`, `Show All`, `Know More`, `Read More`, `Explore Creators`, `Start Campaign`, `About Us`) must show visible hover states but their `href` is `#` — do not attempt to create new pages. Just deliver the landing page.
12. **The "Made with ❤️ by Divyaraj Chauhan" line** must link "Divyaraj Chauhan" to `https://divyarajchauhan.in` — verify the link works.

---

## 📐 Section-by-Section Build Specification

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

  <!-- Geist + Geist Mono from Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100;300;400;500;700;900&family=Geist+Mono:wght@400;500;700&display=swap" rel="stylesheet">

  <link rel="icon" type="image/png" href="/images-for-landing-page/favicon.png">
  <link rel="stylesheet" href="styles.css">
</head>
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

  --font: 'Geist', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'Geist Mono', 'SF Mono', Menlo, monospace;

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
section { scroll-margin-top: 80px; }

.container { max-width: var(--container); margin: 0 auto; padding: 0 var(--gutter); }
```

### Section 1 — Navbar (Glassmorphism, fixed top)

- **Position**: `position: fixed; top: 0; left: 0; right: 0; z-index: 100;`
- **Background**: `rgba(255, 255, 255, 0.08)` + `backdrop-filter: blur(20px) saturate(180%)` + `-webkit-backdrop-filter` + `border-bottom: 1px solid rgba(255, 255, 255, 0.12)`.
- **Layout**: flex row, container max-width 1280px, height `72px`, vertical padding `20px`.
  - **Left**: 8BIT logo — text-based mark in Geist Black 900, white. Optionally a small pixel-square icon in palette orange-red before the text.
  - **Center**: nav links — `Home | About | Creators | Work | Services | Founders | Contact` separated by thin pipes (`|`) in `rgba(255,255,255,0.3)`. Link text in Geist Regular 400, 14px, color `rgba(255,255,255,0.8)`. Hover: link color → `#FF5931`, pipe stays muted.
  - **Right**: solid "Start Campaign" button — palette `#FF5931` bg, white text, Geist Medium 500, 13px, padding `12px 24px`, `border-radius: 999px` (pill), no border. Hover: bg → `#B21C01` (dark red), 150ms ease.
- **Mobile (<768px)**: hamburger menu icon (3 lines in white) replaces center links; tapping it opens a glassmorphism dropdown panel below the navbar with the links stacked vertically.

### Section 2 — Hero

- **Background**: White (`#FFFFFF`) base for the section, with the hero image as the backdrop.
- **Hero image**: full-bleed background image at the top of the hero, file path `/images-for-landing-page/hero-bg.png` — a gaming stadium photo. Apply `filter: blur(8px)` AND `box-shadow: inset 0 0 200px 80px rgba(0,0,0,0.6)` (inner shadow + vignette) directly to the `<img>` so the blur stays INSIDE the image's borders (use `overflow: hidden` on the image wrapper to clip any bleed). The image should look slightly darkened so the foreground text and the right-side canvas pop.
- **Layout**: two-column grid (60/40 on desktop, stacks on mobile). Generous vertical padding `120px top, 120px bottom`.
- **Left column** (60%):
  - **8Bit logo** top-left (small pixel mark + "8BIT" wordmark in Geist Black 900, white — sits above the headline).
  - **Headline**: `"The People Behind the Screentime"` — Geist Bold 700, white, `clamp(40px, 6vw, 80px)`, line-height `1.05`, letter-spacing `-0.03em`, uppercase. Break into multiple lines naturally. The word "Screentime" can be in `#FF5931` (orange-red) for emphasis — design choice.
  - **Subtitle**: `"8Bit Creatives manages the creators, campaigns and live moments that move India's gaming audience."` — Geist Regular 400, 18px, color `rgba(255,255,255,0.7)`, max-width `480px`, margin-top `24px`, line-height `1.6`.
  - **Buttons** (flex row, gap `16px`, margin-top `40px`):
    - **"Start Campaign"** — solid `#FF5931` bg, white text, Geist Medium 500, 14px, padding `16px 32px`, `border-radius: 999px` (pill). Hover: bg → `#B21C01`, 150ms ease.
    - **"Explore Creators"** — solid style (per user instruction "keep the buttons solid and as same in colours"): `#FF5931` bg, white text, same style as the first button. (Both buttons look the same — solid orange-red pills. The user explicitly said "keep the buttons solid and as same in colours.")
  - Both buttons have `cursor: pointer`, `href="#"`, hover state already specified.
- **Right column** (40%):
  - **Top-right**: solid "Start Campaign" button — same style as the left-column buttons (`#FF5931` bg, white text, Geist Medium 500, 13px, padding `12px 24px`, pill). Positioned `position: absolute; top: 100px; right: 48px;` OR at the top of the right column flex.
  - **Interactive pixelated 8Bit logo** — center of the right column. This is the hero canvas (see code below). The container is `1:1` aspect ratio, responsive (max `500px` wide on desktop, scales down on mobile), centered vertically.
  - **Canvas HTML**:
    ```html
    <div class="canvas-container" style="aspect-ratio: 1/1; width: 100%; max-width: 500px; margin: 0 auto; pointer-events: auto;">
      <canvas id="heroCanvas" style="width: 100%; height: 100%; pointer-events: auto;"></canvas>
    </div>
    ```
  - **Canvas JS** — use the user's provided snippet verbatim, with two adjustments: (1) initialize from `/images-for-landing-page/logo_2.png`, (2) pause the animation loop when the canvas is scrolled out of view via IntersectionObserver. Full code:
    ```javascript
    const canvas = document.getElementById('heroCanvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const PARTICLE_SIZE = 4;
    const HOVER_RADIUS = 80;
    const BRAND_ORANGE = '#FF4D00';
    let particlesArray = [];
    let mouse = { x: null, y: null, radius: HOVER_RADIUS };
    let animationId = null;
    let isCanvasVisible = true;

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

    // Pause when off-screen
    const canvasObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isCanvasVisible = entry.isIntersecting;
        if (isCanvasVisible && !animationId) animate();
        if (!isCanvasVisible && animationId) stopAnimation();
      });
    }, { threshold: 0.05 });
    canvasObserver.observe(canvas);

    initMosaic('/images-for-landing-page/logo_2.png');
    ```
  - **Important**: if `logo_2.png` is not yet provided in the images folder, render a branded placeholder div (palette gradient from `#FF5931` to `#B21C01`) sized 500x500px with "8BIT" centered in Geist Black 900, white — so the hero doesn't break.

### Section 3 — About (white → black → white)

The About section has THREE sub-blocks stacked vertically: top (white marquee), middle (black with red eclipse), bottom (white stats). The pattern is white-black-white.

#### 3a — Marquee (top, white background)
- **Background**: `#FFFFFF`.
- **Layout**: full-width strip, vertical padding `32px`.
- **Content**: horizontally scrolling marquee of brand names + a leading icon. Brand names: `"Samsung"`, `"iQOO"`, `"Red Bull"`, `"Monster Energy"`, `"OnePlus"`, `"Krafton"`, `"Mamaearth"`, `"Lenovo"`, `"AMD"`, `"Logitech"`, `"Riot Games"`, `"Realme"`, `"Cricbuzz"`, `"Netflix"`. Render each as text + a small geometric icon (use SVG: a small square or diamond in `#000000`). The icon for the EXTREME LEFT of the marquee is a clockwise-rotating decoration (use a small SVG gear or pixel-square that rotates `animation: spin 8s linear infinite`).
- **Text style**: Geist Medium 500, 14px, color `#000000`, uppercase, letter-spacing `0.1em`, opacity `0.7`. Black brand text on white bg.
- **Marquee animation**: pure CSS, `animation: marquee 30s linear infinite`, duplicate the content twice inside the strip for seamless loop. Pause on hover (optional, but recommended).
- **Keyframes**:
  ```css
  @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  ```

#### 3b — Red Eclipse (middle, black background)
- **Background**: `#000000`.
- **Layout**: full-width, vertical padding `120px top, 80px bottom`. Position relative.
- **Red Eclipse**: a massive circle positioned absolutely behind the text, vertically centered, horizontally centered. Use CSS:
  ```css
  .eclipse {
    position: absolute;
    top: 50%; left: 50%;
    width: 600px; height: 600px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: radial-gradient(circle at 50% 50%, #B21C01 0%, #FF5931 35%, rgba(255, 89, 49, 0.4) 70%, transparent 100%);
    box-shadow: 0 0 200px 80px rgba(178, 28, 1, 0.4);
    animation: eclipse-rotate 60s linear infinite; /* anti-clockwise */
  }
  @keyframes eclipse-rotate { 0% { transform: translate(-50%, -50%) rotate(0deg); } 100% { transform: translate(-50%, -50%) rotate(-360deg); } }
  ```
- **3 curve lines around the eclipse**: 3 concentric circular borders (or SVG curved paths) around the eclipse, each with a blur filter (`filter: blur(2px)`) and a thin white line (`border: 1px solid rgba(255,255,255,0.4)`). They rotate TOGETHER with the eclipse (same speed, same direction — anti-clockwise). Use SVG circles for precision:
  ```html
  <svg class="eclipse-rings" viewBox="0 0 800 800">
    <circle cx="400" cy="400" r="320" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1" filter="blur(2px)" />
    <circle cx="400" cy="400" r="360" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1" filter="blur(2px)" />
    <circle cx="400" cy="400" r="400" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1" filter="blur(2px)" />
  </svg>
  ```
  These rings are inside the same `.eclipse-container` that rotates anti-clockwise at 60s, so they rotate WITH the eclipse.
- **Character placements**: 4-5 small PNG character images from different games, placed ON the surface of the eclipse (positioned around the eclipse's edge — top, top-left, top-right, bottom-left, bottom-right). They sit on the rings, slightly overlapping the ring stroke but NEVER covering the red core of the eclipse itself. They rotate together with the eclipse (same 60s anti-clockwise rotation).
  - File paths: `/images-for-landing-page/character-1.png`, `character-2.png`, `character-3.png`, `character-4.png`, `character-5.png`. If a file is missing, render a small placeholder div (palette gradient, 60x80px, with "CHAR" label).
  - Size: ~80px tall, maintain aspect ratio.
  - The user noted: "they shouldn't cover any area of the red eclipse they also have to stay in touch of that red eclipse" — meaning they sit ON the rings, NOT in the central red area.
- **Taller characters go above the About Us button, but shorter characters go below** — meaning the character z-index is BEHIND the About Us button but characters positioned at the top of the eclipse can extend above the button's vertical position. Set `.about-button { z-index: 10; position: relative; }` and `.character { z-index: 5; }`.
- **About text content** (centered, z-index 10, max-width `720px`, sits IN FRONT of the eclipse):
  - Paragraph 1 (Geist Regular 400, white, 20px, line-height 1.6): `"Thug, Goldy and Mortal started 8Bit in 2018 because creators needed more than brand deals."`
  - Paragraph 2 (Geist Light 300, white, 18px, opacity 0.85, margin-top 16px): `"They needed people who understood the room, the audience and the work after the stream ends."`
  - Paragraph 3 (Geist Light 300, white, 16px, opacity 0.65, margin-top 12px): `"Today, that means managing 50+ creators, producing multi-camera broadcasts and building campaigns that can be measured after the comments stop moving. With S8UL Esports and Gaming House 2.0, the agency sits inside the culture it represents."`
- **About Us button** (margin-top `40px`, glassmorphism): `background: rgba(255,255,255,0.08)`, `backdrop-filter: blur(20px)`, `border: 1px solid rgba(255,255,255,0.18)`, color white, Geist Medium 500, 14px, padding `14px 32px`, `border-radius: 999px`. Hover: bg → `rgba(255,89,49,0.2)`, border → `#FF5931`, text → `#FF5931`, 200ms ease.

#### 3c — Stats Bar (bottom, white background)
- **Background**: `#FFFFFF`.
- **Layout**: 4-column grid, equal widths, vertical padding `80px top, 80px bottom`. Hairline dividers between columns: `1px solid rgba(0,0,0,0.1)` vertical lines.
- **Content** (each column center-aligned):
  1. **`"50+"`** — Geist Black 900, `clamp(48px, 5vw, 72px)`, color `#000000`, line-height 1. Caption below: `"Creators"` in Geist Regular 400, 14px, color `#666666` (use rgba(0,0,0,0.6)). Single-line description below: `"Under exclusive management"` in Geist Light 300, 13px, color `rgba(0,0,0,0.4)`.
  2. **`"100M+"`** — same style. Caption: `"Combined Reach"`. Description: `"Across YouTube, Instagram, Kick"`.
  3. **`"3B+"`** — same style. Caption: `"Annual Video Views"`. Description: `"Trailing 12 months across platforms"`.
  4. **`"300+"`** — same style. Caption: `"Campaigns Shipped"`. Description: `"Since 2018, with verifiable numbers"`.
- **Counter animation**: on scroll-into-view, animate each number from 0 to target (50, 100, 3, 300) over 800ms ease-out, suffix (+, M+, B+, +) appears after. Geist Mono for the counting numbers (gives them technical feel).

### Section 4 — Creators

- **Background**: `#000000`.
- **Vertical padding**: `96px top, 96px bottom`.
- **Header**: `"Creators"` — Geist Bold 700, white, `clamp(36px, 4vw, 56px)`, uppercase, letter-spacing `-0.02em`, centered, margin-bottom `64px`.
- **Layout**: horizontal gallery of 5 creator portrait cards in a flex row. The CENTER card is normal (no transform); the side cards are perspective-tilted:
  - **Center card**: `transform: none`, slightly larger (`scale(1.05)`), `z-index: 2`.
  - **Side cards**: `transform: perspective(1000px) rotateY(±15deg)` — left cards rotate `+15deg`, right cards rotate `-15deg`. `z-index: 1`, `opacity: 0.8`.
- **Card structure** (each):
  - **Image**: 4:5 aspect ratio, `border-radius: 16px` (curved corners), `overflow: hidden`, grayscale filter optional (`filter: grayscale(40%)`). File paths: `/images-for-landing-page/creator-mortal.png`, `creator-payal.png`, `creator-snax.png`, `creator-4.png`, `creator-5.png`. Use 5 cards total — Mortal centered, Payal and Snax on either side, 2 more placeholder creators on the outer edges.
  - **Below image** (text block, padding `16px top`):
    - **Real name**: `"Raj Verma"` (or actual name per creator) — Geist Regular 400, white, 18px.
    - **Alias**: `"Snax Gaming"` — Geist Light 300, `rgba(255,255,255,0.7)`, 16px, margin-top `4px`.
    - **Social stats** (flex column, gap `8px`, margin-top `16px`):
      - `"Instagram 1.3M"` — Geist Mono 400, `rgba(255,255,255,0.7)`, 13px. **Tappable**: `cursor: pointer`. On tap/click: text color turns `#FF5931` (orange-red) AND opens `https://instagram.com/<handle>` in new tab (`target="_blank"`). Hover state: text turns `#FF5931`.
      - `"YouTube 2.63M"` — same style, tappable, links to `https://youtube.com/@<handle>`.
- **View All button** (below the gallery, centered, margin-top `64px`): glassmorphism style (same as About Us button), text `"View All"` in Geist Medium 500, white, padding `14px 32px`, pill. `cursor: pointer` + hover state (border → `#FF5931`, text → `#FF5931`). **`href="#"` — no actual subpage yet, just visual hover state.**
- **Mobile**: gallery becomes horizontal scroll (`overflow-x: auto`, `scroll-snap-type: x mandatory`), each card `min-width: 280px`, perspective tilts disabled, all cards normal.

### Section 5 — Case Studies / Work

- **Background**: `#FFFFFF`.
- **Foreground**: black curved container — `background: #000000`, `border-radius: 48px`, `margin: 0 24px` (so a strip of white bg shows around the curved edges). Vertical padding `96px`.
- **Layout**: two-column grid inside the black container (40/60 split — left text list, right image).
- **Left column** (40%):
  - **Title**: `"Case Studies"` — Geist Bold 700, white, `clamp(28px, 3vw, 40px)`, uppercase, margin-bottom `40px`.
  - **List items** (vertical stack, gap `20px`). Each item: text + an arrow icon `→` on the right. Order = latest first (correct hierarchy per user instruction):
    1. `"Global Chess League S4"` — Geist Medium 500, white, 18px. (Latest work — broadcast & event management partner.)
    2. `"Kick India — Day One Migration"` — Geist Medium 500, `rgba(255,255,255,0.8)`, 18px.
    3. `"iQOO Flagship Smartphone Launch"` — Geist Medium 500, `rgba(255,255,255,0.8)`, 18px.
    4. `"Monster Athlete Programme"` — Geist Medium 500, `rgba(255,255,255,0.8)`, 18px.
    5. `"Red Bull MEO Season"` — Geist Medium 500, `rgba(255,255,255,0.8)`, 18px.
  - **Interaction**: hovering a list item turns its text color to `#FF5931` (orange-red) AND swaps the right-column image to that case study's image. Default state: the first item ("Global Chess League S4") is active (orange-red text), and its image shows on the right.
  - **Show All button** (bottom-left of the column, margin-top `48px`): text `"Show All →"` in Geist Medium 500, white, 16px, `cursor: pointer`. Hover: text → `#FF5931`. **`href="#"` — no actual subpage yet.**
- **Right column** (60%):
  - **Top-right small caption**: replace the temporary text with: `"Verified results across smartphone launches, live sports broadcasting, and platform migrations. Hover any case to inspect."` — Geist Light 300, `rgba(255,255,255,0.5)`, 13px, text-align right, max-width `320px`, margin-bottom `24px`.
  - **Featured image** (below the caption): the image corresponding to the currently-hovered (or default-active) list item. `aspect-ratio: 4/3` or `1/1`, `border-radius: 24px`, `overflow: hidden`. File paths: `/images-for-landing-page/case-study-chess.png`, `case-study-kick.png`, `case-study-iqoo.png`, `case-study-monster.png`, `case-study-redbull.png`. Default: chess (latest).
  - **Image swap animation**: on list-item hover, fade the current image out (opacity 0, 150ms), swap `src` to the new file, fade in (opacity 1, 150ms). Use a `<img>` with `transition: opacity 150ms ease`.
  - **Caption below image**: title of the currently-shown case study — Geist Bold 700, white, 24px. Below it, a small metric line in Geist Mono: e.g., `"Multi-camera live broadcast · 9-day event"` for chess.

### Section 6 — Services

- **Background**: `#FFFFFF`.
- **Vertical padding**: `96px`.
- **Title**: `"Our Services"` — Geist Bold 700, `#000000`, `clamp(36px, 4vw, 56px)`, uppercase, centered.
  - **Two thin lines**: one above and one below the title, horizontally centered, each `width: 60px`, `height: 2px`, `background: #000000`, margin `16px 0` above and below the title.
- **Layout**: 3-column grid, equal width, gap `24px`, margin-top `64px`.
- **Cards** (default state — all three are black):
  - **Card**: `background: #000000`, `border-radius: 20px`, `padding: 40px`, `min-height: 280px`, `position: relative`, `overflow: hidden`, `transition: all 250ms ease`.
  - **Title**: Geist Bold 700, white, 24px, uppercase.
  - **Body**: Geist Light 300, `rgba(255,255,255,0.7)`, 15px, line-height 1.6, margin-top `12px`.
  - **Hidden button**: glassmorphism button hidden below the body, revealed on hover (see interaction).
- **Three cards**:
  1. **"For Brands"** — body: `"Campaigns, consulting & activations that reach India's 500M+ gamers — verified, measurable, and built for the room."`
  2. **"For Creators"** — body: `"Management, brand deals & platform partnerships for digital talent. The career infrastructure that turns a stream into a business."`
  3. **"For Platforms"** — body: `"Guaranteed talent migration & localized content strategies. The institutional partner for platforms entering Indian gaming."`
- **Interaction on hover**:
  - Title and body **slide up by 12px** (`transform: translateY(-12px)`, 250ms ease).
  - A glassmorphism button **fades in below** (opacity 0 → 1, 250ms ease, 100ms delay) — text per card:
    - For Brands: `"Start a Campaign"`
    - For Creators: `"Apply for Representation"`
    - For Platforms: `"Discuss Platform Partnership"`
  - Button style: glassmorphism (`rgba(255,255,255,0.08)` + `backdrop-filter: blur(20px)` + `border: 1px solid rgba(255,255,255,0.18)`), white text, Geist Medium 500, 14px, padding `12px 24px`, pill. Hover: bg → `rgba(255,89,49,0.2)`, border → `#FF5931`, text → `#FF5931`. **`href="#"` — no actual subpage yet.**
- **Know More button** (below the 3 cards, centered, margin-top `64px`): text `"Know More"` in Geist Medium 500, `#000000`, 16px, `cursor: pointer`, with a subtle underline. Hover: text → `#FF5931`. **`href="#"` — no actual subpage yet.**
- **Mobile**: 3 cards stack vertically, hover interaction still works (tap → reveal button).

### Section 7 — Founders (call the section "Founders", NOT "Backbones")

- **Background**: `#000000` curved from the top — `border-top-left-radius: 48px`, `border-top-right-radius: 48px`, with a `box-shadow: 0 -32px 64px rgba(0,0,0,0.4)` (drop shadow UP, onto the white Services section above). Vertical padding `120px top, 96px bottom`.
- **Title**: `"Founders"` — Geist Bold 700, white, `clamp(36px, 4vw, 56px)`, uppercase, centered, margin-bottom `64px`. (The user explicitly said "write founders not backbones.")
- **Layout**: 3-column grid, equal width, gap `24px`.
- **Cards** (red glassmorphism):
  - **Card**: `background: rgba(178, 28, 1, 0.15)` + `backdrop-filter: blur(20px)` + `border: 1px solid rgba(255, 255, 255, 0.18)`, `border-radius: 20px`, `padding: 32px`, `position: relative`, `min-height: 360px`. Hover: subtle lift `translateY(-4px)` + shadow increase.
  - **Top-left**: designation label — `"CEO & Founder"` / `"COO & Co-Founder"` / `"Chief Creator & Co-Founder"` — Geist Mono 400, `rgba(255,255,255,0.6)`, 11px, uppercase, letter-spacing `0.15em`.
  - **Top-right**: person photo — `width: 80px, height: 80px, border-radius: 50%` (circle), `object-fit: cover`, with a thin white stroke (`border: 2px solid rgba(255,255,255,0.4)`) AND a gradient background (use a palette gradient as the image's bg, e.g., `background: linear-gradient(135deg, #FFB658, #FF5931, #B21C01)` — this is the gradient BEHIND the person image, achieved by wrapping the `<img>` in a div with the gradient bg + padding). Also a thin white stroke on the card itself (already specified above).
  - **Name** (margin-top `24px`): `"Animesh Agarwal"` / `"Lokesh Jain"` / `"Naman Mathur"` — Geist Bold 700, white, 20px.
  - **Known name** (margin-top `4px`): `'"8Bit Thug"'` / `'"8Bit Goldy"'` / `'"Mortal"'` — Geist Regular 400, `#FF5931`, 14px, italic (or just regular — design choice).
  - **Body** (margin-top `16px`):
    - Thug: `"Pioneer of Indian gaming content. Started 8Bit in 2018 because no Indian gaming creator had a manager who actually understood the games. He still picks up the phone when Mortal calls."`
    - Goldy: `"Built the back office that turned 8Bit from a friend group into a company. Reviews every creator contract before it goes out. Leads esports operations and publisher relations."`
    - Mortal: `"The face of Indian gaming. Co-founded 8Bit because he wanted the next generation of creators to have the management he wished he had at 19. 4× Esports Awards nominee."`
    - Style: Geist Light 300, `rgba(255,255,255,0.7)`, 14px, line-height 1.6.
  - **Read More button** (bottom of card, margin-top `24px`): text `"Read More"` in Geist Medium 500, `#FF5931`, 13px, `cursor: pointer`, with a subtle underline. Hover: text → `#FFB658`. **`href="#"` — no actual subpage yet.**
- **File paths**: `/images-for-landing-page/founder-thug.png`, `founder-goldy.png`, `founder-mortal.png`. If missing, render a branded placeholder circle with the gradient bg + the founder's first initial in Geist Black 900, white.

### Section 8 — CTA

- **Background**: gradient continuing from the previous black Founders section, transitioning into red — `background: linear-gradient(180deg, #000000 0%, #B21C01 50%, #FF5931 100%)`. Curved from the bottom — `border-bottom-left-radius: 48px`, `border-bottom-right-radius: 48px`, with a `box-shadow: 0 32px 64px rgba(178, 28, 1, 0.4)` (drop shadow DOWN, onto the Footer below).
- **Vertical padding**: `120px top, 96px bottom`.
- **Layout**: centered text, max-width `800px`, margin `0 auto`.
- **Content**:
  - **Headline**: `"Let's Make the Moments that Count"` — Geist Regular 400 (NOT bold — user specified "title heading text is regular"), white, `clamp(36px, 5vw, 64px)`, line-height `1.1`, letter-spacing `-0.02em`, uppercase, text-align center. (Highlight "Moments" or "Count" in `#FFB658` — design choice.)
  - **Subtext** (margin-top `24px`): `"Whether you're planning a tier-1 product launch or looking for agency representation, our leadership team answers within 24 hours."` — Geist Light 300, `rgba(255,255,255,0.8)`, 18px, line-height 1.6, text-align center, max-width `600px`, margin `24px auto 0`.
  - **Button** (margin-top `48px`, centered): glassmorphism "Start a Campaign" — `background: rgba(255,255,255,0.12)`, `backdrop-filter: blur(20px)`, `border: 1px solid rgba(255,255,255,0.3)`, color white, Geist Medium 500, 16px, padding `18px 40px`, `border-radius: 999px`. Hover: bg → `rgba(255,255,255,0.2)`, border → `#FFFFFF`, 200ms ease. `href="#"` (no actual contact form yet).

### Section 9 — Footer

- **Background**: white-orange gradient (up-down) — `background: linear-gradient(180deg, #FFFFFF 0%, #FFB658 100%)`. Plus a foreground gradient image overlay (you create this — a soft radial glow from `#FF5931` at low opacity, positioned center-bottom, file path: `/images-for-landing-page/footer-foreground-overlay.png` — if missing, render the radial glow via CSS `radial-gradient(circle at 50% 100%, rgba(255, 89, 49, 0.3), transparent 70%)`).
- **Vertical padding**: `96px top, 48px bottom`.
- **Layout**:
  - **8Bit logo top-center**: a PNG or text-based mark — file path `/images-for-landing-page/footer-logo.png` (or render text "8BIT" in Geist Black 900, `#000000`, `48px`, centered). **Perspective / tilting hover effect** — on mouse move over the logo, it tilts in 3D following the cursor. Use JS:
    ```javascript
    const footerLogo = document.querySelector('.footer-logo');
    footerLogo.addEventListener('mousemove', (e) => {
      const rect = footerLogo.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      footerLogo.style.transform = `perspective(800px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;
    });
    footerLogo.addEventListener('mouseleave', () => {
      footerLogo.style.transform = 'perspective(800px) rotateY(0) rotateX(0)';
    });
    footerLogo.style.transition = 'transform 250ms ease';
    ```
  - **Address** (below the logo, centered, margin-top `24px`): `"C/o Hotel Matri Residency, Ground Floor, Patliputra Colony Road, Kankarbagh, Patna, Bihar, India — 800018"` — Geist Regular 400, `rgba(0,0,0,0.6)`, 13px, text-align center, max-width `400px`, margin `0 auto`.
  - **Social icons row** (below address, centered, margin-top `24px`): LinkedIn, Instagram, YouTube, Twitter/X — each as a circular glassmorphism button (`background: rgba(255,255,255,0.4)`, `backdrop-filter: blur(10px)`, `border: 1px solid rgba(0,0,0,0.1)`, `border-radius: 50%`, `width: 40px, height: 40px`, flex-centered icon). Icons in `#000000`. Hover: bg → `rgba(255,89,49,0.3)`, icon → `#FF5931`. Use Font Awesome or inline SVG icons.
  - **Below the social row, a 3-column grid** (margin-top `64px`):
    - **Left column** (redirections):
      - Links: `"Home"`, `"About"`, `"Creators"`, `"Work"`, `"Services"`, `"Founders"`, `"Contact"` — Geist Medium 500, `#000000`, 15px, stacked vertically with `8px` gap. Hover: text → `#FF5931`. `href="#"` for each (subpages come later).
      - Below the links, the **copyrights line**: `"© 2026 8Bit Creatives. All rights reserved."` — Geist Light 300, `rgba(0,0,0,0.5)`, 12px, margin-top `24px`.
    - **Center column** (empty or thin spacer — the address already lives above the socials in the center, so this column can be empty or contain a small "Back to Top" link: `"↑ Back to Top"`, Geist Medium 500, `#000000`, 14px, `cursor: pointer`, hover → `#FF5931`).
    - **Right column** (enquiry):
      - Heading: `"Enquiry"` — Geist Bold 700, `#000000`, 18px.
      - Below it: `"business@8bitcreatives.in"` — Geist Regular 400, `#000000`, 15px, `mailto:` link, hover → `#FF5931` + underline.
      - Below it (margin-top `16px`): `"For press, partnerships, or talent inquiries — we respond within 24 hours."` — Geist Light 300, `rgba(0,0,0,0.6)`, 13px, line-height 1.6, max-width `280px`.
      - Below it (margin-top `24px`): `"Privacy Policy"` — Geist Medium 500, `#000000`, 13px, `cursor: pointer`, hover → `#FF5931`. `href="#"`.
  - **Below the 3-column grid, the signature line** (centered, margin-top `64px`): `"Made with ❤️ by Divyaraj Chauhan"` — Geist Regular 400, `rgba(0,0,0,0.7)`, 13px. The text `"Divyaraj Chauhan"` is a link — `color: #000000`, `font-weight: 700`, `text-decoration: underline`, `href="https://divyarajchauhan.in"`, `target="_blank"`. Hover: text → `#FF5931`.
  - **Thin divider line** (margin-top `24px`): `1px solid rgba(0,0,0,0.15)`, full width.
  - **Below the divider, the 8BITCreatives wordmark** (centered, margin-top `32px`): `"8BIT"` in Geist Black 900 + `"Creatives"` in Geist Thin 100 — both in `#000000`, size `clamp(40px, 5vw, 64px)`, line-height 1, letter-spacing `-0.04em`. The mix of black + thin weights is the signature touch the user requested.

### Closing — `</body>` and `</html>`

After all 9 sections are built, add the JS initializations at the end of `<body>`:
```html
<script src="app.js"></script>
<script>
  // Initialize all interactions after DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    initHeroCanvas();        // particle canvas (only if logo_2.png exists)
    initMarquee();           // about-section brand marquee (CSS-driven, no JS needed unless pause-on-hover)
    initEclipseRotation();  // CSS-driven, no JS — but verify the @keyframes are in styles.css
    initCounterAnimation(); // stats bar count-up on scroll-into-view
    initCaseStudyHover();   // case studies list hover → image swap
    initServicesHover();    // services cards slide-up + button reveal (CSS-driven, but verify)
    initFooterLogoTilt();   // footer logo perspective tilt on mouse move
    initScrollReveal();     // generic IntersectionObserver fade-up for all .reveal elements
  });
</script>
```

---

## ✅ Final Definition of Done

The landing page is complete when ALL of the following are true:

1. `index.html` exists at project root, double-clickable, runs in any modern browser without errors.
2. `styles.css` (or inline `<style>`) contains only the 6 palette hexes + `#FF4D00` (canvas only). No other hex anywhere.
3. `app.js` (or inline `<script>`) contains the hero canvas init, stats counter, case-study hover, footer logo tilt, and scroll-reveal observers. No JS errors in the console.
4. Geist is the only font loaded. Verify in DevTools → Network → Fonts.
5. All 9 sections render correctly at 1440px, 768px, and 375px viewports.
6. The hero canvas particle logo initializes from `/images-for-landing-page/logo_2.png` (or a branded placeholder if the file isn't there yet) and reacts to mouse hover.
7. The about-section red eclipse rotates anti-clockwise at 60s, the 3 curve rings rotate with it, and the character PNGs sit on the rings (not in the red core).
8. The marquee scrolls seamlessly with the clockwise-rotating icon on the extreme left.
9. The stats numbers are 50+ / 100M+ / 3B+ / 300+ with the correct single-line captions (not the placeholder "1% Expert-Vetted" garbage).
10. The creators section has 5 cards (Mortal centered, Payal + Snax on the sides, 2 placeholder creators on the outer edges), 4:5 curved-corner images, tappable Instagram + YouTube numbers that turn red on tap and link to the platforms.
11. The case studies section shows Global Chess League S4 as the latest (top of the list), hover swaps the right-side image with a 150ms fade.
12. The services section has 3 black cards, all with the slide-up + glassmorphism button reveal on hover, with the 3 different button labels (Start a Campaign / Apply for Representation / Discuss Platform Partnership).
13. The founders section is labeled "Founders" (NOT "Backbones"), has 3 red glassmorphism cards with the correct bios, person images have palette-gradient backgrounds behind them, and the section is curved-top with a drop shadow up.
14. The CTA section continues the black-to-red gradient from the Founders section, has the glassmorphism "Start a Campaign" button, and is curved-bottom with a drop shadow down.
15. The footer has the perspective-tilt logo, the correct address, glassmorphism social icons, the "Made with ❤️ by Divyaraj Chauhan" line linking to `https://divyarajchauhan.in`, and the 8BITCreatives wordmark at the very bottom with Black 900 + Thin 100 weight mix.
16. All buttons (`View All`, `Show All`, `Know More`, `Read More`, `Explore Creators`, `Start Campaign`, `About Us`) have `href="#"` and visible hover states — no actual subpage routing yet.
17. The page passes a Lighthouse audit with performance ≥ 85, accessibility ≥ 90, best practices ≥ 90, SEO ≥ 90.

**No follow-up questions. Iterate internally until all 17 items are true. Then deliver the final `index.html` + `styles.css` + `app.js` (+ any image placeholders you had to render).**
