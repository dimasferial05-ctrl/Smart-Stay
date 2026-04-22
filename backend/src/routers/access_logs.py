from typing import Sequence
from uuid import UUID

from fastapi import APIRouter, HTTPException, Query, status
from sqlalchemy import desc, select
from sqlalchemy.orm import joinedload

from src.database import DBSession
from src.models import AccessLog, AccessMethodEnum
from src.schemas import AccessLogResponse

router = APIRouter(
    prefix="/access-logs",
    tags=["Access Logs"],
)


@router.get(
    path="/",
    description="Mendapatkan daftar log akses dengan filter metode, status, dan pagination.",
    response_model=list[AccessLogResponse],
)
async def get_access_logs(
    db: DBSession,
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    method: AccessMethodEnum | None = None,
    granted: bool | None = None,
) -> Sequence[AccessLog]:
    stmt = (
        select(AccessLog)
        .options(joinedload(AccessLog.resident))
        .order_by(desc(AccessLog.created_at))
        .offset(offset)
        .limit(limit)
    )

    if method is not None:
        stmt = stmt.where(AccessLog.method == method)
    if granted is not None:
        stmt = stmt.where(AccessLog.granted == granted)

    return db.execute(stmt).scalars().all()


@router.get(
    path="/{access_log_id}",
    description="Mendapatkan detail log akses berdasarkan ID, termasuk informasi penghuni jika tersedia.",
    response_model=AccessLogResponse,
)
async def get_access_log(db: DBSession, access_log_id: UUID) -> AccessLog:
    stmt = (
        select(AccessLog)
        .options(joinedload(AccessLog.resident))
        .where(AccessLog.id == access_log_id)
    )

    result = db.execute(stmt).scalar_one_or_none()

    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Log akses tidak ditemukan.",
        )

    return result
