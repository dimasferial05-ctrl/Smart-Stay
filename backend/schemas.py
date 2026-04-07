from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ResidentBase(BaseModel):
    name: str
    phone: Optional[str] = None
    rfid_code: Optional[str] = None
    pin: Optional[str] = None

class ResidentCreate(ResidentBase):
    pass

class ResidentResponse(ResidentBase):
    id: int
    created_at: datetime
    updated_at: datetime

class AccessLogBase(BaseModel):
    resident_id: Optional[int] = None
    method: str
    status: str
    similarity: Optional[float] = None

class AccessLogResponse(AccessLogBase):
    id: int
    created_at: datetime
    resident: Optional[ResidentResponse] = None

class DashboardResponse(BaseModel):
    total_residents: int
    total_access_today: int
    total_valid_access: int
    total_invalid_access: int
    recent_activities: list[AccessLogResponse]
    last_access: Optional[datetime] = None

    class Config:
        from_attributes = True  