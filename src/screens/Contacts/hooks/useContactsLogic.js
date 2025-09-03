import { useState } from "react";

const useContactsLogic = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);

  const toggleSelection = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return {
    menuVisible,
    setMenuVisible,
    isSearching,
    setIsSearching,
    searchTerm,
    setSearchTerm,
    selectedContacts,
    setSelectedContacts,
    toggleSelection,
  };
};

export default useContactsLogic;
