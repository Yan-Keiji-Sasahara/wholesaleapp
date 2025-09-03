import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#000",
    flex: 1,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    top: 10,
    marginBottom: 20,
    color: "#333",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#000",
    borderWidth: 1,
    borderColor: "#000",
  },

  saveButton: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },

  saveButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
