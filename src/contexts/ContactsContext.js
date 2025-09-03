import React, { createContext, useContext, useEffect, useState } from "react";
import { db, auth } from "../firebase_config/firebase_config";

const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const unsubscribe = db
      .collection("usuarios")
      .doc(user.uid)
      .collection("contatos")
      .onSnapshot((snapshot) => {
        const fetched = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: data.id,
            name: data.name,
            status: data.status || "Offline",
            unreadCount: data.unreadCount || 0,
            lastMessage: data.lastMessage || "",
            lastMessageTime: data.lastMessageTime?.toDate?.() || null,
          };
        });

        setContacts([
          {
            id: user.email,
            name: "Você",
            status: "Online",
            isSelf: true,
          },
          ...fetched,
        ]);
      });

    return () => unsubscribe();
  }, [user]);

  const addContact = async (email) => {
    if (!user) return;

    const alreadyExists = contacts.some((c) => c.id === email);
    if (alreadyExists || email === user.email) return;

    try {
      const querySnapshot = await db
        .collection("usuarios")
        .where("email", "==", email)
        .limit(1)
        .get();

      if (querySnapshot.empty) {
        throw new Error("Usuário não encontrado.");
      }

      const userDoc = querySnapshot.docs[0].data();

      await db
        .collection("usuarios")
        .doc(user.uid)
        .collection("contatos")
        .doc(userDoc.email)
        .set({
          id: userDoc.email,
          name: userDoc.nome,
          status: "Online",
        });
    } catch (error) {
      console.error("Erro ao adicionar contato:", error.message);
    }
  };

  const deleteContactsById = async (idsToDelete) => {
    if (!user) return;

    const batch = db.batch();
    idsToDelete.forEach((id) => {
      const ref = db
        .collection("usuarios")
        .doc(user.uid)
        .collection("contatos")
        .doc(id);
      batch.delete(ref);
    });

    try {
      await batch.commit();
    } catch (error) {
      console.error("Erro ao deletar contatos:", error.message);
    }
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        setContacts,
        addContact,
        deleteContactsById,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export const useContactsContext = () => useContext(ContactsContext);
