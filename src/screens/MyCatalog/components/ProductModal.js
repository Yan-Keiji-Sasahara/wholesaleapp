// import React from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import styles from "../../../styles/MyCatalogStyles";
import useProductModal from "../hooks/useProductModal";

export default function ProductModal(props) {
  const { newItem, setNewItem, saveNewItem, updateItem, setTagsModalVisible } =
    props;

  const { loading, isEditing, handleSave, openTagsModal, cancel } =
    useProductModal({
      newItem,
      setNewItem,
      saveNewItem,
      updateItem,
      setTagsModalVisible,
    });

  return (
    <View style={styles.ProductModalKeyboard}>
      <View style={styles.ProductModalCard}>
        {newItem?.uri && (
          <Image
            source={{ uri: newItem.uri }}
            style={styles.ProductModalImage}
            resizeMode="contain"
          />
        )}

        <TextInput
          style={styles.ProductModalInput}
          placeholder="Nome do produto"
          value={newItem?.title}
          onChangeText={(text) => setNewItem({ ...newItem, title: text })}
        />

        <TouchableOpacity
          style={styles.ProductModalTipoButton}
          onPress={openTagsModal}
        >
          <Text style={styles.ProductModalButtonText}>
            {newItem?.tipo ? `Tipo: ${newItem.tipo.nome}` : "Adicionar Tipo"}
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.ProductModalInput}
          placeholder='ex: "54,50"'
          value={newItem?.preco}
          keyboardType="numeric"
          onChangeText={(text) => setNewItem({ ...newItem, preco: text })}
        />

        <TextInput
          style={styles.ProductModalDescricaoInput}
          placeholder="(opcional) Descrição"
          value={newItem?.descricao}
          onChangeText={(text) => setNewItem({ ...newItem, descricao: text })}
          multiline
          scrollEnabled={true}
          textAlignVertical="top"
        />

        <View style={styles.ProductModalButtonRow}>
          <TouchableOpacity
            style={[styles.ProductModalButton, styles.ProductModalCancel]}
            onPress={cancel}
          >
            <Text style={styles.ProductModalButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.ProductModalButton}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.ProductModalButtonText}>
                {isEditing ? "Salvar Alterações" : "Salvar Produto"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
