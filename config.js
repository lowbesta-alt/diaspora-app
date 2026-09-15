
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
