// ============================================================
// APP.JS - Boite a outils centrale Espace Diaspora
// Toutes les pages utilisent ces fonctions
// ============================================================

// ---------- Gestion de session ----------
function getToken() {
  return localStorage.getItem('access_token');
}

function getCurrentUserId() {
  return localStorage.getItem('user_id');
}

function getCurrentUserEmail() {
  return localStorage.getItem('user_email');
}

function isLoggedIn() {
  return !!getToken() && !!getCurrentUserId();
}

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

// ---------- Headers avec token utilisateur ----------
function getHeaders(extra = {}) {
  const headers = {
    'apikey': SUPABASE_KEY,
    'Content-Type': 'application/json',
    ...extra
  };
  const token = getToken();
  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }
  return headers;
}

// ---------- API REST Supabase ----------
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
    'active': 'En cours',
    'draft': 'En preparation',
    'completed': 'Termine',
    'paused': 'En pause',
    'cancelled': 'Annule',
    'disputed': 'En litige',
    'released': 'Debloque',
    'approved': 'Valide',
    'submitted': 'En attente',
    'pending': 'A venir',
    'rejected': 'Refuse',
    'in_progress': 'En cours'
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

function showError(msg) {
  alert('Erreur : ' + msg);
}

function showSuccess(msg) {
  alert(msg);
}

// ---------- Header commun (avatar + deconnexion) ----------
function setupUserHeader() {
  const email = getCurrentUserEmail() || '';
  const initials = email.substring(0, 2).toUpperCase();
  document.querySelectorAll('[data-user-avatar]').forEach(el => {
    el.textContent = initials || 'IT';
  });
  document.querySelectorAll('[data-logout]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Se deconnecter ?')) logout();
    });
  });
}
