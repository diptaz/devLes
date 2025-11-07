import { projectId, publicAnonKey } from './supabase/info';
import { getSession } from './supabase/client';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-84009993`;

// Helper to make authenticated API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const session = await getSession();
  const token = session?.access_token || publicAnonKey;
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };
  
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }
  
  return response.json();
}

// ============================================
// AUTH API
// ============================================

export async function signUpUser(email: string, password: string, name: string) {
  return apiCall('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  });
}

export async function checkSession() {
  return apiCall('/auth/session');
}

// ============================================
// PROFILE API
// ============================================

export async function getProfile() {
  return apiCall('/profile');
}

export async function updateProfile(updates: any) {
  return apiCall('/profile', {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

// ============================================
// SUBSCRIPTION API
// ============================================

export async function getSubscription() {
  return apiCall('/subscription');
}

export async function activateSubscription(plan: string, durationMonths: number) {
  return apiCall('/subscription/activate', {
    method: 'POST',
    body: JSON.stringify({ plan, durationMonths }),
  });
}

// ============================================
// CART API
// ============================================

export async function getCart() {
  return apiCall('/cart');
}

export async function addToCart(item: any) {
  return apiCall('/cart/add', {
    method: 'POST',
    body: JSON.stringify(item),
  });
}

export async function removeFromCart(itemId: string) {
  return apiCall(`/cart/${itemId}`, {
    method: 'DELETE',
  });
}

export async function clearCart() {
  return apiCall('/cart', {
    method: 'DELETE',
  });
}

// ============================================
// PURCHASE & LIBRARY API
// ============================================

export async function checkout() {
  return apiCall('/checkout', {
    method: 'POST',
  });
}

export async function getLibrary() {
  return apiCall('/library');
}

// ============================================
// BOOKING API
// ============================================

export async function getTrainers() {
  return apiCall('/trainers');
}

export async function createBooking(bookingData: any) {
  return apiCall('/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });
}

export async function getBookings() {
  return apiCall('/bookings');
}

export async function cancelBooking(bookingId: string) {
  return apiCall(`/bookings/${bookingId}`, {
    method: 'DELETE',
  });
}

// ============================================
// PROGRESS API
// ============================================

export async function saveProgress(type: 'puzzle' | 'quiz', progressData: any) {
  return apiCall(`/progress/${type}`, {
    method: 'POST',
    body: JSON.stringify(progressData),
  });
}

export async function getProgress(type: 'puzzle' | 'quiz') {
  return apiCall(`/progress/${type}`);
}

// ============================================
// SEED DATA (Development)
// ============================================

export async function seedTrainers() {
  return apiCall('/seed-trainers', {
    method: 'POST',
  });
}
