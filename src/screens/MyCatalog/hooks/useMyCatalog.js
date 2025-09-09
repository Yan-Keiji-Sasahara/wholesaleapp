import { useState, useEffect } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import api from "../../../services/api";
import { auth } from "../../../firebase_config/firebase_config";
import { uploadImageToCloudinary } from "../../../services/cloudinaryService";

function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 80%)`;
}

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
    console.log("Tag adicionada:", res.data);
  } catch (error) {
    console.error("Erro ao adicionar tag:", error);
  }
};

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
      console.error("Erro ao buscar tipos do usuário:", err);
    }
  };

  const fetchUserProducts = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const res = await api.get(`/api/userProduct/getUserProducts/${userId}`);
      if (res.data.success) {
        const userProducts = res.data.products.map((p) => ({
          id: p.id.toString(),
          title: p.titulo,
          preco: p.preco,
          descricao: p.descricao,
          uri: p.imagem_uri,
          tipo: {
            id: p.tipo_id,
            nome: p.tipo_nome,
            cor: p.tipo_cor || getRandomPastelColor(),
          },
        }));
        setItems(userProducts);
        console.log("Produtos do usuário carregados:", userProducts);
      }
    } catch (err) {
      console.error("Erro ao buscar produtos do usuário:", err);
    }
  };

  useEffect(() => {
    fetchUserTags();
    fetchUserProducts();
  }, []);

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
      const localUri = result.assets[0].uri;
      initNewItem(localUri);
    }
  };

  const saveNewItem = async () => {
    if (!newItem?.title || !newItem?.preco || !newItem?.tipo) {
      alert("Preencha nome, tipo e preço.");
      return;
    }

    let finalUrl = newItem.uri;
    if (!finalUrl.startsWith("http")) {
      finalUrl = await uploadImageToCloudinary(newItem.uri);
      if (!finalUrl) {
        Alert.alert("Erro", "Não foi possível enviar a imagem.");
        return;
      }
    }

    const precoFormatado = newItem.preco.replace(",", ".");
    const tipoId = newItem.tipo.id;

    try {
      const userId = auth.currentUser.uid;
      await api.post("/api/userProduct/createProduct", {
        usuario_id: userId,
        titulo: newItem.title,
        preco: precoFormatado,
        descricao: newItem.descricao || "",
        tipo_id: tipoId,
        imagem_uri: finalUrl,
      });

      await fetchUserProducts();
      setNewItem(null);
    } catch (err) {
      console.error("Erro ao enviar produto para backend:", err);
      Alert.alert("Erro", "Não foi possível salvar o produto no backend.");
    }
  };

  const updateItem = async () => {
    if (newItem?.isNew) return;

    const original = items.find((i) => i.id === newItem.id);
    if (!original) {
      console.warn("Produto não encontrado para atualizar:", newItem);
      return;
    }

    const updates = {};
    if (newItem.title !== original.title) updates.titulo = newItem.title;
    if (newItem.preco !== original.preco)
      updates.preco = newItem.preco.replace(",", ".");
    if (newItem.descricao !== original.descricao)
      updates.descricao = newItem.descricao;
    if (newItem.tipo?.id !== original.tipo?.id)
      updates.tipo_id = newItem.tipo.id;

    if (Object.keys(updates).length === 0) {
      Alert.alert("Nenhuma alteração", "Você não modificou nenhum campo.");
      return;
    }

    try {
      await api.put(`/api/userProduct/updateProduct/${newItem.id}`, updates);
      await fetchUserProducts();
      setNewItem(null);
    } catch (err) {
      console.error("Erro ao atualizar produto:", err);
      Alert.alert("Erro", "Não foi possível atualizar o produto.");
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
          onPress: async () => {
            if (newItem?.id === item.id) setNewItem(null);
            await removeItem(item.id);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const removeItem = async (id) => {
    try {
      const userId = auth.currentUser.uid;
      await api.delete(`/api/userProduct/deleteProduct/${id}/${userId}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
      console.log("Produto removido:", id);
    } catch (err) {
      console.error("Erro ao remover produto:", err);
      Alert.alert(
        "Erro",
        "Não foi possível remover o produto. Tente novamente."
      );
    }
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
    } catch (err) {
      console.error("Erro ao deletar tag:", err);
      Alert.alert("Erro", "Não foi possível deletar a tag. Tente novamente.");
    }
  };

  return {
    items,
    newItem,
    setNewItem,
    addImage,
    saveNewItem,
    updateItem,
    removeItem,
    confirmRemove,
    tags,
    addTag,
    removeTag,
    fetchUserTags,
    fetchUserProducts,
  };
}
