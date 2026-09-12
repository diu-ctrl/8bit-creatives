/**
 * 8Bit Creatives — Master Application Engine (Phase 5 Refined)
 * Strictly adhering to "updation.md" & "Master_Wireframe_Specification.md"
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
  initRouter();
  initMobileNav();
  initContactTabs();
  initCounters();
  initCoverflowRoster();
  initTalentDirectory();
  initKickWall();
  initPlaybookStepper();
  initModals();
  initForms();
});



/* ==========================================================================
   2. Sticky Header Scroll Listener
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   3. SPA Router with Curtain Transition & Subpage Toggling
   ========================================================================== */
function initRouter() {
  const curtain = document.getElementById('curtain-wipe-overlay');
  const views = document.querySelectorAll('.subpage-view');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');

  const ROUTE_TITLES = {
    home: "8Bit Creatives — India's Premier Gaming & Creator Agency",
    about: "About & Ecosystem — 8Bit Creatives",
    talent: "Creator Roster (50+) — 8Bit Creatives",
    work: "Work & Case Studies — 8Bit Creatives",
    kick: "Kick Flagship Hub — 8Bit Creatives",
    brands: "For Brands & 5-Stage Playbook — 8Bit Creatives",
    creators: "For Creators & 360° Management — 8Bit Creatives",
    platforms: "For Platforms & Talent Supply — 8Bit Creatives",
    join: "Join The Roster — 8Bit Creatives",
    contact: "Contact & Brief Hub — 8Bit Creatives"
  };

  window.navigateTo = (route) => {
    let cleanRoute = (route || '').replace('#', '').replace('/', '').trim() || 'home';
    if (cleanRoute.includes('?')) cleanRoute = cleanRoute.split('?')[0];

    const targetView = document.getElementById(`view-${cleanRoute}`) || document.getElementById('view-home');
    const matchedRoute = targetView.id.replace('view-', '');

    // Close mobile drawer if open
    if (mobileDrawer) mobileDrawer.classList.remove('active');

    // Update document title
    if (ROUTE_TITLES[matchedRoute]) {
      document.title = ROUTE_TITLES[matchedRoute];
    }

    if (!curtain) {
      views.forEach(v => v.classList.remove('active'));
      targetView.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.pixelSoul) {
        if (matchedRoute === 'home') {
          window.pixelSoul.initHeroCanvas();
        }
        window.pixelSoul.initPixelDissolves();
        window.pixelSoul.initPixelCorners();
        window.pixelSoul.initPixelScatters();
      }
      initCounters();
      return;
    }

    curtain.classList.remove('exit');
    curtain.classList.add('active');

    setTimeout(() => {
      views.forEach(v => v.classList.remove('active'));
      targetView.classList.add('active');
      window.scrollTo({ top: 0 });

      if (window.pixelSoul) {
        if (matchedRoute === 'home') {
          window.pixelSoul.initHeroCanvas();
        }
        window.pixelSoul.initPixelDissolves();
        window.pixelSoul.initPixelCorners();
        window.pixelSoul.initPixelScatters();
      }
      initCounters();

      // Update active nav links
      document.querySelectorAll('.nav-link').forEach(link => {
        const linkRoute = link.getAttribute('data-route') || (link.getAttribute('href') || '').replace('#', '');
        link.classList.toggle('active', linkRoute === matchedRoute);
      });

      curtain.classList.add('exit');
      setTimeout(() => {
        curtain.classList.remove('active', 'exit');
      }, 400);
    }, 350);
  };

  // Intercept all route clicks
  document.addEventListener('click', (e) => {
    const targetLink = e.target.closest('[data-route], a[href^="#"]');
    if (targetLink) {
      const href = targetLink.getAttribute('data-route') || targetLink.getAttribute('href');
      if (href && (href.startsWith('#') || targetLink.hasAttribute('data-route'))) {
        e.preventDefault();
        const route = href.replace('#', '');
        window.location.hash = route;
        window.navigateTo(route);
      }
    }
  });

  // Browser back/forward navigation support
  window.addEventListener('hashchange', () => {
    window.navigateTo(window.location.hash);
  });

  // Initial route load
  if (window.location.hash) {
    window.navigateTo(window.location.hash);
  }
}

/* ==========================================================================
   4. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      drawer.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && e.target !== toggleBtn) {
        drawer.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   5. Contact Category Tabs Switcher
   ========================================================================== */
function initContactTabs() {
  const tabBtns = document.querySelectorAll('.contact-tab-btn');
  const panes = document.querySelectorAll('.contact-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-contact-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(`contact-tab-${targetTab}`);
      if (targetPane) targetPane.classList.add('active');
    });
  });
}

/* ==========================================================================
   6. Number Count-Up Animation
   ========================================================================== */
function initCounters() {
  const countElements = document.querySelectorAll('[data-count]');
  if (!countElements.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';

        if (prefersReduced) {
          el.textContent = `${prefix}${target}${suffix}`;
          obs.unobserve(el);
          return;
        }

        const duration = 1000;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(easeOut * target);

          el.textContent = `${prefix}${currentVal}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = `${prefix}${target}${suffix}`;
          }
        };

        requestAnimationFrame(updateCount);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.1 });

  countElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   7. Talent Database & Directory Engine (16 Verified Creators)
   ========================================================================== */
const CREATOR_DATABASE = [
  {
    id: 'mortal',
    name: 'Naman Mathur',
    handle: 'Mortal',
    game: 'BGMI',
    genre: 'Mobile Esports',
    platforms: ['YouTube', 'Instagram'],
    followers: '7.1M',
    language: 'Hindi',
    tier: 'Mega',
    bio: 'The undisputed face of Indian mobile esports. 4x Esports Awards nominee and co-founder of the S8UL ecosystem.',
    ageDemo: '18-24 (58%) · 25-34 (32%)',
    topGeo: 'India (94%) · Tier 1 & 2',
    image: 'assets/creators/mortal.jpg'
  },
  {
    id: 'payal',
    name: 'Payal Dhare',
    handle: 'Payal Gaming',
    game: 'Variety',
    genre: 'Variety / Esports',
    platforms: ['YouTube', 'Instagram'],
    followers: '4.2M',
    language: 'Hindi',
    tier: 'Mega',
    bio: 'India’s premier female gaming creator. MOBIES Global Streamer of the Year award winner bridging gaming and lifestyle brand integrations.',
    ageDemo: '18-24 (62%) · 25-34 (28%)',
    topGeo: 'India (91%) · Mumbai, Delhi, Bengaluru',
    image: 'assets/creators/payal.jpg'
  },
  {
    id: 'snax',
    name: 'Raj Varma',
    handle: 'Snax Gaming',
    game: 'BGMI',
    genre: 'FPS / Competitive',
    platforms: ['YouTube', 'Instagram', 'Kick'],
    followers: '1.8M',
    language: 'Hindi',
    tier: 'Macro',
    bio: 'One of India’s most mechanically gifted BGMI athletes. Flagship streamer on Kick delivering daily high-octane battle royale content.',
    ageDemo: '18-24 (65%) · 25-34 (25%)',
    topGeo: 'India (93%) · Hyderabad, Delhi, Pune',
    image: 'assets/creators/snax.jpg'
  },
  {
    id: 'nishu',
    name: 'Nishu Tiwari',
    handle: 'Nishu Tiwari',
    game: 'Lifestyle',
    genre: 'Lifestyle & Vlogging',
    platforms: ['YouTube', 'Instagram'],
    followers: '4.37M',
    language: 'Hindi',
    tier: 'Mega',
    bio: '8Bit Creatives’ flagship lifestyle creator with 4.37M+ YouTube subscribers, pioneering authentic youth culture and non-endemic brand partnerships.',
    ageDemo: '18-24 (54%) · 25-34 (36%)',
    topGeo: 'India (96%) · Tier 1 & 2',
    image: 'assets/creators/nishu.jpg'
  },
  {
    id: 'scout',
    name: 'Tanmay Singh',
    handle: 'ScoutOP',
    game: 'BGMI',
    genre: 'FPS / Global Pro',
    platforms: ['YouTube', 'Instagram'],
    followers: '5.2M',
    language: 'Hindi',
    tier: 'Mega',
    bio: 'Pioneer of aggressive mobile esports in India. Represented the nation at multiple international tournaments with massive live audience loyalty.',
    ageDemo: '18-24 (68%) · 25-34 (22%)',
    topGeo: 'India (95%) · National',
    image: 'assets/creators/scout.jpg'
  },
  {
    id: 'goblin',
    name: 'Harsh Paudwal',
    handle: 'Goblin',
    game: 'BGMI',
    genre: 'Esports Champion',
    platforms: ['YouTube', 'Kick'],
    followers: '920K',
    language: 'Hindi',
    tier: 'Macro',
    bio: 'Prodigious BGMI athlete and MVP champion. Migrated to Kick in the 2026 flagship partnership, commanding high concurrent viewership.',
    ageDemo: '18-24 (72%) · 25-34 (18%)',
    topGeo: 'India (92%) · Mumbai, Pune',
    image: 'assets/creators/goblin.jpg'
  },
  {
    id: 'mamba',
    name: 'Salman Ahmad',
    handle: '8Bit Mamba',
    game: 'GTA RP',
    genre: 'RP & Variety',
    platforms: ['YouTube', 'Instagram', 'Kick'],
    followers: '1.4M',
    language: 'Hindi',
    tier: 'Macro',
    bio: 'Core member of 8Bit since its inception. Legendary storyteller and streamer leading India’s GTA RP gaming revolution.',
    ageDemo: '18-24 (60%) · 25-34 (30%)',
    topGeo: 'India (94%) · North & West India',
    image: 'assets/creators/mamba.jpg'
  },
  {
    id: 'viper',
    name: 'Yash Soni',
    handle: '8Bit Viper',
    game: 'Variety',
    genre: 'Esports Host / Streamer',
    platforms: ['YouTube', 'Kick'],
    followers: '780K',
    language: 'Hindi',
    tier: 'Mid-Tier',
    bio: 'Recognized voice of Indian esports analysis and variety gaming streams. Known for authoritative tournament breakdowns and community engagement.',
    ageDemo: '18-24 (55%) · 25-34 (35%)',
    topGeo: 'India (90%) · National',
    image: 'assets/creators/viper.jpg'
  },
  {
    id: 'regaltos',
    name: 'Parv Singh',
    handle: 'Regaltos',
    game: 'BGMI',
    genre: 'Mobile Esports',
    platforms: ['YouTube', 'Instagram', 'Kick'],
    followers: '2.4M',
    language: 'Hindi',
    tier: 'Mega',
    bio: 'Foundational member of Team SouL with unmatched aggressive assaulter gameplay and dedicated youth following.',
    ageDemo: '18-24 (64%) · 25-34 (26%)',
    topGeo: 'India (95%) · Delhi, NCR, Punjab',
    image: 'assets/creators/regaltos.jpg'
  },
  {
    id: 'kaashvi',
    name: 'Kaashvi Hiranandani',
    handle: 'Kaashvi Plays',
    game: 'Variety',
    genre: 'Variety & Female Gaming',
    platforms: ['YouTube', 'Instagram'],
    followers: '1.2M',
    language: 'Hindi',
    tier: 'Macro',
    bio: 'High-energy variety streamer and lifestyle creator bridging competitive gaming and mainstream youth lifestyle.',
    ageDemo: '18-24 (61%) · 25-34 (29%)',
    topGeo: 'India (92%) · Mumbai, Bengaluru',
    image: 'assets/creators/kaashvi.jpg'
  },
  {
    id: 'krutika',
    name: 'Krutika Ojha',
    handle: 'Krutika Plays',
    game: 'Variety',
    genre: 'Variety Streamer',
    platforms: ['YouTube', 'Instagram'],
    followers: '980K',
    language: 'Hindi',
    tier: 'Macro',
    bio: 'Core female streamer known for collaborative gameplay, community banter, and lifestyle brand collaborations.',
    ageDemo: '18-24 (59%) · 25-34 (31%)',
    topGeo: 'India (93%) · Tier 1 Cities',
    image: 'assets/creators/krutika.jpg'
  },
  {
    id: 'beg4mercy',
    name: 'Shobhit Rai',
    handle: 'Beg4Mercy',
    game: 'GTA RP',
    genre: 'GTA RP & Storytelling',
    platforms: ['YouTube', 'Kick'],
    followers: '620K',
    language: 'Hindi',
    tier: 'Mid-Tier',
    bio: 'Premier voice in Indian GTA RP storytelling with cinematic roleplay streams on Kick and YouTube.',
    ageDemo: '18-24 (66%) · 25-34 (24%)',
    topGeo: 'India (94%) · North India',
    image: 'assets/creators/beg4mercy.jpg'
  }
];

/* ==========================================================================
   3D Coverflow Carousel Engine (02 — THE ROSTER)
   ========================================================================== */
function initCoverflowRoster() {
  const stage = document.getElementById('roster-stage');
  const viewport = document.querySelector('.coverflow-viewport');
  const prevBtn = document.getElementById('roster-prev-btn');
  const nextBtn = document.getElementById('roster-next-btn');
  const dotsContainer = document.getElementById('roster-dots');
  const metaName = document.getElementById('roster-meta-name');
  const metaReach = document.getElementById('roster-meta-reach');
  const metaRole = document.getElementById('roster-meta-role');

  if (!stage || !viewport) return;

  const rosterSlides = [
    {
      id: 'mortal',
      name: 'MORTAL',
      handle: 'Mortal',
      fullName: 'Naman Mathur',
      role: 'BGMI Esports Legend',
      reach: '7.1M',
      game: 'BGMI Esports',
      image: 'assets/creators/mortal.jpg'
    },
    {
      id: 'payal',
      name: 'PAYAL GAMING',
      handle: 'Payal Gaming',
      fullName: 'Payal Dhare',
      role: 'Variety & Esports Icon',
      reach: '4.2M',
      game: 'Variety & Esports',
      image: 'assets/creators/payal.jpg'
    },
    {
      id: 'snax',
      name: 'SNAX',
      handle: 'Snax',
      fullName: 'Raj Varma',
      role: 'FPS Competitive Athlete',
      reach: '1.8M',
      game: 'FPS Competitive',
      image: 'assets/creators/snax.jpg'
    },
    {
      id: 'scout',
      name: 'SCOUT',
      handle: 'Scout',
      fullName: 'Tanmay Singh',
      role: 'Global Mobile Pro',
      reach: '5.2M',
      game: 'FPS / Global Pro',
      image: 'assets/creators/scout.jpg'
    },
    {
      id: 'regaltos',
      name: 'REGALTOS',
      handle: 'Regaltos',
      fullName: 'Parv Singh',
      role: 'Mobile Esports Prodigy',
      reach: '2.4M',
      game: 'Mobile Esports',
      image: 'assets/creators/regaltos.jpg'
    },
    {
      id: 'nishu',
      name: 'NISHU TIWARI',
      handle: 'Nishu Tiwari',
      fullName: 'Nishu Tiwari',
      role: 'Lifestyle & Vlogging Pioneer',
      reach: '4.37M',
      game: 'Lifestyle',
      image: 'assets/creators/nishu.jpg'
    },
    {
      id: 'mamba',
      name: '8BIT MAMBA',
      handle: '8Bit Mamba',
      fullName: 'Salman Ahmad',
      role: 'GTA RP & Storytelling',
      reach: '1.4M',
      game: 'GTA RP',
      image: 'assets/creators/mamba.jpg'
    },
    {
      id: 'goblin',
      name: 'GOBLIN',
      handle: 'Goblin',
      fullName: 'Harsh Paudwal',
      role: 'Esports MVP Champion',
      reach: '920K',
      game: 'BGMI Champion',
      image: 'assets/creators/goblin.jpg'
    }
  ];

  let activeIndex = 0;
  let isDragging = false;
  let startX = 0;
  let currentDrag = 0;
  const totalSlides = rosterSlides.length;

  // Render cards in 3D stage
  stage.innerHTML = rosterSlides.map((slide, idx) => `
    <div class="coverflow-card pixel-corner-frame" data-index="${idx}" data-id="${slide.id}">
      <img src="${slide.image}" alt="${slide.name}" draggable="false" loading="lazy">
      <div class="coverflow-card-gradient"></div>
      <div class="coverflow-card-info">
        <div class="coverflow-card-title">${slide.name}</div>
        <div class="coverflow-card-sub">${slide.fullName} · <strong>${slide.game}</strong></div>
        <div class="coverflow-card-bottom">
          <span class="chip chip-ink"><strong>${slide.reach}</strong> reach</span>
          <span class="btn-ghost" style="color:var(--orange); font-weight:700;">PROFILE →</span>
        </div>
      </div>
    </div>
  `).join('');

  // Render pagination dots
  if (dotsContainer) {
    dotsContainer.innerHTML = rosterSlides.map((_, idx) => `
      <button class="coverflow-dot ${idx === 0 ? 'is-active' : ''}" data-index="${idx}" aria-label="Slide ${idx + 1}"></button>
    `).join('');
  }

  const cards = Array.from(stage.querySelectorAll('.coverflow-card'));
  const dots = Array.from(dotsContainer ? dotsContainer.querySelectorAll('.coverflow-dot') : []);

  function updateTransform(dragOffset = 0) {
    const isMobile = window.innerWidth <= 768;
    const rotateAngle = 44;
    const depthFactor = isMobile ? 120 : 160;
    const spacingFactor = isMobile ? 160 : 220;

    cards.forEach((card, idx) => {
      const offset = (idx - activeIndex) + (dragOffset / 300);
      const absOffset = Math.abs(offset);
      const isCenter = Math.abs(offset) < 0.35;

      const rotateY = offset * -rotateAngle;
      const translateZ = -absOffset * depthFactor;
      const translateX = offset * spacingFactor;
      const scale = Math.max(0.72, 1 - absOffset * 0.12);
      const opacity = Math.max(0.2, 1 - absOffset * 0.32);
      const zIndex = Math.round(100 - absOffset * 10);

      card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
      card.style.zIndex = zIndex;
      card.style.opacity = opacity;

      if (isCenter) {
        card.classList.add('is-active');
      } else {
        card.classList.remove('is-active');
      }
    });

    // Update active metadata pill
    const cur = rosterSlides[activeIndex];
    if (cur) {
      if (metaName) metaName.textContent = cur.name;
      if (metaReach) metaReach.innerHTML = `<strong>${cur.reach}</strong> REACH`;
      if (metaRole) metaRole.textContent = cur.role;
    }

    // Update dots
    dots.forEach((d, i) => {
      if (i === activeIndex) {
        d.classList.add('is-active');
      } else {
        d.classList.remove('is-active');
      }
    });

    // Update prev/next button states
    if (prevBtn) prevBtn.disabled = activeIndex === 0;
    if (nextBtn) nextBtn.disabled = activeIndex === totalSlides - 1;
  }

  function goTo(index) {
    activeIndex = Math.max(0, Math.min(totalSlides - 1, index));
    updateTransform(0);
    if (window.pixelSoul && typeof window.pixelSoul.initPixelCorners === 'function') {
      window.pixelSoul.initPixelCorners();
    }
  }

  // Prev / Next button clicks
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goTo(activeIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goTo(activeIndex + 1);
    });
  }

  // Dot clicks
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      goTo(idx);
    });
  });

  // Card clicks
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (Math.abs(currentDrag) > 10) return;
      const idx = parseInt(card.getAttribute('data-index'), 10);
      const id = card.getAttribute('data-id');
      if (idx === activeIndex) {
        if (typeof window.openCreatorModal === 'function') {
          window.openCreatorModal(id);
        }
      } else {
        goTo(idx);
      }
    });
  });

  // Pointer drag gestures
  viewport.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    currentDrag = 0;
    cards.forEach(c => c.classList.add('is-dragging'));
    try { viewport.setPointerCapture(e.pointerId); } catch (_) {}
  });

  viewport.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    currentDrag = e.clientX - startX;
    updateTransform(currentDrag);
  });

  const endDrag = (e) => {
    if (!isDragging) return;
    isDragging = false;
    cards.forEach(c => c.classList.remove('is-dragging'));
    try { viewport.releasePointerCapture(e.pointerId); } catch (_) {}

    const threshold = 50;
    if (currentDrag < -threshold && activeIndex < totalSlides - 1) {
      goTo(activeIndex + 1);
    } else if (currentDrag > threshold && activeIndex > 0) {
      goTo(activeIndex - 1);
    } else {
      updateTransform(0);
    }
    currentDrag = 0;
  };

  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);

  // Keyboard navigation
  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(activeIndex - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(activeIndex + 1);
    }
  });

  window.addEventListener('resize', () => {
    updateTransform(0);
  });

  // Initial render
  updateTransform(0);
  if (window.pixelSoul && typeof window.pixelSoul.initPixelCorners === 'function') {
    window.pixelSoul.initPixelCorners();
  }
}

let talentGenre = 'all';
let talentPlatform = 'all';
let talentSearch = '';

function initTalentDirectory() {
  const grid = document.getElementById('subpage-talent-grid');
  const count = document.getElementById('subpage-talent-count');
  const search = document.getElementById('subpage-talent-search');
  const genreBtns = document.querySelectorAll('[data-subpage-genre]');
  const platformBtns = document.querySelectorAll('[data-subpage-platform]');

  if (!grid) return;

  function render() {
    const filtered = CREATOR_DATABASE.filter(c => {
      const matchG = (talentGenre === 'all') || (c.game.toLowerCase() === talentGenre.toLowerCase()) || (talentGenre === 'lifestyle' && c.game === 'Lifestyle');
      const matchP = (talentPlatform === 'all') || c.platforms.map(p => p.toLowerCase()).includes(talentPlatform.toLowerCase());
      const matchS = (talentSearch === '') || c.name.toLowerCase().includes(talentSearch.toLowerCase()) || c.handle.toLowerCase().includes(talentSearch.toLowerCase());
      return matchG && matchP && matchS;
    });

    if (count) {
      count.innerHTML = `SHOWING <strong style="color:var(--orange)">${filtered.length}</strong> OF ${CREATOR_DATABASE.length}+ CREATORS`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; background: var(--white); padding: var(--s12) var(--s6); text-align: center;">
          <div class="diamond diamond-gold" style="width:10px; height:10px; margin-bottom: var(--s3);"></div>
          <h3 class="font-display" style="font-size: 20px; color: var(--ink); margin-bottom: var(--s2);">NO CREATORS FOUND</h3>
          <p style="font-size: 14px; color: var(--grey-mid); max-width: 420px; margin: 0 auto var(--s6);">
            No creators match the active filter criteria. Try selecting another game category or clearing your search term.
          </p>
          <button class="btn btn-secondary" onclick="window.resetTalentFilters()">RESET ALL FILTERS</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(c => `
      <div class="card-v2 pixel-corner-frame" onclick="openCreatorModal('${c.id}')">
        <div class="card-media" style="aspect-ratio: 4 / 5;">
          <img src="${c.image}" alt="${c.handle}" loading="lazy" onerror="this.src='assets/logo.png'; this.style.objectFit='contain';">
        </div>
        <div class="card-content">
          <div class="card-title" style="font-size: 19px;">${c.handle}</div>
          <div style="font-size:13px; color:var(--grey-mid);">${c.name} · <span style="color:var(--orange); font-weight:700;">${c.game}</span></div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto; padding-top:10px; border-top:1px solid var(--line);">
            <span class="chip"><strong>${c.followers}</strong> reach</span>
            <span class="btn-ghost">PROFILE →</span>
          </div>
        </div>
      </div>
    `).join('');

    if (window.pixelSoul && typeof window.pixelSoul.initPixelCorners === 'function') {
      window.pixelSoul.initPixelCorners();
    }
  }

  window.resetTalentFilters = () => {
    talentGenre = 'all';
    talentPlatform = 'all';
    talentSearch = '';
    if (search) search.value = '';
    genreBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-subpage-genre') === 'all'));
    platformBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-subpage-platform') === 'all'));
    render();
  };

  genreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      genreBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      talentGenre = btn.getAttribute('data-subpage-genre');
      render();
    });
  });

  platformBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      platformBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      talentPlatform = btn.getAttribute('data-subpage-platform');
      render();
    });
  });

  if (search) {
    search.addEventListener('input', (e) => {
      talentSearch = e.target.value.trim();
      render();
    });
  }

  render();
}

/* ==========================================================================
   8. The 48 Wall on /kick with Category Filter & Monogram Badges
   ========================================================================== */
function initKickWall() {
  const wallContainer = document.getElementById('kick-48-wall');
  const filterBtns = document.querySelectorAll('[data-kick-filter]');
  if (!wallContainer) return;

  const KICK_CREATOR_DATA = [
    { name: 'Snax', genre: 'bgmi', avatar: 'assets/creators/snax.jpg' },
    { name: 'Goblin', genre: 'bgmi', avatar: 'assets/creators/goblin.jpg' },
    { name: 'Mamba', genre: 'gta rp', avatar: 'assets/creators/mamba.jpg' },
    { name: 'Viper', genre: 'variety', avatar: 'assets/creators/viper.jpg' },
    { name: 'Mortal', genre: 'bgmi', avatar: 'assets/creators/mortal.jpg' },
    { name: 'Payal', genre: 'variety', avatar: 'assets/creators/payal.jpg' },
    { name: 'Scout', genre: 'bgmi', avatar: 'assets/creators/scout.jpg' },
    { name: 'Regaltos', genre: 'bgmi', avatar: 'assets/creators/regaltos.jpg' },
    { name: 'Kaashvi', genre: 'variety', avatar: 'assets/creators/kaashvi.jpg' },
    { name: 'Krutika', genre: 'variety', avatar: 'assets/creators/krutika.jpg' },
    { name: 'Nishu', genre: 'lifestyle', avatar: 'assets/creators/nishu.jpg' },
    { name: 'Beg4Mercy', genre: 'gta rp', avatar: 'assets/creators/beg4mercy.jpg' },
    { name: 'Pahadi', genre: 'bgmi' },
    { name: 'Sid', genre: 'variety' },
    { name: 'Binks', genre: 'gta rp' },
    { name: 'Joker', genre: 'bgmi' },
    { name: 'Mavi', genre: 'bgmi' },
    { name: 'Faraz', genre: 'variety' },
    { name: 'Sejal', genre: 'lifestyle' },
    { name: 'Yashitha', genre: 'lifestyle' },
    { name: 'Zgod', genre: 'bgmi' },
    { name: 'Jonathan', genre: 'bgmi' },
    { name: 'ClutchGod', genre: 'bgmi' },
    { name: 'Neyoo', genre: 'bgmi' },
    { name: 'Shadow', genre: 'bgmi' },
    { name: 'Spower', genre: 'bgmi' },
    { name: 'Justin', genre: 'bgmi' },
    { name: 'Drigger', genre: 'bgmi' },
    { name: 'Hector', genre: 'bgmi' },
    { name: 'Akshat', genre: 'bgmi' },
    { name: 'Omega', genre: 'bgmi' },
    { name: 'NinjaJOD', genre: 'bgmi' },
    { name: 'Aman', genre: 'bgmi' },
    { name: 'Sangwan', genre: 'bgmi' },
    { name: 'Ultron', genre: 'bgmi' },
    { name: 'Destro', genre: 'bgmi' },
    { name: 'Vexe', genre: 'bgmi' },
    { name: 'Gill', genre: 'bgmi' },
    { name: 'SprayGod', genre: 'bgmi' },
    { name: 'Punkk', genre: 'bgmi' },
    { name: 'Fierce', genre: 'bgmi' },
    { name: 'Apollo', genre: 'bgmi' },
    { name: 'Saumraj', genre: 'bgmi' },
    { name: 'Sensei', genre: 'bgmi' },
    { name: 'Shreeman', genre: 'gta rp' },
    { name: 'Dynamo', genre: 'bgmi' },
    { name: 'HydraFlick', genre: 'variety' },
    { name: 'Kronten', genre: 'bgmi' }
  ];

  let currentKickFilter = 'all';

  function renderKickWall() {
    const filtered = KICK_CREATOR_DATA.filter(c => {
      if (currentKickFilter === 'all') return true;
      return c.genre.toLowerCase() === currentKickFilter.toLowerCase();
    });

    wallContainer.innerHTML = filtered.map(c => {
      const initials = c.name.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase();
      const content = c.avatar 
        ? `<img src="${c.avatar}" alt="${c.name}">` 
        : `<div class="the-48-monogram">${initials}</div>`;

      return `
        <div class="the-48-tile" title="${c.name} (${c.genre.toUpperCase()})">
          ${content}
          <div class="the-48-tooltip">${c.name}</div>
        </div>
      `;
    }).join('');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentKickFilter = btn.getAttribute('data-kick-filter');
      renderKickWall();
    });
  });

  renderKickWall();
}

/* ==========================================================================
   8B. 5-Stage Interactive Playbook Stepper on /brands
   ========================================================================== */
function initPlaybookStepper() {
  const navItems = document.querySelectorAll('.playbook-nav-item');
  const panels = document.querySelectorAll('.playbook-panel');
  if (!navItems.length || !panels.length) return;

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const step = item.getAttribute('data-playbook-step');
      navItems.forEach(n => n.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      item.classList.add('active');
      const targetPanel = document.getElementById(`playbook-panel-${step}`);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

/* ==========================================================================
   9. Deep-Dive Case Study Database & Modal
   ========================================================================== */
const CASE_STUDY_DATABASE = {
  iqoo: {
    title: 'THE FLAGSHIP SMARTPHONE LAUNCH',
    client: 'iQOO / OnePlus',
    metric: '42M VIEWS',
    metricLabel: 'views on the launch',
    brief: 'Launch a high-performance gaming flagship device to hard-to-reach Gen-Z mobile gamers in India.',
    solution: 'Curated an 8-creator squad (Mortal, Scout, Snax, Payal, Regaltos, Goblin, Mamba, Viper) across 6 weeks of live unboxings, custom tournament scrims, and performance stress tests.',
    results: ['42M+ Total Video Views', '96,000 Direct Product Clicks', '+3.1× Engagement Lift vs. Industry Benchmark', '100% Sold Out Initial Launch Batch'],
    quote: '"8Bit Creatives delivered the single highest converting gaming campaign in our brand history." — Regional Brand Director'
  },
  chess: {
    title: 'GLOBAL CHESS LEAGUE S4 BROADCAST',
    client: 'Tech Mahindra',
    metric: '9-DAY BROADCAST',
    metricLabel: 'continuous live broadcast',
    brief: 'Produce and broadcast the world’s premier franchise chess league with cutting-edge production values, real-time board telemetry, and gaming influencer crossover co-streams.',
    solution: 'Designed complete studio graphics, commentary desks, multi-angle camera feeds, and simultaneous creator live watch parties.',
    results: ['100M+ Global Broadcast Impressions', '9 Continuous Days of Flawless Multi-Cam Feed', '3.8M Peak Concurrent Streamers', 'Recognized as Gold Standard Sports-Gaming Hybrid'],
    quote: '"8Bit brought digital entertainment energy to classical chess, setting new viewership benchmarks." — League Operations Lead'
  },
  kick: {
    title: 'KICK INDIA PLATFORM MARKET ENTRY',
    client: 'Kick Streaming',
    metric: '48 CREATORS',
    metricLabel: 'creators live on day one',
    brief: 'Enter the competitive Indian live streaming ecosystem and capture immediate market share and daily active users.',
    solution: 'Executed India’s first official creator agency partnership, migrating 48 proven gaming streamers on day one under the global 95/5 sub split framework.',
    results: ['48 Creators Migrated on Day One', '500M+ Initial Audience Reach', '12M+ Hours Watched in Month One', 'Front-page National Tech & Entertainment Coverage'],
    quote: '"8Bit is our vital gateway to the Indian gaming creator community." — Strategic Partnerships, Kick'
  },
  mamaearth: {
    title: 'NON-ENDEMIC FMCG GAMIFIED INTEGRATION',
    client: 'Mamaearth',
    metric: '14M REACH',
    metricLabel: 'organic audience reach',
    brief: 'Introduce personal care products into young gaming households without coming across as intrusive advertising.',
    solution: 'Co-created native stream storylines with Nishu Tiwari and Payal Gaming, integrating natural morning-routine discussions and chat giveaways.',
    results: ['14M+ Organic Social Reach', '3.4× Engagement Lift over Static Ad Banners', '28,000 Coupon Code Redemptions', 'Proven Non-Endemic ROI Blueprint'],
    quote: '"8Bit proved that gaming audiences are highly responsive to genuine lifestyle storytelling." — Marketing VP'
  },
  redbull: {
    title: 'RED BULL M.E.O. NATIONAL SEASON',
    client: 'Red Bull India',
    metric: '18M IMPRESSIONS',
    metricLabel: 'tournament impressions',
    brief: 'Drive competitive esports tournament registrations across 50+ college campuses and online hubs.',
    solution: 'Deployed 14 8Bit athletes for live exhibition showmatches, grassroots mentoring, and national LAN finale commentary.',
    results: ['18M Organic Impressions', '45,000 Tournament Entrants', 'Full Capacity LAN Finals in Mumbai', 'Sustained Year-Round Brand Association'],
    quote: '"The 8Bit roster commands genuine athletic respect among gamers." — Red Bull Brand Team'
  },
  monster: {
    title: 'MONSTER ENERGY PRO ATHLETE PROGRAM',
    client: 'Monster Energy',
    metric: '24M IMPRESSIONS',
    metricLabel: 'annual brand mandate',
    brief: 'Position esports champions alongside traditional extreme sports athletes across global and domestic events.',
    solution: 'Structured annual ambassadorships with Animesh "Thug" Agarwal and top pro athletes, featuring custom can activations, bootcamps, and lifestyle content.',
    results: ['24M+ Annual Impressions', 'Flagship Esports Athlete Presence', 'Exclusive S8UL Gaming House 2.0 Integration', 'Pioneered Energy Drink Culture in Indian Gaming'],
    quote: '"A game-changing partnership bridging esports and energy." — Monster Energy Marketing'
  }
};

/* ==========================================================================
   10. Modals Management (Creator Media Kit & Case Study)
   ========================================================================== */
function initModals() {
  const creatorBackdrop = document.getElementById('global-modal-backdrop');
  const creatorContainer = document.getElementById('global-modal-container');
  const creatorClose = document.getElementById('global-modal-close');

  const caseBackdrop = document.getElementById('case-study-modal-backdrop');
  const caseContainer = document.getElementById('case-study-modal-container');
  const caseClose = document.getElementById('case-study-modal-close');

  // Close helper
  window.openMethodologyModal = () => {
    const modal = document.getElementById('methodology-modal-backdrop');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeAllModals = () => {
    const methodModal = document.getElementById('methodology-modal-backdrop');
    if (methodModal) methodModal.classList.remove('active');
    if (creatorBackdrop) creatorBackdrop.classList.remove('active');
    if (caseBackdrop) caseBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (creatorClose) creatorClose.addEventListener('click', window.closeAllModals);
  if (caseClose) caseClose.addEventListener('click', window.closeAllModals);

  if (creatorBackdrop) {
    creatorBackdrop.addEventListener('click', (e) => {
      if (e.target === creatorBackdrop) window.closeAllModals();
    });
  }

  if (caseBackdrop) {
    caseBackdrop.addEventListener('click', (e) => {
      if (e.target === caseBackdrop) window.closeAllModals();
    });
  }

  // Keyboard accessibility: Escape key closes active modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeAllModals();
    }
  });

  // Open Creator Modal
  window.openCreatorModal = (id) => {
    const c = CREATOR_DATABASE.find(item => item.id === id);
    if (!c || !creatorContainer) return;

    creatorContainer.innerHTML = `
      <div style="background: var(--ink); color: var(--cream); padding: var(--s8);">
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: var(--s4); flex-wrap: wrap;">
          <div>
            <h2 class="text-h2" style="color:var(--white);">${c.handle}</h2>
            <div style="font-size: 16px; color: var(--grey-mid);">${c.name} · <span style="color:var(--orange); font-weight:700;">${c.genre}</span></div>
          </div>
          <span class="chip chip-gold">VERIFIED CREATOR</span>
        </div>
      </div>
      
      <div style="padding: var(--s8); display: grid; grid-template-columns: 1.2fr 0.8fr; gap: var(--s8);">
        <div>
          <h4 class="font-display" style="font-size: 16px; margin-bottom: var(--s2);">ABOUT</h4>
          <p class="text-body" style="color: #555; margin-bottom: var(--s6); font-size:14px;">${c.bio}</p>

          <h4 class="font-display" style="font-size: 16px; margin-bottom: var(--s3);">AUDIENCE DEMOGRAPHICS</h4>
          <div style="background: var(--cream); padding: var(--s4); border-radius: 2px; border: 1px solid var(--line); margin-bottom: var(--s6);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px;">
              <span><strong>Primary Age:</strong></span>
              <span>${c.ageDemo}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 13px;">
              <span><strong>Top Geographies:</strong></span>
              <span>${c.topGeo}</span>
            </div>
          </div>

          <div style="display: flex; gap: var(--s2); flex-wrap: wrap;">
            <div class="chip"><strong>${c.followers}</strong> total reach</div>
            <div class="chip"><strong>94%</strong> active engagement</div>
          </div>
        </div>

        <div style="background: var(--cream); padding: var(--s6);">
          <h4 class="font-display" style="font-size: 16px; color: var(--ink); margin-bottom: var(--s2);">BOOK ${c.handle.toUpperCase()}</h4>
          <p style="font-size: 13px; color: var(--grey-mid); margin-bottom: var(--s4);">Direct agency routing for sponsored campaigns and streams.</p>
          <form onsubmit="handleModalBooking(event, '${c.handle}')">
            <div class="form-group-v2">
              <label class="form-label-v2">Brand Name <span class="req">*</span></label>
              <input type="text" class="form-input-v2" required placeholder="e.g. Samsung, Red Bull">
            </div>
            <div class="form-group-v2">
              <label class="form-label-v2">Work Email <span class="req">*</span></label>
              <input type="email" class="form-input-v2" required placeholder="you@company.com">
            </div>
            <div class="form-group-v2">
              <label class="form-label-v2">Budget Range <span class="req">*</span></label>
              <select class="form-select-v2" required>
                <option value="">Select Range</option>
                <option>₹5L – ₹15L</option>
                <option>₹15L – ₹50L</option>
                <option>₹50L+</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: var(--s2);">TRANSMIT INQUIRY →</button>
          </form>
        </div>
      </div>
    `;

    creatorBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Open Case Study Modal
  window.openCaseStudyModal = (id) => {
    const cs = CASE_STUDY_DATABASE[id];
    if (!cs || !caseContainer) return;

    caseContainer.innerHTML = `
      <div style="background: var(--ink); color: var(--cream); padding: var(--s8);">
        
        <h2 class="text-h2" style="color:var(--white); margin-bottom: var(--s2);">${cs.title}</h2>
        <div style="font-size: 14px; color: var(--grey-mid);">Client: <strong style="color:var(--cream);">${cs.client}</strong></div>
      </div>

      <div style="padding: var(--s8);">
        <div style="background: var(--cream); border-left: 4px solid var(--orange); padding: var(--s6); margin-bottom: var(--s6);">
          <div style="font-family: var(--font-display); font-size: 36px; font-weight: 900; color: var(--orange); line-height: 1;">${cs.metric}</div>
          <div style="font-family: var(--font-display); font-size: 14px; color: var(--grey-mid); text-transform: none;">${cs.metricLabel}</div>
        </div>

        <h4 class="font-display" style="font-size: 16px; margin-bottom: var(--s2);">THE CHALLENGE</h4>
        <p style="font-size: 14px; color: #555; margin-bottom: var(--s4);">${cs.brief}</p>

        <h4 class="font-display" style="font-size: 16px; margin-bottom: var(--s2);">THE STRATEGY & EXECUTION</h4>
        <p style="font-size: 14px; color: #555; margin-bottom: var(--s6);">${cs.solution}</p>

        <h4 class="font-display" style="font-size: 16px; margin-bottom: var(--s3);">KEY VERIFIED METRICS</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--s3); margin-bottom: var(--s6);">
          ${cs.results.map(r => `
            <div style="background:var(--cream); padding:var(--s3); border:1px solid var(--line); font-size:13px; font-weight:600;">
              <span class="diamond" style="margin-right:6px;"></span> ${r}
            </div>
          `).join('')}
        </div>

        <div style="padding: var(--s4); background: #1a1a1a; color: var(--cream); border-radius: 2px; font-style: italic; font-size: 14px; margin-bottom: var(--s6);">
          ${cs.quote}
        </div>

        <div style="text-align: center;">
          <a href="#contact" onclick="window.closeAllModals();" data-route="contact" class="btn btn-primary">LAUNCH A CAMPAIGN LIKE THIS →</a>
        </div>
      </div>
    `;

    caseBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
}

/* ==========================================================================
   11. AJAX Form Handling
   ========================================================================== */
function initForms() {
  window.handleModalBooking = (e, creatorName) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'TRANSMITTING...';
    }

    setTimeout(() => {
      e.target.innerHTML = `
        <div style="text-align: center; padding: var(--s4);">
          <div class="diamond diamond-gold" style="width:12px; height:12px; margin-bottom: var(--s2);"></div>
          <h3 class="font-display" style="font-size: 18px; color: var(--ink);">INQUIRY RECEIVED</h3>
          <p style="font-size: 13px; color: #555; margin-top: var(--s2);">Our talent team will connect with a tailored pitch deck for ${creatorName} within 24 hours.</p>
        </div>
      `;
    }, 600);
  };

  const forms = document.querySelectorAll('.ajax-contact-form');
  forms.forEach(form => {
    const originalHTML = form.innerHTML;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'TRANSMITTING BRIEF...';
      }

      setTimeout(() => {
        form.innerHTML = `
          <div style="background: var(--white); padding: var(--s8); text-align: center; box-shadow: 0 14px 32px rgba(20,20,20,0.09);">
            <div class="diamond diamond-gold" style="width:12px; height:12px; margin-bottom: var(--s3);"></div>
            <h3 class="font-display" style="font-size: 24px; color: var(--ink); margin-bottom: var(--s2);">RECEIVED.</h3>
            <p class="text-body" style="color: #555; max-width: 480px; margin: 0 auto var(--s4); font-size:14px;">
              Your brief has been routed to our strategy directors. We will review and respond with campaign options within 24 hours.
            </p>
            <div class="chip chip-gold" style="margin-bottom: var(--s6);">STATUS: LOGGED TO EXECUTIVE PIPELINE</div>
            <div>
              <button type="button" class="btn btn-secondary" style="font-size: 12px; padding: 8px 16px;" onclick="this.closest('.ajax-contact-form').innerHTML = \`${originalHTML.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`; initForms();">TRANSMIT ANOTHER BRIEF</button>
            </div>
          </div>
        `;
      }, 700);
    });
  });
}
