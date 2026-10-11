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
// 📱 PWA + Favicon (activé sur toutes les pages)
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
// 🎨 Remplacement automatique du logo immeuble orange
//    -> par icon-192.png (globe vert)
// ============================================================
(function replaceOrangeLogo() {
  function replaceAll() {
    try {
      const svgs = document.querySelectorAll('svg');
      svgs.forEach(svg => {
        const html = (svg.outerHTML || '').toLowerCase();
        // Détecte l'immeuble orange par ses couleurs caractéristiques
        const isOrangeBuilding =
          html.includes('#fbbf24') || html.includes('#f59e0b') ||
          html.includes('#ea580c') || html.includes('#fcd34d') ||
          html.includes('#d97706') || html.includes('#fb923c') ||
          html.includes('#f97316') || html.includes('#eab308');

        if (isOrangeBuilding) {
          const img = document.createElement('img');
          img.src = '/icon-192.png?v=3';
          img.alt = 'Espace Diaspora';

          const cls = svg.getAttribute('class');
          if (cls) img.className = cls;

          const w = svg.getAttribute('width');
          const h = svg.getAttribute('height');
          img.style.width = w ? (isNaN(w) ? w : w + 'px') : '60px';
          img.style.height = h ? (isNaN(h) ? h : h + 'px') : '60px';
          img.style.borderRadius = '16px';
          img.style.objectFit = 'cover';

          svg.replaceWith(img);
        }
      });
    } catch (e) {
      console.warn('[logo] replace failed', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(replaceAll, 150));
  } else {
    setTimeout(replaceAll, 150);
  }

  // Retry au cas où le contenu se charge en différé
  window.addEventListener('load', () => setTimeout(replaceAll, 300));
})();
