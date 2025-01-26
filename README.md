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

yaml
