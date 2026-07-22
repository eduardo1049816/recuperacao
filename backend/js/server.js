import express from "express";
import cors from "cors";
import { executeQuery } from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

// ===============================
// USUÁRIOS
// ===============================

// GET
app.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await executeQuery("SELECT * FROM usuarios");
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// POST
app.post("/usuarios", async (req, res) => {
    try {
        const { nome, email, senha, telefone } = req.body;

        await executeQuery(
            `INSERT INTO usuarios (nome, email, senha, telefone)
             VALUES (?, ?, ?, ?)`,
            [nome, email, senha, telefone]
        );

        res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!"
        });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// DELETE
app.delete("/usuarios/:id", async (req, res) => {
    try {
        await executeQuery(
            "DELETE FROM usuarios WHERE id_usuario = ?",
            [req.params.id]
        );

        res.json({
            mensagem: "Usuário removido com sucesso!"
        });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// ===============================
// PRODUTOS
// ===============================

// GET
app.get("/produtos", async (req, res) => {
    try {
        const produtos = await executeQuery("SELECT * FROM produtos");
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// POST
app.post("/produtos", async (req, res) => {
    try {
        const {
            nome,
            descricao,
            preco,
            estoque,
            categoria
        } = req.body;

        await executeQuery(
            `INSERT INTO produtos
            (nome, descricao, preco, estoque, categoria)
            VALUES (?, ?, ?, ?, ?)`,
            [nome, descricao, preco, estoque, categoria]
        );

        res.status(201).json({
            mensagem: "Produto cadastrado com sucesso!"
        });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// DELETE
app.delete("/produtos/:id", async (req, res) => {
    try {
        await executeQuery(
            "DELETE FROM produtos WHERE id_produto = ?",
            [req.params.id]
        );

        res.json({
            mensagem: "Produto removido com sucesso!"
        });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// ===============================
// COMPRAS
// ===============================

// GET
app.get("/compras", async (req, res) => {
    try {
        const compras = await executeQuery(`
            SELECT
                c.id_compra,
                u.nome AS usuario,
                p.nome AS produto,
                c.quantidade,
                c.data_compra
            FROM compras c
            JOIN usuarios u
                ON c.id_usuario = u.id_usuario
            JOIN produtos p
                ON c.id_produto = p.id_produto
        `);

        res.json(compras);

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// POST
app.post("/compras", async (req, res) => {
    try {
        const {
            id_usuario,
            id_produto,
            quantidade
        } = req.body;

        await executeQuery(
            `INSERT INTO compras
            (id_usuario, id_produto, quantidade)
            VALUES (?, ?, ?)`,
            [id_usuario, id_produto, quantidade]
        );

        res.status(201).json({
            mensagem: "Compra cadastrada com sucesso!"
        });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// DELETE
app.delete("/compras/:id", async (req, res) => {
    try {
        await executeQuery(
            "DELETE FROM compras WHERE id_compra = ?",
            [req.params.id]
        );

        res.json({
            mensagem: "Compra removida com sucesso!"
        });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// ===============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});