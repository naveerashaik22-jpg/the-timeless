export type MoodType =
  | 'calm'
  | 'tired'
  | 'happy'
  | 'celebratory'
  | 'low-energy'
  | 'energetic'
  | 'curious'
  | 'nostalgic'
  | 'focused'
  | 'social'
  | 'cozy'
  | 'adventurous';

export type CategoryType =
  | 'HOT BEVERAGES'
  | 'COLD BEVERAGES'
  | 'LIGHT BITES'
  | 'MAIN DISHES'
  | 'DESSERTS'
  | 'SIGNATURE ITEMS'
  | 'CUSTOM CREATIONS';

export type TemperatureType = 'hot' | 'cold' | 'room';
export type HeavinessType = 'light' | 'medium' | 'filling';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryType;
  description: string;
  price: number;
  ingredients: string[];
  dietary_tags: string[];
  mood_tags: string[];
  taste_tags: string[];
  temperature: TemperatureType;
  sweetness_level: number;
  spice_level: number;
  heaviness: HeavinessType;
  customizable?: boolean;
  image: string;
  availability: boolean;
}

export interface DetectedPreferences {
  mood?: string;
  mood_confidence?: number;
  dietary?: string;
  taste?: string;
  temperature?: string;
  sweetness?: string;
  spice?: string;
  heaviness?: string;
  beverage_type?: string;
  dessert_preference?: boolean;
  activity?: string;
  budget?: number;
  allergies?: string[];
}

export interface MatchBreakdown {
  mood_score: number;
  taste_score: number;
  dietary_score: number;
  temperature_score: number;
  sweet_spice_score: number;
  budget_score: number;
  total_score: number;
}

export interface RecommendationItem {
  item: MenuItem;
  match_score: number;
  breakdown: MatchBreakdown;
  why_it_matches: string;
  pairing_suggestion?: string;
}

export interface ZoneRecommendation {
  zone_id: string;
  name: string;
  tagline: string;
  description: string;
  seating_name: string;
  ambiance: string;
  why_it_fits: string;
  image: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  mood?: string;
  preferences?: DetectedPreferences;
  recommendations?: RecommendationItem[];
  zone_recommendation?: ZoneRecommendation;
  follow_up_question?: string;
  is_faq?: boolean;
  is_safety_redirect?: boolean;
}

export interface CartItem {
  item_id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image?: string;
  customization_notes?: string;
}

export interface OrderResponse {
  order_id: string;
  status: string;
  created_at: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  table_or_zone: string;
  estimated_prep_time_minutes: number;
  message: string;
}

export interface FAQItem {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
}

export interface ZoneItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  ideal_moods: string[];
  ambiance: string;
  features: string[];
  image: string;
}

// ----------------------------------------------------
// THE AVES EXTENSIONS: COOKIES, BOOKS, RETRO, ECHO, ETC.
// ----------------------------------------------------

export interface CookieThemeOption {
  id: string;
  name: string;
  category: string;
  default_flavor: string;
  default_frosting: string;
  default_sprinkles: string;
  preview_icon: string;
  tagline: string;
}

export interface CustomCookieBuild {
  id?: string;
  theme_name: string;
  cookie_flavor: string;
  shape: string;
  chocolate_chips: string;
  frosting: string;
  drizzle: string;
  sprinkles: string;
  toppings: string[];
  custom_message?: string;
  recipient_name?: string;
  price: number;
  preview_badge?: string;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: string;
  mood_tags: string[];
  vibe: string;
  quote: string;
  description: string;
  cover_image: string;
  shelf_location: string;
  available_for_exchange: boolean;
}

export interface RetroOutfit {
  name: string;
  type: string;
  details: string;
}

export interface RetroEra {
  id: string;
  name: string;
  tagline: string;
  description: string;
  palette: string[];
  image: string;
  outfits: RetroOutfit[];
  props: string[];
}

export interface PhotoBoothTemplate {
  id: string;
  name: string;
  desc: string;
}

export interface AnonymousPostcard {
  id: string;
  theme: string;
  location: string;
  date: string;
  message: string;
  likes: number;
  replies_count: number;
}

export interface TimeCapsuleLantern {
  id: string;
  author_alias: string;
  target_recipient: string;
  letter_content: string;
  created_at: string;
  unlock_date: string;
  sealed: boolean;
  lantern_color: string;
}

export interface WhisperedWallMessage {
  id: string;
  text: string;
  poetic_version: string;
  timestamp: string;
}

export interface SoundscapeItem {
  id: string;
  name: string;
  category: string;
  desc: string;
}

export interface ReflectionPrompt {
  id: string;
  category: string;
  question: string;
}

export interface EventItem {
  id: string;
  title: string;
  division: string;
  tagline: string;
  description: string;
  schedule: string;
  price: number;
  included: string[];
  capacity: number;
  image: string;
}

export interface UserPreferences {
  favoriteFlavors: string[];
  dietaryPreferences: string[];
  favoriteCategories: string[];
  sweetnessPreference: string;
  spicePreference: string;
  roastPreference: string;
}

export interface PastOrder {
  id: string;
  item: string;
  category: string;
  date: string;
  price: number;
  cafe: string;
  status: 'Served' | 'Completed' | 'Preparing';
  image: string;
}

export interface UserDiscovery {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  memoryNote: string;
}

export interface AvesMemoryInsight {
  id: string;
  statement: string;
  category: string;
  active: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  memberSince: string;
  isGuest: boolean;
  preferences: UserPreferences;
  favorites: string[];
  previousOrders: PastOrder[];
  discoveries: UserDiscovery[];
  memories: AvesMemoryInsight[];
  personalizationPaused?: boolean;
}
