import { useCallback } from "react";
import { Alert } from "react-native";

export const useContactsHandlers = ({
  deleteSelectedContacts,
  setSelectionMenuVisible,
}) => {
  const handleDelete = useCallback(() => {
    Alert.alert(
      "Excluir Contatos",
      "Tem certeza que deseja excluir os contatos selecionados?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            deleteSelectedContacts();
            setSelectionMenuVisible(false);
          },
        },
      ]
    );
  }, [deleteSelectedContacts, setSelectionMenuVisible]);

  return { handleDelete };
};
