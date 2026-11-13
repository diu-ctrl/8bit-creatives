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
  const hero = document.getElementById('hero') || document.getElementById('home') || document.querySelector('.hero-section');

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
  if (!hero) return;
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

  let cachedHeroHeight = hero.offsetHeight || window.innerHeight;
  function updateHeroMetrics() {
    cachedHeroHeight = hero.offsetHeight || window.innerHeight;
  }
  function checkHeroScroll() {
    const scrollY = window.scrollY;
    if (scrollY < cachedHeroHeight - 40) {
      show();
    } else {
      hide();
    }

    // Drop navbar lower on hero (80px), top (24px) on other sections
    if (scrollY < cachedHeroHeight * 0.6) {
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
  window.addEventListener('resize', function () {
    updateHeroMetrics();
    checkHeroScroll();
  }, { passive: true });
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

  // === PAUSE ESPORTS 8BIT BACKGROUND WHEN OFF-SCREEN ===
  // The esports section has its own animated 8BIT letter columns.
  // Without this observer, they run forever — even when off-screen —
  // consuming GPU compositing cycles. This pauses them when the
  // esports section is not visible, and resumes when it scrolls into view.
  (function() {
    const esportsSection = document.querySelector('.esports-section');
    const esportsBg = document.querySelector('.esports-section__bg');
    if (!esportsSection || !esportsBg) return;

    if ('IntersectionObserver' in window) {
      const esportsBgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            esportsBg.classList.remove('is-paused');
          } else {
            esportsBg.classList.add('is-paused');
          }
        });
      }, {
        threshold: 0,
        rootMargin: '50px 0px'  // small buffer — pause slightly after the section leaves the viewport
      });
      esportsBgObserver.observe(esportsSection);
    }
  })();
  // === END PAUSE ESPORTS 8BIT BACKGROUND ===
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

  let cachedBgOffsets = [];
  function updateBgOffsets() {
    cachedBgOffsets = [];
    for (let i = 0; i < bgSections.length; i++) {
      const s = bgSections[i];
      let top = 0;
      let el = s;
      while (el) {
        top += el.offsetTop || 0;
        el = el.offsetParent;
      }
      const height = s.offsetHeight;
      cachedBgOffsets.push({
        top: top,
        bottom: top + height,
        bg: s.dataset.bg || s.getAttribute('data-bg') || 'dark'
      });
    }
  }
  updateBgOffsets();

  function checkNavbarBg() {
    const currentY = window.scrollY + 42;
    let found = false;
    for (let i = cachedBgOffsets.length - 1; i >= 0; i--) {
      const s = cachedBgOffsets[i];
      if (s.top <= currentY && s.bottom > currentY) {
        if (s.bg === 'light') setLight();
        else setDark();
        found = true;
        break;
      }
    }
    if (!found) {
      if (window.scrollY <= 10 && cachedBgOffsets[0]) {
        if (cachedBgOffsets[0].bg === 'light') setLight();
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
  window.addEventListener('resize', function () {
    updateBgOffsets();
    checkNavbarBg();
  }, { passive: true });
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

    let cachedActiveOffsets = [];
    function updateActiveOffsets() {
      cachedActiveOffsets = [];
      targetSections.forEach(sec => {
        cachedActiveOffsets.push({
          id: sec.id,
          top: sec.offsetTop,
          bottom: sec.offsetTop + sec.offsetHeight
        });
      });
    }
    updateActiveOffsets();

    function checkActiveSection() {
      const scrollPos = window.scrollY + 160;
      let currentId = null;

      for (let i = 0; i < cachedActiveOffsets.length; i++) {
        const sec = cachedActiveOffsets[i];
        if (scrollPos >= sec.top && scrollPos < sec.bottom) {
          currentId = sec.id;
          break;
        }
      }

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
    window.addEventListener('resize', function () {
      updateActiveOffsets();
      checkActiveSection();
    }, { passive: true });

    window.addEventListener('load', function () {
      updateHeroMetrics();
      updateBgOffsets();
      updateActiveOffsets();
    }, { passive: true });

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
    const characterElements = gsap.utils.toArray('.eclipse-wrap .character');
    if (characterElements.length > 0) {
      gsap.from(characterElements, {
        opacity: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-eclipse-section',
          start: 'top 60%'
        }
      });
    }

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
  const NUM_BLADES = 240;              // was 320 — much denser
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

  const NUM_GROUPS = 6;
  const groups = Array.from({ length: NUM_GROUPS }, () => '');

  for (let i = 0; i < NUM_BLADES; i++) {
    const angle = (i / NUM_BLADES) * Math.PI * 2 + randRange(-0.015, 0.015);
    const anchorX = CX + Math.cos(angle) * GRASS_RADIUS;
    const anchorY = CY + Math.sin(angle) * GRASS_RADIUS;
    const outwardAngle = angle;
    const h = randRange(MIN_H, MAX_H);
    const w = randRange(MIN_W, MAX_W);
    const d = bladePath(anchorX, anchorY, h, w, outwardAngle);
    const opacity = randRange(0.8, 1.0).toFixed(2);
    const grad = rand() < 0.3 ? 'url(#eclipseGrassGradDark)' : 'url(#eclipseGrassGrad)';
    
    // Assign blade to one of the 6 sector groups
    const gIdx = Math.floor((i / NUM_BLADES) * NUM_GROUPS) % NUM_GROUPS;
    groups[gIdx] += `<path d="${d}" fill="${grad}" opacity="${opacity}"/>`;
  }

  let svgString = '';
  const durations = ['3.2s', '4.0s', '4.8s', '3.6s', '4.4s', '3.8s'];
  const delays = ['0s', '0.6s', '1.2s', '0.4s', '1.0s', '1.5s'];
  for (let g = 0; g < NUM_GROUPS; g++) {
    const style = `animation: grass-group-sway ${durations[g]} ease-in-out infinite alternate; animation-delay: ${delays[g]}; transform-origin: ${CX}px ${CY}px;`;
    svgString += `<g class="grass-group" style="${style}">${groups[g]}</g>`;
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
          <stop offset="0%" stop-color="#FF5931"/><stop offset="100%" stop-color="#C82808"/>
        </linearGradient>
        <linearGradient id="efcSkin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E2B897"/><stop offset="100%" stop-color="#C89A78"/>
        </linearGradient>
        <linearGradient id="efcDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#242220"/><stop offset="100%" stop-color="#141210"/>
        </linearGradient>
      </defs>
      <!-- Head & Athletic Jawline (boxy-cut with clean chamfers) -->
      <path d="M44 14 L76 14 L78 34 L72 42 L48 42 L42 34 Z" fill="url(#efcSkin)"/>
      <!-- Hair: sharp modern athletic crop -->
      <path d="M42 14 L78 14 L78 22 L72 20 L68 24 L56 18 L48 22 L42 20 Z" fill="#1A1816"/>
      <!-- Serious tournament game-face: focused brow, intense gaze (no cartoon smile) -->
      <rect x="47" y="24" width="9" height="2" fill="#141210"/>
      <rect x="64" y="24" width="9" height="2" fill="#141210"/>
      <rect x="48" y="27" width="7" height="3" rx="0.5" fill="#141210"/>
      <rect x="65" y="27" width="7" height="3" rx="0.5" fill="#141210"/>
      <rect x="52" y="27" width="2" height="2" fill="#FFFFFF"/>
      <rect x="69" y="27" width="2" height="2" fill="#FFFFFF"/>
      <line x1="57" y1="36" x2="63" y2="36" stroke="#8C5838" stroke-width="1.8" stroke-linecap="round"/>
      <rect x="54" y="42" width="12" height="6" fill="#C89A78"/>
      <!-- Structured 8-Bit Athlete Jersey (boxy with curved bevel edges) -->
      <rect x="36" y="46" width="48" height="52" rx="4" fill="url(#efcJersey)"/>
      <rect x="48" y="46" width="24" height="6" rx="1" fill="#141210"/>
      <!-- Vertical carbon stripe with gold #8 -->
      <rect x="54" y="52" width="12" height="46" fill="#141210"/>
      <text x="60" y="74" fill="#FFFFFF" font-family="monospace" font-size="12" font-weight="900" text-anchor="middle">8</text>
      <!-- Shoulder panels with gold trim -->
      <rect x="36" y="46" width="12" height="4" fill="#FFA500"/>
      <rect x="72" y="46" width="12" height="4" fill="#FFA500"/>
      <!-- Arms in balanced athletic running motion -->
      <g transform="rotate(-24, 38, 48)">
        <rect x="26" y="48" width="12" height="38" rx="3" fill="url(#efcJersey)"/>
        <rect x="26" y="78" width="12" height="8" rx="1" fill="#141210"/>
        <circle cx="32" cy="90" r="5" fill="url(#efcSkin)"/>
      </g>
      <g transform="rotate(18, 74, 48)">
        <rect x="72" y="48" width="12" height="38" rx="3" fill="url(#efcJersey)"/>
        <rect x="72" y="78" width="12" height="8" rx="1" fill="#141210"/>
        <circle cx="78" cy="90" r="5" fill="url(#efcSkin)"/>
      </g>
      <!-- Athletic Compression Shorts -->
      <rect x="36" y="98" width="48" height="22" rx="3" fill="url(#efcDark)"/>
      <line x1="60" y1="98" x2="60" y2="120" stroke="#000" stroke-width="1.5"/>
      <rect x="36" y="116" width="48" height="4" fill="#FF5931"/>
      <!-- Muscular Boxy Legs -->
      <!-- Standing leg -->
      <rect x="40" y="120" width="14" height="42" rx="3" fill="url(#efcSkin)"/>
      <rect x="39" y="146" width="16" height="16" rx="2" fill="#FFFFFF"/>
      <rect x="38" y="162" width="20" height="12" rx="2" fill="#141210"/>
      <rect x="38" y="172" width="20" height="2" fill="#FF5931"/>
      <!-- Kicking leg bent at knee with dynamic strike angle -->
      <g transform="rotate(28, 68, 120)">
        <rect x="64" y="120" width="14" height="24" rx="3" fill="url(#efcSkin)"/>
        <circle cx="71" cy="144" r="7" fill="#C89A78"/>
        <rect x="64" y="144" width="14" height="22" rx="3" fill="#FFFFFF"/>
        <rect x="62" y="164" width="20" height="12" rx="2" fill="#141210"/>
        <rect x="62" y="174" width="20" height="2" fill="#FF5931"/>
      </g>
      <!-- Modern Hexagonal Pro Match Ball -->
      <g transform="translate(102, 160)">
        <circle cx="0" cy="0" r="10" fill="#FFFFFF" stroke="#141210" stroke-width="1.5"/>
        <polygon points="0,-4 3.5,-1.5 2,3 -2,3 -3.5,-1.5" fill="#FF5931"/>
        <line x1="0" y1="-4" x2="0" y2="-9" stroke="#141210" stroke-width="1"/>
        <line x1="3.5" y1="-1.5" x2="8" y2="-4" stroke="#141210" stroke-width="1"/>
        <line x1="2" y1="3" x2="6" y2="8" stroke="#141210" stroke-width="1"/>
        <line x1="-2" y1="3" x2="-6" y2="8" stroke="#141210" stroke-width="1"/>
        <line x1="-3.5" y1="-1.5" x2="-8" y2="-4" stroke="#141210" stroke-width="1"/>
      </g>
  </g>`,
  // Character 7
  `<g>
<defs>
        <linearGradient id="ffHoodie" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FF5931"/><stop offset="100%" stop-color="#C83815"/>
        </linearGradient>
        <linearGradient id="ffSkin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E2B897"/><stop offset="100%" stop-color="#C89A78"/>
        </linearGradient>
        <linearGradient id="ffPants" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#242220"/><stop offset="100%" stop-color="#141210"/>
        </linearGradient>
        <linearGradient id="ffSneaker" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FFFFFF"/><stop offset="60%" stop-color="#E8E8E8"/><stop offset="100%" stop-color="#FF5931"/>
        </linearGradient>
      </defs>
      <!-- Esports Gaming Headset (matte obsidian band with brand orange glowing earcups) -->
      <path d="M36 22 Q60 10 84 22" stroke="#141210" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M42 18 Q60 12 78 18" stroke="#333333" stroke-width="1.5" fill="none" opacity="0.6"/>
      <!-- Left Earcup with orange LED accent -->
      <rect x="31" y="20" width="10" height="18" rx="3" fill="#141210" stroke="#2B2824" stroke-width="0.8"/>
      <rect x="33" y="23" width="6" height="12" rx="2" fill="#FF5931"/>
      <circle cx="36" cy="29" r="1.5" fill="#FFFFFF" opacity="0.8"/>
      <!-- Right Earcup with orange LED accent -->
      <rect x="79" y="20" width="10" height="18" rx="3" fill="#141210" stroke="#2B2824" stroke-width="0.8"/>
      <rect x="81" y="23" width="6" height="12" rx="2" fill="#FF5931"/>
      <circle cx="84" cy="29" r="1.5" fill="#FFFFFF" opacity="0.8"/>
      <!-- Boom Microphone -->
      <path d="M41 33 L48 38 L54 37" stroke="#141210" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="55" cy="37" r="2.2" fill="#FF5931"/>
      <!-- Head with boxy-pixel jaw and serious focused gamer expression -->
      <rect x="44" y="16" width="32" height="26" rx="3" fill="url(#ffSkin)"/>
      <!-- Hair: dark textured fringe with boxy pixel cuts -->
      <path d="M43 16 L77 16 L77 24 L72 24 L70 20 L62 25 L54 19 L48 24 L43 23 Z" fill="#1A1816"/>
      <!-- Serious focused eyes & determined brows (esports tournament focus) -->
      <rect x="47" y="25" width="9" height="2" fill="#141210"/>
      <rect x="64" y="25" width="9" height="2" fill="#141210"/>
      <rect x="48" y="28" width="7" height="3" rx="0.5" fill="#141210"/>
      <rect x="65" y="28" width="7" height="3" rx="0.5" fill="#141210"/>
      <rect x="52" y="28" width="2" height="2" fill="#FFFFFF"/>
      <rect x="69" y="28" width="2" height="2" fill="#FFFFFF"/>
      <line x1="57" y1="34" x2="63" y2="34" stroke="#8A5A3C" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Neck -->
      <rect x="54" y="42" width="12" height="6" fill="#C89A78"/>
      <!-- 8-Bit Structured Orange Streetwear Hoodie (boxy with curved bevel edges) -->
      <rect x="36" y="46" width="48" height="62" rx="4" fill="url(#ffHoodie)"/>
      <!-- High collar with bevel -->
      <rect x="44" y="42" width="32" height="8" rx="2" fill="#D03816"/>
      <!-- Obsidian geometric chest armor / vest plate -->
      <rect x="44" y="52" width="32" height="26" rx="2" fill="#141210"/>
      <!-- 8-Bit Crest on Chest: crisp pixel gamepad emblem in brand orange -->
      <rect x="52" y="58" width="16" height="8" rx="1.5" fill="#FF5931"/>
      <!-- D-pad & action buttons -->
      <rect x="54" y="60" width="3" height="4" fill="#FFFFFF"/>
      <rect x="53" y="61" width="5" height="2" fill="#FFFFFF"/>
      <circle cx="64" cy="61" r="0.9" fill="#FFFFFF"/>
      <circle cx="66" cy="63" r="0.9" fill="#FFFFFF"/>
      <!-- Tactical harness straps with metallic buckles -->
      <line x1="42" y1="48" x2="42" y2="84" stroke="#141210" stroke-width="2.5"/>
      <line x1="78" y1="48" x2="78" y2="84" stroke="#141210" stroke-width="2.5"/>
      <rect x="40" y="60" width="4" height="4" rx="0.5" fill="#999999"/>
      <rect x="76" y="60" width="4" height="4" rx="0.5" fill="#999999"/>
      <!-- Kangaroo pocket with beveled corners -->
      <path d="M42 82 L78 82 L75 98 L45 98 Z" fill="#B83212" stroke="#8C240A" stroke-width="0.8"/>
      <!-- Ribbed hoodie hem -->
      <rect x="36" y="104" width="48" height="6" rx="1" fill="#8C240A"/>
      <!-- Boxy Arms & Tactical Sleeves with brand contrast piping -->
      <rect x="24" y="48" width="13" height="46" rx="3" fill="url(#ffHoodie)"/>
      <rect x="83" y="48" width="13" height="46" rx="3" fill="url(#ffHoodie)"/>
      <line x1="24" y1="62" x2="37" y2="62" stroke="#141210" stroke-width="2"/>
      <line x1="83" y1="62" x2="96" y2="62" stroke="#141210" stroke-width="2"/>
      <!-- Fingerless gaming combat gloves -->
      <rect x="24" y="90" width="13" height="8" rx="2" fill="#141210"/>
      <rect x="83" y="90" width="13" height="8" rx="2" fill="#141210"/>
      <circle cx="30" cy="100" r="4.5" fill="url(#ffSkin)"/>
      <circle cx="90" cy="100" r="4.5" fill="url(#ffSkin)"/>
      <!-- Streetwear Cargo Pants (obsidian with boxy pockets) -->
      <rect x="40" y="108" width="18" height="54" rx="3" fill="url(#ffPants)"/>
      <rect x="62" y="108" width="18" height="54" rx="3" fill="url(#ffPants)"/>
      <!-- Cargo pockets with orange pull tabs -->
      <rect x="38" y="122" width="6" height="14" rx="1" fill="#2E2C2A"/>
      <rect x="38" y="124" width="2" height="4" fill="#FF5931"/>
      <rect x="76" y="122" width="6" height="14" rx="1" fill="#2E2C2A"/>
      <rect x="80" y="124" width="2" height="4" fill="#FF5931"/>
      <!-- Futuristic Chunky High-Top Sneakers (clean bevels and curved athletic sole) -->
      <rect x="36" y="162" width="22" height="12" rx="2" fill="#141210"/>
      <rect x="62" y="162" width="22" height="12" rx="2" fill="#141210"/>
      <!-- Orange & white curved sole -->
      <path d="M34 174 L60 174 Q61 174 61 171 L59 170 L34 170 Z" fill="url(#ffSneaker)"/>
      <path d="M60 174 L86 174 Q87 174 87 171 L85 170 L60 170 Z" fill="url(#ffSneaker)"/>
      <rect x="34" y="174" width="26" height="2" fill="#141210"/>
      <rect x="60" y="174" width="26" height="2" fill="#141210"/>
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
        <linearGradient id="pikaArmor" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFDE43"/><stop offset="100%" stop-color="#FFA800"/>
        </linearGradient>
        <linearGradient id="pikaDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#242220"/><stop offset="100%" stop-color="#141210"/>
        </linearGradient>
        <linearGradient id="pikaCyan" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#00FFFF"/><stop offset="100%" stop-color="#00B8D4"/>
        </linearGradient>
      </defs>
      <!-- Stepped 8-Bit Lightning Ears with solid pixel-block tips -->
      <!-- Left Ear (angled sharply) -->
      <path d="M34 46 L16 12 L28 10 L44 38 Z" fill="url(#pikaArmor)"/>
      <polygon points="16,12 28,10 24,20 18,22" fill="#141210"/>
      <line x1="20" y1="20" x2="36" y2="40" stroke="#00FFFF" stroke-width="1.2" opacity="0.8"/>
      <!-- Right Ear (angled sharply) -->
      <path d="M86 46 L104 12 L92 10 L76 38 Z" fill="url(#pikaArmor)"/>
      <polygon points="104,12 92,10 96,20 102,22" fill="#141210"/>
      <line x1="100" y1="20" x2="84" y2="40" stroke="#00FFFF" stroke-width="1.2" opacity="0.8"/>
      <!-- Stepped 8-Bit Pixel Lightning Tail (heavy faceted zig-zag with energy core) -->
      <path d="M88 126 L104 106 L96 102 L110 78 L100 74 L114 46 L104 42 L116 16"
            stroke="#141210" stroke-width="9.5" fill="none" stroke-linejoin="miter" stroke-linecap="square"/>
      <path d="M88 126 L104 106 L96 102 L110 78 L100 74 L114 46 L104 42 L116 16"
            stroke="url(#pikaArmor)" stroke-width="7" fill="none" stroke-linejoin="miter" stroke-linecap="square"/>
      <path d="M88 126 L104 106 L96 102 L110 78 L100 74 L114 46 L104 42 L116 16"
            stroke="#00FFFF" stroke-width="2" fill="none" stroke-linejoin="miter" opacity="0.9"/>
      <!-- Head: Boxy Voxel Helmet / Head Silhouette with chamfered corners -->
      <rect x="36" y="38" width="48" height="40" rx="4" fill="url(#pikaArmor)"/>
      <rect x="38" y="40" width="44" height="6" rx="2" fill="#FFEAA0" opacity="0.4"/>
      <!-- Tactical Carbon Brow -->
      <path d="M38 48 L82 48 L80 52 L40 52 Z" fill="#141210"/>
      <!-- Serious Combat Battle Eyes: Narrow intense electric visor slits (no round anime eyes) -->
      <rect x="42" y="52" width="16" height="8" rx="2" fill="#141210"/>
      <rect x="62" y="52" width="16" height="8" rx="2" fill="#141210"/>
      <!-- Glowing cyan/amber battle pupils -->
      <polygon points="44,55 54,53 56,58 46,58" fill="#00FFFF"/>
      <polygon points="76,55 66,53 64,58 74,58" fill="#00FFFF"/>
      <circle cx="49" cy="56" r="1.2" fill="#FFFFFF"/>
      <circle cx="71" cy="56" r="1.2" fill="#FFFFFF"/>
      <!-- Electric Cheek Capacitors: Angular lightning bolts (no blushing circles) -->
      <polygon points="34,64 42,60 40,68 44,68 36,76 38,70 34,70" fill="#FF5931"/>
      <polygon points="86,64 78,60 80,68 76,68 84,76 82,70 86,70" fill="#FF5931"/>
      <!-- Serious battle-mask jawline / nose -->
      <polygon points="58,66 62,66 60,68" fill="#141210"/>
      <path d="M53 72 L60 74 L67 72" stroke="#141210" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- Boxy Body Armor with curved corners (rx: 6) -->
      <rect x="34" y="80" width="52" height="52" rx="5" fill="url(#pikaArmor)"/>
      <!-- Carbon-fiber chest plate -->
      <rect x="44" y="84" width="32" height="34" rx="3" fill="url(#pikaDark)"/>
      <!-- Electric Lightning Crest on Chest -->
      <polygon points="60,88 66,98 61,98 64,110 54,100 59,100" fill="url(#pikaCyan)"/>
      <!-- Boxy Armored Arms with combat gauntlets -->
      <rect x="22" y="84" width="14" height="26" rx="3" fill="url(#pikaArmor)"/>
      <rect x="22" y="100" width="14" height="10" rx="2" fill="#141210"/>
      <circle cx="29" cy="112" r="4" fill="url(#pikaArmor)"/>
      <rect x="84" y="84" width="14" height="26" rx="3" fill="url(#pikaArmor)"/>
      <rect x="84" y="100" width="14" height="10" rx="2" fill="#141210"/>
      <circle cx="91" cy="112" r="4" fill="url(#pikaArmor)"/>
      <!-- Boxy Combat Paws with heavy rubber soles -->
      <rect x="36" y="132" width="20" height="26" rx="4" fill="url(#pikaArmor)"/>
      <rect x="64" y="132" width="20" height="26" rx="4" fill="url(#pikaArmor)"/>
      <!-- Heavy armored boots / paws with tread -->
      <rect x="34" y="156" width="24" height="10" rx="2" fill="#141210"/>
      <rect x="62" y="156" width="24" height="10" rx="2" fill="#141210"/>
      <line x1="38" y1="162" x2="54" y2="162" stroke="#FF5931" stroke-width="1.5"/>
      <line x1="66" y1="162" x2="82" y2="162" stroke="#FF5931" stroke-width="1.5"/>
  </g>`,
  // Character 10
  `<g>
<defs>
        <linearGradient id="tekkenGi" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#C82818"/><stop offset="100%" stop-color="#7A1008"/>
        </linearGradient>
        <linearGradient id="tekkenSkin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E2B897"/><stop offset="100%" stop-color="#C89A78"/>
        </linearGradient>
      </defs>
      <!-- Sharp Spiky Hair Polygons (iconic Jin Kazama fringe) -->
      <polygon points="40,20 44,2 52,18" fill="#141210"/>
      <polygon points="48,18 55,0 62,17" fill="#141210"/>
      <polygon points="58,17 66,1 72,18" fill="#141210"/>
      <polygon points="68,18 76,4 82,21" fill="#141210"/>
      <rect x="42" y="16" width="36" height="8" rx="2" fill="#141210"/>
      <!-- Head with Defined Angular Jawline -->
      <path d="M44 18 L76 18 L78 38 L70 44 L50 44 L42 38 Z" fill="url(#tekkenSkin)"/>
      <!-- Fierce Tournament Battle Eyes & Furrowed Brow -->
      <polygon points="46,24 57,27 55,29 46,26" fill="#141210"/>
      <polygon points="74,24 63,27 65,29 74,26" fill="#141210"/>
      <rect x="48" y="27" width="8" height="3" rx="0.5" fill="#141210"/>
      <rect x="64" y="27" width="8" height="3" rx="0.5" fill="#141210"/>
      <circle cx="52" cy="28.5" r="1.2" fill="#FF5931"/>
      <circle cx="68" cy="28.5" r="1.2" fill="#FF5931"/>
      <rect x="54" y="36" width="12" height="2" rx="1" fill="#6A321A"/>
      <rect x="54" y="42" width="12" height="6" fill="#C89A78"/>
      <!-- Structured Karate Gi Torso (crisp V-lapels) -->
      <rect x="34" y="46" width="52" height="54" rx="4" fill="url(#tekkenGi)"/>
      <!-- Left lapel overlapping right lapel with white edge lining -->
      <path d="M72 46 L60 76 L68 100 L78 100 L78 50 Z" fill="#6A0C08"/>
      <line x1="46" y1="46" x2="60" y2="78" stroke="#FFFFFF" stroke-width="1.8" opacity="0.9"/>
      <path d="M46 46 L60 78 L52 100 L42 100 L42 50 Z" fill="#8C1410"/>
      <!-- Prominent Heavy Black Obi Belt with gold embroidery -->
      <rect x="32" y="96" width="56" height="9" rx="1" fill="#141210"/>
      <rect x="54" y="94" width="12" height="13" rx="1" fill="#141210"/>
      <rect x="55" y="105" width="4.5" height="16" fill="#141210"/>
      <rect x="60.5" y="105" width="4.5" height="14" fill="#141210"/>
      <rect x="55" y="117" width="4.5" height="4" fill="#FFD700"/>
      <rect x="60.5" y="115" width="4.5" height="4" fill="#FFD700"/>
      <!-- Muscular Boxy Arms in Combat Stance -->
      <rect x="20" y="50" width="14" height="36" rx="4" fill="url(#tekkenGi)" transform="rotate(20, 27, 68)"/>
      <rect x="86" y="50" width="14" height="32" rx="4" fill="url(#tekkenGi)" transform="rotate(-15, 93, 66)"/>
      <!-- Studded Armored Gauntlets & Clenched Fists -->
      <circle cx="16" cy="92" r="8.5" fill="#8C1410"/>
      <rect x="12" y="85" width="9" height="5" rx="1" fill="#141210"/>
      <circle cx="14" cy="87.5" r="1" fill="#FFFFFF"/>
      <circle cx="18" cy="87.5" r="1" fill="#FFFFFF"/>
      <circle cx="102" cy="84" r="8.5" fill="#8C1410"/>
      <rect x="97" y="77" width="9" height="5" rx="1" fill="#141210"/>
      <circle cx="99" cy="79.5" r="1" fill="#FFFFFF"/>
      <circle cx="103" cy="79.5" r="1" fill="#FFFFFF"/>
      <!-- Structured Gi Pants -->
      <rect x="38" y="104" width="20" height="56" rx="4" fill="#7A1008"/>
      <rect x="62" y="104" width="20" height="56" rx="4" fill="#7A1008"/>
      <!-- Wrapped Martial Arts Footguards & Ankle Supports (no drawn toe lines) -->
      <rect x="40" y="148" width="17" height="14" rx="2" fill="#141210"/>
      <rect x="63" y="148" width="17" height="14" rx="2" fill="#141210"/>
      <rect x="38" y="162" width="21" height="12" rx="3" fill="#8C1410"/>
      <rect x="61" y="162" width="21" height="12" rx="3" fill="#8C1410"/>
      <line x1="38" y1="166" x2="59" y2="166" stroke="#FFFFFF" stroke-width="1.5"/>
      <line x1="61" y1="166" x2="82" y2="166" stroke="#FFFFFF" stroke-width="1.5"/>
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

  // Collision hitbox calibrated to character body inside 84x140 container
  const HIT_OX = 14;
  const HIT_OY = 8;
  const HIT_W = 56;
  const HIT_H = 124;

  const physicsBodies = [];
  let activeDragBody = null;
  let dragOffsetX = 0, dragOffsetY = 0;
  let lastPointerX = 0, lastPointerY = 0;

  function getPointer(e) {
    if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  }

  // Circular obstacle collision (pushes character radially away from the red globe)
  function resolveCircleObstacle(x, y, w, h, cx, cy, r) {
    const clampX = Math.max(x, Math.min(cx, x + w));
    const clampY = Math.max(y, Math.min(cy, y + h));
    const dx = clampX - cx;
    const dy = clampY - cy;
    const distSq = dx * dx + dy * dy;

    if (distSq < r * r) {
      const dist = Math.sqrt(distSq);
      if (dist < 0.001) {
        return { x, y: cy + r, hit: true, nx: 0, ny: 1 };
      }
      const penetration = r - dist;
      const nx = dx / dist;
      const ny = dy / dist;
      return {
        x: x + nx * penetration,
        y: y + ny * penetration,
        hit: true,
        nx,
        ny
      };
    }
    return { x, y, hit: false, nx: 0, ny: 0 };
  }

  // AABB collision resolution — push character out of the solid obstacle along shallowest penetration edge
  function resolveAABB(x, y, w, h, sx, sy, sw, sh) {
    if (x + w <= sx || x >= sx + sw || y + h <= sy || y >= sy + sh) {
      return { x, y, hit: false, nx: 0, ny: 0 };
    }
    const oL = (x + w) - sx, oR = (sx + sw) - x, oT = (y + h) - sy, oB = (sy + sh) - y;
    const m = Math.min(oL, oR, oT, oB);
    if (m === oL) return { x: sx - w, y, hit: true, nx: -1, ny: 0, axis: 'x' };
    if (m === oR) return { x: sx + sw, y, hit: true, nx: 1, ny: 0, axis: 'x' };
    if (m === oT) return { x, y: sy - h, hit: true, nx: 0, ny: -1, axis: 'y' };
    return { x, y: sy + sh, hit: true, nx: 0, ny: 1, axis: 'y' };
  }

  // Get dynamic obstacles in section coordinate space
  function getObstacles() {
    const secRect = section.getBoundingClientRect();
    let globe = null;
    let button = null;

    if (eclipseEl) {
      const r = eclipseEl.getBoundingClientRect();
      const radius = r.width / 2;
      const cx = (r.left + r.right) / 2 - secRect.left;
      const cy = (r.top + r.bottom) / 2 - secRect.top;
      // Red globe circle (+2px buffer so character doesn't clip into perimeter)
      globe = { cx, cy, radius: radius + 2 };
    }

    if (btnAbout) {
      const r = btnAbout.getBoundingClientRect();
      button = {
        x: r.left - secRect.left,
        y: r.top - secRect.top,
        w: r.width,
        h: r.height
      };
    }

    return { secRect, globe, button };
  }

  // Apply constraints and obstacle collisions
  function applyObstacles(x, y, secW, secH, globe, button) {
    let boxX = x + HIT_OX;
    let boxY = y + HIT_OY;
    let hitGlobe = null;
    let hitButton = null;

    for (let iter = 0; iter < 2; iter++) {
      if (globe) {
        const cRes = resolveCircleObstacle(boxX, boxY, HIT_W, HIT_H, globe.cx, globe.cy, globe.radius);
        if (cRes.hit) {
          boxX = cRes.x;
          boxY = cRes.y;
          hitGlobe = cRes;
        }
      }

      if (button) {
        const bRes = resolveAABB(boxX, boxY, HIT_W, HIT_H, button.x, button.y, button.w, button.h);
        if (bRes.hit) {
          boxX = bRes.x;
          boxY = bRes.y;
          hitButton = bRes;
        }
      }

      // Keep visual body inside section bounds:
      // Left edge touches 0, right edge touches secW, top touches 0, feet touch secH
      boxX = Math.max(0, Math.min(boxX, secW - HIT_W));
      boxY = Math.max(0, Math.min(boxY, secH - HIT_H));
    }

    return {
      x: boxX - HIT_OX,
      y: boxY - HIT_OY,
      hitGlobe,
      hitButton
    };
  }

  // Detach a character from the rotating circle and create a falling physics body
  function detachCharacter(targetG) {
    if (!targetG || targetG.dataset.detached === 'true') return null;
    targetG.dataset.detached = 'true';

    const charIndex = parseInt(targetG.getAttribute('data-char-index') || '0', 10);
    const svgContent = (window.eclipseCharacterSVGs && window.eclipseCharacterSVGs[charIndex]) || targetG.innerHTML;

    // Get current on-screen location relative to section
    const charRect = targetG.getBoundingClientRect();
    const { secRect, globe, button } = getObstacles();

    let startX = charRect.left - secRect.left;
    let startY = charRect.top - secRect.top;

    // Smoothly resolve initial detached position outside obstacles
    const solved = applyObstacles(startX, startY, secRect.width, secRect.height, globe, button);
    startX = solved.x;
    startY = solved.y;

    // Hide original element in SVG rotator
    targetG.style.transition = '';
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
      targetG: targetG,
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
    const { secRect, globe, button } = getObstacles();

    let newX = (p.x - secRect.left) - dragOffsetX;
    let newY = (p.y - secRect.top) - dragOffsetY;

    // Apply obstacle and boundary constraints (freely moves anywhere except red globe & button)
    const solved = applyObstacles(newX, newY, secRect.width, secRect.height, globe, button);
    newX = solved.x;
    newY = solved.y;

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
      const { secRect, globe, button } = getObstacles();
      const secW = secRect.width;
      const secH = secRect.height;

      physicsBodies.forEach(body => {
        if (!body.isFalling || body.isDragging) return;

        body.vy += GRAVITY;
        body.vx *= 0.99;

        let newX = body.x + body.vx;
        let newY = body.y + body.vy;

        // Ground collision (feet touch floor)
        if (newY + HIT_OY + HIT_H >= secH) {
          newY = secH - HIT_H - HIT_OY;
          body.vy = -body.vy * BOUNCE;
          body.vx *= GROUND_FRICTION;
          if (Math.abs(body.vy) < 1) body.vy = 0;
          if (Math.abs(body.vx) < 0.5) body.vx = 0;
        }

        // Ceiling collision
        if (newY + HIT_OY < 0) {
          newY = -HIT_OY;
          body.vy = -body.vy * BOUNCE;
        }

        // Left & Right wall collisions
        if (newX + HIT_OX < 0) {
          newX = -HIT_OX;
          body.vx = -body.vx * BOUNCE;
        }
        if (newX + HIT_OX + HIT_W > secW) {
          newX = secW - HIT_W - HIT_OX;
          body.vx = -body.vx * BOUNCE;
        }

        // Solid obstacle collisions (red circle & About Us button)
        const solved = applyObstacles(newX, newY, secW, secH, globe, button);
        if (solved.hitGlobe) {
          const dot = body.vx * solved.hitGlobe.nx + body.vy * solved.hitGlobe.ny;
          if (dot < 0) {
            body.vx = (body.vx - (1 + BOUNCE) * dot * solved.hitGlobe.nx) * 0.95;
            body.vy = (body.vy - (1 + BOUNCE) * dot * solved.hitGlobe.ny) * 0.95;
          }
        }
        if (solved.hitButton) {
          if (solved.hitButton.axis === 'x') body.vx = -body.vx * BOUNCE;
          if (solved.hitButton.axis === 'y') body.vy = -body.vy * BOUNCE;
        }
        newX = solved.x;
        newY = solved.y;

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

  // Respawn character from physics back to hanging rotator
  function respawnCharacter(targetG, body) {
    if (!targetG) return;
    if (!body) {
      body = physicsBodies.find(b => b.targetG === targetG);
    }
    if (body) {
      const idx = physicsBodies.indexOf(body);
      if (idx !== -1) physicsBodies.splice(idx, 1);
      if (body.el && body.el.parentNode) {
        body.el.style.transition = 'opacity 0.4s ease';
        body.el.style.opacity = '0';
        setTimeout(() => {
          if (body.el && body.el.parentNode) {
            body.el.parentNode.removeChild(body.el);
          }
        }, 400);
      }
    }
    targetG.dataset.detached = 'false';
    targetG.style.pointerEvents = 'auto';
    targetG.style.transition = 'opacity 0.5s ease';
    targetG.style.opacity = '1';
  }

  function resetAllCharactersToHanging() {
    if (!charactersSvg) return;
    const allChars = charactersSvg.querySelectorAll('.eclipse-char-item');
    allChars.forEach(targetG => {
      if (targetG.dataset.detached === 'true') {
        respawnCharacter(targetG);
      } else {
        targetG.style.opacity = '1';
        targetG.style.pointerEvents = 'auto';
        targetG.dataset.detached = 'false';
      }
    });
  }

  // === AUTO-FALL DEMO TRIGGER ===
  // When the About section scrolls into view, ONE random character
  // auto-falls as a visual hint that the characters are interactive.
  // Triggers ONCE per page load.
  let autoFallTriggered = false;

  function pickRandomCharacter() {
    if (!charactersSvg) return null;
    const available = Array.from(charactersSvg.querySelectorAll('.eclipse-char-item')).filter(
      el => el.dataset.detached !== 'true'
    );
    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
  }

  function triggerAutoFall() {
    if (autoFallTriggered) return;

    const pickedCharG = pickRandomCharacter();
    if (!pickedCharG) {
      // Characters not generated yet — retry in 500ms (up to 10 times)
      if (!triggerAutoFall._retries) triggerAutoFall._retries = 0;
      triggerAutoFall._retries++;
      if (triggerAutoFall._retries <= 10) {
        setTimeout(triggerAutoFall, 500);
      }
      return;
    }

    const body = detachCharacter(pickedCharG);
    if (!body) {
      // Detach failed — retry with a different character in 500ms (up to 5 times)
      if (!triggerAutoFall._detachRetries) triggerAutoFall._detachRetries = 0;
      triggerAutoFall._detachRetries++;
      if (triggerAutoFall._detachRetries <= 5) {
        setTimeout(triggerAutoFall, 500);
      }
      return;
    }

    // ONLY set the flag after the character has been successfully detached
    autoFallTriggered = true;

    // Respawn after fall completes so character returns to hanging position
    setTimeout(() => {
      // If user interacted and is dragging, wait until drag ends
      if (body.isDragging) {
        const checkInterval = setInterval(() => {
          if (!body.isDragging) {
            clearInterval(checkInterval);
            setTimeout(() => respawnCharacter(pickedCharG, body), 2000);
          }
        }, 500);
        return;
      }
      respawnCharacter(pickedCharG, body);
    }, 4000);
  }

  // Expose for debugging and verification
  window.__autoFallDemo = {
    triggerAutoFall,
    resetAllCharactersToHanging,
    respawnCharacter,
    pickRandomCharacter
  };

  // Check if About section is already in view on load (e.g. refresh at #about)
  let isAlreadyInViewOnLoad = false;
  const initialRect = section.getBoundingClientRect();
  if (initialRect && initialRect.top < window.innerHeight * 0.7 && initialRect.bottom > 0) {
    isAlreadyInViewOnLoad = true;
  }

  if ('IntersectionObserver' in window) {
    const autoFallObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!isAlreadyInViewOnLoad && entry.isIntersecting && (entry.intersectionRatio >= 0.2 || entry.boundingClientRect.top < window.innerHeight * 0.8)) {
          triggerAutoFall();
          autoFallObserver.disconnect();
        }
      });
    }, {
      threshold: [0, 0.15, 0.25, 0.5, 0.75, 1],
      rootMargin: '0px 0px -10% 0px'
    });
    autoFallObserver.observe(section);
  }

  // Handle the page-refresh-while-at-About case:
  // If the page loads with the About section already in view,
  // ensure characters are reset to hanging, then auto-fall after delay.
  function handleLoadRefreshCase() {
    setTimeout(() => {
      const aboutRect = section.getBoundingClientRect();
      if (aboutRect && aboutRect.top < window.innerHeight * 0.7 && aboutRect.bottom > 0) {
        resetAllCharactersToHanging();
        setTimeout(triggerAutoFall, 600);
      }
    }, 300);
  }

  if (document.readyState === 'complete') {
    handleLoadRefreshCase();
  } else {
    window.addEventListener('load', handleLoadRefreshCase);
  }
  // === END AUTO-FALL DEMO TRIGGER ===
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
  /* ============================================================
     8BIT DINO V3 - FULL REWRITE (single self-contained function)
     - Hand-designed faithful pixel sprites (T-Rex, duck, pterosaur)
     - DPR-perfect rendering: canvas buffer matches its real display
       box, so art is never stretched and looks identical on every screen
     - Variable-height jump, duck (ArrowDown or C), fast-fall
     - Distance-based obstacle spawning, 3 bird altitudes, clusters
     - Persistent high score (localStorage), milestone beeps (WebAudio)
     ============================================================ */
  const canvas = document.getElementById('heroDinoCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  // === 8BIT DINO V3 MARKER ===

  // ---------- palette (site-branded, same as the original game) ----------
  const BG = '#FFFFFF';
  const FG = '#FF5931';        // dino orange
  const FG_LIGHT = '#535353';  // text + ground
  const OBSTACLE = '#000000';  // cacti + birds
  const CLOUD = '#DCDCDC';

  // ---------- sprite maps ('.'=empty, 'B'=body, 'W'=eye white, 'P'=eye pupil) ----------
  const DINO3_ART = {
    // Authentic Chromium T-Rex (22 x 24 cells -> 44 x 48 px at CELL=2)
    // Accurate snout, open mouth, eye with pupil, tiny arms, curved tail, running legs
    stand: [
      '......................',
      '............BBBBBBBB..',
      '...........BBBBBBBBBB.',
      '...........BWPBBBBBBB.',
      '...........BBBBBBBBBB.',
      '...........BBBBBBBBBB.',
      '...........BBBBBBBBBB.',
      '...........BBBBB......',
      '...........BBBBBBBB...',
      '.B........BBBBB.......',
      '.B.......BBBBBB.......',
      '.BB....BBBBBBBBBB.....',
      '.BBB..BBBBBBBBB.B.....',
      '.BBBBBBBBBBBBBB.......',
      '.BBBBBBBBBBBBBB.......',
      '..BBBBBBBBBBBB........',
      '...BBBBBBBBBBB........',
      '....BBBBBBBBB.........',
      '.....BBBBBBB..........',
      '......BBB.BB..........',
      '......BB...B..........',
      '......B....B..........',
      '......BB...BB.........',
      '......................'
    ],
    dead: [
      '......................',
      '............BBBBBBBB..',
      '...........BBBBBBBBBB.',
      '...........BW.WBBBBBB.',
      '............BWWBBBBBB.',
      '...........BW.WBBBBBB.',
      '...........BBBBBBBBBB.',
      '...........BBBBB......',
      '...........BBBBBBBB...',
      '.B........BBBBB.......',
      '.B.......BBBBBB.......',
      '.BB....BBBBBBBBBB.....',
      '.BBB..BBBBBBBBB.B.....',
      '.BBBBBBBBBBBBBB.......',
      '.BBBBBBBBBBBBBB.......',
      '..BBBBBBBBBBBB........',
      '...BBBBBBBBBBB........',
      '....BBBBBBBBB.........',
      '.....BBBBBBB..........',
      '......BBB.BB..........',
      '......BB...B..........',
      '......B....B..........',
      '......BB...BB.........',
      '......................'
    ],
    runA: [
      '......................',
      '............BBBBBBBB..',
      '...........BBBBBBBBBB.',
      '...........BWPBBBBBBB.',
      '...........BBBBBBBBBB.',
      '...........BBBBBBBBBB.',
      '...........BBBBBBBBBB.',
      '...........BBBBB......',
      '...........BBBBBBBB...',
      '.B........BBBBB.......',
      '.B.......BBBBBB.......',
      '.BB....BBBBBBBBBB.....',
      '.BBB..BBBBBBBBB.B.....',
      '.BBBBBBBBBBBBBB.......',
      '.BBBBBBBBBBBBBB.......',
      '..BBBBBBBBBBBB........',
      '...BBBBBBBBBBB........',
      '....BBBBBBBBB.........',
      '.....BBBBBBB..........',
      '......BBB..BBB........',
      '......BB..............',
      '......B...............',
      '......BB..............',
      '......................'
    ],
    runB: [
      '......................',
      '............BBBBBBBB..',
      '...........BBBBBBBBBB.',
      '...........BWPBBBBBBB.',
      '...........BBBBBBBBBB.',
      '...........BBBBBBBBBB.',
      '...........BBBBBBBBBB.',
      '...........BBBBB......',
      '...........BBBBBBBB...',
      '.B........BBBBB.......',
      '.B.......BBBBBB.......',
      '.BB....BBBBBBBBBB.....',
      '.BBB..BBBBBBBBB.B.....',
      '.BBBBBBBBBBBBBB.......',
      '.BBBBBBBBBBBBBB.......',
      '..BBBBBBBBBBBB........',
      '...BBBBBBBBBBB........',
      '....BBBBBBBBB.........',
      '.....BBBBBBB..........',
      '......BB..BB..........',
      '.......BB..B..........',
      '...........B..........',
      '...........BB.........',
      '......................'
    ],
    // Ducking (30 x 24 cells -> 60 x 48 px at CELL=2)
    duckA: [
      '..............................',
      '..............................',
      '..............................',
      '..............................',
      '..............................',
      '..............................',
      '..............................',
      '..............................',
      '..............................',
      '..............................',
      '.B..................BBBBBBBB..',
      '.BBB....BBBBBBBBB..BBBBBBBBBB.',
      '.BBBBBBBBBBBBBBBBBBBBWPBBBBBB.',
      '..BBBBBBBBBBBBBBBBBBBBBBBBBBB.',
      '...BBBBBBBBBBBBBBBBBBBBBBBBBB.',
      '....BBBBBBBBBBBBBBBBBBBBBBBBB.',
      '.....BBBBBBBBBBBBBBBBBBB......',
      '......BBBBBBBBBBBB..BBBBBBB...',
      '.......BBBBBB...B.............',
      '.......B..BBB...BB............',
      '.......BB.BB..................',
      '..........B...................',
      '..........BB..................',
      '..............................'
    ],
    duckB: [
      '..............................',
      '..............................',
      '..............................',
      '..............................',
      '..............................',
      '..............................',
      '..............................',
      '..............................',
      '..............................',
      '..............................',
      '.B..................BBBBBBBB..',
      '.BBB....BBBBBBBBB..BBBBBBBBBB.',
      '.BBBBBBBBBBBBBBBBBBBBWPBBBBBB.',
      '..BBBBBBBBBBBBBBBBBBBBBBBBBBB.',
      '...BBBBBBBBBBBBBBBBBBBBBBBBBB.',
      '....BBBBBBBBBBBBBBBBBBBBBBBBB.',
      '.....BBBBBBBBBBBBBBBBBBB......',
      '......BBBBBBBBBBBB..BBBBBBB...',
      '.......BBBBBB...B.............',
      '.......BBB..BB..BB............',
      '.......BB.....................',
      '.......B......................',
      '.......BB.....................',
      '..............................'
    ],
    // Pterosaur (20 x 12 cells -> 40 x 24 px), flies leftward, beak at left
    birdA: [
      '.............BBB....',
      '............BBBB....',
      '...........BBBB.....',
      '..........BBBB......',
      '.........BBBB.......',
      '....BB...BBB........',
      '..BBBBBBBBBBBBB.....',
      'BBBBBBBBBBBBBBBBBBB.',
      '......BBBBBBBBBBB...',
      '....................',
      '....................',
      '....................'
    ],
    birdB: [
      '....................',
      '....................',
      '....................',
      '....................',
      '....................',
      '....BB...BBB........',
      '..BBBBBBBBBBBBB.....',
      'BBBBBBBBBBBBBBBBBBB.',
      '......BBBBBBBBBBB...',
      '.........BBBB.......',
      '..........BBBB......',
      '...........BBBB.....'
    ]
  };

  // ---------- responsive, distortion-free sizing ----------
  let cssW = 900, cssH = 200, groundY = 160;
  const CELL = 2;                    // 2 CSS px per sprite pixel
  const DINO_W = 22 * CELL, DINO_H = 24 * CELL;
  const DUCK_W = 30 * CELL, DUCK_H = 24 * CELL;
  const BIRD_W = 20 * CELL, BIRD_H = 12 * CELL;

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cssW = canvas.clientWidth || canvas.offsetWidth || 900;
    cssH = canvas.clientHeight || canvas.offsetHeight || 200;
    if (cssH < 120) cssH = 120;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(Math.round(cssW * dpr) / cssW, 0, 0, Math.round(cssH * dpr) / cssH, 0, 0);
    groundY = Math.round(cssH * 0.82);
  }
  resizeCanvas();

  // ---------- game state ----------
  let state = 'waiting';           // waiting | playing | gameover
  let score = 0;
  let highScore = 0;
  try { highScore = parseFloat(localStorage.getItem('eightbit_dino_hi_v1')) || 0; } catch (err) { highScore = 0; }
  let speed = 6.2;
  let legFrame = 0;
  let legAccum = 0;
  let flashTimer = 0;
  let groundOffset = 0;
  let milestone = 0;
  const isTouch = window.matchMedia('(hover: none)').matches;
  const dino = {
    x: 60, y: 0, vy: 0,
    jumping: false, ducking: false
  };

  let obstacles = [];
  let clouds = [];
  let distToSpawn = 500;
  let cloudTimer = 40;
  let lastTs = 0;

  // ---------- audio (tiny WebAudio blips, created on first gesture) ----------
  let audioCtx = null;
  function beep(freq, dur, type, vol) {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = type || 'square';
      o.frequency.value = freq;
      g.gain.value = vol || 0.03;
      o.connect(g); g.connect(audioCtx.destination);
      const t = audioCtx.currentTime;
      g.gain.setValueAtTime(vol || 0.03, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.start(t); o.stop(t + dur);
    } catch (err) { /* audio is optional */ }
  }

  // ---------- input ----------
  let diedAt = 0;
  function onPressAction() {
    if (state === 'waiting') startGame();
    else if (state === 'gameover') {
      if (performance.now() - diedAt > 600) startGame();
    }
    else if (!dino.jumping && !dino.ducking) jump();
  }
  window.addEventListener('keydown', (e) => {
    // Only react when the hero (and therefore the game) is on screen
    const heroSec = document.getElementById('hero');
    if (heroSec) {
      const r = heroSec.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
    }
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'Enter') {
      e.preventDefault();
      if (e.repeat) return;
      onPressAction();
    }
    if ((e.code === 'ArrowDown' || e.code === 'KeyC') && state === 'playing') {
      e.preventDefault();
      dino.ducking = true;
      if (dino.jumping) dino.vy += 1.6;   // fast-fall
    }
  });
  window.addEventListener('keyup', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'Enter') {
      if (state === 'playing' && dino.jumping && dino.vy < -4.6) dino.vy = -4.6;  // variable jump
    }
    if (e.code === 'ArrowDown' || e.code === 'KeyC') dino.ducking = false;
  });
  canvas.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    onPressAction();
  });

  // ---------- lifecycle ----------
  function startGame() {
    state = 'playing';
    score = 0; speed = 6.2; milestone = 0; flashTimer = 0; legAccum = 0;
    obstacles = []; clouds = [];
    distToSpawn = 420;
    cloudTimer = 30;
    dino.y = 0; dino.vy = 0; dino.jumping = false; dino.ducking = false;
    beep(660, 0.07, 'square', 0.025);
  }

  function jump() {
    dino.vy = -11.8;
    dino.jumping = true;
    dino.ducking = false;
    beep(500, 0.05, 'square', 0.02);
  }

  // ---------- obstacles ----------
  // kinds: S small cactus, M medium, L large, C2/C3 clusters, B bird
  function spawnObstacle() {
    const canBird = score > 100;
    const r = Math.random();
    let kind;
    if (canBird && r < 0.24) kind = 'B';
    else if (r < 0.42) kind = 'S';
    else if (r < 0.62) kind = 'M';
    else if (r < 0.80) kind = 'L';
    else if (r < 0.92) kind = 'C2';
    else kind = 'C3';

    let w, h;
    if (kind === 'S') { w = 8 * CELL; h = 17 * CELL; }
    else if (kind === 'M') { w = 8 * CELL; h = 21 * CELL; }
    else if (kind === 'L') { w = 12 * CELL; h = 25 * CELL; }
    else if (kind === 'C2') { w = 18 * CELL; h = 17 * CELL; }
    else if (kind === 'C3') { w = 27 * CELL; h = 17 * CELL; }
    else { w = BIRD_W; h = BIRD_H; }

    const o = { kind, x: cssW + 30, w: w, h: h, y: groundY - h, wing: 0 };
    if (kind === 'B') {
      // three altitudes: low (jump), mid (duck), high (safe to ignore)
      const lanes = [groundY - 26, groundY - 58, groundY - 92];
      o.y = lanes[Math.floor(Math.random() * lanes.length)];
    }
    obstacles.push(o);

    // distance-based gap, slightly tighter as score grows (never unfair)
    const base = 300 - Math.min(60, score / 12);
    distToSpawn = base + Math.random() * 260 + (o.kind === 'C3' ? 60 : 0);
  }

  function update(dt) {
    if (state !== 'playing') return;
    const k = dt / 16.667;              // 1.0 at 60fps, 0.5 at 120fps, etc.

    speed = 6.2 + Math.min(5.6, score / 240);
    groundOffset = (groundOffset + speed * k) % 806;

    // physics
    if (dino.jumping || dino.y < 0) {
      dino.vy += 0.62 * k;
      dino.y += dino.vy * k;
      if (dino.y >= 0) { dino.y = 0; dino.vy = 0; dino.jumping = false; }
    }

    legAccum += dt;
    if (legAccum >= 100) { legAccum = 0; legFrame ^= 1; }

    // spawn by distance travelled
    distToSpawn -= speed * k;
    if (distToSpawn <= 0) spawnObstacle();

    // clouds
    cloudTimer -= k;
    if (cloudTimer <= 0) {
      clouds.push({ x: cssW + 20, y: 18 + Math.random() * (groundY * 0.4), s: 0.85 + Math.random() * 0.6 });
      cloudTimer = 130 + Math.floor(Math.random() * 220);
    }

    // move world
    for (const o of obstacles) {
      o.x -= speed * k;
      if (o.kind === 'B') { o.x -= 1.4 * k; o.wing += dt; }
    }
    obstacles = obstacles.filter((o) => o.x + o.w > -30);
    for (const c of clouds) c.x -= speed * 0.35 * c.s * k;
    clouds = clouds.filter((c) => c.x > -70);

    // score + milestones
    score += 0.12 * k;
    const m = Math.floor(score / 100);
    if (m > milestone) {
      milestone = m;
      flashTimer = 800;
      beep(1040, 0.06, 'square', 0.03);
      setTimeout(() => beep(1320, 0.08, 'square', 0.03), 90);
    }
    if (flashTimer > 0) flashTimer -= dt;

    // collisions
    for (const o of obstacles) {
      if (collides(o)) {
        state = 'gameover';
        diedAt = performance.now();
        beep(140, 0.22, 'sawtooth', 0.04);
        if (score > highScore) {
          highScore = score;
          try { localStorage.setItem('eightbit_dino_hi_v1', String(Math.floor(highScore))); } catch (err) {}
        }
        break;
      }
    }
  }

  function dinoBox() {
    if (dino.ducking && !dino.jumping) {
      return { x: dino.x + 4, y: groundY + dino.y - 28, w: DUCK_W - 8, h: 26 };
    }
    return { x: dino.x + 6, y: groundY + dino.y - DINO_H + 4, w: DINO_W - 14, h: DINO_H - 8 };
  }

  function collides(o) {
    const b = dinoBox();
    const inset = 3;
    return b.x < o.x + o.w - inset &&
           b.x + b.w > o.x + inset &&
           b.y < o.y + o.h - inset &&
           b.y + b.h > o.y + inset;
  }

  // ---------- drawing ----------
  function drawSprite(map, ox, oy, color, cell) {
    const u = cell || CELL;
    ctx.fillStyle = color;
    for (let r = 0; r < map.length; r++) {
      const row = map[r];
      let runStart = -1;
      for (let c = 0; c <= row.length; c++) {
        const on = row[c] === 'B';
        if (on && runStart < 0) runStart = c;
        else if (!on && runStart >= 0) {
          ctx.fillRect(ox + runStart * u, oy + r * u, (c - runStart) * u, u);
          runStart = -1;
        }
      }
    }
  }

  function drawDinoSprite(map, ox, oy, cell) {
    const u = cell || CELL;
    // Pass 1: Body (B) - run-length filled
    ctx.fillStyle = FG;
    for (let r = 0; r < map.length; r++) {
      const row = map[r];
      let runStart = -1;
      for (let c = 0; c <= row.length; c++) {
        const on = row[c] === 'B';
        if (on && runStart < 0) runStart = c;
        else if (!on && runStart >= 0) {
          ctx.fillRect(ox + runStart * u, oy + r * u, (c - runStart) * u, u);
          runStart = -1;
        }
      }
    }
    // Pass 2: Eye white (W)
    ctx.fillStyle = '#FFFFFF';
    for (let r = 0; r < map.length; r++) {
      const row = map[r];
      for (let c = 0; c < row.length; c++) {
        if (row[c] === 'W') ctx.fillRect(ox + c * u, oy + r * u, u, u);
      }
    }
    // Pass 3: Eye pupil (P)
    ctx.fillStyle = '#141210';
    for (let r = 0; r < map.length; r++) {
      const row = map[r];
      for (let c = 0; c < row.length; c++) {
        if (row[c] === 'P') ctx.fillRect(ox + c * u, oy + r * u, u, u);
      }
    }
  }

  const drawDino = () => {
    const yTop = groundY + dino.y;
    if (dino.ducking && !dino.jumping && state === 'playing') {
      const map = legFrame ?
        DINO3_ART.duckA :
        DINO3_ART.duckB;
      drawDinoSprite(map, dino.x, yTop - DUCK_H);
    } else {
      let map = DINO3_ART.stand;
      if (state === 'gameover') map = DINO3_ART.dead;
      else if (dino.jumping) map = DINO3_ART.stand;
      else if (state === 'playing') map = legFrame ? DINO3_ART.runA : DINO3_ART.runB;
      drawDinoSprite(map, dino.x, yTop - DINO_H);
    }
  }

  function drawObstacle(o) {
    ctx.fillStyle = OBSTACLE;
    if (o.kind === 'B') {
      const map = (o.wing % 420) < 210 ?
        DINO3_ART.birdA :
        DINO3_ART.birdB;
      drawSprite(map, o.x, o.y, OBSTACLE);
      return;
    }
    const u = CELL;
    if (o.kind === 'S') { cactusSingle(o.x, o.y, 17, u); return; }
    if (o.kind === 'M') { cactusSingle(o.x, o.y, 21, u); return; }
    if (o.kind === 'L') { cactusLarge(o.x, o.y, 25, u); return; }
    if (o.kind === 'C2') {
      cactusSingle(o.x, o.y, 17, u);
      cactusSingle(o.x + 9 * u, o.y, 17, u);
      return;
    }
    // C3
    cactusSingle(o.x, o.y, 17, u);
    cactusSingle(o.x + 9 * u, o.y, 17, u);
    cactusSingle(o.x + 18 * u, o.y, 17, u);
  }

  function cactusSingle(x, y, hc, u) {
    // chunky cactus in cell units: 4u trunk + 2u arms; art spans x+u .. x+9u
    const h = hc * u;
    ctx.fillRect(x + 3 * u, y, 4 * u, h);             // trunk
    ctx.fillRect(x + 4 * u, y, 2 * u, 2 * u);         // rounded-top step
    ctx.fillRect(x + 1 * u, y + 5 * u, 2 * u, 8 * u); // left arm
    ctx.fillRect(x + 7 * u, y + 2 * u, 2 * u, 9 * u); // right arm
  }
  function cactusLarge(x, y, hc, u) {
    // 5u trunk; art spans x+2u .. x+11u
    const h = hc * u;
    ctx.fillRect(x + 4 * u, y, 5 * u, h);
    ctx.fillRect(x + 5 * u, y, 3 * u, 2 * u);
    ctx.fillRect(x + 1 * u, y + 9 * u, 3 * u, 10 * u);
    ctx.fillRect(x + 9 * u, y + 5 * u, 3 * u, 12 * u);
  }

  function drawCloud(c) {
    ctx.fillStyle = CLOUD;
    const s = c.s;
    ctx.fillRect(c.x, c.y, 46 * s, 9 * s);
    ctx.fillRect(c.x + 8 * s, c.y - 7 * s, 30 * s, 8 * s);
    ctx.fillRect(c.x + 16 * s, c.y - 13 * s, 14 * s, 7 * s);
  }

  // deterministic scrolling ground texture
  const groundDashes = [];
  (function buildGround() {
    for (let i = 0; i < 26; i++) {
      groundDashes.push({
        x: i * 31 + ((i * 137) % 23),
        y: 6 + (i % 3) * 6,
        w: 5 + ((i * 7) % 10)
      });
    }
  })();
  function drawGround() {
    ctx.fillStyle = FG_LIGHT;
    ctx.fillRect(0, groundY, cssW, 2);
    const PW = 806;
    for (const d of groundDashes) {
      const sx = ((d.x - groundOffset) % PW + PW) % PW;
      // Tile the dash pattern across the FULL canvas width (not just one
      // 806px period), so dashes are visible on every screen size.
      for (let x = sx - PW; x < cssW + 20; x += PW) {
        if (x > -20) ctx.fillRect(x, groundY + d.y, d.w, 2);
      }
    }
  }

  function scoreText() {
    return String(Math.floor(score)).padStart(5, '0');
  }
  function drawScore() {
    if (flashTimer > 0 && Math.floor(flashTimer / 90) % 2 === 0) return; // milestone blink
    ctx.fillStyle = FG_LIGHT;
    ctx.font = '600 13px "Geist", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(scoreText(), cssW - 18, 26);
    if (highScore > 0) {
      ctx.fillText('HI ' + String(Math.floor(highScore)).padStart(5, '0'), cssW - 74, 26);
    }
    ctx.textAlign = 'left';
  }

  function drawWaiting() {
    const cx = cssW / 2;
    ctx.fillStyle = FG_LIGHT;
    ctx.textAlign = 'center';
    if (isTouch) {
      ctx.font = '700 26px "Geist", sans-serif';
      ctx.fillText('TAP TO START', cx, cssH * 0.35);
    } else {
      ctx.font = '700 22px "Geist", sans-serif';
      ctx.fillText('Space or Click to Start', cx, cssH * 0.30);
      ctx.font = '600 13px "Geist", sans-serif';
      ctx.fillText('SPACE / UP for jump  —  DOWN / C for crouch', cx, cssH * 0.30 + 30);
    }
    ctx.textAlign = 'left';
  }

  function drawGameOver() {
    const cx = cssW / 2;
    ctx.fillStyle = FG_LIGHT;
    ctx.textAlign = 'center';
    ctx.font = '700 24px "Geist", sans-serif';
    ctx.fillText('G A M E   O V E R', cx, cssH * 0.34);
    ctx.font = '500 13px "Geist", sans-serif';
    ctx.fillText('SCORE ' + scoreText() + '   /   BEST ' + String(Math.floor(highScore)).padStart(5, '0'), cx, cssH * 0.34 + 28);
    ctx.fillStyle = '#9a9a9a';
    ctx.font = '500 11px "Geist", sans-serif';
    ctx.fillText(isTouch ? 'Tap to run again' : 'Press SPACE or click to run again', cx, cssH * 0.34 + 50);
    ctx.textAlign = 'left';
  }

  function render() {
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, cssW, cssH);
    for (const c of clouds) drawCloud(c);
    drawGround();
    for (const o of obstacles) drawObstacle(o);
    drawDino();
    if (state === 'playing' || state === 'gameover') drawScore();
    if (state === 'gameover') drawGameOver();
    if (state === 'waiting') drawWaiting();
  }

  // ---------- loop (paused off-screen via IntersectionObserver) ----------
  let rafId = null;
  let isVisible = false;
  function gameLoop(ts) {
    if (!isVisible) { rafId = null; return; }
    const dt = lastTs ? Math.min(50, ts - lastTs) : 16.7;   // clamp: no teleports after tab switches
    lastTs = ts;
    update(dt);
    render();
    rafId = requestAnimationFrame(gameLoop);
  }
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible && !rafId) rafId = requestAnimationFrame(gameLoop);
      else if (!isVisible && rafId) { cancelAnimationFrame(rafId); rafId = null; }
    }, { threshold: 0.01 });
    io.observe(canvas);
  } else {
    isVisible = true;
    rafId = requestAnimationFrame(gameLoop);
  }

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvas, 200);
  });
  window.addEventListener('orientationchange', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvas, 250);
  });
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
    { img: 'images-for-landing-page/case-studies/case-chess.webp',
      title: 'Global Chess League S4',
      sub: 'Multi-camera live broadcast · 9-day event' },
    { img: 'images-for-landing-page/case-studies/case-kick.webp',
      title: 'Kick India — Day One Migration',
      sub: '48 creators migrated · 95/5 subscription split' },
    { img: 'images-for-landing-page/case-studies/case-iqoo.webp',
      title: 'iQOO Flagship Smartphone Launch',
      sub: '50M+ reach · Product launch campaign' },
    { img: 'images-for-landing-page/case-studies/case-monster.webp',
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

  // Default state: Global Chess League S4 (first case study) highlighted and displayed
  const defaultIdx = 0;
  showCase(defaultIdx);
  if (caseItems[defaultIdx]) {
    caseItems[defaultIdx].classList.add('is-active');
  }

  function resetToDefault() {
    caseItems.forEach((i, idx) => {
      if (idx === defaultIdx) i.classList.add('is-active');
      else i.classList.remove('is-active');
    });
    showCase(defaultIdx);
  }

  caseItems.forEach(item => {
    const idx = parseInt(item.dataset.case, 10);
    // Hover (desktop)
    item.addEventListener('mouseenter', () => {
      caseItems.forEach(i => i.classList.remove('is-active'));
      item.classList.add('is-active');
      showCase(idx);
    });
    item.addEventListener('mouseleave', () => {
      // Handled by container mouseleave to keep smooth active state
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

  // Reset to default Global Chess League S4 when mouse leaves the list or foreground
  const caseList = document.getElementById('caseList');
  if (caseList) {
    caseList.addEventListener('mouseleave', () => {
      resetToDefault();
    });
  }
  const caseForeground = document.querySelector('.case-studies-foreground');
  if (caseForeground) {
    caseForeground.addEventListener('mouseleave', () => {
      resetToDefault();
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
      img: 'images-for-landing-page/creator-mortal.webp',
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
      img: 'images-for-landing-page/creator-payal.webp',
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
      img: 'images-for-landing-page/creator-snax.webp',
      bio: 'Veteran BGMI athlete and streamer famous for his precision DP-28 burst guide drills, competitive mechanics, and fitness-oriented lifestyle content.',
      categories: 'BGMI, Esports, Gaming Tutorials, Fitness / Vlogging',
      youtube: { handle: '@SnaxGaming', count: '1.65M', url: 'https://www.youtube.com/@SnaxGaming' },
      instagram: { handle: '@snaxgaming', count: '1.4M', url: 'https://www.instagram.com/snaxgaming' },
      kick: { handle: 'snaxgaming', count: '17.6K', url: 'https://kick.com/snaxgaming' }
    },
    {
      id: 'jokerkihaveli',
      name: 'Jokerkihaveli',
      realName: 'Gulrez Khan',
      img: 'images-for-landing-page/joker.png',
      bio: 'Dynamic gaming creator and entertainer with a strong multi-platform footprint across YouTube, Instagram, and Kick, celebrated for high-energy streams, engaging gameplay, and dedicated community culture.',
      categories: 'Gaming, Entertainment, Variety Streaming',
      youtube: { handle: '@jokerkihavelii', count: '2.33M', url: 'https://www.youtube.com/@jokerkihavelii' },
      instagram: { handle: '@jokerkihaveli', count: '1.9M', url: 'https://www.instagram.com/jokerkihaveli/' },
      kick: { handle: 'jokerkihaveli', count: '8.9K', url: 'https://kick.com/jokerkihaveli' }
    },
    {
      id: 'soulgoblin',
      name: 'Soul Goblin',
      realName: 'Harsh Paudwal',
      img: 'images-for-landing-page/creator-goblin.webp',
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
      img: 'images-for-landing-page/creator-mamba.webp',
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
      img: 'images-for-landing-page/creator-viper.webp',
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
      img: 'images-for-landing-page/creator-pahadi.webp',
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
      img: 'images-for-landing-page/creator-thug.webp',
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
      img: 'images-for-landing-page/creator-goldy.webp',
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
      img: 'images-for-landing-page/creator-mercy.webp',
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
      img: 'images-for-landing-page/creator-regaltos.webp',
      bio: 'Former Team Soul competitive assaulter and core S8UL creator, widely followed for his classic BGMI sprays, room matches, and game walk-throughs.',
      categories: 'BGMI, Esports, Variety Gaming, Streaming',
      youtube: { handle: '@SoulRegaltos', count: '2.32M', url: 'https://www.youtube.com/@SoulRegaltos' },
      instagram: { handle: '@soul_regaltos', count: '1.9M', url: 'https://www.instagram.com/soul_regaltos' },
      kick: { handle: 'regaltos', count: '53.8K', url: 'https://kick.com/regaltos' }
    },
    {
      id: 'jonty',
      name: 'Jonty',
      realName: 'Ajay Kumar Banga',
      img: 'images-for-landing-page/creator-jonty.webp',
      bio: 'Accomplished Free Fire esports athlete and high-energy content creator with a massive multi-platform community across YouTube, Instagram, and Kick, celebrated for tactical gameplay and engaging variety streams.',
      categories: 'Free Fire, Variety Gaming, Streaming, Esports',
      youtube: { handle: '@JONTYGAMING', count: '2.64M', url: 'https://www.youtube.com/@JONTYGAMING/' },
      instagram: { handle: '@ab_jonty', count: '557K', url: 'https://www.instagram.com/ab_jonty/' },
      kick: { handle: 'jontygamings8ul', count: '5.5K', url: 'https://kick.com/jontygamings8ul' }
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



// ====== IDLE PRELOAD FOR CASE STUDIES & KEY CREATOR IMAGES ======
(function() {
  const preloadImages = [
    'images-for-landing-page/case-studies/case-chess.webp',
    'images-for-landing-page/case-studies/case-kick.webp',
    'images-for-landing-page/case-studies/case-iqoo.webp',
    'images-for-landing-page/case-studies/case-monster.webp',
    'images-for-landing-page/creator-mortal.webp',
    'images-for-landing-page/creator-payal.webp',
    'images-for-landing-page/creator-snax.webp',
    'images-for-landing-page/creator-scout.webp',
    'images-for-landing-page/creator-goblin.webp'
  ];
  function doPreload() {
    preloadImages.forEach(function(src) {
      const img = new Image();
      img.src = src;
    });
  }
  if ('requestIdleCallback' in window) {
    requestIdleCallback(doPreload, { timeout: 2000 });
  } else {
    setTimeout(doPreload, 800);
  }
})();


// ====== SECTION ENTRANCES (Esports & Work Case Studies) ======
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  // Esports Section entrance
  gsap.from('.esports-section__text-col, .esports-section__image-col', {
    y: 24,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#esports',
      start: 'top 80%',
      once: true
    }
  });

  // Case Studies rows staggered reveal
  gsap.from('.case-item', {
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#work',
      start: 'top 80%',
      once: true
    }
  });
}
