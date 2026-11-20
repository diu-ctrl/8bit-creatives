/**
 * 8Bit Creatives — Dashboard Upgrades & Security Injection Script
 * Upgrades ops.html, brand-dashboard.html, creator-dashboard.html, platform-dashboard.html
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Common Toast CSS & Helper
const TOAST_CSS = `
<style id="toast-notification-styles">
  .toast-container {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 9999999;
    display: flex;
    flex-direction: column;
    gap: 10px;
    pointer-events: none;
    font-family: 'Geist', -apple-system, sans-serif;
  }
  .toast-item {
    background: #141414;
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #ffffff;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.7);
    border-radius: 8px;
    padding: 12px 18px;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 10px;
    pointer-events: auto;
    animation: toastSlideUp 200ms ease-out forwards;
    max-width: 380px;
  }
  .toast-item.success { border-color: rgba(34, 197, 94, 0.5); }
  .toast-item.error { border-color: rgba(239, 68, 68, 0.5); }
  .toast-item.info { border-color: rgba(59, 130, 246, 0.5); }
  .toast-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .toast-item.success .toast-dot { background: #22c55e; box-shadow: 0 0 8px #22c55e; }
  .toast-item.error .toast-dot { background: #ef4444; box-shadow: 0 0 8px #ef4444; }
  .toast-item.info .toast-dot { background: #3b82f6; box-shadow: 0 0 8px #3b82f6; }
  @keyframes toastSlideUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
`;

const TOAST_JS = `
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const item = document.createElement('div');
  item.className = 'toast-item ' + type;
  item.innerHTML = '<span class="toast-dot"></span><span>' + message + '</span>';
  container.appendChild(item);
  setTimeout(() => {
    item.style.transition = 'opacity 200ms ease, transform 200ms ease';
    item.style.opacity = '0';
    item.style.transform = 'translateY(8px)';
    setTimeout(() => item.remove(), 200);
  }, 3500);
}
`;

function ensureAuthInHead(html, role) {
  if (!html.includes('scripts/portal-auth.js')) {
    html = html.replace('</head>', `  <style id="auth-guard-style">
    body:not(.authenticated) > :not(#auth-lock-overlay) {
      display: none !important;
    }
  </style>
  <script src="scripts/portal-auth.js"></script>
</head>`);
  }
  return html;
}

// ==========================================
// 1. UPGRADE OPS.HTML
// ==========================================
console.log('Upgrading ops.html...');
let ops = fs.readFileSync(path.join(ROOT, 'ops.html'), 'utf-8');
ops = ensureAuthInHead(ops, 'ops');

// Inject Security Gate in ops.html if not present
if (!ops.includes("mountSecurityGate({ role: 'ops' })")) {
  const opsMountCode = `
${TOAST_CSS}
<script>
${TOAST_JS}

// Initialize Auth Gate for Ops Portal
document.addEventListener('DOMContentLoaded', function() {
  EightBitAuth.mountSecurityGate({ role: 'ops' });
});
</script>
`;
  ops = ops.replace('</body>', opsMountCode + '\n</body>');
}
fs.writeFileSync(path.join(ROOT, 'ops.html'), ops, 'utf-8');
console.log('ops.html checked.');

// ==========================================
// 2. UPGRADE BRAND-DASHBOARD.HTML
// ==========================================
console.log('Upgrading brand-dashboard.html...');
let brand = fs.readFileSync(path.join(ROOT, 'brand-dashboard.html'), 'utf-8');
brand = ensureAuthInHead(brand, 'brand');

const BRAND_MODALS_AND_SCRIPTS = `
${TOAST_CSS}

<!-- Modal: Brand Deliverable Review -->
<div id="modal-deliverable-review" class="modal-overlay" style="display: none; position: fixed; inset: 0; z-index: 99999; background: rgba(0,0,0,0.85); backdrop-filter: blur(20px); align-items: center; justify-content: center; padding: 20px;">
  <div style="background: #111111; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; width: 100%; max-width: 540px; padding: 32px; box-shadow: 0 24px 60px rgba(0,0,0,0.8); position: relative;">
    <button onclick="closeDeliverableModal()" style="position: absolute; top: 20px; right: 20px; background: transparent; border: none; color: var(--text-dim); cursor: pointer;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    
    <div style="font-size: 11px; font-weight: 700; color: var(--yellow); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px;">DELIVERABLE INSPECTION &amp; SIGN-OFF</div>
    <h3 id="del-modal-title" style="font-size: 20px; font-weight: 700; color: #ffffff; margin-bottom: 4px;">launch_stream_vod_v2.mp4</h3>
    <div id="del-modal-sub" style="font-size: 12px; color: var(--text-muted); margin-bottom: 20px;">Flagship Drop v2 &bull; Creator: Mortal &bull; Version: v2.1</div>

    <div style="background: var(--surface-2); border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px; margin-bottom: 20px;">
      <div style="font-size: 12px; color: var(--text-muted); line-height: 1.6;">
        <div>&bull; <strong>Resolution &amp; Format:</strong> 1080p 60fps (ProRes Master Cut)</div>
        <div>&bull; <strong>Video Duration:</strong> 14m 32s (Dedicated Benchmark Segment at 03:20)</div>
        <div>&bull; <strong>Brand Talking Points:</strong> 144Hz AMOLED Display, 120W Fast Charging &amp; BGMI 90FPS</div>
        <div>&bull; <strong>Drive Master:</strong> <a href="https://drive.google.com/drive/folders/1E6TSNzgO8nAjw0Db52ip7A0RPz7mYBQr" target="_blank" rel="noopener noreferrer" style="color: #ffffff; text-decoration: underline;">Open High-Res VOD Cut</a></div>
      </div>
    </div>

    <div style="margin-bottom: 20px;">
      <label style="display: block; font-size: 11px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Client Feedback / Revision Notes (Optional)</label>
      <textarea id="del-feedback-text" placeholder="Add specific notes, timestamp requests, or signoff approval comments..." style="width: 100%; height: 75px; background: #161616; border: 1px solid var(--border); border-radius: 8px; padding: 10px; font-size: 12px; color: #fff; font-family: inherit; resize: none;"></textarea>
    </div>

    <div style="display: flex; gap: 10px; justify-content: flex-end;">
      <button type="button" class="btn" onclick="submitDeliverableDecision('revision')" style="color: var(--yellow); border-color: rgba(234, 179, 8, 0.3);">Request Revisions</button>
      <button type="button" class="btn btn-accent" onclick="submitDeliverableDecision('approve')">&check; Approve Deliverable</button>
    </div>
  </div>
</div>

<!-- Modal: Brand Request Campaign -->
<div id="modal-brand-request" class="modal-overlay" style="display: none; position: fixed; inset: 0; z-index: 99999; background: rgba(0,0,0,0.85); backdrop-filter: blur(20px); align-items: center; justify-content: center; padding: 20px;">
  <div style="background: #111111; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; width: 100%; max-width: 520px; padding: 32px; box-shadow: 0 24px 60px rgba(0,0,0,0.8); position: relative;">
    <button onclick="closeBrandCampaignModal()" style="position: absolute; top: 20px; right: 20px; background: transparent; border: none; color: var(--text-dim); cursor: pointer;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    
    <div style="font-size: 11px; font-weight: 700; color: var(--green); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px;">NEW BRAND INTAKE</div>
    <h3 style="font-size: 20px; font-weight: 700; color: #ffffff; margin-bottom: 4px;">Request New Campaign / Talent</h3>
    <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 20px;">Submit requirements directly to the 8Bit Creatives talent operations desk.</div>

    <form onsubmit="handleBrandRequestSubmit(event)">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
        <div>
          <label style="display: block; font-size: 11px; color: var(--text-muted); margin-bottom: 6px;">Brand Name</label>
          <input type="text" class="form-input" value="iQOO India" required style="width: 100%; background: #161616; border: 1px solid var(--border); border-radius: 6px; padding: 8px 12px; color: #fff;">
        </div>
        <div>
          <label style="display: block; font-size: 11px; color: var(--text-muted); margin-bottom: 6px;">Campaign Name</label>
          <input type="text" class="form-input" placeholder="e.g. Q4 BGMI Championship" required style="width: 100%; background: #161616; border: 1px solid var(--border); border-radius: 6px; padding: 8px 12px; color: #fff;">
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
        <div>
          <label style="display: block; font-size: 11px; color: var(--text-muted); margin-bottom: 6px;">Desired Creators</label>
          <input type="text" class="form-input" placeholder="e.g. Mortal, Payal, Snax" required style="width: 100%; background: #161616; border: 1px solid var(--border); border-radius: 6px; padding: 8px 12px; color: #fff;">
        </div>
        <div>
          <label style="display: block; font-size: 11px; color: var(--text-muted); margin-bottom: 6px;">Budget Range</label>
          <select style="width: 100%; background: #161616; border: 1px solid var(--border); border-radius: 6px; padding: 8px 12px; color: #fff;">
            <option>₹10L - ₹25L</option>
            <option>₹25L - ₹50L</option>
            <option>₹50L - ₹1 Crore</option>
            <option>₹1 Crore+</option>
          </select>
        </div>
      </div>
      <div style="margin-bottom: 20px;">
        <label style="display: block; font-size: 11px; color: var(--text-muted); margin-bottom: 6px;">Brief Objective &amp; Requirements</label>
        <textarea placeholder="Describe deliverables, key messaging, and launch timelines..." required style="width: 100%; height: 75px; background: #161616; border: 1px solid var(--border); border-radius: 6px; padding: 10px; color: #fff; font-family: inherit; resize: none;"></textarea>
      </div>
      <div style="display: flex; gap: 10px; justify-content: flex-end;">
        <button type="button" class="btn" onclick="closeBrandCampaignModal()">Cancel</button>
        <button type="submit" class="btn btn-accent">Submit to 8Bit Ops &rarr;</button>
      </div>
    </form>
  </div>
</div>

<script>
${TOAST_JS}

function openDeliverableModal(name, campaign, creator, ver) {
  document.getElementById('del-modal-title').textContent = name;
  document.getElementById('del-modal-sub').textContent = campaign + ' • Creator: ' + creator + ' • Version: ' + ver;
  document.getElementById('del-feedback-text').value = '';
  document.getElementById('modal-deliverable-review').style.display = 'flex';
}

function closeDeliverableModal() {
  document.getElementById('modal-deliverable-review').style.display = 'none';
}

function submitDeliverableDecision(decision) {
  closeDeliverableModal();
  if (decision === 'approve') {
    showToast('Deliverable approved! Official sign-off recorded and notified to 8Bit Ops.', 'success');
  } else {
    showToast('Revision request sent to 8Bit talent manager and creator.', 'info');
  }
}

function openBrandCampaignModal() {
  document.getElementById('modal-brand-request').style.display = 'flex';
}

function closeBrandCampaignModal() {
  document.getElementById('modal-brand-request').style.display = 'none';
}

function handleBrandRequestSubmit(e) {
  e.preventDefault();
  closeBrandCampaignModal();
  showToast('Campaign request submitted successfully! Your dedicated 8Bit account manager will reach out within 2 hours.', 'success');
}

function exportBrandCSV() {
  const csv = "data:text/csv;charset=utf-8,Asset,Creator,Views,Engagement,CTR,Total Reach\\nLaunch Stream VOD Benchmark,Mortal,1.8M,9.4%,4.2%,4.8M\\nFast Charge Reel,Payal,1.2M,8.6%,3.8%,2.6M\\nNeo 9 Pro Invitational,Jokerkihaveli,3.4M,9.1%,5.1%,6.8M";
  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(csv));
  link.setAttribute('download', 'iQOO_8Bit_Campaign_Telemetry_2026.csv');
  document.body.appendChild(link);
  link.click();
  link.remove();
  showToast('Campaign telemetry CSV downloaded!', 'success');
}

// Initialize Auth
document.addEventListener('DOMContentLoaded', function() {
  EightBitAuth.mountSecurityGate({ role: 'brand' });
});
</script>
`;

if (!brand.includes('modal-deliverable-review')) {
  brand = brand.replace('</body>', BRAND_MODALS_AND_SCRIPTS + '\n</body>');
}
fs.writeFileSync(path.join(ROOT, 'brand-dashboard.html'), brand, 'utf-8');
console.log('brand-dashboard.html updated.');

// ==========================================
// 3. UPGRADE CREATOR-DASHBOARD.HTML
// ==========================================
console.log('Upgrading creator-dashboard.html...');
let creator = fs.readFileSync(path.join(ROOT, 'creator-dashboard.html'), 'utf-8');
creator = ensureAuthInHead(creator, 'creator');

const CREATOR_MODALS_AND_SCRIPTS = `
${TOAST_CSS}

<!-- Modal: Creator Submit Draft -->
<div id="modal-submit-draft" class="modal-overlay" style="display: none; position: fixed; inset: 0; z-index: 99999; background: rgba(0,0,0,0.85); backdrop-filter: blur(20px); align-items: center; justify-content: center; padding: 20px;">
  <div style="background: #111111; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; width: 100%; max-width: 500px; padding: 32px; box-shadow: 0 24px 60px rgba(0,0,0,0.8); position: relative;">
    <button onclick="closeDraftModal()" style="position: absolute; top: 20px; right: 20px; background: transparent; border: none; color: var(--text-dim); cursor: pointer;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    
    <div style="font-size: 11px; font-weight: 700; color: var(--green); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px;">TALENT DELIVERABLE SUBMISSION</div>
    <h3 id="draft-modal-title" style="font-size: 20px; font-weight: 700; color: #ffffff; margin-bottom: 4px;">Submit Deliverable Proof</h3>
    <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 20px;">Provide unlisted preview link or asset drive file for agency review.</div>

    <form onsubmit="handleDraftSubmission(event)">
      <div style="margin-bottom: 16px;">
        <label style="display: block; font-size: 11px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Unlisted Video URL / Instagram Draft / Drive Link</label>
        <input type="url" id="draft-url-input" placeholder="https://youtube.com/watch?v=... or Google Drive URL" required style="width: 100%; background: #161616; border: 1px solid var(--border); border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #fff;">
      </div>

      <div style="margin-bottom: 20px;">
        <label style="display: block; font-size: 11px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Creator Notes / Timestamps (Optional)</label>
        <textarea id="draft-notes-input" placeholder="e.g. Brand phone showcase starts at 04:12. Talking points verified." style="width: 100%; height: 70px; background: #161616; border: 1px solid var(--border); border-radius: 8px; padding: 10px; font-size: 12px; color: #fff; font-family: inherit; resize: none;"></textarea>
      </div>

      <div style="display: flex; gap: 10px; justify-content: flex-end;">
        <button type="button" class="btn" onclick="closeDraftModal()">Cancel</button>
        <button type="submit" class="btn btn-accent">Submit for 8Bit Review &rarr;</button>
      </div>
    </form>
  </div>
</div>

<!-- Modal: Commercial Invoice Viewer -->
<div id="modal-invoice-viewer" class="modal-overlay" style="display: none; position: fixed; inset: 0; z-index: 99999; background: rgba(0,0,0,0.85); backdrop-filter: blur(20px); align-items: center; justify-content: center; padding: 20px;">
  <div style="background: #111111; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; width: 100%; max-width: 540px; padding: 32px; box-shadow: 0 24px 60px rgba(0,0,0,0.8); position: relative;">
    <button onclick="closeInvoiceModal()" style="position: absolute; top: 20px; right: 20px; background: transparent; border: none; color: var(--text-dim); cursor: pointer;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
      <div>
        <div style="font-size: 11px; font-weight: 700; color: var(--green); letter-spacing: 0.08em; text-transform: uppercase;">TAX INVOICE &bull; 8BIT CREATIVES</div>
        <h3 id="inv-modal-num" style="font-size: 20px; font-weight: 700; color: #ffffff;">#8BIT-2026-89</h3>
      </div>
      <span class="badge-tag green">Approved for Remittance</span>
    </div>

    <div style="background: var(--surface-2); border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px; margin-bottom: 16px; font-size: 12px; color: var(--text-muted); line-height: 1.6;">
      <div><strong>Agency:</strong> S8UL Gaming Pvt. Ltd. &bull; 8Bit Creatives Division</div>
      <div><strong>GSTIN:</strong> 27AABCS8899Z1Z5 &bull; Mumbai, Maharashtra</div>
      <div><strong>Talent:</strong> Naman Mathur (Mortal) &bull; PAN: ABCPM8892K</div>
      <div><strong>Payment Cycle:</strong> Net 30 Commercial Remittance (Due Sep 25, 2026)</div>
    </div>

    <table class="ops-table" style="margin-bottom: 16px;">
      <thead>
        <tr>
          <th>Deliverable Description</th>
          <th style="text-align: right;">Gross Fee</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>iQOO Flagship Drop v2 — Dedicated Stream VOD Cut</td>
          <td style="text-align: right; color: #fff;">₹3,00,000</td>
        </tr>
        <tr>
          <td>Instagram Reel Co-Post &amp; Story Integration</td>
          <td style="text-align: right; color: #fff;">₹50,000</td>
        </tr>
        <tr>
          <td><strong>Subtotal Gross Talent Payout</strong></td>
          <td style="text-align: right; font-weight: 700; color: #fff;">₹3,50,000</td>
        </tr>
        <tr>
          <td style="color: var(--text-dim);">Less: TDS Deduction @ 10% (Sec 194J)</td>
          <td style="text-align: right; color: var(--red);">- ₹35,000</td>
        </tr>
        <tr>
          <td><strong>Net Payable Bank Remittance</strong></td>
          <td style="text-align: right; font-weight: 700; color: var(--green); font-size: 15px;">₹3,15,000</td>
        </tr>
      </tbody>
    </table>

    <div style="display: flex; gap: 10px; justify-content: flex-end;">
      <button type="button" class="btn" onclick="closeInvoiceModal()">Close</button>
      <button type="button" class="btn btn-accent" onclick="printInvoice()">&darr; Print / Download PDF</button>
    </div>
  </div>
</div>

<script>
${TOAST_JS}

// Talent switcher simulation
const TALENT_PROFILES = {
  mortal: { name: 'Naman', handle: 'Mortal', campaigns: 3, pending: '₹3,50,000', views: '24.8M', contract: 'Dec 31, 2027' },
  payal: { name: 'Payal', handle: 'Payal', campaigns: 2, pending: '₹1,80,000', views: '18.2M', contract: 'Oct 30, 2027' },
  snax: { name: 'Raj', handle: 'Snax', campaigns: 2, pending: '₹1,50,000', views: '14.5M', contract: 'Aug 15, 2027' },
  goblin: { name: 'Abhijeet', handle: 'Goblin', campaigns: 2, pending: '₹1,20,000', views: '12.4M', contract: 'Jan 31, 2028' }
};

function handleTalentSwitch(id) {
  const t = TALENT_PROFILES[id];
  if (!t) return;
  document.querySelector('.page-subtitle').textContent = 'Welcome back, ' + t.name + '. Track your active campaigns, upcoming deadlines, and payouts.';
  document.querySelectorAll('.stat-value')[0].textContent = t.campaigns;
  document.querySelectorAll('.stat-value')[2].textContent = t.pending;
  document.querySelectorAll('.stat-value')[3].textContent = t.views;
  showToast('Switched profile to ' + t.handle + ' (' + t.name + ')', 'info');
}

let isAvailable = true;
function toggleTalentAvailability() {
  isAvailable = !isAvailable;
  const btn = document.getElementById('talent-avail-btn');
  if (isAvailable) {
    btn.style.background = 'rgba(34, 197, 94, 0.12)';
    btn.style.color = '#22c55e';
    btn.style.borderColor = 'rgba(34, 197, 94, 0.3)';
    btn.innerHTML = '&bull; Available for Bookings';
    showToast('Status updated: Open for new brand campaigns', 'success');
  } else {
    btn.style.background = 'rgba(239, 68, 68, 0.12)';
    btn.style.color = '#ef4444';
    btn.style.borderColor = 'rgba(239, 68, 68, 0.3)';
    btn.innerHTML = '&bull; Currently Booked Out';
    showToast('Status updated: Calendar locked / Booked out', 'info');
  }
}

function openDraftSubmitModal(title) {
  document.getElementById('draft-modal-title').textContent = title || 'Submit Deliverable Proof';
  document.getElementById('modal-submit-draft').style.display = 'flex';
}

function closeDraftModal() {
  document.getElementById('modal-submit-draft').style.display = 'none';
}

function handleDraftSubmission(e) {
  e.preventDefault();
  closeDraftModal();
  showToast('Draft submitted to 8Bit Ops! Deliverable status updated to "In Review".', 'success');
}

function openInvoiceModal(num, camp, amt) {
  document.getElementById('inv-modal-num').textContent = '#' + num;
  document.getElementById('modal-invoice-viewer').style.display = 'flex';
}

function closeInvoiceModal() {
  document.getElementById('modal-invoice-viewer').style.display = 'none';
}

function printInvoice() {
  window.print();
}

// Initialize Auth
document.addEventListener('DOMContentLoaded', function() {
  EightBitAuth.mountSecurityGate({ role: 'creator' });
});
</script>
`;

if (!creator.includes('modal-submit-draft')) {
  creator = creator.replace('</body>', CREATOR_MODALS_AND_SCRIPTS + '\n</body>');
}
fs.writeFileSync(path.join(ROOT, 'creator-dashboard.html'), creator, 'utf-8');
console.log('creator-dashboard.html updated.');

// ==========================================
// 4. UPGRADE PLATFORM-DASHBOARD.HTML
// ==========================================
console.log('Upgrading platform-dashboard.html...');
let platform = fs.readFileSync(path.join(ROOT, 'platform-dashboard.html'), 'utf-8');
platform = ensureAuthInHead(platform, 'platform');

const PLATFORM_MODALS_AND_SCRIPTS = `
${TOAST_CSS}

<!-- Modal: RTMP & Technical Ingest Settings -->
<div id="modal-rtmp-setup" class="modal-overlay" style="display: none; position: fixed; inset: 0; z-index: 99999; background: rgba(0,0,0,0.85); backdrop-filter: blur(20px); align-items: center; justify-content: center; padding: 20px;">
  <div style="background: #111111; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; width: 100%; max-width: 520px; padding: 32px; box-shadow: 0 24px 60px rgba(0,0,0,0.8); position: relative;">
    <button onclick="closeRtmpModal()" style="position: absolute; top: 20px; right: 20px; background: transparent; border: none; color: var(--text-dim); cursor: pointer;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    
    <div style="font-size: 11px; font-weight: 700; color: var(--purple); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px;">STREAMING INFRASTRUCTURE</div>
    <h3 style="font-size: 20px; font-weight: 700; color: #ffffff; margin-bottom: 4px;">Kick RTMP Ingest &amp; Stream Keys</h3>
    <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 20px;">Technical broadcast endpoints configured for 8Bit Creator Roster.</div>

    <div style="margin-bottom: 14px;">
      <label style="display: block; font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">Primary RTMP Ingest URL</label>
      <div style="display: flex; gap: 8px;">
        <input type="text" readonly value="rtmp://fa723fc1b212.global-contribute.live-video.net/app/" style="flex: 1; background: #161616; border: 1px solid var(--border); border-radius: 6px; padding: 8px 12px; font-family: monospace; font-size: 11px; color: #fff;">
        <button class="btn" style="padding: 6px 12px; font-size: 11px;" onclick="copyText('rtmp://fa723fc1b212.global-contribute.live-video.net/app/')">Copy</button>
      </div>
    </div>

    <div style="margin-bottom: 16px;">
      <label style="display: block; font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">Master Stream Ingest Key (Kick India Exclusive)</label>
      <div style="display: flex; gap: 8px;">
        <input type="password" id="rtmp-key-field" readonly value="live_8bit_kick_sec_9948291038472" style="flex: 1; background: #161616; border: 1px solid var(--border); border-radius: 6px; padding: 8px 12px; font-family: monospace; font-size: 11px; color: #fff;">
        <button class="btn" style="padding: 6px 12px; font-size: 11px;" onclick="toggleKeyVisibility()">Show</button>
        <button class="btn" style="padding: 6px 12px; font-size: 11px;" onclick="copyText('live_8bit_kick_sec_9948291038472')">Copy</button>
      </div>
    </div>

    <div style="background: var(--surface-2); border: 1px solid var(--border); border-radius: 8px; padding: 12px 14px; font-size: 11px; color: var(--text-muted); line-height: 1.6; margin-bottom: 20px;">
      <div>&bull; <strong>Recommended Resolution:</strong> 1920x1080 @ 60 FPS</div>
      <div>&bull; <strong>Bitrate Target:</strong> 8000 Kbps (CBR, NVENC H.264)</div>
      <div>&bull; <strong>Keyframe Interval:</strong> 2.0 seconds &bull; Audio: 160 Kbps AAC</div>
    </div>

    <div style="display: flex; justify-content: flex-end;">
      <button type="button" class="btn btn-accent" onclick="closeRtmpModal()">Close</button>
    </div>
  </div>
</div>

<script>
${TOAST_JS}

function openRtmpSetupModal() {
  document.getElementById('modal-rtmp-setup').style.display = 'flex';
}

function closeRtmpModal() {
  document.getElementById('modal-rtmp-setup').style.display = 'none';
}

function copyText(txt) {
  navigator.clipboard.writeText(txt).then(() => {
    showToast('Copied to clipboard!', 'success');
  });
}

function toggleKeyVisibility() {
  const f = document.getElementById('rtmp-key-field');
  f.type = f.type === 'password' ? 'text' : 'password';
}

function exportPlatformCSV() {
  const csv = "data:text/csv;charset=utf-8,Creator,Kick Handle,Followers,Broadcasts,Avg CCV,Peak CCV,Watch Hours\\nMortal,kick.com/mortal,180K,16 streams,32400,68200,480000 hrs\\nJokerkihaveli,kick.com/jokerkihaveli,140K,14 streams,28100,54900,390000 hrs\\nPayal,kick.com/payaldhare,95K,12 streams,19500,41300,260000 hrs\\nSnax,kick.com/snax,60K,10 streams,14200,29800,180000 hrs\\nGoblin,kick.com/goblin,45K,9 streams,11200,22400,120000 hrs";
  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(csv));
  link.setAttribute('download', 'Kick_India_Day_One_Telemetry.csv');
  document.body.appendChild(link);
  link.click();
  link.remove();
  showToast('Platform telemetry exported to CSV!', 'success');
}

// Initialize Auth
document.addEventListener('DOMContentLoaded', function() {
  EightBitAuth.mountSecurityGate({ role: 'platform' });
});
</script>
`;

if (!platform.includes('modal-rtmp-setup')) {
  platform = platform.replace('</body>', PLATFORM_MODALS_AND_SCRIPTS + '\n</body>');
}
fs.writeFileSync(path.join(ROOT, 'platform-dashboard.html'), platform, 'utf-8');
console.log('platform-dashboard.html updated.');

console.log('--- All Dashboards Upgraded and Secured Successfully ---');
