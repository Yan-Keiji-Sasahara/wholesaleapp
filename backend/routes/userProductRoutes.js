const express = require("express");
const db = require("../database/connection");
const router = express.Router();

router.post("/createProduct", async (req, res) => {
  const { usuario_id, titulo, preco, descricao, tipo_id, imagem_uri } =
    req.body;

  console.log("Dados recebidos para novo produto:", {
    usuario_id,
    titulo,
    preco,
    descricao,
    tipo_id,
    imagem_uri,
  });

  if (!usuario_id || !titulo || !preco || !tipo_id || !imagem_uri) {
    console.log("Falha: Campos obrigatórios faltando");
    return res.status(400).json({
      success: false,
      message: "Campos obrigatórios faltando.",
    });
  }

  try {
    const [userExists] = await db.execute(
      "SELECT id FROM usuarios WHERE id = ?",
      [usuario_id]
    );

    if (userExists.length === 0) {
      console.log(`Usuário não encontrado no banco: ${usuario_id}`);
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado.",
      });
    }

    const query = `
      INSERT INTO produtos (usuario_id, titulo, preco, descricao, tipo_id, imagem_uri)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [
      usuario_id,
      titulo,
      preco,
      descricao || "",
      tipo_id,
      imagem_uri,
    ]);

    console.log("Produto inserido com sucesso. ID:", result.insertId);

    return res.json({
      success: true,
      message: "Produto criado com sucesso!",
      produtoId: result.insertId,
    });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return res.status(500).json({
      success: false,
      message: "Erro no servidor.",
    });
  }
});

router.get("/getUserProducts/:usuario_id", async (req, res) => {
  const { usuario_id } = req.params;

  if (!usuario_id) {
    return res.status(400).json({
      success: false,
      message: "ID do usuário é obrigatório.",
    });
  }

  try {
    const [userExists] = await db.execute(
      "SELECT id FROM usuarios WHERE id = ?",
      [usuario_id]
    );

    if (userExists.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado.",
      });
    }

    const query = `
      SELECT p.id, p.titulo, p.preco, p.descricao, p.imagem_uri,
             t.id AS tipo_id, t.nome AS tipo_nome, t.cor AS tipo_cor
      FROM produtos p
      JOIN tipos t ON p.tipo_id = t.id
      WHERE p.usuario_id = ?
      ORDER BY p.criado_em DESC
    `;
    const [products] = await db.execute(query, [usuario_id]);

    return res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Erro ao buscar produtos do usuário:", error);
    return res.status(500).json({
      success: false,
      message: "Erro no servidor.",
    });
  }
});

router.put("/updateProduct/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, preco, descricao, tipo_id } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID do produto é obrigatório.",
    });
  }

  try {
    const [productExists] = await db.execute(
      "SELECT * FROM produtos WHERE id = ?",
      [id]
    );

    if (productExists.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Produto não encontrado.",
      });
    }

    const updates = [];
    const values = [];

    if (titulo !== undefined) {
      updates.push("titulo = ?");
      values.push(titulo);
    }
    if (preco !== undefined) {
      updates.push("preco = ?");
      values.push(preco);
    }
    if (descricao !== undefined) {
      updates.push("descricao = ?");
      values.push(descricao);
    }
    if (tipo_id !== undefined) {
      updates.push("tipo_id = ?");
      values.push(tipo_id);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Nenhum campo para atualizar.",
      });
    }

    const query = `UPDATE produtos SET ${updates.join(", ")} WHERE id = ?`;
    values.push(id);

    const [result] = await db.execute(query, values);

    return res.json({
      success: true,
      message: "Produto atualizado com sucesso!",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return res.status(500).json({
      success: false,
      message: "Erro no servidor.",
    });
  }
});

router.delete("/deleteProduct/:id/:usuario_id", async (req, res) => {
  const { id, usuario_id } = req.params;

  if (!id || !usuario_id) {
    return res.status(400).json({
      success: false,
      message: "ID do produto e do usuário são obrigatórios.",
    });
  }

  try {
    const [productExists] = await db.execute(
      "SELECT * FROM produtos WHERE id = ? AND usuario_id = ?",
      [id, usuario_id]
    );

    if (productExists.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Produto não encontrado ou não pertence ao usuário.",
      });
    }

    await db.execute("DELETE FROM produtos WHERE id = ?", [id]);

    return res.json({
      success: true,
      message: "Produto removido com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao remover produto:", error);
    return res.status(500).json({
      success: false,
      message: "Erro no servidor.",
    });
  }
});

module.exports = router;
