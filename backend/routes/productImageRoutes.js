const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/uploadImage", upload.single("image"), async (req, res) => {
  try {
    console.log("Requisição recebida para upload de imagem");
    console.log("Headers:", req.headers);
    console.log("Body keys:", Object.keys(req.body));
    console.log("Files:", req.file ? "Arquivo presente" : "Nenhum arquivo");

    if (!req.file) {
      console.warn("Nenhuma imagem enviada na requisição");
      return res.status(400).json({
        success: false,
        error: "Nenhuma imagem enviada",
      });
    }

    console.log("Arquivo recebido:", {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    console.log("Iniciando upload da imagem para Cloudinary...");

    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "test_products",
            resource_type: "auto",
          },
          (error, result) => {
            if (result) {
              console.log(
                "Upload finalizado, Cloudinary retornou a URL:",
                result.secure_url
              );
              resolve(result);
            } else {
              console.error("Erro no upload do Cloudinary:", error);
              reject(error);
            }
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);

    console.log("Resposta enviada para o cliente com a URL da imagem");
    return res.json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error("Erro geral no upload da imagem:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
