from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Importando o CORSMiddleware
from sqlalchemy.orm import Session
from typing import Optional  # Adicionando a importação de Optional
from app import models, schemas, database

app = FastAPI()

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas as origens. Você pode especificar "http://localhost:5173" se preferir restringir
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

models.Base.metadata.create_all(bind=database.engine)

# Dependência do banco
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Rotas de usuários
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = models.User(name=user.name, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/", response_model=list[schemas.User])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

# Rotas de materiais
@app.post("/materials/", response_model=schemas.Material)
def create_material(material: schemas.MaterialCreate, db: Session = Depends(get_db)):
    serial = f"{material.name}-{hash(material.name)}"
    db_material = models.Material(
        name=material.name,
        type=material.type,
        expiration_date=material.expiration_date,
        serial=serial,
    )
    db.add(db_material)
    db.commit()
    db.refresh(db_material)
    return db_material

@app.get("/materials/", response_model=list[schemas.Material])
def get_materials(db: Session = Depends(get_db)):
    return db.query(models.Material).all()

# Rotas de rastreabilidade
@app.post("/traceability/", response_model=schemas.Traceability)
def create_traceability(trace: schemas.TraceabilityCreate, db: Session = Depends(get_db)):
    db_trace = models.Traceability(
        serial=trace.serial, stage=trace.stage, failures=trace.failures
    )
    db.add(db_trace)
    db.commit()
    db.refresh(db_trace)
    return db_trace

@app.get("/traceability/", response_model=list[schemas.Traceability])
def get_traceability(serial: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.Traceability)
    if serial:
        query = query.filter(models.Traceability.serial == serial)
    return query.all()
