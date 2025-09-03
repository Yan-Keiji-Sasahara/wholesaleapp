import React from "react";
import { Modal, View, TouchableWithoutFeedback, TouchableOpacity, Text, Alert } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase_config/firebase_config";
import styles from "../../../styles/ContactsStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ContactsMenu = ({ visible, onClose }) => {
  const navigation = useNavigation();

const handleLogout = () => {
  Alert.alert("Sair", "Deseja realmente sair da conta?", [
    { text: "Cancelar", style: "cancel" },
    {
      text: "Sair",
      style: "destructive",
      onPress: async () => {
        try {
          await auth.signOut();

          await AsyncStorage.removeItem("@user_email");
          await AsyncStorage.removeItem("@user_password");

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          );
        } catch (error) {
          console.error("Erro ao fazer logout:", error);
        }
      },
    },
  ]);
};

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1, backgroundColor: "transparent" }}>
          <TouchableWithoutFeedback>
            <View style={[styles.menuContainer, { position: "absolute", top: 30, right: 5 }]}>
              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <Text style={styles.menuText}>Sair da Conta</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ContactsMenu;
