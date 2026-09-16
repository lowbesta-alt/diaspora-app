// ============================================================
// IMAGES.JS - Photos professionnelles Espace Diaspora
// ============================================================

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

function edStableIndex(str, max) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash) % max;
}

function edCoverFor(key) {
  if (!key) key = 'default';
  return ED_PROJECT_COVERS[edStableIndex(key, ED_PROJECT_COVERS.length)];
}

function edApplyCoverImages() {
  // Cartes de projet
  document.querySelectorAll('a[href^="projet-detail.html"]').forEach(card => {
    if (card.querySelector('.ed-cover-bg')) return;

    const href = card.getAttribute('href');
    const match = href.match(/id=([a-f0-9-]+)/i);
    const projectKey = match ? match[1] : card.textContent.substring(0, 30);

    const imgUrl = edCoverFor(projectKey);

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

    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.insertBefore(bg, card.firstChild);

    Array.from(card.children).forEach(child => {
      if (child !== bg) {
        child.style.position = 'relative';
        child.style.zIndex = '1';
      }
    });
  });
}

function edInitImages() {
  setTimeout(edApplyCoverImages, 700);
  setTimeout(edApplyCoverImages, 1500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', edInitImages);
} else {
  edInitImages();
}
