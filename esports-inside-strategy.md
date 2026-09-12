# esports-inside.html — Strategy & Antigravity Build Brief

**Scope:** Plan the structure, content, and design of a new `esports-inside.html` subpage that showcases 8Bit's competitive esports roster. Player data will be filled in later by the user — this brief covers layout, components, interactions, and responsive behavior only.

---

## 0. Research base — three reference pages studied

| Reference | URL | What it does well | What to borrow | What to leave behind |
|---|---|---|---|---|
| **PUBG Esports** (KRAFTON) | pubgesports.com/en/teams/257 | Per-player KPI row right on the card; clean separation of players vs coaches; tournament context above the roster | Per-card stat row (4 KPIs), coach as a separate sub-section, tournament label above roster | Bright brand-color hero (too tournament-broadcast), gray grid background (too SaaS), time-coded performance rows (too dense for casual visitors) |
| **Team Falcons** | teamfalcons.sa/teams | Multi-game editorial layout — each game gets its own block with team name + one-line description; clean white all-page layout; clear footer taxonomy | Per-game "team block" pattern (team name + role tag + one-line description + roster), all-page editorial whitespace | None — this is the closest to 8Bit's editorial tone |
| **eSportStats / Team 8Bit** | esportstats.in/teams/Team-8Bit | Role tags (IGL / Assaulter / Support) on each player; "Active" status badge on the team; tournament table with Tier / Rank columns; "Finishes" and "FPM" as gaming-native KPIs | Role tags as small chips, team status badge, gaming-native KPI vocabulary (Finishes, FPM, Ranking Points, Total Points), tournament history table | Dark dashboard aesthetic (too SaaS-stats-tracker), per-player stats below name in a tiny font (too dense) |

### Synthesis — what 8Bit's page should be

A **vertical-scroll editorial team page** with three zones, borrowing from each reference:

1. **Team header** (from Team Falcons + eSportStats) — team name, "Active" status, one-line tagline, key meta (game, region, founded). No giant brand-color band.
2. **Roster grid** (from PUBG Esports + eSportStats) — 4–5 player cards in a row, each with avatar + handle + real-name + role tag + a compact 2-stat row. Coach as a separate, calmer sub-section below.
3. **Tournament history** (from eSportStats) — a quiet, editorial table of recent tournaments with Tier / Rank / Tournament Name / Placement columns.

---

## 1. Page anatomy (top to bottom)

The page has seven sections, all left-aligned to a 1200px max-width content column on desktop, with 32px gutters. No section uses a hard color cut — section transitions are soft, with the existing black-to-white gradient treatment already used on `about.html`, `work.html`, `creators.html`, `services.html`.

### Section 1 — Hero / Team header
A tall, calm hero (60vh on desktop, 80vh on mobile) that opens the page.

- **Top breadcrumb**: "Home → Esports → 8Bit" (small, muted, left-aligned).
- **Team name** (large, Geist Sans, weight 500, ~88px desktop / ~52px mobile, normal case — not all caps). e.g. "8Bit Esports".
- **Status pill**: "Active" — small capsule pill, white background, thin ink border, ink-colored text. No orange, no green dot — keep the editorial tone.
- **One-line tagline** (Geist Sans 300 italic, ~22px): e.g. "BGMI roster competing in the 2026 BGMI Pro Series."
- **Meta row** below tagline (small Geist Sans, muted): four meta items separated by a thin vertical divider — "Game · BGMI", "Region · India", "Founded · 2018", "Roster · 5 players".
- **Right side of hero**: a large portrait of the full team (5 players in jersey, studio-shot). Soft rounded corners (18px radius — matching the site's curve language). On mobile, the portrait stacks below the meta row.

### Section 2 — Quick stats ribbon
A horizontal ribbon of 4 KPI cards (one row on desktop, 2×2 grid on mobile) — the team-level stats a sponsor or journalist wants at a glance.

- **KPI 1**: "Tournaments played" — big number (Geist Sans 400, ~52px), small label below (Geist Sans 300, 14px).
- **KPI 2**: "Total finishes"
- **KPI 3**: "Best placement" — e.g. "1st" or "3rd"
- **KPI 4**: "Prize money" — e.g. "$XXX,XXX" or "₹XX,XX,XXX"

Each KPI card: cream/white background, soft 14px border-radius, 1px ink-15% border, 24px internal padding. Numbers in ink color (not orange). Labels in muted ink. **No eyebrows, no all-caps, no Geist Mono.**

### Section 3 — Roster grid (the main event)
The 4–5 player cards in a single row on desktop, 2×2 on tablet, single column on mobile.

**Player card design** (the most important component on the page):

- **Shape**: rounded rectangle, 14px radius, 1px border in ink-15%, cream/white background. **NOT squarish, NOT sharp corners.**
- **Layout**: vertical — avatar on top, then handle, then real name, then role chip, then a 2-stat row, then a "View profile" affordance.
- **Avatar**: portrait photo, soft rounded top corners (matching the card's 14px radius), aspect-ratio 4:5, lazy-loaded, LQIP blur-up.
- **Handle** (Geist Sans 500, 24px, normal case): e.g. "Snax" — not "SNAX".
- **Real name** (Geist Sans 300, 14px, muted): e.g. "Raj Varma".
- **Role chip**: a small capsule pill with the player's role — "IGL" / "Assaulter" / "Support" / "Sniper" / "Entry". White background, 1px ink-15% border, ink text, 8px × 4px padding, 100px radius. Centered horizontally below the real name.
- **2-stat row** (the PUBG Esports + eSportStats synthesis): two stats side-by-side, separated by a thin 1px vertical divider. Each stat = big number (Geist Sans 400, 20px) + small label (Geist Sans 300, 11px, muted). Stats chosen from: "Finishes", "FPM", "K/D", "Ranking pts". Pick the 2 most relevant per role if needed, otherwise use a team-wide default.
- **View profile affordance**: a small text link at the bottom of the card, "View profile →" (Geist Sans 300 italic, 14px, ink). NOT a button. NOT a popup. NOT a zoom-in. Clicking navigates to a future per-player page (use `#` placeholder for now).

**Hover behavior** (per user's anti-list):
- No popup, no zoom-in.
- Allowed: a 1px border color shift from ink-15% to ink-30%, plus a 4px upward translate (matches the rest of the site's restrained hover pattern). 200ms ease-out. No scale, no shadow, no overlay.

### Section 4 — Coach & support staff
A quieter sub-section below the roster grid. Same card pattern, but visually subordinate — smaller cards, no role chip, no 2-stat row. Just avatar + name + role label (e.g. "Coach", "Analyst", "Manager") + one-line bio.

Cards here are sized at 50% of the player-card width, sitting in a 2-row grid (or one row if only 1–2 staff). No "Coach" eyebrow — the section title is a single sentence: "Coaching & support staff" (Geist Sans 400, 28px).

### Section 5 — Tournament history table
An editorial table (not a dashboard-style grid) of recent tournaments. Columns: Tournament · Tier · Placement · Finishes · Date. Five to ten rows.

- **Table styling**: no background fill on rows, just thin ink-10% horizontal rules between rows.
- **Tier column**: small capsule chip — "S-Tier" / "A-Tier" / "B-Tier". Different muted backgrounds per tier (cream / warm gray / cool gray), no bright colors.
- **Placement column**: numeric, e.g. "1st", "3rd", "Top 12". Bold the podium finishes (1st–3rd) with Geist Sans 500; the rest in 400.
- **Date column**: month + year, e.g. "Aug 2026".

Section title above the table: a single sentence — "Recent tournaments" (Geist Sans 400, 28px). No eyebrow.

### Section 6 — Sponsors & partners strip
A quiet horizontal strip of sponsor logos, all grayscale, single row, scrollable on mobile. Each logo is clickable (opens sponsor's site in new tab). Section title: "Partners & sponsors" (Geist Sans 400, 28px).

### Section 7 — Footer (shared site footer)
Same footer as the rest of the site — 8Bit logo block centered, S8UL block on the right above the enquiry / email, navigation links, Instagram + LinkedIn social icons. Already built in previous prompt.

---

## 2. Design system — what to use, what to avoid

### Use (the 8Bit design language)

- **Fonts**: Geist Sans (weights 300, 400, 500, 700) for all text. **Never Geist Mono** anywhere on this page.
- **Colors**:
  - Background: white (#FFFFFF) and dark (#0A0A0A) — same gradient flow as `about.html`
  - Surface (cards): cream (#FBF8F1) and dark surface (#111111)
  - Ink: #141210 (near-black)
  - Muted ink: #4A463F (60% opacity ink)
  - Border: ink at 15% opacity for the hairlines
  - **No orange** anywhere on the page. No `#FF5931`. Status badges, role chips, KPI numbers, podium finishes — all in ink or muted ink.
- **Shapes**: 14px border-radius on cards, 100px capsule pills for chips, 18px on the hero portrait. Soft edges everywhere.
- **Spacing**: 32px gutters, 24px card padding, 64px section padding (desktop) / 40px (mobile).
- **Motion**: 200ms ease-out for hover border + 4px translate. No other motion. Respect `prefers-reduced-motion`.
- **Type**: all body text in normal case. Headers in normal case. **No all-caps anywhere.** No eyebrow titles above section headers.

### Avoid (the user's anti-list)

- ❌ All caps text — anywhere, any size
- ❌ Geist Mono font — anywhere on the page
- ❌ Orange text — anywhere on the page
- ❌ Eyebrow titles — no small-caps kicker labels above section headers
- ❌ Squarish design — no 4px or 0px corner radii
- ❌ Hover to popup — no tooltips, no overlays, no info popovers on hover
- ❌ Hover to zoom in — no scale transforms on hover

---

## 3. Responsive behavior

| Breakpoint | Layout |
|---|---|
| **≥ 1280px** (desktop) | Hero side-by-side (text left, portrait right). Roster in single row of 4–5 cards. KPI ribbon in single row of 4. Tournament table full-width. |
| **768–1279px** (tablet) | Hero stacks (text above portrait). Roster in 2×2 grid. KPI ribbon in 2×2 grid. Tournament table full-width with smaller column padding. |
| **≤ 767px** (mobile) | Hero stacks, smaller type (52px team name). Roster in single column. KPI ribbon in 2×2 grid. Tournament table horizontally scrollable — first column (Tournament name) sticky. |

Mobile-specific notes:
- Hero portrait: full-width, 4:3 aspect ratio on mobile (vs 4:5 on desktop).
- Player cards: full-width on mobile, 4:5 avatar aspect ratio preserved.
- Tournament table: horizontal scroll with `overflow-x: auto`, first column sticky via `position: sticky; left: 0; background: var(--surface)`.
- All hover effects disabled on touch via `@media (hover: hover) and (pointer: fine)` wrapper on the hover CSS.

---

## 4. Component structure (for Antigravity to implement)

### Card 1 — Team header
```
<section class="team-header">
  <nav class="breadcrumb">Home → Esports → 8Bit</nav>
  <div class="team-header__row">
    <div class="team-header__text">
      <h1 class="team-header__name">8Bit Esports</h1>
      <span class="status-pill">Active</span>
      <p class="team-header__tagline">BGMI roster competing in the 2026 BGMI Pro Series.</p>
      <ul class="team-header__meta">
        <li>Game · BGMI</li>
        <li>Region · India</li>
        <li>Founded · 2018</li>
        <li>Roster · 5 players</li>
      </ul>
    </div>
    <div class="team-header__portrait">
      <img src="..." alt="8Bit Esports roster photo" loading="lazy">
    </div>
  </div>
</section>
```

### Card 2 — KPI ribbon
```
<section class="kpi-ribbon">
  <div class="kpi-card"><span class="kpi-card__value">12</span><span class="kpi-card__label">Tournaments played</span></div>
  <div class="kpi-card"><span class="kpi-card__value">847</span><span class="kpi-card__label">Total finishes</span></div>
  <div class="kpi-card"><span class="kpi-card__value">1st</span><span class="kpi-card__label">Best placement</span></div>
  <div class="kpi-card"><span class="kpi-card__value">$240K</span><span class="kpi-card__label">Prize money</span></div>
</section>
```

### Card 3 — Player card
```
<article class="player-card">
  <div class="player-card__avatar"><img src="..." alt="..." loading="lazy"></div>
  <h3 class="player-card__handle">Snax</h3>
  <p class="player-card__name">Raj Varma</p>
  <span class="role-chip role-chip--igl">IGL</span>
  <div class="player-card__stats">
    <div class="stat"><span class="stat__value">247</span><span class="stat__label">Finishes</span></div>
    <div class="stat"><span class="stat__value">1.33</span><span class="stat__label">FPM</span></div>
  </div>
  <a class="player-card__link" href="#">View profile →</a>
</article>
```

### Card 4 — Coach / staff card (subordinate)
```
<article class="staff-card">
  <div class="staff-card__avatar"><img src="..." alt="..." loading="lazy"></div>
  <div class="staff-card__text">
    <h4 class="staff-card__name">Animesh Agarwal</h4>
    <p class="staff-card__role">Coach</p>
    <p class="staff-card__bio">Former competitive player. Strategist behind the 2026 BGMS run.</p>
  </div>
</article>
```

### Table — Tournament history
```
<section class="tournaments">
  <h2 class="section-title">Recent tournaments</h2>
  <div class="tournaments__scroll">
    <table class="tournaments__table">
      <thead>
        <tr>
          <th>Tournament</th>
          <th>Tier</th>
          <th>Placement</th>
          <th>Finishes</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>BGMI Masters Series 2026</td>
          <td><span class="tier-chip tier-chip--s">S-Tier</span></td>
          <td class="podium">1st</td>
          <td>184</td>
          <td>Aug 2026</td>
        </tr>
        <!-- more rows -->
      </tbody>
    </table>
  </div>
</section>
```

---

## 5. CSS structure (the key tokens — for Antigravity to wire up)

```css
/* Tokens */
:root {
  --c-bg-light: #FFFFFF;
  --c-bg-dark: #0A0A0A;
  --c-surface-light: #FBF8F1;
  --c-surface-dark: #111111;
  --c-ink: #141210;
  --c-ink-muted: #4A463F;
  --c-border: rgba(20, 18, 16, 0.15);
  --c-border-strong: rgba(20, 18, 16, 0.30);
  --radius-card: 14px;
  --radius-pill: 100px;
  --radius-portrait: 18px;
  --font-sans: 'Geist', 'Inter', system-ui, sans-serif;
  --transition: 200ms ease-out;
}

/* Typography — never Geist Mono, never all caps */
body { font-family: var(--font-sans); color: var(--c-ink); }
h1, h2, h3, h4 { font-family: var(--font-sans); font-weight: 500; letter-spacing: -0.01em; }

/* Card base — soft corners, hairline border, no shadow */
.team-header__portrait,
.kpi-card,
.player-card,
.staff-card {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-card);
  background: var(--c-surface-light);
  padding: 24px;
  transition: border-color var(--transition), transform var(--transition);
}

/* Hover — restrained, no zoom, no popup */
@media (hover: hover) and (pointer: fine) {
  .player-card:hover,
  .staff-card:hover {
    border-color: var(--c-border-strong);
    transform: translateY(-4px);
  }
}

/* Role / status / tier chips — capsule pills, ink color (NO ORANGE) */
.status-pill,
.role-chip,
.tier-chip {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--c-border);
  background: var(--c-surface-light);
  color: var(--c-ink);
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 12px;
  line-height: 1;
}

/* Tier chip variants — muted backgrounds, no bright colors */
.tier-chip--s { background: #F0EBE0; }
.tier-chip--a { background: #ECE8E0; }
.tier-chip--b { background: #E8E8E0; }

/* KPI ribbon */
.kpi-ribbon { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.kpi-card__value { display: block; font-size: 52px; font-weight: 400; }
.kpi-card__label { display: block; font-size: 14px; font-weight: 300; color: var(--c-ink-muted); margin-top: 4px; }

/* Player card stats row */
.player-card__stats { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
.player-card__stats .stat { padding: 0 8px; text-align: center; }
.player-card__stats .stat + .stat { border-left: 1px solid var(--c-border); }
.stat__value { display: block; font-size: 20px; font-weight: 400; }
.stat__label { display: block; font-size: 11px; font-weight: 300; color: var(--c-ink-muted); }

/* Tournament table — editorial, no dashboard */
.tournaments__scroll { overflow-x: auto; }
.tournaments__table { width: 100%; border-collapse: collapse; font-size: 14px; }
.tournaments__table th { text-align: left; padding: 12px 16px; font-weight: 500; border-bottom: 1px solid var(--c-border); }
.tournaments__table td { padding: 16px; border-bottom: 1px solid var(--c-border); }
.tournaments__table tr:last-child td { border-bottom: 0; }
.podium { font-weight: 500; }

/* Responsive */
@media (max-width: 1279px) {
  .kpi-ribbon { grid-template-columns: repeat(2, 1fr); }
  /* roster grid: 2×2 */
}
@media (max-width: 767px) {
  .kpi-ribbon { grid-template-columns: repeat(2, 1fr); }
  /* roster grid: 1 column */
  .tournaments__table th:first-child,
  .tournaments__table td:first-child {
    position: sticky; left: 0; background: var(--c-surface-light);
  }
}
```

---

## 6. Page background — black-to-white gradient

Apply the same smooth black-to-white gradient treatment already used on `about.html`, `work.html`, `creators.html`, `services.html`. The page should flow from a dark hero (team name stands out against the dark background) through a smooth gradient into a light roster grid, then light tournament table, then back to the dark footer.

---

## 7. Antigravity prompt — the actual instruction block to send

````
Build a new subpage called `esports-inside.html` for the 8Bit Creatives website. The page showcases 8Bit's competitive esports roster. Use the same design system, fonts, colors, footer, navbar, and black-to-white gradient treatment as the rest of the site (match `about.html` for the gradient, navbar, and footer). The page must be fully responsive (desktop, tablet, mobile).

Use empty placeholder data for now — the user will fill in real player data later. Use placeholder names like "Player 1", "Player 2" etc. so it's obvious where to swap in real data later. Use placeholder image URLs (can be a 4:5 SVG placeholder with the player's handle letter).

DO NOT USE ANY OF THE FOLLOWING ON THIS PAGE — anywhere, any size, any element:
  • All-caps text (no `text-transform: uppercase` anywhere)
  • Geist Mono font (use only Geist Sans — the regular Geist family)
  • Orange color (no #FF5931 anywhere — no orange text, no orange accents, no orange borders)
  • Eyebrow titles (no small kicker labels above section headers)
  • Squarish design (no 4px or 0px corner radii — minimum 14px on cards, 100px on chips)
  • Hover-to-popup (no tooltips, no overlays, no info popovers)
  • Hover-to-zoom-in (no scale transforms on hover)

THE PAGE HAS SEVEN SECTIONS, top to bottom:

1) TEAM HEADER — a tall hero (~60vh desktop, ~80vh mobile).
   • Breadcrumb at top: "Home → Esports → 8Bit" (small, muted).
   • H1 team name (Geist Sans 500, ~88px desktop / ~52px mobile, normal case): "8Bit Esports".
   • Status pill next to the name: "Active" (capsule, white bg, 1px ink border, ink text, normal case).
   • Tagline below (Geist Sans 300 italic, ~22px): "BGMI roster competing in the 2026 BGMI Pro Series."
   • Meta row (small, muted, normal case, items separated by thin vertical dividers): "Game · BGMI", "Region · India", "Founded · 2018", "Roster · 5 players".
   • On the right (desktop) or below (mobile): a large team portrait, 18px border-radius, 4:5 aspect ratio, lazy-loaded.
   • This section sits on the DARK end of the black-to-white gradient — text is white/cream against the dark background.

2) KPI RIBBON — four KPI cards in a single row (desktop), 2×2 grid (tablet & mobile).
   • Card 1: big number "12", small label "Tournaments played".
   • Card 2: "847", "Total finishes".
   • Card 3: "1st", "Best placement".
   • Card 4: "$240K", "Prize money".
   • Each card: 14px border-radius, 1px ink-15% border, cream/white background, 24px padding. Big number Geist Sans 400 ~52px, small label Geist Sans 300 14px muted. INK COLOR ONLY — never orange.

3) ROSTER GRID — the main event. Five player cards in a single row on desktop (≥1280px), 2×2 grid on tablet (768–1279px), single column on mobile (≤767px).
   Each player card contains, top to bottom:
   • Avatar: 4:5 portrait, 14px top corners matching the card, lazy-loaded.
   • Handle: Geist Sans 500, 24px, normal case (e.g. "Snax", not "SNAX").
   • Real name: Geist Sans 300, 14px, muted (e.g. "Raj Varma").
   • Role chip: small capsule pill below the name — "IGL" / "Assaulter" / "Support" / "Sniper" / "Entry". White bg, 1px ink border, ink text, normal case, 100px radius, 8px×4px padding.
   • Two-stat row: two stats side-by-side, separated by a 1px ink-15% vertical divider. Each stat = big number Geist Sans 400 20px + small label Geist Sans 300 11px muted. Use "Finishes" and "FPM" as the two stats. Numbers in ink color (not orange).
   • "View profile →" link at the bottom: Geist Sans 300 italic 14px, ink color. Links to "#" placeholder for now.
   Card styling: 14px border-radius, 1px ink-15% border, cream/white background, 24px padding.
   Hover: only a 1px border-color shift (ink-15% → ink-30%) + 4px upward translate, 200ms ease-out. NO scale, NO shadow, NO overlay, NO popup. Gated behind `@media (hover: hover) and (pointer: fine)` so touch devices don't get hover effects.

4) COACHING & SUPPORT STAFF — quieter sub-section below the roster.
   • Section title: "Coaching & support staff" (Geist Sans 400, 28px, normal case, no eyebrow above it).
   • A row of smaller staff cards — same shape as player cards but ~50% width, no role chip, no 2-stat row. Just avatar + name + role label + one-line bio.
   • Use 2 placeholder staff: "Coach — Animesh Agarwal — Former competitive player. Strategist behind the 2026 BGMS run." and "Analyst — Lokesh Jain — Data and prep lead."

5) RECENT TOURNAMENTS — an editorial table.
   • Section title: "Recent tournaments" (Geist Sans 400, 28px, normal case, no eyebrow).
   • Table columns: Tournament · Tier · Placement · Finishes · Date.
   • Five placeholder rows. Use BGMI / PUBG tournament names: "BGMI Masters Series 2026", "Battlegrounds Mobile Pro Series 2026", "BGIS 2026", "PMGC 2025", "BGMI All Stars 2025".
   • Tier column shows a small capsule chip: "S-Tier", "A-Tier", "B-Tier". Different muted backgrounds per tier (S = warm cream #F0EBE0, A = neutral #ECE8E0, B = cool #E8E8E0). Never orange.
   • Placement column: "1st", "3rd", "Top 12" etc. Bold (Geist Sans 500) for podium (1st–3rd), regular (Geist Sans 400) for the rest.
   • Date column: "Aug 2026" format.
   • Table styling: no row background fill, just thin ink-10% horizontal rules between rows. Header row has a slightly heavier (ink-15%) bottom border.
   • Mobile: table scrolls horizontally (overflow-x: auto), first column (Tournament name) sticky.

6) PARTNERS & SPONSORS — a quiet strip.
   • Section title: "Partners & sponsors" (Geist Sans 400, 28px, normal case).
   • A horizontal strip of 4–6 sponsor logo placeholders, grayscale, single row, scrollable on mobile. Each logo clicks open in new tab.

7) FOOTER — the shared site footer (same as every other page — 8Bit logo block centered, S8UL block on the right above enquiry/email, nav links, Instagram + LinkedIn social icons).

PAGE BACKGROUND: Apply the same smooth black-to-white gradient treatment used on `about.html`. The hero (section 1) should sit on the dark end of the gradient; the roster grid (section 3) and tournament table (section 5) sit on the light end. The gradient transition between dark and light should be smooth and continuous — no hard seam.

RESPONSIVE BEHAVIOR:
  • ≥1280px desktop: hero side-by-side (text left, portrait right). KPI ribbon = 4 cards in a row. Roster = 5 cards in a row. Tournament table = full width.
  • 768–1279px tablet: hero stacks (text above portrait). KPI ribbon = 2×2 grid. Roster = 2×2 grid. Tournament table = full width with smaller column padding.
  • ≤767px mobile: hero stacks, smaller team name (~52px). KPI ribbon = 2×2 grid. Roster = single column. Tournament table = horizontal scroll with first column sticky.

CRITICAL CONSTRAINTS (read again before coding):
  • No all-caps text anywhere on the page (no `text-transform: uppercase`).
  • No Geist Mono font anywhere on the page (only Geist Sans).
  • No orange color anywhere on the page (no #FF5931 — use ink colors only).
  • No eyebrow titles above section headers.
  • No squarish shapes — minimum 14px corner radius on cards, 100px on chips.
  • No hover-to-popup (no tooltips, no overlays).
  • No hover-to-zoom-in (no scale transforms).
  • Use placeholder player data — the user will fill in real data later. Make the placeholders obvious ("Player 1", "Player 2", etc.).
  • The page must match the visual language of the rest of the site (Geist Sans, the existing color palette minus orange, soft corners, restrained motion, the existing footer and navbar).
````

---

## 8. Final checklist before sending to Antigravity

- [ ] Page name: `esports-inside.html`
- [ ] Seven sections in order: hero, KPI ribbon, roster grid, coaching staff, tournament table, sponsors strip, footer
- [ ] All design constraints respected: no all-caps, no Geist Mono, no orange, no eyebrows, no squarish, no hover-to-popup, no hover-to-zoom
- [ ] Black-to-white gradient same as `about.html`
- [ ] Responsive at 1280 / 768 / 767 breakpoints
- [ ] Placeholder data only — user fills in real player data later
- [ ] Same navbar, footer, and gradient as the rest of the site
