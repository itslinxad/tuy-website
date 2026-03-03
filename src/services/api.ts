/**
 * API Service - Fetch wrapper for PHP backend
 */

const API_BASE = '/api';

interface ApiResponse<T = unknown> {
  data?: T;
  success?: boolean;
  error?: string;
  errors?: string[];
  authenticated?: boolean;
  admin?: { id: number; email: string; name: string };
  id?: number;
  updated?: number;
  filename?: string;
  original_name?: string;
  path?: string;
  message?: string;
}

async function request<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const url = `${API_BASE}/${endpoint}`;
  const res = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok && !data.error && !data.errors) {
    throw new Error(`HTTP ${res.status}`);
  }

  return data as ApiResponse<T>;
}

// ============================================
// Auth
// ============================================

export async function apiLogin(email: string, password: string) {
  return request('auth.php?action=login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function apiLogout() {
  return request('auth.php?action=logout', { method: 'POST' });
}

export async function apiCheckAuth() {
  return request('auth.php?action=check');
}

// ============================================
// Gallery
// ============================================

export interface GalleryImage {
  id: number;
  filename: string;
  original_name: string;
  category: string;
  caption: string;
  sort_order: number;
  created_at: string;
}

export async function apiGetGallery(category?: string) {
  const params = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
  return request<GalleryImage[]>(`gallery.php${params}`);
}

export async function apiAddGallery(data: { filename: string; original_name: string; category: string; caption: string }) {
  return request('gallery.php', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function apiUpdateGallery(id: number, data: Partial<Pick<GalleryImage, 'category' | 'caption' | 'sort_order'>>) {
  return request(`gallery.php?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function apiDeleteGallery(id: number) {
  return request(`gallery.php?id=${id}`, { method: 'DELETE' });
}

// ============================================
// Files (Forms + Ordinances)
// ============================================

export interface DownloadableFile {
  id: number;
  type: 'form' | 'ordinance';
  title: string;
  filename: string;
  original_name: string;
  category: string;
  description: string;
  icon: string;
  resolution_no: string | null;
  ordinance_no: string | null;
  year: number | null;
  sort_order: number;
  created_at: string;
}

export async function apiGetFiles(type?: 'form' | 'ordinance') {
  const params = type ? `?type=${type}` : '';
  return request<DownloadableFile[]>(`files.php${params}`);
}

export async function apiAddFile(data: {
  type: 'form' | 'ordinance';
  title: string;
  filename: string;
  original_name: string;
  category: string;
  description?: string;
  icon?: string;
  resolution_no?: string;
  ordinance_no?: string;
  year?: number;
}) {
  return request('files.php', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function apiUpdateFile(id: number, data: Partial<Omit<DownloadableFile, 'id' | 'type' | 'created_at'>>) {
  return request(`files.php?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function apiDeleteFile(id: number) {
  return request(`files.php?id=${id}`, { method: 'DELETE' });
}

// ============================================
// Calendar Events
// ============================================

export interface CalendarEvent {
  id: number;
  title: string;
  event_date: string;
  icon: string;
  color: string;
  created_at: string;
}

export async function apiGetEvents() {
  return request<CalendarEvent[]>('events.php');
}

export async function apiAddEvent(data: { title: string; event_date: string; icon: string; color: string }) {
  return request('events.php', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function apiUpdateEvent(id: number, data: Partial<Pick<CalendarEvent, 'title' | 'event_date' | 'icon' | 'color'>>) {
  return request(`events.php?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function apiDeleteEvent(id: number) {
  return request(`events.php?id=${id}`, { method: 'DELETE' });
}

// ============================================
// Map Pins
// ============================================

export interface MapPin {
  id: number;
  category: 'halls' | 'barangays' | 'offices';
  title: string;
  lat: number;
  lng: number;
  address: string | null;
  description: string | null;
  sort_order: number;
  created_at: string;
}

export async function apiGetPins(category?: string) {
  const params = category ? `?category=${encodeURIComponent(category)}` : '';
  return request<MapPin[]>(`pins.php${params}`);
}

export async function apiAddPin(data: {
  category: 'halls' | 'barangays' | 'offices';
  title: string;
  lat: number;
  lng: number;
  address?: string;
  description?: string;
  sort_order?: number;
}) {
  return request('pins.php', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function apiUpdatePin(id: number, data: Partial<Omit<MapPin, 'id' | 'created_at'>>) {
  return request(`pins.php?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function apiDeletePin(id: number) {
  return request(`pins.php?id=${id}`, { method: 'DELETE' });
}

// ============================================
// Settings
// ============================================

export interface SiteSettings {
  facebook_page_id?: string;
  facebook_access_token?: string;
  facebook_post_limit?: string;
  facebook_cache_duration?: string;
}

export async function apiGetSettings() {
  return request<SiteSettings>('settings.php');
}

export async function apiUpdateSettings(data: Partial<SiteSettings>) {
  return request('settings.php', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// ============================================
// File Upload
// ============================================

export async function apiUploadFile(file: File, type: 'gallery' | 'forms' | 'ordinances') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  const url = `${API_BASE}/upload.php`;
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: formData,
    // Don't set Content-Type -- browser sets multipart boundary automatically
  });

  const data = await res.json();
  if (!res.ok && !data.error) {
    throw new Error(`Upload failed: HTTP ${res.status}`);
  }

  return data as ApiResponse;
}

// ============================================
// Dashboard Stats
// ============================================

export async function apiGetDashboardStats() {
  const [gallery, forms, ordinances, events, pins] = await Promise.all([
    apiGetGallery(),
    apiGetFiles('form'),
    apiGetFiles('ordinance'),
    apiGetEvents(),
    apiGetPins(),
  ]);

  return {
    galleryCount: gallery.data?.length ?? 0,
    formsCount: forms.data?.length ?? 0,
    ordinancesCount: ordinances.data?.length ?? 0,
    eventsCount: events.data?.length ?? 0,
    pinsCount: pins.data?.length ?? 0,
  };
}
