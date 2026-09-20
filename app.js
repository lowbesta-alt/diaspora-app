// ============================================================
// APP.JS - Boite a outils centrale Espace Diaspora
// v12.0 : MODE TEST ADMIN (basculer entre les 3 roles)
// ============================================================

// ---------- Injection du favicon ----------
(function() {
  if (!document.querySelector('link[rel="icon"][href="favicon.svg"]')) {
    document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]').forEach(el => el.remove());
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = 'favicon.svg';
    document.head.appendChild(link);
  }
})();

// ---------- Bibliotheque d'icones SVG ----------
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
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  handshake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 17l-2.5-2.5a2.12 2.12 0 0 1 0-3 2.12 2.12 0 0 1 3 0L13 13"/><path d="M14 14l2.5 2.5a2.12 2.12 0 0 1 0 3 2.12 2.12 0 0 1-3 0L12 18"/><path d="M20 9l-3-3"/><path d="M4 9l3-3"/><path d="M2 12h3l2 2"/><path d="M22 12h-3l-2 2"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  dollar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="18"/><line x1="15" y1="22" x2="15" y2="18"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><line x1="9" y1="14" x2="9" y2="14.01"/><line x1="15" y1="14" x2="15" y2="14.01"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>'
};

const ED_EMOJI_MAP = {
  '🌍': 'globe', '🌎': 'globe', '🏠': 'home', '📁': 'folder',
  '💰': 'wallet', '💵': 'dollar', '💬': 'message', '👤': 'user',
  '👥': 'users', '📄': 'file', '📋': 'clipboard', '🔔': 'bell',
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
// MENUS PAR ROLE
// ============================================================
const ED_MENUS = {
  investor: [
    { href: 'dashboard-investisseur.html', icon: 'home', label: 'Accueil' },
    { href: 'projets.html', icon: 'folder', label: 'Projets' },
    { href: 'portefeuille.html', icon: 'wallet', label: 'Portefeuille' },
    { href: 'cameras.html', icon: 'video', label: 'Caméras' },
    { href: 'messages.html', icon: 'message', label: 'Messages' },
    { href: 'profil.html', icon: 'user', label: 'Profil' }
  ],
  provider: [
    { href: 'dashboard-artisan.html', icon: 'home', label: 'Mes chantiers' },
    { href: 'mes-rapports.html', icon: 'camera', label: 'Rapports' },
    { href: 'mes-paiements.html', icon: 'wallet', label: 'Paiements' },
    { href: 'mes-realisations.html', icon: 'target', label: 'Réalisations' },
    { href: 'messages.html', icon: 'message', label: 'Messages' },
    { href: 'profil.html', icon: 'user', label: 'Profil' }
  ],
  admin: [
    { href: 'dashboard-admin.html', icon: 'home', label: 'Tour de controle' },
    { href: 'admin-leads.html', icon: 'list', label: 'Leads' },
    { href: 'admin-chantiers.html', icon: 'building', label: 'Chantiers' },
    { href: 'admin-partenaires.html', icon: 'handshake', label: 'Partenaires' },
    { href: 'admin-utilisateurs.html', icon: 'users', label: 'Utilisateurs' },
    { href: 'profil.html', icon: 'user', label: 'Profil' }
  ]
};

const ED_MENU_ITEMS = ED_MENUS.investor;

// ---------- Gestion des roles ----------
function getRealUserRole() {
  return localStorage.getItem('user_role') || 'investor';
}

// Role "effectif" : ce que l'utilisateur voit. Un admin en mode test voit un autre role.
function getCurrentUserRole() {
  const realRole = getRealUserRole();
  if (realRole === 'admin') {
    const testRole = localStorage.getItem('test_role');
    if (testRole && testRole !== 'admin') return testRole;
  }
  return realRole;
}

// Role "reel" (admin reste admin, meme en mode test)
function isAdminModeTest() {
  return getRealUserRole() === 'admin' && !!localStorage.getItem('test_role');
}

function setTestRole(role) {
  localStorage.setItem('test_role', role);
}

function clearTestRole() {
  localStorage.removeItem('test_role');
}

function edGetMenuItems() {
  const role = getCurrentUserRole();
  if (role === 'admin') return ED_MENUS.admin;
  if (role === 'provider' || role === 'project_manager') return ED_MENUS.provider;
  return ED_MENUS.investor;
}

// ============================================================
// BANDEAU MODE TEST
// ============================================================
function edInjectTestBanner() {
  if (!isAdminModeTest()) return;
  if (document.getElementById('edTestBanner')) return;

  const testRole = localStorage.getItem('test_role');
  const labels = {
    'investor': 'Client / Diaspora',
    'provider': 'Artisan / Partenaire BTP'
  };
  const label = labels[testRole] || testRole;

  const banner = document.createElement('div');
  banner.id = 'edTestBanner';
  banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:60;background:linear-gradient(135deg,#f59e0b,#fbbf24);color:#0a1838;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;box-shadow:0 4px 12px rgba(245,158,11,0.4);';
  banner.innerHTML =
    '<div style="display:flex;align-items:center;gap:8px;font-weight:800;font-size:12px;">' +
      '<span>👁️</span>' +
      '<span>Mode test : ' + label + '</span>' +
    '</div>' +
    '<button id="edExitTest" style="background:#0a1838;color:#fbbf24;border:none;padding:6px 12px;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer;">QUITTER LE TEST</button>';

  document.body.insertBefore(banner, document.body.firstChild);

  document.getElementById('edExitTest').addEventListener('click', function() {
    clearTestRole();
    window.location.href = 'dashboard-admin.html';
  });

  // Ajoute un padding top pour ne pas cacher le contenu
  setTimeout(function() {
    const header = document.querySelector('.ed-header');
    if (header) header.style.marginTop = '40px';
    else document.body.style.paddingTop = '40px';
  }, 100);
}

// ============================================================
// HEADER PRO
// ============================================================
function edCurrentPage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function edInjectHeader() {
  const current = edCurrentPage();
  const publicPages = ['index.html', 'inscription.html', 'accueil.html', 'partenariat-btp.html', 'partenaires.html', ''];
  if (publicPages.includes(current)) return;
  if (document.querySelector('.ed-header')) return;
  if (!getToken()) return;

  const email = getCurrentUserEmail() || '';
  const initials = email.substring(0, 2).toUpperCase() || 'IT';
  const role = getCurrentUserRole();
  const items = edGetMenuItems();

  function makeLink(item) {
    const isActive = current === item.href ? 'active' : '';
    const icon = ED_ICONS[item.icon] || '';
    return '<a href="' + item.href + '" class="' + isActive + '"><span class="ed-menu-icon">' + icon + '</span> ' + item.label + '</a>';
  }

  const menuItems = items.map(makeLink).join('');

  const roleLabels = {
    'investor': 'Espace Investisseur',
    'provider': 'Espace Artisan',
    'project_manager': 'Espace Chef de chantier',
    'admin': 'Administration'
  };
  const roleMeta = roleLabels[role] || roleLabels.investor;

  const headerHTML =
    '<header class="ed-header">' +
      '<div class="ed-header-inner">' +
        '<a href="' + (items[0] ? items[0].href : 'dashboard-investisseur.html') + '" class="ed-header-logo">' +
          '<img src="logo.svg" alt="Espace Diaspora">' +
          '<div class="ed-header-logo-text">' +
            '<span class="ed-header-logo-name">Espace Diaspora</span>' +
            '<span class="ed-header-logo-tag">' + roleMeta + '</span>' +
          '</div>' +
        '</a>' +
        '<nav class="ed-menu">' + menuItems + '</nav>' +
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
      '<div class="ed-mobile-menu-title">' + roleMeta + '</div>' +
      menuItems +
      '<div class="ed-mobile-menu-title">Compte</div>' +
      '<a href="#" id="edLogoutBtn"><span class="ed-menu-icon">🚪</span> Déconnexion</a>' +
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
function getCurrentUserName() { return localStorage.getItem('user_name') || ''; }
function isLoggedIn() { return !!getToken() && !!getCurrentUserId(); }

function requireLogin() {
  if (!isLoggedIn()) {
    alert('Vous devez etre connecte');
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

function requireRole(allowedRoles) {
  if (!requireLogin()) return false;
  const realRole = getRealUserRole();
  // Admin a toujours acces, peu importe son mode test
  if (realRole === 'admin') return true;

  const effectiveRole = getCurrentUserRole();
  if (!allowedRoles.includes(effectiveRole)) {
    alert('Acces non autorise');
    if (effectiveRole === 'admin') window.location.href = 'dashboard-admin.html';
    else if (effectiveRole === 'provider' || effectiveRole === 'project_manager') window.location.href = 'dashboard-artisan.html';
    else window.location.href = 'dashboard-investisseur.html';
    return false;
  }
  return true;
}

function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_email');
  localStorage.removeItem('user_role');
  localStorage.removeItem('user_name');
  localStorage.removeItem('test_role');
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
    'pending': 'A venir', 'rejected': 'Refuse', 'in_progress': 'En cours',
    'pending_review': 'En attente de validation'
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
    'in_progress': 'bg-yellow-500/20 text-yellow-300',
    'pending_review': 'bg-amber-500/20 text-amber-300'
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
  edInjectTestBanner();
  edInjectHeader();
  setTimeout(edReplaceEmojis, 500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', edInit);
} else {
  edInit();
}
