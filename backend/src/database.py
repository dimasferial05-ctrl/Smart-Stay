from typing import Annotated, Generator

from fastapi import Depends
from sqlalchemy import create_engine, text
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session, sessionmaker
from src.config import settings
from src.models import Base

engine: Engine = create_engine(url=settings.database_url)
SessionLocal: sessionmaker[Session] = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
)


def get_session() -> Generator[Session, None, None]:
    with SessionLocal() as session:
        try:
            yield session
        finally:
            session.close()


def init_db() -> None:
    Base.metadata.create_all(bind=engine)


def close_db() -> None:
    engine.dispose()


def check_db() -> bool:
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return True
    except Exception:
        return False


DBSession = Annotated[Session, Depends(get_session)]
