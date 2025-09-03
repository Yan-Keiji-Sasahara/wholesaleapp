import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../../../styles/ContactsStyles";

const FabMenu = ({ visible, onAddContact }) => {
  if (!visible) return null;

  return (
    <View style={styles.fabMenu}>
      <TouchableOpacity style={styles.fabMenuItem} onPress={onAddContact}>
        <Text style={styles.fabMenuText}>Adicionar Contato</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FabMenu;
