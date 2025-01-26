# Sistema de Gerenciamento CME

Este projeto é um sistema completo de gerenciamento para controle de **usuários**, **materiais** e **rastreabilidade** de processos. Ele foi desenvolvido utilizando **FastAPI** no backend, **React com Vite** no frontend e **PostgreSQL** como banco de dados.

---

## **📋 Funcionalidades**
### **Usuários**
- Cadastro, edição e exclusão de usuários.
- Restrições:
  - Não é permitido mais de um usuário com a mesma função.
  - Funções disponíveis: Técnico, Enfermagem, Administrativo.
- Listagem de usuários em uma tabela.

### **Materiais**
- Cadastro, edição e exclusão de materiais.
- Geração automática de serial baseado no nome do material.
- Listagem de materiais em uma tabela.

### **Rastreabilidade**
- Registro das etapas que os materiais passam (Recebimento, Lavagem, Esterilização, Distribuição).
- Filtro por número de série.
- Relatório em **PDF** e **XLSX** com:
  - Falhas associadas ao serial.
  - Contagem das etapas em que o material passou.

---

## **🚀 Tecnologias Utilizadas**
- **Frontend**: React com Vite + Material-UI.
- **Backend**: FastAPI.
- **Banco de Dados**: PostgreSQL.
- **Docker**: Para gerenciar o ambiente de desenvolvimento.

---

## **📂 Estrutura do Projeto**

cme-system/ ├── backend/ # Código do backend com FastAPI │ ├── app/ │ │ ├── models.py # Modelos do banco de dados │ │ ├── schemas.py # Schemas para validação de dados │ │ ├── database.py # Configuração do banco de dados │ │ └── main.py # Arquivo principal com as rotas ├── frontend/ # Código do frontend com React e Vite │ ├── src/ │ │ ├── App.jsx # Arquivo principal do frontend │ │ ├── components/ # Componentes reutilizáveis │ │ ├── pages/ # Páginas (Usuários, Materiais, Rastreabilidade) │ │ └── styles/ # Estilos adicionais ├── docker-compose.yml # Arquivo de configuração do Docker Compose └── README.md # Documentação do projeto

## **⚙️ Pré-requisitos**

Antes de começar, você precisa ter instalado:
- **Docker** e **Docker Compose**
- **Git** (para clonar o repositório)

---

## **📦 Como Executar o Projeto**

1. **Clone o Repositório**
   ```bash
   git clone https://github.com/usuario/sistema-cme.git
   cd sistema-cme

2. **Suba o Ambiente com Docker Certifique-se de estar na raiz do projeto e execute:**
   ```bash
   docker-compose up --build

3. **Acesse o Sistema**
    ```
    Frontend: http://localhost:5173
    Backend: http://localhost:8000/docs (Swagger para testar as APIs)

## **📋  Documentação de Código**

1. **Backend**
  As rotas principais estão definidas em main.py:
  
  Usuários:
    POST /users/: Cadastrar usuário.
    GET /users/: Listar usuários.
    PUT /users/{id}: Editar usuário.
    DELETE /users/{id}: Excluir usuário.
  Materiais:
    POST /materials/: Cadastrar material.
    GET /materials/: Listar materiais.
    PUT /materials/{id}: Editar material.
    DELETE /materials/{id}: Excluir material.
  Rastreabilidade:
    POST /traceability/: Registrar etapa do processo.
    GET /traceability/: Consultar rastreabilidade (com filtro por serial).
    Banco de Dados: A configuração está em database.py e utiliza o ORM SQLAlchemy.

1. **Frontend**
  As páginas principais estão em frontend/src/pages/:
  
    Users.jsx: Gerenciamento de usuários.
    Materials.jsx: Gerenciamento de materiais.
    Traceability.jsx: Cadastro e consulta de rastreabilidade.
  Cada página utiliza:
  
    useState e useEffect para gerenciamento de estado.
    Axios para chamadas à API.
    Material-UI para layout e componentes.
