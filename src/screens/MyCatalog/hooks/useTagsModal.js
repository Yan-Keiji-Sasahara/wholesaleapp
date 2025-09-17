import { useState } from "react";

export default function useTagsModal({
  // tags = [],
  addTag,
  setNewItem,
  setTagsModalVisible,
  newItem,
}) {
  const [newTagText, setNewTagText] = useState("");

  const selectTag = (tag) => {
    if (!newItem) return;
    setNewItem({
      ...newItem,
      tipo: { id: tag.id, nome: tag.nome, cor: tag.cor },
    });
    setTagsModalVisible(false);
  };

  const handleAddTag = () => {
    const trimmed = newTagText.trim();
    if (trimmed && typeof addTag === "function") {
      addTag({ nome: trimmed });
      setNewTagText("");
    }
  };

  return {
    newTagText,
    setNewTagText,
    selectTag,
    handleAddTag,
  };
}
