from sqlalchemy import Column, Integer, String, Date, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    role = Column(String, nullable=False)

class Material(Base):
    __tablename__ = "materials"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    type = Column(String, nullable=False)
    expiration_date = Column(Date, nullable=False)
    serial = Column(String, unique=True, nullable=False)

class Traceability(Base):
    __tablename__ = "traceability"

    id = Column(Integer, primary_key=True, index=True)
    serial = Column(String, ForeignKey("materials.serial"), nullable=False)
    stage = Column(String, nullable=False)  # 'Recebimento', 'Lavagem', 'Esterilização', 'Distribuição'
    failures = Column(String, nullable=True)  # Texto explicando falhas, se houver
    timestamp = Column(TIMESTAMP, default=datetime.utcnow)

    material = relationship("Material")
