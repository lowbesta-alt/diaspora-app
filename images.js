// ============================================================
// IMAGES.JS - Photos professionnelles pour Espace Diaspora
// Utilise des photos Unsplash (gratuites, sans attribution obligatoire)
// ============================================================

// Photos de chantiers / construction (Afrique si possible)
const ED_PROJECT_COVERS = [
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1590725140246-20acddc1ec6d?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=800&q=80&auto=format&fit=crop'
];

// Photos de bannière (plus larges)
const ED_HERO_IMAGES = [
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop'
];

// Photos de diaspora / business
const ED_AVATAR_FALLBACK = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop';

// Utilitaire : hash simple pour choisir une image de maniere stable
function edStableIndex(str, max) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash) % max;
}

// Selectionne une photo stable selon un texte (id, titre, etc.)
function edCoverFor(key) {
  if (!key) key = 'default';
  const idx = edStableIndex(key, ED_PROJECT_COVERS.length);
  return ED_PROJECT_COVERS[idx];
}

// ============================================================
// APPLIQUE LES PHOTOS AUTOMATIQUEMENT
// ============================================================
function edApplyCoverImages() {
  // 1. Cartes de projet sur dashboard et liste
  document.querySelectorAll('a[href^="projet-detail.html"]').forEach(card => {
    // Ne pas appliquer si deja une image
    if (card.querySelector('.ed-cover-bg')) return;

    // Extraire l'id du projet depuis le href
    const href = card.getAttribute('href');
    const match = href.match(/id=([a-f0-9-]+)/i);
    const projectKey = match ? match[1] : card.textContent.substring(0, 30);

    // Image stable
    const imgUrl = edCoverFor(projectKey);

    // Creer le background image en absolute
    const bg = document.createElement('div');
    bg.className = 'ed-cover-bg';
    bg.style.backgroundImage = 'url(' + imgUrl + ')';
    bg.style.backgroundSize = 'cover';
    bg.style.backgroundPosition = 'center';
    bg.style.position = 'absolute';
    bg.style.inset = '0';
    bg.style.opacity = '0.12';
    bg.style.zIndex = '0';
    bg.style.pointerEvents = 'none';
    bg.style.borderRadius = 'inherit';

    // Ajouter position relative au parent
    card.style.position = 'relative';
    card.style.overflow = 'hidden';

    // Inserer en premier
    card.insertBefore(bg, card.firstChild);

    // S'assurer que le contenu passe au-dessus
    Array.from(card.children).forEach(child => {
      if (child !== bg) {
        child.style.position = 'relative';
        child.style.zIndex = '1';
      }
    });
  });

  // 2. Banniere du projet detail
  const detailBanner = document.querySelector('section.relative.h-40, section[class*="h-40"]');
  if (detailBanner && !detailBanner.querySelector('.ed-cover-full')) {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id') || window.location.pathname;
    const imgUrl = edCoverFor(projectId);

    const bg = document.createElement('div');
    bg.className = 'ed-cover-full';
    bg.style.backgroundImage = 'url(' + imgUrl + ')';
    bg.style.backgroundSize = 'cover';
    bg.style.backgroundPosition = 'center';
    bg.style.position = 'absolute';
    bg.style.inset = '0';
    bg.style.opacity = '0.35';
    bg.style.zIndex = '0';
    bg.style.pointerEvents = 'none';

    detailBanner.style.overflow = 'hidden';
    detailBanner.insertBefore(bg, detailBanner.firstChild);

    // Contenu au-dessus
    Array.from(detailBanner.children).forEach(child => {
      if (child !== bg) {
        child.style.position = 'relative';
        child.style.zIndex = '1';
      }
    });
  }
}

// ============================================================
// EXECUTION
// ============================================================
function edInitImages() {
  // Attendre que le DOM soit pret + que le header soit injecte
  setTimeout(edApplyCoverImages, 700);
  setTimeout(edApplyCoverImages, 1500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', edInitImages);
} else {
  edInitImages();
}
