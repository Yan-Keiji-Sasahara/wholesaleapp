import { useState, useEffect } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import api from "../../../services/api";
import { auth } from "../../../firebase_config/firebase_config";

function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 80%)`;
}

// Função para enviar imagem para o Cloudinary
// Função para enviar imagem para o Cloudinary
const uploadImageToCloudinary = async (imageUri) => {
  try {
    const formData = new FormData();

    // ❌ ERRO: Esta estrutura não funciona no React Native
    // formData.append("image", {
    //   uri: imageUri,
    //   type: "image/jpeg",
    //   name: `product_${Date.now()}.jpg`,
    // });

    // ✅ CORREÇÃO: Estrutura correta para React Native
    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg",
      name: `product_${Date.now()}.jpg`,
    });

    const res = await api.post("/api/productImage/uploadImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Upload realizado com sucesso:", res.data.url);
    return res.data.url;
  } catch (error) {
    console.error("❌ Erro ao enviar imagem:", error);
    console.error("❌ Detalhes do erro:", error.response?.data);
    Alert.alert("Erro", "Falha ao enviar a imagem para o Cloudinary");
    return null;
  }
};

const handleAddTag = async (tag) => {
  const usuario = {
    id: auth.currentUser.uid,
    nome: auth.currentUser.displayName,
    email: auth.currentUser.email,
  };

  const tagComCor = { ...tag, cor: tag.cor || getRandomPastelColor() };

  try {
    const res = await api.post("/api/userTag/addUserTypeTag", {
      usuario,
      tag: tagComCor,
    });
    console.log("✅ Tag adicionada:", res.data);
  } catch (error) {
    console.error("❌ Erro ao adicionar tag:", error);
  }
};

export default function useMyCatalog() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState(null);
  const [tags, setTags] = useState([]);

  // Busca tags do usuário logado
  const fetchUserTags = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const res = await api.get(`/api/userTag/getUserTags/${userId}`);
      if (res.data.success) {
        const userTags = res.data.tags || [];
        setTags(
          userTags.map((t) => ({
            id: t.id,
            nome: t.nome,
            cor: t.cor || getRandomPastelColor(),
          }))
        );
      }
    } catch (err) {
      console.error("❌ Erro ao buscar tipos do usuário:", err);
    }
  };

  useEffect(() => {
    fetchUserTags();
  }, []);

  // ⚡ Adiciona imagem e envia direto para Cloudinary
  const addImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const localUri = result.assets[0].uri;

      const cloudUrl = await uploadImageToCloudinary(localUri);
      if (!cloudUrl) return; // Sai se falhou

      setNewItem({
        id: Date.now().toString(),
        uri: cloudUrl, // URL do Cloudinary
        title: "",
        preco: "",
        descricao: "",
        tipo: null,
      });
    }
  };

  const saveNewItem = () => {
    if (!newItem.title || !newItem.preco || !newItem.tipo) {
      alert("Preencha nome, tipo e preço.");
      return;
    }

    setItems((prevItems) => {
      const exists = prevItems.some((item) => item.id === newItem.id);
      return exists
        ? prevItems.map((item) => (item.id === newItem.id ? newItem : item))
        : [...prevItems, newItem];
    });

    setNewItem(null);
  };

  const confirmRemove = (item) => {
    Alert.alert(
      "Confirmação",
      `Tem certeza que quer remover "${item.title}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => {
            if (newItem && newItem.id === item.id) setNewItem(null);
            removeItem(item.id);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const addTag = (tag) => {
    if (!tag?.nome) return;

    const exists = tags.some(
      (t) => (t.nome || "").toLowerCase() === (tag.nome || "").toLowerCase()
    );

    if (!exists) {
      const tagComCor = { ...tag, cor: tag.cor || getRandomPastelColor() };
      setTags((prev) => [...prev, tagComCor]);
      handleAddTag(tagComCor);
    }
  };

  const removeTag = async (tagToRemove) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      await api.delete(
        `/api/userTag/deleteUserTag/${tagToRemove.id}/${userId}`
      );

      setTags((prev) => prev.filter((t) => t.id !== tagToRemove.id));
      console.log(`✅ Tag "${tagToRemove.nome}" deletada`);
    } catch (err) {
      console.error("❌ Erro ao deletar tag:", err);
      Alert.alert("Erro", "Não foi possível deletar a tag. Tente novamente.");
    }
  };

  return {
    items,
    newItem,
    setNewItem,
    addImage,
    saveNewItem,
    removeItem,
    confirmRemove,
    tags,
    addTag,
    removeTag,
    fetchUserTags,
  };
}
