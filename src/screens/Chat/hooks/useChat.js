import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Alert } from "react-native";
import { db, auth } from "../../../firebase_config/firebase_config";
import firebase from "firebase/compat/app";

export const useChat = (contact) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const flatListRef = useRef(null);

  const userEmail = useMemo(() => auth.currentUser?.email, []);
  const userUid = useMemo(() => auth.currentUser?.uid, []);

  const chatId = useMemo(() => {
    if (!userUid || !contact?.id) return null;
    return userUid < contact.id
      ? `${userUid}_${contact.id}`
      : `${contact.id}_${userUid}`;
  }, [userUid, contact?.id]);

  useEffect(() => {
    if (!userEmail || !chatId) {
      setLoading(false);
      return;
    }

    const messagesRef = db
      .collection("messages")
      .doc(chatId)
      .collection("messages")
      .orderBy("timestamp", "asc");

    const unsubscribe = messagesRef.onSnapshot(
      (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate?.() || doc.data().timestamp,
        }));
        setMessages(msgs);
        setLoading(false);
      },
      (error) => {
        console.error("Erro ao sincronizar mensagens:", error);
        setLoading(false);
        Alert.alert("Erro", "Não foi possível carregar as mensagens");
      }
    );

    return () => unsubscribe();
  }, [userEmail, chatId]);

  const sendMessage = useCallback(async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || !chatId || sending) return;

    setSending(true);
    const tempInput = trimmedInput;
    setInput("");

    try {
      const messagesRef = db
        .collection("messages")
        .doc(chatId)
        .collection("messages");

      await messagesRef.add({
        sender: userUid,
        text: tempInput,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      await db
        .collection("usuarios")
        .doc(contact.id)
        .collection("contatos")
        .doc(userUid)
        .set(
          {
            unreadCount: firebase.firestore.FieldValue.increment(1),
            lastMessage: tempInput,
            lastMessageTime: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setInput(tempInput);
      Alert.alert("Erro", "Não foi possível enviar a mensagem");
    } finally {
      setSending(false);
    }
  }, [input, chatId, sending, userUid, contact?.id]);

  const renderMessage = useCallback(
    ({ item }) => {
      const isMyMessage = item.sender === userUid;
      return { message: item, isMyMessage };
    },
    [userUid]
  );

  return {
    messages,
    input,
    setInput,
    loading,
    sending,
    sendMessage,
    flatListRef,
    renderMessage,
    userEmail,
    userUid,
  };
};
