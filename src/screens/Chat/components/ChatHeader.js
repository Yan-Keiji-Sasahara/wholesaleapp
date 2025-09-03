import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../../styles/ChatStyles";

const DEFAULT_AVATAR = "https://www.gravatar.com/avatar/?d=mp&s=50";

const ChatHeader = ({ contact, openMenu, videoCall }) => {
  const name = contact?.name || "Sem nome";
  const photoUrl = contact?.photoUrl || DEFAULT_AVATAR;

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Image source={{ uri: photoUrl }} style={styles.headerAvatar} />
          <Text style={styles.headerName} numberOfLines={1}>
            {name}
          </Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity onPress={videoCall} style={styles.headerIcon}>
            <Ionicons name="videocam-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={openMenu}>
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatHeader;
