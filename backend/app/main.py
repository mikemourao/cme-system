from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas, database

app = FastAPI()

# Criar as tabelas no banco de dados
models.Base.metadata.create_all(bind=database.engine)

# Endpoint para listar usuários
@app.get("/users/", response_model=list[schemas.User])
def get_users(db: Session = Depends(database.get_db)):
    return db.query(models.User).all()

# Endpoint para cadastrar um usuário
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = models.User(name=user.name, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
