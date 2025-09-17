// import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../../../styles/MyCatalogStyles";

export default function ProductCard({ item, setNewItem, confirmRemove }) {
  return (
    <View style={styles.ProductCardContainer}>
      {item.uri && (
        <Image
          source={{ uri: item.uri }}
          style={styles.ProductCardImage}
          resizeMode="contain"
        />
      )}

      <Text style={styles.ProductCardTitle}>{item.title}</Text>

      <View
        style={[
          styles.ProductCardTagBadge,
          { backgroundColor: item.tipo?.cor || "#ccc" },
        ]}
      >
        <Text style={styles.ProductCardTagText}>
          {item.tipo?.nome || "Sem tipo"}
        </Text>
      </View>

      <Text style={styles.ProductCardPrice}>
        R$: {item.preco ? item.preco.toString().replace(".", ",") : "0,00"}
      </Text>

      <View style={styles.ProductCardButtonRow}>
        <TouchableOpacity
          style={styles.ProductCardEditButton}
          onPress={() => setNewItem(item)}
        >
          <Text style={styles.ProductCardEditButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ProductCardRemoveButton}
          onPress={() => confirmRemove(item)}
        >
          <Text style={styles.ProductCardRemoveButtonText}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
