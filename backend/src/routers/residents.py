from uuid import UUID

from fastapi import APIRouter, HTTPException, status

from src.database import DBSession
from src.models import Resident
from src.schemas import CreateResidentRequest, ResidentResponse, UpdateResidentRequest

router = APIRouter(
    prefix="/residents",
    tags=["Residents"],
)


@router.get(
    path="/",
    description="Endpoint untuk mendapatkan daftar semua penghuni.",
    response_model=list[ResidentResponse],
)
async def get_residents(db: DBSession, skip: int = 0, limit: int = 10):
    return db.query(Resident).offset(skip).limit(limit).all()


@router.post(
    path="/",
    description="Endpoint untuk menambahkan penghuni baru.",
    response_model=ResidentResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_resident(
    db: DBSession,
    create_resident_request: CreateResidentRequest,
):
    existing_resident = (
        db.query(Resident)
        .filter(Resident.rfid_code == create_resident_request.rfid_code)
        .first()
    )
    if existing_resident:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Kode RFID sudah digunakan oleh penghuni lain",
        )

    new_resident = Resident(**create_resident_request.model_dump())
    db.add(new_resident)
    db.commit()
    db.refresh(new_resident)
    return new_resident


@router.get(
    path="/{resident_id}",
    description="Endpoint untuk mendapatkan detail penghuni berdasarkan ID.",
    response_model=ResidentResponse,
)
async def get_resident(db: DBSession, resident_id: UUID):
    resident = db.query(Resident).filter(Resident.id == resident_id).first()
    if not resident:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Penghuni tidak ditemukan",
        )
    return resident


@router.patch(
    path="/{resident_id}",
    description="Endpoint untuk memperbarui penghuni berdasarkan ID.",
    response_model=ResidentResponse,
)
async def update_resident(
    db: DBSession,
    resident_id: UUID,
    update_resident_request: UpdateResidentRequest,
):
    resident = db.query(Resident).filter(Resident.id == resident_id).first()
    if not resident:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Penghuni tidak ditemukan",
        )

    for key, value in update_resident_request.model_dump(exclude_unset=True).items():
        setattr(resident, key, value)

    db.commit()
    db.refresh(resident)
    return resident


@router.delete(
    path="/{resident_id}",
    description="Endpoint untuk menghapus penghuni berdasarkan ID.",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_resident(db: DBSession, resident_id: UUID):
    resident = db.query(Resident).filter(Resident.id == resident_id).first()
    if not resident:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Penghuni tidak ditemukan",
        )

    db.delete(resident)
    db.commit()
    return None
