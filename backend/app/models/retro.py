from typing import List, Optional
from pydantic import BaseModel

class OutfitItem(BaseModel):
    name: str
    type: str
    details: str

class RetroEra(BaseModel):
    id: str
    name: str
    tagline: str
    description: str
    palette: List[str]
    image: str
    outfits: List[OutfitItem]
    props: List[str]

class PhotoBoothTemplate(BaseModel):
    id: str
    name: str
    desc: str

class PhotoBoothCaptureRequest(BaseModel):
    template_id: str
    era_name: str
    custom_caption: Optional[str] = "A memory preserved in time"
    image_url: Optional[str] = None
