/**
 * 8Bit Creatives — navbar.js
 * Smooth sliding active indicator for navbar-pill
 * Animates with ~300ms cubic-bezier(0.4, 0, 0.2, 1) transition between links
 */
(function () {
  'use strict';

  function initNavbarIndicator() {
    const navbar = document.querySelector('.navbar-pill') || document.querySelector('.navbar');
    if (!navbar) return;

    const linksContainer = navbar.querySelector('.navbar__links');
    if (!linksContainer) return;

    const links = Array.from(linksContainer.querySelectorAll('a'));
    if (!links.length) return;

    // Find or create the indicator element inside navbar-pill
    let indicator = navbar.querySelector('.navbar-pill__indicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'navbar-pill__indicator';
      indicator.setAttribute('aria-hidden', 'true');
      navbar.insertBefore(indicator, navbar.firstChild);
    }

    let currentActive = linksContainer.querySelector('a.is-active') || links[0];
    let isHovering = false;
    let isClickScrolling = false;
    let clickScrollTimer = null;

    function moveIndicator(targetLink, isInstant) {
      if (!targetLink || !indicator || !navbar) return;

      // Guarantee targetLink has is-active so its text is always pure #FFFFFF white
      if (!targetLink.classList.contains('is-active')) {
        links.forEach(l => {
          if (l !== targetLink) l.classList.remove('is-active');
        });
        targetLink.classList.add('is-active');
      }

      const navRect = navbar.getBoundingClientRect();
      const linkRect = targetLink.getBoundingClientRect();

      // Bail if element is hidden or not rendered
      if (linkRect.width === 0 || navRect.width === 0) return;

      const isMobile = window.innerWidth <= 767;
      const padX = isMobile ? 10 : 24;
      const width = Math.round(linkRect.width + padX);
      const x = Math.round((linkRect.left - navRect.left) - (padX / 2));
      const height = isMobile ? 28 : Math.round(linkRect.height + 12);

      if (isInstant) {
        indicator.style.setProperty('transition', 'none', 'important');
        indicator.style.setProperty('width', width + 'px', 'important');
        indicator.style.setProperty('height', height + 'px', 'important');
        indicator.style.setProperty('transform', 'translate3d(' + x + 'px, -50%, 0)', 'important');
        indicator.style.setProperty('opacity', '1', 'important');
        void indicator.offsetHeight; // Force reflow
        indicator.style.removeProperty('transition');
      } else {
        indicator.style.setProperty('width', width + 'px', 'important');
        indicator.style.setProperty('height', height + 'px', 'important');
        indicator.style.setProperty('transform', 'translate3d(' + x + 'px, -50%, 0)', 'important');
        indicator.style.setProperty('opacity', '1', 'important');
      }
    }

    window.updateNavbarIndicator = function (targetLink, isInstant) {
      if (isClickScrolling || window.__isSmoothScrolling) return;
      if (targetLink) {
        currentActive = targetLink;
      }
      if (!isHovering) {
        moveIndicator(currentActive, isInstant);
      }
    };

    // Click listeners on each nav link — indicator stays rock-solid on active link
    links.forEach(link => {
      link.addEventListener('click', () => {
        isClickScrolling = true;
        clearTimeout(clickScrollTimer);
        links.forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');
        currentActive = link;
        moveIndicator(link, false);
        clickScrollTimer = setTimeout(() => {
          isClickScrolling = false;
        }, 1000);

        // Record target section so navigation from subpages jumps directly to the section
        const href = link.getAttribute('href') || '';
        const dataSec = link.getAttribute('data-section') || '';
        let targetSec = dataSec;
        if (!targetSec && href.indexOf('#') !== -1) {
          targetSec = href.split('#')[1];
        }
        if (targetSec === 'hero') targetSec = 'home';
        if (targetSec) {
          try {
            sessionStorage.setItem('8bit_nav_target', targetSec);
          } catch (err) {}
        }
      });
    });

    // Mobile drawer link listeners
    const mobileLinks = document.querySelectorAll('.navbar__mobile-drawer a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        const href = link.getAttribute('href') || '';
        const dataSec = link.getAttribute('data-section') || '';
        let targetSec = dataSec;
        if (!targetSec && href.indexOf('#') !== -1) {
          targetSec = href.split('#')[1];
        }
        if (targetSec === 'hero') targetSec = 'home';
        if (targetSec) {
          try {
            sessionStorage.setItem('8bit_nav_target', targetSec);
          } catch (err) {}
        }
      });
    });

    // Observe class attribute changes (e.g. scroll spy in app.js)
    if (window.MutationObserver) {
      const observer = new MutationObserver(() => {
        if (!isHovering && !isClickScrolling) {
          const activeLink = linksContainer.querySelector('a.is-active');
          if (activeLink && activeLink !== currentActive) {
            currentActive = activeLink;
            moveIndicator(currentActive, false);
          } else if (!activeLink && currentActive) {
            // Restore is-active to currentActive immediately so text never falls back to black
            currentActive.classList.add('is-active');
            moveIndicator(currentActive, false);
          }
        }
      });

      links.forEach(link => {
        observer.observe(link, { attributes: true, attributeFilter: ['class'] });
      });
    }

    // Initial position
    function placeInitial() {
      const activeLink = linksContainer.querySelector('a.is-active') || links[0];
      if (activeLink) {
        if (!activeLink.classList.contains('is-active')) {
          activeLink.classList.add('is-active');
        }
        currentActive = activeLink;
        moveIndicator(currentActive, true);
      }
    }

    placeInitial();
    requestAnimationFrame(placeInitial);
    setTimeout(placeInitial, 60);
    setTimeout(placeInitial, 200);

    window.addEventListener('resize', () => {
      const activeLink = linksContainer.querySelector('a.is-active') || currentActive;
      moveIndicator(activeLink, true);
    }, { passive: true });

    linksContainer.addEventListener('scroll', () => {
      const activeLink = linksContainer.querySelector('a.is-active') || currentActive;
      moveIndicator(activeLink, true);
    }, { passive: true });

    window.addEventListener('hashchange', () => {
      const hash = (window.location.hash || '').replace('#', '');
      const match = links.find(l => {
        const sec = l.getAttribute('data-section') || (l.getAttribute('href') || '').split('#')[1];
        return sec === hash;
      });
      if (match) {
        links.forEach(l => l.classList.remove('is-active'));
        match.classList.add('is-active');
        currentActive = match;
        moveIndicator(currentActive, false);
      }
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        const activeLink = linksContainer.querySelector('a.is-active') || currentActive;
        moveIndicator(activeLink, true);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbarIndicator);
  } else {
    initNavbarIndicator();
  }
})();
