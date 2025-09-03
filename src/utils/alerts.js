import { Alert } from "react-native";

export function showConfirmAlert(title, message, onConfirm) {
  Alert.alert(
    title,
    message,
    [
      { text: "Cancelar", style: "cancel" },
      { text: "Sim", onPress: onConfirm },
    ],
    { cancelable: false }
  );
}

export function showErrorAlert(title, message) {
  Alert.alert(title, message);
}
