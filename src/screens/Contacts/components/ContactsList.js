import React from "react";
import { FlatList } from "react-native";
import ContactsItem from "./ContactsItem";

const ContactsList = ({
  contacts,
  searchTerm,
  selectedContacts,
  onItemPress,
  onItemLongPress,
}) => {
  const term = (searchTerm || "").toLowerCase();

  // Filtra contatos válidos (com id e nome) e que batem com o termo de busca
  const filteredContacts = contacts
    .filter((c) => c.id && c.name) // Ignora contatos sem id ou nome
    .filter(
      (c) =>
        c.name.toLowerCase().includes(term) || c.id.toLowerCase().includes(term)
    );

  const renderItem = ({ item }) => {
    const isSelected = selectedContacts.includes(item.id);
    return (
      <ContactsItem
        item={item}
        isSelected={isSelected}
        onPress={() => onItemPress(item)}
        onLongPress={() => onItemLongPress(item)}
      />
    );
  };

  return (
    <FlatList
      data={filteredContacts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 80 }}
    />
  );
};

export default ContactsList;
