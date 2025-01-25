from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

# Rota para criar um novo usuário
@router.post("/", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.Usuario).filter(models.Usuario.nome == user.nome).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Usuário já existe")

    new_user = models.Usuario(
        nome=user.nome,
        tipo_usuario=user.tipo_usuario
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Rota para listar todos os usuários
@router.get("/", response_model=list[schemas.UserResponse])
def list_users(db: Session = Depends(get_db)):
    return db.query(models.Usuario).all()

# Rota para filtrar usuários por tipo
@router.get("/tipo/{tipo_usuario}", response_model=list[schemas.UserResponse])
def filter_users_by_type(tipo_usuario: str, db: Session = Depends(get_db)):
    users = db.query(models.Usuario).filter(models.Usuario.tipo_usuario == tipo_usuario).all()
    if not users:
        raise HTTPException(status_code=404, detail="Nenhum usuário encontrado com esse tipo")
    return users
