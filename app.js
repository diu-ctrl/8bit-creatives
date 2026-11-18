/**
 * 8Bit Creatives - app.js
 * Fresh build v2 per AGENTS.md v2 + GSAP hero animations.
 * No legacy imports. No external dependencies.
 */

// Register GSAP ScrollTrigger & ScrollSmoother if loaded
if (typeof gsap !== 'undefined') {
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
  if (typeof ScrollSmoother !== 'undefined') gsap.registerPlugin(ScrollSmoother);
}

function initScrollSmoother() {
  const wrapper = document.getElementById('smooth-wrapper');
  const content = document.getElementById('smooth-content');
  if (!wrapper || !content) return null;

  // Defensive fallback: ensure wrapper is never frozen
  const makeResilient = () => {
    wrapper.style.position = 'relative';
    wrapper.style.height = 'auto';
    wrapper.style.overflow = 'visible';
  };

  if (typeof gsap === 'undefined' || typeof ScrollSmoother === 'undefined') {
    makeResilient();
    return null;
  }

  // Accessibility & Mobile Check: Only enable on desktop without reduced-motion preference
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobileViewport = window.innerWidth <= 767;

  if (prefersReducedMotion || isMobileViewport) {
    makeResilient();
    return null;
  }

  try {
    const smoother = ScrollSmoother.create({
      wrapper: wrapper,
      content: content,
      smooth: 1.2,         // Buttery 1.2s catch-up duration (approved sweet spot)
      effects: true,       // Parse data-speed & data-lag
      smoothTouch: 0,      // Native touch on mobile
      normalizeScroll: false
    });

    window.__smoother = smoother;

    // Restore scroll position after ScrollSmoother creates fixed wrapper
    let restoredSec = window.__restoredSection;
    if (!restoredSec) {
      try {
        restoredSec = sessionStorage.getItem('8bit_last_section') || sessionStorage.getItem('8bit_nav_target') || '';
      } catch (e) {}
    }
    if (restoredSec && restoredSec !== 'home') {
      const restoreScrollSmoother = () => {
        let targetY = null;
        if (typeof window.getSectionScrollY === 'function') {
          targetY = window.getSectionScrollY(restoredSec);
        } else {
          const el = document.getElementById(restoredSec);
          if (el) targetY = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY));
        }
        if (targetY !== null && typeof smoother.scrollTo === 'function') {
          smoother.scrollTo(targetY, false);
        }
      };
      restoreScrollSmoother();
      requestAnimationFrame(restoreScrollSmoother);
      setTimeout(restoreScrollSmoother, 100);
      setTimeout(restoreScrollSmoother, 300);
    }

    return smoother;
  } catch (err) {
    console.warn('ScrollSmoother init fallback:', err);
    makeResilient();
    return null;
  }
}

/* ==========================================================================
   SITE PRELOADER (DELEGATED TO REAL ASSET & IMAGE LOADER IN PRELOADER.JS)
   ========================================================================== */
function initSitePreloader() {
  if (typeof window.initSitePreloader === 'function' && window.initSitePreloader !== initSitePreloader) {
    window.initSitePreloader();
  }
}

function bootstrapApp() {
  if (window.__appInitialized) return;
  window.__appInitialized = true;
  initSitePreloader();
  window.__smoother = initScrollSmoother();
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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApp);
} else {
  bootstrapApp();
}

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
  if (!logo) console.warn('Logo element not found - selector wrong');
  if (!cta)  console.warn('CTA button not found - selector wrong');

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

  // Initial state - visible
  show();

  // Observe hero - if hero is at least 5% visible, show. Otherwise hide.
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
  // Without this observer, they run forever - even when off-screen -
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
        rootMargin: '50px 0px'  // small buffer - pause slightly after the section leaves the viewport
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
      const dataSec = link.getAttribute('data-section') || '';
      const href = link.getAttribute('href') || '';
      let id = dataSec;
      if (!id && href.indexOf('#') !== -1) {
        id = href.split('#')[1];
      }
      if (id === 'hero') id = 'home';
      if (id) {
        linkMap.set(id, link);
        if (id === 'home') linkMap.set('hero', link);
      }
    });

    const targetSections = Array.from(document.querySelectorAll('section[id]')).filter(s => linkMap.has(s.id) || s.id === 'hero' || s.id === 'home');
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
      let esportsVisualTop = null;
      const esportsCard = document.querySelector('.esports-section__card');
      if (esportsCard) {
        esportsVisualTop = Math.round(esportsCard.getBoundingClientRect().top + window.scrollY - 120);
      }

      targetSections.forEach(sec => {
        let top = sec.offsetTop;
        let bottom = sec.offsetTop + sec.offsetHeight;

        if (sec.id === 'esports') {
          if (esportsVisualTop !== null) {
            top = esportsVisualTop;
          }
        } else if (sec.id === 'services') {
          const band = sec.querySelector('.services-title-band') || sec.querySelector('.services-container');
          if (band) {
            top = Math.round(band.getBoundingClientRect().top + window.scrollY - 120);
          }
          if (esportsVisualTop !== null && esportsVisualTop > top) {
            bottom = esportsVisualTop;
          }
        }
        cachedActiveOffsets.push({
          id: sec.id,
          top: top,
          bottom: bottom
        });
      });
    }
    updateActiveOffsets();

    function checkActiveSection() {
      if (window.__isSmoothScrolling) return;
      const scrollPos = window.scrollY + 140;
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
      if (window.__isSmoothScrolling) return;
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
  const section = document.getElementById('creators');
  if (!section) return null;
  const secAbsoluteTop = section.getBoundingClientRect().top + window.scrollY;
  return Math.max(0, Math.round(secAbsoluteTop));
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
  if (window.__smoother && smooth && typeof window.__smoother.scrollTo === 'function') {
    window.__smoother.scrollTo(targetY, true);
  } else {
    window.scrollTo({
      top: targetY,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }
  if (window.history && window.history.pushState) {
    window.history.pushState(null, null, '#esports');
  }
}

function scrollToCreators(smooth = true) {
  const targetY = getCreatorsTargetScrollY();
  if (targetY === null) return;
  if (window.__smoother && smooth && typeof window.__smoother.scrollTo === 'function') {
    window.__smoother.scrollTo(targetY, true);
  } else {
    window.scrollTo({
      top: targetY,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }
  if (window.history && window.history.pushState) {
    window.history.pushState(null, null, '#creators');
  }
}

function scrollToWork(smooth = true) {
  const targetY = getWorkTargetScrollY();
  if (targetY === null) return;
  if (window.__smoother && smooth && typeof window.__smoother.scrollTo === 'function') {
    window.__smoother.scrollTo(targetY, true);
  } else {
    window.scrollTo({
      top: targetY,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }
  if (window.history && window.history.pushState) {
    window.history.pushState(null, null, '#work');
  }
}

function scrollToServices(smooth = true) {
  const targetY = getServicesTargetScrollY();
  if (targetY === null) return;
  if (window.__smoother && smooth && typeof window.__smoother.scrollTo === 'function') {
    window.__smoother.scrollTo(targetY, true);
  } else {
    window.scrollTo({
      top: targetY,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }
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

  // Handle direct page loads or external navigation to index.html#[section] or refresh restoration
  const currentHash = (window.location.hash || '').replace('#', '');
  let activeSecId = currentHash || window.__restoredSection;
  if (!activeSecId) {
    try {
      activeSecId = sessionStorage.getItem('8bit_last_section') || sessionStorage.getItem('8bit_nav_target') || '';
    } catch (e) {}
  }
  const activeSec = sections.find(s => s.id === activeSecId);
  if (activeSec && activeSecId !== 'home') {
    const handleHashJump = () => {
      const targetY = typeof window.getSectionScrollY === 'function' ? window.getSectionScrollY(activeSec.id) : activeSec.getScrollY();
      if (targetY !== null) {
        if (window.__smoother && typeof window.__smoother.scrollTo === 'function') {
          window.__smoother.scrollTo(targetY, false);
        } else {
          window.scrollTo({ top: targetY, behavior: 'instant' });
        }
      }
    };
    requestAnimationFrame(handleHashJump);
    setTimeout(handleHashJump, 50);
    setTimeout(handleHashJump, 250);
    setTimeout(handleHashJump, 600);
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
          toggleActions: 'play none none none',
          once: true
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

    // 4. Stat numbers count-up & labels entrance (runs strictly ONCE)
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
      function triggerStatsAnimation() {
        if (statsSection.dataset.counted === 'true') return;
        statsSection.dataset.counted = 'true';

        const statEls = statsSection.querySelectorAll('.stat-num');
        statEls.forEach(el => {
          const target = parseFloat(el.getAttribute('data-count-target')) || parseInt(el.textContent.replace(/[^0-9]/g, '')) || 0;
          const suffix = el.getAttribute('data-count-suffix') !== null ? el.getAttribute('data-count-suffix') : (el.textContent.replace(/[0-9]/g, '') || '');
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.round(obj.val) + suffix;
            },
            onComplete: () => {
              el.textContent = target + suffix;
            }
          });
        });

        gsap.fromTo('.about-stats .stat-label, .about-stats .stat-desc, .about-stats .stat-divider',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out' }
        );
      }

      window.__triggerStatsAnimation = triggerStatsAnimation;

      // Trigger the moment any part of the stats strip enters the viewport from the bottom
      ScrollTrigger.create({
        trigger: statsSection,
        start: 'top bottom',
        once: true,
        onEnter: triggerStatsAnimation
      });

      // Also trigger if the stats strip is visible via IntersectionObserver (works on refresh & instant navigation)
      if ('IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && statsSection.dataset.counted !== 'true') {
              triggerStatsAnimation();
              statsObserver.disconnect();
            }
          });
        }, { rootMargin: '0px 0px 50px 0px', threshold: 0.01 });
        statsObserver.observe(statsSection);
      }

      // Immediate check if already visible on load or refresh
      function checkStatsVisibility() {
        if (statsSection.dataset.counted === 'true') return;
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          triggerStatsAnimation();
        }
      }

      checkStatsVisibility();
      window.addEventListener('load', checkStatsVisibility, { passive: true });
      window.addEventListener('scroll', checkStatsVisibility, { passive: true });
    }
  }

  // 6. Marquee pause on hover
  const marquee = document.querySelector('.marquee-track');
  if (marquee) {
    marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
    marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
  }
}

/* ==========================================================================
   ABOUT: SHORT STATIC GRASS ON ECLIPSE PERIMETER (1.5X DENSITY: 360 BLADES)
   ========================================================================== */
function initEclipseGrass() {
  const grassGroup = document.getElementById('eclipse-grass-blades');
  if (!grassGroup) return;

  const CX = 400, CY = 400;            // center of the 800x800 viewBox
  const GRASS_RADIUS = 400;            // anchor exactly on circle edge
  const NUM_BLADES = 360;              // 1.5x density (increased from 240)
  const MIN_H = 12;                    // SHORT so characters remain fully visible
  const MAX_H = 22;
  const MIN_W = 2;
  const MAX_W = 4;

  let seed = 73;
  function rand() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  function randRange(min, max) { return min + rand() * (max - min); }

  function bladePath(anchorX, anchorY, h, w, outwardAngle) {
    // Compute base corners on circle edge, perpendicular to outward direction
    const perpX = -Math.sin(outwardAngle);
    const perpY = Math.cos(outwardAngle);
    const halfW = w / 2;
    const baseLX = anchorX + perpX * halfW;
    const baseLY = anchorY + perpY * halfW;
    const baseRX = anchorX - perpX * halfW;
    const baseRY = anchorY - perpY * halfW;

    // Tip radially outward by height h
    const tipX = anchorX + Math.cos(outwardAngle) * h;
    const tipY = anchorY + Math.sin(outwardAngle) * h;

    // Bezier control points create an organic S-curve
    const bend = randRange(-4, 4);
    const ctrlPerpX = perpX * bend;
    const ctrlPerpY = perpY * bend;
    // Mid-point of blade at 50% height
    const midX = anchorX + Math.cos(outwardAngle) * (h * 0.5) + ctrlPerpX;
    const midY = anchorY + Math.sin(outwardAngle) * (h * 0.5) + ctrlPerpY;

    // Bezier path: left base to mid to tip to mid to right base
    return `M ${baseLX.toFixed(2)} ${baseLY.toFixed(2)} Q ${midX.toFixed(2)} ${midY.toFixed(2)} ${(tipX + perpX * 0.5).toFixed(2)} ${(tipY + perpY * 0.5).toFixed(2)} L ${tipX.toFixed(2)} ${tipY.toFixed(2)} Q ${midX.toFixed(2)} ${midY.toFixed(2)} ${baseRX.toFixed(2)} ${baseRY.toFixed(2)} Z`;
  }

  // Render static grass blades directly on the surface (no swaying, wiggling or moving)
  let bladesHtml = '';
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
    bladesHtml += `<path d="${d}" fill="${grad}" opacity="${opacity}"/>`;
  }

  grassGroup.innerHTML = bladesHtml;
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
  const SCALE = 0.58;
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
      <g transform="translate(0, 2)">
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
        </g>
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
      <g transform="translate(0, 1)">
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
        </g>
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
      <rect x="38" y="142" width="16" height="26" rx="4" fill="#1A1A1A"/>
      <rect x="66" y="142" width="16" height="26" rx="4" fill="#1A1A1A"/>
      <rect x="36" y="166" width="20" height="14" rx="2" fill="#0A0A0A"/>
      <rect x="64" y="166" width="20" height="14" rx="2" fill="#0A0A0A"/>
      <line x1="36" y1="169" x2="56" y2="169" stroke="#333" stroke-width="1"/>
      <line x1="64" y1="169" x2="84" y2="169" stroke="#333" stroke-width="1"/>
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
      <rect x="40" y="112" width="18" height="55" rx="4" fill="#2A3A4E"/>
      <rect x="62" y="112" width="18" height="55" rx="4" fill="#2A3A4E"/>
      <rect x="40" y="140" width="18" height="7" rx="2" fill="#1A2A3E"/>
      <rect x="62" y="140" width="18" height="7" rx="2" fill="#1A2A3E"/>
      <!-- Slightly wider boots (24px) for solid proportion -->
      <rect x="37" y="164" width="24" height="16" rx="2" fill="#1A1A1A"/>
      <rect x="59" y="164" width="24" height="16" rx="2" fill="#1A1A1A"/>
      <line x1="37" y1="167" x2="61" y2="167" stroke="#333" stroke-width="1"/>
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
      <g transform="translate(0, 6)">
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
      <!-- Arms resting straight near to body normally -->
      <rect x="23" y="48" width="12" height="38" rx="3" fill="url(#efcJersey)"/>
      <rect x="23" y="78" width="12" height="6" rx="1" fill="#141210"/>
      <rect x="24" y="84" width="10" height="12" rx="3" fill="url(#efcSkin)"/>
      <rect x="85" y="48" width="12" height="38" rx="3" fill="url(#efcJersey)"/>
      <rect x="85" y="78" width="12" height="6" rx="1" fill="#141210"/>
      <rect x="86" y="84" width="10" height="12" rx="3" fill="url(#efcSkin)"/>
      <!-- Athletic Compression Shorts -->
      <rect x="36" y="98" width="48" height="22" rx="3" fill="url(#efcDark)"/>
      <line x1="60" y1="98" x2="60" y2="120" stroke="#000" stroke-width="1.5"/>
      <rect x="36" y="116" width="48" height="4" fill="#FF5931"/>
      <!-- Symmetrical normal straight legs -->
      <!-- Left leg -->
      <rect x="41" y="120" width="14" height="42" rx="3" fill="url(#efcSkin)"/>
      <rect x="40" y="146" width="16" height="16" rx="2" fill="#FFFFFF"/>
      <rect x="39" y="162" width="18" height="12" rx="2" fill="#141210"/>
      <rect x="39" y="172" width="18" height="2" fill="#FF5931"/>
      <!-- Right leg straight and normal -->
      <rect x="65" y="120" width="14" height="42" rx="3" fill="url(#efcSkin)"/>
      <rect x="64" y="146" width="16" height="16" rx="2" fill="#FFFFFF"/>
      <rect x="63" y="162" width="18" height="12" rx="2" fill="#141210"/>
      <rect x="63" y="172" width="18" height="2" fill="#FF5931"/>
      <!-- Pro Match Ball placed near right boot in connection -->
      <g transform="translate(91, 166)">
        <circle cx="0" cy="0" r="9.5" fill="#FFFFFF" stroke="#141210" stroke-width="1.5"/>
        <polygon points="0,-3.5 3,-1.2 1.8,2.8 -1.8,2.8 -3,-1.2" fill="#FF5931"/>
        <line x1="0" y1="-3.5" x2="0" y2="-8" stroke="#141210" stroke-width="1"/>
        <line x1="3" y1="-1.2" x2="7.5" y2="-3.5" stroke="#141210" stroke-width="1"/>
        <line x1="1.8" y1="2.8" x2="5.5" y2="7.5" stroke="#141210" stroke-width="1"/>
        <line x1="-1.8" y1="2.8" x2="-5.5" y2="7.5" stroke="#141210" stroke-width="1"/>
        <line x1="-3" y1="-1.2" x2="-7.5" y2="-3.5" stroke="#141210" stroke-width="1"/>
      </g>
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
      <g transform="translate(0, 4)">
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
        </g>
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
      <g transform="translate(0, 7)">
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
        </g>
</g>`,
  // Character 9
  `<g>
<defs>
        <linearGradient id="pikaBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFDE43"/><stop offset="100%" stop-color="#FFA800"/>
        </linearGradient>
        <linearGradient id="pikaBelly" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFF2A3"/><stop offset="100%" stop-color="#FFD659"/>
        </linearGradient>
      </defs>
      <g transform="translate(0, 19)">
      <!-- Iconic Pointed Ears with Black Tips -->
      <path d="M34 46 L14 10 L28 8 L44 38 Z" fill="url(#pikaBody)"/>
      <polygon points="14,10 28,8 24,20 18,22" fill="#141210"/>
      <path d="M86 46 L106 10 L92 8 L76 38 Z" fill="url(#pikaBody)"/>
      <polygon points="106,10 92,8 96,20 102,22" fill="#141210"/>
      <!-- Brown Tail Connection Patch -->
      <path d="M86 124 L94 116 L98 122 L90 130 Z" fill="#8B5A2B"/>
      <!-- Zigzag Lightning Tail with electric energy core -->
      <path d="M92 122 L106 102 L98 98 L110 76 L102 72 L114 46 L106 42 L118 16"
            stroke="#141210" stroke-width="8" fill="none" stroke-linejoin="miter" stroke-linecap="square"/>
      <path d="M92 122 L106 102 L98 98 L110 76 L102 72 L114 46 L106 42 L118 16"
            stroke="url(#pikaBody)" stroke-width="6" fill="none" stroke-linejoin="miter" stroke-linecap="square"/>
      <path d="M92 122 L106 102 L98 98 L110 76 L102 72 L114 46 L106 42 L118 16"
            stroke="#FFF587" stroke-width="2" fill="none" stroke-linejoin="miter"/>
      <!-- Authentic Pokemon Pear-shaped Body (no boxy armor) -->
      <ellipse cx="60" cy="116" rx="34" ry="38" fill="url(#pikaBody)"/>
      <ellipse cx="60" cy="122" rx="22" ry="26" fill="url(#pikaBelly)" opacity="0.6"/>
      <!-- Classic Brown Back Stripes -->
      <path d="M40 92 Q60 97 80 92" stroke="#8B5A2B" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <path d="M42 106 Q60 111 78 106" stroke="#8B5A2B" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <!-- Electric Energy Sign on Chest -->
      <polygon points="60,88 65,97 61,97 64,107 55,98 59,98" fill="#00E5FF"/>
      <polygon points="60,89 64,96 61,96 63,105 56,98 59,98" fill="#FFFFFF"/>
      <!-- Radiant Electric Sparks -->
      <polygon points="18,74 22,79 20,79 23,86 16,80 19,80" fill="#FFDE43"/>
      <polygon points="102,74 106,79 104,79 107,86 100,80 103,80" fill="#FFDE43"/>
      <!-- Little Yellow Paws resting naturally -->
      <ellipse cx="32" cy="106" rx="8" ry="14" fill="url(#pikaBody)" transform="rotate(-15, 32, 106)"/>
      <ellipse cx="88" cy="106" rx="8" ry="14" fill="url(#pikaBody)" transform="rotate(15, 88, 106)"/>
      <circle cx="28" cy="117" r="3" fill="#FFA800"/>
      <circle cx="92" cy="117" r="3" fill="#FFA800"/>
      <!-- Cute Rounded Feet with toe pads -->
      <ellipse cx="44" cy="154" rx="12" ry="7" fill="url(#pikaBody)"/>
      <ellipse cx="76" cy="154" rx="12" ry="7" fill="url(#pikaBody)"/>
      <line x1="40" y1="156" x2="40" y2="160" stroke="#8B5A2B" stroke-width="1.2"/>
      <line x1="44" y1="156" x2="44" y2="161" stroke="#8B5A2B" stroke-width="1.2"/>
      <line x1="48" y1="156" x2="48" y2="160" stroke="#8B5A2B" stroke-width="1.2"/>
      <line x1="72" y1="156" x2="72" y2="160" stroke="#8B5A2B" stroke-width="1.2"/>
      <line x1="76" y1="156" x2="76" y2="161" stroke="#8B5A2B" stroke-width="1.2"/>
      <line x1="80" y1="156" x2="80" y2="160" stroke="#8B5A2B" stroke-width="1.2"/>
      <!-- Cute Pokemon Head -->
      <ellipse cx="60" cy="54" rx="28" ry="24" fill="url(#pikaBody)"/>
      <ellipse cx="60" cy="62" rx="20" ry="14" fill="url(#pikaBelly)" opacity="0.4"/>
      <!-- Large Shiny Pokemon Eyes -->
      <circle cx="47" cy="52" r="5.5" fill="#141210"/>
      <circle cx="48.5" cy="50.5" r="2.2" fill="#FFFFFF"/>
      <circle cx="73" cy="52" r="5.5" fill="#141210"/>
      <circle cx="74.5" cy="50.5" r="2.2" fill="#FFFFFF"/>
      <!-- Iconic Round Red Electric Cheek Pouches -->
      <circle cx="37" cy="62" r="6" fill="#FF2A2A"/>
      <circle cx="83" cy="62" r="6" fill="#FF2A2A"/>
      <circle cx="36" cy="61" r="2" fill="#FFA3A3" opacity="0.6"/>
      <circle cx="82" cy="61" r="2" fill="#FFA3A3" opacity="0.6"/>
      <!-- Cute Nose & Mouth -->
      <circle cx="60" cy="57" r="1.3" fill="#141210"/>
      <path d="M54 62 Q57 65 60 62 Q63 65 66 62" stroke="#141210" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        </g>
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
      <g transform="translate(0, 6)">
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
        </g>
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
      <g transform="translate(0, 3)">
      <!-- Flowing cascading hair framing shoulders -->
      <path d="M38 10 Q31 40 32 96 L42 96 Q40 46 45 16 Z" fill="url(#valHair)"/>
      <path d="M82 10 Q89 40 88 96 L78 96 Q80 46 75 16 Z" fill="url(#valHair)"/>
      <!-- Sleek feminine head & tapered jawline -->
      <path d="M47 12 L73 12 L74 25 L68 35 L60 38 L52 35 L46 25 Z" fill="url(#valSkin)"/>
      <path d="M42 6 Q60 2 78 6 L80 14 L72 16 L68 12 L60 14 L52 12 L48 16 L40 14 Z" fill="#201C2B"/>
      <!-- Slender graceful neck -->
      <rect x="56" y="36" width="8" height="8" fill="url(#valSkin)"/>
      <!-- Fierce feminine almond eyes with winged liner -->
      <path d="M49 20 L56 19 L57 23 L50 23 Z" fill="#141210"/>
      <path d="M71 20 L64 19 L63 23 L70 23 Z" fill="#141210"/>
      <ellipse cx="53.5" cy="22" rx="2.5" ry="1.8" fill="#FF00FF"/>
      <ellipse cx="66.5" cy="22" rx="2.5" ry="1.8" fill="#FF00FF"/>
      <circle cx="53.5" cy="22" r="0.9" fill="#FFFFFF"/>
      <circle cx="66.5" cy="22" r="0.9" fill="#FFFFFF"/>
      <!-- Arched brows & feminine lips -->
      <path d="M49 17 Q53 15 57 17" stroke="#1A1A22" stroke-width="1.2" fill="none"/>
      <path d="M71 17 Q67 15 63 17" stroke="#1A1A22" stroke-width="1.2" fill="none"/>
      <path d="M57 32 Q60 30.5 63 32 Q60 34 57 32" fill="#B83A70"/>
      <!-- Gold jewelry earrings & choker -->
      <circle cx="44" cy="26" r="2.5" fill="none" stroke="#C5A059" stroke-width="1.2"/>
      <circle cx="76" cy="26" r="2.5" fill="none" stroke="#C5A059" stroke-width="1.2"/>
      <rect x="55" y="41" width="10" height="2" rx="0.5" fill="#C5A059"/>
      <polygon points="60,42 62,45 60,47 58,45" fill="#FF00FF"/>
      <!-- Hourglass Bodysuit Torso (narrow waist, curved bust & hips) -->
      <path d="M42 42 L78 42 Q80 58 75 66 Q69 73 68 80 Q77 88 77 98 L43 98 Q43 88 52 80 Q51 73 45 66 Q40 58 42 42 Z" fill="url(#valSuit)"/>
      <!-- V-neck décolletage -->
      <polygon points="54,42 66,42 60,52" fill="url(#valSkin)"/>
      <!-- Glowing chest soul core -->
      <ellipse cx="60" cy="58" rx="8" ry="7" fill="url(#valChest)"/>
      <circle cx="60" cy="58" r="3.5" fill="#9B30FF" opacity="0.9"/>
      <circle cx="60" cy="58" r="1.5" fill="#FFFFFF"/>
      <!-- Cinched Gold Corset Belt at waist -->
      <path d="M51 77 L69 77 L71 85 L49 85 Z" fill="#C5A059"/>
      <polygon points="56,77 64,77 66,85 60,89 54,85" fill="#8C185C"/>
      <circle cx="60" cy="83" r="2" fill="#FF00FF"/>
      <!-- Hands resting straight normally along body -->
      <!-- Left arm & hand straight -->
      <rect x="29" y="42" width="10" height="46" rx="4" fill="url(#valSuit)"/>
      <rect x="28" y="86" width="12" height="3" rx="1" fill="#C5A059"/>
      <rect x="30" y="90" width="8" height="10" rx="3" fill="url(#valSkin)"/>
      <!-- Right arm & hand straight -->
      <rect x="81" y="42" width="10" height="46" rx="4" fill="url(#valSuit)"/>
      <rect x="80" y="86" width="12" height="3" rx="1" fill="#C5A059"/>
      <rect x="82" y="90" width="8" height="10" rx="3" fill="url(#valSkin)"/>
      <!-- Subtle soul glow around hands -->
      <circle cx="34" cy="98" r="2" fill="#FF00FF" opacity="0.75" filter="url(#reynaGlow)"/>
      <circle cx="86" cy="98" r="2" fill="#FF00FF" opacity="0.75" filter="url(#reynaGlow)"/>
      <!-- Feminine curved pelvis & thighs -->
      <path d="M43 98 L77 98 L70 114 L50 114 Z" fill="url(#valSuit)"/>
      <!-- Slender thighs with skin accents -->
      <path d="M43 104 L55 104 L54 122 L42 122 Z" fill="url(#valSkin)"/>
      <path d="M65 104 L77 104 L78 122 L66 122 Z" fill="url(#valSkin)"/>
      <rect x="42" y="122" width="12" height="2.5" rx="0.5" fill="#C5A059"/>
      <rect x="66" y="122" width="12" height="2.5" rx="0.5" fill="#C5A059"/>
      <!-- Form-fitting thigh-high boots with gold vertical accents -->
      <rect x="42" y="125" width="12" height="38" rx="2" fill="url(#valSuit)"/>
      <rect x="66" y="125" width="12" height="38" rx="2" fill="url(#valSuit)"/>
      <line x1="48" y1="126" x2="48" y2="158" stroke="#C5A059" stroke-width="1.2"/>
      <line x1="72" y1="126" x2="72" y2="158" stroke="#C5A059" stroke-width="1.2"/>
      <!-- Stylish heeled boots -->
      <rect x="40" y="163" width="15" height="14" rx="2" fill="#C5A059"/>
      <rect x="65" y="163" width="15" height="14" rx="2" fill="#C5A059"/>
      <rect x="40" y="174" width="15" height="3" fill="#141210"/>
      <rect x="65" y="174" width="15" height="3" fill="#141210"/>
        </g>
</g>`,
  // Character 12
  `<g>
<defs>
        <linearGradient id="mcHead" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#C4A484"/><stop offset="100%" stop-color="#B89868"/>
        </linearGradient>
      </defs>
      <g transform="translate(0, 26)">
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
      <!-- BLOCKY TORSO (44px wide - teal/cyan shirt) -->
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
        </g>
</g>`
];


  // Store character SVGs globally for physics cloning
  window.eclipseCharacterSVGs = characters;

  // Generate 12 unique positions (no repeats)
  let svgString = '';
  for (let i = 0; i < NUM_POSITIONS; i++) {
    const charIndex = i;               // 0 to 11 - each character used ONCE
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

  const section = document.getElementById('about');
  if (!section) return;

  const charactersSvg = document.getElementById('eclipse-characters-svg');
  const eclipseEl = section.querySelector('.eclipse');
  const btnAbout = section.querySelector('.btn-about');

  // Physics constants (calibrated so character feet land flush on floor with zero gap)
  const GRAVITY = 0.8;
  const BOUNCE = 0.4;
  const GROUND_FRICTION = 0.85;
  const CHAR_W = 70;
  const CHAR_H = 105;

  // Collision hitbox calibrated to 70x105 container (feet at exact bottom edge y=105)
  const HIT_OX = 10;
  const HIT_OY = 0;
  const HIT_W = 50;
  const HIT_H = 105;

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

  // AABB collision resolution - push character out of the solid obstacle along shallowest penetration edge
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

    // The red globe is an 800px circle (radius = 400px) centered at the top-center of the section.
    // We NEVER compute radius from eclipseEl.getBoundingClientRect() because eclipseEl rotates,
    // which causes its axis-aligned bounding box to oscillate between 800px and 1131px (566px radius),
    // creating a massive 166px invisible phantom wall!
    // Instead, anchor precisely to the non-rotating wrapper and true visual circle geometry:
    const wrapEl = section.querySelector('.eclipse-wrap') || section.querySelector('.about-eclipse__clip');
    let cx = secRect.width / 2;
    let cy = 0;
    if (wrapEl) {
      const wrapRect = wrapEl.getBoundingClientRect();
      cx = (wrapRect.left + wrapRect.right) / 2 - secRect.left;
      cy = wrapRect.top - secRect.top;
    }

    const isTablet = window.innerWidth <= 768;
    // Exactly matches the red circle perimeter (660px diameter -> R=330px; hanging characters R_FEET=328px)
    const radius = isTablet ? 260 : 328;
    globe = { cx, cy, radius };

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
      // Left edge touches 0, right edge touches secW, top touches 0, feet touch floor line (border)
      const floorY = secH - 1;
      boxX = Math.max(0, Math.min(boxX, secW - HIT_W));
      boxY = Math.max(0, Math.min(boxY, floorY - HIT_H));
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
    charDiv.innerHTML = `<svg viewBox="0 0 120 180" preserveAspectRatio="xMidYMax meet">${svgContent}</svg>`;
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

        // Ground collision (feet touch floor line / border)
        const floorY = secH - 1;
        if (newY + HIT_OY + HIT_H >= floorY) {
          newY = floorY - HIT_H - HIT_OY;
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
      // Characters not generated yet - retry in 500ms (up to 10 times)
      if (!triggerAutoFall._retries) triggerAutoFall._retries = 0;
      triggerAutoFall._retries++;
      if (triggerAutoFall._retries <= 10) {
        setTimeout(triggerAutoFall, 500);
      }
      return;
    }

    const body = detachCharacter(pickedCharG);
    if (!body) {
      // Detach failed - retry with a different character in 500ms (up to 5 times)
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
  if (typeof gsap === 'undefined') {
    document.documentElement.classList.remove('js-hero-anim');
    return;
  }

  // Safety fallback: ensure js-hero-anim is removed within 1.5s no matter what
  setTimeout(() => {
    document.documentElement.classList.remove('js-hero-anim');
  }, 1500);

  // Accessibility Check: Skip animation if user prefers reduced motion
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.documentElement.classList.remove('js-hero-anim');
    gsap.set(['.navbar-pill', '.nav-brand-topleft', '.hero-title .line', '.hero-monument__sub-line', '.hero-sub', '.hero-cta-group a'], {
      opacity: 1,
      y: 0,
      clearProps: 'transform,opacity'
    });
    return;
  }

  // If user loaded or restored into a lower section, reveal hero elements immediately
  const isScrolledPastHero = window.scrollY > 150 || (window.__restoredSection && window.__restoredSection !== 'home');
  if (isScrolledPastHero) {
    document.documentElement.classList.remove('js-hero-anim');
    gsap.set(['.navbar-pill', '.nav-brand-topleft', '.hero-title .line', '.hero-monument__sub-line', '.hero-sub', '.hero-cta-group a'], {
      opacity: 1,
      y: 0,
      clearProps: 'transform,opacity'
    });
    return;
  }

  // 1. Hero Reveal Sequence:
  // - Background stays from the start (no fade/scale, already fully rendered)
  // - 1. Navbar whole together
  // - 2. Title lines ("Built for India's", "Next Level.")
  // - 3. Subtitle lines ("8bit Creatives is India's leading creative agency...", "for gaming...")
  // - 4. Capsule buttons ("Start Campaign", "Explore Creators")
  // Snappy, energetic pacing
  const subLines = document.querySelectorAll('.hero-monument__sub-line').length ? '.hero-monument__sub-line' : '.hero-sub';
  const ctaButtons = document.querySelectorAll('.hero-cta-group .btn-hero-capsule').length ? '.hero-cta-group .btn-hero-capsule' : '.hero-cta-group a:not([style*="display:none"])';

  let heroEntranceRan = false;
  const runHeroAnimation = () => {
    if (heroEntranceRan) return;
    heroEntranceRan = true;

    const heroTl = gsap.timeline({
      delay: 0.05,
      onComplete: () => {
        document.documentElement.classList.remove('js-hero-anim');
        // Clear inline transform and opacity so native CSS hover states and alignment remain pure
        gsap.set(['.navbar-pill', '.nav-brand-topleft', '.hero-title .line', subLines, ctaButtons], {
          clearProps: 'opacity,transform'
        });
      }
    });

    heroTl
      // Step 1: Navbar whole together (slides down smoothly from top)
      .fromTo('.navbar-pill', 
        { y: -65, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }
      )
      .fromTo('.nav-brand-topleft',
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
        '<0.04'
      )
      // Step 2: Title lines
      .fromTo('.hero-title .line',
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.30, stagger: 0.06, ease: 'power3.out' },
        '-=0.12'
      )
      // Step 3: Subtitle lines
      .fromTo(subLines,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.26, stagger: 0.05, ease: 'power2.out' },
        '-=0.12'
      )
      // Step 4: Capsule buttons
      .fromTo(ctaButtons,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.24, stagger: 0.05, ease: 'power2.out' },
        '-=0.10'
      );
  };

  window.__triggerHeroEntrance = runHeroAnimation;

  const preloader = document.getElementById('preloaderMount');
  const isPreloaderActive = preloader && !preloader.classList.contains('is-hidden') && !preloader.classList.contains('is-unveiling');

  if (isPreloaderActive && !isScrolledPastHero) {
    gsap.set(['.navbar-pill', '.nav-brand-topleft', '.hero-title .line', subLines, ctaButtons], {
      opacity: 0
    });
    // Safety fallback: ensure hero entrance always triggers within 3.2s
    setTimeout(() => {
      if (!heroEntranceRan) runHeroAnimation();
    }, 3200);
  } else {
    runHeroAnimation();
  }

  // 2. Parallax background on scroll (Desktop only - prevents mobile scroll metric jump)
  if (typeof ScrollTrigger !== 'undefined') {
    const isMobile = window.innerWidth <= 768;
    const heroBgImg = document.querySelector('.hero-monument__bg-img') || document.querySelector('.hero-bg-wrap img');
    const heroSection = document.getElementById('home') || document.getElementById('hero');
    if (heroBgImg && heroSection && !isMobile) {
      gsap.to(heroBgImg, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

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

  // ---------- audio completely disabled ----------
  function beep() {
    /* No audio */
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
      ctx.fillText('SPACE / UP for jump  |  DOWN / C for crouch', cx, cssH * 0.30 + 30);
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
  }, { passive: true });
  window.addEventListener('orientationchange', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvas, 250);
  }, { passive: true });
}


/* ==========================================================================
   3. SCROLL REVEAL - IntersectionObserver on .reveal elements
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
   4. STATS COUNTER - fallback count-up on scroll-into-view (only if GSAP inactive)
   ========================================================================== */
function initStatsCounter() {
  const statsSection = document.querySelector('.about-stats');
  if (!statsSection || statsSection.dataset.counted === 'true') return;

  // When GSAP and ScrollTrigger are active, initAboutGSAP handles the count-up with ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    return;
  }

  const statEls = statsSection.querySelectorAll('.stat-num');
  if (!statEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && statsSection.dataset.counted !== 'true') {
        statsSection.dataset.counted = 'true';
        observer.disconnect();

        statEls.forEach(el => {
          const target = parseFloat(el.getAttribute('data-count-target')) || parseInt(el.textContent.replace(/[^0-9]/g, '')) || 0;
          const suffix = el.getAttribute('data-count-suffix') !== null ? el.getAttribute('data-count-suffix') : (el.textContent.replace(/[0-9]/g, '') || '');
          const duration = 1000;
          const start = performance.now();

          function step(now) {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
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

  observer.observe(statsSection);
}

/* ==========================================================================
   5. CASE STUDIES - hover list → swap image
   ========================================================================== */
function initCaseStudies() {
  const card = document.querySelector('.case-card') || document.querySelector('.case-studies-foreground');
  if (card && card.dataset.caseHoverBound === 'true') return;
  const caseItems = document.querySelectorAll('.case-item');
  const caseImageWrap = document.getElementById('caseImageWrap');
  const caseImage = document.getElementById('caseImage');
  const caseImageBg = document.getElementById('caseImageBg');
  const caseCaption = document.getElementById('caseCaption');
  const caseCaptionTitle = document.getElementById('caseCaptionTitle');
  const caseCaptionSub = document.getElementById('caseCaptionSub');
  if (!caseItems.length || !caseImageWrap) return;

  const CASE_DATA = [
    { img: 'images-for-landing-page/Case Studies/gemini.webp',
      title: 'Google Gemini: The Switch',
      sub: 'Kevin Pietersen x 8Bit · 45M+ views',
      link: 'work.html?open=0',
      fitThumb: true },
    { img: 'images-for-landing-page/Case Studies/meta-ai.webp',
      title: 'Meta AI: Play. Create. Discover.',
      sub: 'Payal Gaming x Meta AI · 12M+ impressions',
      link: 'work.html?open=1',
      fitThumb: true },
    { img: 'images-for-landing-page/Case Studies/thums-up.webp',
      title: 'Thums Up: Bring The Rush',
      sub: 'Snax Gaming signature campaign · 15M+ impressions',
      link: 'work.html?open=2',
      fitThumb: true },
    { img: 'images-for-landing-page/Case Studies/stranger-things.webp',
      title: 'Netflix: Stranger Things Premiere',
      sub: 'Live fan premiere hosted by Payal Gaming · 18M+ views',
      link: 'work.html?open=3',
      fitThumb: true }
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

    // Update foreground contain image and blurred ambient background
    caseImage.src = data.img;
    caseImage.alt = data.title;
    if (caseImageBg) {
      caseImageBg.src = data.img;
      caseImageBg.style.display = 'block';
    }

    // Apply fitted double-image ambient blur + contain for portrait/poster deals
    if (data.fitThumb !== false) {
      caseImageWrap.classList.add('is-fitted');
    } else {
      caseImageWrap.classList.remove('is-fitted');
    }

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
        if (caseImageBg) caseImageBg.src = '';
        caseCaptionTitle.textContent = '';
        caseCaptionSub.textContent = '';
        const p = caseImageWrap.querySelector('.case-placeholder');
        if (p) p.style.display = 'none';
      }
    }, 200);
  }

  // Default state: Google Gemini: The Switch (first case study) highlighted and displayed
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
    // Tap / Click behavior:
    // On mobile view (<768px), tapping only selects the field and previews the deal's thumbnail below.
    // User redirects to work.html when tapping 'Show All'.
    const handleCaseSelect = (e) => {
      const isMobile = window.innerWidth < 768 || window.matchMedia('(max-width: 767px)').matches;
      if (isMobile) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        caseItems.forEach(i => i.classList.remove('is-active'));
        item.classList.add('is-active');
        showCase(idx);
        return;
      }
      const link = item.querySelector('a');
      const href = link?.getAttribute('href') || (CASE_DATA[idx]?.link || 'work.html');
      window.location.href = href;
    };

    item.addEventListener('click', handleCaseSelect);

    const link = item.querySelector('a');
    if (link) {
      link.addEventListener('click', (e) => {
        const isMobile = window.innerWidth < 768 || window.matchMedia('(max-width: 767px)').matches;
        if (isMobile) {
          e.preventDefault();
          e.stopPropagation();
          caseItems.forEach(i => i.classList.remove('is-active'));
          item.classList.add('is-active');
          showCase(idx);
        }
      });
    }

    // Make the line a link for accessibility
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', CASE_DATA[idx]?.title || 'Case study');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleCaseSelect(e);
      }
    });
  });

  // Reset to default Google Gemini: The Switch when mouse leaves the list or foreground
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

  // Cards stagger in - all at the same level in a row (no y offset)
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
      // If clicking or tapping the CTA button itself, allow natural navigation
      if (e.target.closest('.service-btn')) {
        return;
      }
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

  // Ensure service buttons navigate cleanly without card click interception
  document.querySelectorAll('.service-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
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

  const contactEl = document.getElementById('contact') || document.getElementById('cta') || document.querySelector('.cta-section');
  if (!contactEl) return;

  // Headline fade-up
  gsap.from('.cta-headline, .cta-section__headline', {
    opacity: 0,
    y: 40,
    duration: 1.0,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: contactEl,
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });

  // Subtext fade-up (slight delay)
  gsap.from('.cta-subtext, .cta-section__subtext', {
    opacity: 0,
    y: 24,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: contactEl,
      start: 'top 80%',
      toggleActions: 'play none none none'
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
      trigger: contactEl,
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  });

  // Parallax: subtle background shift on scroll
  gsap.to('.cta-section', {
    backgroundPositionY: '30%',
    ease: 'none',
    scrollTrigger: {
      trigger: contactEl,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });
}

/* ==========================================================================
   7. FOOTER LOGO - perspective tilt on mouse move (smoothed)
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
   7. CREATOR STATS - tap turns orange, opens platform link
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

  // ── Creator data (dynamically loaded from scripts/creators-data.js & localStorage) ──
  const RAW_CREATORS = (window.get8BitCreators && window.get8BitCreators().length)
    ? window.get8BitCreators()
    : (window.INITIAL_CREATORS && window.INITIAL_CREATORS.length ? window.INITIAL_CREATORS : []);

  // Parse numerical reach for hierarchy sorting
  function parseNum(str) {
    if (!str) return 0;
    const s = str.toString().toUpperCase().replace(/[^0-9.KM]/g, '');
    if (s.includes('M')) return Math.round(parseFloat(s) * 1000000);
    if (s.includes('K')) return Math.round(parseFloat(s) * 1000);
    return Math.round(parseFloat(s)) || 0;
  }
  function getReachScore(c) {
    if (!c) return 0;
    const r = c.reach;
    if (r) {
      const s = r.toString().toUpperCase().replace(/[^0-9.KM]/g, '');
      let val = 0;
      if (s.includes('M')) val = parseFloat(s) * 1000000;
      else if (s.includes('K')) val = parseFloat(s) * 1000;
      else val = parseFloat(s) || 0;
      if (val > 0) return val;
    }
    return 0;
  }
  function getMaxPlatform(c) {
    const yt = parseNum(c.youtube && c.youtube.count);
    const ig = parseNum(c.instagram && c.instagram.count);
    const kick = parseNum(c.kick && c.kick.count);
    return Math.max(yt, ig, kick);
  }

  // Symmetrically distribute creators in a pyramid hierarchy:
  // Center (index 0) = MortaL (largest reach: 7M+)
  // Right (+1) = Payal (5.2M+), Left (-1) = Nishu Tiwari (5M+)
  // Right (+2) = Snax (3M+), Left (-2) = Jokerkihaveli (2.8M+)
  // Right (+3) = Regaltos (2.5M+), Left (-3) = Pahadi (1.7M+)
  // Descending outwards symmetrically to the smaller numbers on the outer sides
  const sortedCreators = [...RAW_CREATORS].sort((a, b) => {
    const rA = getReachScore(a);
    const rB = getReachScore(b);
    if (rB !== rA) return rB - rA;
    const pB = getMaxPlatform(b);
    const pA = getMaxPlatform(a);
    if (pB !== pA) return pB - pA;
    return a.name.localeCompare(b.name);
  });
  const n = sortedCreators.length;
  const pyramidCreators = new Array(n);
  
  if (n > 0) {
    pyramidCreators[0] = sortedCreators[0]; // Center
    let rStep = 1;
    let lStep = 1;
    for (let k = 1; k < n; k++) {
      if (k % 2 === 1) {
        pyramidCreators[rStep] = sortedCreators[k]; // Right
        rStep++;
      } else {
        pyramidCreators[n - lStep] = sortedCreators[k]; // Left
        lStep++;
      }
    }
  }

  const CREATORS = (n > 0 ? pyramidCreators : RAW_CREATORS).map(c => {
    const cid = c.id || c.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return {
      id: cid,
      name: c.name,
      realName: c.realName || c.alias || c.name,
      img: c.img,
      bio: c.bio || 'Official 8Bit Creatives content creator and talent partner.',
      categories: c.categories || c.categoryLabel || 'Gaming, Content Creation',
      youtube: c.youtube || (c.youtubeUrl ? { handle: c.youtubeHandle || c.name, count: c.youtubeCount || c.reach || 'Active', url: c.youtubeUrl } : null),
      instagram: c.instagram || (c.instagramUrl ? { handle: c.instagramHandle || c.name, count: c.instagramCount || 'Active', url: c.instagramUrl } : null),
      kick: c.kick || (c.kickUrl ? { handle: c.kickHandle || c.name, count: c.kickCount || 'Active', url: c.kickUrl } : null)
    };
  });

  const count = CREATORS.length;
  const ROTATE = 44;          // deg tilt of first neighbor
  const DEPTH = 0.6;          // recession fraction
  const FALLOFF = 0.56;       // ease-off exponent
  const FADE = 0.1;           // opacity lost per step
  const GAP = 0.05;           // space between cards as fraction of card width
  const LOOP = true;

  const cards = [];
  let pos = 0;                 // fractional card index at center (MortaL)
  let target = 0;              // where settle is headed
  let cardWidth = 0;
  let rafId = null;
  let selected = -1;
  let drag = null;
  let wasDragged = false;
  let dragStartX = 0;

  // ── Build cards ──
  stage.innerHTML = '';
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
    const ytUrl = (typeof c.youtube === 'object' && c.youtube && c.youtube.url) || c.youtubeUrl;
    if (ytUrl) card.setAttribute('data-yt', ytUrl);
    const igUrl = (typeof c.instagram === 'object' && c.instagram && c.instagram.url) || c.instagramUrl;
    if (igUrl) card.setAttribute('data-ig', igUrl);
    const kickUrl = (typeof c.kick === 'object' && c.kick && c.kick.url) || c.kickUrl;
    if (kickUrl) card.setAttribute('data-kc', kickUrl);
    const img = document.createElement('img');
    const coverflowCustomImgs = {
      aman: 'assets/creators/coverflow/aman.webp',
      sid: 'assets/creators/coverflow/sid.webp',
      juicy: 'assets/creators/coverflow/juicy.webp',
      sarang: 'assets/creators/coverflow/sarang.webp',
      mercy: 'assets/creators/coverflow/mercy.webp',
      mamba: 'assets/creators/coverflow/mamba.webp',
      nishu_tiwari: 'assets/creators/coverflow/nishu_tiwari.webp',
      mortal: 'assets/creators/coverflow/mortal.webp'
    };
    img.src = coverflowCustomImgs[c.id] || c.img;
    img.alt = `${c.name} (${c.realName}) · 8Bit Creatives`;
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

    // Direct click to navigate to any card
    card.addEventListener('click', (e) => {
      if (wasDragged) return;
      goTo(i);
    });

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
      // Active state: middle card in full color, all side cards in B&W
      const activeIdx = indexAt(pos);
      if (i === activeIdx) {
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
    
    function safeCount(val, fallback) {
      if (!val) return fallback || '';
      if (typeof val === 'object') {
        return val.count || val.subscribers || val.followers || fallback || '';
      }
      return String(val);
    }
    function safeUrl(val, fallback) {
      if (!val) return fallback || '';
      if (typeof val === 'object') {
        return val.url || fallback || '';
      }
      return String(val);
    }

    let statsHtml = '';
    const ytUrl = safeUrl(c.youtube) || c.youtubeUrl;
    const ytCount = safeCount(c.youtube) || c.youtubeCount || (ytUrl ? 'Active' : '');
    if (ytUrl && ytCount) {
      statsHtml += `<a class="stat-link" href="${ytUrl}" target="_blank" rel="noopener noreferrer" data-url="${ytUrl}">
         <span class="stat-label">YouTube</span>
         <span class="stat-count">${ytCount}</span>
       </a>`;
    }

    const igUrl = safeUrl(c.instagram) || c.instagramUrl;
    const igCount = safeCount(c.instagram) || c.instagramCount || (igUrl ? 'Active' : '');
    if (igUrl && igCount) {
      statsHtml += `<a class="stat-link" href="${igUrl}" target="_blank" rel="noopener noreferrer" data-url="${igUrl}">
         <span class="stat-label">Instagram</span>
         <span class="stat-count">${igCount}</span>
       </a>`;
    }

    const kickUrl = safeUrl(c.kick) || c.kickUrl;
    const kickCount = safeCount(c.kick) || c.kickCount || (kickUrl ? 'Active' : '');
    if (kickUrl && kickCount) {
      statsHtml += `<a class="stat-link" href="${kickUrl}" target="_blank" rel="noopener noreferrer" data-url="${kickUrl}">
         <span class="stat-label">Kick</span>
         <span class="stat-count">${kickCount}</span>
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
    wasDragged = false;
    dragStartX = e.clientX;
    drag = { id: e.pointerId, x: e.clientX, pos: pos, v: 0, t: performance.now() };
  });

  frame.addEventListener('pointermove', (e) => {
    if (window.innerWidth < 768 || window.matchMedia('(max-width: 767px)').matches) return;
    if (!drag || drag.id !== e.pointerId) return;
    const dist = Math.abs(e.clientX - dragStartX);
    if (dist > 8) wasDragged = true;
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
    setTimeout(() => { wasDragged = false; }, 80);
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
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.innerWidth >= 768) {
        nudge(-1);
        return;
      }
      const stride = cardStride || (frame.clientWidth * 0.75 + 16);
      frame.scrollBy({ left: -stride, behavior: 'smooth' });
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.innerWidth >= 768) {
        nudge(1);
        return;
      }
      const stride = cardStride || (frame.clientWidth * 0.75 + 16);
      frame.scrollBy({ left: stride, behavior: 'smooth' });
    });
  }

  let mobileScrollRaf = null;
  let lastActiveIdx = -1;

  function updateMobileActiveState() {
    mobileScrollRaf = null;
    const allStageCards = stage.children;
    const len = allStageCards.length;
    if (!len) return;

    // Center of visible frame in stage scroll coordinates
    const targetCenter = frame.scrollLeft + frame.clientWidth / 2;
    let closestIdx = 0;
    let minDiff = Infinity;

    for (let i = 0; i < len; i++) {
      const card = allStageCards[i];
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - targetCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    }

    if (closestIdx !== lastActiveIdx) {
      lastActiveIdx = closestIdx;
      for (let i = 0; i < len; i++) {
        if (i === closestIdx) {
          allStageCards[i].classList.add('is-active');
        } else {
          allStageCards[i].classList.remove('is-active');
        }
      }
      const creatorIdx = ((closestIdx % count) + count) % count;
      if (creatorIdx !== selected) {
        pos = creatorIdx;
        updateCaption();
      }
    }
  }

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

    // Real-time 60fps/120fps active card update during swipe
    if (!mobileScrollRaf) {
      mobileScrollRaf = requestAnimationFrame(updateMobileActiveState);
    }
  }, { passive: true });

  // Instant update while finger is touching and dragging
  frame.addEventListener('touchmove', () => {
    if (window.innerWidth >= 768) return;
    if (!mobileScrollRaf) {
      mobileScrollRaf = requestAnimationFrame(updateMobileActiveState);
    }
  }, { passive: true });

  frame.addEventListener('touchend', () => {
    if (window.innerWidth >= 768) return;
    updateMobileActiveState();
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

  // All creator cards reveal together in a row (unified reveal, no staggered half-right / half-left tilting)
  gsap.from('.creators-carousel-wrap', {
    opacity: 0,
    y: 50,
    duration: 0.85,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#creators',
      start: 'top 65%'
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
          // Success - show success box, hide form
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
    'images-for-landing-page/Case Studies/gemini.webp',
    'images-for-landing-page/Case Studies/meta-ai.webp',
    'images-for-landing-page/Case Studies/thums-up.webp',
    'images-for-landing-page/Case Studies/stranger-things.webp',
    'assets/creators/cinematic/mortal.webp',
    'assets/creators/cinematic/payal.webp',
    'assets/creators/cinematic/nishu_tiwari.webp',
    'assets/creators/cinematic/snax.webp',
    'assets/creators/cinematic/joker.webp'
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

  // Footer subtle entrance
  gsap.from('.footer-container', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.footer-gradient-wrap',
      start: 'top 90%',
      once: true
    }
  });
}
