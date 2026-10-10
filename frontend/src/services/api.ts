import {
  MenuItem,
  FAQItem,
  ZoneItem,
  OrderResponse,
  CartItem,
  DetectedPreferences,
  RecommendationItem,
  ZoneRecommendation,
  CookieThemeOption,
  CustomCookieBuild,
  BookItem,
  RetroEra,
  PhotoBoothTemplate,
  AnonymousPostcard,
  TimeCapsuleLantern,
  WhisperedWallMessage,
  SoundscapeItem,
  ReflectionPrompt,
  EventItem
} from '../types';

export interface RecommendationResponse {
  mood?: string;
  detected_preferences?: DetectedPreferences;
  recommendations: RecommendationItem[];
  zone_recommendation?: ZoneRecommendation;
  summary_message: string;
}
// Normalize API_BASE for reliable local and production deployment
const rawBase = ((import.meta as any).env?.VITE_API_BASE_URL as string | undefined)?.trim();
const cleanBase = rawBase ? rawBase.replace(/\/+$/, '') : '';
export const API_BASE = cleanBase
  ? (cleanBase.endsWith('/api') ? cleanBase : `${cleanBase}/api`)
  : '/api';

// 1. Menu & Cafe
export async function fetchMenu(params?: { category?: string; dietary?: string; search?: string }): Promise<{ items: MenuItem[]; total: number; categories: string[] }> {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.dietary) query.append('dietary', params.dietary);
  if (params?.search) query.append('search', params.search);

  const res = await fetch(`${API_BASE}/menu?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch menu items');
  return res.json();
}

export async function fetchRecommendations(preferences: DetectedPreferences): Promise<RecommendationResponse> {
  const res = await fetch(`${API_BASE}/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(preferences),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Failed to fetch recommendations' }));
    throw new Error(err.detail || 'Failed to fetch recommendations');
  }
  return res.json();
}

export async function sendChatMessage(data: {
  message: string;
  session_id?: string;
  history?: any[];
  current_preferences?: DetectedPreferences;
}) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Network error' }));
    throw new Error(err.detail || 'Failed to send message');
  }
  return res.json();
}

export async function placeOrder(orderData: {
  items: CartItem[];
  user_id?: string;
  customer_name?: string;
  table_or_zone?: string;
  special_instructions?: string;
  applied_mood?: string;
}, token?: string): Promise<OrderResponse> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const authToken = token || localStorage.getItem('aves_auth_token');
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers,
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    let errorDetail = 'Failed to place order';
    try {
      const err = await res.json();
      errorDetail = err.detail || errorDetail;
    } catch {
      errorDetail = `Server returned status ${res.status}: ${res.statusText || 'Unable to place order'}`;
    }
    throw new Error(errorDetail);
  }
  return res.json();
}

export async function fetchMyOrders(userId?: string, token?: string): Promise<OrderResponse[]> {
  const headers: Record<string, string> = {};
  const authToken = token || localStorage.getItem('aves_auth_token');
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const query = userId ? `?user_id=${encodeURIComponent(userId)}` : '';
  const res = await fetch(`${API_BASE}/orders/my-orders${query}`, { headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Failed to retrieve order history' }));
    throw new Error(err.detail || 'Failed to retrieve order history');
  }
  return res.json();
}

export async function fetchFaqs(search?: string): Promise<FAQItem[]> {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  const res = await fetch(`${API_BASE}/faq${query}`);
  if (!res.ok) throw new Error('Failed to fetch FAQs');
  return res.json();
}

export async function fetchZones(): Promise<ZoneItem[]> {
  const res = await fetch(`${API_BASE}/zones`);
  if (!res.ok) throw new Error('Failed to fetch AVES zones');
  return res.json();
}

// 2. The AVES Custom Kitchen
export async function fetchCustomKitchenConfig(): Promise<{
  themes: CookieThemeOption[];
  flavors: string[];
  shapes: string[];
  frostings: string[];
  drizzles: string[];
  sprinkles_options: string[];
  base_price: number;
}> {
  const res = await fetch(`${API_BASE}/custom-kitchen/config`);
  if (!res.ok) throw new Error('Failed to fetch Custom Kitchen config');
  return res.json();
}

export async function buildCustomCookie(cookie: CustomCookieBuild): Promise<CustomCookieBuild> {
  const res = await fetch(`${API_BASE}/custom-kitchen/build`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cookie),
  });
  if (!res.ok) throw new Error('Failed to create customized cookie');
  return res.json();
}

// 3. Ink & Ember Bookstore
export async function fetchBooks(genre?: string, search?: string): Promise<BookItem[]> {
  const query = new URLSearchParams();
  if (genre) query.append('genre', genre);
  if (search) query.append('search', search);
  const res = await fetch(`${API_BASE}/books?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json();
}

export async function recommendBook(moodOrVibe: string): Promise<{ query: string; recommended_books: BookItem[]; poetic_summary: string }> {
  const res = await fetch(`${API_BASE}/books/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mood_or_vibe: moodOrVibe }),
  });
  if (!res.ok) throw new Error('Failed to get book recommendation');
  return res.json();
}

export async function exchangeBookOnShelf(bookTitle: string, note?: string) {
  const res = await fetch(`${API_BASE}/books/forgotten-shelf?book_title=${encodeURIComponent(bookTitle)}&user_note=${encodeURIComponent(note || '')}`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to exchange book');
  return res.json();
}

// 4. Retro Memory Studio
export async function fetchRetroCloset(): Promise<RetroEra[]> {
  const res = await fetch(`${API_BASE}/retro/closet`);
  if (!res.ok) throw new Error('Failed to fetch retro closet');
  return res.json();
}

export async function fetchPhotoBoothTemplates(): Promise<PhotoBoothTemplate[]> {
  const res = await fetch(`${API_BASE}/retro/templates`);
  if (!res.ok) throw new Error('Failed to fetch photo booth templates');
  return res.json();
}

export async function capturePhotoBoothStrip(data: {
  template_id: string;
  era_name: string;
  custom_caption?: string;
  image_url?: string;
}) {
  const res = await fetch(`${API_BASE}/retro/capture`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to capture photo strip');
  return res.json();
}

// 5. Echo Booth • Room of Strangers
export async function fetchPostcards(): Promise<AnonymousPostcard[]> {
  const res = await fetch(`${API_BASE}/echo/postcards`);
  if (!res.ok) throw new Error('Failed to fetch postcards');
  return res.json();
}

export async function sendAnonymousPostcard(data: { theme: string; message: string; location?: string }): Promise<AnonymousPostcard> {
  const res = await fetch(`${API_BASE}/echo/postcards`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to send postcard');
  return res.json();
}

export async function fetchFloatingLanterns(): Promise<TimeCapsuleLantern[]> {
  const res = await fetch(`${API_BASE}/echo/lanterns`);
  if (!res.ok) throw new Error('Failed to fetch lanterns');
  return res.json();
}

export async function releaseLantern(data: {
  author_alias?: string;
  target_recipient?: string;
  letter_content: string;
  unlock_years_ahead?: number;
}): Promise<TimeCapsuleLantern> {
  const query = new URLSearchParams();
  if (data.author_alias) query.append('author_alias', data.author_alias);
  if (data.target_recipient) query.append('target_recipient', data.target_recipient);
  query.append('letter_content', data.letter_content);
  if (data.unlock_years_ahead) query.append('unlock_years_ahead', data.unlock_years_ahead.toString());

  const res = await fetch(`${API_BASE}/echo/lanterns?${query.toString()}`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to release lantern');
  return res.json();
}

export async function fetchWhisperedWalls(): Promise<WhisperedWallMessage[]> {
  const res = await fetch(`${API_BASE}/echo/whispered-walls`);
  if (!res.ok) throw new Error('Failed to fetch whispered walls');
  return res.json();
}

export async function postWhisperedMessage(text: string): Promise<WhisperedWallMessage> {
  const res = await fetch(`${API_BASE}/echo/whispered-walls?text=${encodeURIComponent(text)}`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to whisper message');
  return res.json();
}

// 6. The Tranquil Nook
export async function fetchTranquilData(): Promise<{ ambient_soundscapes: SoundscapeItem[]; reflection_prompts: ReflectionPrompt[] }> {
  const res = await fetch(`${API_BASE}/tranquil/data`);
  if (!res.ok) throw new Error('Failed to fetch tranquil data');
  return res.json();
}

// 7. Tiny Tales
export async function fetchTinyTalesEvents(): Promise<EventItem[]> {
  const res = await fetch(`${API_BASE}/tiny-tales/events`);
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}

export async function generateKidStory(hero: string, companion: string, setting: string) {
  const query = new URLSearchParams({ hero_name: hero, companion: companion, setting: setting });
  const res = await fetch(`${API_BASE}/tiny-tales/story?${query.toString()}`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to generate story');
  return res.json();
}

// 8. My AVES Memories
export async function fetchMyAvesMemories(): Promise<any> {
  const res = await fetch(`${API_BASE}/my-aves`);
  if (!res.ok) throw new Error('Failed to fetch My AVES memories');
  return res.json();
}

export async function saveMemoryItem(category: string, item: any) {
  const res = await fetch(`${API_BASE}/my-aves/save?category=${encodeURIComponent(category)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to save memory');
  return res.json();
}

// 9. Real Patron Authentication & Identity
export async function loginApi(email: string, password: string): Promise<any> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Invalid email or password.' }));
    throw new Error(err.detail || 'Failed to sign in.');
  }
  return res.json();
}

export async function registerApi(name: string, email: string, password: string): Promise<any> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Failed to create patron account.' }));
    throw new Error(err.detail || 'Failed to register account.');
  }
  return res.json();
}

export async function guestSessionApi(guestName?: string): Promise<any> {
  const res = await fetch(`${API_BASE}/auth/guest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guest_name: guestName || 'Guest Traveler' }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Failed to establish guest session.' }));
    throw new Error(err.detail || 'Failed to initialize guest preview.');
  }
  return res.json();
}

export async function fetchCurrentUserApi(token: string): Promise<any> {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Session expired');
  return res.json();
}

export async function updatePreferencesApi(preferences: any, token: string): Promise<any> {
  const res = await fetch(`${API_BASE}/auth/preferences`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ preferences }),
  });
  if (!res.ok) throw new Error('Failed to update preferences');
  return res.json();
}

export async function toggleFavoriteApi(itemId: string, token: string): Promise<{ item_id: string; is_favorited: boolean }> {
  const res = await fetch(`${API_BASE}/auth/favorites/toggle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ item_id: itemId }),
  });
  if (!res.ok) throw new Error('Failed to toggle favorite');
  return res.json();
}

export async function addMemoryApi(statement: string, category: string, token: string): Promise<any> {
  const res = await fetch(`${API_BASE}/auth/memories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ statement, category }),
  });
  if (!res.ok) throw new Error('Failed to record memory');
  return res.json();
}

export async function deleteMemoryApi(memoryId: string, token: string): Promise<any> {
  const res = await fetch(`${API_BASE}/auth/memories/${encodeURIComponent(memoryId)}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to delete memory');
  return res.json();
}
