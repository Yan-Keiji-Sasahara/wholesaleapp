import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import styles from "../../styles/ChatStyles";
import { useChat } from "./hooks/useChat";
import ChatHeader from "./components/ChatHeader";

const Chat = ({ route }) => {
  const { contact } = route.params;
  const navigation = useNavigation();
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const {
    messages,
    input,
    setInput,
    loading,
    sending,
    sendMessage,
    flatListRef,
    userUid,
    userEmail,
  } = useChat(contact);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => setKeyboardOffset(e.endCoordinates.height)
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setKeyboardOffset(0)
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const renderMessageItem = ({ item }) => {
    const isMyMessage = item.sender === userUid;
    const text = item.text || "";
    const timestamp = item.timestamp;

    return (
      <View
        style={[
          styles.messageContainer,
          {
            backgroundColor: isMyMessage
              ? "rgb(255,255,150)"
              : "rgb(150,200,255)",
            alignSelf: isMyMessage ? "flex-end" : "flex-start",
            borderTopRightRadius: isMyMessage ? 0 : 7,
            borderTopLeftRadius: isMyMessage ? 7 : 0,
          },
        ]}
      >
        <Text style={styles.messageText}>{text}</Text>
        {timestamp && (
          <Text style={styles.timestampText}>
            {new Date(
              timestamp?.toDate ? timestamp.toDate() : timestamp
            ).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        )}
      </View>
    );
  };

  if (!userEmail)
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Usuário não autenticado</Text>
      </View>
    );

  if (!contact)
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Contato inválido</Text>
      </View>
    );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <View style={styles.container}>
        <ChatHeader
          contact={contact}
          goBack={() => navigation.goBack()}
          openMenu={() => console.log("Menu aberto")}
          videoCall={() => console.log("Chamada de vídeo")}
        />

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFD700" />
            <Text>Carregando mensagens...</Text>
          </View>
        ) : (
          <KeyboardAwareFlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessageItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid
            extraScrollHeight={10}
          />
        )}

        {/* Barra de input ajustando conforme o teclado */}
        <View style={[styles.inputContainer, { marginBottom: keyboardOffset }]}>
          <TouchableOpacity style={styles.catalogButton}>
            <Ionicons name="cube" size={24} color="#333" />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Digite uma mensagem..."
            multiline
            maxLength={500}
            editable={!sending}
          />

          <TouchableOpacity style={styles.documentButton}>
            <Ionicons name="document" size={22} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={sendMessage}
            style={[
              styles.sendButton,
              { opacity: !input.trim() || sending ? 0.5 : 1 },
            ]}
            disabled={!input.trim() || sending}
          >
            {sending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons name="paper-plane" size={20} color="#000" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Chat;
