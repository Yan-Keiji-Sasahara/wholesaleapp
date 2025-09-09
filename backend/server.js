const express = require("express");
const cors = require("cors");
const connection = require("./database/connection");
const userTypeTagRoutes = require("./routes/userTypeTagRoutes");
const productImageRoutes = require("./routes/productImageRoutes");
const userProductRoutes = require("./routes/userProductRoutes.js");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  console.log("Rota /ping acessada");
  res.json({ message: "Servidor ativo e conectado!" });
});

app.use("/api/userTag", userTypeTagRoutes);
app.use("/api/productImage", productImageRoutes);
app.use("/api/userProduct", userProductRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
