import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase_config/firebase_config";

import { showConfirmAlert, showErrorAlert } from "../../utils/alerts";
import { handleAuthError } from "../../utils/firebaseErrors";
import { isValidEmail } from "../../utils/isValidEmail";
import AuthInput from "../../components/AuthInput";

import styles from "../../styles/AuthStyles";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const confirmCreateAccount = () => {
    if (!name.trim() || !email || !password || !confirmPassword) {
      showErrorAlert("Erro", "Preencha todos os campos.");
      return;
    }

    if (name.trim().length < 3) {
      showErrorAlert("Erro", "O nome deve ter pelo menos 3 caracteres.");
      return;
    }

    if (!isValidEmail(email)) {
      showErrorAlert("Erro", "Por favor, insira um e-mail válido.");
      return;
    }

    if (password !== confirmPassword) {
      showErrorAlert("Erro", "As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      showErrorAlert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    showConfirmAlert("Confirmar cadastro", `Deseja criar uma conta com o e-mail:\n${email}?`, handleCreateAccount);
  };

  const handleCreateAccount = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name.trim() });

      await setDoc(doc(db, "usuarios", user.uid), {
        nome: name.trim(),
        email: user.email,
        criadoEm: new Date(),
      });

      Alert.alert("Conta criada!", `Bem-vindo(a), ${user.displayName || user.email}`);
      console.log("Usuário criado:", user);

    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar conta</Text>

      <AuthInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        textContentType="name"
      />

      <AuthInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        textContentType="emailAddress"
      />

      <AuthInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        textContentType="password"
      />

      <AuthInput
        placeholder="Confirmar senha"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        textContentType="password"
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={confirmCreateAccount}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Cadastrar</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default CreateAccount;
