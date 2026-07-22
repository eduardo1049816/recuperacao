-- Active: 1784750071384@@sakura.proxy.rlwy.net@19830@railway
-- Criar banco de dados

USE railway;

-- ===========================
-- TABELA USUÁRIOS
-- ===========================
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    data_cadastro DATE DEFAULT (CURRENT_DATE)
);

-- ===========================
-- TABELA PRODUTOS
-- ===========================
CREATE TABLE produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT NOT NULL,
    categoria VARCHAR(50)
);

-- ===========================
-- TABELA COMPRAS
-- ===========================
CREATE TABLE compras (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL,
    data_compra DATE DEFAULT (CURRENT_DATE),

    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

-- ===========================
-- REGISTROS USUÁRIOS
-- ===========================
INSERT INTO usuarios (nome, email, senha, telefone) VALUES
('João Silva','joao@gmail.com','123456','31999990001'),
('Maria Souza','maria@gmail.com','123456','31999990002'),
('Pedro Lima','pedro@gmail.com','123456','31999990003'),
('Ana Clara','ana@gmail.com','123456','31999990004'),
('Lucas Oliveira','lucas@gmail.com','123456','31999990005');

-- ===========================
-- REGISTROS PRODUTOS
-- ===========================
INSERT INTO produtos (nome, descricao, preco, estoque, categoria) VALUES
('Notebook Dell','Notebook Core i5 16GB',4200.00,10,'Informática'),
('Mouse Gamer','RGB 7200 DPI',150.00,40,'Periféricos'),
('Teclado Mecânico','Switch Blue RGB',320.00,25,'Periféricos'),
('Monitor LG 24','Full HD 75Hz',850.00,15,'Monitores'),
('Headset Gamer','Som Surround',270.00,30,'Áudio');

-- ===========================
-- REGISTROS COMPRAS
-- ===========================
INSERT INTO compras (id_usuario,id_produto,quantidade) VALUES
(1,1,1),
(1,2,2),
(2,3,1),
(2,5,1),
(3,4,2),
(3,2,1),
(4,1,1),
(4,5,3),
(5,3,2),
(5,4,1);