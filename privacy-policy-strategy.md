# Privacy Policy Page — Strategy & Build Brief

**File to create:** `privacy-policy.html`
**Source references:** Two screenshots analyzed — Mount Media (dark, single-page editorial, GDPR-based) and Sales&More (light, very long, GDPR-based, formal Polish/EU agency).
**Indian law base:** Digital Personal Data Protection Act, 2023 (DPDP Act) — India's applicable data protection law, supplemented by the Information Technology Act, 2000 (Section 43A and the SPDI Rules, 2011) for legacy coverage.

---

## 1. Reference Analysis — what each screenshot teaches us

### Reference A — Mount Media (mount-media.com/privacy-policy)
- **Layout:** Dark mode (#0A0A0A) throughout, single tall column (~4000px tall), pure-white text.
- **Structure:** Top nav (Home, About us) → large page title "Privacy Policy" → single italic intro paragraph (GDPR context + "we take your privacy seriously") → numbered/sectioned body with named sections.
- **Named sections:** *Information That We Collect · How We Use Your Personal Data · Your Rights · Sharing and Disclosing Your Personal Information · Safeguarding Measures · Consequences of Not Providing Your Data · How Long We Keep Your Data · Lodging A Complaint*.
- **Typography:** Sans-serif body, italic intro paragraph, **section labels in Title Case (not ALL CAPS)** — e.g. "Information That We Collect" not "INFORMATION THAT WE COLLECT".
- **Tone:** Plain English, second person ("we collect your name and email"), short paragraphs (2–4 sentences).
- **Footer:** Address block + supervisory authority contact + email.
- **What we borrow:** Dark background, italic intro paragraph, plain-language tone, named sections in title case, end-of-page contact block.
- **What we drop:** The GDPR-specific framing (India uses DPDP Act 2023, not GDPR), the Malta address / supervisory authority details, the affiliate-banking-specific data list.

### Reference B — Sales&More (salesmore.pl/en/privacy-policy-and-data-protection)
- **Layout:** Light mode (white), very long single column (~9600px tall — much longer than Mount Media).
- **Structure:** Top nav → page title "Privacy policy and data protection" → single intro paragraph → detailed numbered sections (I. USER CONSENT, II. PERSONAL DATA PROCESSED BY THE CONTROLLER, III. THE WAY THE DATA ARE PROCESSED, IV. DISCLOSURE OF PERSONAL DATA, etc.) with sub-numbering (a, b, c) and sub-sub-numbering (1, 2, 3).
- **Typography:** Sans-serif, smaller body text than Mount Media, headings in **ALL CAPS** with roman numerals.
- **Tone:** Highly formal, legal-document register, GDPR Article references inline (Article 6(1)(b), Article 6(1)(a), etc.), long compound sentences with embedded clauses.
- **What we borrow:** Comprehensive coverage of data sources (directly provided, collected via cookies, from third parties, from publicly available sources), explicit list of personal data fields collected, explicit retention periods.
- **What we drop:** ALL CAPS section headings (violates 8Bit's design anti-list), the GDPR Article references (India uses DPDP Act — reference sections instead), the formal legal register (8Bit writes in plain, confident English — never bureaucratic), the Roman-numeral section numbering (use simple "01 — Information we collect" style instead).

### Synthesis — what 8Bit's page should be

A **dark-mode, editorial, single-column privacy policy** that combines Mount Media's clean tone with Sales&More's comprehensive coverage, but written in 8Bit's voice and tuned for Indian law (DPDP Act 2023, not GDPR).

- **Visual:** Dark background (#0A0A0A), single ~720px-wide reading column centered on the page, large page title, italic intro paragraph, named sections with simple "01 —" numbering.
- **Length:** Long enough to cover all required topics, short enough that a reader can scan it in 4–6 minutes. Aim for ~2500–3000 words of body copy. The page is mostly text — minimal UI chrome.
- **Voice:** Plain English, second person, no legalese. "We collect your name and email when you fill out the contact form. We do not sell your data."
- **Sections:** 12 named sections (see §3 below).
- **Footer of the page:** Contact block with 8Bit's registered address + email + a note about India's Data Protection Board (DPDP Act 2023 enforcement body).

---

## 2. Indian privacy law — what 8Bit must include

8Bit is an Indian company operating an Indian website (8bitcreatives.com). The applicable Indian privacy framework is:

1. **Digital Personal Data Protection Act, 2023 (DPDP Act)** — India's modern data protection law. Key obligations for a website privacy policy:
   - Identify the **Data Fiduciary** (8Bit Creatives) — the entity that determines the purpose and means of processing personal data.
   - Identify the **Data Principal** — the user whose data is processed.
   - State the **purpose of processing** for each category of personal data.
   - State the **categories of personal data** collected.
   - State the **retention period** — DPDP Act requires data be retained only for as long as necessary.
   - State the **rights of the Data Principal** — right to access, correct, erase, nominate, grievance redressal.
   - Provide a **grievance officer contact** — DPDP Act requires a named grievance officer with contact details.
   - Mention **consent withdrawal** — users can withdraw consent at any time.
   - State whether data is **shared with third parties or transferred outside India**.
2. **Information Technology Act, 2000 (Section 43A) + SPDI Rules, 2011** — legacy but still relevant; requires reasonable security practices for sensitive personal data.
3. **Advertising Standards Council of India (ASCI)** — relevant for influencer marketing guidelines (8Bit is a creator agency).
4. **DPDP Act enforcement body:** Data Protection Board of India (DPB), established under the DPDP Act.

**What this means for 8Bit's privacy policy:**

- The policy must identify 8Bit Creatives as the Data Fiduciary.
- It must list the categories of personal data collected (name, email, phone, etc.).
- It must state the purpose of processing for each category.
- It must state retention periods.
- It must list user rights under the DPDP Act.
- It must provide a grievance officer name + email.
- It must mention consent withdrawal.
- It must address third-party sharing and cross-border transfer.

---

## 3. Page structure — 12 sections, top to bottom

All sections sit in a single centered reading column, ~720px wide on desktop, full-width with 24px gutters on mobile. Section titles use a simple "01 — Information we collect" pattern (normal case, no all-caps, no eyebrow). Each section is a stack of short paragraphs (3–5 sentences each) and occasional bulleted lists.

### Section 0 — Page header (no section number)
- Breadcrumb: "Home → Privacy policy" (small, muted, top-left of the reading column).
- H1: "Privacy policy" — large, Geist Sans 400, ~56px desktop / ~36px mobile, normal case.
- Italic intro paragraph (Geist Sans 300 italic, ~18px): "We collect as little as we can, tell you what we do with it, and let you decide what stays. This page explains how 8Bit Creatives handles personal data — what we collect, why, how long we keep it, and how you can ask us to change or delete it."
- Last-updated line below the intro: "Last updated: September 2026" (small, muted).

### Section 01 — About 8Bit Creatives and this policy
Who 8Bit is, what this policy covers. Plain English. Identifies 8Bit as the Data Fiduciary under the DPDP Act.

### Section 02 — Information we collect
Categories of personal data 8Bit collects, grouped by source:
- **Directly from you** (contact form, newsletter signup, partnership enquiry): name, email, phone, company, role, message.
- **From creators applying for representation**: real name, address, date of birth, government ID, bank details, social handles, portfolio links.
- **Automatically when you visit** (cookies, analytics): IP address, browser type, device type, pages visited, time on site, referral source.
- **From third parties** (if applicable): public social media profiles of creators we manage, professional references.

### Section 03 — How we use your information
Purpose of processing for each category. Plain list:
- To respond to your enquiry or partnership request.
- To evaluate creator applications and offer representation.
- To run and improve our website and analytics.
- To send updates and newsletters (only if you opt in).
- To meet legal, tax, and contractual obligations.
- To protect against fraud and abuse.

### Section 04 — Legal basis for processing
Indian-law version: explains that processing is based on consent (Section 7 of the DPDP Act) for most data, and on legitimate necessity for contractual and legal obligations (Section 7 of the DPDP Act). Written in plain English — no section references in the body text (kept in an appendix).

### Section 05 — Cookies and similar technologies
What cookies are used, why, and how to disable them. Categorize: essential (site works without them not at all), analytics (Google Analytics or similar), optional (newsletter preferences). Link to browser's cookie settings.

### Section 06 — Sharing your information
Who 8Bit shares data with and why:
- Service providers (hosting, email, analytics) under contractual data protection.
- Creators' talent agencies / brand partners when running campaigns (only with creator consent).
- Legal authorities when required by Indian law.
- Never sold. Never shared for cross-context advertising.

### Section 07 — International transfers
8Bit is India-based. Most data stays in India. Some service providers (Google, AWS, Cloudflare) may process data outside India under standard contractual safeguards. Users can request details.

### Section 08 — Data retention
How long 8Bit keeps each category. Concrete numbers:
- Contact form enquiries: 12 months.
- Creator applications: 24 months (or until withdrawn).
- Newsletter subscribers: until unsubscribe.
- Active client / creator contracts: duration of contract + 7 years (tax/legal requirement in India).
- Analytics data: 26 months (industry standard for Google Analytics).

### Section 09 — Your rights
DPDP Act rights in plain English:
- Access: ask what data we hold about you.
- Correction: fix inaccurate or incomplete data.
- Erasure: ask us to delete your data (where we're legally allowed to).
- Nomination: nominate someone to exercise your rights if you're unable to.
- Grievance: file a complaint with us first, then with the Data Protection Board of India.
- Withdraw consent: at any time, without affecting the lawfulness of processing before withdrawal.

### Section 10 — Security measures
What 8Bit does to protect data. Plain language, not over-claimed:
- HTTPS on the whole site.
- Access restricted to staff who need it.
- Passwords and access credentials stored in a password manager.
- Annual review of access controls.
- Breach notification within 72 hours if a notifiable breach occurs (per DPDP Act).

### Section 11 — Children's data
8Bit's site is not directed at children under 18. We don't knowingly collect data from anyone under 18. If you believe we've collected data from a minor, contact us and we'll delete it.

### Section 12 — Changes to this policy
How 8Bit will notify users of changes. "We'll update the 'Last updated' date at the top of this page and, for material changes, post a notice on the home page for 30 days."

### Section 13 — Contact and grievance officer
Required by DPDP Act. Provides:
- 8Bit Creatives' registered address (placeholder — user fills in).
- Grievance officer name (placeholder — user fills in).
- Grievance officer email (placeholder — user fills in).
- Postal address for written complaints.
- A note that users may also complain to the **Data Protection Board of India** if not satisfied with our response.

---

## 4. Design system — what to use, what to avoid

### Use (8Bit design language)

- **Fonts:** Geist Sans only (weights 300, 400, 500, 700). **Never Geist Mono** — not for body, not for section numbers, not for the page title.
- **Colors:**
  - Background: dark (#0A0A0A) — same as the rest of the site's dark sections.
  - Body text: white (#FFFFFF) at 100% for primary, 60% opacity for secondary / muted.
  - Accent: **No orange** on this page (per anti-list). Status pills, links, and section numbers all in white or muted white.
  - Surface: dark surface (#111111) for any callout blocks (used sparingly — this page is mostly text).
- **Shapes:** 14px border-radius on any callout blocks. 100px capsule pill on the "back to home" link (already in the page top-left, from the previous prompt).
- **Spacing:** 720px reading column, 64px section gap, 24px paragraph gap, 1.7 line-height on body text for readability.
- **Motion:** Page-load fade-in (300ms ease-out, gated on `prefers-reduced-motion`). No other motion. No hover effects on text. No scroll-triggered animations.
- **Type:** All text in normal case. Section numbers as "01 —", "02 —", etc. (with the em dash). No all-caps anywhere. No eyebrow titles. No Geist Mono.

### Avoid (anti-list — strict)

- ❌ All caps text — anywhere, any size, any element.
- ❌ Geist Mono font — anywhere on the page.
- ❌ Orange color — no #FF5931 anywhere on this page.
- ❌ Eyebrow titles — no small kicker labels above section headers.
- ❌ Squarish design — minimum 14px corner radius on any block element.
- ❌ Hover-to-popup — no tooltips, no info popovers on hover.
- ❌ Hover-to-zoom-in — no scale transforms.

---

## 5. Page anatomy — HTML structure

```html
<body class="page-privacy">

  <!-- Top-left: shared back-to-home capsule (already specified in previous prompt) -->
  <a href="index.html" class="back-home">← back to home</a>

  <!-- Reading column: ~720px wide, centered on desktop, full-width + 24px padding on mobile -->
  <main class="policy">

    <!-- Header -->
    <nav class="breadcrumb">Home → Privacy policy</nav>
    <h1 class="policy__title">Privacy policy</h1>
    <p class="policy__intro">
      We collect as little as we can, tell you what we do with it, and let you decide
      what stays. This page explains how 8Bit Creatives handles personal data — what
      we collect, why, how long we keep it, and how you can ask us to change or delete it.
    </p>
    <p class="policy__updated">Last updated: September 2026</p>

    <!-- Section 01 -->
    <section class="policy__section">
      <h2 class="policy__section-title">01 — About 8Bit Creatives and this policy</h2>
      <p>...body paragraphs...</p>
    </section>

    <!-- Section 02 -->
    <section class="policy__section">
      <h2 class="policy__section-title">02 — Information we collect</h2>
      <p>...intro paragraph...</p>
      <h3 class="policy__subhead">Directly from you</h3>
      <ul class="policy__list">
        <li>Name</li>
        <li>Email</li>
        <li>...etc.</li>
      </ul>
      <h3 class="policy__subhead">Automatically when you visit</h3>
      <ul class="policy__list">
        <li>IP address</li>
        <li>...etc.</li>
      </ul>
    </section>

    <!-- Sections 03–13 follow the same pattern -->

    <!-- Final contact block -->
    <section class="policy__section policy__contact">
      <h2 class="policy__section-title">13 — Contact and grievance officer</h2>
      <p>If you have any question about this policy or how we handle your data, write to us.</p>
      <div class="policy__contact-block">
        <p class="policy__contact-label">8Bit Creatives</p>
        <p class="policy__contact-detail">[Registered address — to be filled in]</p>
        <p class="policy__contact-detail">Grievance officer: [Name — to be filled in]</p>
        <p class="policy__contact-detail">Email: <a href="mailto:[email]">[email]</a></p>
      </div>
      <p class="policy__footer-note">
        If you're not satisfied with our response, you may also raise a complaint with the
        Data Protection Board of India under the Digital Personal Data Protection Act, 2023.
      </p>
    </section>

  </main>

  <!-- No site footer on this page (per user request for the 404 page — same treatment) -->

</body>
```

---

## 6. CSS tokens — the key variables

```css
:root {
  --c-bg: #0A0A0A;
  --c-text: #FFFFFF;
  --c-text-muted: rgba(255, 255, 255, 0.60);
  --c-text-soft: rgba(255, 255, 255, 0.75);
  --c-border: rgba(255, 255, 255, 0.12);
  --c-surface: #111111;
  --font-sans: 'Geist', system-ui, sans-serif;
  --radius-card: 14px;
  --transition: 200ms ease-out;
  --reading-width: 720px;
}

body { background: var(--c-bg); color: var(--c-text); font-family: var(--font-sans); }

.policy {
  max-width: var(--reading-width);
  margin: 0 auto;
  padding: 120px 56px 96px 56px;   /* top space for back-to-home capsule + breathing room */
}

.policy__title {
  font-weight: 400;
  font-size: 56px;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 24px 0 24px 0;
}

.policy__intro {
  font-weight: 300;
  font-style: italic;
  font-size: 18px;
  line-height: 1.5;
  color: var(--c-text-soft);
  margin-bottom: 12px;
}

.policy__updated {
  font-weight: 400;
  font-size: 13px;
  color: var(--c-text-muted);
  margin-bottom: 80px;
}

.policy__section {
  margin-bottom: 64px;
}

.policy__section-title {
  font-weight: 500;
  font-size: 22px;
  line-height: 1.3;
  letter-spacing: -0.01em;
  margin: 0 0 20px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--c-border);
}

.policy__subhead {
  font-weight: 500;
  font-size: 15px;
  margin: 24px 0 12px 0;
  color: var(--c-text);
}

.policy p {
  font-weight: 300;
  font-size: 15px;
  line-height: 1.7;
  color: var(--c-text-soft);
  margin-bottom: 16px;
}

.policy__list {
  list-style: none;
  padding-left: 0;
  margin: 12px 0 20px 0;
}

.policy__list li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 8px;
  font-weight: 300;
  font-size: 15px;
  line-height: 1.6;
  color: var(--c-text-soft);
}

.policy__list li::before {
  content: "—";
  position: absolute;
  left: 0;
  top: 0;
  color: var(--c-text-muted);
}

.policy__contact-block {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-card);
  padding: 24px;
  margin: 20px 0;
}

.policy__contact-label {
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 8px;
}

.policy__contact-detail {
  font-weight: 300;
  font-size: 14px;
  line-height: 1.6;
  color: var(--c-text-soft);
  margin-bottom: 4px;
}

.policy a {
  color: var(--c-text);
  text-decoration: underline;
  text-decoration-color: var(--c-text-muted);
  text-underline-offset: 3px;
  transition: text-decoration-color var(--transition);
}

.policy a:hover { text-decoration-color: var(--c-text); }

/* Mobile */
@media (max-width: 767px) {
  .policy { padding: 88px 24px 64px 24px; }
  .policy__title { font-size: 36px; }
  .policy__intro { font-size: 16px; }
  .policy__section-title { font-size: 19px; }
  .policy p, .policy__list li { font-size: 14px; }
}
```

---

## 7. The actual privacy policy text — ready to paste

This is the body copy for the page. Plain English, 8Bit's voice, Indian-law compliant. Placeholder fields are marked `[bracketed]` for the user to fill in.

### Intro paragraph (italic)
> We collect as little as we can, tell you what we do with it, and let you decide what stays. This page explains how 8Bit Creatives handles personal data — what we collect, why we collect it, how long we keep it, and how you can ask us to change or delete it. It applies to everyone who visits our website, fills out a form, applies to be a managed creator, or works with us as a client or partner.
>
> Last updated: September 2026

### 01 — About 8Bit Creatives and this policy
8Bit Creatives is a gaming creator agency based in India. We manage esports talent, produce campaigns for brands that want to reach India's gaming audience, and partner with platforms entering the country. This privacy policy applies to 8BitCreatives.com and to any personal data you share with us through the website, our forms, our email, or our offline work together. Under India's Digital Personal Data Protection Act, 2023 (the "DPDP Act"), 8Bit Creatives is the **Data Fiduciary** — the entity that decides why and how your personal data is processed. We're responsible for handling it carefully, and this page explains how.

### 02 — Information we collect

**Directly from you, when you fill out a form or send us a message:**
- Your name
- Your email address
- Your phone number (if you choose to share it)
- Your company or role (if you mention it)
- The content of your message or enquiry
- Any documents you attach

**When you apply to be a managed creator:**
- Real name, date of birth, and address
- Government-issued ID (PAN, Aadhaar, or passport)
- Bank account details (for payments and contracts)
- Social media handles and links to your content
- Portfolio or reel links
- Professional references (if you provide them)

**Automatically when you visit our website:**
- Your IP address
- Browser type and version
- Device type (mobile, tablet, desktop)
- The pages you visit and how long you stay
- The website that referred you to us
- Approximate location (city-level, derived from IP)

**From third parties, in limited cases:**
- Public social media profiles of creators we manage or are evaluating
- Professional references you've authorized us to contact
- Public records needed for due diligence (e.g., company registration)

We don't buy data from data brokers. We don't scrape data from social platforms. We don't profile you across other websites.

### 03 — How we use your information
We use your data for one of these reasons at a time:

- **To respond to your enquiry** when you contact us through the website or by email.
- **To evaluate creator applications** and decide whether to offer representation.
- **To run and improve our website** — what pages work, what forms are confusing, what devices people use.
- **To send you updates and newsletters** — but only if you've explicitly opted in. You can unsubscribe at any time.
- **To fulfil contracts** with creators, clients, and partners — including payments, deliverables, and tax records.
- **To meet legal, tax, and regulatory obligations** under Indian law.
- **To protect against fraud, abuse, and security incidents.**

We do not use your personal data for advertising you across other websites. We do not sell your data, ever.

### 04 — Legal basis for processing
Under the DPDP Act, we process your personal data for one of these reasons:

- **With your consent** — when you fill out a form, apply for representation, or subscribe to the newsletter. You can withdraw consent at any time.
- **For a contract** — when we're working with you as a creator, client, or partner, and processing is necessary to fulfil that contract.
- **For a legal obligation** — when Indian tax, labour, or company law requires us to keep certain records.
- **For a legitimate purpose** — limited cases like protecting our website from fraud or responding to a security incident.

We don't process your data for anything not listed here. If we ever need to, we'll ask for your consent first and update this policy.

### 05 — Cookies and similar technologies
Our website uses cookies and similar technologies in three categories:

- **Essential cookies** — the site doesn't work without them. They keep your session alive and remember your settings.
- **Analytics cookies** — they help us understand which pages people read, where they drop off, and what devices they use. We use [Google Analytics / Plausible / Fathom — pick one before publishing] for this.
- **Optional cookies** — they remember your newsletter preferences and form inputs.

You can control cookies through your browser settings. Most browsers let you block all cookies, block third-party cookies only, or clear cookies when you close the browser. If you block essential cookies, some parts of the site won't work.

### 06 — Sharing your information
We share your personal data only in these cases:

- **Service providers** who help us run the business — our website host, email provider, analytics tool, accounting software, and contract management platform. They process your data under contract and can't use it for anything else.
- **Brand and platform partners** when running a campaign that involves you as a managed creator — only with your written consent.
- **Legal authorities** when Indian law requires us to respond to a valid request, court order, or regulatory inquiry.
- **Successors in a business transaction** — if 8Bit is acquired or restructured, your data transfers to the new entity under the same protections.

We never sell your data. We never share it for cross-context advertising. We never share it with social media platforms for ad targeting.

### 07 — International transfers
8Bit is based in India and most of your data stays in India. Some of our service providers (web hosting, email, analytics) may process data in countries outside India — usually the United States or the European Union. When that happens, we work with providers that offer contractual safeguards equivalent to Indian requirements, and we limit what data they can access.

You can ask us which providers process your data outside India by writing to the grievance officer (see Section 13).

### 08 — Data retention
We keep your data only for as long as we need it:

- **Contact form enquiries:** 12 months from your last message.
- **Creator applications (not accepted):** 24 months, or until you ask us to delete them.
- **Creator applications (accepted):** the duration of our representation contract, plus 7 years for tax and legal records.
- **Newsletter subscribers:** until you unsubscribe, plus 30 days for record-keeping.
- **Client and partner contracts:** the duration of the contract, plus 7 years for tax records.
- **Analytics data:** 26 months, then aggregated and de-identified.
- **Government IDs and bank details:** only for active contracted creators; deleted within 30 days of contract end.

When retention ends, we delete the data or de-identify it so it can't be linked back to you.

### 09 — Your rights
Under the DPDP Act, you have the right to:

- **Access** — ask what data we hold about you and get a copy.
- **Correction** — ask us to fix inaccurate or incomplete data.
- **Erasure** — ask us to delete your data, where we're legally allowed to.
- **Nomination** — nominate someone to exercise your rights if you can't.
- **Grievance redressal** — file a complaint with us, and if we don't resolve it, with the Data Protection Board of India.
- **Withdraw consent** — at any time, for any processing based on your consent. Withdrawing consent doesn't affect anything we did before you withdrew.

To use any of these rights, write to the grievance officer in Section 13. We'll respond within 30 days.

### 10 — Security measures
We take reasonable steps to protect your data:

- HTTPS encryption across the whole website.
- Access restricted to staff who need it for their role.
- Passwords and credentials stored in a password manager, never in plain text.
- Government IDs and bank details stored separately from other records, with restricted access.
- Annual review of who has access to what.
- Staff trained on data handling when they join and refreshed yearly.
- A breach response plan, with notification to affected users and the Data Protection Board of India within 72 hours of a notifiable breach.

No system is perfectly secure. If something goes wrong, we'll tell you.

### 11 — Children's data
Our website is not directed at anyone under 18. We don't knowingly collect personal data from anyone under 18. If you believe we've collected data from a minor — yours, or someone you're responsible for — write to the grievance officer and we'll delete it within 30 days.

### 12 — Changes to this policy
We update this policy when our practices change, when the DPDP Act is updated, or when we add or remove a service that processes your data. When we update, we'll change the "Last updated" date at the top of this page. For material changes — a new use of your data, a new sharing partner, or a longer retention period — we'll also post a notice on the home page for 30 days.

If you've subscribed to the newsletter, we'll email you about material changes.

### 13 — Contact and grievance officer
If you have any question about this policy, want to use one of your rights, or want to file a complaint, write to us.

8Bit Creatives
[Registered address — to be filled in]
Mumbai, India

Grievance officer: [Name — to be filled in]
Email: [privacy@8bitcreatives.com — to be confirmed]
Phone: [optional — to be filled in]

We'll respond within 30 days. If you're not satisfied with our response, you may also raise a complaint with the **Data Protection Board of India** under the Digital Personal Data Protection Act, 2023.

---

## 8. Responsive behavior

| Breakpoint | Layout |
|---|---|
| **≥ 1280px** (desktop) | Reading column 720px wide, centered. 120px top padding (room for back-to-home capsule). 56px side padding. 64px between sections. |
| **768–1279px** (tablet) | Reading column full-width with 56px side padding. 96px top padding. 56px between sections. |
| **≤ 767px** (mobile) | Reading column full-width with 24px side padding. 88px top padding (back-to-home capsule is smaller on mobile, 24px from top). 48px between sections. Body text drops from 15px to 14px. |

---

## 9. Antigravity prompt — the actual instruction block to send

````
Build a new subpage called `privacy-policy.html` for the 8Bit Creatives website. The page is a text-heavy privacy policy — mostly body copy, minimal UI chrome. Match the design system of the rest of the site (Geist Sans, dark background #0A0A0A, soft corners, restrained motion, no orange, no Geist Mono, no all-caps, no eyebrows, no squarish, no hover-popups, no hover-zoom).

DO NOT USE ANY OF THE FOLLOWING ON THIS PAGE — anywhere, any size, any element:
  • All-caps text (no `text-transform: uppercase` anywhere — section titles are "01 — Information we collect" in normal case)
  • Geist Mono font (use only Geist Sans — the regular Geist family)
  • Orange color (no #FF5931 anywhere — text, links, and section numbers are white or muted white)
  • Eyebrow titles (no small kicker labels above section headers)
  • Squarish design (minimum 14px corner radius on any block element; capsule pills 100px)
  • Hover-to-popup (no tooltips, no overlays, no info popovers)
  • Hover-to-zoom-in (no scale transforms on hover)

DO NOT INCLUDE THE SITE FOOTER ON THIS PAGE — the page ends after the contact block in section 13.

INCLUDE THE SHARED BACK-TO-HOME CAPSULE — the same "← back to home" capsule from the top-left of every subpage (already specified in the previous prompt). Place it at `position: fixed; top: 40px; left: 56px;` on desktop and `top: 24px; left: 20px;` on mobile, with z-index 100, white text + white-20% border on the dark background of this page. Hover (desktop only): background fills white, text flips to ink. 200ms ease-out. No zoom, no popup.

THE PAGE STRUCTURE — single centered reading column (~720px on desktop, full-width + 24px padding on mobile):

1) HEADER BLOCK
   • Breadcrumb: "Home → Privacy policy" (small, muted, top of column).
   • H1: "Privacy policy" (Geist Sans 400, ~56px desktop / ~36px mobile, normal case, no all-caps).
   • Italic intro paragraph (Geist Sans 300 italic, ~18px, ~75% opacity white): "We collect as little as we can, tell you what we do with it, and let you decide what stays. This page explains how 8Bit Creatives handles personal data — what we collect, why we collect it, how long we keep it, and how you can ask us to change or delete it."
   • "Last updated: September 2026" line below the intro (small, muted).

2) THIRTEEN NUMBERED SECTIONS — each one is a `<section>` with:
   • Section title: "01 — About 8Bit Creatives and this policy" (Geist Sans 500, 22px desktop / 19px mobile, normal case, with a 1px white-12% border-bottom underneath the title for separation).
   • Body paragraphs (Geist Sans 300, 15px desktop / 14px mobile, line-height 1.7, white-75% opacity).
   • Occasional sub-headings (Geist Sans 500, 15px, normal case, no all-caps, no eyebrow style — just a slightly heavier line of body text introducing the next list).
   • Occasional bulleted lists (using a "—" em-dash bullet, not a dot, to match the editorial tone — list items are white-75%, 15px).

   The thirteen sections, in order, with titles exactly as below (all normal case):
   01 — About 8Bit Creatives and this policy
   02 — Information we collect
   03 — How we use your information
   04 — Legal basis for processing
   05 — Cookies and similar technologies
   06 — Sharing your information
   07 — International transfers
   08 — Data retention
   09 — Your rights
   10 — Security measures
   11 — Children's data
   12 — Changes to this policy
   13 — Contact and grievance officer

3) THE BODY COPY FOR EACH SECTION — paste the exact text below.

[intro paragraph]
We collect as little as we can, tell you what we do with it, and let you decide what stays. This page explains how 8Bit Creatives handles personal data — what we collect, why we collect it, how long we keep it, and how you can ask us to change or delete it. It applies to everyone who visits our website, fills out a form, applies to be a managed creator, or works with us as a client or partner.

[01] 8Bit Creatives is a gaming creator agency based in India. We manage esports talent, produce campaigns for brands that want to reach India's gaming audience, and partner with platforms entering the country. This privacy policy applies to 8BitCreatives.com and to any personal data you share with us through the website, our forms, our email, or our offline work together. Under India's Digital Personal Data Protection Act, 2023 (the "DPDP Act"), 8Bit Creatives is the Data Fiduciary — the entity that decides why and how your personal data is processed. We're responsible for handling it carefully, and this page explains how.

[02] Information we collect
Directly from you, when you fill out a form or send us a message:
— Your name
— Your email address
— Your phone number (if you choose to share it)
— Your company or role (if you mention it)
— The content of your message or enquiry
— Any documents you attach

When you apply to be a managed creator:
— Real name, date of birth, and address
— Government-issued ID (PAN, Aadhaar, or passport)
— Bank account details (for payments and contracts)
— Social media handles and links to your content
— Portfolio or reel links
— Professional references (if you provide them)

Automatically when you visit our website:
— Your IP address
— Browser type and version
— Device type (mobile, tablet, desktop)
— The pages you visit and how long you stay
— The website that referred you to us
— Approximate location (city-level, derived from IP)

From third parties, in limited cases:
— Public social media profiles of creators we manage or are evaluating
— Professional references you've authorized us to contact
— Public records needed for due diligence (e.g., company registration)

We don't buy data from data brokers. We don't scrape data from social platforms. We don't profile you across other websites.

[03] How we use your information
We use your data for one of these reasons at a time:
— To respond to your enquiry when you contact us through the website or by email.
— To evaluate creator applications and decide whether to offer representation.
— To run and improve our website — what pages work, what forms are confusing, what devices people use.
— To send you updates and newsletters — but only if you've explicitly opted in. You can unsubscribe at any time.
— To fulfil contracts with creators, clients, and partners — including payments, deliverables, and tax records.
— To meet legal, tax, and regulatory obligations under Indian law.
— To protect against fraud, abuse, and security incidents.

We do not use your personal data for advertising you across other websites. We do not sell your data, ever.

[04] Legal basis for processing
Under the DPDP Act, we process your personal data for one of these reasons:
— With your consent — when you fill out a form, apply for representation, or subscribe to the newsletter. You can withdraw consent at any time.
— For a contract — when we're working with you as a creator, client, or partner, and processing is necessary to fulfil that contract.
— For a legal obligation — when Indian tax, labour, or company law requires us to keep certain records.
— For a legitimate purpose — limited cases like protecting our website from fraud or responding to a security incident.

We don't process your data for anything not listed here. If we ever need to, we'll ask for your consent first and update this policy.

[05] Cookies and similar technologies
Our website uses cookies and similar technologies in three categories:
— Essential cookies — the site doesn't work without them. They keep your session alive and remember your settings.
— Analytics cookies — they help us understand which pages people read, where they drop off, and what devices they use. We use [Google Analytics / Plausible / Fathom — pick one before publishing] for this.
— Optional cookies — they remember your newsletter preferences and form inputs.

You can control cookies through your browser settings. Most browsers let you block all cookies, block third-party cookies only, or clear cookies when you close the browser. If you block essential cookies, some parts of the site won't work.

[06] Sharing your information
We share your personal data only in these cases:
— Service providers who help us run the business — our website host, email provider, analytics tool, accounting software, and contract management platform. They process your data under contract and can't use it for anything else.
— Brand and platform partners when running a campaign that involves you as a managed creator — only with your written consent.
— Legal authorities when Indian law requires us to respond to a valid request, court order, or regulatory inquiry.
— Successors in a business transaction — if 8Bit is acquired or restructured, your data transfers to the new entity under the same protections.

We never sell your data. We never share it for cross-context advertising. We never share it with social media platforms for ad targeting.

[07] International transfers
8Bit is based in India and most of your data stays in India. Some of our service providers (web hosting, email, analytics) may process data in countries outside India — usually the United States or the European Union. When that happens, we work with providers that offer contractual safeguards equivalent to Indian requirements, and we limit what data they can access.

You can ask us which providers process your data outside India by writing to the grievance officer (see Section 13).

[08] Data retention
We keep your data only for as long as we need it:
— Contact form enquiries: 12 months from your last message.
— Creator applications (not accepted): 24 months, or until you ask us to delete them.
— Creator applications (accepted): the duration of our representation contract, plus 7 years for tax and legal records.
— Newsletter subscribers: until you unsubscribe, plus 30 days for record-keeping.
— Client and partner contracts: the duration of the contract, plus 7 years for tax records.
— Analytics data: 26 months, then aggregated and de-identified.
— Government IDs and bank details: only for active contracted creators; deleted within 30 days of contract end.

When retention ends, we delete the data or de-identify it so it can't be linked back to you.

[09] Your rights
Under the DPDP Act, you have the right to:
— Access — ask what data we hold about you and get a copy.
— Correction — ask us to fix inaccurate or incomplete data.
— Erasure — ask us to delete your data, where we're legally allowed to.
— Nomination — nominate someone to exercise your rights if you can't.
— Grievance redressal — file a complaint with us, and if we don't resolve it, with the Data Protection Board of India.
— Withdraw consent — at any time, for any processing based on your consent. Withdrawing consent doesn't affect anything we did before you withdrew.

To use any of these rights, write to the grievance officer in Section 13. We'll respond within 30 days.

[10] Security measures
We take reasonable steps to protect your data:
— HTTPS encryption across the whole website.
— Access restricted to staff who need it for their role.
— Passwords and credentials stored in a password manager, never in plain text.
— Government IDs and bank details stored separately from other records, with restricted access.
— Annual review of who has access to what.
— Staff trained on data handling when they join and refreshed yearly.
— A breach response plan, with notification to affected users and the Data Protection Board of India within 72 hours of a notifiable breach.

No system is perfectly secure. If something goes wrong, we'll tell you.

[11] Children's data
Our website is not directed at anyone under 18. We don't knowingly collect personal data from anyone under 18. If you believe we've collected data from a minor — yours, or someone you're responsible for — write to the grievance officer and we'll delete it within 30 days.

[12] Changes to this policy
We update this policy when our practices change, when the DPDP Act is updated, or when we add or remove a service that processes your data. When we update, we'll change the "Last updated" date at the top of this page. For material changes — a new use of your data, a new sharing partner, or a longer retention period — we'll also post a notice on the home page for 30 days.

If you've subscribed to the newsletter, we'll email you about material changes.

[13] Contact and grievance officer
If you have any question about this policy, want to use one of your rights, or want to file a complaint, write to us.

8Bit Creatives
[Registered address — to be filled in]
Mumbai, India

Grievance officer: [Name — to be filled in]
Email: [privacy@8bitcreatives.com — to be confirmed]
Phone: [optional — to be filled in]

We'll respond within 30 days. If you're not satisfied with our response, you may also raise a complaint with the Data Protection Board of India under the Digital Personal Data Protection Act, 2023.

[end of body copy]

LAYOUT & RESPONSIVE:
  • Reading column: 720px wide, centered on desktop (≥1280px). Full-width + 56px side padding on tablet (768–1279px). Full-width + 24px side padding on mobile (≤767px).
  • Top padding: 120px desktop / 96px tablet / 88px mobile — gives room for the fixed back-to-home capsule at the top-left.
  • Section gap: 64px desktop / 56px tablet / 48px mobile.
  • Body text: 15px desktop / 14px mobile, line-height 1.7, weight 300, white at 75% opacity.
  • Section titles: 22px desktop / 19px mobile, weight 500, white at 100% opacity, with a 1px white-12% border-bottom underneath.
  • H1 page title: 56px desktop / 36px mobile, weight 400, normal case.
  • Intro paragraph: 18px desktop / 16px mobile, weight 300, italic, white at 75% opacity.

CRITICAL CONSTRAINTS (read again before coding):
  • No all-caps text anywhere on the page (no `text-transform: uppercase`).
  • No Geist Mono font anywhere on the page (only Geist Sans).
  • No orange color anywhere on the page (no #FF5931).
  • No eyebrow titles above section headers.
  • No squarish shapes — minimum 14px corner radius on any block element.
  • No hover-to-popup (no tooltips, no overlays).
  • No hover-to-zoom-in (no scale transforms).
  • No site footer on this page — the page ends after section 13.
  • Include the shared back-to-home capsule at the top-left (same as every other subpage).
  • Match the visual language of the rest of the site (Geist Sans, dark background, soft corners, restrained motion).
  • Keep the placeholder bracketed fields (e.g. [Registered address — to be filled in]) as-is so the user can fill them in later.
````

---

## 10. Summary — what's in the deliverable

- **Reference analysis:** Mount Media (dark editorial, GDPR) + Sales&More (light, GDPR, comprehensive) → synthesis applied to 8Bit's design language.
- **Indian law base:** DPDP Act 2023 — Data Fiduciary, Data Principal, consent, retention, grievance officer, Data Protection Board of India.
- **13 numbered sections** — About → Information collected → How we use → Legal basis → Cookies → Sharing → International transfers → Retention → Rights → Security → Children's data → Changes → Contact.
- **Full body copy** — ~2800 words of plain English, 8Bit's voice, ready to paste. Bracketed placeholders for the user to fill in (registered address, grievance officer name, email, phone, analytics tool choice).
- **Design spec** — dark background, 720px reading column, Geist Sans only, no orange, no Geist Mono, no all-caps, no eyebrows, no squarish, no hover-popups, no hover-zoom.
- **Antigravity prompt** — the full ready-to-paste instruction block in section 9.

The deliverable file is at `/home/z/my-project/download/privacy-policy-strategy.md` (this document). The actual HTML page (`privacy-policy.html`) should be built by Antigravity using the prompt in section 9.
