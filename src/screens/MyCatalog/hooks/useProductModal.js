import { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { uploadImageToCloudinary } from "../../../services/cloudinaryService";

export default function useProductModal({
  newItem,
  setNewItem,
  saveNewItem,
  updateItem,
  setTagsModalVisible,
}) {
  const [loading, setLoading] = useState(false);
  const isEditing = !!newItem?.id;

  const handleSave = async () => {
    if (!newItem?.title || !newItem?.preco || !newItem?.tipo) {
      Alert.alert("Erro", "Preencha nome, tipo e preço.");
      return;
    }

    setLoading(true);
    try {
      let itemToSave = { ...newItem };

      if (!itemToSave.uri.startsWith("http")) {
        const uploadedUri = await uploadImageToCloudinary(itemToSave.uri);
        if (!uploadedUri) {
          Alert.alert("Erro", "Não foi possível enviar a imagem.");
          return;
        }
        itemToSave.uri = uploadedUri;
      }

      if (isEditing) {
        await updateItem(itemToSave);
      } else {
        await saveNewItem(itemToSave);
      }

      setNewItem(null);
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
      Alert.alert("Erro", "Não foi possível salvar o produto.");
    } finally {
      setLoading(false);
    }
  };

  const openTagsModal = () => {
    Keyboard.dismiss();
    setTimeout(() => setTagsModalVisible(true), 50);
  };

  const cancel = () => setNewItem(null);

  return {
    loading,
    isEditing,
    handleSave,
    openTagsModal,
    cancel,
  };
}
