import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebase_config/firebase_config";
import { handleAuthError } from "../../utils/firebaseErrors";
import AuthInput from "../../components/AuthInput";
import { showErrorAlert } from "../../utils/alerts";
import { isValidEmail } from "../../utils/isValidEmail";

import styles from "../../styles/AuthStyles";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

const handleLogin = async () => {
  if (!email.trim() || !password) {
    showErrorAlert("Erro", "Preencha todos os campos.");
    return;
  }

  if (!isValidEmail(email)) {
    showErrorAlert("Erro", "Por favor, insira um e-mail válido.");
    return;
  }

  setLoading(true);
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    await AsyncStorage.setItem("@user_email", email);
    await AsyncStorage.setItem("@user_password", password);

    console.log("Usuário logado:", user);
  } catch (error) {
    handleAuthError(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <AuthInput
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        textContentType="emailAddress"
      />

      <AuthInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        textContentType="password"
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <View style={styles.otherOptions}>
        <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
          <Text>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
