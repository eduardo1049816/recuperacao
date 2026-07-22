import mysql from "mysql2/promise";

async function conectar() {
    return await mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "mercado_livre"
    });
}

export async function executeQuery(sql, params = []) {
    const conexao = await conectar();

    try {
        const [rows] = await conexao.execute(sql, params);
        return rows;
    } catch (error) {
        console.error("Erro ao executar a consulta:", error);
        throw error;
    } finally {
        await conexao.end();
    }
}

// export default executeQuery;