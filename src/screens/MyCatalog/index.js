import { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";

import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import TagsModal from "./components/TagsModal";

import useMyCatalog from "./hooks/useMyCatalog";

import styles from "../../styles/MyCatalogStyles";

export default function MyCatalogScreen() {
  const {
    items,
    newItem,
    setNewItem,
    addImage,
    saveNewItem,
    updateItem,
    removeItem,
    tags,
    addTag,
    removeTag,
    confirmRemove,
    fetchUserTags,
  } = useMyCatalog();

  const [tagsModalVisible, setTagsModalVisible] = useState(false);

  useEffect(() => {
    if (tagsModalVisible) fetchUserTags();
  }, [tagsModalVisible]);

  return (
    <View style={styles.indexContainer}>
      {newItem && (
        <ProductModal
          newItem={newItem}
          setNewItem={setNewItem}
          saveNewItem={saveNewItem}
          updateItem={updateItem}
          setTagsModalVisible={setTagsModalVisible}
          addTag={addTag}
          removeTag={removeTag}
          tags={tags}
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
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.indexListContainer}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            setNewItem={setNewItem}
            newItem={newItem}
            removeItem={removeItem}
            confirmRemove={confirmRemove}
          />
        )}
      />

      {!newItem && (
        <View style={styles.indexButtonContainer}>
          <TouchableOpacity style={styles.indexAddButton} onPress={addImage}>
            <Text style={styles.IndexAddButtonText}>Adicionar Produto</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
