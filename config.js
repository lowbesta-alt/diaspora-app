// Configuration Supabase - Espace Diaspora
const SUPABASE_URL = 'https://zsievfntsgncijfbtkle.supabase.co';
const SUPABASE_KEY = 'sb_publishable_oRQaAhvYoSznSyYVXzSTkw__j3sOXUY';

// Constantes de test
const TEST_USER_ID = '7c0ec994-ef43-4fa5-8bb7-931e7b37c191';
const TEST_PROJECT_ID = '6f1d7e27-105a-45dc-ab31-71577e95f4f5';
const TEST_MILESTONE_ID = 'f9269664-e2c8-41da-8c36-d9ae6b80f984';

// Fonction : retourne les headers avec le token de l'utilisateur connecte
function authHeaders(extra = {}) {
  const token = localStorage.getItem('access_token');
  const headers = {
    'apikey': SUPABASE_KEY,
    'Content-Type': 'application/json',
    ...extra
  };
  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  } else {
    headers['Authorization'] = 'Bearer ' + SUPABASE_KEY;
  }
  return headers;
}

// Fonction : verifie si l'utilisateur est connecte
function isLoggedIn() {
  return !!localStorage.getItem('access_token');
}

// Fonction : recupere l'ID de l'utilisateur connecte
function currentUserId() {
  return localStorage.getItem('user_id') || TEST_USER_ID;
}

// ============================================================
// 📱 PWA + Favicon
// ============================================================
(function initPWA() {
  try {
    document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]').forEach(el => el.remove());

    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = '/icon-192.png?v=3';
    document.head.appendChild(favicon);

    const appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    appleIcon.href = '/icon-192.png?v=3';
    document.head.appendChild(appleIcon);

    if (!document.querySelector('link[rel="manifest"]')) {
      const link = document.createElement('link');
      link.rel = 'manifest';
      link.href = '/manifest.json';
      document.head.appendChild(link);
    }

    if (!document.querySelector('meta[name="theme-color"]')) {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = '#10b981';
      document.head.appendChild(meta);
    }

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch((err) => {
          console.warn('[PWA] SW register failed', err);
        });
      });
    }
  } catch (e) {
    console.warn('[PWA] init failed', e);
  }
})();

// ============================================================
// 🔙 Bouton "Retour à l'accueil" sur les pages de connexion/inscription
// ============================================================
(function addHomeButton() {
  try {
    const path = window.location.pathname.toLowerCase();
    const isAuthPage = path.includes('index.html') ||
                       path.endsWith('/') ||
                       path.includes('inscription.html') ||
                       path.includes('inscription-artisan.html');

    if (!isAuthPage) return;

    // Éviter le double ajout
    if (document.getElementById('home-back-btn')) return;

    function inject() {
      const btn = document.createElement('a');
      btn.id = 'home-back-btn';
      btn.href = 'accueil.html';
      btn.innerHTML = '← Accueil';
      btn.style.cssText = [
        'position:fixed',
        'top:16px',
        'left:16px',
        'z-index:9999',
        'background:rgba(15,23,42,0.85)',
        'color:#fff',
        'padding:8px 14px',
        'border-radius:12px',
        'font-size:12px',
        'font-weight:600',
        'text-decoration:none',
        'border:1px solid rgba(255,255,255,0.15)',
        'backdrop-filter:blur(8px)',
        'display:inline-flex',
        'align-items:center',
        'gap:6px',
        'font-family:inherit'
      ].join(';');
      document.body.appendChild(btn);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', inject);
    } else {
      inject();
    }
  } catch (e) {
    console.warn('[home-btn]', e);
  }
})();
