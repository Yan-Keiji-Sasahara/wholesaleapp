import { Alert } from "react-native";
import api from "./api";

export const uploadImageToCloudinary = async (imageUri) => {
  try {
    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg",
      name: `product_${Date.now()}.jpg`,
    });

    console.log("Enviando imagem para Cloudinary...");

    const res = await api.post("/api/productImage/uploadImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Upload realizado com sucesso:", res.data.url);
    return res.data.url;
  } catch (error) {
    console.error("Erro ao enviar imagem:", error.message);
    console.error("Detalhes do erro:", error.response?.data);
    Alert.alert("Erro", "Falha ao enviar a imagem para o Cloudinary");
    return null;
  }
};
