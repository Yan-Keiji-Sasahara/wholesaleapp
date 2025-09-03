import React from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  Text,
} from "react-native";
import styles from "../../../../styles/MyCatalogStyles";

export default function ProductModal({
  newItem,
  setNewItem,
  saveNewItem,
  setTagsModalVisible,
}) {
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
          onPress={() => {
            Keyboard.dismiss();
            setTimeout(() => setTagsModalVisible(true), 50);
          }}
        >
          <Text style={styles.ProductModalButtonText}>
            {newItem?.tipo ? `Tipo: ${newItem.tipo.nome}` : "Adicionar Tipo"}
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.ProductModalInput}
          placeholder='R$ "54,50"'
          value={newItem?.preco}
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
            onPress={() => setNewItem(null)}
          >
            <Text style={styles.ProductModalButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.ProductModalButton}
            onPress={saveNewItem}
          >
            <Text style={styles.ProductModalButtonText}>Salvar Produto</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
