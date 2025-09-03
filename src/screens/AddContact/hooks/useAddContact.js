import { useState } from "react";
import { Alert } from "react-native";
import { db, auth } from "../../../firebase_config/firebase_config";

export const useAddContact = () => {
  const [form, setForm] = useState({
    email: "",
  });

  const user = auth.currentUser;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const { email } = form;

    if (!email.trim()) {
      Alert.alert("Campo obrigatório", "Informe um e-mail.");
      return;
    }

    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    if (email === user.email) {
      Alert.alert("Aviso", "Você não pode se adicionar.");
      return;
    }

    try {
      const querySnapshot = await db
        .collection("usuarios")
        .where("email", "==", email)
        .limit(1)
        .get();

      if (querySnapshot.empty) {
        Alert.alert("Não encontrado", "Nenhum usuário com esse e-mail.");
        return;
      }

      const userToAddDoc = querySnapshot.docs[0];
      const userToAdd = userToAddDoc.data();
      const userToAddUid = userToAddDoc.id;

      const contatoRef = db
        .collection("usuarios")
        .doc(user.uid)
        .collection("contatos")
        .doc(userToAddUid);

      const contatoDoc = await contatoRef.get();

      if (contatoDoc.exists) {
        Alert.alert("Aviso", "Este contato já foi adicionado.");
        return;
      }

      await contatoRef.set(
        {
          id: userToAddUid,
          email: userToAdd.email,
          name: userToAdd.nome || "Sem nome",
          status: "Online",
        },
        { merge: true }
      );

      await db
        .collection("usuarios")
        .doc(userToAddUid)
        .collection("contatos")
        .doc(user.uid)
        .set(
          {
            id: user.uid,
            email: user.email,
            name: user.displayName || "Sem nome",
            status: "Online",
          },
          { merge: true }
        );

      Alert.alert("Sucesso", `${userToAdd.nome || "Usuário"} adicionado!`);
    } catch (error) {
      console.error("Erro ao adicionar contato:", error);
      Alert.alert("Erro", "Não foi possível adicionar o contato.");
    }
  };

  return {
    form,
    handleChange,
    handleSave,
  };
};
