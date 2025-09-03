import { useLayoutEffect } from "react";
import ContactsHeader from "../components/ContactsHeader";
import { abrirCamera } from "../../../utils/cameraUtils";

const useContactsHeader = ({
  navigation,
  title = "Contatos",
  isSearching,
  searchTerm,
  setSearchTerm,
  setIsSearching,
  selectedContacts,
  setSelectedContacts,
  setMenuVisible,
  setSelectionMenuVisible,
}) => {
  const clearSelection = () => setSelectedContacts([]);

  const handleAbrirCamera = async () => {
    try {
      const fotoUri = await abrirCamera();
      if (fotoUri) console.log("Foto capturada:", fotoUri);
    } catch (e) {
      console.error("Erro ao abrir câmera:", e);
    }
  };

  useLayoutEffect(() => {
    const { HeaderTitle, HeaderLeft, HeaderRight } = ContactsHeader({
      title,
      selectedCount: selectedContacts.length,
      isSearching,
      searchTerm,
      setSearchTerm,
      setIsSearching,
      abrirCamera: handleAbrirCamera,
      clearSelection,
      setSelectionMenuVisible,
      setMenuVisible,
    });

    navigation.setOptions({
      headerTitle: HeaderTitle,
      headerLeft: HeaderLeft,
      headerRight: HeaderRight,
    });
  }, [
    navigation,
    title,
    isSearching,
    searchTerm,
    selectedContacts,
    setSelectedContacts,
    setIsSearching,
    setMenuVisible,
    setSelectionMenuVisible,
  ]);
};

export default useContactsHeader;
