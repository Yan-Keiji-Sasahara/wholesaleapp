import { Alert } from "react-native";

export function handleAuthError(error) {
  console.error("Firebase Auth Error:", error);

  switch (error.code) {
    case "auth/invalid-email":
      Alert.alert("Erro", "Formato de e-mail inválido.");
      break;
    case "auth/user-not-found":
    case "auth/wrong-password":
      Alert.alert("Erro", "E-mail ou senha inválidos.");
      break;
    case "auth/email-already-in-use":
      Alert.alert("Erro", "Este e-mail já está em uso.");
      break;
    case "auth/weak-password":
      Alert.alert("Erro", "Senha muito fraca. Use pelo menos 6 caracteres.");
      break;
    case "auth/invalid-credential":
      Alert.alert("Erro", "Credenciais inválidas. Por favor, tente novamente.");
      break;
    default:
      Alert.alert("Erro", error.message || "Ocorreu um erro inesperado.");
  }
}
