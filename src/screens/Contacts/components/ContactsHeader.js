import React from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ContactsHeader = ({
  title,
  selectedCount,
  isSearching,
  searchTerm,
  setSearchTerm,
  setIsSearching,
  abrirCamera,
  clearSelection,
  setSelectionMenuVisible,
  setMenuVisible,
}) => {
  const HeaderTitle = () =>
    selectedCount > 0 ? (
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{selectedCount}</Text>
    ) : (
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000" }}>
        {title}
      </Text>
    );

  const HeaderLeft = () =>
    selectedCount > 0 ? (
      <TouchableOpacity onPress={clearSelection} style={{ paddingHorizontal: 10 }}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
    ) : null;

  const HeaderRight = () => {
    if (selectedCount > 0) {
      return (
        <TouchableOpacity
          onPress={() => setSelectionMenuVisible(true)}
          style={{ paddingHorizontal: 10 }}
        >
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      );
    }

    if (isSearching) {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={{
              height: 40,
              borderBottomWidth: 1,
              borderColor: "#ccc",
              fontSize: 18,
              minWidth: 275,
              paddingHorizontal: 5,
              color: "black",
            }}
            placeholder="Buscar contatos..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            autoFocus
          />
          <TouchableOpacity
            onPress={() => {
              setIsSearching(false);
              setSearchTerm("");
            }}
            style={{ paddingHorizontal: 10 }}
          >
            <Ionicons name="close-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => setIsSearching(true)} style={{ paddingHorizontal: 10 }}>
          <Ionicons name="search-outline" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={abrirCamera} style={{ paddingHorizontal: 10 }}>
          <Ionicons name="camera-outline" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMenuVisible(true)} style={{ paddingHorizontal: 10 }}>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  return { HeaderTitle, HeaderLeft, HeaderRight };
};

export default ContactsHeader;
