from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

# Esquema para usuários
class UserBase(BaseModel):
    name: str
    role: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

# Esquema para materiais
class MaterialBase(BaseModel):
    name: str
    type: str
    expiration_date: date

class MaterialCreate(MaterialBase):
    pass

class Material(MaterialBase):
    id: int
    serial: str

    class Config:
        orm_mode = True

# Esquema para rastreabilidade
class TraceabilityBase(BaseModel):
    serial: str
    stage: str
    failures: Optional[str] = None

class TraceabilityCreate(TraceabilityBase):
    pass

class Traceability(TraceabilityBase):
    id: int
    timestamp: datetime

    class Config:
        orm_mode = True
