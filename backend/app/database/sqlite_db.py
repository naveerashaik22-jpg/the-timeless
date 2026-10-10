import sqlite3
import json
import os
import hashlib
import datetime
from pathlib import Path
from typing import List, Dict, Any, Optional

DATA_DIR = Path(__file__).resolve().parent.parent.parent.parent / "data"
DB_PATH = DATA_DIR / "the_aves.db"

class SQLiteDatabase:
    def __init__(self, db_path: Optional[Path] = None):
        self.db_path = str(db_path or DB_PATH)
        self.init_db()

    def _get_connection(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path, check_same_thread=False, timeout=10.0)
        conn.row_factory = sqlite3.Row
        try:
            conn.execute("PRAGMA journal_mode=WAL;")
            conn.execute("PRAGMA synchronous=NORMAL;")
            conn.execute("PRAGMA busy_timeout=5000;")
        except Exception:
            pass
        return conn

    def init_db(self):
        """Initializes tables for persistence across server restarts."""
        with self._get_connection() as conn:
            cursor = conn.cursor()
            
            # Users Table
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                salt TEXT NOT NULL,
                name TEXT NOT NULL,
                member_since TEXT,
                is_guest INTEGER DEFAULT 0,
                preferences_json TEXT,
                avatar TEXT,
                created_at TEXT
            );
            """)

            # Orders Table
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS orders (
                order_id TEXT PRIMARY KEY,
                user_id TEXT,
                customer_name TEXT,
                table_or_zone TEXT,
                items_json TEXT NOT NULL,
                subtotal INTEGER NOT NULL,
                tax INTEGER NOT NULL,
                total INTEGER NOT NULL,
                prep_time INTEGER NOT NULL,
                status TEXT NOT NULL,
                special_instructions TEXT,
                applied_mood TEXT,
                created_at TEXT NOT NULL,
                created_timestamp REAL NOT NULL
            );
            """)

            # User Memories Table (isolated per user)
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_memories (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                statement TEXT NOT NULL,
                category TEXT NOT NULL,
                active INTEGER DEFAULT 1,
                created_at TEXT NOT NULL
            );
            """)

            # User Favorites Table (isolated per user)
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_favorites (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                item_id TEXT NOT NULL,
                created_at TEXT NOT NULL,
                UNIQUE(user_id, item_id)
            );
            """)

            # Seed initial patrons if empty
            cursor.execute("SELECT COUNT(*) FROM users;")
            if cursor.fetchone()[0] == 0:
                pwd1, salt1 = SQLiteDatabase.hash_password("vintage1926")
                cursor.execute("""
                INSERT INTO users (id, email, password_hash, salt, name, member_since, is_guest, preferences_json, avatar, created_at)
                VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?, ?);
                """, (
                    "usr-naveera-01",
                    "naveera@aves.cafe",
                    pwd1,
                    salt1,
                    "Naveera",
                    "Autumn 2026 • Veranda Patron",
                    json.dumps({
                        "favoriteFlavors": ["Bourbon Vanilla", "Cardamom", "Ceylon Cinnamon"],
                        "dietaryPreferences": ["Vegetarian"],
                        "favoriteCategories": ["HOT BEVERAGES", "DESSERTS"],
                        "sweetnessPreference": "Mildly Sweet (Level 2/5)",
                        "spicePreference": "Gentle Aromatic Spice",
                        "roastPreference": "Medium-Dark Single Origin Arabica"
                    }),
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
                    "23 Aug 2026"
                ))
                pwd2, salt2 = SQLiteDatabase.hash_password("vintage1926")
                cursor.execute("""
                INSERT INTO users (id, email, password_hash, salt, name, member_since, is_guest, preferences_json, avatar, created_at)
                VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?, ?);
                """, (
                    "usr-julian-02",
                    "julian@aves.cafe",
                    pwd2,
                    salt2,
                    "Julian Hayes",
                    "Summer 2026 • Library Nook Regular",
                    json.dumps({
                        "favoriteFlavors": ["Dark Cacao", "Hazelnut", "Single Origin Roast"],
                        "dietaryPreferences": ["Plant-Based Milk Option"],
                        "favoriteCategories": ["HOT BEVERAGES"],
                        "sweetnessPreference": "Low Sweetness (Level 1/5)",
                        "spicePreference": "Unspiced Single-Origin",
                        "roastPreference": "Dark Estate Arabica"
                    }),
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
                    "15 Jun 2026"
                ))
                cursor.execute("""
                INSERT INTO user_favorites (id, user_id, item_id, created_at)
                VALUES ('fav-01', 'usr-naveera-01', 'item-02', '23 Aug 2026');
                """)
                cursor.execute("""
                INSERT INTO user_favorites (id, user_id, item_id, created_at)
                VALUES ('fav-02', 'usr-naveera-01', 'item-01', '24 Aug 2026');
                """)
                cursor.execute("""
                INSERT INTO user_memories (id, user_id, statement, category, active, created_at)
                VALUES ('mem-01', 'usr-naveera-01', 'Leans toward comforting warmth, bourbon vanilla, and velvety oat microfoam.', 'Taste Pattern', 1, '23 Aug 2026');
                """)

            conn.commit()

    # --- PASSWORD HASHING UTILITIES ---
    @staticmethod
    def hash_password(password: str, salt: Optional[str] = None) -> tuple[str, str]:
        if not salt:
            salt = os.urandom(16).hex()
        pwd_hash = hashlib.pbkdf2_hmac(
            "sha256",
            password.encode("utf-8"),
            salt.encode("utf-8"),
            100000
        ).hex()
        return pwd_hash, salt

    @staticmethod
    def verify_password(password: str, stored_hash: str, salt: str) -> bool:
        calculated_hash, _ = SQLiteDatabase.hash_password(password, salt)
        return calculated_hash == stored_hash

    # --- USER OPERATIONS ---
    def create_user(
        self,
        email: str,
        password: str,
        name: str,
        user_id: Optional[str] = None,
        is_guest: bool = False,
        avatar: Optional[str] = None
    ) -> Dict[str, Any]:
        user_id = user_id or f"usr-{os.urandom(4).hex()}"
        pwd_hash, salt = self.hash_password(password)
        now_str = datetime.datetime.now().strftime("%I:%M %p, %d %b %Y")
        member_since = "Table Regular • Tabletop Session" if is_guest else "Autumn 2026 • Verified Patron"
        
        default_prefs = {
            "favoriteFlavors": ["Bourbon Vanilla", "Ceylon Cinnamon", "Dark Cacao", "Cardamom"],
            "dietaryPreferences": ["Vegetarian"],
            "favoriteCategories": ["HOT BEVERAGES", "DESSERTS"],
            "sweetnessPreference": "Mildly Sweet (Level 2/5)",
            "spicePreference": "Gentle Aromatic Spice",
            "roastPreference": "Medium-Dark Single Origin Arabica"
        }

        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO users (id, email, password_hash, salt, name, member_since, is_guest, preferences_json, avatar, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            """, (
                user_id,
                email.lower().strip(),
                pwd_hash,
                salt,
                name.strip(),
                member_since,
                1 if is_guest else 0,
                json.dumps(default_prefs),
                avatar or "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
                now_str
            ))
            conn.commit()

        return self.get_user_by_id(user_id)

    def get_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE email = ?;", (email.lower().strip(),))
            row = cursor.fetchone()
            if not row:
                return None
            data = dict(row)
            if data.get("preferences_json"):
                data["preferences"] = json.loads(data["preferences_json"])
            else:
                data["preferences"] = {}
            return data

    def get_user_by_id(self, user_id: str) -> Optional[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE id = ?;", (user_id,))
            row = cursor.fetchone()
            if not row:
                return None
            data = dict(row)
            if data.get("preferences_json"):
                data["preferences"] = json.loads(data["preferences_json"])
            else:
                data["preferences"] = {}
            return data

    def update_user_preferences(self, user_id: str, preferences: Dict[str, Any]) -> bool:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            UPDATE users SET preferences_json = ? WHERE id = ?;
            """, (json.dumps(preferences), user_id))
            conn.commit()
            return cursor.rowcount > 0

    # --- ORDER PERSISTENCE ---
    def save_order(self, order_dict: Dict[str, Any]):
        now = datetime.datetime.now()
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT OR REPLACE INTO orders (
                order_id, user_id, customer_name, table_or_zone, items_json,
                subtotal, tax, total, prep_time, status, special_instructions,
                applied_mood, created_at, created_timestamp
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            """, (
                order_dict["order_id"],
                order_dict.get("user_id"),
                order_dict.get("customer_name") or "Guest Traveler",
                order_dict.get("table_or_zone") or "The Timeless Main Lounge",
                json.dumps(order_dict.get("items", [])),
                order_dict["subtotal"],
                order_dict["tax"],
                order_dict["total"],
                order_dict.get("estimated_prep_time_minutes", 12),
                order_dict.get("status", "Order Received & Brewing"),
                order_dict.get("special_instructions"),
                order_dict.get("applied_mood"),
                order_dict.get("created_at", now.strftime("%I:%M %p, %d %b %Y")),
                now.timestamp()
            ))
            conn.commit()

    def get_order(self, order_id: str) -> Optional[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM orders WHERE order_id = ?;", (order_id,))
            row = cursor.fetchone()
            if not row:
                return None
            d = dict(row)
            d["items"] = json.loads(d["items_json"]) if d.get("items_json") else []
            d["estimated_prep_time_minutes"] = d.get("prep_time", 12)
            d["message"] = "Your order has been received by our baristas and kitchen artisans. We will bring it directly to your seating area when ready."
            return d

    def get_orders_by_user(self, user_id: str) -> List[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "SELECT * FROM orders WHERE user_id = ? ORDER BY created_timestamp DESC;",
                (user_id,)
            )
            rows = cursor.fetchall()
            orders = []
            for row in rows:
                d = dict(row)
                d["items"] = json.loads(d["items_json"]) if d.get("items_json") else []
                d["estimated_prep_time_minutes"] = d.get("prep_time", 12)
                d["message"] = "Your order has been received by our baristas and kitchen artisans."
                orders.append(d)
            return orders

    def get_all_orders(self) -> List[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM orders ORDER BY created_timestamp DESC;")
            rows = cursor.fetchall()
            orders = []
            for row in rows:
                d = dict(row)
                d["items"] = json.loads(d["items_json"]) if d.get("items_json") else []
                d["estimated_prep_time_minutes"] = d.get("prep_time", 12)
                orders.append(d)
            return orders

    # --- USER MEMORIES (Isolated per user) ---
    def get_user_memories(self, user_id: str) -> List[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "SELECT * FROM user_memories WHERE user_id = ? AND active = 1 ORDER BY created_at DESC;",
                (user_id,)
            )
            rows = cursor.fetchall()
            return [dict(r) for r in rows]

    def add_user_memory(self, user_id: str, statement: str, category: str) -> Dict[str, Any]:
        mem_id = f"mem-{os.urandom(4).hex()}"
        now_str = datetime.datetime.now().strftime("%d %b %Y")
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO user_memories (id, user_id, statement, category, active, created_at)
            VALUES (?, ?, ?, ?, 1, ?);
            """, (mem_id, user_id, statement, category, now_str))
            conn.commit()
        return {
            "id": mem_id,
            "user_id": user_id,
            "statement": statement,
            "category": category,
            "active": True,
            "created_at": now_str
        }

    def delete_user_memory(self, memory_id: str, user_id: str) -> bool:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "DELETE FROM user_memories WHERE id = ? AND user_id = ?;",
                (memory_id, user_id)
            )
            conn.commit()
            return cursor.rowcount > 0

    # --- USER FAVORITES (Isolated per user) ---
    def get_user_favorites(self, user_id: str) -> List[str]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "SELECT item_id FROM user_favorites WHERE user_id = ? ORDER BY created_at DESC;",
                (user_id,)
            )
            rows = cursor.fetchall()
            return [r["item_id"] for r in rows]

    def toggle_user_favorite(self, user_id: str, item_id: str) -> bool:
        """Returns True if added, False if removed."""
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id FROM user_favorites WHERE user_id = ? AND item_id = ?;", (user_id, item_id))
            exists = cursor.fetchone()
            if exists:
                cursor.execute("DELETE FROM user_favorites WHERE user_id = ? AND item_id = ?;", (user_id, item_id))
                conn.commit()
                return False
            else:
                fav_id = f"fav-{os.urandom(4).hex()}"
                now_str = datetime.datetime.now().strftime("%d %b %Y")
                cursor.execute(
                    "INSERT INTO user_favorites (id, user_id, item_id, created_at) VALUES (?, ?, ?, ?);",
                    (fav_id, user_id, item_id, now_str)
                )
                conn.commit()
                return True

sqlite_db = SQLiteDatabase()
