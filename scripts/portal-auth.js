/**
 * 8Bit Creatives — Central Security & Authentication Engine
 * Cryptographic SHA-256 Key Exchange & Session Management
 * Confidential & Proprietary — S8UL / 8Bit Creatives
 */

(function (window) {
  'use strict';

  // 1. One-Way Cryptographic Hashes (SHA-256) of Authorized Security Keys
  // Plain text keys are never stored in client code.
  const VAULT_HASHES = {
    ops: '807242df0cf31761e38c220311ea3d6141b8650d443de6242b5f8d5b166c04fd',      
    brand: '2bad5314304440de4459bade195b9179b95fc3759119e47b6fa4a2dada3b303b',    
    creator: 'f6fa1b12208a7683bc02b7583505945c4ebb2236049d59019477139a26e4914f',  
    platform: 'f9d628632ab2debef879a85833c2fc129a7ff13a48ab730235983291f9356a7e', 
    master: '12cc0d13670c1e00c82cd36b3cab57eb1203fecb1f20cc0925d9029a7eae7b86'    
  };

  const PORTAL_META = {
    ops: {
      id: 'ops',
      name: '8Bit Insider Operations',
      subtitle: 'Core Agency Management & Operations',
      url: '/ops',
      roleBadge: 'Admin · Ops Lead',
      accentColor: '#3b82f6',
      icon: 'terminal'
    },
    brand: {
      id: 'brand',
      name: 'Brand Partner Portal',
      subtitle: 'Brand Telemetry & Deliverable Sign-offs',
      url: '/brand-dashboard',
      roleBadge: 'Verified Brand Partner',
      accentColor: '#eab308',
      icon: 'briefcase'
    },
    creator: {
      id: 'creator',
      name: 'Creator Talent Portal',
      subtitle: 'Creator Workspace & Payment Schedules',
      url: '/creator-dashboard',
      roleBadge: 'Exclusive Talent · Mortal',
      accentColor: '#22c55e',
      icon: 'sparkles'
    },
    platform: {
      id: 'platform',
      name: 'Platform Partnership Portal',
      subtitle: 'Streaming Partner Telemetry & Ingest',
      url: '/platform-dashboard',
      roleBadge: 'Platform Partner · Kick',
      accentColor: '#a855f7',
      icon: 'radio'
    },
    master: {
      id: 'master',
      name: '8Bit Executive Command Vault',
      subtitle: 'Unrestricted Omnipresent Access',
      url: '/ops',
      roleBadge: 'Executive Admin · Master',
      accentColor: '#ffffff',
      icon: 'shield'
    }
  };

  const STORAGE_KEY = '8bit_portal_auth_session';
  const ATTEMPTS_KEY = '8bit_portal_auth_attempts';

  /**
   * Compute standard SHA-256 hexadecimal hash using Web Crypto API
   */
  async function computeSHA256(text) {
    const raw = String(text || '').trim();
    const encoder = new TextEncoder();
    const data = encoder.encode(raw);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Get active session from either localStorage or sessionStorage
   */
  function getSession() {
    try {
      let raw = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const session = JSON.parse(raw);
      if (!session || !session.expiresAt) return null;
      if (Date.now() > session.expiresAt) {
        clearSession();
        return null;
      }
      return session;
    } catch (e) {
      console.warn('[8Bit Auth] Session read error:', e);
      return null;
    }
  }

  /**
   * Store active session
   */
  function saveSession(session, rememberMe = true) {
    try {
      const serialized = JSON.stringify(session);
      if (rememberMe) {
        localStorage.setItem(STORAGE_KEY, serialized);
        sessionStorage.removeItem(STORAGE_KEY);
      } else {
        sessionStorage.setItem(STORAGE_KEY, serialized);
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn('[8Bit Auth] Session save error:', e);
    }
  }

  /**
   * Clear session
   */
  function clearSession() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  /**
   * Brute-force rate limiting check
   */
  function checkRateLimit() {
    try {
      const raw = sessionStorage.getItem(ATTEMPTS_KEY);
      if (!raw) return { locked: false, remaining: 0 };
      const data = JSON.parse(raw);
      if (data.lockedUntil && Date.now() < data.lockedUntil) {
        const remainingSec = Math.ceil((data.lockedUntil - Date.now()) / 1000);
        return { locked: true, remaining: remainingSec };
      }
      return { locked: false, count: data.count || 0 };
    } catch (e) {
      return { locked: false, count: 0 };
    }
  }

  function recordFailedAttempt() {
    try {
      const state = checkRateLimit();
      const newCount = (state.count || 0) + 1;
      let lockedUntil = null;
      if (newCount >= 5) {
        lockedUntil = Date.now() + 30000; // 30 second cooldown
      }
      sessionStorage.setItem(ATTEMPTS_KEY, JSON.stringify({ count: newCount, lockedUntil }));
    } catch (e) {}
  }

  function resetFailedAttempts() {
    try {
      sessionStorage.removeItem(ATTEMPTS_KEY);
    } catch (e) {}
  }

  /**
   * Authenticate an entered security key against the hash database
   */
  async function authenticateKey(key, rememberMe = true) {
    const rateLimit = checkRateLimit();
    if (rateLimit.locked) {
      return {
        success: false,
        rateLimited: true,
        message: `Too many failed attempts. Security lockout active for ${rateLimit.remaining}s.`
      };
    }

    if (!key || !key.trim()) {
      return { success: false, message: 'Please provide a valid security key.' };
    }

    const hashedInput = await computeSHA256(key);
    let matchedRole = null;

    for (const [role, hash] of Object.entries(VAULT_HASHES)) {
      if (hashedInput === hash) {
        matchedRole = role;
        break;
      }
    }

    if (!matchedRole) {
      recordFailedAttempt();
      const current = checkRateLimit();
      if (current.locked) {
        return {
          success: false,
          rateLimited: true,
          message: `Access denied. 5 incorrect attempts. Terminal locked for 30s.`
        };
      }
      return {
        success: false,
        message: 'Invalid security key. Access denied.'
      };
    }

    resetFailedAttempts();

    const portalMeta = PORTAL_META[matchedRole];
    const session = {
      role: matchedRole,
      roleName: portalMeta.name,
      roleBadge: portalMeta.roleBadge,
      targetUrl: portalMeta.url,
      timestamp: Date.now(),
      expiresAt: Date.now() + (rememberMe ? 7 * 86400000 : 24 * 3600000), // 7 days or 24 hours
      sessionToken: '8bit_' + Math.random().toString(36).substring(2) + '_' + Date.now().toString(36)
    };

    saveSession(session, rememberMe);

    return {
      success: true,
      role: matchedRole,
      meta: portalMeta,
      session
    };
  }

  /**
   * Verify if current session authorizes access to a given portal role
   */
  function isAuthorized(requiredRole) {
    const session = getSession();
    if (!session) return false;
    if (session.role === 'master') return true;
    if (session.role === requiredRole) return true;
    return false;
  }

  /**
   * Log out and redirect
   */
  function logout(redirectUrl = '/portal') {
    clearSession();
    window.location.href = redirectUrl;
  }

  /**
   * Mount in-portal security gate overlay & session bar on protected pages
   */
  function mountSecurityGate(config) {
    const requiredRole = config.role;
    const portalName = config.name || PORTAL_META[requiredRole].name;
    const portalSubtitle = config.subtitle || PORTAL_META[requiredRole].subtitle;

    // Check authorization immediately
    if (isAuthorized(requiredRole)) {
      document.body.classList.add('authenticated');
      const existingGate = document.getElementById('auth-lock-overlay');
      if (existingGate) existingGate.remove();
      setupTopbarUser(requiredRole);
      return;
    }

    // Otherwise render lock screen
    renderLockOverlay(requiredRole, portalName, portalSubtitle);
  }

  function setupTopbarUser(role) {
    const session = getSession();
    const roleBadgeText = session ? session.roleBadge : (PORTAL_META[role] ? PORTAL_META[role].roleBadge : 'Authenticated');
    
    // Find or create topbar actions container
    const topbarActions = document.querySelector('.topbar-actions') || document.querySelector('.topbar');
    if (!topbarActions) return;

    let userContainer = document.querySelector('.topbar-user');
    if (!userContainer) {
      userContainer = document.createElement('div');
      userContainer.className = 'topbar-user';
      topbarActions.appendChild(userContainer);
    }

    // Enhance topbar user badge & add logout button
    userContainer.innerHTML = `
      <div class="user-badge admin" style="display: inline-flex; align-items: center; gap: 8px;">
        <span>${roleBadgeText}</span>
      </div>
      <button id="btn-topbar-logout" class="btn" style="padding: 6px 12px; font-size: 11px; display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #ffffff; cursor: pointer; border-radius: 6px; transition: background 150ms ease;">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        <span>Lock / Logout</span>
      </button>
    `;

    const logoutBtn = document.getElementById('btn-topbar-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        logout('/portal');
      });
    }
  }

  function renderLockOverlay(requiredRole, portalName, portalSubtitle) {
    let overlay = document.getElementById('auth-lock-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'auth-lock-overlay';
      document.body.prepend(overlay);
    }

    overlay.innerHTML = `
      <div class="lock-backdrop"></div>
      <div class="lock-dialog">
        <div class="lock-header">
          <div class="lock-logo-row">
            <img src="images-for-landing-page/logo_2.png" alt="8Bit Creatives" class="lock-logo">
            <span class="lock-badge">SECURE TERMINAL</span>
          </div>
          <h2 class="lock-title">Restricted Access Portal</h2>
          <div class="lock-portal-name">${portalName}</div>
          <p class="lock-sub">${portalSubtitle}</p>
        </div>

        <form id="lock-form" class="lock-form">
          <div class="lock-field-group">
            <label class="lock-label">SECURITY KEY / ACCESS PASSPHRASE</label>
            <div class="lock-input-wrap">
              <input type="password" id="lock-key-input" class="lock-input" placeholder="Enter 8Bit Security Key..." autocomplete="off" autofocus>
              <button type="button" id="lock-toggle-eye" class="lock-eye-btn" title="Toggle visibility">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
            </div>
            <div id="lock-error-msg" class="lock-error"></div>
          </div>

          <div class="lock-row">
            <label class="lock-checkbox-label">
              <input type="checkbox" id="lock-remember">
              <span>Keep unlocked on this device</span>
            </label>
          </div>

          <button type="submit" id="lock-submit-btn" class="lock-btn-submit">
            <span class="btn-text">Authenticate &amp; Decrypt Terminal</span>
            <span class="btn-loader" style="display: none;">Verifying...</span>
          </button>

          <div class="lock-footer-row">
            <a href="/portal" class="lock-portal-link">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
              Central Access Gateway
            </a>
            <span class="lock-compliance">256-Bit SHA Encrypted</span>
          </div>
        </form>
      </div>
    `;

    // Add styles if not already injected
    if (!document.getElementById('auth-lock-styles')) {
      const style = document.createElement('style');
      style.id = 'auth-lock-styles';
      style.textContent = `
        body:not(.authenticated) > :not(#auth-lock-overlay) {
          filter: blur(20px) brightness(0.2) !important;
          pointer-events: none !important;
          user-select: none !important;
        }
        #auth-lock-overlay {
          position: fixed;
          inset: 0;
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Geist', -apple-system, sans-serif;
        }
        .lock-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(7, 7, 7, 0.94);
          backdrop-filter: blur(30px);
          background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .lock-dialog {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 440px;
          background: #111111;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          padding: 32px 28px;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05);
          animation: lockFadeUp 250ms ease-out forwards;
        }
        @keyframes lockFadeUp {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .lock-header {
          text-align: center;
          margin-bottom: 24px;
        }
        .lock-logo-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .lock-logo {
          height: 30px;
          width: auto;
          object-fit: contain;
        }
        .lock-badge {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 3px 8px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }
        .lock-title {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 6px;
        }
        .lock-portal-name {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .lock-sub {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.4;
        }
        .lock-field-group {
          margin-bottom: 16px;
        }
        .lock-label {
          display: block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 8px;
        }
        .lock-input-wrap {
          position: relative;
        }
        .lock-input {
          width: 100%;
          background: #181818;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          padding: 12px 40px 12px 14px;
          font-size: 13px;
          color: #ffffff;
          font-family: inherit;
          transition: border-color 150ms ease, box-shadow 150ms ease;
          box-sizing: border-box;
        }
        .lock-input:focus {
          outline: none;
          border-color: #ffffff;
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
        }
        .lock-eye-btn {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lock-eye-btn:hover { color: #ffffff; }
        .lock-error {
          font-size: 11px;
          color: #ef4444;
          margin-top: 6px;
          min-height: 16px;
        }
        .lock-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .lock-checkbox-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
        }
        .lock-btn-submit {
          width: 100%;
          background: #ffffff;
          color: #0a0a0a;
          border: none;
          border-radius: 8px;
          padding: 12px 16px;
          font-size: 13px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: background 150ms ease, transform 100ms ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lock-btn-submit:hover {
          background: #e5e5e5;
        }
        .lock-btn-submit:active {
          transform: scale(0.99);
        }
        .lock-footer-row {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .lock-portal-link {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: color 150ms ease;
        }
        .lock-portal-link:hover { color: #ffffff; }
        .lock-compliance {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.35);
          letter-spacing: 0.05em;
        }
        .lock-shake {
          animation: shakeCard 350ms cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shakeCard {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `;
      document.head.appendChild(style);
    }

    // Attach event listeners
    const form = document.getElementById('lock-form');
    const input = document.getElementById('lock-key-input');
    const eyeBtn = document.getElementById('lock-toggle-eye');
    const rememberBox = document.getElementById('lock-remember');
    const errorMsg = document.getElementById('lock-error-msg');
    const submitBtn = document.getElementById('lock-submit-btn');
    const dialog = overlay.querySelector('.lock-dialog');

    if (eyeBtn) {
      eyeBtn.addEventListener('click', () => {
        const isPwd = input.type === 'password';
        input.type = isPwd ? 'text' : 'password';
      });
    }

    async function handleUnlock() {
      const key = input.value.trim();
      if (!key) {
        errorMsg.textContent = 'Please enter your assigned security key.';
        input.focus();
        return;
      }

      errorMsg.textContent = '';
      submitBtn.querySelector('.btn-text').style.display = 'none';
      submitBtn.querySelector('.btn-loader').style.display = 'inline';
      submitBtn.disabled = true;

      const res = await authenticateKey(key, rememberBox.checked);

      submitBtn.querySelector('.btn-text').style.display = 'inline';
      submitBtn.querySelector('.btn-loader').style.display = 'none';
      submitBtn.disabled = false;

      if (!res.success) {
        errorMsg.textContent = res.message;
        dialog.classList.remove('lock-shake');
        void dialog.offsetWidth; // retrigger reflow
        dialog.classList.add('lock-shake');
        input.focus();
        return;
      }

      // If authorized for this specific portal OR master key
      if (res.role === requiredRole || res.role === 'master') {
        overlay.style.transition = 'opacity 200ms ease, transform 200ms ease';
        overlay.style.opacity = '0';
        overlay.style.transform = 'scale(1.02)';
        setTimeout(() => {
          overlay.remove();
          document.body.classList.add('authenticated');
          setupTopbarUser(requiredRole);
        }, 200);
      } else {
        // Key is valid, but belongs to another portal! Offer quick redirection.
        const otherPortal = PORTAL_META[res.role];
        errorMsg.innerHTML = `Valid key for <strong>${otherPortal.name}</strong>. Redirecting...`;
        setTimeout(() => {
          window.location.href = otherPortal.url;
        }, 800);
      }
    }

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleUnlock();
        }
      });
    }
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleUnlock();
      });
    }
  }

  // Export 8Bit Auth API
  window.logout = logout;
  window.EightBitAuth = {
    computeSHA256,
    getSession,
    saveSession,
    clearSession,
    authenticateKey,
    isAuthorized,
    logout,
    mountSecurityGate,
    PORTALS: PORTAL_META,
    HASHES: VAULT_HASHES
  };

})(window);
