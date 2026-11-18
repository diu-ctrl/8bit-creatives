/**
 * 8Bit Creatives - Real Asset & Image Preloader (preloader.js)
 * 
 * - Meaningful 0-100% progress tracking based on actual asset & image downloads.
 * - Pre-decodes images into GPU cache so sections render smoothly with no pop-in lag.
 * - Visible on every page refresh across the entire site (subpages, forms, landing page).
 * - Preserves user scroll position on refresh with zero redirection back to hero.
 */
(function () {
  'use strict';

  // === 1. PERSISTENT SCROLL TRACKING & RESTORATION ===
  const pathKey = '8bit_scroll_' + window.location.pathname;
  let savedScrollY = null;

  try {
    const rawPath = sessionStorage.getItem(pathKey);
    const rawGlobal = sessionStorage.getItem('8bit_last_scroll_y');
    const val = rawPath !== null && rawPath !== '' ? rawPath : rawGlobal;
    if (val !== null && val !== '') {
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed) && parsed > 0) {
        savedScrollY = parsed;
      }
    }
  } catch (e) {}

  function saveCurrentScroll() {
    try {
      const y = Math.round(window.scrollY);
      sessionStorage.setItem(pathKey, String(y));
      sessionStorage.setItem('8bit_last_scroll_y', String(y));
    } catch (e) {}
  }

  window.addEventListener('scroll', saveCurrentScroll, { passive: true });
  window.addEventListener('pagehide', saveCurrentScroll);
  window.addEventListener('beforeunload', saveCurrentScroll);

  // Restore scroll position early if user was scrolled down before refresh
  if (savedScrollY !== null && savedScrollY > 0) {
    window.scrollTo(0, savedScrollY);
    // Prevent browser auto-scroll reset to top
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }

  // === 2. TEMPLATE HTML FOR PRELOADER (AUTO-MOUNT FALLBACK) ===
  const PRELOADER_HTML = `
  <div class="preloader-concept-telemetry" id="concept1Wrap">
    <!-- Top Half Shutter (0 - 50.1vh) -->
    <div class="telemetry-shutter telemetry-shutter-top" id="telemetryShutterTop">
      <div class="telemetry-canvas telemetry-canvas-top">
        <div class="telemetry-header">
          <div>EST. 2018 &bull; MUMBAI, INDIA</div>
        </div>
        <div class="telemetry-center">
          <div class="telemetry-logo-emblem">
            <img src="images-for-landing-page/logo_2.webp" alt="8Bit Logo" width="130" height="34" decoding="async">
          </div>
          <div class="telemetry-cycle-wrapper">
            <div class="telemetry-cycle-words">
              <div class="telemetry-cycle-item">Waking up the internet...</div>
              <div class="telemetry-cycle-item">Telling creators to touch grass...</div>
              <div class="telemetry-cycle-item">Cooking unskippable moments...</div>
              <div class="telemetry-cycle-item">Going live right now...</div>
              <div class="telemetry-cycle-item telemetry-cycle-wordmark"><span class="wordmark-bold">8BIT</span><span class="wordmark-thin">Creatives</span></div>
            </div>
          </div>
          <div class="telemetry-progress-rail">
            <div class="telemetry-progress-fill"></div>
          </div>
        </div>
        <div class="telemetry-footer">
          <div class="telemetry-counter-block">
            <div class="telemetry-counter-num">00</div>
            <div class="telemetry-counter-unit">%</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Bottom Half Shutter (50.1vh - 100vh) -->
    <div class="telemetry-shutter telemetry-shutter-bottom" id="telemetryShutterBottom">
      <div class="telemetry-canvas telemetry-canvas-bottom">
        <div class="telemetry-header">
          <div>EST. 2018 &bull; MUMBAI, INDIA</div>
        </div>
        <div class="telemetry-center">
          <div class="telemetry-logo-emblem">
            <img src="images-for-landing-page/logo_2.webp" alt="8Bit Logo" width="130" height="34" decoding="async">
          </div>
          <div class="telemetry-cycle-wrapper">
            <div class="telemetry-cycle-words">
              <div class="telemetry-cycle-item">Waking up the internet...</div>
              <div class="telemetry-cycle-item">Telling creators to touch grass...</div>
              <div class="telemetry-cycle-item">Cooking unskippable moments...</div>
              <div class="telemetry-cycle-item">Going live right now...</div>
              <div class="telemetry-cycle-item telemetry-cycle-wordmark"><span class="wordmark-bold">8BIT</span><span class="wordmark-thin">Creatives</span></div>
            </div>
          </div>
          <div class="telemetry-progress-rail">
            <div class="telemetry-progress-fill"></div>
          </div>
        </div>
        <div class="telemetry-footer">
          <div class="telemetry-counter-block">
            <div class="telemetry-counter-num">00</div>
            <div class="telemetry-counter-unit">%</div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  function ensurePreloaderMount() {
    let mount = document.getElementById('preloaderMount');
    if (!mount) {
      mount = document.createElement('div');
      mount.id = 'preloaderMount';
      mount.setAttribute('aria-live', 'polite');
      mount.innerHTML = PRELOADER_HTML;
      if (document.body) {
        document.body.insertBefore(mount, document.body.firstChild);
        document.body.classList.add('is-loading');
      }
    }
    return mount;
  }

  // === 3. PRELOADER CONTROLLER & ASSET MONITOR ===
  function initPreloader() {
    // Accessibility check: Skip animation if reduced motion preferred
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      const existing = document.getElementById('preloaderMount');
      if (existing) {
        existing.classList.add('is-hidden');
        existing.style.display = 'none';
      }
      document.body.classList.remove('is-loading');
      if (typeof window.__triggerHeroEntrance === 'function' && window.scrollY < 120) {
        window.__triggerHeroEntrance();
      }
      return;
    }

    const mount = ensurePreloaderMount();
    const wrap = mount.querySelector('.preloader-concept-telemetry') || document.getElementById('concept1Wrap');
    if (!wrap) return;

    // Scroll prevention during preloader display without overflow:hidden
    function preventDefaultScroll(e) {
      e.preventDefault();
    }
    window.addEventListener('wheel', preventDefaultScroll, { passive: false });
    window.addEventListener('touchmove', preventDefaultScroll, { passive: false });

    // Ensure scroll position is pinned at saved location during preloader
    if (savedScrollY !== null && savedScrollY > 0) {
      window.scrollTo(0, savedScrollY);
      requestAnimationFrame(() => window.scrollTo(0, savedScrollY));
    }

    const counterEls = wrap.querySelectorAll('.telemetry-counter-num');
    const railFillEls = wrap.querySelectorAll('.telemetry-progress-fill');
    const wordsEls = wrap.querySelectorAll('.telemetry-cycle-words');

    const phases = [
      { at: 0,  wordIdx: 0 },
      { at: 25, wordIdx: 1 },
      { at: 55, wordIdx: 2 },
      { at: 80, wordIdx: 3 },
      { at: 96, wordIdx: 4 }
    ];

    let currentPct = 0;
    let targetPct = 0;
    let isFinished = false;
    let rafId = null;

    function applyPct(pct) {
      const cleanPct = Math.min(100, Math.max(0, Math.round(pct)));
      const formatted = cleanPct.toString().padStart(2, '0');
      counterEls.forEach(el => { el.textContent = formatted; });
      railFillEls.forEach(el => { el.style.width = cleanPct + '%'; });

      for (let i = phases.length - 1; i >= 0; i--) {
        if (cleanPct >= phases[i].at) {
          const offset = phases[i].wordIdx * 48;
          wordsEls.forEach(el => { el.style.transform = `translateY(-${offset}px)`; });
          break;
        }
      }
    }

    // Static parameter support for visual tests
    try {
      const params = new URLSearchParams(window.location.search);
      const splitParam = params.get('split');
      const freezeParam = params.get('freeze');

      if (splitParam !== null) {
        const splitPct = parseInt(splitParam, 10) || 50;
        wordsEls.forEach(el => { el.style.transition = 'none'; });
        applyPct(100);
        const sTop = document.getElementById('telemetryShutterTop');
        const sBottom = document.getElementById('telemetryShutterBottom');
        if (sTop && sBottom) {
          sTop.style.transition = 'none';
          sBottom.style.transition = 'none';
          sTop.style.transform = `translate3d(0, -${splitPct}%, 0)`;
          sBottom.style.transform = `translate3d(0, ${splitPct}%, 0)`;
        }
        document.body.classList.remove('is-loading');
        window.removeEventListener('wheel', preventDefaultScroll);
        window.removeEventListener('touchmove', preventDefaultScroll);
        if (typeof window.__triggerHeroEntrance === 'function' && window.scrollY < 120) {
          window.__triggerHeroEntrance();
        }
        return;
      }

      if (freezeParam !== null) {
        const pct = parseInt(freezeParam, 10);
        wordsEls.forEach(el => { el.style.transition = 'none'; });
        applyPct(pct);
        return;
      }
    } catch (e) {}

    // === 4. ACTIVE ASSET DISCOVERY & BACKGROUND DECODING ===
    // Gathers actual images on the current page to track download and GPU decompression
    const criticalImages = [
      'images-for-landing-page/logo_2.webp',
      'images-for-landing-page/footer-logo.webp',
      'images-for-landing-page/s8ul-logo.webp'
    ];

    if (document.getElementById('hero') || document.querySelector('.hero-monument')) {
      criticalImages.push('images-for-landing-page/hero-monument-bg-v2.webp');
    }

    // Extract all image URLs present on the current page DOM
    const domImages = Array.from(document.querySelectorAll('img')).map(img => img.src || img.getAttribute('src')).filter(Boolean);
    const dataImages = Array.from(document.querySelectorAll('[data-image], [data-bg-img]'))
      .map(el => el.getAttribute('data-image') || el.getAttribute('data-bg-img'))
      .filter(Boolean);

    const allAssetUrls = Array.from(new Set([...criticalImages, ...domImages, ...dataImages]));

    // Total units of work: assets + fonts ready + DOM complete
    const totalAssets = allAssetUrls.length;
    let completedAssets = 0;
    const fontWeight = 2;
    const domWeight = 2;
    const totalWeight = Math.max(1, totalAssets + fontWeight + domWeight);
    let completedWeight = 0;

    function recordProgress() {
      const ratio = Math.min(1, completedWeight / totalWeight);
      const computedPct = Math.min(100, Math.max(0, Math.floor(ratio * 100)));
      if (computedPct > targetPct) {
        targetPct = computedPct;
      }
    }

    // Preload & Pre-decode Image into GPU cache
    allAssetUrls.forEach(src => {
      const img = new Image();
      img.decoding = 'async';
      const onDone = () => {
        completedAssets++;
        completedWeight += 1;
        recordProgress();
      };

      img.onload = () => {
        if (img.decode) {
          img.decode().then(onDone).catch(onDone);
        } else {
          onDone();
        }
      };
      img.onerror = onDone; // Count errors to prevent hanging
      img.src = src;

      if (img.complete) {
        if (img.decode) {
          img.decode().then(onDone).catch(onDone);
        } else {
          onDone();
        }
      }
    });

    // Font ready tracking
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        completedWeight += fontWeight;
        recordProgress();
      }).catch(() => {
        completedWeight += fontWeight;
        recordProgress();
      });
    } else {
      completedWeight += fontWeight;
      recordProgress();
    }

    // DOM ready tracking
    if (document.readyState === 'complete') {
      completedWeight += domWeight;
      recordProgress();
    } else {
      window.addEventListener('load', () => {
        completedWeight += domWeight;
        recordProgress();
      }, { once: true });
    }

    // Safety timeout: Maximum 4.5 seconds on very slow mobile networks
    const maxSafetyTimer = setTimeout(() => {
      targetPct = 100;
    }, 6000);

    function finish() {
      if (isFinished) return;
      isFinished = true;
      clearTimeout(maxSafetyTimer);
      if (rafId) cancelAnimationFrame(rafId);
      applyPct(100);

      // Remove scroll blockers immediately
      window.removeEventListener('wheel', preventDefaultScroll);
      window.removeEventListener('touchmove', preventDefaultScroll);

      // Re-affirm saved scroll position so the user stays exactly where they were
      if (savedScrollY !== null && savedScrollY > 0) {
        window.scrollTo(0, savedScrollY);
      }

      setTimeout(() => {
        wrap.classList.add('is-unveiling');
        document.body.classList.remove('is-loading');

        // Only trigger hero entrance if user is at the top of landing page
        const isAtHeroTop = (!savedScrollY || savedScrollY < 120) && window.scrollY < 120;
        if (isAtHeroTop && typeof window.__triggerHeroEntrance === 'function') {
          window.__triggerHeroEntrance();
        }

        // Trigger about stats animation immediately if user lands or refreshes on about section
        if (typeof window.__triggerStatsAnimation === 'function') {
          const statsSection = document.querySelector('.about-stats');
          if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              window.__triggerStatsAnimation();
            }
          }
        }

        setTimeout(() => {
          mount.classList.add('is-hidden');
          mount.style.display = 'none';
          mount.setAttribute('aria-hidden', 'true');
        }, 1250);
      }, 200);
    }

    // Smooth monotonic counter tick
    const startTime = performance.now();
    const minShowTime = 3000; // Minimum smooth progression feel

    function tick(now) {
      if (isFinished) return;

      const elapsed = now - startTime;
      const timeRatio = Math.min(1, elapsed / minShowTime);
      const pacedCap = Math.floor(timeRatio * 100);

      // Effective progress is capped by pacedCap to guarantee at least 3.0s duration on fast devices,
      // while on slower networks, targetPct holds it accurately until assets finish:
      const effectivePct = Math.min(targetPct, pacedCap);

      if (effectivePct > currentPct) {
        const step = Math.max(1, Math.ceil((effectivePct - currentPct) * 0.22));
        currentPct = Math.min(effectivePct, currentPct + step);
        applyPct(currentPct);
      } else if (currentPct === 0) {
        applyPct(0);
      }

      // Complete when all assets ready (targetPct >= 100), visual counter reached 100, and 3s has elapsed
      if (targetPct >= 100 && currentPct >= 100 && elapsed >= minShowTime) {
        finish();
      } else {
        rafId = requestAnimationFrame(tick);
      }
    }

    rafId = requestAnimationFrame(tick);

    // Fast skip controls: tap or Space/Esc key
    mount.addEventListener('click', finish);
    const onKey = (e) => {
      if (e.code === 'Space' || e.code === 'Escape') {
        window.removeEventListener('keydown', onKey);
        finish();
      }
    };
    window.addEventListener('keydown', onKey);
  }

  window.initSitePreloader = initPreloader;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreloader);
  } else {
    initPreloader();
  }
})();
