import uuid
from typing import List, Dict, Any
from fastapi import APIRouter
from ..models.custom_cookie import CookieThemeOption, CustomCookieBuild, CustomKitchenConfigResponse
from ..database.db import db

router = APIRouter(prefix="/api/custom-kitchen", tags=["The AVES Custom Kitchen"])

THEMES: List[CookieThemeOption] = [
    CookieThemeOption(
        id="thm-shakespeare",
        name="Shakespeare",
        category="Literature",
        default_flavor="Vanilla Bean Shortbread",
        default_frosting="Madagascar Vanilla Royal Icing",
        default_sprinkles="Edible 24k Gold Flakes & Pearl Sugar",
        preview_icon="🪶",
        tagline="A sweet soliloquy baked with poetic grace"
    ),
    CookieThemeOption(
        id="thm-spiderman",
        name="Spider-Man",
        category="Superhero",
        default_flavor="Red Velvet Cocoa",
        default_frosting="Crimson & Dark Chocolate Web Glaze",
        default_sprinkles="Sparkling Star Sugar",
        preview_icon="🕷️",
        tagline="With great flavor comes great responsibility"
    ),
    CookieThemeOption(
        id="thm-sherlock",
        name="Sherlock Holmes",
        category="Mystery",
        default_flavor="Dark Roasted Mocha & Nutmeg",
        default_frosting="Smoked Caramel Glaze",
        default_sprinkles="Crushed Candied Pecans",
        preview_icon="🔍",
        tagline="Elementary, my dear guest — a deductive delight"
    ),
    CookieThemeOption(
        id="thm-jane-austen",
        name="Jane Austen",
        category="Literature",
        default_flavor="Wildflower Honey & Lavender",
        default_frosting="Damascus Rose Water Glaze",
        default_sprinkles="Dried Organic Rose Petals",
        preview_icon="💌",
        tagline="An accomplishment of wit, warmth, and fine confectionery"
    ),
    CookieThemeOption(
        id="thm-alice",
        name="Alice in Wonderland",
        category="Fable",
        default_flavor="Cardamom Spiced Chai Shortbread",
        default_frosting="Ethereal Butterfly Pea Blue Glaze",
        default_sprinkles="Rainbow Sugar Crystals",
        preview_icon="🐇",
        tagline="Curiouser and curiouser — baked for the Mad Tea Party"
    ),
    CookieThemeOption(
        id="thm-flowers",
        name="Victorian Botanical Flowers",
        category="Nature",
        default_flavor="Lemon Myrtle & Almond",
        default_frosting="White Honey Icing",
        default_sprinkles="Edible Pressed Cornflowers",
        preview_icon="🌸",
        tagline="A blooming bouquet of fragrant vintage flavors"
    ),
    CookieThemeOption(
        id="thm-cats",
        name="Vintage Literary Cats",
        category="Companion",
        default_flavor="Butterscotch & Sea Salt",
        default_frosting="Dark Ganache Whiskers",
        default_sprinkles="Toasted Coconut Shavings",
        preview_icon="🐾",
        tagline="Cozy purrs and warm buttery perfection"
    ),
    CookieThemeOption(
        id="thm-space",
        name="Cosmic Astrolabe & Starlight",
        category="Astronomy",
        default_flavor="Dark Dutch Callebaut Cocoa",
        default_frosting="Midnight Black Cocoa Glaze",
        default_sprinkles="Silver Starlight Pearls",
        preview_icon="✨",
        tagline="For navigators of the midnight sky"
    )
]

FLAVORS = [
    "Vanilla Bean Shortbread",
    "Dark Callebaut Chocolate",
    "Wildflower Honey & Lavender",
    "Red Velvet Cocoa",
    "Cardamom Spiced Chai",
    "Butterscotch & Sea Salt",
    "Lemon Myrtle & Almond"
]

SHAPES = [
    "Classic Vintage Round",
    "Antique Stamp Rectangle",
    "Old Book Silhouette",
    "Starlight Star",
    "Victorian Heart"
]

FROSTINGS = [
    "Madagascar Vanilla Royal Icing",
    "Damascus Rose Water Glaze",
    "Dark Chocolate Ganache",
    "Smoked Fleur de Sel Caramel",
    "Wild Berry Reduction Glaze",
    "Pure Unfrosted Artisan Crust"
]

DRIZZLES = [
    "None",
    "Golden Himalayan Honey Drizzle",
    "Warm Belgian Dark Chocolate",
    "Salted Butterscotch Drizzle",
    "Wild Forest Berry Coulis"
]

SPRINKLES_OPTIONS = [
    "Edible 24k Gold Flakes & Pearl Sugar",
    "Crushed Toasted Pecans & Pistachios",
    "Organic Dried Rose Petals",
    "Silver Starlight Pearls",
    "Sparkling Sugar Crystals",
    "None"
]

@router.get("/config", response_model=CustomKitchenConfigResponse)
async def get_custom_kitchen_config():
    return CustomKitchenConfigResponse(
        themes=THEMES,
        flavors=FLAVORS,
        shapes=SHAPES,
        frostings=FROSTINGS,
        drizzles=DRIZZLES,
        sprinkles_options=SPRINKLES_OPTIONS,
        base_price=240
    )

@router.post("/build", response_model=CustomCookieBuild)
async def build_custom_cookie(cookie: CustomCookieBuild):
    cookie_id = f"cookie-{uuid.uuid4().hex[:8]}"
    cookie.id = cookie_id
    
    # Calculate price based on premium additions
    price = 240
    if "Gold" in cookie.sprinkles:
        price += 40
    if cookie.drizzle != "None":
        price += 20
    if len(cookie.toppings) > 0:
        price += len(cookie.toppings) * 20
    cookie.price = price

    cookie.preview_badge = f"Your {cookie.theme_name} Cookie is crafted for the stage."
    
    # Save to user memory
    db.save_user_memory("custom_cookies", cookie.model_dump())
    
    return cookie
