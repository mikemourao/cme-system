from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Optional
from app import models, schemas, database

app = FastAPI()

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas as origens. Restrinja em produção, ex.: ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

# Criar as tabelas no banco de dados
models.Base.metadata.create_all(bind=database.engine)

# Dependência do banco
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -------------------------------
# Rotas de Usuários
# -------------------------------

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Verificar duplicidade de função
    existing_user = db.query(models.User).filter(models.User.role == user.role, models.User.name == user.name,).first()
    if existing_user:
        raise HTTPException(
            status_code=400, detail=f"Usuário já existe com a mesma função '{user.role}'."
        )
    db_user = models.User(name=user.name, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.get("/users/", response_model=list[schemas.User])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()


@app.put("/users/{user_id}", response_model=schemas.User)
def update_user(user_id: int, updated_user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    
    # Verificar duplicidade de função
    existing_user = db.query(models.User).filter(
        models.User.role == updated_user.role,
        models.User.name == updated_user.name,
    ).first()
    if existing_user:
        raise HTTPException(
            status_code=400, detail=f"Usuário já existe com a mesma função '{updated_user.role}'."
        )
    
    db_user.name = updated_user.name
    db_user.role = updated_user.role
    db.commit()
    db.refresh(db_user)
    return db_user


@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    db.delete(db_user)
    db.commit()
    return {"message": "Usuário excluído com sucesso."}


# -------------------------------
# Rotas de Materiais
# -------------------------------

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

@app.delete("/materials/{material_id}")
def delete_material(material_id: int, db: Session = Depends(get_db)):
    db_material = db.query(models.Material).filter(models.Material.id == material_id).first()
    if not db_material:
        raise HTTPException(status_code=404, detail="Material não encontrado.")
    db.delete(db_material)
    db.commit()
    return {"message": "Material excluído com sucesso."}


# -------------------------------
# Rotas de Rastreabilidade
# -------------------------------

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


@app.put("/traceability/{trace_id}", response_model=schemas.Traceability)
def update_traceability(trace_id: int, updated_trace: schemas.TraceabilityCreate, db: Session = Depends(get_db)):
    db_trace = db.query(models.Traceability).filter(models.Traceability.id == trace_id).first()
    if not db_trace:
        raise HTTPException(status_code=404, detail="Registro de rastreabilidade não encontrado.")
    
    db_trace.serial = updated_trace.serial
    db_trace.stage = updated_trace.stage
    db_trace.failures = updated_trace.failures
    db.commit()
    db.refresh(db_trace)
    return db_trace


@app.delete("/traceability/{trace_id}")
def delete_traceability(trace_id: int, db: Session = Depends(get_db)):
    db_trace = db.query(models.Traceability).filter(models.Traceability.id == trace_id).first()
    if not db_trace:
        raise HTTPException(status_code=404, detail="Registro de rastreabilidade não encontrado.")
    db.delete(db_trace)
    db.commit()
    return {"message": "Registro de rastreabilidade excluído com sucesso."}
