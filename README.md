# 8Bit Creatives

> India's premier gaming & esports creator agency platform, interactive 3D coverflow roster, and multi-partner ops portal.

**Live Demo:** [8bit-creatives.vercel.app](https://8bit-creatives.vercel.app/)  
**Portfolio:** [divyarajchauhan.in](https://www.divyarajchauhan.in/)  
**GitHub Repository:** [github.com/diu-ctrl/8bit-creatives](https://github.com/diu-ctrl/8bit-creatives)  

---

## 1. Overview

**8Bit Creatives** is a gaming-first talent agency platform representing India's leading gaming creators, streamers, and competitive esports athletes (including Mortal, Payal, Snax, Soul Goblin, and the 8Bit BGMI roster). Founded in a Mumbai LAN room in 2018, 8Bit Creatives has delivered 300+ major brand campaigns for partners including ASUS, Red Bull, Krafton, Netflix, Realme, Cricbuzz, Vivo, and Amazon.

This repository powers the complete public website, internal operations portal, and three dedicated external partner dashboards (Creators, Brands, and Streaming Platforms).

---

## 2. Key Features

- **9 Public Pages:** Landing, About (with SVG interactive India map), Creator Roster, Case Study Archive, Services, Esports Roster, Full Interactive Case Study (Global Chess League S4), Privacy Policy, and Contact.
- **Matter.js Physics & Canvas Minigame:** Rotating interactive physics orb with 12 game characters and a playable Canvas 2D Dino runner embedded in the hero experience.
- **3D Coverflow Roster:** Perspective-based interactive coverflow carousel showcasing talent with morphing dialog cards.
- **Internal Ops Portal (`ops.html`):** 9 operational views for the internal team (executive dashboard, talent roster, brand approvals, campaign pipeline, brief intake, file vault, analytics reports, brand guide, and settings).
- **3 Partner Dashboards:** Tailored portal views for Talent/Creators, Brand Marketers, and Streaming Platforms (YouTube, Loco, Kick).
- **Production Hardened:** Strict Content Security Policy (CSP), HSTS preload, Permissions-Policy, SRI hashes on external CDNs, and honeypot-protected lead capture forms.
- **Zero-Framework Clean Engineering:** Handcrafted HTML5/CSS3/ES6+ architecture delivering sub-second load times without heavy client-side framework overhead.

---

## 3. Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Markup & Layout** | Handcrafted Semantic HTML5 |
| **Styles** | Vanilla CSS3 (`styles.css` & modular component styling) |
| **Interactivity** | Vanilla JavaScript (`app.js`, `navbar.js`) |
| **Animations** | GSAP 3.12 (ScrollTrigger, Flip, Observer) loaded via CDN with SRI |
| **Smooth Scrolling** | Lenis Smooth Scroll |
| **Physics Simulation** | Matter.js (2D rigid body physics engine) |
| **Shader & Canvas** | WebGL Velaris shader background & Canvas 2D engine |
| **Typography** | Geist Sans (Google Fonts) |
| **Forms** | Asynchronous Formspree API with client-side verification |
| **Hosting & CDN** | Vercel (Edge-cached, custom security headers, `cleanUrls`) |

---

## 4. Project Preview

- **Live Platform:** [8bit-creatives.vercel.app](https://8bit-creatives.vercel.app/)
- **Creator Roster:** [8bit-creatives.vercel.app/creators](https://8bit-creatives.vercel.app/creators)
- **Interactive Case Study:** [8bit-creatives.vercel.app/gcl-season-4](https://8bit-creatives.vercel.app/gcl-season-4)
- **Portfolio Case Study:** [divyarajchauhan.in/8bit-creatives](https://www.divyarajchauhan.in/8bit-creatives)

---

## 5. Getting Started

### Local Development
The project has zero complex build steps and can be run immediately:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/diu-ctrl/8bit-creatives.git
   cd 8bit-creatives
   ```

2. **Serve locally:**
   ```bash
   # Using npx serve:
   npx serve .

   # Or using Python:
   python -m http.server 3000
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 6. Author

**Divyaraj Chauhan**  
- Portfolio: [https://www.divyarajchauhan.in/](https://www.divyarajchauhan.in/)  
- GitHub: [@diu-ctrl](https://github.com/diu-ctrl)  
