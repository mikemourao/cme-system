# Usar a imagem oficial do Python
FROM python:3.10-slim

# Configurar o diretório de trabalho
WORKDIR /app

# Instalar dependências do sistema necessárias para psycopg2-binary
RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copiar e instalar as dependências Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar o código do backend
COPY ./app ./app

# Expor a porta 8000 para o backend
EXPOSE 8000

# Comando para iniciar o servidor
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
