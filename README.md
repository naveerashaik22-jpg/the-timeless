# THE TIMELESS ☕
### Mood-Based AI Café Assistant & Experiential Lounge for THE AVES

> *"Tell us how you feel. We'll find something that fits your moment."*

---

## 🏛️ Concept Overview
**THE TIMELESS** is the flagship café sanctuary component of **THE AVES**, an immersive experiential hospitality space where technology stays quietly in the background and authentic human connection takes center stage.

Instead of generic ordering kiosks asking *"What would you like to order?"*, THE TIMELESS begins with:

> *"How are you feeling today?"*

Guests express their emotions naturally (e.g., *"I'm exhausted after college"*, *"I want something sweet but light"*, *"I feel nostalgic. Give me something classic"*). The AI companion interprets mood nuances, tastes, dietary restrictions, temperature, and activities, scoring 26+ vintage culinary items and pairing them with tailored seating sanctuaries across **THE AVES** (such as *Ink & Ember* or *The Tranquil Nook*).

---

## ✨ Core Features
1. **Mood & Emotional Intelligence**:
   - 10 internal mood states: `CALM`, `TIRED`, `HAPPY`, `CELEBRATORY`, `LOW-ENERGY`, `ENERGETIC`, `CURIOUS`, `NOSTALGIC`, `FOCUSED`, `SOCIAL`.
   - Emotionally supportive non-clinical care filter with gentle redirects for severe emotional distress.
2. **Explainable Multi-Criteria Recommendation Engine**:
   - Weighted Scoring Model:
     - Mood Match: 35%
     - Taste Profile: 20%
     - Dietary Constraints: 15% (Hard filter for Vegan / Vegetarian / Gluten-Free)
     - Temperature Match: 10%
     - Sweetness & Spice Level: 10%
     - Heaviness & Beverage Type: 10%
   - Empathetic *"Why we recommend this"* rationales for every item.
3. **AVES Experiential Seating Sanctuaries**:
   - **The Timeless**: Grand Vintage Café & Clockwork Lounge
   - **Ink & Ember**: Reading & Writing Sanctuary (Curated books & deep leather armchairs)
   - **The Tranquil Nook**: Botanical Mindful Retreat (Hanging ferns & floor cushions)
   - **Retro**: Vinyl Lounge & 70s Nostalgia (Turntable stations)
   - **Tiny Tales**: Intimate Connection & Conversation Corner
   - **Echo Booth**: Solo Contemplation & Deep Focus Pods
4. **Artisanal Culinary Archive (26 Items in INR)**:
   - Realistic Indian café pricing (₹140 – ₹420).
   - Categories: Hot Beverages, Cold Beverages, Light Bites, Main Dishes, Desserts, Signature Items.
5. **Interactive Tray & Vintage Order Ticket**:
   - Real-time tray drawer with item quantities, notes, and 5% GST calculation.
   - Order confirmation generating authentic vintage tickets with token ID `TT-YYYYMMDD-XXXX`, estimated prep times, and table assignments.
6. **Café Knowledge Base (FAQ)**:
   - Searchable answers for hours, Wi-Fi, dietary options, reservations, and customization.

---

## 🛠️ Tech Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Backend**: Python 3.14, FastAPI, Pydantic v2, Uvicorn, Pytest.
- **AI & Recommendation Layer**: Abstracted provider service supporting Google Gemini API with fallback high-fidelity NLP synthesis.
- **Styling**: Vintage parchment, espresso brown `#2A1810`, muted gold `#C5A059`, and deep burgundy `#6B1D2F` with Playfair Display & Cinzel typography.

---

## 🚀 Running the Application

### 1. Start the Backend Server
```bash
cd backend
# Activate Python virtual environment
# On Windows:
.venv\Scripts\activate
# On Linux/macOS:
source .venv/bin/activate

# Launch FastAPI Server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
API Documentation available at: `http://localhost:8000/docs`

### 2. Start the Frontend Application
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🧪 Running Automated Tests
```bash
cd backend
.venv\Scripts\activate
pytest
```
Verifies all 12 test suites covering all 8 prompt scenarios, dietary corrections, FAQ retrieval, safety redirects, and order ID generation.
