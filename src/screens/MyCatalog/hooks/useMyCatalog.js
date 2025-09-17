import { useState, useEffect } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import api from "../../../services/api";
import { auth } from "../../../firebase_config/firebase_config";

function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70;
  const lightness = 80;
  const a = saturation * Math.min(lightness / 100, 1 - lightness / 100);
  const f = (n) => {
    const k = (n + hue / 30) % 12;
    const color = lightness / 100 - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export default function useMyCatalog() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState(null);
  const [tags, setTags] = useState([]);

  const fetchUserTags = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return;
      const res = await api.get(`/api/userTag/getUserTags/${userId}`);
      if (res.data.success) {
        setTags(
          (res.data.tags || []).map((t) => ({
            id: t.id,
            nome: t.nome,
            cor: t.cor || getRandomPastelColor(),
          }))
        );
      }
    } catch (err) {
      console.error("Erro ao buscar tipos do usuário:", err);
    }
  };

  const fetchUserProducts = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return;
      const res = await api.get(`/api/userProduct/getUserProducts/${userId}`);
      if (res.data.success) {
        const userProducts = res.data.products.map((p) => {
          const tagExistente = tags.find((t) => t.id === p.tipo_id);
          return {
            id: p.id.toString(),
            title: p.titulo,
            preco: p.preco,
            descricao: p.descricao,
            uri: p.imagem_uri,
            tipo: {
              id: p.tipo_id,
              nome: p.tipo_nome,
              cor: tagExistente?.cor || p.tipo_cor || getRandomPastelColor(),
            },
          };
        });
        setItems(userProducts);
      }
    } catch (err) {
      console.error("Erro ao buscar produtos do usuário:", err);
    }
  };

  useEffect(() => {
    fetchUserTags();
  }, []);

  useEffect(() => {
    if (tags.length > 0) fetchUserProducts();
  }, [tags]);

  const initNewItem = (uri) => {
    setNewItem({
      id: null,
      uri,
      title: "",
      preco: "",
      descricao: "",
      tipo: null,
      isNew: true,
    });
  };

  const addImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      initNewItem(result.assets[0].uri);
    }
  };

  const saveNewItem = async (item) => {
    try {
      const usuario_id = auth.currentUser.uid;
      const res = await api.post("/api/userProduct/createProduct", {
        usuario_id,
        titulo: item.title,
        preco: item.preco,
        descricao: item.descricao,
        tipo_id: item.tipo.id,
        imagem_uri: item.uri,
      });

      if (res.data.success) {
        setItems((prev) => [
          ...prev,
          {
            id: res.data.produtoId.toString(),
            title: item.title,
            preco: item.preco,
            descricao: item.descricao,
            uri: item.uri,
            tipo: item.tipo,
          },
        ]);
      }
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
      Alert.alert("Erro", "Não foi possível salvar o produto.");
    }
  };

  const updateItem = async (item) => {
    try {
      const userId = auth.currentUser.uid;
      const res = await api.put(`/api/userProduct/updateProduct/${item.id}`, {
        titulo: item.title,
        preco: item.preco,
        descricao: item.descricao,
        tipo_id: item.tipo.id,
        usuario_id: auth.currentUser.uid,
      });

      if (res.data.success) {
        setItems((prev) =>
          prev.map((p) => (p.id === item.id ? { ...p, ...item } : p))
        );
      }
    } catch (err) {
      console.error("Erro ao atualizar produto:", err);
      Alert.alert("Erro", "Não foi possível atualizar o produto.");
    }
  };

  const removeItem = async (id) => {
    try {
      const userId = auth.currentUser.uid;
      await api.delete(`/api/userProduct/deleteProduct/${id}/${userId}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Erro ao remover produto:", err);
      Alert.alert("Erro", "Não foi possível remover o produto.");
    }
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
          onPress: () => removeItem(item.id),
        },
      ]
    );
  };

  const addTag = (tag) => {
    if (!tag?.nome) return;
    const exists = tags.some(
      (t) => (t.nome || "").toLowerCase() === (tag.nome || "").toLowerCase()
    );
    if (!exists) {
      const tagComCor = { ...tag, cor: tag.cor || getRandomPastelColor() };
      setTags((prev) => [...prev, tagComCor]);

      (async () => {
        try {
          const usuario = {
            id: auth.currentUser.uid,
            nome: auth.currentUser.displayName,
            email: auth.currentUser.email,
          };
          await api.post("/api/userTag/addUserTypeTag", {
            usuario,
            tag: tagComCor,
          });
        } catch (err) {
          console.error("Erro ao adicionar tag:", err);
        }
      })();
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
    } catch (err) {
      console.error("Erro ao deletar tag:", err);
      Alert.alert("Erro", "Não foi possível deletar a tag.");
    }
  };

  return {
    items,
    newItem,
    setNewItem,
    addImage,
    fetchUserTags,
    fetchUserProducts,
    tags,
    saveNewItem,
    updateItem,
    removeItem,
    confirmRemove,
    addTag,
    removeTag,
  };
}
