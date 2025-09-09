import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";

import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import TagsModal from "./components/TagsModal";

import useMyCatalog from "./hooks/useMyCatalog";

import styles from "../../styles/MyCatalogStyles";

export default function MyCatalogScreen() {
  const catalog = useMyCatalog();
  const [tagsModalVisible, setTagsModalVisible] = useState(false);

  const {
    items,
    newItem,
    setNewItem,
    addImage,
    saveNewItem,
    removeItem,
    tags,
    addTag,
    removeTag,
    confirmRemove,
    fetchUserTags,
  } = catalog;

  useEffect(() => {
    if (tagsModalVisible) {
      fetchUserTags();
    }
  }, [tagsModalVisible]);

  return (
    <View style={styles.indexContainer}>
      {newItem && (
        <ProductModal
          newItem={newItem}
          setNewItem={setNewItem}
          saveNewItem={saveNewItem}
          updateItem={catalog.updateItem}
          setTagsModalVisible={setTagsModalVisible}
        />
      )}

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

      {!newItem && (
        <View style={styles.indexButtonContainer}>
          <TouchableOpacity
            style={styles.indexAddButton}
            onPress={async () => {
              await addImage();
            }}
          >
            <Text style={styles.IndexAddButtonText}>Adicionar Produto</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
