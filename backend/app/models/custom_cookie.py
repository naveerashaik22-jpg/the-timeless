from typing import List, Optional
from pydantic import BaseModel, Field

class CookieThemeOption(BaseModel):
    id: str
    name: str
    category: str  # Literature, Superhero, Nature, Custom
    default_flavor: str
    default_frosting: str
    default_sprinkles: str
    preview_icon: str
    tagline: str

class CustomCookieBuild(BaseModel):
    id: Optional[str] = None
    theme_name: str = "Shakespeare"
    cookie_flavor: str = "Vanilla Bean Shortbread"  # Vanilla, Dark Chocolate, Spiced Honey, Red Velvet, Matcha
    shape: str = "Classic Vintage Round"  # Round, Star, Heart, Book, Stamp
    chocolate_chips: str = "Dark Callebaut Chocolate"  # None, Dark, Milk, White
    frosting: str = "Madagascar Vanilla Royal Icing"  # Vanilla, Rose Glaze, Salted Caramel, Dark Chocolate Ganache
    drizzle: str = "Golden Honey Drizzle"  # None, Honey, Chocolate, Salted Caramel, Raspberry
    sprinkles: str = "Edible 24k Gold Flakes & Pearl Sugar"  # None, Gold Flakes, Rainbow Stars, Crushed Pecans, Rose Petals
    toppings: List[str] = Field(default_factory=list)
    custom_message: Optional[str] = "To be, or not to be"
    recipient_name: Optional[str] = None
    price: int = 240
    preview_badge: Optional[str] = None

class CustomKitchenConfigResponse(BaseModel):
    themes: List[CookieThemeOption]
    flavors: List[str]
    shapes: List[str]
    frostings: List[str]
    drizzles: List[str]
    sprinkles_options: List[str]
    base_price: int = 240
