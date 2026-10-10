/**
 * Reliable Curated Image Assets & Graceful Fallbacks for THE AVES
 * Warm, cinematic café, artisan coffee, pastries, book sanctuaries & vintage textures.
 */

export const VINTAGE_FALLBACKS = {
  coffee: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
  latte: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=800&q=80',
  tea: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
  waffle: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80',
  dessert: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
  croissant: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
  cafeInterior: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
  books: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
  patron: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
};

export function getSafeImageUrl(url?: string | null, category?: string): string {
  if (url && url.startsWith('http')) {
    return url;
  }
  const cat = (category || '').toUpperCase();
  if (cat.includes('HOT') || cat.includes('COFFEE')) return VINTAGE_FALLBACKS.latte;
  if (cat.includes('TEA')) return VINTAGE_FALLBACKS.tea;
  if (cat.includes('DESSERT') || cat.includes('SWEET')) return VINTAGE_FALLBACKS.dessert;
  if (cat.includes('BITES') || cat.includes('MAIN')) return VINTAGE_FALLBACKS.croissant;
  return VINTAGE_FALLBACKS.coffee;
}

export function handleImageError(event: React.SyntheticEvent<HTMLImageElement, Event>, fallbackUrl: string = VINTAGE_FALLBACKS.coffee) {
  const target = event.currentTarget;
  if (target.src !== fallbackUrl) {
    target.src = fallbackUrl;
  }
}
