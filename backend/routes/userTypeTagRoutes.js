const express = require("express");
const db = require("../database/connection");
const router = express.Router();

router.post("/addUserTypeTag", async (req, res) => {
  const { usuario, tag } = req.body;

  if (!usuario || !tag) {
    return res.status(400).json({ error: "usuario e tag são obrigatórios" });
  }

  try {
    let userId = usuario.id;

    const [userExists] = await db.execute(
      "SELECT id FROM usuarios WHERE id = ?",
      [usuario.id]
    );

    if (userExists.length === 0) {
      await db.execute(
        "INSERT INTO usuarios (id, nome, email) VALUES (?, ?, ?)",
        [usuario.id, usuario.nome, usuario.email]
      );
      console.log(`🚀 Usuário adicionado no MySQL com ID: ${usuario.id}`);
    } else {
      console.log(`✅ Usuário já existe no MySQL com ID: ${userExists[0].id}`);
    }

    const [checkUser] = await db.execute(
      "SELECT id, email FROM usuarios WHERE id = ?",
      [usuario.id]
    );
    console.log("🔍 Teste de ID no MySQL:", checkUser[0]);

    const [tagTypeExists] = await db.execute(
      "SELECT id FROM tipos WHERE usuario_id = ? AND nome = ?",
      [userId, tag.nome]
    );

    let tagId;
    if (tagTypeExists.length > 0) {
      tagId = tagTypeExists[0].id;
    } else {
      const [tagResult] = await db.execute(
        "INSERT INTO tipos (usuario_id, nome, cor) VALUES (?, ?, ?)",
        [userId, tag.nome, tag.cor]
      );
      tagId = tagResult.insertId;
    }

    return res.json({ success: true, userId, tagId });
  } catch (error) {
    console.error("❌ Erro ao adicionar usuário e tag:", error);
    return res.status(500).json({ error: error.message });
  }
});

// ======================================
// GET para buscar tags do usuário
// ======================================
router.get("/getUserTags/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [tags] = await db.execute(
      "SELECT id, nome, cor FROM tipos WHERE usuario_id = ?",
      [userId]
    );

    console.log(`📝 Tags retornadas para usuário ${userId}:`, tags);

    return res.json({ success: true, tags });
  } catch (error) {
    console.error("❌ Erro ao buscar tags:", error);
    return res.status(500).json({ error: error.message });
  }
});

// ======================================
// DELETE para remover uma tag pelo ID
// ======================================
router.delete("/deleteUserTag/:tagId/:userId", async (req, res) => {
  const { tagId, userId } = req.params;

  try {
    // Verifica se a tag existe e pertence ao usuário
    const [tagExists] = await db.execute(
      "SELECT id FROM tipos WHERE id = ? AND usuario_id = ?",
      [tagId, userId]
    );

    if (tagExists.length === 0) {
      console.log(`❌ Tag ${tagId} não encontrada para o usuário ${userId}`);
      return res
        .status(404)
        .json({ error: "Tag não encontrada ou não pertence ao usuário" });
    }

    // Deleta a tag
    await db.execute("DELETE FROM tipos WHERE id = ? AND usuario_id = ?", [
      tagId,
      userId,
    ]);

    console.log(`✅ Tag ${tagId} deletada do usuário ${userId}`);
    return res.json({ success: true, tagId });
  } catch (error) {
    console.error("❌ Erro ao deletar tag:", error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
