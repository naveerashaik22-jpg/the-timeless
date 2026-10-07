import json
import os
import datetime
import random
from pathlib import Path
from typing import List, Dict, Any, Optional
from ..models.menu import MenuItem
from ..models.faq import FAQItem
from ..models.book import BookItem
from ..models.echo import AnonymousPostcard, TimeCapsuleLantern, WhisperedWallMessage

DATA_DIR = Path(__file__).resolve().parent.parent.parent.parent / "data"

class Database:
    def __init__(self):
        self._menu: List[MenuItem] = []
        self._faq: List[FAQItem] = []
        self._zones: List[Dict[str, Any]] = []
        self._books: List[BookItem] = []
        self._retro_eras: List[Dict[str, Any]] = []
        self._photo_booth_templates: List[Dict[str, Any]] = []
        self._postcards: List[AnonymousPostcard] = []
        self._lanterns: List[TimeCapsuleLantern] = []
        self._whispered_walls: List[WhisperedWallMessage] = []
        self._tranquil_data: Dict[str, Any] = {}
        self._events: List[Dict[str, Any]] = []
        self._orders: Dict[str, Dict[str, Any]] = {}
        self._user_memories: Dict[str, Any] = {
            "saved_postcards": [],
            "photo_strips": [],
            "time_capsules": [],
            "saved_books": [],
            "custom_cookies": []
        }
        self.reload_data()

    def reload_data(self):
        # Load Menu
        menu_path = DATA_DIR / "menu.json"
        if menu_path.exists():
            with open(menu_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                self._menu = [MenuItem(**item) for item in data]
        else:
            self._menu = []

        # Load Books
        books_path = DATA_DIR / "books.json"
        if books_path.exists():
            with open(books_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                self._books = [BookItem(**item) for item in data]
        else:
            self._books = []

        # Load Retro Closet
        retro_path = DATA_DIR / "retro_closet.json"
        if retro_path.exists():
            with open(retro_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                self._retro_eras = data.get("eras", [])
                self._photo_booth_templates = data.get("photo_booth_templates", [])

        # Load Postcards
        postcards_path = DATA_DIR / "postcards.json"
        if postcards_path.exists():
            with open(postcards_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                self._postcards = [AnonymousPostcard(**item) for item in data]

        # Load Tranquil Prompts
        tranquil_path = DATA_DIR / "tranquil_prompts.json"
        if tranquil_path.exists():
            with open(tranquil_path, "r", encoding="utf-8") as f:
                self._tranquil_data = json.load(f)

        # Load Events
        events_path = DATA_DIR / "events.json"
        if events_path.exists():
            with open(events_path, "r", encoding="utf-8") as f:
                self._events = json.load(f)

        # Load FAQ
        faq_path = DATA_DIR / "faq.json"
        if faq_path.exists():
            with open(faq_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                self._faq = [FAQItem(**item) for item in data]

        # Load Zones
        zones_path = DATA_DIR / "zones.json"
        if zones_path.exists():
            with open(zones_path, "r", encoding="utf-8") as f:
                self._zones = json.load(f)

        # Seed initial sample lanterns if empty
        if not self._lanterns:
            self._lanterns = [
                TimeCapsuleLantern(
                    id="lan-01",
                    author_alias="The Clockmaker",
                    target_recipient="My Future Self",
                    letter_content="I hope you haven't forgotten the thrill of creating something from pure wonder. Stay curious.",
                    created_at="23 Aug 2026",
                    unlock_date="23 Aug 2027",
                    sealed=True,
                    lantern_color="#D4AF37"
                ),
                TimeCapsuleLantern(
                    id="lan-02",
                    author_alias="Stargazer",
                    target_recipient="An Unknown Future Reader",
                    letter_content="Whoever reads this across time: whatever storm you are weathering right now, the sun always rises.",
                    created_at="15 Aug 2026",
                    unlock_date="15 Aug 2028",
                    sealed=True,
                    lantern_color="#E5C378"
                )
            ]

        # Seed initial Whispered Wall messages
        if not self._whispered_walls:
            self._whispered_walls = [
                WhisperedWallMessage(
                    id="wsp-01",
                    text="I miss the sound of rain on my grandmother's tin roof.",
                    poetic_version="Like rain remembering the tin, memory gathers in the quiet eaves of the heart.",
                    timestamp="Dusk"
                ),
                WhisperedWallMessage(
                    id="wsp-02",
                    text="Learning to breathe again after a long year of sorrow.",
                    poetic_version="The lungs fill with morning mist; every dawn is a quiet permission to begin anew.",
                    timestamp="Dawn"
                )
            ]

    # Getters
    def get_all_menu(self) -> List[MenuItem]:
        return self._menu

    def get_menu_item_by_id(self, item_id: str) -> Optional[MenuItem]:
        for item in self._menu:
            if item.id == item_id:
                return item
        return None

    def get_all_books(self) -> List[BookItem]:
        return self._books

    def get_retro_eras(self) -> List[Dict[str, Any]]:
        return self._retro_eras

    def get_photo_booth_templates(self) -> List[Dict[str, Any]]:
        return self._photo_booth_templates

    def get_postcards(self) -> List[AnonymousPostcard]:
        return self._postcards

    def add_postcard(self, postcard: AnonymousPostcard):
        self._postcards.insert(0, postcard)

    def get_lanterns(self) -> List[TimeCapsuleLantern]:
        return self._lanterns

    def add_lantern(self, lantern: TimeCapsuleLantern):
        self._lanterns.insert(0, lantern)

    def get_whispered_walls(self) -> List[WhisperedWallMessage]:
        return self._whispered_walls

    def add_whispered_message(self, msg: WhisperedWallMessage):
        self._whispered_walls.insert(0, msg)

    def get_tranquil_data(self) -> Dict[str, Any]:
        return self._tranquil_data

    def get_events(self) -> List[Dict[str, Any]]:
        return self._events

    def get_all_faq(self) -> List[FAQItem]:
        return self._faq

    def get_all_zones(self) -> List[Dict[str, Any]]:
        return self._zones

    def save_order(self, order_dict: Dict[str, Any]):
        self._orders[order_dict["order_id"]] = order_dict

    def get_order(self, order_id: str) -> Optional[Dict[str, Any]]:
        return self._orders.get(order_id)

    def get_all_orders(self) -> List[Dict[str, Any]]:
        return list(self._orders.values())

    def get_user_memories(self) -> Dict[str, Any]:
        return self._user_memories

    def save_user_memory(self, category: str, item: Any):
        if category in self._user_memories:
            self._user_memories[category].insert(0, item)

db = Database()
