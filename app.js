// ============================================================
// APP.JS - Boite a outils centrale Espace Diaspora
// v4.0 : injection auto du theme + HEADER PRO sur toutes les pages
// ============================================================

// ---------- Injection automatique du theme.css ----------
(function() {
  if (!document.querySelector('link[href="theme.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'theme.css';
    document.head.appendChild(link);
  }
})();

// ============================================================
// HEADER PRO - injecté automatiquement sur toutes les pages
// ============================================================
const ED_MENU_ITEMS = [
  { href: 'dashboard-investisseur.html', icon: '🏠', label: 'Accueil' },
  { href: 'projets.html', icon: '📁', label: 'Projets' },
  { href: 'portefeuille.html', icon: '💰', label: 'Portefeuille' },
  { href: 'documents.html', icon: '📄', label: 'Documents' },
  { href: 'messages.html', icon: '💬', label: 'Messages' },
  { href: 'contrats.html', icon: '📋', label: 'Contrats' },
  { href: 'profil.html', icon: '👤', label: 'Profil' }
];

function edCurrentPage() {
  const path = window.location.pathname;
  const file = path.split('/').pop() || 'index.html';
  return file;
}

function edInjectHeader() {
  // Ne pas injecter sur les pages publiques (login/inscription)
  const current = edCurrentPage();
  const publicPages = ['index.html', 'inscription.html', ''];
  if (publicPages.includes(current)) return;

  // Ne pas injecter si deja present
  if (document.querySelector('.ed-header')) return;

  // Ne pas injecter si l'utilisateur n'est pas connecte
  if (!getToken()) return;

  const email = getCurrentUserEmail() || '';
  const initials = email.substring(0, 2).toUpperCase() || 'IT';

  const menuItems = ED_MENU_ITEMS.map(item => {
    const isActive = current === item.href ? 'active' : '';
    return `<a href="${item.href}" class="${isActive}">${item.icon} ${item.label}</a>`;
  }).join('');

  const mobileMenuItems = ED_MENU_ITEMS.map(item => {
    const isActive = current === item.href ? 'active' : '';
    return `<a href="${item.href}" class="${isActive}">${item.icon} ${item.label}</a>`;
  }).join('');

  const headerHTML = `
    <header class="ed-header">
      <div class="ed-header-inner">
        <a href="dashboard-investisseur.html" class="ed-header-logo">
          <img src="logo.svg" alt="Espace Diaspora">
          <div class="ed-header-logo-text">
            <span class="ed-header-logo-name">Espace Diaspora</span>
            <span class="ed-header-logo-tag">Investir au pays</span>
          </div>
        </a>

        <nav class="ed-menu">
          ${menuItems}
        </nav>

        <div class="ed-header-actions">
          <a href="notifications.html" class="ed-bell">🔔</a>
          <a href="profil.html" class="ed-avatar">${initials}</a>
          <button class="ed-burger" id="edBurger" aria-label="Menu">☰</button>
        </div>
      </div>
    </header>

    <div class="ed-overlay" id="edOverlay"></div>

    <aside class="ed-mobile-menu" id="edMobileMenu">
      <button class="ed-mobile-close" id="edMobileClose">✕</button>
      <div class="ed-mobile-menu-title">Navigation</div>
      ${mobileMenuItems}
      <div class="ed-mobile-menu-title">Compte</div>
      <a href="securite.html">🔒 Sécurité</a>
      <a href="#" id="edLogoutBtn">🚪 Déconnexion</a>
    </aside>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = headerHTML;

  // Insère AVANT le body content
  document.body.insertBefore(wrapper, document.body.firstChild);

  // Wire mobile menu
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
  if (logoutBtn) logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Se deconnecter ?')) logout();
  });
}

// ---------- Gestion de session ----------
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

// ---------- Headers avec token ----------
function getHeaders(extra = {}) {
  const headers = {
    'apikey': SUPABASE_KEY,
    'Content-Type': 'application/json',
    ...extra
  };
  const token = getToken();
  if (token) headers['Authorization'] = 'Bearer ' + token;
  return headers;
}

// ---------- API REST ----------
async function apiGet(table, params = '') {
  const url = SUPABASE_URL + '/rest/v1/' + table + (params ? '?' + params : '');
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
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
    const err = await res.json().catch(() => ({}));
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
    const err = await res.json().catch(() => ({}));
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
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Erreur de suppression');
  }
  return true;
}

// ---------- Upload fichier ----------
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
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Erreur upload');
  }
  return true;
}

// ---------- Utilitaires ----------
function formatAmount(amount, currency = 'XAF') {
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

function setupUserHeader() {
  // Compat : plus utilise car le header est injecte automatiquement
  // On garde la fonction pour ne pas casser les pages existantes
}

// ============================================================
// AUTO-INJECTION AU CHARGEMENT
// ============================================================
function edInit() {
  edInjectHeader();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', edInit);
} else {
  edInit();
}
