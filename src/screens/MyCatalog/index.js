import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";

import ProductCard from "./components/ProductCard";
import ProductModal from "./components/modals/ProductModal";
import TagsModal from "./components/modals/TagsModal";

import useMyCatalog from "./hooks/useMyCatalog";

import styles from "../../styles/MyCatalogStyles";

export default function MyCatalogScreen() {
  const catalog = useMyCatalog();
  const [tagsModalVisible, setTagsModalVisible] = useState(false);

  const {
    items,
    newItem,
    setNewItem,
    addImage, // ⚡ Já envia direto pro Cloudinary
    saveNewItem, // Salva o produto na lista
    removeItem,
    tags,
    addTag,
    removeTag,
    confirmRemove,
    fetchUserTags,
  } = catalog;

  // 🔹 Atualiza as tags do usuário sempre que o modal de tags abrir
  useEffect(() => {
    if (tagsModalVisible) {
      fetchUserTags();
    }
  }, [tagsModalVisible]);

  return (
    <View style={styles.indexContainer}>
      {/* Modal do Produto */}
      {newItem && (
        <ProductModal
          newItem={newItem}
          setNewItem={setNewItem}
          saveNewItem={saveNewItem}
          setTagsModalVisible={setTagsModalVisible}
        />
      )}

      {/* Modal de Tags */}
      {tagsModalVisible && (
        <TagsModal
          tags={tags}
          addTag={addTag}
          removeTag={removeTag}
          setTagsModalVisible={setTagsModalVisible}
          setNewItem={setNewItem}
          newItem={newItem}
        />
      )}

      {/* Lista de produtos */}
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            setNewItem={setNewItem}
            newItem={newItem}
            removeItem={removeItem}
            confirmRemove={confirmRemove}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.indexListContainer}
      />

      {/* Botão para adicionar novo produto */}
      {!newItem && (
        <View style={styles.indexButtonContainer}>
          <TouchableOpacity
            style={styles.indexAddButton}
            onPress={async () => {
              await addImage(); // ⚡ Chama a função que envia a imagem para o Cloudinary
            }}
          >
            <Text style={styles.IndexAddButtonText}>Adicionar Produto</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
