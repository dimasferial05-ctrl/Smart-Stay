from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import cast, Date
from datetime import datetime
from database import engine, Base, SessionLocal
import models
import schemas

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Smart Stay API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- FUNGSI KONEKSI DATABASE ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- ENDPOINT TEST ---
@app.get("/")
def read_root():
    return {"message": "Selamat datang di API Smart Stay!"}

# --- ENDPOINT DATA PENGHUNI ---

# 1. Mengambil semua data penghuni (GET)
@app.get("/api/residents", response_model=list[schemas.ResidentResponse])
def get_all_residents(db: Session = Depends(get_db)):
    residents = db.query(models.Resident).all()
    return residents

# Mengambil semua histori log (GET)
@app.get("/api/logs", response_model=list[schemas.AccessLogResponse])
def get_all_logs(db: Session = Depends(get_db)):
    # Mengambil log dan diurutkan berdasarkan waktu terbaru (descending)
    logs = db.query(models.AccessLog).order_by(models.AccessLog.created_at.desc()).all()
    return logs

# 2. Menambah data penghuni baru (POST)
@app.post("/api/residents", response_model=schemas.ResidentResponse)
def create_resident(resident: schemas.ResidentCreate, db: Session = Depends(get_db)):
    # Cek apakah RFID sudah dipakai (jika ada)
    if resident.rfid_code:
        cek_rfid = db.query(models.Resident).filter(models.Resident.rfid_code == resident.rfid_code).first()
        if cek_rfid:
            raise HTTPException(status_code=400, detail="Kode RFID sudah terdaftar!")
            
    # Simpan ke database
    db_resident = models.Resident(
        name=resident.name,
        phone=resident.phone,
        rfid_code=resident.rfid_code,
        pin=resident.pin
    )
    db.add(db_resident)
    db.commit()
    db.refresh(db_resident)
    return db_resident

# Menambah data log aktivitas baru (POST) untuk keperluan simulasi/alat IoT nanti
@app.post("/api/logs", response_model=schemas.AccessLogResponse)
def create_log(log: schemas.AccessLogBase, db: Session = Depends(get_db)):
    # Simpan data log baru ke database
    db_log = models.AccessLog(
        resident_id=log.resident_id,
        method=log.method,
        status=log.status,
        similarity=log.similarity
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log

# --- ENDPOINT NOTIFIKASI ---
@app.get("/api/notifications")
def get_notifications(db: Session = Depends(get_db)):
    # Ambil 3 log terakhir, diurutkan dari yang terbaru
    recent_logs = db.query(models.AccessLog).order_by(models.AccessLog.created_at.desc()).limit(3).all()
    
    notifications = []
    
    # Cek apakah ada minimal 3 log, dan KETIGANYA berstatus "gagal"
    if len(recent_logs) == 3 and all(log.status == "gagal" for log in recent_logs):
        # Ambil waktu kejadian terakhir
        last_time = recent_logs[0].created_at.strftime("%H:%M:%S")
        
        notifications.append({
            "id": 1,
            "title": "Peringatan Keamanan!",
            "message": f"Terdapat 3 kali percobaan akses gagal berturut-turut pada gerbang utama. (Terakhir: {last_time})",
            "type": "warning",
            "time": last_time
        })
        
    return notifications

# --- ENDPOINT DASHBOARD ---
@app.get("/api/dashboard", response_model=schemas.DashboardResponse)
def get_dashboard_summary(db: Session = Depends(get_db)):
    # 1. Hitung total penghuni
    total_residents = db.query(models.Resident).count()
    
    # 2. Hitung akses hari ini
    today = datetime.now().date()
    total_access_today = db.query(models.AccessLog).filter(cast(models.AccessLog.created_at, Date) == today).count()
    
    # 3. Hitung total akses valid & tidak valid
    total_valid = db.query(models.AccessLog).filter(models.AccessLog.status == "berhasil").count()
    total_invalid = db.query(models.AccessLog).filter(models.AccessLog.status == "gagal").count()
    
    # 4. Ambil 5 aktivitas terbaru
    recent_logs = db.query(models.AccessLog).order_by(models.AccessLog.created_at.desc()).limit(5).all()
    
    # 5. Ambil waktu akses terakhir
    last_log = db.query(models.AccessLog).order_by(models.AccessLog.created_at.desc()).first()
    last_access = last_log.created_at if last_log else None
    
    return {
        "total_residents": total_residents,
        "total_access_today": total_access_today,
        "total_valid_access": total_valid,
        "total_invalid_access": total_invalid,
        "recent_activities": recent_logs,
        "last_access": last_access
    }