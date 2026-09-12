\`\`\`\`markdown  
\# 8Bit Creatives — Brand Identity & UI/UX Design System

\> \*\*Project:\*\* 8Bit Creatives Website Build  
\> \*\*Phase:\*\* 3 — Brand Direction, Design System & Implementation Specification  
\> \*\*Inputs:\*\* Phase 1 (Research), Phase 2 (Sitemap & Wireframes)  
\> \*\*Source of Brand Evidence:\*\* 8Bit Creatives' official social announcement graphics (creator award announcements, brand collaboration posts — Snax Gaming "Gaming Icon of the Year", Kaashvi "DG Gaming Female Influencer", iQOO x S8UL collaboration, Payal "Creator of the Year — Female")  
\> \*\*Purpose of this document:\*\* Complete handoff specification. Every visual rule, token, component, motion effect and copy line needed to build the final website. Written in directive language so a build agent can implement directly without interpretation gaps.

\---

\#\# HOW TO READ THIS DOCUMENT

Throughout this document you will find blocks like this:

\> \*\*\`\[DIRECTIVE\]\`\*\* — Implement exactly this. These are machine-actionable instructions for the build.

Everything outside directive blocks is context and rationale. When context and directive conflict, the directive wins.

\---

\# PART A — BRAND FOUNDATION

\#\# A1. Where This Brand Identity Comes From

No official brand guideline document exists publicly for 8Bit Creatives. The brand DNA below is reverse-engineered from their own published announcement graphics — the most authentic expression of how 8Bit presents itself. Every choice in this system traces to something visible in those graphics.

\#\#\# What the source graphics show, element by element:

| Element Observed | Description | How We Use It |  
|---|---|---|  
| \*\*Vivid orange\*\* | Large flat orange color blocks and angular shapes dominate every graphic | Primary brand color, used as confident geometric blocks — never as timid accents |  
| \*\*Off-white / warm grey base\*\* | Backgrounds are not pure white — a warm paper-like off-white with visible texture | Page background base color |  
| \*\*Bold extended sans display type\*\* | Names like "SNAX GAMING", "PAYAL", "KAASHVI" set in heavy, wide, all-caps sans | Display/heading typography direction |  
| \*\*Black & white duotone portraits\*\* | Hero photos treated as grayscale/duotone, cut out and layered over color blocks | Standard treatment for all creator photography |  
| \*\*Angled / diagonal geometric shapes\*\* | Diamond forms, slanted rectangles, corner cut-outs, split backgrounds | Decorative shape language system |  
| \*\*Pill badges & label chips\*\* | "GAMING ICON OF THE YEAR", "WINNER", "BEST MOMENT" — small uppercase labels inside pills | Badge/chip component system |  
| \*\*Collage layering\*\* | Photos overlap geometric blocks, secondary photos in background at low opacity, torn/stepped edges | Editorial section composition style |  
| \*\*Gold accents (awards context)\*\* | Confetti, foil texture, gold text on "CREATOR OF THE YEAR" | Reserved accent for achievements, awards, milestones only |  
| \*\*Dark charcoal panels\*\* | Deep near-black blocks used for contrast sections and text panels | Dark section treatment |  
| \*\*Logo lockups\*\* | 8Bit/S8UL marks placed as small corner stamps — never oversized | Logo used as a stamp/seal, modest and confident |  
| \*\*Real photography, always\*\* | No stock imagery, no illustrations — real creators, real moments | Photo policy: authentic photography only |

\#\#\# Brand personality (one line):  
\*\*Confident, loud-but-professional, award-culture energy built on real people — a brand that celebrates its creators like champions.\*\*

\#\#\# The three brand tensions the design must balance (from research):  
1\. \*\*Gaming energy ↔ Agency professionalism\*\* (clients must trust it, creators must love it)  
2\. \*\*Loud graphics ↔ Clean usability\*\* (Opraah/Chtrbox discipline, 8Bit soul)  
3\. \*\*Editorial calm ↔ Award-night celebration\*\* (white base sections, explosive highlight moments)

\*\*Resolution rule:\*\* 90% of the site is the calm, professional, off-white editorial system. 10% — hero, Kick page, award/achievement moments, final CTAs — gets the full loud graphic treatment. This contrast is what makes both registers feel intentional.

\---

\#\# A2. Brand Platform

\- \*\*Positioning:\*\* India's gaming-native talent agency — the people who turned Indian gaming creators into champions.  
\- \*\*Tagline (primary):\*\* \*\*"The creators behind India's gaming revolution."\*\*  
\- \*\*Support line:\*\* "50+ of India's biggest gaming creators. One agency. Built by gamers, run like a business."  
\- \*\*Tone of voice:\*\* Confident, direct, celebratory, zero corporate filler. Short sentences. Numbers as proof. Speaks \*about\* creators the way award shows introduce champions.  
\- \*\*Voice rules:\*\*  
  \- Never say "we are excited to announce" — say what happened.  
  \- Never say "leveraging synergies" — say what the brand gets.  
  \- Creators are named like headliners, in caps or display type.  
  \- Every claim gets a number near it.

\> \*\*\`\[DIRECTIVE — Copy Voice\]\`\*\* — All website copy follows these rules: max 2-line paragraphs on marketing sections; sentence-case for body text; ALL-CAPS reserved for display headlines, badges and stat labels; every section heading is either a bold claim ("Campaigns with receipts.") or a direct address ("Your audience is in the game."); no exclamation marks except in celebration contexts (award/announcement ticker).

\---

\#\# A3. Color System

\#\#\# Core palette (extracted from source graphics)

| Token | Hex | Role | Source Evidence |  
|---|---|---|---|  
| \`--8bit-orange\` | \`\#FF4D00\` | Primary brand color. CTAs, key accents, geometric blocks, active states | Dominant block color in all four posts |  
| \`--8bit-orange-deep\` | \`\#E03D00\` | Hover/pressed state of orange, gradient partner | Darker shade for depth |  
| \`--8bit-cream\` | \`\#F2EFE9\` | Primary page background (warm off-white) | Paper-textured backgrounds in posts |  
| \`--8bit-ink\` | \`\#141414\` | Primary text, dark sections, headers/footer | Charcoal panels, black typography |  
| \`--8bit-white\` | \`\#FFFFFF\` | Cards, surfaces on cream background | White content cards in posts |  
| \`--8bit-gold\` | \`\#D9A400\` | Achievement/award/milestone accent ONLY | "Creator of the Year" gold treatment |  
| \`--8bit-grey-mid\` | \`\#8A877F\` | Secondary text, captions, inactive states | Muted greys in background layers |  
| \`--8bit-line\` | \`\#DDD9D0\` | Hairline borders, dividers on cream | Subtle card borders |

\#\#\# Functional color rules

\> \*\*\`\[DIRECTIVE — Color Usage\]\`\*\*  
\> \- Orange is for \*\*action and emphasis\*\*: primary buttons, active filter states, hover highlights, geometric background shapes behind heroes, the metric number in case-study cards. Never use orange for long body text.  
\> \- Dark ink sections (\`\#141414\`) are used for: hero, Kick page, footer, "final CTA" bands, and any full-bleed celebration moment. On dark sections, text is cream/white and orange remains the accent.  
\> \- Gold appears ONLY where something/someone has won or achieved: awards mentions, milestone counters ("300th campaign"), the "Industry First" badge on the Kick page, winner-type badges on creator profiles. If there is no achievement, there is no gold.  
\> \- Do not introduce any new hues. No blues, greens or purples anywhere in the 8Bit UI. (Exception: the Kick page may use Kick's own green \`\#53FC18\` strictly inside partnership-branded components per the wireframe doc — that is their mark, not ours.)

\#\#\# Color pairings (approved combinations only)

\> \*\*\`\[DIRECTIVE — Pairings\]\`\*\*  
\> 1\. Cream background \+ ink text \+ orange accents (default)  
\> 2\. White cards on cream \+ ink text \+ orange active states  
\> 3\. Ink dark background \+ cream text \+ orange accents (hero, footer, Kick, CTA bands)  
\> 4\. Orange background block \+ white/ink text (section highlights, stat blocks, badges) — only with the extended display font, minimum font size 16px  
\> 5\. Cream \+ gold accents (achievements only)

\#\#\# Gradients

\> \*\*\`\[DIRECTIVE — Gradients\]\`\*\* — Only one gradient exists in the system: \`linear-gradient(135deg, \#FF4D00 0%, \#E03D00 100%)\` for primary button hover and hero background shape fills. Additionally, a black-to-transparent overlay gradient is permitted on photography for text legibility. Nothing else. No rainbow, no mesh, no neon.

\---

\#\# A4. Typography

The source graphics use a heavy, slightly extended, all-caps grotesque for names/headlines and clean utilitarian type for labels. The Google-font pairing below reproduces that character with reliable web performance.

\#\#\# Type stack

| Role | Font | Weights | Usage |  
|---|---|---|---|  
| \*\*Display\*\* | \*\*Archivo\*\* (use Expanded variant where available, fallback Archivo Black) | 800 / 900 | H1, H2, creator names, giant stat numbers, badges with caps |  
| \*\*Body\*\* | \*\*Space Grotesk\*\* | 400 / 500 / 700 | Paragraphs, navigation, forms, captions |  
| \*\*Mono/Stat accent\*\* | \*\*Space Grotesk\*\* (tabular figures) or \*\*JetBrains Mono\*\* (500) | 500 | Stat labels, tickers, section tags ("01 — THE ROSTER"), HUD-style chips |

\> \*\*\`\[DIRECTIVE — Fonts\]\`\*\*  
\> \- Load via Google Fonts with \`display=swap\`. Preload Archivo 800/900 and Space Grotesk 400/700 subsets.  
\> \- Display font is ALWAYS uppercase with \`letter-spacing: 0.01em\` and \`line-height: 0.95–1.05\`.  
\> \- Body line-height is 1.6, sentence case, \`letter-spacing: 0\`.  
\> \- Never use the display font below 24px. Never use it for body copy.

\#\#\# Type scale (clamp-based, fluid)

\> \*\*\`\[DIRECTIVE — Type Scale\]\`\*\* — Implement exactly:  
\> \- \`--text-display-xl\`: \`clamp(44px, 8vw, 104px)\` — hero H1  
\> \- \`--text-display-l\`: \`clamp(36px, 5.5vw, 72px)\` — section H2, giant metrics  
\> \- \`--text-display-m\`: \`clamp(28px, 3.5vw, 48px)\` — card names, stat numbers on cards  
\> \- \`--text-h3\`: \`clamp(20px, 2vw, 28px)\` — sub-headings  
\> \- \`--text-body\`: \`clamp(16px, 1.1vw, 18px)\` — body copy  
\> \- \`--text-small\`: \`14px\` — captions, meta  
\> \- \`--text-micro\`: \`12px\` — badges, section tags (always uppercase, \`letter-spacing: 0.12em\`)

\---

\#\# A5. Shape & Graphic Language

This is what makes the site recognizably "8Bit" rather than a generic agency template. All drawn from the source graphics.

\#\#\# 5.1 Signature shapes

\> \*\*\`\[DIRECTIVE — Shape Library\]\`\*\* — Build these as reusable SVG/CSS components:  
\>  
\> 1\. \*\*The Diamond\*\* — a rotated square (45°) used as: list bullets, decorative accents next to headings, pattern elements on dark sections. Sizes: 8px (bullet), 16px (accent), 64–160px (decorative). Color: orange on cream, orange or gold on ink.  
\> 2\. \*\*The Slant Block\*\* — background rectangle with a skewed edge: \`clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%)\` or mirrored. Used behind hero text blocks and section headers. Orange or ink fill.  
\> 3\. \*\*The Corner Cut\*\* — cards and images get one cut corner: \`clip-path: polygon(0 0, calc(100% \- 24px) 0, 100% 24px, 100% 100%, 0 100%)\` (top-right cut). Used on creator cards, case study cards, and buttons (8px cut on buttons). This is the signature card shape — consistent everywhere.  
\> 4\. \*\*The Step Stack\*\* — 2–3 offset rectangles layered behind photos (like layered paper), each offset 12–16px down-right, alternating orange/ink/transparent-outline. Used on featured creator portraits and team photos.  
\> 5\. \*\*The Stamp\*\* — small rotated badge (-4° to \-6°) with uppercase micro text, used for "INDUSTRY FIRST", "WINNER", "NEW" style callouts. Orange or gold fill, white text.

\#\#\# 5.2 Background textures

\> \*\*\`\[DIRECTIVE — Textures\]\`\*\*  
\> \- Cream background sections get a \*\*subtle paper-grain noise\*\*: an SVG feTurbulence noise overlay at 3–4% opacity, fixed (non-animated). This reproduces the textured feel of the source graphics.  
\> \- Dark sections get a \*\*faint diamond pattern grid\*\*: rotated squares at 4% white opacity, spacing 120px, static.  
\> \- Never use both textures in the same viewport.  
\> \- Decorative shape density rule: max 3 decorative shapes per viewport. Shapes never sit under body text paragraphs.

\#\#\# 5.3 Photography treatment (critical to brand accuracy)

\> \*\*\`\[DIRECTIVE — Photo Treatment\]\`\*\*  
\> \- All creator/team portraits use \*\*duotone treatment\*\*: grayscale base (\`filter: grayscale(1) contrast(1.05)\`), with an orange multiply overlay at 0–100% depending on context — full orange duotone on award/hero contexts, plain grayscale on directory cards.  
\> \- \*\*Hover behavior on all portrait cards:\*\* grayscale → full color, 400ms ease. This is the site's signature micro-interaction (repeated from wireframe doc — implement sitewide on every portrait).  
\> \- Photos are cut out (subject) over geometric blocks where the composition calls for it (hero, team section, featured creators). Directory cards may use rectangular photos with the corner-cut clip-path.  
\> \- Only real photography. No illustrations, no avatars, no stock. Placeholder portraits during build must still be real-photo style (grayscale) so the design reads correctly.

\#\#\# 5.4 Logo usage

\> \*\*\`\[DIRECTIVE — Logo\]\`\*\*  
\> \- Use the 8Bit mark (from their socials) as provided. If only a low-res version exists, place it at small sizes only (max 40px header height, max 64px footer height) where resolution is not noticeable — matching the "corner stamp" usage seen in their graphics.  
\> \- Never stretch, recolor, outline or animate the logo beyond a simple opacity/translate on page load.  
\> \- Footer uses the mark \+ wordmark large (wordmark may be re-set in Archivo 900 uppercase if a clean vector is unavailable).

\---

\#\# A6. Iconography & Imagery Rules

\> \*\*\`\[DIRECTIVE — Icons\]\`\*\*  
\> \- Icon library: Lucide (stroke icons, 1.5–2px stroke). Single color, inherits text color. Sizes: 16/20/24px only.  
\> \- Platform icons (YouTube, Instagram, Kick, X) use brand-accurate simple glyphs in monochrome (ink on light, cream on dark), EXCEPT Kick which may use its green only on the Kick page.  
\> \- No emoji anywhere in the UI.

\---

\# PART B — UI SYSTEM & COMPONENTS

\#\# B0. Design Tokens (single source of truth)

\> \*\*\`\[DIRECTIVE — Tokens\]\`\*\* — Implement as CSS custom properties at \`:root\` (and mirror in Tailwind config if Tailwind is used):  
\>  
\> \`\`\`css  
\> :root {  
\>   /\* Color \*/  
\>   \--orange: \#FF4D00;  
\>   \--orange-deep: \#E03D00;  
\>   \--cream: \#F2EFE9;  
\>   \--ink: \#141414;  
\>   \--white: \#FFFFFF;  
\>   \--gold: \#D9A400;  
\>   \--grey-mid: \#8A877F;  
\>   \--line: \#DDD9D0;  
\>  
\>   /\* Type \*/  
\>   \--font-display: 'Archivo', sans-serif;  
\>   \--font-body: 'Space Grotesk', sans-serif;  
\>   /\* …type scale tokens from A4… \*/  
\>  
\>   /\* Space — 4px base scale \*/  
\>   \--s1: 4px; \--s2: 8px; \--s3: 12px; \--s4: 16px; \--s6: 24px;  
\>   \--s8: 32px; \--s12: 48px; \--s16: 64px; \--s24: 96px; \--s32: 128px;  
\>  
\>   /\* Shape \*/  
\>   \--cut-card: polygon(0 0, calc(100% \- 24px) 0, 100% 24px, 100% 100%, 0 100%);  
\>   \--cut-button: polygon(0 0, calc(100% \- 8px) 0, 100% 8px, 100% 100%, 0 100%);  
\>   \--radius-pill: 999px;  
\>  
\>   /\* Motion \*/  
\>   \--ease-out: cubic-bezier(0.22, 1, 0.36, 1);  
\>   \--dur-fast: 200ms; \--dur-med: 400ms; \--dur-slow: 700ms;  
\>  
\>   /\* Elevation — flat brand, shadows used sparingly \*/  
\>   \--shadow-card: 0 8px 24px rgba(20,20,20,0.08);  
\>   \--shadow-hover: 0 16px 40px rgba(20,20,20,0.14);  
\> }  
\> \`\`\`

\#\# B1. Buttons

\> \*\*\`\[DIRECTIVE — Buttons\]\`\*\*  
\> \- \*\*Primary:\*\* orange fill, white text, Archivo 800 uppercase, \`letter-spacing: 0.04em\`, corner-cut clip-path (8px), padding 16px 32px. Hover: gradient fill (--orange → \--orange-deep), translate the button up 2px, and a \*\*sheen sweep\*\* — a white 20%-opacity diagonal stripe crosses the button left→right over 500ms once per hover.  
\> \- \*\*Secondary:\*\* transparent, 2px ink border, ink text, same shape. Hover: ink fill, cream text. On dark sections: 2px cream border / cream fill hover.  
\> \- \*\*Ghost/Enquire (on cards):\*\* appears on hover, orange text with arrow icon that slides 4px right on hover.  
\> \- All buttons: active state scales to 0.98. Focus-visible: 2px orange outline offset 3px (accessibility).  
\> \- Button text never wraps; labels max 22 characters ("START A CAMPAIGN", "JOIN THE ROSTER", "VIEW FULL ROSTER", "SEE ALL WORK").

\#\# B2. Badges, Chips & Section Tags

\> \*\*\`\[DIRECTIVE — Badge System\]\`\*\*  
\> \- \*\*Section tag\*\* (above every H2): micro caps, Space Grotesk 500, 12px, \`letter-spacing: 0.12em\`, format \`01 — THE ROSTER\` with the number in orange. Preceded by an 8px orange diamond. Fades in on scroll with 6px upward offset.  
\> \- \*\*Stat chip\*\* (creator cards, profiles): pill, white bg on light / ink bg on dark, 1px line border, format \`1M+ · YT\` — number in Archivo 800, platform in Space Grotesk.  
\> \- \*\*Winner/Award stamp:\*\* rotated (-5°) orange or gold rectangle, white micro caps text, drop shadow. Used on award contexts only.  
\> \- \*\*Filter pill:\*\* default \= white bg \+ line border; hover \= ink border; active \= orange fill \+ white text. Animated background fill transition 200ms.

\#\# B3. Cards

\> \*\*\`\[DIRECTIVE — Cards\]\`\*\* — Three card types, all share: corner-cut top-right, white bg, 1px line border, \--shadow-card resting state.  
\>  
\> \*\*Creator card (directory):\*\*  
\> \- Portrait 3:4, grayscale → color on hover (400ms), subtle scale(1.03) on image.  
\> \- Below photo: NAME (Archivo 800, caps, \--text-display-m clamp down to 20px), genre tag chip, platform icon row, follower stat chip.  
\> \- Hover: card translateY(-4px), shadow-hover, orange 3px left border slides in, "ENQUIRE →" ghost button fades in at bottom (opacity 0→1, 200ms delay 100ms). Entire card is a link to profile.  
\>  
\> \*\*Case study card (work index & home):\*\*  
\> \- Thumbnail 16:10 with duotone treatment; on hover the thumbnail's overlay lifts to reveal color.  
\> \- Hero metric in Archivo 900 at \~48px in orange (e.g., "42M") \+ metric label in micro caps below it ("VIEWS").  
\> \- Client name \+ campaign title, meta row (creators count · duration).  
\> \- Hover: same lift behavior as creator card.  
\>  
\> \*\*Service/feature card (For Creators benefits, What We Do):\*\*  
\> \- Icon in a 48px orange-tinted square (orange at 10% bg, orange icon), H3, 2-line description. Hover: icon square fills solid orange, icon turns white, 250ms.

\#\# B4. Navigation

\> \*\*\`\[DIRECTIVE — Header\]\`\*\*  
\> \- Sticky, transparent over the hero (cream text on dark hero / ink text on light hero), gains cream background \+ bottom 1px line \+ backdrop-blur(8px) after 40px scroll.  
\> \- Left: logo mark. Center/right: ABOUT · SERVICES · TALENT · WORK · KICK (KICK carries a tiny green Kick glyph as its badge, per wireframe doc). Right: primary button "START A CAMPAIGN".  
\> \- Link hover: an 8px orange diamond fades in before the label AND a 2px orange underline scales from left (transform-origin left, 250ms). Only one animation — do not stack both; choose the diamond on the active page indicator and the underline for hover.  
\> \- Active page: orange diamond permanently shown before the label.  
\> \- Mobile: full-screen ink overlay menu, staggered link entrance (60ms stagger, fade+slide up), links in Archivo 800 at 32px caps, close icon top-right, CTA button pinned at bottom. Menu opens with 300ms clip-path reveal from top.

\#\# B5. Ticker Bar

\> \*\*\`\[DIRECTIVE — Ticker\]\`\*\* — Top announcement strip (above header) on ink background, 36px height: infinite marquee of the Kick announcement text separated by 8px orange diamonds, \~40px/second, pauses on hover, micro caps Space Grotesk, cream text with "48" and "Kick" in orange. Click anywhere → /kick. On /kick page itself, the ticker hides (don't announce the page on the page).

\#\# B6. Forms

\> \*\*\`\[DIRECTIVE — Forms\]\`\*\*  
\> \- Inputs: white bg, 1px line border, 2px corner radius (keep square-ish, brand is angular), padding 14px 16px, Space Grotesk.  
\> \- Focus: border turns orange \+ a 2px orange bottom border animates in (scaleX from left). No glow rings.  
\> \- Labels: micro caps above inputs. Required marker: orange asterisk.  
\> \- Dropdowns (campaign type, platform, budget): custom-styled to match inputs, with a chevron that rotates 180° on open.  
\> \- Submit \= primary button. On submit: button shows loading state (three orange dots pulse). Success state: full-panel swap with a large orange diamond containing a white check icon, headline "Received." and the confirmation copy from the wireframe doc. Failure: inline red-error is NOT allowed (off-palette) — use ink text on a gold-tinted \`\#FBF3DC\` background strip for warnings.

\#\# B7. Footer

\> \*\*\`\[DIRECTIVE — Footer\]\`\*\* — Ink background. Top row: giant wordmark "8BIT CREATIVES" in Archivo 900, cream, clamp(48px, 10vw, 140px), with the "8BIT" in cream and "CREATIVES" outlined (text-stroke 2px cream, transparent fill). Below: 4 columns (Sitemap / Services / Contact / Social) \+ the stats line from the wireframe doc ("50+ creators · 100M+ community · est. 2019") in mono-style with orange diamonds as separators. Bottom bar: © line \+ "Made for Indian gaming." Social icons hover: turn orange \+ translateY(-2px).

\---

\# PART C — MOTION SYSTEM

\#\# C1. Motion Philosophy

\> \*\*\`\[DIRECTIVE — Motion Philosophy\]\`\*\* — Motion exists to create \*\*rhythm and reward\*\*, like a match HUD coming alive — never to decorate. Global rules:  
\> \- Everything animates ONCE on first scroll-into-view, then stays static (except explicit loops: ticker, marquee, hero video).  
\> \- Duration scale: micro 200ms / standard 400ms / cinematic 700ms. Easing: \`cubic-bezier(0.22, 1, 0.36, 1)\` everywhere.  
\> \- Stagger rhythm: 60–80ms between sibling items, max 8 items per stagger group.  
\> \- Total page motion budget: no more than 3 simultaneously animating elements per viewport at rest.

\#\# C2. Scroll Choreography

\> \*\*\`\[DIRECTIVE — Scroll Reveal\]\`\*\* — Implement a single reveal system (IntersectionObserver or GSAP ScrollTrigger):  
\> \- \*\*Section tags:\*\* fade \+ translateY(6px→0).  
\> \- \*\*H2 headlines:\*\* split into lines; each line rises 24px with 80ms stagger, clipped overflow (mask reveal).  
\> \- \*\*Cards/grids:\*\* fade \+ translateY(32px→0) with 70ms stagger.  
\> \- \*\*Metric blocks / stat numbers:\*\* number \*\*counts up\*\* over 1.2s with ease-out, starting 200ms after the block fades in. Formatting preserved (e.g., "3B+", "42M" — animate the numeric part, suffix static).  
\> \- \*\*Stat badges (chips):\*\* scale 0.9→1 with overshoot (spring-ish via ease-out-back at low intensity).  
\> \- \*\*Diamond bullets:\*\* rotate 45°→90° on reveal.  
\> \- Respect \`prefers-reduced-motion\`: all reveals become instant opacity 1, counters render final values, ticker becomes static text.

\#\# C3. Signature Interactions (the memorable moments)

\> \*\*\`\[DIRECTIVE — Signature Effects\]\`\*\* — Build these five exactly; they carry the site's personality:  
\>  
\> 1\. \*\*Hero Grid Reveal:\*\* The homepage hero (per wireframe: 2×2 creator video collage behind headline) — on load, four video panels fade in sequentially (150ms apart), then the H1 mask-reveals line by line, then the two CTAs rise. Total under 1.5s. Videos: muted, looped, \`playsinline\`, grayscale-with-orange-duotone via CSS overlay; on hover of each quadrant that clip plays in color.  
\> 2\. \*\*The Level Counter:\*\* section tags across the homepage increment like levels (01, 02, 03…) — implemented as static per-section text (no JS trickery needed), but each tag flashes orange once when it enters viewport.  
\> 3\. \*\*Duotone-to-Color portraits:\*\* sitewide (already specified in B3) — this repetition IS the brand interaction. Never vary its timing.  
\> 4\. \*\*Marquee rows (logo wall):\*\* two rows scrolling opposite directions, 30s/loop, pause on hover, logos grayscale → color on individual logo hover.  
\> 5\. \*\*Playbook Stepper (The 8Bit Playbook, /brands):\*\* progress line fills with orange toward the active node (600ms ease); step content crossfades \+ slides 16px; auto-advance every 5s when in view, pauses on hover/interaction; clicking a node jumps instantly and stops autoplay permanently for that session.  
\>  
\> \*\*\`\[DIRECTIVE — Anti-Motion List\]\`\*\* — Do NOT add: parallax on text, cursor-following blobs, 3D WebGL scenes, confetti animations, loading screens/spinners on navigation, scroll-jacking, auto-playing carousels of testimonials, or any bounce/elastic easing on layout elements.

\---

\# PART D — PAGE-BY-PAGE UI SPECIFICATION

(Extends the wireframe document — this adds the \*visual\* layer to each page. Wireframe structure remains authoritative for layout/order.)

\#\# D1. HOME \`/\`

\> \*\*\`\[DIRECTIVE — Home Hero\]\`\*\*  
\> \- Ink background with faint diamond pattern texture. 2×2 video collage of creators, right-aligned occupying 55% width on desktop (stacked behind/below on mobile at 30% opacity under a gradient for legibility).  
\> \- Slant block (orange, clipped edge) sits behind the section tag only — small, precise, like the source graphics.  
\> \- H1 in cream, Archivo 900: "THE CREATORS BEHIND INDIA'S GAMING REVOLUTION." — with "GAMING REVOLUTION" in orange. Line-break control: 3 lines max on desktop.  
\> \- Sub in Space Grotesk, grey-mid-on-dark \`\#B8B4AB\`: "We manage 50+ of India's biggest gaming creators and build campaigns brands can measure."  
\> \- Dual CTA per wireframe. Scroll indicator: a small orange diamond bouncing subtly (2px amplitude) at bottom center — the only allowed idle animation on this page besides video.

\> \*\*\`\[DIRECTIVE — Home Sections 2–8\]\`\*\*  
\> \- Stats band: cream background, five METRIC-BLOCKs (Archivo 900 numbers in ink, labels micro caps grey-mid, 1px vertical dividers between). Numbers count up per C2.  
\> \- The Roster (horizontal scroll): featured cards use the Step Stack shape behind the first and last visible card only. Drag-to-scroll with grab cursor; arrow buttons (ink squares with cream chevrons, corner-cut) that nudge scroll by one card width.  
\> \- Kick feature block: ink section, Kick glyph, "FIRST MOVERS, BY DESIGN." H2 in cream with "FIRST" in Kick green \`\#53FC18\` (allowed here as partnership mark), right side embed. Add the gold "INDUSTRY FIRST" stamp rotated on the block's corner.  
\> \- Selected Work: three case-study cards (B3 spec) on cream.  
\> \- What We Do: three service cards on white; card titles in Archivo 800 caps; EXPLORE links with sliding-arrow ghost buttons.  
\> \- Logo marquee: two rows per C3-4.  
\> \- Founders strip: four portraits with Step Stack treatment, credential line reveals on hover (from wireframe doc).  
\> \- Final CTA band: split — left half ink with slant-block divider into right half orange. Left: "GOT A GAME PLAN?" \+ brand CTA (secondary/cream-outline style since bg is dark). Right: "GOT THE SKILLS?" \+ Join button (ink button on orange). This split-slab composition directly echoes the source graphics' split-block layout.

\#\# D2. ABOUT \`/about\`

\> \*\*\`\[DIRECTIVE — About\]\`\*\*  
\> \- Hero on cream: section tag "WHO WE ARE", H1 "BUILT BY GAMERS. RUN LIKE A BUSINESS." — "BUILT BY GAMERS" in orange.  
\> \- Timeline: horizontal scroll strip on desktop; each node is a white card (corner-cut) with the year in Archivo 900 orange, headline, one-liner; the 2025 Kick node gets the gold stamp treatment ("INDUSTRY FIRST"). Connecting line: 2px ink with diamond nodes.  
\> \- Mission block: full-width ink section, oversized quote in Archivo 800 cream at \--text-display-l, with the words "IT'S A CULTURE" in orange. Open/close with large orange quote-diamonds.  
\> \- Values: three cards with icon squares (B3).  
\> \- Team grid: portraits with duotone→color hover, credential lines, social icon links; founders first per wireframe.

\#\# D3. SERVICES HUB \`/services\`, BRANDS \`/brands\`, CREATORS \`/creators\`, PLATFORMS \`/platforms\`

\> \*\*\`\[DIRECTIVE — Services Pages\]\`\*\*  
\> \- Hub: three large path cards, each with a distinct background: Brands \= cream \+ orange slant block, Creators \= white \+ step-stack portrait accent, Platforms \= ink \+ diamond pattern. Equal height, hover lifts 4px, whole card clickable.  
\> \- Playbook teaser strip on hub (static 5 nodes, links to /brands\#playbook).  
\> \- \*\*/brands:\*\* accordion service rows — closed row: Archivo 800 caps title \+ plus icon (rotates 45° to × when open); open animation: height auto-animate 300ms \+ content fade. The Playbook section uses the full C3-5 stepper. FAQ accordion same pattern, smaller type.  
\> \- \*\*/creators:\*\* benefit cards use the "inventory" framing — each card gets a tiny mono index (\`ITEM\_01\`) in the corner before the title; testimonial quotes in white cards with oversized orange quotation diamond; Kick trust block reuses the ink \+ green accent treatment (smaller scale than home).  
\> \- \*\*/platforms:\*\* leads with the Kick case framed as the template pitch; dark section dominant on this page; CTA "PARTNER WITH US".

\#\# D4. TALENT \`/talent\` \+ PROFILE \`/talent/\[slug\]\`

\> \*\*\`\[DIRECTIVE — Talent Directory\]\`\*\*  
\> \- Sticky filter bar: cream bg, bottom border, 44px height; filter pills per B2; the live result count ("SHOWING 12 OF 50+") in mono style with the number in orange, updates with a quick 150ms fade on change.  
\> \- Filtering animation: grid items that remain re-flow with FLIP animation (300ms); removed items fade+scale 0.96 out. No reloads.  
\> \- Empty state (over-filtered): centered large orange diamond with a search icon, "NO CREATORS MATCH THAT LOADOUT." \+ "RESET FILTERS" primary button. (Gaming vocabulary, one touch, still clear.)  
\> \- Grid per wireframe: 4/3/2 columns; every card per B3; LOAD MORE \= secondary button.  
\> \- Join band: orange full-width slab, ink H2 "THINK YOU BELONG ON THIS WALL?" \+ ink Join button.

\> \*\*\`\[DIRECTIVE — Creator Profile\]\`\*\*  
\> \- Hero header: 16:6 cover image duotone with bottom ink gradient; name in Archivo 900 cream over it; tag chips \+ stat chips overlaid.  
\> \- Audience snapshot panel: white card, sticky; bar charts built with orange fill bars on \--line tracks, animate width on scroll-into-view (800ms ease-out); percentages count up.  
\> \- BOOK button: sticky in the right column; on mobile becomes a fixed bottom bar (full-width primary button) appearing after scrolling past the hero.  
\> \- Booking modal: opens with 250ms scale 0.96→1 \+ fade on ink overlay at 60%; closes on ESC/overlay click; focus-trapped (accessibility).  
\> \- Brand work chips link to related case studies when they exist.

\#\# D5. WORK \`/work\` \+ CASE STUDY \`/work/\[slug\]\`

\> \*\*\`\[DIRECTIVE — Work Index\]\`\*\*  
\> \- Hero: H1 "WORK THAT MOVED NUMBERS." with "NUMBERS" in orange; stat chips row below.  
\> \- Filters: same pill system as Talent; cards per B3 with the giant metric.

\> \*\*\`\[DIRECTIVE — Case Study Template\]\`\*\* — Follows the 9-part wireframe narrative; visual spec:  
\> \- Hero: full-bleed key visual (duotone→color on load after 400ms), client logo chip, campaign meta row, and the ONE hero metric rendered at \--text-display-xl in orange with count-up.  
\> \- At-a-glance: 4 stat chips in a row.  
\> \- Narrative sections (Challenge / Gaming Insight / Execution): max-width 720px reading column; the Gaming Insight section is visually distinguished — orange left border 4px \+ section tag "THE INSIGHT", because research identified this as 8Bit's differentiating voice.  
\> \- Results: 4 METRIC-BLOCKs in a bordered grid; the "vs benchmark" figure sits as a gold stamp on the relevant block ("2.2× INDUSTRY AVG").  
\> \- Creator roster chips: grayscale mini-portraits that link to profiles.  
\> \- Client quote: ink band, cream quote, gold quotation diamonds.  
\> \- Prev/next case navigation at bottom: two half-width cards with arrows.

\#\# D6. KICK \`/kick\`

\> \*\*\`\[DIRECTIVE — Kick Page\]\`\*\* — The one page with a "collab skin":  
\> \- Background: ink with Kick green used ONLY in: the hero headline accent word ("FIRST."), the section-tag diamonds on this page, hover states, and the Kick glyph. Everything else stays 8Bit orange/cream/gold.  
\> \- Hero: "48 CREATORS. ONE PLATFORM. INDIA'S FIRST." — count "48" rendered extra large (1.4em) in Kick green; gold "INDUSTRY FIRST" stamp; "READ THE ANNOUNCEMENT →" secondary link to press coverage.  
\> \- The 48 grid: wall of small square portraits (grayscale, 2px gaps), name tooltip on hover,hover turns the portrait's orange duotone on. Named highlight creators (Snax, Goblin, Mamba, Viper, Pahadi) get slightly larger tiles in the first row.  
\> \- Press quotes: cream cards with outlet name in mono caps.  
\> \- All count-ups and reveals per C2. Ticker hidden on this page (per B5).

\#\# D7. JOIN \`/join\` \+ CONTACT \`/contact\`

\> \*\*\`\[DIRECTIVE — Join\]\`\*\*  
\> \- 3-step "WHAT HAPPENS NEXT" strip: numbered nodes with connecting line; numbers in Archivo 900 orange inside corner-cut squares.  
\> \- Form per B6. Side panel: white card with stat chips \+ the copy from the wireframe doc.  
\> \- Success state per B6 with copy: "Application received. If there's a fit, you'll hear from us within 14 days."

\> \*\*\`\[DIRECTIVE — Contact\]\`\*\*  
\> \- Tabs: pill-style (B2 active fill), four tabs; switching tabs crossfades the form (200ms) and updates the URL hash (\#brands etc.) without reload; deep links auto-select the correct tab on load.  
\> \- Creators tab is a redirect card to /join rather than a duplicate form.  
\> \- Direct details block: white card with icon rows; social icon list with orange hover.

\---

\# PART E — LAYOUT, RESPONSIVE & ACCESSIBILITY RULES

\> \*\*\`\[DIRECTIVE — Layout\]\`\*\*  
\> \- 12-col grid, max container 1440px (page padding 24px desktop / 16px mobile), gutters 24px. Section vertical rhythm: 128px desktop / 80px mobile between major sections.  
\> \- Breakpoints: 1440 / 1024 / 768 / 480\. All wireframe re-stacking rules from the wireframe doc apply.

\> \*\*\`\[DIRECTIVE — Responsiveness\]\`\*\*  
\> \- Horizontal scroll sections (Roster, Timeline) become swipe carousels with snap points on mobile; hide arrow buttons, show scroll-progress bar (2px orange) under the strip.  
\> \- Stats band: 5-col → 3+2 grid at 768 → horizontal snap-scroll at 480\.  
\> \- Filter bars: horizontally scrollable pill rows on mobile with edge fade masks.  
\> \- Playbook stepper: vertical accordion layout below 768 (per wireframe doc).  
\> \- Giant footer wordmark scales via clamp; never overflows.

\> \*\*\`\[DIRECTIVE — Accessibility\]\`\*\*  
\> \- Contrast: ink on cream passes AA; cream on ink passes AA; white on orange passes AA for text ≥18px bold — never place white body-size text on orange. grey-mid text only ≥14px on cream.  
\> \- Full keyboard navigation: skip-to-content link, visible focus-visible outlines (2px orange, 3px offset), modal focus trap, tabs/accordions ARIA-patterned (\`aria-expanded\`, \`role="tablist"\`, etc.).  
\> \- All images: meaningful alt text (creator name \+ context); decorative shapes \`aria-hidden\`.  
\> \- \`prefers-reduced-motion\` handling per C2. Videos: never autoplay with sound; no flashing faster than 3Hz.  
\> \- Semantic HTML: single h1 per page, landmark regions, real buttons/links (no div-clicks).

\> \*\*\`\[DIRECTIVE — Performance\]\`\*\*  
\> \- Fonts: preload critical weights, \`font-display: swap\`, subset latin.  
\> \- Images: AVIF/WebP with fallbacks, responsive \`srcset\`, lazy-load everything below the fold, hero video poster-first with lazy media load, total hero media ≤ 3.5MB.  
\> \- Target: LCP \< 2.5s, CLS \< 0.1, INP \< 200ms. Reserve dimensions on all media to prevent layout shift. Use content-visibility on below-fold sections.

\---

\# PART F — COMPLETE WEBSITE COPY (READY TO PUBLISH)

All placeholder stats use the CMS variables from the wireframe document (Section 3\) — shown here with their default values.

\#\# F1. Global  
\- Ticker: \`48 8BIT CREATORS NOW LIVE ON KICK — INDIA'S FIRST CREATOR AGENCY PARTNERSHIP ◆ 48 8BIT CREATORS NOW LIVE ON KICK ◆ …\`  
\- Meta title (home): \`8Bit Creatives — India's Gaming Talent & Esports Agency\`  
\- Meta description (home): \`8Bit Creatives manages 50+ of India's biggest gaming creators and builds measurable brand campaigns for India's 500M+ gamers. Kick's first official creator agency partner in India.\`  
\- Footer stats line: \`50+ CREATORS ◆ 100M+ COMMUNITY ◆ 300+ CAMPAIGNS ◆ EST. 2019\`  
\- Footer tagline: \`Made for Indian gaming.\`

\#\# F2. HOME  
\- \*\*Hero tag:\*\* \`INDIA'S GAMING TALENT AGENCY\`  
\- \*\*H1:\*\* \`The creators behind India's gaming revolution.\`  
\- \*\*Sub:\*\* \`We manage 50+ of India's biggest gaming creators and build campaigns brands can measure.\`  
\- \*\*CTAs:\*\* \`START A CAMPAIGN\` / \`JOIN THE ROSTER\`  
\- \*\*Stats labels:\*\* \`CREATORS ON ROSTER\` · \`FOLLOWER COMMUNITY\` · \`ANNUAL VIEWS\` · \`CAMPAIGNS DELIVERED\` · \`BRAND PARTNERS\`  
\- \*\*Roster section — tag:\*\* \`02 — THE ROSTER\` · \*\*H2:\*\* \`The faces of Indian gaming.\` · \*\*Link:\*\* \`VIEW FULL ROSTER\`  
\- \*\*Kick block — H2:\*\* \`First movers, by design.\` · \*\*Body:\*\* \`48 creators. One platform. India's first official creator agency partnership with Kick.\` · \*\*CTA:\*\* \`EXPLORE THE PARTNERSHIP\`  
\- \*\*Work section — tag:\*\* \`04 — SELECTED WORK\` · \*\*H2:\*\* \`Campaigns with receipts.\` · \*\*Link:\*\* \`SEE ALL WORK\`  
\- \*\*What We Do — H2:\*\* \`One agency. Every way into gaming.\`  
  \- Brands card: \`Campaigns, consulting and activations that reach India's 500M+ gamers through the creators they actually trust.\`  
  \- Creators card: \`Management, brand deals and platform partnerships. You make the content — we build the business around it.\`  
  \- Platforms card: \`Aggregated, verified access to 50+ proven performers. 48 creators to Kick in one deal. Imagine what we can do for you.\`  
\- \*\*Final CTA:\*\* left: \`Got a game plan?\` → \`START A CAMPAIGN\` · right: \`Got the skills?\` → \`JOIN THE ROSTER\`

\#\# F3. ABOUT  
\- \*\*H1:\*\* \`Built by gamers. Run like a business.\`  
\- \*\*Intro:\*\* \`8Bit Creatives started where every big thing in Indian gaming starts — inside the community. Today we're the agency behind 50+ of the country's biggest creators and hundreds of brand campaigns that actually moved numbers.\`  
\- \*\*Timeline entries:\*\* 2019 \`Founded by gamers, for gamers\` / 2021 \`Roster crosses 25 creators\` / 2022 \`A Bit Extra launches — bespoke brand solutions\` / 2023 \`Rooter platform partnership\` / 2024 \`50+ creators. 300th campaign delivered.\` / 2025 \`Kick's first creator agency partner in India — 48 creators onboarded.\`  
\- \*\*Mission quote:\*\* \`Gaming isn't a channel. It's a culture. We connect brands to it the only way that works — through the people who live in it.\`  
\- \*\*Values:\*\* \`Creators first — we build careers, not just deals.\` / \`Gaming native — we've been in the lobby, not just the boardroom.\` / \`Measurable everything — every campaign earns its numbers.\`  
\- \*\*CTA band:\*\* \`Let's build what's next in Indian gaming.\` → \`WORK WITH US\`

\#\# F4. SERVICES HUB  
\- \*\*H1:\*\* \`One agency. Every way into gaming.\`  
\- \*\*Playbook teaser tag:\*\* \`HOW AN 8BIT ENGAGEMENT WORKS\` · \*\*Link:\*\* \`SEE THE FULL PLAYBOOK\`

\#\# F5. FOR BRANDS \`/brands\`  
\- \*\*Tag:\*\* \`FOR BRANDS\` · \*\*H1:\*\* \`Your audience is in the game.\`  
\- \*\*Sub:\*\* \`500M+ Indian gamers. Zero traditional reach into them. We're the bridge — with receipts.\`  
\- \*\*Accordion items:\*\* \`Gaming Influencer Campaigns\` / \`Esports Consulting\` / \`Bespoke Brand Solutions\` / \`Platform & Event Activations\` (expanded body copy from wireframe doc section 6.4)  
\- \*\*Playbook section — tag:\*\* \`HOW AN 8BIT ENGAGEMENT WORKS\` · \*\*H2:\*\* \`The Playbook.\` · Steps: \`DISCOVER / MATCH / CREATE / AMPLIFY / MEASURE\` with deliverable chips: \`Campaign Strategy Doc\` \`Creator Shortlist\` \`Content Slate\` \`Distribution Plan\` \`Performance Report\` and timeline chips \`Week 1\` \`Week 2\` \`Weeks 3–5\` \`Throughout\` \`Wrap \+ Beyond\`  
\- \*\*FAQ (6):\*\* budgets & starting point · creator selection process · games & languages covered · performance measurement · timeline to launch · exclusivity & usage rights  
\- \*\*CTA band:\*\* \`Your move.\` → \`START A CAMPAIGN\`

\#\# F6. FOR CREATORS \`/creators\`  
\- \*\*Tag:\*\* \`FOR CREATORS\` · \*\*H1:\*\* \`You play. We build the empire.\`  
\- \*\*Sub:\*\* \`Management, brand deals, platform partnerships — the business side, handled.\`  
\- \*\*Benefit cards:\*\* \`Brand deals — partnerships matched to your content, not forced into it.\` / \`Contracts & legal — every deal read, negotiated and locked.\` / \`Platform deals — we found Kick before everyone else did. We'll find the next one too.\` / \`Career strategy — a plan beyond the next upload.\` / \`Payments handled — you create, we chase.\`  
\- \*\*Kick trust block:\*\* \`Our creators were the first 48 on Kick India. We find the next platform before everyone else does.\`  
\- \*\*Who we're looking for:\*\* \`Consistent content. 10K+ following (flexible for the exceptional). Live in gaming culture.\`  
\- \*\*CTA:\*\* \`Three minutes. One form. First step.\` → \`JOIN THE ROSTER\`

\#\# F7. PLATFORMS \`/platforms\`  
\- \*\*Tag:\*\* \`FOR PLATFORMS\` · \*\*H1:\*\* \`One deal. Fifty creators. Instant credibility.\`  
\- \*\*Body:\*\* \`We aggregated 48 of India's proven gaming performers into Kick's India launch — the first deal of its kind in the country. If you're entering Indian gaming, this is the fastest route in.\`  
\- \*\*CTA:\*\* \`PARTNER WITH US\`

\#\# F8. TALENT \`/talent\`  
\- \*\*H1:\*\* \`The roster.\` · \*\*Counter chips:\*\* \`50+ CREATORS · 15+ GAMES · 8 LANGUAGES\`  
\- \*\*Filter labels:\*\* \`GAME / PLATFORM / LANGUAGE / TIER / RESET\`  
\- \*\*Result count:\*\* \`SHOWING {n} OF 50+ CREATORS\`  
\- \*\*Join band:\*\* \`Think you belong on this wall?\` → \`JOIN THE ROSTER\`  
\- \*\*Empty state:\*\* \`No creators match that loadout.\` → \`RESET FILTERS\`  
\- \*\*Card Enquire:\*\* \`ENQUIRE\` · \*\*Profile CTA:\*\* \`BOOK {NAME}\`

\#\# F9. WORK \`/work\` \+ CASE TEMPLATE  
\- \*\*H1:\*\* \`Work that moved numbers.\` · \*\*Chips:\*\* \`300+ CAMPAIGNS · 25+ BRANDS · 3.2× AVG ENGAGEMENT LIFT\`  
\- \*\*CTA band:\*\* \`Your campaign could be next.\` → \`START A CAMPAIGN\`  
\- \*\*Case section headers:\*\* \`THE CHALLENGE\` / \`THE GAMING INSIGHT\` / \`THE EXECUTION\` / \`THE RESULTS\` / \`THE ROSTER\`  
\- The four launch case studies use the full narratives from the wireframe document (Section 7, CS-01 to CS-04) written into this copy voice.

\#\# F10. KICK \`/kick\`  
\- \*\*Tag:\*\* \`INDUSTRY FIRST\` · \*\*H1:\*\* \`48 creators. One platform. India's first.\`  
\- \*\*Sub:\*\* \`8Bit Creatives is Kick's first official creator agency partner in India.\`  
\- \*\*Three cards:\*\* \`FOR CREATORS — A new stage. New revenue. Day-one advantage.\` / \`FOR BRANDS — Fresh audiences on the fastest-growing platform in gaming.\` / \`FOR PLATFORMS — One deal. 48 proven performers.\`  
\- \*\*Section:\*\* \`LIVE ON KICK\` · \*\*CTA band:\*\* \`We did it first for Kick. Ask us what's next.\` → \`PARTNER WITH US\`

\#\# F11. JOIN \`/join\` \+ CONTACT \`/contact\`  
\- \*\*Join H1:\*\* \`Apply for representation.\` · \*\*Steps:\*\* \`01 APPLY / 02 REVIEW — we watch your content / 03 CALL\`  
\- \*\*Success:\*\* \`Received.\` \+ \`Application received. If there's a fit, you'll hear from us within 14 days.\`  
\- \*\*Contact H1:\*\* \`Let's talk.\` · \*\*Sub:\*\* \`Pick your lane — we route everything from here.\` · \*\*Tabs:\*\* \`BRANDS / CREATORS / PLATFORMS / PRESS\`

\---

\# PART G — BUILD SUMMARY FOR THE AGENT

\> \*\*\`\[DIRECTIVE — Final Build Checklist\]\`\*\*  
\> 1\. Tech: modern static/SSR stack (Next.js/Astro or as instructed by the app), Tailwind or vanilla CSS with the token block in B0.  
\> 2\. Build pages in this order: tokens & globals → components (B1–B7) → Home → Talent \+ profiles → Work \+ case studies → Kick → remaining pages → motion pass (C2–C3) → responsive pass → accessibility pass → performance pass.  
\> 3\. All copy comes from Part F. All layout comes from the wireframe document. All visuals come from Parts A–D. Where documents overlap, this document's directives win on visual matters, the wireframe document wins on structure/IA.  
\> 4\. All statistics are CMS variables (wireframe doc Section 3/12) — never hardcoded.  
\> 5\. Every \`\[DIRECTIVE\]\` in this file is a requirement, not a suggestion. If a directive conflicts with a default framework behavior, the directive wins.  
\> 6\. Final QA gates: reduced-motion pass, keyboard-only pass, Lighthouse ≥ 90 performance / ≥ 95 accessibility, zero off-palette colors (grep for hex codes not in B0), corner-cut applied to every card and button, duotone-to-color hover present on every portrait.

\---

\*End of Brand & UI System Document. Sequence: Research → Sitemap & Wireframes → \*\*Brand & UI System (this file)\*\* → Build.\*  
\`\`\`\`

\---  
