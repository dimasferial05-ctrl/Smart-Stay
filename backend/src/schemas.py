from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field


class CreateResidentRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    phone: str = Field(..., min_length=10, max_length=20)
    room_number: int = Field(..., gt=0)
    rfid_code: str = Field(..., min_length=8, max_length=20, pattern=r"^[0-9A-Fa-f]+$")
    pin: str = Field(..., min_length=4, max_length=8)


class UpdateResidentRequest(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    phone: Optional[str] = Field(None, min_length=10, max_length=20)
    room_number: Optional[int] = Field(None, gt=0)
    pin: Optional[str] = Field(None, min_length=4, max_length=8)


class ResidentResponse(BaseModel):
    id: UUID
    name: str
    phone: str
    room_number: int
    created_at: datetime
    updated_at: datetime


class FaceEmbeddingResponse(BaseModel):
    pass
