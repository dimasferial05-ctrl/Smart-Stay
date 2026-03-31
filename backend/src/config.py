from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )

    # Application
    app_name: str = "Smart-Stay API"
    app_env: str = "development"
    app_debug: bool = True

    # Database
    database_host: str = "localhost"
    database_port: int = 5432
    database_username: str = "postgres"
    database_password: str = "postgres"
    database_name: str = "test"
    database_url: str = (
        f"postgresql+psycopg://{database_username}:{database_password}@{database_host}:{database_port}/{database_name}"
    )

    # DeepFace
    deepface_model: str = "Facenet512"
    deepface_detector: str = "opencv"
    deepface_distance: str = "cosine"
    deepface_embedding_size: int = 512
    deepface_max_image_dim: int = 1280
    deepface_threshold: float = 0.60

    # Face Embedding File Upload
    face_embedding_min_images: int = 3
    face_embedding_upload_dir: Path = Path("uploads/face_embedding_images")
    face_embedding_max_file_size_mb: int = 5
    face_embedding_allowed_extensions: str = "jpg,jpeg,png,webp"

    # Suspicious Verification File Upload
    suspicious_verification_min_images: int = 3
    suspicious_verification_upload_dir: Path = Path(
        "uploads/suspicious_verification_images"
    )
    suspicious_verification_max_file_size_mb: int = 5
    suspicious_verification_allowed_extensions: str = "jpg,jpeg,png,webp"


settings = Settings()
