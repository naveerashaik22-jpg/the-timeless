import pytest
from app.services.mood_extractor import MoodExtractor
from app.services.recommender import recommender
from app.services.ai_service import ai_service
from app.services.order_service import order_service
from app.services.faq_service import faq_service
from app.models.order import OrderCreateRequest, CartItem
from app.models.mood import DetectedPreferences
from app.database.db import db

def test_scenario_1_exhausted():
    text = "I'm exhausted after college."
    pref, is_distress = MoodExtractor.extract_from_text(text)
    assert not is_distress
    assert pref.mood == "tired"
    recs = recommender.recommend(pref, limit=3)
    assert len(recs) > 0
    rec_names = [r.item.name for r in recs]
    assert any("Shakespeare" in n or "Waffle" in n or "Jane Austen" in n or "Vanilla" in n for n in rec_names)

def test_scenario_2_sweet_light():
    text = "I want something sweet but light."
    pref, is_distress = MoodExtractor.extract_from_text(text)
    assert pref.taste == "sweet"
    assert pref.heaviness == "light"
    recs = recommender.recommend(pref, limit=3)
    assert len(recs) > 0
    for r in recs:
        assert r.item.heaviness in ["light", "medium"]

def test_scenario_3_happy_celebrate():
    text = "I'm happy and want to celebrate."
    pref, is_distress = MoodExtractor.extract_from_text(text)
    assert pref.mood in ["happy", "celebratory"]
    recs = recommender.recommend(pref, limit=3)
    assert len(recs) > 0
    zone = recommender.recommend_zone(pref)
    assert zone.zone_id in ["zone-tiny-tales", "zone-timeless", "zone-retro"]

def test_scenario_4_cold_refreshing():
    text = "I want something cold and refreshing."
    pref, is_distress = MoodExtractor.extract_from_text(text)
    assert pref.temperature == "cold"
    assert pref.taste == "refreshing"
    recs = recommender.recommend(pref, limit=3)
    assert len(recs) > 0
    for r in recs:
        assert r.item.temperature == "cold"

def test_scenario_5_nostalgic_classic():
    text = "I feel nostalgic. Give me something classic."
    pref, is_distress = MoodExtractor.extract_from_text(text)
    assert pref.mood == "nostalgic"
    recs = recommender.recommend(pref, limit=3)
    assert len(recs) > 0

def test_scenario_6_vegetarian_spicy():
    text = "I'm vegetarian and want something spicy."
    pref, is_distress = MoodExtractor.extract_from_text(text)
    assert pref.dietary == "vegetarian"
    assert pref.taste == "spicy"
    recs = recommender.recommend(pref, limit=3)
    assert len(recs) > 0
    for r in recs:
        assert "vegetarian" in r.item.dietary_tags
        assert r.item.spice_level >= 2 or "spicy" in r.item.taste_tags

def test_scenario_7_coffee_filling():
    text = "I want coffee and something filling."
    pref, is_distress = MoodExtractor.extract_from_text(text)
    assert pref.beverage_type == "coffee"
    assert pref.heaviness == "filling"
    recs = recommender.recommend(pref, limit=3)
    assert len(recs) > 0

def test_scenario_8_quiet_reading():
    text = "I want to sit quietly and read."
    pref, is_distress = MoodExtractor.extract_from_text(text)
    assert pref.mood == "calm" or pref.activity == "reading"
    zone = recommender.recommend_zone(pref)
    assert zone.zone_id in ["zone-ink-ember", "zone-tranquil-nook"]

def test_dietary_correction_flow():
    response = ai_service.process_chat(
        message="Actually I am vegetarian",
        current_preferences=DetectedPreferences(mood="happy")
    )
    assert response.preferences.dietary == "vegetarian"
    for rec in response.recommendations:
        assert "vegetarian" in rec["item"]["dietary_tags"]

def test_faq_answering():
    response = ai_service.process_chat(message="What are your opening hours?")
    assert response.is_faq is True
    assert "8:00 AM" in response.reply

def test_distress_safety_handling():
    response = ai_service.process_chat(message="I feel completely hopeless and want to end it all")
    assert response.is_safety_redirect is True
    assert "not alone" in response.reply

def test_order_creation_and_id():
    order_req = OrderCreateRequest(
        items=[
            CartItem(item_id="item-01", name="The Renaissance Waffle", price=260, quantity=2, category="DESSERTS"),
            CartItem(item_id="item-02", name="Shakespeare's Coffee", price=220, quantity=1, category="HOT BEVERAGES")
        ],
        customer_name="Aarav",
        table_or_zone="Ink & Ember Reading Lounge"
    )
    order_res = order_service.create_order(order_req)
    assert order_res.order_id.startswith("TT-")
    assert order_res.subtotal == (260 * 2) + 220
    assert order_res.tax == int(order_res.subtotal * 0.05)
    assert order_res.total == order_res.subtotal + order_res.tax

def test_all_aves_divisions_loaded():
    assert len(db.get_all_menu()) >= 20
    assert len(db.get_all_books()) >= 5
    assert len(db.get_retro_eras()) >= 4
    assert len(db.get_photo_booth_templates()) >= 6
    assert len(db.get_postcards()) >= 4
    assert len(db.get_lanterns()) >= 2
