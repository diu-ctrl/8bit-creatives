/**
 * 8Bit Creatives — app.js
 * Fresh build v2 per AGENTS.md v2 + GSAP hero animations.
 * No legacy imports. No external dependencies.
 */

// Register GSAP ScrollTrigger if loaded
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initEsportsAnchor();
  initHeroGSAP();
  initHeroCanvas();
  initAboutGSAP();
  initScrollReveal();
  initStatsCounter();
  initCaseStudies();
  initServicesGSAP();
  initServicesTouch();
  initFoundersGSAP();
  initCTAGSAP();
  initFooterLogoTilt();
  initCreatorStats();
  initEclipseGrass();
  initAboutCharacters();
  initAboutPhysics();
  initHeroDinoGame();
});

/* ==========================================================================
   1. NAVBAR BEHAVIOR (Dark on light sections + Hide logo & CTA outside hero)
   ========================================================================== */
function initNavbar() {
  

  const navbar = document.querySelector('.navbar-pill') 
              || document.querySelector('.navbar') 
              || document.querySelector('.site-header')
              || document.querySelector('.nav-pill')
              || document.getElementById('navbar')
              || document.getElementById('top');

  const logo = document.querySelector('.nav-brand-topleft');
  const cta  = document.querySelector('.nav-cta-topright');
  const hero = document.getElementById('hero');

  // Mobile drawer toggle
  const hamburger = document.querySelector('.navbar__hamburger');
  const drawer    = document.querySelector('.navbar__mobile-drawer');
  if (hamburger && drawer) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      drawer.classList.toggle('open');
      const expanded = drawer.classList.contains('open');
      hamburger.setAttribute('aria-expanded', expanded);
    });
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        drawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && !hamburger.contains(e.target)) {
        drawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // === STEP 2: HIDE LOGO + BUTTON WHEN SCROLLED PAST HERO ===
  if (!hero) { console.error('Hero section not found'); return; }
  if (!logo) console.warn('Logo element not found — selector wrong');
  if (!cta)  console.warn('CTA button not found — selector wrong');

  // Set transitions
  [logo, cta].forEach(el => {
    if (el) {
      el.style.transition = 'opacity 350ms ease, transform 350ms ease';
      el.style.willChange = 'opacity';
    }
  });

  // Show
  function show() {
    if (logo) { logo.style.opacity = '1'; logo.style.transform = 'translateY(0)'; logo.style.pointerEvents = 'auto'; }
    if (cta)  { cta.style.opacity  = '1'; cta.style.transform  = 'translateY(0)'; cta.style.pointerEvents  = 'auto'; }
  }
  // Hide
  function hide() {
    if (logo) { logo.style.opacity = '0'; logo.style.transform = 'translateY(-8px)'; logo.style.pointerEvents = 'none'; }
    if (cta)  { cta.style.opacity  = '0'; cta.style.transform  = 'translateY(-8px)'; cta.style.pointerEvents  = 'none'; }
  }

  // Initial state — visible
  show();

  // Observe hero — if hero is at least 5% visible, show. Otherwise hide.
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.05) {
        show();
      } else {
        hide();
      }
    });
  }, { threshold: [0, 0.05, 0.1, 0.2, 0.5, 1] });

  heroObserver.observe(hero);

  function checkHeroScroll() {
    const r = hero.getBoundingClientRect();
    if (r.bottom > 40 && r.top < window.innerHeight) {
      show();
    } else {
      hide();
    }

    // Drop navbar lower on hero (80px), top (24px) on other sections
    if (r.bottom > window.innerHeight * 0.4 && r.top <= 100) {
      navbar.classList.add('navbar-on-hero');
    } else {
      navbar.classList.remove('navbar-on-hero');
    }
  }
  let heroScrollTicking = false;
  window.addEventListener('scroll', function () {
    if (!heroScrollTicking) {
      requestAnimationFrame(function () {
        checkHeroScroll();
        heroScrollTicking = false;
      });
      heroScrollTicking = true;
    }
  }, { passive: true });
  window.addEventListener('resize', checkHeroScroll, { passive: true });
  checkHeroScroll();

  // Observer for navbar-on-hero
  const heroPosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
        navbar.classList.add('navbar-on-hero');
      } else {
        navbar.classList.remove('navbar-on-hero');
      }
    });
  }, { threshold: [0, 0.4, 0.6, 1] });
  heroPosObserver.observe(hero);

  

  // === STEP 3: CHANGE NAVBAR TEXT COLOR TO BLACK ON WHITE/BRIGHT SECTIONS ===
  if (!navbar) { console.error('Navbar element not found'); return; }

  const sections = document.querySelectorAll('section[data-bg], footer[data-bg], header[data-bg], main[data-bg], div[data-bg]');
  const bgSections = sections;
  if (!sections.length) {
    console.error('No sections with data-bg found. Add data-bg="dark" or data-bg="light" to each section.');
    return;
  }

  let currentBg = null;

  function setLight() {
    if (currentBg !== 'light') {
      navbar.classList.add('navbar-on-light');
      currentBg = 'light';
    }
  }
  function setDark() {
    if (currentBg !== 'dark') {
      navbar.classList.remove('navbar-on-light');
      currentBg = 'dark';
    }
  }

  function checkNavbarBg() {
    const navY = 42;
    let found = false;
    for (let i = bgSections.length - 1; i >= 0; i--) {
      const rect = bgSections[i].getBoundingClientRect();
      if (rect.top <= navY && rect.bottom > navY) {
        const bg = bgSections[i].dataset.bg || bgSections[i].getAttribute('data-bg') || 'dark';
        if (bg === 'light') setLight();
        else setDark();
        found = true;
        break;
      }
    }
    if (!found) {
      if (window.scrollY <= 10 && bgSections[0]) {
        const bg = bgSections[0].dataset.bg || bgSections[0].getAttribute('data-bg') || 'dark';
        if (bg === 'light') setLight();
        else setDark();
      } else {
        setDark();
      }
    }
  }

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bg = entry.target.dataset.bg || entry.target.getAttribute('data-bg');
          if (bg === 'light') setLight();
          else if (bg === 'dark') setDark();
        }
      });
    }, { rootMargin: '-40px 0px -85% 0px', threshold: [0, 0.1, 0.3, 0.5, 0.8, 1] });

    bgSections.forEach(s => sectionObserver.observe(s));
  }

  let navBgTicking = false;
  window.addEventListener('scroll', function () {
    if (!navBgTicking) {
      requestAnimationFrame(function () {
        checkNavbarBg();
        navBgTicking = false;
      });
      navBgTicking = true;
    }
  }, { passive: true });
  window.addEventListener('resize', checkNavbarBg, { passive: true });
  checkNavbarBg();
  // === STEP 4: ACTIVE SECTION HIGHLIGHTING (ORANGE TEXT, NO UNDERLINE) ===
  const navLinks = document.querySelectorAll('.navbar .nav-link, .navbar nav a, .navbar__links a, .navbar-pill .navbar__links a');
  if (navLinks.length) {
    const linkMap = new Map();
    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const id = href.replace('#', '');
      if (id) linkMap.set(id, link);
    });

    const targetSections = document.querySelectorAll('section[id]');
    let currentActive = null;

    function setActive(newActive) {
      if (newActive && newActive !== currentActive) {
        navLinks.forEach(l => l.classList.remove('is-active'));
        newActive.classList.add('is-active');
        currentActive = newActive;
        if (typeof window.updateNavbarIndicator === 'function') {
          window.updateNavbarIndicator(newActive, false);
        }
      }
    }

    function checkActiveSection() {
      const scrollPos = window.scrollY + 160;
      let currentId = null;

      targetSections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentId = sec.id;
        }
      });

      // Bottom of page bias to contact
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 80) {
        currentId = 'contact';
      }

      if (currentId && linkMap.has(currentId)) {
        setActive(linkMap.get(currentId));
      } else if (window.scrollY < 120 && linkMap.has('hero')) {
        setActive(linkMap.get('hero'));
      }
    }

    let activeSecTicking = false;
    window.addEventListener('scroll', function () {
      if (!activeSecTicking) {
        requestAnimationFrame(function () {
          checkActiveSection();
          activeSecTicking = false;
        });
        activeSecTicking = true;
      }
    }, { passive: true });
    window.addEventListener('resize', checkActiveSection, { passive: true });

    const activeSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          const id = entry.target.id;
          const newActive = linkMap.get(id);
          if (newActive) setActive(newActive);
        }
      });
    }, {
      threshold: [0.2, 0.4, 0.6, 0.8],
      rootMargin: '-80px 0px -40% 0px'
    });

    targetSections.forEach(s => activeSectionObserver.observe(s));

    // Default: highlight "Home" (hero section) on initial load
    const heroLink = linkMap.get('hero');
    if (heroLink) {
      heroLink.classList.add('is-active');
      currentActive = heroLink;
    }
    checkActiveSection();
  }

  
}

/* ==========================================================================
   NAVBAR ANCHOR REDIRECT & SMOOTH SCROLL (Esports, Creators, Work, Services)
   Aligns section content comfortably 28px below the floating navbar pill
   ========================================================================== */
function getNavbarOffset() {
  const nav = document.querySelector('.navbar-pill') || document.querySelector('.navbar');
  const isMobile = window.innerWidth <= 767;
  const navTop = isMobile ? 16 : 24;
  const navHeight = nav ? nav.offsetHeight : (isMobile ? 44 : 52);
  const navBottom = navTop + navHeight;
  const desiredGap = 28; // comfortably below navbar
  return navBottom + desiredGap;
}

function getEsportsTargetScrollY() {
  const card = document.querySelector('.esports-section__card');
  if (!card) return null;
  const targetOffset = getNavbarOffset();
  const cardAbsoluteTop = card.getBoundingClientRect().top + window.scrollY;
  return Math.max(0, Math.round(cardAbsoluteTop - targetOffset));
}

function getCreatorsTargetScrollY() {
  const target = document.querySelector('.creators-container') || document.getElementById('creators');
  if (!target) return null;
  const targetOffset = getNavbarOffset();
  const targetAbsoluteTop = target.getBoundingClientRect().top + window.scrollY;
  return Math.max(0, Math.round(targetAbsoluteTop - targetOffset));
}

function getWorkTargetScrollY() {
  const target = document.querySelector('.case-card') || document.getElementById('work');
  if (!target) return null;
  const targetOffset = getNavbarOffset();
  const targetAbsoluteTop = target.getBoundingClientRect().top + window.scrollY;
  return Math.max(0, Math.round(targetAbsoluteTop - targetOffset));
}

function getServicesTargetScrollY() {
  const target = document.querySelector('.services-title-band') || document.getElementById('services');
  if (!target) return null;
  const targetOffset = getNavbarOffset();
  const targetAbsoluteTop = target.getBoundingClientRect().top + window.scrollY;
  return Math.max(0, Math.round(targetAbsoluteTop - targetOffset));
}

function scrollToEsports(smooth = true) {
  const targetY = getEsportsTargetScrollY();
  if (targetY === null) return;
  window.scrollTo({
    top: targetY,
    behavior: smooth ? 'smooth' : 'auto'
  });
  if (window.history && window.history.pushState) {
    window.history.pushState(null, null, '#esports');
  }
}

function scrollToCreators(smooth = true) {
  const targetY = getCreatorsTargetScrollY();
  if (targetY === null) return;
  window.scrollTo({
    top: targetY,
    behavior: smooth ? 'smooth' : 'auto'
  });
  if (window.history && window.history.pushState) {
    window.history.pushState(null, null, '#creators');
  }
}

function scrollToWork(smooth = true) {
  const targetY = getWorkTargetScrollY();
  if (targetY === null) return;
  window.scrollTo({
    top: targetY,
    behavior: smooth ? 'smooth' : 'auto'
  });
  if (window.history && window.history.pushState) {
    window.history.pushState(null, null, '#work');
  }
}

function scrollToServices(smooth = true) {
  const targetY = getServicesTargetScrollY();
  if (targetY === null) return;
  window.scrollTo({
    top: targetY,
    behavior: smooth ? 'smooth' : 'auto'
  });
  if (window.history && window.history.pushState) {
    window.history.pushState(null, null, '#services');
  }
}

function initEsportsAnchor() {
  if (window.__esportsAnchorInit) return;
  window.__esportsAnchorInit = true;

  const closeMobileDrawer = () => {
    const drawer = document.querySelector('.navbar__mobile-drawer');
    const hamburger = document.querySelector('.navbar__hamburger');
    if (drawer && (drawer.classList.contains('open') || drawer.classList.contains('is-open'))) {
      drawer.classList.remove('open', 'is-open');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    }
  };

  const sections = [
    { id: 'esports', scrollFn: scrollToEsports, checkTarget: () => document.querySelector('.esports-section__card'), getScrollY: getEsportsTargetScrollY },
    { id: 'creators', scrollFn: scrollToCreators, checkTarget: () => document.querySelector('.creators-container') || document.getElementById('creators'), getScrollY: getCreatorsTargetScrollY },
    { id: 'work', scrollFn: scrollToWork, checkTarget: () => document.querySelector('.case-card') || document.getElementById('work'), getScrollY: getWorkTargetScrollY },
    { id: 'services', scrollFn: scrollToServices, checkTarget: () => document.querySelector('.services-title-band') || document.getElementById('services'), getScrollY: getServicesTargetScrollY }
  ];

  sections.forEach(({ id, scrollFn, checkTarget }) => {
    const links = document.querySelectorAll(`a[href="#${id}"], a[href$="#${id}"]`);
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        if (checkTarget()) {
          e.preventDefault();
          scrollFn(true);
          closeMobileDrawer();
        }
      });
    });
  });

  // Handle direct page loads or external navigation to index.html#[section]
  const currentHash = (window.location.hash || '').replace('#', '');
  const activeSec = sections.find(s => s.id === currentHash);
  if (activeSec) {
    const handleHashJump = () => {
      const targetY = activeSec.getScrollY();
      if (targetY !== null) {
        window.scrollTo({ top: targetY, behavior: 'instant' });
      }
    };
    requestAnimationFrame(handleHashJump);
    setTimeout(handleHashJump, 50);
    setTimeout(handleHashJump, 250);
  }

  window.addEventListener('hashchange', () => {
    const newHash = (window.location.hash || '').replace('#', '');
    const matchingSec = sections.find(s => s.id === newHash);
    if (matchingSec) {
      matchingSec.scrollFn(true);
    }
  });
}

/* ==========================================================================
   ABOUT GSAP ANIMATIONS
   ========================================================================== */
function initAboutGSAP() {
  if (typeof gsap === 'undefined') return;

  if (typeof ScrollTrigger !== 'undefined') {
    // 1. Eclipse scale-in on scroll-into-view
    gsap.fromTo('.eclipse',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-eclipse-section',
          start: 'top 70%',
          end: 'top 30%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // 2. Characters entrance (fade in without overriding rotational transforms)
    gsap.from('.eclipse-wrap .character', {
      opacity: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about-eclipse-section',
        start: 'top 60%'
      }
    });

    // 3. About text & CTA entrance
    gsap.from('.about-content > *, .about-cta-wrap', {
      opacity: 0,
      y: 24,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about-content',
        start: 'top 80%'
      }
    });

    // 4. Stat numbers count-up with ScrollTrigger
    document.querySelectorAll('.stat-num').forEach(el => {
      const targetText = el.textContent.trim();
      const target = parseInt(targetText.replace(/[^0-9]/g, '')) || 0;
      const suffix = targetText.replace(/[0-9]/g, '');
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = Math.round(obj.val) + suffix;
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%'
        }
      });
    });

    // 5. Stat labels and descriptions entrance
    gsap.from('.about-stats .stat-label, .about-stats .stat-desc', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about-stats',
        start: 'top 75%'
      }
    });
  }

  // 6. Marquee pause on hover
  const marquee = document.querySelector('.marquee-track');
  if (marquee) {
    marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
    marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
  }
}

/* ==========================================================================
   ABOUT: SHORT ANIMATED GRASS ON ECLIPSE PERIMETER
   ========================================================================== */
function initEclipseGrass() {
  const grassGroup = document.getElementById('eclipse-grass-blades');
  if (!grassGroup) return;

  const CX = 400, CY = 400;            // center of the 800x800 viewBox
  const GRASS_RADIUS = 400;            // was 405 — remove the gap, anchor exactly on the circle edge
  const NUM_BLADES = 800;              // was 320 — much denser
  const MIN_H = 12;                    // SHORT — so characters stay visible
  const MAX_H = 22;
  const MIN_W = 2;
  const MAX_W = 4;

  let seed = 73;
  function rand() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  function randRange(min, max) { return min + rand() * (max - min); }

  function bladePath(anchorX, anchorY, h, w, outwardAngle) {
    // Compute base corners (on the circle edge, perpendicular to outward direction)
    const perpX = -Math.sin(outwardAngle);
    const perpY = Math.cos(outwardAngle);
    const halfW = w / 2;
    const baseLX = anchorX + perpX * halfW;
    const baseLY = anchorY + perpY * halfW;
    const baseRX = anchorX - perpX * halfW;
    const baseRY = anchorY - perpY * halfW;

    // Tip (radially outward by height h)
    const tipX = anchorX + Math.cos(outwardAngle) * h;
    const tipY = anchorY + Math.sin(outwardAngle) * h;

    // Bezier control points — create an organic S-curve
    // The blade bends slightly perpendicular to its length
    const bend = randRange(-4, 4);
    const ctrlPerpX = perpX * bend;
    const ctrlPerpY = perpY * bend;
    // Mid-point of the blade (at 50% height)
    const midX = anchorX + Math.cos(outwardAngle) * (h * 0.5) + ctrlPerpX;
    const midY = anchorY + Math.sin(outwardAngle) * (h * 0.5) + ctrlPerpY;

    // Cubic Bezier path: left base → mid (with curve) → tip → mid (mirror) → right base
    return `M ${baseLX.toFixed(2)} ${baseLY.toFixed(2)}
            Q ${midX.toFixed(2)} ${midY.toFixed(2)} ${(tipX + perpX * 0.5).toFixed(2)} ${(tipY + perpY * 0.5).toFixed(2)}
            L ${tipX.toFixed(2)} ${tipY.toFixed(2)}
            Q ${midX.toFixed(2)} ${midY.toFixed(2)} ${baseRX.toFixed(2)} ${baseRY.toFixed(2)}
            Z`;
  }

  let svgString = '';
  for (let i = 0; i < NUM_BLADES; i++) {
    // Distribute around the full circle with slight jitter
    const angle = (i / NUM_BLADES) * Math.PI * 2 + randRange(-0.015, 0.015);
    const anchorX = CX + Math.cos(angle) * GRASS_RADIUS;
    const anchorY = CY + Math.sin(angle) * GRASS_RADIUS;
    // Outward direction = the same angle (from center → outward)
    const outwardAngle = angle;
    const h = randRange(MIN_H, MAX_H);
    const w = randRange(MIN_W, MAX_W);
    const d = bladePath(anchorX, anchorY, h, w, outwardAngle);
    // Per-blade sway
    const swayMin = (randRange(-6, -2)).toFixed(2);
    const swayMax = (randRange(2, 6)).toFixed(2);
    const swayDuration = randRange(2.5, 5.0).toFixed(2) + 's';
    const swayDelay = randRange(0, 3.0).toFixed(2) + 's';
    const opacity = randRange(0.8, 1.0).toFixed(2);
    const grad = rand() < 0.3 ? 'url(#eclipseGrassGradDark)' : 'url(#eclipseGrassGrad)';
    const style = `--sway-min: ${swayMin}deg; --sway-max: ${swayMax}deg; --sway-duration: ${swayDuration}; --sway-delay: ${swayDelay}; will-change: transform; transform-origin: ${anchorX.toFixed(2)}px ${anchorY.toFixed(2)}px; transform-box: view-box;`;
    svgString += `<path class="grass-blade" d="${d}" fill="${grad}" opacity="${opacity}" style="${style}"/>`;
  }
  grassGroup.innerHTML = svgString;
}

/* ==========================================================================
   ABOUT: 12 SVG CHARACTERS ON ECLIPSE PERIMETER (24 POSITIONS, EXACT FROM CHARACTERS.HTML)
   ========================================================================== */
function initAboutCharacters() {
  if (window.matchMedia('(max-width: 767px)').matches) return;
  const container = document.getElementById('eclipse-characters-svg');
  if (!container) return;

  const CX = 400, CY = 400;
  const RADIUS = 400;
  const SCALE = 0.70;
  const NUM_CHARS = 12;
  const NUM_POSITIONS = 12;
  const ANGLE_STEP = 360 / 12;  // 30° apart

  /* Generated 12 characters array */
const characters = [
  // Character 1
  `<g>
<defs>
        <linearGradient id="apexPurple" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#8A2BE2"/><stop offset="100%" stop-color="#5D1A8F"/>
        </linearGradient>
        <linearGradient id="apexTorsoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2A2A2A"/><stop offset="100%" stop-color="#1F1F1F"/>
        </linearGradient>
        <radialGradient id="apexGlow">
          <stop offset="0%" stop-color="#00FFFF"/><stop offset="100%" stop-color="#00FFFF" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="apexSkin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#D8C0A8"/><stop offset="100%" stop-color="#C0A088"/>
        </linearGradient>
      </defs>
      <!-- Hair bun -->
      <ellipse cx="60" cy="12" rx="14" ry="10" fill="#1A1A1A"/>
      <rect x="48" y="8" width="24" height="8" rx="4" fill="#1A1A1A"/>
      <!-- Shaved side lines -->
      <line x1="48" y1="16" x2="52" y2="20" stroke="#0A0A0A" stroke-width="1"/>
      <line x1="72" y1="16" x2="68" y2="20" stroke="#0A0A0A" stroke-width="1"/>
      <!-- Head with face definition -->
      <path d="M48 18 L72 18 L74 40 L46 40 Z" fill="url(#apexSkin)"/>
      <path d="M58 28 L62 28 L60 34 Z" fill="#B89878" opacity="0.6"/>
      <path d="M48 37 Q60 41 72 37 L72 40 L48 40 Z" fill="#000" opacity="0.1"/>
      <!-- Symmetrical glowing eyes -->
      <ellipse cx="54" cy="28" rx="3" ry="2" fill="#00FFFF" filter="url(#apexGlow)"/>
      <ellipse cx="66" cy="28" rx="3" ry="2" fill="#00FFFF" filter="url(#apexGlow)"/>
      <circle cx="54" cy="28" r="1.2" fill="#FFFFFF"/>
      <circle cx="66" cy="28" r="1.2" fill="#FFFFFF"/>
      <!-- Neck connector -->
      <rect x="54" y="38" width="12" height="6" fill="#C0A088"/>
      <!-- Scarf / collar -->
      <path d="M40 42 L80 42 L84 54 L36 54 Z" fill="#4A4A4A"/>
      <line x1="44" y1="46" x2="76" y2="46" stroke="#3A3A3A" stroke-width="1"/>
      <!-- Torso with subtle gradient -->
      <path d="M44 54 L76 54 L80 108 L40 108 Z" fill="url(#apexTorsoGrad)"/>
      <path d="M44 54 L76 54 L74 80 L46 80 Z" fill="#2A2A2A" opacity="0.3"/>
      <!-- Purple chest accent (V-shape) -->
      <path d="M50 56 L70 56 L65 82 L55 82 Z" fill="url(#apexPurple)"/>
      <line x1="60" y1="56" x2="60" y2="82" stroke="#A040E0" stroke-width="1" opacity="0.5"/>
      <!-- Belt -->
      <rect x="40" y="106" width="40" height="5" fill="#555"/>
      <rect x="56" y="106" width="8" height="5" fill="#777"/>
      <!-- Left arm (armored, purple) -->
      <rect x="28" y="58" width="12" height="40" rx="3" fill="url(#apexPurple)"/>
      <line x1="28" y1="68" x2="40" y2="68" stroke="#3D1A6F" stroke-width="1"/>
      <line x1="28" y1="78" x2="40" y2="78" stroke="#3D1A6F" stroke-width="1"/>
      <line x1="28" y1="88" x2="40" y2="88" stroke="#3D1A6F" stroke-width="1"/>
      <rect x="28" y="96" width="12" height="8" rx="2" fill="#333"/>
      <circle cx="34" cy="103" r="5" fill="#D8C0A8"/>
      <!-- Right arm & Connected Energy Hand -->
      <rect x="80" y="58" width="12" height="38" rx="3" fill="#222"/>
      <line x1="80" y1="68" x2="92" y2="68" stroke="#333" stroke-width="1"/>
      <!-- Right hand circle seamlessly attached to arm -->
      <circle cx="86" cy="98" r="6" fill="#1A1A1A"/>
      <!-- Energy glow centered directly on hand -->
      <circle cx="86" cy="98" r="8" fill="#00FFFF" opacity="0.4" filter="url(#apexGlow)"/>
      <circle cx="86" cy="98" r="4.5" fill="#00FFFF" opacity="0.85"/>
      <circle cx="86" cy="98" r="1.5" fill="#FFFFFF"/>
      <!-- Legs -->
      <rect x="42" y="111" width="16" height="55" rx="4" fill="#121212"/>
      <rect x="62" y="111" width="16" height="55" rx="4" fill="#121212"/>
      <rect x="44" y="120" width="6" height="10" rx="1" fill="#1A1A1A" opacity="0.6"/>
      <rect x="70" y="120" width="6" height="10" rx="1" fill="#1A1A1A" opacity="0.6"/>
      <rect x="42" y="140" width="16" height="6" rx="2" fill="#333"/>
      <rect x="62" y="140" width="16" height="6" rx="2" fill="#333"/>
      <!-- Boots with toe separation lines -->
      <rect x="40" y="163" width="20" height="14" rx="2" fill="#2B2B2B"/>
      <rect x="60" y="163" width="20" height="14" rx="2" fill="#2B2B2B"/>
      <line x1="46" y1="166" x2="46" y2="175" stroke="#181818" stroke-width="1"/>
      <line x1="52" y1="166" x2="52" y2="175" stroke="#181818" stroke-width="1"/>
      <line x1="66" y1="166" x2="66" y2="175" stroke="#181818" stroke-width="1"/>
      <line x1="72" y1="166" x2="72" y2="175" stroke="#181818" stroke-width="1"/>
      <rect x="40" y="175" width="20" height="3" fill="#8B0000"/>
      <rect x="60" y="175" width="20" height="3" fill="#8B0000"/>
  </g>`,
  // Character 2
  `<g>
<defs>
        <linearGradient id="bgmiHelmet" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#3A3A3A"/><stop offset="100%" stop-color="#1A1A1A"/>
        </linearGradient>
        <linearGradient id="bgmiShirt" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#E8E8E8"/>
        </linearGradient>
        <linearGradient id="bgmiPants" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2A2A2A"/><stop offset="100%" stop-color="#1A1A1A"/>
        </linearGradient>
      </defs>
      <!-- Head -->
      <rect x="48" y="24" width="24" height="22" rx="4" fill="#D8B88C"/>
      <!-- Face details -->
      <circle cx="54" cy="35" r="1.5" fill="#222"/>
      <circle cx="66" cy="35" r="1.5" fill="#222"/>
      <line x1="60" y1="37" x2="60" y2="40" stroke="#B89878" stroke-width="1.5"/>
      <line x1="56" y1="42" x2="64" y2="42" stroke="#A87858" stroke-width="1"/>
      <!-- Neck -->
      <rect x="54" y="44" width="12" height="6" fill="#D8B88C"/>
      <!-- LV3 Spetsnaz Helmet with Top Bump, Visor Mount & Side Rails -->
      <ellipse cx="60" cy="14" rx="16" ry="6" fill="#444444"/>
      <ellipse cx="60" cy="22" rx="21" ry="16" fill="url(#bgmiHelmet)"/>
      <rect x="39" y="28" width="42" height="6" rx="1" fill="#1A1A1A"/>
      <!-- Front visor/goggle mount bracket -->
      <rect x="52" y="20" width="16" height="4" rx="1" fill="#2A2A2A" stroke="#111" stroke-width="0.5"/>
      <!-- Helmet side rails -->
      <rect x="37" y="24" width="4" height="8" rx="1" fill="#2A2A2A"/>
      <rect x="79" y="24" width="4" height="8" rx="1" fill="#2A2A2A"/>
      <!-- Chin strap with buckle -->
      <path d="M42 32 Q40 43 45 46 L75 46 Q80 43 78 32" stroke="#2A2A2A" stroke-width="2" fill="none"/>
      <rect x="57" y="44" width="6" height="4" rx="1" fill="#777" stroke="#333" stroke-width="0.5"/>
      <!-- White shirt / torso -->
      <path d="M38 48 L82 48 L86 108 L34 108 Z" fill="url(#bgmiShirt)"/>
      <!-- Collar & Black tie -->
      <path d="M48 48 L60 56 L72 48 L70 44 L50 44 Z" fill="#E0E0E0"/>
      <path d="M57 48 L63 48 L62 56 L58 56 Z" fill="#1A1A1A"/>
      <path d="M58 56 L62 56 L64 90 L56 90 Z" fill="#1A1A1A"/>
      <!-- Tactical vest overlay -->
      <path d="M40 52 L80 52 L82 100 L38 100 Z" fill="#333" opacity="0.4"/>
      <!-- Vest straps (2 vertical + 1 horizontal) -->
      <line x1="46" y1="52" x2="46" y2="100" stroke="#1A1A1A" stroke-width="2"/>
      <line x1="74" y1="52" x2="74" y2="100" stroke="#1A1A1A" stroke-width="2"/>
      <line x1="40" y1="76" x2="80" y2="76" stroke="#1A1A1A" stroke-width="2"/>
      <!-- Badge/patch on vest -->
      <rect x="42" y="58" width="10" height="6" rx="1" fill="#B22222"/>
      <line x1="42" y1="61" x2="52" y2="61" stroke="#FFD700" stroke-width="1"/>
      <!-- Vest pouches -->
      <rect x="40" y="64" width="10" height="12" rx="1" fill="#333" opacity="0.7"/>
      <rect x="70" y="64" width="10" height="12" rx="1" fill="#333" opacity="0.7"/>
      <!-- Arms -->
      <rect x="26" y="52" width="12" height="44" rx="3" fill="url(#bgmiShirt)"/>
      <rect x="82" y="52" width="12" height="44" rx="3" fill="url(#bgmiShirt)"/>
      <circle cx="32" cy="99" r="6" fill="#D8B88C"/>
      <circle cx="88" cy="99" r="6" fill="#D8B88C"/>
      <!-- Rifle -->
      <rect x="20" y="94" width="50" height="5" rx="1" fill="#2A2A2A"/>
      <rect x="20" y="92" width="8" height="3" fill="#1A1A1A"/>
      <rect x="30" y="90" width="8" height="4" rx="1" fill="#333"/>
      <rect x="34" y="99" width="6" height="12" rx="1" fill="#2A2A2A"/>
      <rect x="50" y="99" width="14" height="6" rx="1" fill="#1A1A1A"/>
      <!-- Black army pants -->
      <rect x="40" y="108" width="18" height="58" rx="4" fill="url(#bgmiPants)"/>
      <rect x="62" y="108" width="18" height="58" rx="4" fill="url(#bgmiPants)"/>
      <rect x="42" y="118" width="6" height="12" rx="1" fill="#0A0A0A" opacity="0.5"/>
      <rect x="72" y="118" width="6" height="12" rx="1" fill="#0A0A0A" opacity="0.5"/>
      <rect x="40" y="140" width="18" height="7" rx="2" fill="#0A0A0A"/>
      <rect x="62" y="140" width="18" height="7" rx="2" fill="#0A0A0A"/>
      <!-- Black boots -->
      <rect x="38" y="163" width="22" height="16" rx="2" fill="#0A0A0A"/>
      <rect x="60" y="163" width="22" height="16" rx="2" fill="#0A0A0A"/>
      <line x1="38" y1="166" x2="60" y2="166" stroke="#333" stroke-width="1"/>
      <line x1="60" y1="166" x2="82" y2="166" stroke="#333" stroke-width="1"/>
  </g>`,
  // Character 3
  `<g>
<defs>
        <linearGradient id="chessGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FAF5E8"/><stop offset="45%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#E8DFD0"/>
        </linearGradient>
        <linearGradient id="chessShadow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.16"/>
        </linearGradient>
      </defs>
      <g transform="translate(6, 12) scale(0.9)">
        <!-- Sharpened battlement edges (polygons) -->
        <polygon points="35,24 35,11 40,8 45,11 45,24" fill="url(#chessGrad)"/>
        <polygon points="48,24 48,11 53,8 58,11 58,24" fill="url(#chessGrad)"/>
        <polygon points="62,24 62,11 67,8 72,11 72,24" fill="url(#chessGrad)"/>
        <polygon points="75,24 75,11 80,8 85,11 85,24" fill="url(#chessGrad)"/>
        <!-- Battlement shadow gaps -->
        <rect x="45" y="10" width="3" height="12" fill="#1A1A1A"/>
        <rect x="58" y="10" width="3" height="12" fill="#1A1A1A"/>
        <rect x="72" y="10" width="3" height="12" fill="#1A1A1A"/>
        <!-- Top band -->
        <rect x="33" y="24" width="54" height="4" rx="1" fill="#C8BDA5"/>
        <rect x="35" y="28" width="50" height="5" rx="1" fill="url(#chessGrad)"/>
        <!-- Upper body (tapered) with shadow -->
        <path d="M39 33 L81 33 L75 82 L45 82 Z" fill="url(#chessGrad)"/>
        <path d="M39 33 L81 33 L75 82 L45 82 Z" fill="url(#chessShadow)"/>
        <!-- Left edge highlight line (15% opacity) -->
        <path d="M41 34 L46 81" stroke="#FFFFFF" stroke-width="2" opacity="0.15" fill="none"/>
        <!-- Wood/stone grain texture lines -->
        <line x1="51" y1="36" x2="49" y2="80" stroke="#C0B5A0" stroke-width="0.5"/>
        <line x1="60" y1="36" x2="60" y2="80" stroke="#C0B5A0" stroke-width="0.5"/>
        <line x1="69" y1="36" x2="71" y2="80" stroke="#C0B5A0" stroke-width="0.5"/>
        <!-- Middle band -->
        <rect x="43" y="82" width="34" height="3" rx="1" fill="#C8BDA5"/>
        <rect x="45" y="85" width="30" height="4" rx="1" fill="url(#chessGrad)"/>
        <!-- Lower body (wider, tapered) -->
        <path d="M45 89 L75 89 L78 152 L42 152 Z" fill="url(#chessGrad)"/>
        <path d="M45 89 L75 89 L78 152 L42 152 Z" fill="url(#chessShadow)"/>
        <path d="M44 91 L43 151" stroke="#FFFFFF" stroke-width="2" opacity="0.15" fill="none"/>
        <line x1="50" y1="95" x2="48" y2="148" stroke="#C0B5A0" stroke-width="0.5"/>
        <line x1="64" y1="95" x2="65" y2="148" stroke="#C0B5A0" stroke-width="0.5"/>
        <!-- Stepped, slightly narrower base (width: 56px) -->
        <rect x="36" y="152" width="48" height="6" rx="1" fill="#C8BDA5"/>
        <rect x="34" y="158" width="52" height="7" rx="2" fill="url(#chessGrad)"/>
        <rect x="32" y="165" width="56" height="15" rx="3" fill="url(#chessGrad)"/>
        <rect x="32" y="165" width="56" height="15" rx="3" fill="url(#chessShadow)"/>
        <rect x="32" y="178" width="56" height="2" fill="#A89D85"/>
      </g>
  </g>`,
  // Character 4
  `<g>
<defs>
        <linearGradient id="codmDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2A2A2A"/><stop offset="100%" stop-color="#1A1A1A"/>
        </linearGradient>
        <radialGradient id="codmGoggle">
          <stop offset="0%" stop-color="#00CCFF"/><stop offset="100%" stop-color="#0066AA"/>
        </radialGradient>
      </defs>
      <!-- Helmet -->
      <path d="M44 8 Q60 2 76 8 L78 22 L42 22 Z" fill="#1A1A1A"/>
      <rect x="42" y="20" width="36" height="4" fill="#0A0A0A"/>
      <rect x="52" y="22" width="16" height="3" fill="#333"/>
      <!-- Head with balaclava -->
      <rect x="50" y="22" width="20" height="24" rx="5" fill="#C8A878"/>
      <!-- Curved visor following head contour -->
      <path d="M47 28 Q60 25 73 28 L73 37 Q60 34 47 37 Z" fill="#2A2A2A" rx="2"/>
      <circle cx="53" cy="33" r="2.8" fill="url(#codmGoggle)"/>
      <circle cx="60" cy="32" r="2.8" fill="url(#codmGoggle)"/>
      <circle cx="67" cy="33" r="2.8" fill="url(#codmGoggle)"/>
      <circle cx="53" cy="33" r="1" fill="#FFFFFF" opacity="0.6"/>
      <circle cx="60" cy="32" r="1" fill="#FFFFFF" opacity="0.6"/>
      <circle cx="67" cy="33" r="1" fill="#FFFFFF" opacity="0.6"/>
      <!-- Tactical mask with balaclava seam lines -->
      <path d="M48 40 L72 40 L70 48 L50 48 Z" fill="#2A2A2A"/>
      <line x1="50" y1="42" x2="70" y2="42" stroke="#111" stroke-width="1"/>
      <line x1="51" y1="46" x2="69" y2="46" stroke="#111" stroke-width="1"/>
      <!-- Torso -->
      <path d="M40 48 L80 48 L84 105 L36 105 Z" fill="url(#codmDark)"/>
      <line x1="40" y1="60" x2="80" y2="60" stroke="#0A0A0A" stroke-width="1"/>
      <line x1="40" y1="85" x2="80" y2="85" stroke="#0A0A0A" stroke-width="1"/>
      <rect x="44" y="62" width="10" height="12" rx="2" fill="#333"/>
      <rect x="66" y="62" width="10" height="12" rx="2" fill="#333"/>
      <!-- Arms with rounded corners (rx: 5) and elbow joints -->
      <rect x="24" y="52" width="14" height="35" rx="5" fill="url(#codmDark)" transform="rotate(15, 31, 69)"/>
      <circle cx="29" cy="68" r="3.5" fill="#1A1A1A"/>
      <rect x="82" y="52" width="14" height="38" rx="5" fill="url(#codmDark)" transform="rotate(-10, 89, 71)"/>
      <circle cx="89" cy="70" r="3.5" fill="#1A1A1A"/>
      <!-- Hands -->
      <circle cx="22" cy="90" r="5" fill="#C8A878"/>
      <circle cx="96" cy="92" r="5" fill="#C8A878"/>
      <ellipse cx="48" cy="120" rx="10" ry="5" fill="#333"/>
      <ellipse cx="72" cy="120" rx="10" ry="5" fill="#333"/>
      <!-- Legs with rx: 5 -->
      <rect x="40" y="105" width="18" height="40" rx="5" fill="#1A1A1A" transform="rotate(12, 49, 125)"/>
      <rect x="62" y="105" width="18" height="40" rx="5" fill="#1A1A1A" transform="rotate(-10, 71, 125)"/>
      <rect x="38" y="145" width="16" height="30" rx="4" fill="#1A1A1A"/>
      <rect x="66" y="145" width="16" height="30" rx="4" fill="#1A1A1A"/>
      <rect x="36" y="173" width="20" height="14" rx="2" fill="#0A0A0A"/>
      <rect x="64" y="173" width="20" height="14" rx="2" fill="#0A0A0A"/>
      <line x1="36" y1="176" x2="56" y2="176" stroke="#333" stroke-width="1"/>
      <line x1="64" y1="176" x2="84" y2="176" stroke="#333" stroke-width="1"/>
  </g>`,
  // Character 5
  `<g>
<defs>
        <linearGradient id="cs2Uniform" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#3A5066"/><stop offset="100%" stop-color="#2A3A4E"/>
        </linearGradient>
        <linearGradient id="cs2Helmet" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2A3A4E"/><stop offset="100%" stop-color="#1A2A3E"/>
        </linearGradient>
      </defs>
      <!-- Helmet with vents -->
      <path d="M44 6 Q60 0 76 6 L78 24 L42 24 Z" fill="url(#cs2Helmet)"/>
      <rect x="42" y="22" width="36" height="4" fill="#1A2A3E"/>
      <line x1="60" y1="6" x2="60" y2="22" stroke="#1A2A3E" stroke-width="0.5"/>
      <!-- Helmet ventilation slits -->
      <line x1="45" y1="14" x2="50" y2="14" stroke="#111" stroke-width="1.2"/>
      <line x1="45" y1="17" x2="50" y2="17" stroke="#111" stroke-width="1.2"/>
      <line x1="70" y1="14" x2="75" y2="14" stroke="#111" stroke-width="1.2"/>
      <line x1="70" y1="17" x2="75" y2="17" stroke="#111" stroke-width="1.2"/>
      <!-- Head with balaclava -->
      <rect x="50" y="22" width="20" height="28" rx="6" fill="#3A4A5E"/>
      <rect x="52" y="33" width="16" height="5" rx="1" fill="#1A1A1A"/>
      <rect x="54" y="34" width="5" height="2" fill="#00CCFF" opacity="0.8"/>
      <rect x="61" y="34" width="5" height="2" fill="#00CCFF" opacity="0.8"/>
      <!-- Neck connector -->
      <rect x="54" y="47" width="12" height="7" rx="1" fill="#2A3A4E"/>
      <!-- Torso -->
      <path d="M38 54 L82 54 L84 112 L36 112 Z" fill="url(#cs2Uniform)"/>
      <path d="M42 57 L78 57 L80 105 L40 105 Z" fill="#2A3A4E" opacity="0.7"/>
      <!-- Chest armor panel lines -->
      <line x1="42" y1="68" x2="78" y2="68" stroke="#1A2A3E" stroke-width="1"/>
      <line x1="42" y1="80" x2="78" y2="80" stroke="#1A2A3E" stroke-width="1"/>
      <line x1="42" y1="92" x2="78" y2="92" stroke="#1A2A3E" stroke-width="1"/>
      <line x1="60" y1="57" x2="60" y2="105" stroke="#1A2A3E" stroke-width="0.8"/>
      <!-- Straps & Pouches -->
      <rect x="48" y="60" width="3" height="44" fill="#1A2A3E"/>
      <rect x="69" y="60" width="3" height="44" fill="#1A2A3E"/>
      <rect x="38" y="76" width="8" height="12" rx="1" fill="#2A3A4E"/>
      <rect x="74" y="76" width="8" height="12" rx="1" fill="#2A3A4E"/>
      <!-- Arms -->
      <rect x="26" y="57" width="12" height="46" rx="3" fill="url(#cs2Uniform)"/>
      <rect x="82" y="57" width="12" height="46" rx="3" fill="url(#cs2Uniform)"/>
      <circle cx="32" cy="106" r="5" fill="#1A1A1A"/>
      <circle cx="88" cy="106" r="5" fill="#1A1A1A"/>
      <!-- Legs -->
      <rect x="40" y="112" width="18" height="58" rx="4" fill="#2A3A4E"/>
      <rect x="62" y="112" width="18" height="58" rx="4" fill="#2A3A4E"/>
      <rect x="40" y="140" width="18" height="7" rx="2" fill="#1A2A3E"/>
      <rect x="62" y="140" width="18" height="7" rx="2" fill="#1A2A3E"/>
      <!-- Slightly wider boots (24px) for solid proportion -->
      <rect x="37" y="167" width="24" height="16" rx="2" fill="#1A1A1A"/>
      <rect x="59" y="167" width="24" height="16" rx="2" fill="#1A1A1A"/>
      <line x1="37" y1="170" x2="61" y2="170" stroke="#333" stroke-width="1"/>
      <line x1="59" y1="170" x2="83" y2="170" stroke="#333" stroke-width="1"/>
  </g>`,
  // Character 6
  `<g>
<defs>
        <linearGradient id="efcJersey" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#E03C31"/><stop offset="100%" stop-color="#B71C1C"/>
        </linearGradient>
        <linearGradient id="efcSkin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#D8B88C"/><stop offset="100%" stop-color="#C8A878"/>
        </linearGradient>
      </defs>
      <!-- Head & Face -->
      <circle cx="55" cy="22" r="13" fill="url(#efcSkin)"/>
      <path d="M42 18 A13 13 0 0 1 68 18 L68 12 L42 12 Z" fill="#3A2A1A"/>
      <path d="M45 14 Q55 8 65 14 L65 18 L45 18 Z" fill="#2A1A0A"/>
      <circle cx="51" cy="24" r="1.5" fill="#333"/>
      <circle cx="59" cy="24" r="1.5" fill="#333"/>
      <path d="M50 30 Q55 33 60 30" stroke="#A87858" stroke-width="1" fill="none"/>
      <rect x="50" y="34" width="10" height="6" fill="#C8A878"/>
      <!-- Jersey / torso -->
      <path d="M38 40 L72 40 L76 92 L34 92 Z" fill="url(#efcJersey)"/>
      <rect x="53" y="40" width="4" height="52" fill="#FFFFFF" opacity="0.3"/>
      <path d="M46 40 L64 40 L60 46 L50 46 Z" fill="#B71C1C"/>
      <!-- Both arms clearly visible for balance -->
      <g transform="rotate(-32, 38, 44)">
        <rect x="28" y="44" width="12" height="38" rx="4" fill="url(#efcJersey)"/>
        <circle cx="34" cy="84" r="5" fill="url(#efcSkin)"/>
      </g>
      <g transform="rotate(20, 74, 44)">
        <rect x="70" y="44" width="12" height="36" rx="4" fill="url(#efcJersey)"/>
        <circle cx="76" cy="82" r="5" fill="url(#efcSkin)"/>
      </g>
      <!-- Shorts -->
      <path d="M36 92 L74 92 L72 112 L56 112 L52 112 L38 112 Z" fill="#1A1A1A"/>
      <!-- Standing leg -->
      <rect x="40" y="112" width="14" height="55" rx="4" fill="url(#efcSkin)"/>
      <ellipse cx="47" cy="138" rx="7" ry="3" fill="#B89878"/>
      <rect x="38" y="165" width="18" height="10" rx="2" fill="#1A1A1A"/>
      <!-- Clearly bent kicking leg: shorter thigh, prominent knee, angled longer shin -->
      <path d="M58 112 L72 112 L78 128 L64 128 Z" fill="url(#efcSkin)"/>
      <!-- Prominent knee joint -->
      <circle cx="71" cy="128" r="6" fill="#B89878"/>
      <!-- Shin angled down-forward to the ball -->
      <path d="M66 130 L76 130 L88 154 L78 154 Z" fill="url(#efcSkin)"/>
      <ellipse cx="83" cy="154" rx="4.5" ry="3" fill="#C8A878"/>
      <!-- Cleat pointing at ball -->
      <path d="M79 153 L92 153 L96 160 L79 160 Z" fill="#1A1A1A"/>
      <!-- Classic soccer ball pattern with central & perimeter pentagons -->
      <g transform="translate(102, 160)">
        <circle cx="0" cy="0" r="9.5" fill="#FFFFFF" stroke="#222" stroke-width="1.2"/>
        <!-- Central pentagon -->
        <polygon points="0,-3 3,-1 2,3 -2,3 -3,-1" fill="#1A1A1A"/>
        <!-- 5 connecting seam lines -->
        <line x1="0" y1="-3" x2="0" y2="-8" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="3" y1="-1" x2="7.5" y2="-3" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="2" y1="3" x2="5.5" y2="7" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="-2" y1="3" x2="-5.5" y2="7" stroke="#1A1A1A" stroke-width="1"/>
        <line x1="-3" y1="-1" x2="-7.5" y2="-3" stroke="#1A1A1A" stroke-width="1"/>
        <!-- Outer edge patches -->
        <polygon points="-2,-8 2,-8 0,-6" fill="#1A1A1A"/>
        <polygon points="7.5,-4 8.5,-1 6,-2" fill="#1A1A1A"/>
        <polygon points="5,6.5 7.5,4.5 4,5" fill="#1A1A1A"/>
      </g>
  </g>`,
  // Character 7
  `<g>
<defs>
        <linearGradient id="ffHoodie" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FF6B35"/><stop offset="100%" stop-color="#CC4A1E"/>
        </linearGradient>
        <linearGradient id="ffSkin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#D8B88C"/><stop offset="100%" stop-color="#C8A878"/>
        </linearGradient>
      </defs>
      <!-- Backpack -->
      <rect x="34" y="48" width="52" height="50" rx="6" fill="#8B4513" opacity="0.4"/>
      <!-- Rounded 3D Hood with curves -->
      <path d="M38 10 Q60 -4 82 10 Q88 22 82 34 Q60 40 38 34 Q32 22 38 10 Z" fill="url(#ffHoodie)"/>
      <path d="M44 14 Q60 4 76 14 L74 30 L46 30 Z" fill="#000" opacity="0.38"/>
      <!-- Head inside hood -->
      <ellipse cx="60" cy="25" rx="12" ry="14" fill="url(#ffSkin)"/>
      <path d="M48 20 Q60 12 72 20 L72 16 L48 16 Z" fill="#000" opacity="0.25"/>
      <circle cx="55" cy="27" r="1.5" fill="#333"/>
      <circle cx="65" cy="27" r="1.5" fill="#333"/>
      <rect x="56" y="33" width="8" height="2" rx="1" fill="#A87858"/>
      <!-- Hood opening collar -->
      <ellipse cx="60" cy="36" rx="18" ry="6" fill="url(#ffHoodie)"/>
      <!-- Torso -->
      <path d="M38 38 L82 38 L86 108 L34 108 Z" fill="url(#ffHoodie)"/>
      <!-- Hoodie drawstrings with terminal knot circles -->
      <line x1="56" y1="40" x2="56" y2="64" stroke="#FFFFFF" stroke-width="2" opacity="0.8"/>
      <circle cx="56" cy="65" r="2.5" fill="#FFFFFF" opacity="0.9"/>
      <line x1="64" y1="40" x2="64" y2="64" stroke="#FFFFFF" stroke-width="2" opacity="0.8"/>
      <circle cx="64" cy="65" r="2.5" fill="#FFFFFF" opacity="0.9"/>
      <!-- Curved kangaroo pocket -->
      <path d="M44 72 Q60 68 76 72 L73 88 Q60 92 47 88 Z" fill="#B73C14" stroke="#8E2D0E" stroke-width="0.8"/>
      <!-- Arms -->
      <rect x="24" y="42" width="12" height="48" rx="3" fill="url(#ffHoodie)"/>
      <rect x="84" y="42" width="12" height="40" rx="3" fill="url(#ffHoodie)"/>
      <!-- Hands & Pistol -->
      <circle cx="90" cy="85" r="5" fill="url(#ffSkin)"/>
      <rect x="84" y="82" width="4" height="14" rx="1" fill="#2A2A2A"/>
      <rect x="84" y="82" width="14" height="4" rx="1" fill="#2A2A2A"/>
      <rect x="96" y="83" width="2" height="3" fill="#444"/>
      <circle cx="30" cy="92" r="5" fill="url(#ffSkin)"/>
      <!-- Legs -->
      <rect x="42" y="108" width="16" height="58" rx="4" fill="#3A3A3A"/>
      <rect x="62" y="108" width="16" height="58" rx="4" fill="#3A3A3A"/>
      <rect x="44" y="118" width="6" height="12" rx="1" fill="#2A2A2A" opacity="0.5"/>
      <rect x="70" y="118" width="6" height="12" rx="1" fill="#2A2A2A" opacity="0.5"/>
      <!-- Boots with shoelaces -->
      <rect x="40" y="163" width="20" height="14" rx="2" fill="#1A1A1A"/>
      <rect x="60" y="163" width="20" height="14" rx="2" fill="#1A1A1A"/>
      <line x1="44" y1="166" x2="56" y2="166" stroke="#666" stroke-width="1"/>
      <line x1="44" y1="169" x2="56" y2="169" stroke="#666" stroke-width="1"/>
      <line x1="64" y1="166" x2="76" y2="166" stroke="#666" stroke-width="1"/>
      <line x1="64" y1="169" x2="76" y2="169" stroke="#666" stroke-width="1"/>
  </g>`,
  // Character 8
  `<g>
<defs>
        <linearGradient id="mobaArmor" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#5A8AD5"/><stop offset="50%" stop-color="#3D649A"/><stop offset="100%" stop-color="#2A4A7A"/>
        </linearGradient>
        <linearGradient id="mobaCape" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#B21C01"/><stop offset="100%" stop-color="#7A1001"/>
        </linearGradient>
        <linearGradient id="mobaBlade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#E0E0E0"/><stop offset="50%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#C0C0C0"/>
        </linearGradient>
      </defs>
      <!-- Cape with 3 fold lines -->
      <path d="M38 42 L82 42 L92 155 L28 155 Z" fill="url(#mobaCape)" opacity="0.85"/>
      <path d="M46 45 Q42 100 34 155" stroke="#5A0800" stroke-width="2" fill="none" opacity="0.7"/>
      <path d="M60 45 Q60 100 60 155" stroke="#5A0800" stroke-width="2" fill="none" opacity="0.5"/>
      <path d="M74 45 Q78 100 86 155" stroke="#5A0800" stroke-width="2" fill="none" opacity="0.7"/>
      <!-- Helmet with visor slit & breathing grill -->
      <path d="M46 4 L74 4 L78 32 L42 32 Z" fill="url(#mobaArmor)"/>
      <path d="M50 4 L60 -2 L70 4 Z" fill="#75A5F0"/>
      <!-- Visor slit -->
      <rect x="50" y="20" width="20" height="5" rx="1" fill="#1A2A4A"/>
      <rect x="53" y="22" width="14" height="2" fill="#00CCFF" opacity="0.85"/>
      <!-- Breathing grill below visor -->
      <line x1="54" y1="27" x2="54" y2="30" stroke="#1A2A4A" stroke-width="1.2"/>
      <line x1="58" y1="27" x2="58" y2="30" stroke="#1A2A4A" stroke-width="1.2"/>
      <line x1="62" y1="27" x2="62" y2="30" stroke="#1A2A4A" stroke-width="1.2"/>
      <line x1="66" y1="27" x2="66" y2="30" stroke="#1A2A4A" stroke-width="1.2"/>
      <!-- Pauldrons -->
      <ellipse cx="34" cy="46" rx="14" ry="12" fill="url(#mobaArmor)"/>
      <ellipse cx="86" cy="46" rx="14" ry="12" fill="url(#mobaArmor)"/>
      <!-- Chest plate with metallic sheen -->
      <path d="M42 42 L78 42 L80 98 L40 98 Z" fill="url(#mobaArmor)"/>
      <path d="M44 44 L76 44 L78 75 L42 75 Z" fill="#75A5F0" opacity="0.25"/>
      <!-- Chest emblem -->
      <path d="M55 56 L65 56 L62 72 L58 72 Z" fill="#FFD700"/>
      <path d="M58 58 L62 58 L60 68 Z" fill="#FFA500"/>
      <!-- Belt -->
      <rect x="40" y="96" width="40" height="6" fill="#5A3A1A"/>
      <rect x="56" y="96" width="8" height="6" fill="#FFD700"/>
      <!-- Shield arm -->
      <rect x="22" y="48" width="12" height="42" rx="3" fill="url(#mobaArmor)"/>
      <ellipse cx="18" cy="75" rx="15" ry="22" fill="#5A8AD5" opacity="0.95"/>
      <ellipse cx="18" cy="75" rx="12" ry="18" fill="#3A5A85"/>
      <ellipse cx="18" cy="75" rx="15" ry="22" fill="none" stroke="#FFD700" stroke-width="1.5"/>
      <path d="M12 70 L24 70 L20 80 L16 80 Z" fill="#FFD700"/>
      <!-- Sword arm with gripped fingers on handle -->
      <rect x="86" y="48" width="12" height="30" rx="3" fill="url(#mobaArmor)"/>
      <rect x="92" y="18" width="4" height="55" fill="url(#mobaBlade)"/>
      <path d="M92 18 L96 18 L94 10 Z" fill="#E0E0E0"/>
      <rect x="86" y="72" width="16" height="4" rx="1" fill="#8B4513"/>
      <rect x="93" y="76" width="3" height="10" fill="#5A3A1A"/>
      <!-- Hand fingers wrapped around handle -->
      <rect x="91" y="76" width="6" height="2.5" rx="1" fill="#D8B88C"/>
      <rect x="91" y="79" width="6" height="2.5" rx="1" fill="#D8B88C"/>
      <rect x="91" y="82" width="6" height="2.5" rx="1" fill="#D8B88C"/>
      <circle cx="94" cy="88" r="2.5" fill="#FFD700"/>
      <!-- Armored legs -->
      <rect x="42" y="102" width="16" height="55" rx="4" fill="url(#mobaArmor)"/>
      <rect x="62" y="102" width="16" height="55" rx="4" fill="url(#mobaArmor)"/>
      <rect x="40" y="155" width="20" height="18" rx="3" fill="#2A4A7A"/>
      <rect x="60" y="155" width="20" height="18" rx="3" fill="#2A4A7A"/>
  </g>`,
  // Character 9
  `<g>
<defs>
        <linearGradient id="pikaBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFD93D"/><stop offset="100%" stop-color="#FFB800"/>
        </linearGradient>
        <linearGradient id="pikaBelly" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFE680"/><stop offset="100%" stop-color="#FFCC33"/>
        </linearGradient>
      </defs>
      <!-- Ears lower & further apart with solid black tips -->
      <path d="M34 46 L14 12 L44 38 Z" fill="url(#pikaBody)"/>
      <path d="M34 46 L20 18 L42 38 Z" fill="#2A2A2A"/>
      <path d="M86 46 L106 12 L76 38 Z" fill="url(#pikaBody)"/>
      <path d="M86 46 L100 18 L78 38 Z" fill="#2A2A2A"/>
      <!-- Brown patch where tail meets lower back -->
      <path d="M86 124 L94 116 L98 122 L90 130 Z" fill="#8B5A2B"/>
      <!-- Zigzag lightning tail -->
      <path d="M92 122 L106 102 L98 98 L110 76 L102 72 L114 46 L106 42 L114 16" 
            stroke="#FFD93D" stroke-width="8.5" fill="none" stroke-linejoin="miter" stroke-linecap="round"/>
      <path d="M92 122 L106 102 L98 98 L110 76 L102 72 L114 46 L106 42 L114 16" 
            stroke="#FF9900" stroke-width="3" fill="none" stroke-linejoin="miter" opacity="0.45"/>
      <path d="M106 16 L118 8 L114 22 L118 30 L108 26 Z" fill="#FFD93D" stroke="#FF9900" stroke-width="1"/>
      <!-- Head -->
      <ellipse cx="60" cy="54" rx="28" ry="24" fill="url(#pikaBody)"/>
      <ellipse cx="60" cy="62" rx="20" ry="14" fill="url(#pikaBelly)" opacity="0.6"/>
      <!-- Eyes & Proportioned Cheek Circles (cheeks smaller relative to eyes) -->
      <circle cx="47" cy="50" r="5.5" fill="#2A2A2A"/>
      <circle cx="48.5" cy="49" r="2.2" fill="#FFFFFF"/>
      <circle cx="73" cy="50" r="5.5" fill="#2A2A2A"/>
      <circle cx="74.5" cy="49" r="2.2" fill="#FFFFFF"/>
      <circle cx="38" cy="61" r="5.5" fill="#FF2222"/>
      <circle cx="82" cy="61" r="5.5" fill="#FF2222"/>
      <!-- Tiny nose & cat '3' mouth -->
      <circle cx="60" cy="57" r="1.2" fill="#2A2A2A"/>
      <path d="M54 62 Q57 65 60 62 Q63 65 66 62" stroke="#2A2A2A" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <!-- Chonky pear-shaped body (wider at base) -->
      <ellipse cx="60" cy="116" rx="36" ry="40" fill="url(#pikaBody)"/>
      <ellipse cx="60" cy="122" rx="24" ry="28" fill="url(#pikaBelly)" opacity="0.75"/>
      <!-- Stubby arms -->
      <ellipse cx="30" cy="106" rx="9" ry="15" fill="url(#pikaBody)" transform="rotate(-20, 30, 106)"/>
      <ellipse cx="90" cy="106" rx="9" ry="15" fill="url(#pikaBody)" transform="rotate(20, 90, 106)"/>
      <!-- Feet with 3 distinct visible toe lines each -->
      <ellipse cx="44" cy="158" rx="13" ry="7" fill="#FFB800"/>
      <ellipse cx="76" cy="158" rx="13" ry="7" fill="#FFB800"/>
      <line x1="39" y1="160" x2="39" y2="164" stroke="#CC9900" stroke-width="1.5"/>
      <line x1="44" y1="160" x2="44" y2="165" stroke="#CC9900" stroke-width="1.5"/>
      <line x1="49" y1="160" x2="49" y2="164" stroke="#CC9900" stroke-width="1.5"/>
      <line x1="71" y1="160" x2="71" y2="164" stroke="#CC9900" stroke-width="1.5"/>
      <line x1="76" y1="160" x2="76" y2="165" stroke="#CC9900" stroke-width="1.5"/>
      <line x1="81" y1="160" x2="81" y2="164" stroke="#CC9900" stroke-width="1.5"/>
  </g>`,
  // Character 10
  `<g>
<defs>
        <linearGradient id="tekkenGi" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#B71C1C"/><stop offset="100%" stop-color="#7A1010"/>
        </linearGradient>
        <linearGradient id="tekkenSkin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#D8B88C"/><stop offset="100%" stop-color="#C8A878"/>
        </linearGradient>
      </defs>
      <!-- Distinct sharp hair spikes using separate polygons -->
      <polygon points="40,20 45,4 52,18" fill="#1A1A1A"/>
      <polygon points="49,18 55,1 61,17" fill="#1A1A1A"/>
      <polygon points="58,17 65,2 71,18" fill="#1A1A1A"/>
      <polygon points="68,18 75,5 80,21" fill="#1A1A1A"/>
      <rect x="44" y="16" width="32" height="6" fill="#1A1A1A"/>
      <!-- Head with defined jawline -->
      <path d="M46 18 L74 18 L76 38 L44 38 Z" fill="url(#tekkenSkin)"/>
      <path d="M46 32 Q60 38 74 32 L74 36 L46 36 Z" fill="#000" opacity="0.1"/>
      <path d="M50 26 L58 24 L56 30 Z" fill="#2A2A2A"/>
      <path d="M62 24 L70 26 L66 30 Z" fill="#2A2A2A"/>
      <line x1="48" y1="22" x2="58" y2="24" stroke="#2A2A2A" stroke-width="1.5"/>
      <line x1="62" y1="24" x2="72" y2="22" stroke="#2A2A2A" stroke-width="1.5"/>
      <rect x="56" y="34" width="8" height="3" rx="1" fill="#5A3A2A" opacity="0.5"/>
      <rect x="54" y="36" width="12" height="2" rx="1" fill="#5A3A2A"/>
      <rect x="54" y="38" width="12" height="6" fill="#C8A878"/>
      <!-- Gi base -->
      <path d="M34 44 L86 44 L88 100 L32 100 Z" fill="url(#tekkenGi)"/>
      <!-- Visible V-neck opening: Left lapel crossing OVER right lapel with white inner lining -->
      <path d="M72 44 L60 74 L68 100 L78 100 L78 50 Z" fill="#5A1010"/>
      <!-- White inner edge of left lapel -->
      <line x1="48" y1="44" x2="60" y2="76" stroke="#FFFFFF" stroke-width="1.5" opacity="0.8"/>
      <!-- Left lapel overlapping -->
      <path d="M48 44 L60 76 L52 100 L42 100 L42 50 Z" fill="#6A1212"/>
      <!-- Prominent Black Belt (Obi) with knot and hanging ends -->
      <rect x="32" y="96" width="56" height="8" fill="#1A1A1A"/>
      <rect x="54" y="94" width="12" height="12" rx="1" fill="#1A1A1A"/>
      <!-- Two hanging belt ends -->
      <rect x="55" y="104" width="4" height="14" fill="#1A1A1A"/>
      <rect x="61" y="104" width="4" height="12" fill="#1A1A1A"/>
      <!-- Arms -->
      <rect x="20" y="50" width="14" height="35" rx="4" fill="url(#tekkenGi)" transform="rotate(20, 27, 67)"/>
      <!-- Left fist with knuckle arcs -->
      <circle cx="16" cy="90" r="8" fill="#B71C1C"/>
      <rect x="12" y="84" width="8" height="4" fill="#7A1010"/>
      <path d="M13 88 Q16 86 19 88" stroke="#5A0808" stroke-width="1.2" fill="none"/>
      <path d="M13 92 Q16 90 19 92" stroke="#5A0808" stroke-width="1.2" fill="none"/>
      <rect x="86" y="50" width="14" height="30" rx="4" fill="url(#tekkenGi)" transform="rotate(-15, 93, 65)"/>
      <!-- Right fist with knuckle arcs -->
      <circle cx="100" cy="82" r="8" fill="#B71C1C"/>
      <rect x="96" y="76" width="8" height="4" fill="#7A1010"/>
      <path d="M97 80 Q100 78 103 80" stroke="#5A0808" stroke-width="1.2" fill="none"/>
      <path d="M97 84 Q100 82 103 84" stroke="#5A0808" stroke-width="1.2" fill="none"/>
      <!-- Gi pants -->
      <rect x="38" y="104" width="20" height="58" rx="4" fill="#7A1010"/>
      <rect x="62" y="104" width="20" height="58" rx="4" fill="#7A1010"/>
      <rect x="40" y="132" width="16" height="8" rx="2" fill="#5A1010"/>
      <rect x="64" y="132" width="16" height="8" rx="2" fill="#5A1010"/>
      <!-- Bare feet with toes -->
      <ellipse cx="46" cy="168" rx="13" ry="7" fill="url(#tekkenSkin)"/>
      <ellipse cx="74" cy="168" rx="13" ry="7" fill="url(#tekkenSkin)"/>
      <line x1="38" y1="168" x2="38" y2="173" stroke="#B89878" stroke-width="1.5"/>
      <line x1="42" y1="168" x2="42" y2="174" stroke="#B89878" stroke-width="1.5"/>
      <line x1="46" y1="168" x2="46" y2="174" stroke="#B89878" stroke-width="1.5"/>
      <line x1="50" y1="168" x2="50" y2="174" stroke="#B89878" stroke-width="1.5"/>
      <line x1="68" y1="168" x2="68" y2="173" stroke="#B89878" stroke-width="1.5"/>
      <line x1="72" y1="168" x2="72" y2="174" stroke="#B89878" stroke-width="1.5"/>
      <line x1="76" y1="168" x2="76" y2="174" stroke="#B89878" stroke-width="1.5"/>
      <line x1="80" y1="168" x2="80" y2="174" stroke="#B89878" stroke-width="1.5"/>
  </g>`,
  // Character 11
  `<g>
<defs>
        <linearGradient id="valHair" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2A2A35"/><stop offset="60%" stop-color="#6A2070"/><stop offset="100%" stop-color="#E02E9D"/>
        </linearGradient>
        <linearGradient id="valSuit" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1A1A1F"/><stop offset="100%" stop-color="#0A0A0F"/>
        </linearGradient>
        <radialGradient id="valChest">
          <stop offset="0%" stop-color="#FFFFFF"/><stop offset="30%" stop-color="#9B30FF"/><stop offset="100%" stop-color="#4A0A8A" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="valSkin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#C48B6D"/><stop offset="100%" stop-color="#B07B5D"/>
        </linearGradient>
        <filter id="reynaGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <!-- Flowing hair -->
      <path d="M42 12 Q38 50 36 100 L48 100 L48 18 Z" fill="url(#valHair)"/>
      <path d="M78 12 Q82 50 84 100 L72 100 L72 18 Z" fill="url(#valHair)"/>
      <!-- Head & Eyes -->
      <path d="M48 10 L72 10 L74 32 L46 32 Z" fill="url(#valSkin)"/>
      <path d="M44 8 L76 8 L78 16 L42 16 Z" fill="#2A2A35"/>
      <ellipse cx="54" cy="22" rx="3" ry="2" fill="#FF00FF"/>
      <ellipse cx="66" cy="22" rx="3" ry="2" fill="#FF00FF"/>
      <circle cx="54" cy="22" r="1" fill="#FFFFFF"/>
      <circle cx="66" cy="22" r="1" fill="#FFFFFF"/>
      <!-- Gold jewelry -->
      <circle cx="46" cy="30" r="3" fill="none" stroke="#C5A059" stroke-width="1.5"/>
      <circle cx="74" cy="30" r="3" fill="none" stroke="#C5A059" stroke-width="1.5"/>
      <rect x="48" y="34" width="24" height="4" rx="1" fill="#C5A059"/>
      <circle cx="60" cy="36" r="2" fill="#FF0000"/>
      <!-- Bodysuit torso -->
      <path d="M40 38 L80 38 L82 102 L38 102 Z" fill="url(#valSuit)"/>
      <!-- Glowing chest core -->
      <ellipse cx="60" cy="55" rx="12" ry="10" fill="url(#valChest)"/>
      <circle cx="60" cy="55" r="5" fill="#9B30FF" opacity="0.85"/>
      <circle cx="60" cy="55" r="2" fill="#FFFFFF" opacity="0.95"/>
      <!-- Gold belt -->
      <rect x="38" y="96" width="44" height="6" fill="#C5A059"/>
      <polygon points="54,96 66,96 70,102 62,106 58,106 50,102" fill="#FF00FF"/>
      <!-- Clean, unified bodysuit pelvic area -->
      <path d="M38 102 L82 102 L70 120 L50 120 Z" fill="url(#valSuit)"/>
      <!-- Right arm & Vandal rifle -->
      <rect x="22" y="42" width="12" height="35" rx="3" fill="url(#valSuit)" transform="rotate(-30, 28, 60)"/>
      <circle cx="20" cy="78" r="5" fill="url(#valSkin)" transform="rotate(-30, 20, 78)"/>
      <rect x="4" y="68" width="40" height="4" rx="1" fill="#111111"/>
      <rect x="4" y="66" width="6" height="3" fill="#333"/>
      <rect x="14" y="72" width="5" height="12" rx="1" fill="#111111"/>
      <rect x="30" y="65" width="8" height="3" rx="1" fill="#333"/>
      <!-- Left arm with hand -->
      <rect x="84" y="42" width="12" height="45" rx="3" fill="url(#valSuit)"/>
      <circle cx="90" cy="88" r="5" fill="url(#valSkin)"/>
      <!-- Connected Energy Wisps with glow filter -->
      <g filter="url(#reynaGlow)">
        <path d="M90 88 Q102 96 112 92 Q118 90 120 98" stroke="#E02E9D" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <path d="M90 90 Q98 104 108 100 Q116 98 118 108" stroke="#9B30FF" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M90 86 Q104 92 114 86 Q120 84 122 92" stroke="#FF00FF" stroke-width="2" fill="none" stroke-linecap="round"/>
        <circle cx="106" cy="94" r="2.2" fill="#E02E9D"/>
        <circle cx="114" cy="98" r="1.8" fill="#FF00FF"/>
      </g>
      <!-- Proportional legs with thigh-high boot line -->
      <!-- Exposed upper thighs -->
      <path d="M40 106 L56 106 L55 128 L41 128 Z" fill="url(#valSkin)"/>
      <path d="M64 106 L80 106 L79 128 L65 128 Z" fill="url(#valSkin)"/>
      <!-- Thigh-high boot gold rim cuffs -->
      <rect x="40" y="128" width="16" height="3" rx="1" fill="#C5A059"/>
      <rect x="64" y="128" width="16" height="3" rx="1" fill="#C5A059"/>
      <!-- Thigh-high boots (slightly thicker for proportion) -->
      <rect x="40" y="131" width="16" height="35" rx="3" fill="url(#valSuit)"/>
      <rect x="64" y="131" width="16" height="35" rx="3" fill="url(#valSuit)"/>
      <!-- Gold armored feet -->
      <rect x="39" y="165" width="18" height="16" rx="2" fill="#C5A059"/>
      <rect x="63" y="165" width="18" height="16" rx="2" fill="#C5A059"/>
      <circle cx="48" cy="173" r="2" fill="#FF00FF" opacity="0.8"/>
      <circle cx="72" cy="173" r="2" fill="#FF00FF" opacity="0.8"/>
      <rect x="39" y="179" width="18" height="3" fill="#1A1A1A"/>
      <rect x="63" y="179" width="18" height="3" fill="#1A1A1A"/>
  </g>`,
  // Character 12
  `<g>
<defs>
        <linearGradient id="mcHead" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#C4A484"/><stop offset="100%" stop-color="#B89868"/>
        </linearGradient>
      </defs>
      <!-- LARGE SQUARE 44x40 HEAD (Steve's iconic 1:1 proportion with torso width) -->
      <rect x="38" y="6" width="44" height="40" fill="url(#mcHead)"/>
      <!-- Dark brown blocky hair covering top and sides -->
      <rect x="38" y="6" width="44" height="12" fill="#2D1E16"/>
      <rect x="38" y="18" width="6" height="12" fill="#2D1E16"/>
      <rect x="76" y="18" width="6" height="12" fill="#2D1E16"/>
      <!-- Blue Eyes (white sclera, dark blue pupil) -->
      <rect x="46" y="24" width="7" height="6" fill="#3D3DA0"/>
      <rect x="46" y="24" width="3.5" height="3" fill="#FFFFFF"/>
      <rect x="49.5" y="27" width="3.5" height="3" fill="#1A1A5A"/>
      <rect x="67" y="24" width="7" height="6" fill="#3D3DA0"/>
      <rect x="67" y="24" width="3.5" height="3" fill="#FFFFFF"/>
      <rect x="70.5" y="27" width="3.5" height="3" fill="#1A1A5A"/>
      <!-- Minecraft Nose (small 4x4px rectangle between eyes) -->
      <rect x="58" y="28" width="4" height="4" fill="#A89070"/>
      <!-- Mouth & Beard Stubble -->
      <rect x="52" y="34" width="16" height="3" fill="#8B5A2B"/>
      <rect x="48" y="37" width="24" height="5" fill="#4A2A1A" opacity="0.6"/>
      <rect x="54" y="37" width="12" height="5" fill="#3A1E10"/>
      <!-- Subtle pixel-grid overlay lines on head -->
      <line x1="38" y1="16" x2="82" y2="16" stroke="#000" stroke-width="0.75" opacity="0.06"/>
      <line x1="38" y1="26" x2="82" y2="26" stroke="#000" stroke-width="0.75" opacity="0.06"/>
      <line x1="38" y1="36" x2="82" y2="36" stroke="#000" stroke-width="0.75" opacity="0.06"/>
      <line x1="48" y1="6" x2="48" y2="46" stroke="#000" stroke-width="0.75" opacity="0.06"/>
      <line x1="60" y1="6" x2="60" y2="46" stroke="#000" stroke-width="0.75" opacity="0.06"/>
      <line x1="72" y1="6" x2="72" y2="46" stroke="#000" stroke-width="0.75" opacity="0.06"/>
      <!-- BLOCKY TORSO (44px wide — teal/cyan shirt) -->
      <rect x="38" y="46" width="44" height="46" fill="#00AA9B"/>
      <rect x="68" y="46" width="14" height="46" fill="#008B7A" opacity="0.45"/>
      <rect x="54" y="46" width="12" height="4" fill="#008B7A"/>
      <!-- Torso grid lines -->
      <line x1="38" y1="58" x2="82" y2="58" stroke="#000" stroke-width="0.75" opacity="0.06"/>
      <line x1="38" y1="70" x2="82" y2="70" stroke="#000" stroke-width="0.75" opacity="0.06"/>
      <line x1="38" y1="82" x2="82" y2="82" stroke="#000" stroke-width="0.75" opacity="0.06"/>
      <!-- THICKER BLOCKY ARMS (width 14px) -->
      <!-- Right Arm (hanging down) -->
      <rect x="24" y="46" width="14" height="30" fill="#00AA9B"/>
      <rect x="24" y="76" width="14" height="14" fill="url(#mcHead)"/>
      <rect x="33" y="46" width="5" height="44" fill="#008B7A" opacity="0.45"/>
      <!-- Left Arm (angled outward slightly) -->
      <g transform="rotate(16, 86, 52)">
        <rect x="82" y="46" width="14" height="30" fill="#00AA9B"/>
        <rect x="82" y="76" width="14" height="14" fill="url(#mcHead)"/>
        <rect x="91" y="46" width="5" height="44" fill="#008B7A" opacity="0.45"/>
      </g>
      <!-- BLOCKY LEGS (blue pants) -->
      <rect x="39" y="92" width="19" height="50" fill="#1F3299"/>
      <rect x="62" y="92" width="19" height="50" fill="#1F3299"/>
      <rect x="71" y="92" width="10" height="50" fill="#1A2880" opacity="0.45"/>
      <!-- BLOCKY FEET (dark grey shoes) -->
      <rect x="37" y="142" width="23" height="12" fill="#3A3A3A"/>
      <rect x="60" y="142" width="23" height="12" fill="#3A3A3A"/>
      <rect x="50" y="142" width="10" height="12" fill="#222222" opacity="0.45"/>
      <rect x="73" y="142" width="10" height="12" fill="#222222" opacity="0.45"/>
  </g>`
];


  // Store character SVGs globally for physics cloning
  window.eclipseCharacterSVGs = characters;

  // Generate 12 unique positions (no repeats)
  let svgString = '';
  for (let i = 0; i < NUM_POSITIONS; i++) {
    const charIndex = i;               // 0 to 11 — each character used ONCE
    const angleDeg = i * ANGLE_STEP;
    const angleRad = angleDeg * Math.PI / 180;
    
    // Anchor point ON the circle edge
    const anchorX = CX + Math.cos(angleRad) * RADIUS;
    const anchorY = CY + Math.sin(angleRad) * RADIUS;
    
    // Transform: translate to anchor → rotate to point outward → scale down → offset to bottom-center
    const rotation = angleDeg + 90;
    const transform = `translate(${anchorX.toFixed(2)}, ${anchorY.toFixed(2)}) rotate(${rotation.toFixed(2)}) scale(${SCALE}) translate(-60, -180)`;
    
    svgString += `<g class="eclipse-char-item" data-char-index="${charIndex}" transform="${transform}">${characters[charIndex]}</g>`;
  }
  container.innerHTML = svgString;
}

/* ==========================================================================
   ABOUT: CHARACTER PHYSICS ENGINE (DETACH, DRAG, THROW, GRAVITY & COLLISIONS)
   ========================================================================== */
function initAboutPhysics() {
  if (window.matchMedia('(max-width: 767px)').matches || window.matchMedia('(hover: none)').matches) return;
  // Disable physics on about subpage (characters stay attached and rotate only)
  if (window.location.pathname.includes('about.html')) return;

  const section = document.getElementById('about');
  if (!section) return;

  const charactersSvg = document.getElementById('eclipse-characters-svg');
  const eclipseEl = section.querySelector('.eclipse');
  const btnAbout = section.querySelector('.btn-about');

  // Physics constants (from minecraft-hang.html)
  const GRAVITY = 0.8;
  const BOUNCE = 0.4;
  const GROUND_FRICTION = 0.85;
  const CHAR_W = 84;
  const CHAR_H = 140;

  const physicsBodies = [];
  let activeDragBody = null;
  let dragOffsetX = 0, dragOffsetY = 0;
  let lastPointerX = 0, lastPointerY = 0;

  function getPointer(e) {
    if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  }

  // AABB collision resolution — push character out of the solid obstacle along shallowest penetration edge
  function resolveAABB(x, y, w, h, sx, sy, sw, sh) {
    if (x + w <= sx || x >= sx + sw || y + h <= sy || y >= sy + sh) return { x, y };
    const oL = (x + w) - sx, oR = (sx + sw) - x, oT = (y + h) - sy, oB = (sy + sh) - y;
    const m = Math.min(oL, oR, oT, oB);
    if (m === oL) return { x: sx - w, y };
    if (m === oR) return { x: sx + sw, y };
    if (m === oT) return { x, y: sy - h };
    return { x, y: sy + sh };
  }

  // Get obstacle bounding rects relative to the About section
  function getColliders() {
    const secRect = section.getBoundingClientRect();
    const colliders = [];

    if (eclipseEl) {
      const r = eclipseEl.getBoundingClientRect();
      colliders.push({
        x: r.left - secRect.left,
        y: r.top - secRect.top,
        w: r.width,
        h: r.height
      });
    }

    if (btnAbout) {
      const r = btnAbout.getBoundingClientRect();
      colliders.push({
        x: r.left - secRect.left,
        y: r.top - secRect.top,
        w: r.width,
        h: r.height
      });
    }

    return { secRect, colliders };
  }

  // Detach a character from the rotating circle and create a falling physics body
  function detachCharacter(targetG) {
    if (!targetG || targetG.dataset.detached === 'true') return null;
    targetG.dataset.detached = 'true';

    const charIndex = parseInt(targetG.getAttribute('data-char-index') || '0', 10);
    const svgContent = (window.eclipseCharacterSVGs && window.eclipseCharacterSVGs[charIndex]) || targetG.innerHTML;

    // Get current on-screen location relative to section
    const charRect = targetG.getBoundingClientRect();
    const secRect = section.getBoundingClientRect();

    let startX = charRect.left - secRect.left;
    let startY = charRect.top - secRect.top;

    // Constrain to inside section
    startX = Math.max(0, Math.min(startX, secRect.width - CHAR_W));
    startY = Math.max(0, Math.min(startY, secRect.height - CHAR_H));

    // Hide original element in SVG rotator
    targetG.style.opacity = '0';
    targetG.style.pointerEvents = 'none';

    // Create detached physics DOM element
    const charDiv = document.createElement('div');
    charDiv.className = 'eclipse-physics-char';
    charDiv.innerHTML = `<svg viewBox="0 0 120 200" preserveAspectRatio="xMidYMid meet">${svgContent}</svg>`;
    charDiv.style.transform = `translate(${startX.toFixed(1)}px, ${startY.toFixed(1)}px)`;
    section.appendChild(charDiv);

    const body = {
      el: charDiv,
      x: startX,
      y: startY,
      vx: (Math.random() - 0.5) * 2,
      vy: 2,
      isDragging: false,
      isFalling: true
    };

    physicsBodies.push(body);

    // Allow clicking and dragging the newly created physics body
    charDiv.addEventListener('mousedown', (e) => onBodyPointerDown(e, body));
    charDiv.addEventListener('touchstart', (e) => onBodyPointerDown(e, body), { passive: false });

    return body;
  }

  // Handler when clicking on a hanging character on the circle
  function onHangingCharClick(e) {
    const charG = e.target.closest('.eclipse-char-item');
    if (!charG) return;
    e.preventDefault();
    e.stopPropagation();

    const p = getPointer(e);
    lastPointerX = p.x;
    lastPointerY = p.y;

    const body = detachCharacter(charG);
    if (!body) return;

    // Start dragging immediately if pointer is held down
    activeDragBody = body;
    body.isDragging = true;
    body.isFalling = false;
    body.vx = 0;
    body.vy = 0;

    const secRect = section.getBoundingClientRect();
    dragOffsetX = (p.x - secRect.left) - body.x;
    dragOffsetY = (p.y - secRect.top) - body.y;
    startDragListeners();
  }

  // Handler when clicking on an already-detached physics body
  function onBodyPointerDown(e, body) {
    e.preventDefault();
    e.stopPropagation();
    const p = getPointer(e);
    lastPointerX = p.x;
    lastPointerY = p.y;

    activeDragBody = body;
    body.isDragging = true;
    body.isFalling = false;
    body.vx = 0;
    body.vy = 0;

    const secRect = section.getBoundingClientRect();
    dragOffsetX = (p.x - secRect.left) - body.x;
    dragOffsetY = (p.y - secRect.top) - body.y;
    startDragListeners();
  }

  function startDragListeners() {
    window.addEventListener('mousemove', onPointerMove, { passive: false });
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);
  }

  function stopDragListeners() {
    window.removeEventListener('mousemove', onPointerMove);
    window.removeEventListener('touchmove', onPointerMove);
    window.removeEventListener('mouseup', onPointerUp);
    window.removeEventListener('touchend', onPointerUp);
  }

  function onPointerMove(e) {
    if (!activeDragBody) return;
    e.preventDefault();
    const p = getPointer(e);
    const { secRect, colliders } = getColliders();

    let newX = (p.x - secRect.left) - dragOffsetX;
    let newY = (p.y - secRect.top) - dragOffsetY;

    // Constrain to section bounds (left, right, top, bottom)
    newX = Math.max(0, Math.min(newX, secRect.width - CHAR_W));
    newY = Math.max(0, Math.min(newY, secRect.height - CHAR_H));

    // Collision with solid obstacles (red circle & about us button)
    colliders.forEach(col => {
      const c = resolveAABB(newX, newY, CHAR_W, CHAR_H, col.x, col.y, col.w, col.h);
      newX = c.x;
      newY = c.y;
    });

    // Velocity from drag movement (for release throw)
    activeDragBody.vx = (newX - activeDragBody.x) * 0.5;
    activeDragBody.vy = (newY - activeDragBody.y) * 0.5;

    activeDragBody.x = newX;
    activeDragBody.y = newY;
    activeDragBody.el.style.transform = `translate(${activeDragBody.x.toFixed(1)}px, ${activeDragBody.y.toFixed(1)}px)`;

    lastPointerX = p.x;
    lastPointerY = p.y;
  }

  function onPointerUp() {
    if (!activeDragBody) return;
    activeDragBody.isDragging = false;
    activeDragBody.isFalling = true;
    activeDragBody = null;
    stopDragListeners();
  }

  // Attach click listener for hanging SVG characters
  if (charactersSvg) {
    charactersSvg.addEventListener('mousedown', onHangingCharClick);
    charactersSvg.addEventListener('touchstart', onHangingCharClick, { passive: false });
  }

  // Physics animation loop (paused when #about is off-screen)
  let physicsRaf = null;
  let isAboutVisible = false;

  function physicsLoop() {
    if (!isAboutVisible) {
      physicsRaf = null;
      return;
    }

    if (physicsBodies.length > 0) {
      const { secRect, colliders } = getColliders();
      const secW = secRect.width;
      const secH = secRect.height;

      physicsBodies.forEach(body => {
        if (!body.isFalling || body.isDragging) return;

        body.vy += GRAVITY;
        body.vx *= 0.99;

        let newX = body.x + body.vx;
        let newY = body.y + body.vy;

        // Ground collision (bottom of About section)
        if (newY + CHAR_H >= secH) {
          newY = secH - CHAR_H;
          body.vy = -body.vy * BOUNCE;
          body.vx *= GROUND_FRICTION;
          if (Math.abs(body.vy) < 1) body.vy = 0;
          if (Math.abs(body.vx) < 0.5) body.vx = 0;
        }

        // Ceiling
        if (newY < 0) {
          newY = 0;
          body.vy = -body.vy * BOUNCE;
        }

        // Left & Right walls
        if (newX < 0) {
          newX = 0;
          body.vx = -body.vx * BOUNCE;
        }
        if (newX + CHAR_W > secW) {
          newX = secW - CHAR_W;
          body.vx = -body.vx * BOUNCE;
        }

        // Solid obstacle collisions (red circle & About Us button)
        colliders.forEach(col => {
          const c = resolveAABB(newX, newY, CHAR_W, CHAR_H, col.x, col.y, col.w, col.h);
          if (c.x !== newX) {
            body.vx = -body.vx * BOUNCE;
            newX = c.x;
          }
          if (c.y !== newY) {
            body.vy = -body.vy * BOUNCE;
            newY = c.y;
          }
        });

        body.x = newX;
        body.y = newY;
        body.el.style.transform = `translate(${body.x.toFixed(1)}px, ${body.y.toFixed(1)}px)`;
      });
    }

    physicsRaf = requestAnimationFrame(physicsLoop);
  }

  if ('IntersectionObserver' in window) {
    const aboutObserver = new IntersectionObserver((entries) => {
      isAboutVisible = entries[0].isIntersecting;
      if (isAboutVisible && !physicsRaf) {
        physicsRaf = requestAnimationFrame(physicsLoop);
      } else if (!isAboutVisible && physicsRaf) {
        cancelAnimationFrame(physicsRaf);
        physicsRaf = null;
      }
    }, { threshold: 0.01 });
    aboutObserver.observe(section);
  } else {
    isAboutVisible = true;
    physicsRaf = requestAnimationFrame(physicsLoop);
  }
}

/* ==========================================================================
   HERO GSAP ANIMATIONS
   ========================================================================== */
function initHeroGSAP() {
  if (typeof gsap === 'undefined') return;

  // 1. Hero load animation (0.3s delay)
  const heroTl = gsap.timeline({ delay: 0.3 });
  heroTl
    .from('.hero-title .line', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out'
    })
    .from('.hero-sub', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.4')
    .from('.hero-cta-group a', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.3')
    .from('.canvas-container', {
      scale: 0.8,
      opacity: 0,
      duration: 1.0,
      ease: 'power2.out'
    }, '-=0.8');

  // 2. Parallax background on scroll
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.to('.hero-bg-wrap img', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    // 3. Floating canvas animation
    const floatTween = gsap.to('.canvas-container', {
      y: -12,
      duration: 2.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    // Pause when off-screen
    ScrollTrigger.create({
      trigger: '.canvas-container',
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => {
        if (self.isActive) floatTween.play();
        else floatTween.pause();
      }
    });
  }

  // 4. Button hover micro-interactions
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { scale: 1.04, duration: 0.2, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { scale: 1, duration: 0.2, ease: 'power2.out' });
    });
  });
}



/* ==========================================================================
   2. HERO LOGO 3D TILT EFFECT (Static PNG with spring physics)
   ========================================================================== */
function initHeroCanvas() {
  const tiltContainer = document.getElementById('heroLogoTilt');
  const logoImg = document.getElementById('heroLogoImg');
  if (!tiltContainer || !logoImg) return;

  const ROTATION_FACTOR = 8;     // max 8 degrees (matching rotationFactor={8})
  const IS_REVERSE = true;        // reverse direction (matching isRevese)
  const SMOOTHING = 0.15;         // spring-like smoothing (lower = smoother)

  let targetRotX = 0, targetRotY = 0;
  let currentRotX = 0, currentRotY = 0;
  let isAnimating = false;

  function animate() {
    currentRotX += (targetRotX - currentRotX) * SMOOTHING;
    currentRotY += (targetRotY - currentRotY) * SMOOTHING;

    if (logoImg) {
      logoImg.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;
    }

    // Stop animation when settled
    if (Math.abs(targetRotX - currentRotX) < 0.01 && Math.abs(targetRotY - currentRotY) < 0.01 && targetRotX === 0 && targetRotY === 0) {
      isAnimating = false;
      return;
    }
    requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(animate);
    }
  }

  tiltContainer.addEventListener('mousemove', (e) => {
    const rect = tiltContainer.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;    // 0 to 1
    const y = (e.clientY - rect.top) / rect.height;     // 0 to 1

    // Calculate rotation (-0.5 to 0.5 → -ROTATION_FACTOR to +ROTATION_FACTOR)
    let rotY = (x - 0.5) * 2 * ROTATION_FACTOR;
    let rotX = -(y - 0.5) * 2 * ROTATION_FACTOR;

    // Reverse direction if isRevese is true (matching the Tilt component)
    if (IS_REVERSE) {
      rotY = -rotY;
      rotX = -rotX;
    }

    targetRotX = rotX;
    targetRotY = rotY;
    startAnimation();
  }, { passive: true });

  tiltContainer.addEventListener('mouseleave', () => {
    targetRotX = 0;
    targetRotY = 0;
    startAnimation();
  });
}

/* ==========================================================================
   2b. HERO DINO RUNNER GAME (#heroDinoCanvas)
   ========================================================================== */
function initHeroDinoGame() {
  const canvas = document.getElementById('heroDinoCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Mobile scale factor
  const isMobile = window.innerWidth < 768;
  const SCALE = isMobile ? 2 : 1;

  // Dimensions
  const W = canvas.width = isMobile ? 600 : 1200;
  const H = canvas.height = 200;

  // Colors (white mode + orange dino)
  const BG = '#FFFFFF';
  const FG = '#FF5931';             // orange dino
  const OBSTACLE_COLOR = '#000000'; // black obstacles
  const FG_LIGHT = '#535353';       // dark grey text
  const GROUND = '#535353';
  const CLOUD = '#c4c4c4';

  // Game state
  let state = 'waiting';            // waiting, playing, gameover
  let score = 0;
  let highScore = 0;
  let speed = isMobile ? 5.5 : 6.5;
  let frameCount = 0;

  // Ground adjusted for 200px height
  const groundY = 160;

  // Dino adjusted proportionally (h: 40, w: 38)
  const dino = {
    x: isMobile ? 40 : 60, y: groundY,
    w: Math.round(38 * SCALE), h: Math.round(40 * SCALE),
    vy: 0,
    isJumping: false,
    isDucking: false,
    legFrame: 0
  };
  const GRAVITY = isMobile ? 0.7 : 0.55;
  const JUMP_VEL = isMobile ? -13.5 : -10.5;
  const DUCK_H = Math.round(23 * SCALE);

  // Obstacles
  let obstacles = [];
  let clouds = [];
  let nextObstacleTime = 0;
  let nextCloudTime = 0;

  // Input
  window.addEventListener('keydown', (e) => {
    // Only intercept when hero is in view
    const heroSec = document.getElementById('hero');
    if (heroSec) {
      const rect = heroSec.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    }

    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'Enter') {
      e.preventDefault();
      if (state === 'waiting') startGame();
      else if (state === 'gameover') restart();
      else if (state === 'playing' && !dino.isJumping && !dino.isDucking) jump();
    }
    if (e.code === 'ArrowDown' && state === 'playing') {
      dino.isDucking = true;
      if (dino.isJumping) dino.vy += 2; // fast fall
    }
  });

  window.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowDown') dino.isDucking = false;
  });

  // Touch / Click on canvas
  canvas.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    if (state === 'waiting') startGame();
    else if (state === 'gameover') restart();
    else if (state === 'playing' && !dino.isJumping && !dino.isDucking) jump();
  });

  function startGame() {
    state = 'playing';
    score = 0; speed = isMobile ? 5.5 : 6.5; frameCount = 0;
    obstacles = []; clouds = [];
    nextObstacleTime = isMobile ? 50 : 60; nextCloudTime = 0;
    dino.y = groundY; dino.vy = 0; dino.isJumping = false; dino.isDucking = false;
  }

  function restart() { startGame(); }

  function jump() {
    if (!dino.isJumping) {
      dino.vy = JUMP_VEL;
      dino.isJumping = true;
    }
  }

  function spawnObstacle() {
    const types = ['cactus-small', 'cactus-medium', 'cactus-large', 'bird'];
    const type = types[Math.floor(Math.random() * types.length)];
    let obs;
    if (type === 'cactus-small') {
      obs = { type, x: W + 20, y: groundY - Math.round(20 * SCALE), w: Math.round(14 * SCALE), h: Math.round(20 * SCALE) };
    } else if (type === 'cactus-medium') {
      obs = { type, x: W + 20, y: groundY - Math.round(25 * SCALE), w: Math.round(14 * SCALE), h: Math.round(25 * SCALE) };
    } else if (type === 'cactus-large') {
      obs = { type, x: W + 20, y: groundY - Math.round(32 * SCALE), w: Math.round(20 * SCALE), h: Math.round(32 * SCALE) };
    } else {
      const heights = [groundY - Math.round(18 * SCALE), groundY - Math.round(38 * SCALE), groundY - Math.round(55 * SCALE)];
      obs = { type, x: W + 20, y: heights[Math.floor(Math.random() * 3)], w: Math.round(32 * SCALE), h: Math.round(22 * SCALE), wing: 0 };
    }
    obstacles.push(obs);

    const minGap = Math.round((isMobile ? 50 : 60) - Math.min(25, Math.floor(score / 100)));
    const maxGap = Math.round((isMobile ? 90 : 120) - Math.min(40, Math.floor(score / 100)));
    nextObstacleTime = frameCount + minGap + Math.floor(Math.random() * (maxGap - minGap));
  }

  function spawnCloud() {
    clouds.push({ x: W + 20, y: (isMobile ? 20 : 25) + Math.random() * (isMobile ? 40 : 50), w: Math.round(36 * SCALE), h: Math.round(10 * SCALE) });
    nextCloudTime = frameCount + (isMobile ? 60 : 80) + Math.floor(Math.random() * (isMobile ? 90 : 120));
  }

  function checkCollision(o) {
    let dx = dino.x + 6 * SCALE, dy = dino.y - dino.h + 3 * SCALE;
    let dw = dino.w - 12 * SCALE, dh = dino.h - 6 * SCALE;
    if (dino.isDucking) { dh = DUCK_H; dy = dino.y - DUCK_H + 3 * SCALE; }
    return dx < o.x + o.w - 3 * SCALE && dx + dw > o.x + 3 * SCALE &&
           dy < o.y + o.h - 3 * SCALE && dy + dh > o.y + 3 * SCALE;
  }

  function px(x, y, w, h, c) { ctx.fillStyle = c || FG; ctx.fillRect(x, y, w, h); }

  function drawDino() {
    ctx.save();
    ctx.translate(dino.x, dino.y);
    ctx.scale(SCALE, SCALE);
    let x = 0, y = -40;
    if (dino.isDucking) {
      y = -23;
      px(x, y, 38, 10);
      px(x + 30, y - 7, 8, 7);
      px(x + 34, y - 3, 4, 3);
      px(x - 2, y + 10, 8, 13);
      px(x + 26, y + 10, 8, 13);
      ctx.fillStyle = BG; ctx.fillRect(x + 36, y - 2, 2, 2);
    } else {
      px(x + 18, y, 20, 18);
      px(x + 32, y + 5, 6, 5);
      ctx.fillStyle = BG; ctx.fillRect(x + 28, y + 5, 2, 2);
      px(x + 6, y + 15, 22, 16);
      px(x, y + 15, 6, 9);
      px(x + 24, y + 19, 7, 5);
      px(x + 10, y + 19, 3, 5);
      if (dino.isJumping) {
        px(x + 8, y + 31, 7, 9);
        px(x + 18, y + 31, 7, 9);
      } else if (state === 'gameover') {
        px(x + 8, y + 32, 7, 8);
        px(x + 18, y + 32, 7, 8);
      } else {
        if (dino.legFrame < 5) {
          px(x + 6, y + 31, 7, 9);
          px(x + 18, y + 34, 5, 6);
        } else {
          px(x + 10, y + 34, 5, 6);
          px(x + 18, y + 31, 7, 9);
        }
      }
    }
    ctx.restore();
  }

  function drawCactus(o) {
    ctx.save();
    ctx.translate(o.x, o.y);
    ctx.scale(SCALE, SCALE);
    ctx.fillStyle = OBSTACLE_COLOR;
    if (o.type === 'cactus-small') {
      ctx.fillRect(0, 0, 4, 20);
      ctx.fillRect(-3, 6, 3, 6);
      ctx.fillRect(4, 4, 3, 8);
    } else if (o.type === 'cactus-medium') {
      ctx.fillRect(0, 0, 4, 25);
      ctx.fillRect(-4, 8, 4, 8);
      ctx.fillRect(4, 5, 3, 10);
    } else if (o.type === 'cactus-large') {
      ctx.fillRect(0, 0, 5, 32);
      ctx.fillRect(-5, 10, 5, 11);
      ctx.fillRect(5, 6, 5, 13);
      ctx.fillRect(5, 24, 3, 8);
    }
    ctx.restore();
  }

  function drawBird(o) {
    o.wing = (o.wing + 1) % 12;
    const flap = o.wing < 6;
    ctx.save();
    ctx.translate(o.x, o.y);
    ctx.scale(SCALE, SCALE);
    ctx.fillStyle = OBSTACLE_COLOR;
    ctx.fillRect(0, 0, 16, 5);
    ctx.fillRect(13, -2, 8, 7);
    ctx.fillStyle = BG; ctx.fillRect(18, 0, 2, 2);
    if (flap) {
      ctx.fillStyle = OBSTACLE_COLOR;
      ctx.fillRect(3, -7, 11, 3);
      ctx.fillRect(6, -10, 5, 3);
    } else {
      ctx.fillStyle = OBSTACLE_COLOR;
      ctx.fillRect(3, 5, 11, 3);
      ctx.fillRect(6, 8, 5, 3);
    }
    ctx.restore();
  }

  function drawCloud(c) {
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.scale(SCALE, SCALE);
    ctx.fillStyle = CLOUD;
    ctx.fillRect(0, 0, 36, 10);
    ctx.fillRect(5, -3, 26, 3);
    ctx.fillRect(10, -6, 16, 3);
    ctx.restore();
  }

  function drawGround() {
    ctx.strokeStyle = GROUND;
    ctx.lineWidth = isMobile ? 3 : 1;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(W, groundY);
    ctx.stroke();
  }

  function drawScore() {
    ctx.fillStyle = FG_LIGHT;
    ctx.font = (isMobile ? '16px' : '14px') + ' "Geist", sans-serif';
    ctx.textAlign = 'right';
    const s = String(Math.floor(score)).padStart(5, '0');
    ctx.fillText(s, W - (isMobile ? 14 : 20), isMobile ? 26 : 25);
    if (highScore > 0) {
      const hs = String(Math.floor(highScore)).padStart(5, '0');
      ctx.fillText('HI ' + hs, W - (isMobile ? 75 : 90), isMobile ? 26 : 25);
    }
    ctx.textAlign = 'left';
  }

  function drawGameOver() {
    ctx.fillStyle = FG_LIGHT;
    ctx.font = (isMobile ? '22px' : '18px') + ' "Geist", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('G A M E   O V E R', W / 2, H / 2 - (isMobile ? 10 : 15));
    ctx.font = (isMobile ? '13px' : '11px') + ' "Geist", sans-serif';
    ctx.fillText('Press SPACE or Tap to restart', W / 2, H / 2 + (isMobile ? 18 : 12));
    ctx.textAlign = 'left';
  }

  function drawWaiting() {
    ctx.fillStyle = FG_LIGHT;
    ctx.font = (isMobile ? '16px' : '13px') + ' "Geist", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Press SPACE or Tap to Start', W / 2, H / 2 - 10);
    ctx.textAlign = 'left';
  }

  function update() {
    frameCount++;
    if (state === 'playing') {
      speed = (isMobile ? 5.5 : 6.5) + Math.min(isMobile ? 5.0 : 6.5, score / 200);
      if (dino.isJumping || dino.y < groundY) {
        dino.vy += GRAVITY;
        dino.y += dino.vy;
        if (dino.y >= groundY) {
          dino.y = groundY;
          dino.vy = 0;
          dino.isJumping = false;
        }
      }
      if (frameCount % 6 === 0) dino.legFrame = (dino.legFrame + 1) % 10;
      if (frameCount >= nextObstacleTime) spawnObstacle();
      if (frameCount >= nextCloudTime) spawnCloud();
      obstacles.forEach(o => { o.x -= speed; if (o.type === 'bird') o.x -= speed * 0.5; });
      obstacles = obstacles.filter(o => o.x + o.w > -10);
      clouds.forEach(c => { c.x -= speed * 0.4; });
      clouds = clouds.filter(c => c.x + c.w > -10);
      score += 0.1;
      for (const o of obstacles) {
        if (checkCollision(o)) {
          state = 'gameover';
          if (score > highScore) highScore = score;
        }
      }
    }
  }

  function render() {
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);
    clouds.forEach(drawCloud);
    drawGround();
    obstacles.forEach(o => {
      if (o.type === 'bird') drawBird(o);
      else drawCactus(o);
    });
    drawDino();
    if (state === 'playing' || state === 'gameover') drawScore();
    if (state === 'gameover') drawGameOver();
    if (state === 'waiting') drawWaiting();
  }

  let dinoRaf = null;
  let isDinoVisible = false;

  function gameLoop() {
    if (!isDinoVisible) {
      dinoRaf = null;
      return;
    }
    update();
    render();
    dinoRaf = requestAnimationFrame(gameLoop);
  }

  if ('IntersectionObserver' in window) {
    const dinoObserver = new IntersectionObserver((entries) => {
      isDinoVisible = entries[0].isIntersecting;
      if (isDinoVisible && !dinoRaf) {
        dinoRaf = requestAnimationFrame(gameLoop);
      } else if (!isDinoVisible && dinoRaf) {
        cancelAnimationFrame(dinoRaf);
        dinoRaf = null;
      }
    }, { threshold: 0.01 });
    dinoObserver.observe(canvas);
  } else {
    isDinoVisible = true;
    dinoRaf = requestAnimationFrame(gameLoop);
  }
}

/* ==========================================================================
   3. SCROLL REVEAL — IntersectionObserver on .reveal elements
   ========================================================================== */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. STATS COUNTER — count-up on scroll-into-view
   ========================================================================== */
function initStatsCounter() {
  const statEls = document.querySelectorAll('[data-count-target]');
  if (!statEls.length) return;

  let counted = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        statEls.forEach(el => {
          const target = parseFloat(el.getAttribute('data-count-target'));
          const suffix = el.getAttribute('data-count-suffix') || '';
          const duration = 800;
          const start = performance.now();

          function step(now) {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(eased * target);
            el.textContent = value + suffix;
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target + suffix;
          }

          requestAnimationFrame(step);
        });
      }
    });
  }, { threshold: 0.2 });

  const statsSection = document.querySelector('.about-stats');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   5. CASE STUDIES — hover list → swap image
   ========================================================================== */
function initCaseStudies() {
  const card = document.querySelector('.case-card') || document.querySelector('.case-studies-foreground');
  if (card && card.dataset.caseHoverBound === 'true') return;
  const caseItems = document.querySelectorAll('.case-item');
  const caseImageWrap = document.getElementById('caseImageWrap');
  const caseImage = document.getElementById('caseImage');
  const caseCaption = document.getElementById('caseCaption');
  const caseCaptionTitle = document.getElementById('caseCaptionTitle');
  const caseCaptionSub = document.getElementById('caseCaptionSub');
  if (!caseItems.length || !caseImageWrap) return;

  const CASE_DATA = [
    { img: 'images-for-landing-page/Case Studies/global chess.jpg',
      title: 'Global Chess League S4',
      sub: 'Multi-camera live broadcast · 9-day event' },
    { img: 'images-for-landing-page/Case Studies/kick india.jpg',
      title: 'Kick India — Day One Migration',
      sub: '48 creators migrated · 95/5 subscription split' },
    { img: 'images-for-landing-page/Case Studies/iqoo flagship.jpg',
      title: 'iQOO Flagship Smartphone Launch',
      sub: '50M+ reach · Product launch campaign' },
    { img: 'images-for-landing-page/Case Studies/monster athlete.webp',
      title: 'Monster Athlete Programme',
      sub: '24M+ impressions · Annual mandate' }
  ];

  // Branded placeholder gradient if image fails to load during active hover
  function showBrandedPlaceholder(index) {
    if (!caseImageWrap || !CASE_DATA[index]) return;
    if (caseImageWrap.classList.contains('is-empty')) return;
    caseImageWrap.classList.remove('is-empty');
    caseImageWrap.classList.add('is-visible');
    caseImage.style.display = 'none';
    let placeholder = caseImageWrap.querySelector('.case-placeholder');
    if (!placeholder) {
      placeholder = document.createElement('div');
      placeholder.className = 'case-placeholder';
      placeholder.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100%;font-family:\'Geist\',sans-serif;font-weight:900;color:#FFFFFF;font-size:18px;text-align:center;padding:16px;background:linear-gradient(135deg, #FF5931, #B21C01);';
      caseImageWrap.appendChild(placeholder);
    }
    placeholder.style.display = 'flex';
    placeholder.textContent = CASE_DATA[index].title;
  }

  function showCase(index) {
    const data = CASE_DATA[index];
    if (!data) return;
    const placeholder = caseImageWrap.querySelector('.case-placeholder');
    if (placeholder) placeholder.style.display = 'none';
    caseImage.style.display = 'block';
    caseImageWrap.classList.remove('is-empty');
    caseImageWrap.classList.add('is-visible');
    caseImage.src = data.img;
    caseImage.alt = data.title;
    caseImage.onerror = () => showBrandedPlaceholder(index);
    caseCaptionTitle.textContent = data.title;
    caseCaptionSub.textContent = data.sub;
    caseCaption.classList.add('is-visible');
  }

  function clearCase() {
    caseImageWrap.classList.remove('is-visible');
    caseImageWrap.classList.add('is-empty');
    caseCaption.classList.remove('is-visible');
    const placeholder = caseImageWrap.querySelector('.case-placeholder');
    if (placeholder) placeholder.style.display = 'none';
    // Clear image and text after transition completes
    setTimeout(() => {
      if (caseImageWrap.classList.contains('is-empty')) {
        caseImage.src = '';
        caseImage.alt = '';
        caseCaptionTitle.textContent = '';
        caseCaptionSub.textContent = '';
        const p = caseImageWrap.querySelector('.case-placeholder');
        if (p) p.style.display = 'none';
      }
    }, 200);
  }

  // Default state: strictly empty and dark
  caseImageWrap.classList.add('is-empty');
  caseImageWrap.classList.remove('is-visible');
  caseCaption.classList.remove('is-visible');
  caseImage.src = '';
  caseImage.alt = '';
  caseCaptionTitle.textContent = '';
  caseCaptionSub.textContent = '';
  const initPlaceholder = caseImageWrap.querySelector('.case-placeholder');
  if (initPlaceholder) initPlaceholder.style.display = 'none';

  caseItems.forEach(item => {
    const idx = parseInt(item.dataset.case, 10);
    // Hover (desktop)
    item.addEventListener('mouseenter', () => {
      caseItems.forEach(i => i.classList.remove('is-active'));
      item.classList.add('is-active');
      showCase(idx);
    });
    item.addEventListener('mouseleave', () => {
      item.classList.remove('is-active');
      clearCase();
    });
    // Tap / Click -> redirect to work.html
    item.addEventListener('click', () => {
      window.location.href = 'work.html';
    });
    // Make the line a link for accessibility
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'link');
    item.setAttribute('aria-label', CASE_DATA[idx]?.title || 'Case study');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        window.location.href = 'work.html';
      }
    });
  });

  // Clear when mouse leaves the whole list or foreground
  const caseList = document.getElementById('caseList');
  if (caseList) {
    caseList.addEventListener('mouseleave', () => {
      caseItems.forEach(i => i.classList.remove('is-active'));
      clearCase();
    });
  }
  const caseForeground = document.querySelector('.case-studies-foreground');
  if (caseForeground) {
    caseForeground.addEventListener('mouseleave', () => {
      caseItems.forEach(i => i.classList.remove('is-active'));
      clearCase();
    });
  }
}

/* ==========================================================================
   6. SERVICES GSAP & TOUCH INTERACTION
   ========================================================================== */
function initServicesGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Title band reveal
  gsap.from('.services-line', {
    scaleX: 0,
    transformOrigin: 'center center',
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#services',
      start: 'top 70%'
    }
  });
  gsap.from('.services-title', {
    opacity: 0,
    y: 20,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#services',
      start: 'top 70%'
    }
  });

  // Cards stagger in — all at the same level in a row (no y offset)
  gsap.from('.service-card', {
    opacity: 0,
    y: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power2.out',
    clearProps: 'transform',
    scrollTrigger: {
      trigger: '.services-cards',
      start: 'top 85%',
      once: true
    }
  });

  // Know More fade-up
  gsap.from('.know-more-btn', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.know-more-btn',
      start: 'top 90%'
    }
  });
}

// Services: tap-to-toggle on touch devices
function initServicesTouch() {
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Only toggle on touch / small screens
      if (window.matchMedia('(hover: none)').matches) {
        e.preventDefault();
        // Close other open cards
        document.querySelectorAll('.service-card.is-active').forEach(c => {
          if (c !== card) c.classList.remove('is-active');
        });
        card.classList.toggle('is-active');
      }
    });
  });
}

/* ==========================================================================
   6B. FOUNDERS GSAP ENTRANCE ANIMATIONS
   ========================================================================== */
function initFoundersGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Title fade-up
  gsap.from('.founders-title, .founders__title', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#founders',
      start: 'top 70%'
    }
  });

  // Dashed lines fade in
  gsap.from('.founders-dashed-lines line', {
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#founders',
      start: 'top 60%'
    }
  });

  // Cards stagger in
  gsap.from('.founder-card', {
    opacity: 0,
    y: 60,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.founders-cards, .founders__grid',
      start: 'top 75%'
    }
  });
}

/* ==========================================================================
   6C. CTA GSAP ENTRANCE & PARALLAX ANIMATIONS
   ========================================================================== */
function initCTAGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Headline fade-up
  gsap.from('.cta-headline, .cta-section__headline', {
    opacity: 0,
    y: 40,
    duration: 1.0,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#cta, #contact',
      start: 'top 70%'
    }
  });

  // Subtext fade-up (slight delay)
  gsap.from('.cta-subtext, .cta-section__subtext', {
    opacity: 0,
    y: 24,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#cta, #contact',
      start: 'top 65%'
    }
  });

  // Button fade-up + subtle scale
  gsap.from('.cta-button, .cta-section__btn', {
    opacity: 0,
    y: 24,
    scale: 0.96,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#cta, #contact',
      start: 'top 60%'
    }
  });

  // Parallax: subtle background shift on scroll
  gsap.to('.cta-section', {
    backgroundPositionY: '30%',
    ease: 'none',
    scrollTrigger: {
      trigger: '#cta, #contact',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });
}

/* ==========================================================================
   7. FOOTER LOGO — perspective tilt on mouse move (smoothed)
   ========================================================================== */
function initFooterLogoTilt() {
  const logoWrap = document.getElementById('footerLogoWrap') || document.querySelector('.footer-logo-wrap');
  let logo = document.getElementById('footerLogo') || document.querySelector('.footer-logo') || document.querySelector('.footer-logo-fallback');

  if (!logoWrap || !logo) {
    console.warn('Footer logo tilt: logo elements not found');
    return;
  }

  // Ensure perspective is on the wrapper
  logoWrap.style.perspective = '1000px';
  logoWrap.style.transformStyle = 'preserve-3d';

  // Ensure transform-style on the logo
  logo.style.transformStyle = 'preserve-3d';
  logo.style.willChange = 'transform';
  logo.style.transition = 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)';

  const MAX_TILT = 20;
  const SMOOTHING = 0.15;
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let isAnimating = false;

  function startAnimation() {
    if (isAnimating) return;
    isAnimating = true;
    requestAnimationFrame(animate);
  }

  function animate() {
    currentX += (targetX - currentX) * SMOOTHING;
    currentY += (targetY - currentY) * SMOOTHING;

    // Re-query the logo in case it was replaced
    const el = document.getElementById('footerLogo') || document.querySelector('.footer-logo') || document.querySelector('.footer-logo-fallback');
    if (el) {
      el.style.transform = `perspective(1000px) rotateX(${currentX}deg) rotateY(${currentY}deg)`;
    }

    // Stop animation when both targets and currents are ~0 (no mouse over)
    if (Math.abs(targetX - currentX) < 0.01 && Math.abs(targetY - currentY) < 0.01 && targetX === 0 && targetY === 0) {
      isAnimating = false;
      return;
    }
    requestAnimationFrame(animate);
  }

  logoWrap.addEventListener('mousemove', (e) => {
    const rect = logoWrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;     // 0 to 1
    const y = (e.clientY - rect.top) / rect.height;      // 0 to 1
    // Top-right cursor = tilt back-right; bottom-left = tilt forward-left
    targetY = (x - 0.5) * 2 * MAX_TILT;     // rotateY: -20 to +20
    targetX = -(y - 0.5) * 2 * MAX_TILT;     // rotateX: -20 to +20
    startAnimation();
  }, { passive: true });

  logoWrap.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
    startAnimation();
  });

  
}

// Re-init after delay in case images load late
setTimeout(initFooterLogoTilt, 500);
setTimeout(initFooterLogoTilt, 2000);


/* ==========================================================================
   7. CREATOR STATS — tap turns orange, opens platform link
   ========================================================================== */
function initCreatorStats() {
  const statLinks = document.querySelectorAll('.creator-card__stat[data-url]');
  statLinks.forEach(el => {
    el.addEventListener('click', () => {
      el.classList.add('tapped');
      const url = el.getAttribute('data-url');
      if (url && url !== '#') window.open(url, '_blank', 'noopener noreferrer');
    });
  });
}

// ====== CREATORS COVERFLOW CAROUSEL (vanilla JS port) ======
(function() {
  const frame = document.getElementById('coverflowFrame');
  const stage = document.getElementById('coverflowStage');
  const caption = document.getElementById('creatorsCaption');
  const captionName = document.getElementById('captionName');
  const captionAlias = document.getElementById('captionAlias');
  const captionStats = document.getElementById('captionStats');
  if (!frame || !stage) return;

  // ── Creator data ──
  const CREATORS = [
    {
      id: 'mortal',
      name: 'MortaL',
      realName: 'Naman Mathur',
      img: 'images-for-landing-page/creator-mortal.png',
      bio: 'Co-founder of S8UL Esports and a pioneer of Indian mobile gaming, celebrated for his calm demeanor, BGMI competitive history, and variety gameplay.',
      categories: 'BGMI, Variety Gaming, Streaming, Esports',
      youtube: { handle: '@Mortalgaming', count: '7.05M', url: 'https://www.youtube.com/@Mortalgaming' },
      instagram: { handle: '@ig_mortal', count: '5.3M', url: 'https://www.instagram.com/ig_mortal' },
      kick: null
    },
    {
      id: 'payal',
      name: 'Payal',
      realName: 'Payal Dhare',
      img: 'images-for-landing-page/creator-payal.png',
      bio: "Prominent S8UL creator and India's leading female gaming content creator, known for BGMI live streams, casual gaming, and lifestyle content.",
      categories: 'BGMI, Variety Streaming, Vlogging',
      youtube: { handle: '@PayalGaming', count: '4.02M', url: 'https://www.youtube.com/@PayalGaming' },
      instagram: { handle: '@payalgamingg', count: '3.7M', url: 'https://www.instagram.com/payalgamingg' },
      kick: { handle: 'payalgaming', count: '2.6K', url: 'https://kick.com/payalgaming' }
    },
    {
      id: 'snax',
      name: 'Snax',
      realName: 'Raj Varma',
      img: 'images-for-landing-page/creator-snax.png',
      bio: 'Veteran BGMI athlete and streamer famous for his precision DP-28 burst guide drills, competitive mechanics, and fitness-oriented lifestyle content.',
      categories: 'BGMI, Esports, Gaming Tutorials, Fitness / Vlogging',
      youtube: { handle: '@SnaxGaming', count: '1.65M', url: 'https://www.youtube.com/@SnaxGaming' },
      instagram: { handle: '@snaxgaming', count: '1.4M', url: 'https://www.instagram.com/snaxgaming' },
      kick: { handle: 'snaxgaming', count: '17.6K', url: 'https://kick.com/snaxgaming' }
    },
    {
      id: 'scout',
      name: 'Scout',
      realName: 'Tanmay Singh',
      img: 'images-for-landing-page/creator-scout.png',
      bio: 'Founder of Team XSpark and iconic esports athlete, recognized internationally for aggressive assault rifling, high-intensity gameplay, and PC gaming streams.',
      categories: 'BGMI, PC Gaming, Esports, Streaming',
      youtube: { handle: '@scoutopi', count: '4.98M', url: 'https://www.youtube.com/@scoutopi' },
      instagram: { handle: '@scout_op', count: '4.2M', url: 'https://www.instagram.com/scout_op' },
      kick: { handle: 'scoutop', count: '12.1K', url: 'https://kick.com/scoutop' }
    },
    {
      id: 'soulgoblin',
      name: 'Soul Goblin',
      realName: 'Harsh Paudwal',
      img: 'images-for-landing-page/creator-goblin.png',
      bio: 'Top-tier competitive BGMI fragger and MVP champion with Team Soul / Carnival Gaming, renowned for lethal close-range combat skills.',
      categories: 'BGMI, Esports, Competitive Gaming',
      youtube: { handle: '@SoulGoblin', count: '485K', url: 'https://www.youtube.com/@SoulGoblin' },
      instagram: { handle: '@soul_goblin', count: '575K', url: 'https://www.instagram.com/soul_goblin' },
      kick: { handle: 'soulgoblin', count: '19.3K', url: 'https://kick.com/soulgoblin' }
    },
    {
      id: 'mamba',
      name: 'Mamba',
      realName: 'Salman Ahmad',
      img: 'images-for-landing-page/creator-mamba.png',
      bio: 'Former competitive PUBG Mobile player and S8UL member known for immersive GTA V roleplay, BGMI streams, and community gaming banter.',
      categories: 'GTA V RP, BGMI, Variety Gaming, Streaming',
      youtube: { handle: '@8bitMamba', count: '1.41M', url: 'https://www.youtube.com/@8bitMamba' },
      instagram: { handle: '@mamba_salman', count: '720K', url: 'https://www.instagram.com/mamba_salman' },
      kick: { handle: '8bitmamba', count: '7.4K', url: 'https://kick.com/8bitmamba' }
    },
    {
      id: 'viper',
      name: 'Viper',
      realName: 'Yash Soni',
      img: 'images-for-landing-page/creator-viper.png',
      bio: 'Founding member of the classic Team Soul lineup and S8UL creator, known for tactical support gameplay and engaging variety streams.',
      categories: 'BGMI, Variety Gaming, Streaming',
      youtube: { handle: '@SoulViper', count: '1.28M', url: 'https://www.youtube.com/@SoulViper' },
      instagram: { handle: '@soul_viper', count: '925K', url: 'https://www.instagram.com/soul_viper' },
      kick: { handle: 'soulviper', count: '20.2K', url: 'https://kick.com/soulviper' }
    },
    {
      id: 'pahadi',
      name: 'Pahadi',
      realName: 'Lokesh Karakoti',
      img: 'images-for-landing-page/creator-pahadi.png',
      bio: 'Highly decorated Indian Free Fire esports legend and multi-tournament MVP who expanded into BGMI, sniper mechanics, and variety content.',
      categories: 'Free Fire, BGMI, Esports, Streaming',
      youtube: { handle: '@PahadiGamer', count: '1.43M', url: 'https://www.youtube.com/@PahadiGamer' },
      instagram: { handle: '@pahadi_gamer', count: '620K', url: 'https://www.instagram.com/pahadi_gamer' },
      kick: { handle: 'pahadigamer', count: '11.7K', url: 'https://kick.com/pahadigamer' }
    },
    {
      id: 'thug',
      name: 'Thug',
      realName: 'Animesh Agarwal',
      img: 'images-for-landing-page/creator-thug.png',
      bio: 'Co-founder of S8UL Esports and 8Bit Creatives, former competitive player, caster, and a foundational business figure in Indian gaming.',
      categories: 'Esports Business, BGMI, Vlogging, Variety Gaming',
      youtube: { handle: '@8bitthug', count: '1.08M', url: 'https://www.youtube.com/@8bitthug' },
      instagram: { handle: '@8bit_thug', count: '1.1M', url: 'https://www.instagram.com/8bit_thug' },
      kick: { handle: '8bit_thug', count: '8.1K', url: 'https://kick.com/8bit_thug' }
    },
    {
      id: 'goldy',
      name: 'Goldy',
      realName: 'Lokesh Jain',
      img: 'images-for-landing-page/creator-goldy.png',
      bio: 'Co-owner of 8Bit Creatives and S8UL Esports, well-known for gaming industry podcasts, behind-the-scenes vlogs, and creator mentorship.',
      categories: 'Podcasts, Esports Management, Vlogging, Streaming',
      youtube: { handle: '@GoldyBhai', count: '980K', url: 'https://www.youtube.com/@GoldyBhai' },
      instagram: { handle: '@goldy.8bit', count: '1.0M', url: 'https://www.instagram.com/goldy.8bit' },
      kick: { handle: '8bit_goldy', count: '27.6K', url: 'https://kick.com/8bit_goldy' }
    },
    {
      id: 'mercy',
      name: 'Beg4Mercy',
      realName: 'Mrinmoy Lahkar',
      img: 'images-for-landing-page/creator-mercy.png',
      bio: 'S8UL gaming creator and longtime mobile player recognized for energetic BGMI squad matches, humor-driven streams, and community collaborations.',
      categories: 'BGMI, Variety Gaming, Streaming',
      youtube: { handle: '@Beg4Mercy', count: '545K', url: 'https://www.youtube.com/@Beg4Mercy' },
      instagram: { handle: '@8bit_mercy', count: '405K', url: 'https://www.instagram.com/8bit_mercy' },
      kick: null
    },
    {
      id: 'regaltos',
      name: 'Regaltos',
      realName: 'Parv Singh',
      img: 'images-for-landing-page/creator-regaltos.png',
      bio: 'Former Team Soul competitive assaulter and core S8UL creator, widely followed for his classic BGMI sprays, room matches, and game walk-throughs.',
      categories: 'BGMI, Esports, Variety Gaming, Streaming',
      youtube: { handle: '@SoulRegaltos', count: '2.32M', url: 'https://www.youtube.com/@SoulRegaltos' },
      instagram: { handle: '@soul_regaltos', count: '1.9M', url: 'https://www.instagram.com/soul_regaltos' },
      kick: { handle: 'regaltos', count: '53.8K', url: 'https://kick.com/regaltos' }
    }
  ];

  const count = CREATORS.length;
  const ROTATE = 44;          // deg tilt of first neighbor
  const DEPTH = 0.6;          // recession fraction
  const FALLOFF = 0.56;       // ease-off exponent
  const FADE = 0.1;           // opacity lost per step
  const GAP = 0.05;           // space between cards as fraction of card width
  const LOOP = true;

  const cards = [];
  let pos = 0;                 // fractional card index at center
  let target = 0;              // where settle is headed
  let cardWidth = 0;
  let rafId = null;
  let selected = -1;
  let drag = null;

  // ── Build cards ──
  CREATORS.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'creator-card' + (i === 0 ? ' creator-card--center' : '');
    card.setAttribute('role', 'group');
    card.setAttribute('aria-roledescription', 'slide');
    card.setAttribute('aria-label', `${i + 1} of ${count}`);
    card.setAttribute('data-creator', c.id);
    card.setAttribute('data-name', c.name);
    card.setAttribute('data-bio', c.bio);
    card.setAttribute('data-categories', c.categories);
    if (c.youtube) {
      card.setAttribute('data-yt', c.youtube.url);
    }
    if (c.instagram) {
      card.setAttribute('data-ig', c.instagram.url);
    }
    if (c.kick) {
      card.setAttribute('data-kc', c.kick.url);
    }
    const img = document.createElement('img');
    img.src = c.img;
    img.alt = `${c.name} (${c.realName}) — 8Bit Creatives`;
    img.loading = 'lazy';
    img.onerror = function() {
      // Branded placeholder if image missing
      card.style.background = 'linear-gradient(135deg, #FF5931, #B21C01)';
      card.style.display = 'flex';
      card.style.alignItems = 'center';
      card.style.justifyContent = 'center';
      card.innerHTML = `<span style="font-family:'Geist',sans-serif;font-weight:900;color:#FFFFFF;font-size:24px;">${c.name.toUpperCase()}</span>`;
    };
    card.appendChild(img);
    stage.appendChild(card);
    cards.push(card);
  });

  // ── Paint cards based on current pos ──
  function paint() {
    if (window.matchMedia('(max-width: 767px)').matches || window.innerWidth < 768) {
      cards.forEach(card => {
        card.style.transform = '';
        card.style.opacity = '';
        card.style.zIndex = '';
      });
      return;
    }
    if (!cardWidth) return;
    const pitch = cardWidth * (1 + GAP);
    cards.forEach((card, i) => {
      let offset = i - pos;
      if (LOOP) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }
      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, FALLOFF);
      const tilt = Math.min(ROTATE * ramp, 82) * Math.sign(offset);
      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-DEPTH * cardWidth * ramp}px) ` +
        `rotateY(${-tilt}deg)`;
      const edge = LOOP ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      card.style.opacity = String(Math.max(0, 1 - FADE * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
      // active state for grayscale removal
      if (Math.round(pos) % count === i && distance < 0.5) {
        card.classList.add('is-active');
      } else {
        card.classList.remove('is-active');
      }
    });

    // Only update caption if the rounded index changed
    const currentIdx = indexAt(pos);
    if (currentIdx !== selected) {
      updateCaption();
    }
  }

  // ── Update caption based on nearest card ──
  function indexAt(p) {
    return ((Math.round(p) % count) + count) % count;
  }

  function updateCaption() {
    const idx = indexAt(pos);
    if (idx === selected) return;
    selected = idx;
    const c = CREATORS[idx];
    
    // Immediately remove the visible class to reset the fade
    caption.classList.remove('is-visible');
    
    // Immediately update the content (no setTimeout delay)
    captionName.textContent = c.name;
    captionAlias.textContent = c.realName;
    
    let statsHtml = '';
    if (c.youtube) {
      statsHtml += `<a class="stat-link" href="${c.youtube.url}" target="_blank" rel="noopener noreferrer" data-url="${c.youtube.url}">
         <span class="stat-label">YouTube</span>
         <span class="stat-count">${c.youtube.count}</span>
       </a>`;
    }
    if (c.instagram) {
      statsHtml += `<a class="stat-link" href="${c.instagram.url}" target="_blank" rel="noopener noreferrer" data-url="${c.instagram.url}">
         <span class="stat-label">Instagram</span>
         <span class="stat-count">${c.instagram.count}</span>
       </a>`;
    }
    if (c.kick) {
      statsHtml += `<a class="stat-link" href="${c.kick.url}" target="_blank" rel="noopener noreferrer" data-url="${c.kick.url}">
         <span class="stat-label">Kick</span>
         <span class="stat-count">${c.kick.count}</span>
       </a>`;
    }
    captionStats.innerHTML = statsHtml;
    
    // Trigger reflow to restart the CSS transition cleanly
    void caption.offsetWidth;
    
    // Immediately re-add the visible class
    caption.classList.add('is-visible');
  }

  // ── Settle animation (exponential ease-out) ──
  function settle(t) {
    if (rafId !== null) cancelAnimationFrame(rafId);
    target = t;
    function step() {
      const remaining = target - pos;
      if (Math.abs(remaining) < 0.0004) {
        pos = target;
        paint();
        rafId = null;
        return;
      }
      pos += remaining * 0.16;
      paint();
      rafId = requestAnimationFrame(step);
    }
    rafId = requestAnimationFrame(step);
  }

  function clampPos(p) {
    return LOOP ? p : Math.max(0, Math.min(count - 1, p));
  }

  function goTo(i) {
    const t = LOOP
      ? i + Math.round((target - i) / count) * count
      : i;
    settle(clampPos(t));
  }

  function nudge(by) {
    settle(clampPos(Math.round(target) + by));
  }

  // ── Pointer drag (desktop only) ──
  frame.addEventListener('pointerdown', (e) => {
    if (window.innerWidth < 768 || window.matchMedia('(max-width: 767px)').matches) return;
    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    frame.setPointerCapture(e.pointerId);
    target = pos;
    drag = { id: e.pointerId, x: e.clientX, pos: pos, v: 0, t: performance.now() };
  });

  frame.addEventListener('pointermove', (e) => {
    if (window.innerWidth < 768 || window.matchMedia('(max-width: 767px)').matches) return;
    if (!drag || drag.id !== e.pointerId) return;
    const pitch = cardWidth * (1 + GAP);
    if (!pitch) return;
    const now = performance.now();
    const prev = pos;
    pos = clampPos(drag.pos - (e.clientX - drag.x) / pitch);
    drag.v = ((pos - prev) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;
    paint();
  });

  function endDrag(e) {
    if (window.innerWidth < 768 || window.matchMedia('(max-width: 767px)').matches) return;
    if (!drag || drag.id !== e.pointerId) return;
    const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
    drag = null;
    settle(clampPos(Math.round(pos + carried)));
  }
  frame.addEventListener('pointerup', endDrag);
  frame.addEventListener('pointercancel', endDrag);

  // ── Mobile Navigation, Infinite Loop & Caption Detection ──
  const prevBtn = document.getElementById('creatorPrevBtn');
  const nextBtn = document.getElementById('creatorNextBtn');

  let isCloned = false;
  let singleSetWidth = 0;
  let cardStride = 0;
  let isResetting = false;

  function initMobileInfinite() {
    if (isCloned) return;
    isCloned = true;

    // Set 0 (clones before) and Set 2 (clones after)
    const beforeClones = cards.map(c => {
      const clone = c.cloneNode(true);
      clone.classList.add('creator-card--clone');
      clone.setAttribute('aria-hidden', 'true');
      return clone;
    });
    beforeClones.reverse().forEach(c => stage.insertBefore(c, stage.firstChild));

    const afterClones = cards.map(c => {
      const clone = c.cloneNode(true);
      clone.classList.add('creator-card--clone');
      clone.setAttribute('aria-hidden', 'true');
      return clone;
    });
    afterClones.forEach(c => stage.appendChild(c));

    const allCards = stage.querySelectorAll('.creator-card');
    if (allCards.length >= 2) {
      cardStride = allCards[1].offsetLeft - allCards[0].offsetLeft;
      singleSetWidth = cardStride * count;
    }

    if (singleSetWidth > 0) {
      frame.scrollLeft = singleSetWidth;
    }
  }

  if (window.innerWidth < 768 || window.matchMedia('(max-width: 767px)').matches) {
    requestAnimationFrame(() => {
      initMobileInfinite();
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth < 768 && !isCloned) {
      initMobileInfinite();
    } else if (window.innerWidth < 768 && isCloned) {
      const allCards = stage.querySelectorAll('.creator-card');
      if (allCards.length >= 2) {
        cardStride = allCards[1].offsetLeft - allCards[0].offsetLeft;
        singleSetWidth = cardStride * count;
      }
    }
  }, { passive: true });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (window.innerWidth >= 768) return;
      const stride = cardStride || (frame.clientWidth * 0.75 + 16);
      frame.scrollBy({ left: -stride, behavior: 'smooth' });
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (window.innerWidth >= 768) return;
      const stride = cardStride || (frame.clientWidth * 0.75 + 16);
      frame.scrollBy({ left: stride, behavior: 'smooth' });
    });
  }

  let mobileScrollTimer = null;
  frame.addEventListener('scroll', () => {
    if (window.innerWidth >= 768) return;

    // Seamless infinite wrap
    if (singleSetWidth > 0 && !isResetting) {
      if (frame.scrollLeft < singleSetWidth * 0.5) {
        isResetting = true;
        frame.scrollLeft += singleSetWidth;
        requestAnimationFrame(() => { isResetting = false; });
      } else if (frame.scrollLeft >= singleSetWidth * 2.5) {
        isResetting = true;
        frame.scrollLeft -= singleSetWidth;
        requestAnimationFrame(() => { isResetting = false; });
      }
    }

    clearTimeout(mobileScrollTimer);
    mobileScrollTimer = setTimeout(() => {
      const frameRect = frame.getBoundingClientRect();
      const frameCenter = frameRect.left + frameRect.width / 2;
      let closestIdx = 0;
      let minDiff = Infinity;
      const allStageCards = Array.from(stage.querySelectorAll('.creator-card'));
      allStageCards.forEach((card, i) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const diff = Math.abs(cardCenter - frameCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = i;
        }
      });
      const creatorIdx = ((closestIdx % count) + count) % count;
      if (creatorIdx !== selected) {
        pos = creatorIdx;
        updateCaption();
      }
    }, 40);
  }, { passive: true });

  // ── Keyboard ──
  frame.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); nudge(1); }
  });

  // ── Measure card width on resize ──
  function measure() {
    if (cards[0]) {
      cardWidth = cards[0].offsetWidth;
      paint();
    }
  }
  measure();
  const ro = new ResizeObserver(measure);
  ro.observe(frame);

  // Initial caption
  selected = -1;
  updateCaption();
  caption.classList.add('is-visible');

  // Expose for GSAP if needed
  window.coverflowGoTo = goTo;
  window.coverflowNudge = nudge;
})();

// ====== GSAP ENTRANCE ANIMATIONS FOR CREATORS SECTION ======
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Section title + sub fade-up
  gsap.from('.creators-title, .creators-sub', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#creators',
      start: 'top 70%'
    }
  });

  // Cards fly in with stagger (only the visible ones, others stay hidden)
  gsap.from('.creator-card', {
    opacity: 0,
    y: 60,
    rotationY: 90,
    duration: 0.9,
    stagger: 0.05,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#creators',
      start: 'top 60%',
      onEnter: () => {
        // After entrance, let the coverflow paint take over
        // The paint() function will re-position cards correctly
      }
    }
  });

  // Caption + View All fade-up
  gsap.from('.creators-caption, .view-all-btn', {
    opacity: 0,
    y: 20,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#creators',
      start: 'top 50%'
    }
  });
}

// ============================================================
// Formspree Submit Handler (Inline Success/Error, Honeypot, Debounce)
// ============================================================
(function () {
  const form = document.getElementById('briefForm');
  const successBox = document.getElementById('formSuccess');
  const errorBox = document.getElementById('formError');
  const errorMessage = document.getElementById('formErrorMessage');
  const submitButton = form ? (form.querySelector('button[type="submit"], input[type="submit"]') || form.querySelector('#continueBtn, .form-continue')) : null;

  if (form && submitButton) {
    let lastSubmit = 0;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // ─── HONEYPOT CHECK ───
      const honeypot = form.querySelector('input[name="company_website"]');
      if (honeypot && honeypot.value.trim() !== '') {
        // Bot filled the honeypot. Pretend success, silently drop.
        if (successBox) successBox.hidden = false;
        form.hidden = true;
        return;
      }

      // ─── DEBOUNCE CHECK (2 seconds between submits) ───
      const now = Date.now();
      if (now - lastSubmit < 2000) {
        return; // silently ignore double-click
      }
      lastSubmit = now;

      // ─── BASIC VALIDATION ───
      const name = form.querySelector('#name, input[name="name"]');
      const email = form.querySelector('#email, input[name="email"]');
      const pitch = form.querySelector('#pitch, textarea[name="pitch"]');

      if (!name || !email || !pitch || !name.value.trim() || !email.value.trim() || !pitch.value.trim()) {
        if (errorMessage) errorMessage.textContent = 'Please fill in your name, email, and project brief before submitting.';
        if (errorBox) errorBox.hidden = false;
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        if (errorMessage) errorMessage.textContent = 'That email doesn\'t look right. Please check and try again.';
        if (errorBox) errorBox.hidden = false;
        return;
      }

      // ─── DISABLE BUTTON + SHOW LOADING STATE ───
      const originalLabel = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Sending…';
      submitButton.setAttribute('aria-busy', 'true');
      if (errorBox) errorBox.hidden = true;

      try {
        // ─── SUBMIT TO FORMSPREE VIA FETCH ───
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Success — show success box, hide form
          form.hidden = true;
          if (successBox) successBox.hidden = false;
          // Reset for next time (in case user clicks "send another")
          form.reset();
        } else {
          // Formspree returned an error
          let serverMsg = 'Please try again, or email us directly at hello@8bitcreatives.com.';
          try {
            const data = await response.json();
            if (data && data.errors && data.errors[0] && data.errors[0].message) {
              serverMsg = data.errors[0].message;
            }
          } catch (jsonErr) { /* use default message */ }
          if (errorMessage) errorMessage.textContent = serverMsg;
          if (errorBox) errorBox.hidden = false;
        }
      } catch (networkErr) {
        // Network failure (offline, DNS, CORS)
        if (errorMessage) errorMessage.textContent = 'Network error. Please check your internet connection and try again, or email us directly at hello@8bitcreatives.com.';
        if (errorBox) errorBox.hidden = false;
      } finally {
        // ─── RE-ENABLE BUTTON ───
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
        submitButton.removeAttribute('aria-busy');
      }
    });

    // ─── DISMISS BUTTON HANDLERS ───
    const dismissSuccess = document.querySelector('.form-success-dismiss');
    if (dismissSuccess) {
      dismissSuccess.addEventListener('click', () => {
        if (successBox) successBox.hidden = true;
        form.hidden = false;
      });
    }
    const dismissError = document.querySelector('.form-error-dismiss');
    if (dismissError) {
      dismissError.addEventListener('click', () => {
        if (errorBox) errorBox.hidden = true;
      });
    }

    // ─── AUTO-SHOW SUCCESS ON ?status=success REDIRECT FALLBACK ───
    // (In case JS is disabled and Formspree's _next redirect fires)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
      form.hidden = true;
      if (successBox) successBox.hidden = false;
    }
  }
})();

