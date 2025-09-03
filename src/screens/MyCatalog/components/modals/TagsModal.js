import React, { useState } from "react";
import {
  Modal,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import styles from "../../../../styles/MyCatalogStyles";

export default function TagsModal({
  tags,
  addTag,
  removeTag,
  setTagsModalVisible,
  setNewItem,
  newItem,
}) {
  const [newTagText, setNewTagText] = useState("");

  const selectTag = (tag) => {
    setNewItem({ ...newItem, tipo: tag });
    setTagsModalVisible(false);
  };

  const handleAddTag = () => {
    const trimmed = newTagText.trim();
    if (trimmed) {
      // Adiciona tag usando a lógica do hook (cores e persistência)
      addTag({ nome: trimmed });
      setNewTagText("");
    }
  };

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setTagsModalVisible(false)}
    >
      <View style={styles.TagsModalOverlay}>
        <View style={styles.TagsModalContainer}>
          <Text style={styles.TagsModalTitle}>Gerenciar Tipos (Tags)</Text>

          <ScrollView style={styles.TagsModalTagList}>
            {tags.map((tag, index) => (
              <View key={`${tag.nome}-${index}`} style={styles.TagsModalTagRow}>
                <TouchableOpacity
                  style={{ flex: 1, paddingVertical: 2 }}
                  onPress={() => selectTag(tag)}
                >
                  <Text style={styles.TagsModalTagText}>{tag.nome}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.TagsModalDeleteButton}
                  onPress={() => removeTag(tag)}
                >
                  <Text style={styles.TagsModalDeleteButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={styles.TagsModalInputContainer}>
            <TextInput
              style={styles.TagsModalInput}
              placeholder="Nova tag"
              value={newTagText}
              onChangeText={setNewTagText}
            />
            <TouchableOpacity
              style={styles.TagsModalAddButton}
              onPress={handleAddTag}
            >
              <Text style={styles.TagsModalAddButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.TagsModalCloseButton}
            onPress={() => setTagsModalVisible(false)}
          >
            <Text style={styles.TagsModalCloseButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
