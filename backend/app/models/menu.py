from typing import List, Optional, Literal
from pydantic import BaseModel, Field

MoodType = Literal[
    "calm",
    "tired",
    "happy",
    "celebratory",
    "low-energy",
    "energetic",
    "curious",
    "nostalgic",
    "focused",
    "social"
]

CategoryType = Literal[
    "HOT BEVERAGES",
    "COLD BEVERAGES",
    "LIGHT BITES",
    "MAIN DISHES",
    "DESSERTS",
    "SIGNATURE ITEMS"
]

TemperatureType = Literal["hot", "cold", "room"]
HeavinessType = Literal["light", "medium", "filling"]

class MenuItem(BaseModel):
    id: str
    name: str
    category: CategoryType
    description: str
    price: int = Field(..., description="Price in INR (₹)")
    ingredients: List[str] = Field(default_factory=list)
    dietary_tags: List[str] = Field(default_factory=list)
    mood_tags: List[str] = Field(default_factory=list)
    taste_tags: List[str] = Field(default_factory=list)
    temperature: TemperatureType = "hot"
    sweetness_level: int = Field(ge=0, le=5, default=1)
    spice_level: int = Field(ge=0, le=5, default=0)
    heaviness: HeavinessType = "light"
    image: str
    availability: bool = True

class MenuResponse(BaseModel):
    items: List[MenuItem]
    total: int
    categories: List[str]
