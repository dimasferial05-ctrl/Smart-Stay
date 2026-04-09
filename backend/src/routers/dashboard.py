from datetime import datetime, time
from typing import Any

from fastapi import APIRouter
from sqlalchemy import func, select
from sqlalchemy.orm import selectinload

from src import models
from src.database import DBSession
from src.schemas import DashboardStatsResponse

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get(
    path="/stats",
    description="Endpoint untuk mendapatkan statistik dashboard, termasuk jumlah penghuni, jumlah akses hari ini, dan log akses terbaru.",
    response_model=DashboardStatsResponse,
)
def get_dashboard_stats(db: DBSession) -> Any:
    # 1. Tentukan rentang waktu hari ini (00:00:00 - 23:59:59)
    today_start = datetime.combine(datetime.now().date(), time.min)

    # 2. Hitung Total Penghuni
    total_residents = db.scalar(select(func.count(models.Resident.id))) or 0

    # 3. Ambil Log Akses hari ini untuk agregasi
    # Menggunakan selectinload untuk memuat data resident secara efisien
    stmt = (
        select(models.AccessLog)
        .options(selectinload(models.AccessLog.resident))
        .where(models.AccessLog.created_at >= today_start)
        .order_by(models.AccessLog.created_at.desc())
    )
    access_today = db.scalars(stmt).all()

    # 4. Hitung statistik dari list access_today
    total_access_today = len(access_today)
    total_valid = sum(1 for log in access_today if log.granted)
    total_invalid = total_access_today - total_valid

    # 6. Ambil 10 aktivitas terbaru (bisa dari access_today atau query terpisah jika data sangat besar)
    access_logs = access_today[:10]

    return {
        "total_residents": total_residents,
        "total_access_today": total_access_today,
        "total_valid_access": total_valid,
        "total_invalid_access": total_invalid,
        "access_logs": access_logs,
    }
