import React, { useState } from "react";
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/ContactsStyles";
import useContactsLogic from "./hooks/useContactsLogic";
import { useContactsHandlers } from "./hooks/useContactsHandlers";
import useContactsHeader from "./hooks/useContactsHeader";
import ContactsList from "./components/ContactsList";
import ContactsMenu from "./components/ContactsMenu";
import SelectionMenu from "./components/SelectionMenu";
import FabMenu from "./components/FabMenu";
import { useContactsContext } from "../../contexts/ContactsContext";

const Contacts = ({ navigation }) => {
  const [fabMenuVisible, setFabMenuVisible] = useState(false);
  const [selectionMenuVisible, setSelectionMenuVisible] = useState(false);

  const {
    menuVisible,
    setMenuVisible,
    isSearching,
    setIsSearching,
    searchTerm,
    setSearchTerm,
    selectedContacts,
    setSelectedContacts,
    toggleSelection,
  } = useContactsLogic();

  const { contacts, deleteContactsById } = useContactsContext();

  const deleteSelectedContacts = () => {
    deleteContactsById(selectedContacts);
    setSelectedContacts([]);
  };

  const { handleDelete } = useContactsHandlers({
    deleteSelectedContacts,
    setSelectionMenuVisible,
  });

  useContactsHeader({
    navigation,
    title: "Contatos",
    isSearching,
    searchTerm,
    setSearchTerm,
    setIsSearching,
    selectedContacts,
    setSelectedContacts,
    setMenuVisible,
    setSelectionMenuVisible,
  });

  const handleContactPress = (contact) => {
    if (selectedContacts.length > 0) {
      toggleSelection(contact.id);
    } else {
      navigation.navigate("Chat", { contact });
    }
  };

  const handleContactLongPress = (contact) => {
    toggleSelection(contact.id);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setMenuVisible(false);
        setFabMenuVisible(false);
      }}
    >
      <SafeAreaView style={styles.container}>
        <ContactsList
          contacts={contacts}
          searchTerm={searchTerm}
          selectedContacts={selectedContacts}
          onItemPress={handleContactPress}
          onItemLongPress={handleContactLongPress}
        />

        <ContactsMenu
          visible={menuVisible}
          onClose={() => setMenuVisible(false)}
        />

        <SelectionMenu
          visible={selectionMenuVisible}
          onClose={() => setSelectionMenuVisible(false)}
          onDelete={handleDelete}
        />

        <FabMenu
          visible={fabMenuVisible}
          onAddContact={() => {
            setFabMenuVisible(false);
            navigation.navigate("AddContact");
          }}
        />

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setFabMenuVisible((prev) => !prev)}
        >
          <Ionicons
            name={fabMenuVisible ? "close" : "add"}
            size={26}
            color="white"
          />
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Contacts;
