// ============================================================
// APP.JS - Boite a outils centrale Espace Diaspora
// v7.0 : theme + header + icones SVG + images auto
// ============================================================

// ---------- Bibliotheque d'icones SVG (Lucide) ----------
const ED_ICONS = {
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/></svg>',
  message: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  clipboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
  mapPin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  handshake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 17l-2.5-2.5a2.12 2.12 0 0 1 0-3 2.12 2.12 0 0 1 3 0L13 13"/><path d="M14 14l2.5 2.5a2.12 2.12 0 0 1 0 3 2.12 2.12 0 0 1-3 0L12 18"/><path d="M20 9l-3-3"/><path d="M4 9l3-3"/><path d="M2 12h3l2 2"/><path d="M22 12h-3l-2 2"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  dollar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="18"/><line x1="15" y1="22" x2="15" y2="18"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><line x1="9" y1="14" x2="9" y2="14.01"/><line x1="15" y1="14" x2="15" y2="14.01"/></svg>'
};

// Mapping emoji -> nom icone
const ED_EMOJI_MAP = {
  '🌍': 'globe', '🌎': 'globe', '🏠': 'home', '📁': 'folder',
  '💰': 'wallet', '💵': 'dollar', '💬': 'message', '👤': 'user',
  '👥': 'user', '📄': 'file', '📋': 'clipboard', '🔔': 'bell',
  '🔒': 'lock', '✅': 'check', '⏳': 'clock', '📸': 'camera',
  '🎥': 'video', '📍': 'mapPin', '⚙️': 'settings', '🔍': 'search',
  '➕': 'plus', '✏️': 'edit', '🗑️': 'trash', '⚠️': 'alert',
  '🤝': 'handshake', '🎯': 'target', '🏗️': 'building', '🏢': 'building'
};

function edReplaceEmojis() {
  function walk(node) {
    if (node.nodeType === 3) {
      const text = node.textContent.trim();
      if (ED_EMOJI_MAP[text]) {
        const span = document.createElement('span');
        span.className = 'ed-icon';
        span.innerHTML = ED_ICONS[ED_EMOJI_MAP[text]];
        node.parentNode.replaceChild(span, node);
      }
      return;
    }
    if (node.nodeType !== 1) return;
    if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return;
    if (node.classList && node.classList.contains('ed-icon')) return;
    const children = Array.from(node.childNodes);
    for (const child of children) walk(child);
  }
  walk(document.body);
}

// ---------- Injection theme ----------
(function() {
  if (!document.querySelector('link[href="theme.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'theme.css';
    document.head.appendChild(link);
  }
})();

// ---------- Injection images.js ----------
(function() {
  if (!document.querySelector('script[src="images.js"]')) {
    const script = document.createElement('script');
    script.src = 'images.js';
    script.async = false;
    document.head.appendChild(script);
  }
})();

// ============================================================
// HEADER PRO
// ============================================================
const ED_MENU_ITEMS = [
  { href: 'dashboard-investisseur.html', icon: 'home', label: 'Accueil' },
  { href: 'projets.html', icon: 'folder', label: 'Projets' },
  { href: 'portefeuille.html', icon: 'wallet', label: 'Portefeuille' },
  { href: 'documents.html', icon: 'file', label: 'Documents' },
  { href: 'messages.html', icon: 'message', label: 'Messages' },
  { href: 'contrats.html', icon: 'clipboard', label: 'Contrats' },
  { href: 'profil.html', icon: 'user', label: 'Profil' }
];

function edCurrentPage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function edInjectHeader() {
  const current = edCurrentPage();
  if (['index.html', 'inscription.html', ''].includes(current)) return;
  if (document.querySelector('.ed-header')) return;
  if (!getToken()) return;

  const email = getCurrentUserEmail() || '';
  const initials = email.substring(0, 2).toUpperCase() || 'IT';

  function makeLink(item) {
    const isActive = current === item.href ? 'active' : '';
    return '<a href="' + item.href + '" class="' + isActive + '"><span class="ed-menu-icon">' + ED_ICONS[item.icon] + '</span> ' + item.label + '</a>';
  }

  const headerHTML =
    '<header class="ed-header">' +
      '<div class="ed-header-inner">' +
        '<a href="dashboard-investisseur.html" class="ed-header-logo">' +
          '<img src="logo.svg" alt="Espace Diaspora">' +
          '<div class="ed-header-logo-text">' +
            '<span class="ed-header-logo-name">Espace Diaspora</span>' +
            '<span class="ed-header-logo-tag">Investir au pays</span>' +
          '</div>' +
        '</a>' +
        '<nav class="ed-menu">' + ED_MENU_ITEMS.map(makeLink).join('') + '</nav>' +
        '<div class="ed-header-actions">' +
          '<a href="notifications.html" class="ed-bell">' + ED_ICONS.bell + '</a>' +
          '<a href="profil.html" class="ed-avatar">' + initials + '</a>' +
          '<button class="ed-burger" id="edBurger" aria-label="Menu">☰</button>' +
        '</div>' +
      '</div>' +
    '</header>' +
    '<div class="ed-overlay" id="edOverlay"></div>' +
    '<aside class="ed-mobile-menu" id="edMobileMenu">' +
      '<button class="ed-mobile-close" id="edMobileClose">✕</button>' +
      '<div class="ed-mobile-menu-title">Navigation</div>' +
      ED_MENU_ITEMS.map(makeLink).join('') +
      '<div class="ed-mobile-menu-title">Compte</div>' +
      '<a href="securite.html"><span class="ed-menu-icon">' + ED_ICONS.lock + '</span> Sécurité</a>' +
      '<a href="#" id="edLogoutBtn">🚪 Déconnexion</a>' +
    '</aside>';

  const wrapper = document.createElement('div');
  wrapper.innerHTML = headerHTML;
  document.body.insertBefore(wrapper, document.body.firstChild);

  const burger = document.getElementById('edBurger');
  const mobileMenu = document.getElementById('edMobileMenu');
  const overlay = document.getElementById('edOverlay');
  const closeBtn = document.getElementById('edMobileClose');
  const logoutBtn = document.getElementById('edLogoutBtn');

  function openMenu() {
    if (mobileMenu) mobileMenu.classList.add('open');
    if (overlay) overlay.classList.add('open');
  }
  function closeMenu() {
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  }

  if (burger) burger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);
  if (logoutBtn) logoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Se deconnecter ?')) logout();
  });
}

// ---------- Session ----------
function getToken() { return localStorage.getItem('access_token'); }
function getCurrentUserId() { return localStorage.getItem('user_id'); }
function getCurrentUserEmail() { return localStorage.getItem('user_email'); }
function isLoggedIn() { return !!getToken() && !!getCurrentUserId(); }

function requireLogin() {
  if (!isLoggedIn()) {
    alert('Vous devez etre connecte');
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_email');
  window.location.href = 'index.html';
}

function getHeaders(extra) {
  extra = extra || {};
  const headers = Object.assign({
    'apikey': SUPABASE_KEY,
    'Content-Type': 'application/json'
  }, extra);
  const token = getToken();
  if (token) headers['Authorization'] = 'Bearer ' + token;
  return headers;
}

// ---------- API ----------
async function apiGet(table, params) {
  params = params || '';
  const url = SUPABASE_URL + '/rest/v1/' + table + (params ? '?' + params : '');
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) {
    const err = await res.json().catch(function() { return {}; });
    throw new Error(err.message || 'Erreur de chargement');
  }
  return res.json();
}

async function apiPost(table, data) {
  const res = await fetch(SUPABASE_URL + '/rest/v1/' + table, {
    method: 'POST',
    headers: getHeaders({ 'Prefer': 'return=representation' }),
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json().catch(function() { return {}; });
    throw new Error(err.message || 'Erreur de creation');
  }
  return res.json();
}

async function apiPatch(table, id, data) {
  const res = await fetch(SUPABASE_URL + '/rest/v1/' + table + '?id=eq.' + id, {
    method: 'PATCH',
    headers: getHeaders({ 'Prefer': 'return=minimal' }),
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json().catch(function() { return {}; });
    throw new Error(err.message || 'Erreur de mise a jour');
  }
  return true;
}

async function apiDelete(table, id) {
  const res = await fetch(SUPABASE_URL + '/rest/v1/' + table + '?id=eq.' + id, {
    method: 'DELETE',
    headers: getHeaders({ 'Prefer': 'return=minimal' })
  });
  if (!res.ok) {
    const err = await res.json().catch(function() { return {}; });
    throw new Error(err.message || 'Erreur de suppression');
  }
  return true;
}

async function uploadFile(bucket, path, file) {
  const token = getToken() || SUPABASE_KEY;
  const res = await fetch(SUPABASE_URL + '/storage/v1/object/' + bucket + '/' + path, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + token,
      'Content-Type': file.type
    },
    body: file
  });
  if (!res.ok) {
    const err = await res.json().catch(function() { return {}; });
    throw new Error(err.message || 'Erreur upload');
  }
  return true;
}

// ---------- Utilitaires ----------
function formatAmount(amount, currency) {
  currency = currency || 'XAF';
  return Number(amount || 0).toLocaleString('fr-FR') + ' ' + currency;
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('fr-FR');
}

function getStatusLabel(status) {
  const map = {
    'active': 'En cours', 'draft': 'En preparation', 'completed': 'Termine',
    'paused': 'En pause', 'cancelled': 'Annule', 'disputed': 'En litige',
    'released': 'Debloque', 'approved': 'Valide', 'submitted': 'En attente',
    'pending': 'A venir', 'rejected': 'Refuse', 'in_progress': 'En cours'
  };
  return map[status] || status;
}

function getStatusBadgeClass(status) {
  const map = {
    'active': 'bg-emerald-500/20 text-emerald-300',
    'draft': 'bg-orange-500/20 text-orange-300',
    'completed': 'bg-slate-500/20 text-slate-300',
    'paused': 'bg-yellow-500/20 text-yellow-300',
    'cancelled': 'bg-red-500/20 text-red-300',
    'disputed': 'bg-red-700/20 text-red-300',
    'released': 'bg-blue-500/20 text-blue-300',
    'approved': 'bg-emerald-500/20 text-emerald-300',
    'submitted': 'bg-orange-500/20 text-orange-300',
    'pending': 'bg-slate-500/20 text-slate-300',
    'rejected': 'bg-red-500/20 text-red-300',
    'in_progress': 'bg-yellow-500/20 text-yellow-300'
  };
  return map[status] || 'bg-slate-500/20 text-slate-300';
}

function renderStatusBadge(status) {
  return '<span class="text-[10px] ' + getStatusBadgeClass(status) + ' px-2 py-0.5 rounded-full font-semibold">' + getStatusLabel(status) + '</span>';
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function showError(msg) { alert('Erreur : ' + msg); }
function showSuccess(msg) { alert(msg); }

function setupUserHeader() {}

// ============================================================
// INIT
// ============================================================
function edInit() {
  edInjectHeader();
  setTimeout(edReplaceEmojis, 500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', edInit);
} else {
  edInit();
}
