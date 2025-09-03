import React from "react";
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from "react-native";
import styles from "../../../styles/ContactsStyles";

const SelectionMenu = ({ visible, onClose, onDelete, onEdit }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1, backgroundColor: "transparent" }}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.menuContainer,
                { position: "absolute", top: 40, right: 10 },
              ]}
            >
              <TouchableOpacity style={styles.menuItem} onPress={onEdit}>
                <Text style={styles.menuText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={onDelete}>
                <Text style={styles.menuText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SelectionMenu;
