import enum
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class MethodEnum(str, enum.Enum):
    face_recognition = "face_recognition"
    rfid = "rfid"
    pin = "pin"

class StatusLogEnum(str, enum.Enum):
    berhasil = "berhasil"
    gagal = "gagal"

class GateStatusEnum(str, enum.Enum):
    terkunci = "terkunci"
    terbuka = "terbuka"

class Admin(Base):
    __tablename__ = "admins"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Gate(Base):
    __tablename__ = "gates"
    
    id = Column(Integer, primary_key=True, index=True)
    status = Column(Enum(GateStatusEnum), default=GateStatusEnum.terkunci)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Resident(Base):
    __tablename__ = "residents"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String)
    rfid_code = Column(String, unique=True, nullable=True)
    pin = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    logs = relationship("AccessLog", back_populates="resident", cascade="all, delete-orphan")
    embeddings = relationship("FaceEmbedding", back_populates="resident", cascade="all, delete-orphan")

class AccessLog(Base):
    __tablename__ = "access_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    resident_id = Column(Integer, ForeignKey("residents.id"), nullable=True) # Bisa null kalau Unknown Person
    method = Column(Enum(MethodEnum), nullable=False)
    status = Column(Enum(StatusLogEnum), nullable=False)
    similarity = Column(Float, nullable=True) # Dalam float, misal 92.80
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    resident = relationship("Resident", back_populates="logs")

class FaceEmbedding(Base):
    __tablename__ = "face_embeddings"
    
    id = Column(Integer, primary_key=True, index=True)
    resident_id = Column(Integer, ForeignKey("residents.id"), nullable=False)
    embedding = Column(ARRAY(Float), nullable=False) # Menyimpan array vektor wajah
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    resident = relationship("Resident", back_populates="embeddings")