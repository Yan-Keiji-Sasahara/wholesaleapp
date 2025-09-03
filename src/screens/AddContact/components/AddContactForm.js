import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../../../styles/AddContactStyles";

const AddContactForm = ({ form, onChange, onSave }) => {
  return (
    <View style={{ padding: 20 }}>
      <TextInput
        style={styles.input}
        placeholder="E-mail do contato"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(text) => onChange("email", text)}
      />

      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Text style={styles.saveButtonText}>Buscar Contato</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddContactForm;
