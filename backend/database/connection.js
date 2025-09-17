const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "wholesaleapp",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testConnection() {
  try {
    const [rows] = await db.query("SELECT CURRENT_TIMESTAMP() as horas");
    console.log("Conexão com MySQL estabelecida com sucesso!");
    console.log("Banco de dados ativo: wholesaleapp");
    console.log("Teste simples de query:", rows[0].horas);
  } catch (err) {
    console.error("Erro ao conectar ao MySQL:", err.message);
  }
}

testConnection();

module.exports = db;
