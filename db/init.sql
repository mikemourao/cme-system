CREATE DATABASE CME_DB;

USE CME_DB;

-- Tabela de Usuários
CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    tipo_usuario NVARCHAR(50) NOT NULL CHECK (tipo_usuario IN ('Tecnico', 'Enfermagem', 'Administrativo')),
    criado_em DATETIME DEFAULT GETDATE()
);

-- Tabela de Materiais
CREATE TABLE materiais (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    tipo_material NVARCHAR(50) NOT NULL,
    data_validade DATE NOT NULL,
    serial NVARCHAR(100) UNIQUE NOT NULL,
    criado_em DATETIME DEFAULT GETDATE()
);

-- Tabela de Rastreabilidade
CREATE TABLE rastreabilidade (
    id INT IDENTITY(1,1) PRIMARY KEY,
    serial_material NVARCHAR(100) NOT NULL,
    etapa NVARCHAR(50) NOT NULL CHECK (etapa IN ('Recebimento', 'Lavagem', 'Esterilizacao', 'Distribuicao')),
    falhas NVARCHAR(MAX),
    data_etapa DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (serial_material) REFERENCES materiais(serial)
);

-- Dados iniciais (opcional)
INSERT INTO usuarios (nome, tipo_usuario) VALUES
('Admin', 'Administrativo'),
('Técnico 1', 'Tecnico'),
('Enfermeiro 1', 'Enfermagem');
