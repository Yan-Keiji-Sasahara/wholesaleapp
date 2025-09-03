const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost", // "127.0.0.1",
  user: "root",
  password: "",
  database: "wholesaleapp",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testConnection() {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    console.log("✅ Conexão com MySQL estabelecida com sucesso!");
    console.log(`📂 Banco de dados ativo: wholesaleapp`);
    console.log("📊 Teste simples de query: 1 + 1 =", rows[0].result);
  } catch (err) {
    console.error("❌ Erro ao conectar ao MySQL:", err.message);
  }
}

testConnection();

module.exports = db;
