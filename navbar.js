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
      if (window.innerWidth <= 768) return; // Hidden on mobile

      const navRect = navbar.getBoundingClientRect();
      const linkRect = targetLink.getBoundingClientRect();

      // Bail if element is hidden or not rendered
      if (linkRect.width === 0 || navRect.width === 0) return;

      const width = Math.round(linkRect.width + 24);
      const x = Math.round((linkRect.left - navRect.left) - 12);
      const height = Math.round(linkRect.height + 12);

      if (isInstant) {
        indicator.style.transition = 'none';
        indicator.style.width = width + 'px';
        indicator.style.height = height + 'px';
        indicator.style.transform = 'translate3d(' + x + 'px, -50%, 0)';
        indicator.style.opacity = '1';
        void indicator.offsetHeight; // Force reflow
        indicator.style.transition = '';
      } else {
        indicator.style.width = width + 'px';
        indicator.style.height = height + 'px';
        indicator.style.transform = 'translate3d(' + x + 'px, -50%, 0)';
        indicator.style.opacity = '1';
      }
    }

    window.updateNavbarIndicator = function (targetLink, isInstant) {
      if (isClickScrolling) return;
      if (targetLink) {
        currentActive = targetLink;
      }
      if (!isHovering) {
        moveIndicator(currentActive, isInstant);
      }
    };

    // Hover & click listeners on each nav link
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        isHovering = true;
        moveIndicator(link, false);
      });

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
      });
    });

    linksContainer.addEventListener('mouseleave', () => {
      isHovering = false;
      const activeLink = linksContainer.querySelector('a.is-active') || currentActive;
      if (activeLink) {
        currentActive = activeLink;
        moveIndicator(activeLink, false);
      }
    });

    // Observe class attribute changes (e.g. scroll spy in app.js)
    if (window.MutationObserver) {
      const observer = new MutationObserver(() => {
        if (!isHovering && !isClickScrolling) {
          const activeLink = linksContainer.querySelector('a.is-active');
          if (activeLink && activeLink !== currentActive) {
            currentActive = activeLink;
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
