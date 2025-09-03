import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../../styles/ContactsStyles";

const ContactsItem = ({ item, onPress, onLongPress, isSelected = false }) => {
  const name = item.name || "Sem nome";
  const status = item.status || "Offline";
  const photoUrl =
    item.photoUrl || "https://www.gravatar.com/avatar/?d=mp&s=50";
  const unreadCount = item.unreadCount || 0;

  return (
    <TouchableOpacity
      style={[
        styles.ContactsItem,
        { backgroundColor: isSelected ? "#d0e0ff" : "white" },
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {isSelected && (
        <Ionicons
          name="checkmark-circle"
          size={24}
          color="#FFD700"
          style={{ marginRight: 10 }}
        />
      )}

      <Image source={{ uri: photoUrl }} style={styles.contactImage} />

      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{name}</Text>
        <Text style={styles.contactStatus}>{status}</Text>
      </View>

      {unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ContactsItem;
