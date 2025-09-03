import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  unreadBadge: {
    backgroundColor: "#FFD700",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    position: "absolute",
    right: 10,
    top: 10,
    minWidth: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  unreadCount: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },

  fabMenu: {
    position: "absolute",
    right: 20,
    bottom: 90,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  fabMenuItem: {
    paddingVertical: 0,
  },

  fabMenuText: {
    fontSize: 16,
    color: "#333",
  },

  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#FFD700",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#FFD700",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#000",
  },

  container: {
    flex: 1,
    padding: 0,
    borderWidth: 1,
    borderColor: "#000",
  },
  ContactsItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    position: "relative",
    justifyContent: "space-between",
  },
  contactDetails: {
    flexDirection: "row",
    flex: 1,
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contactInfo: {
    marginLeft: 10,
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contactStatus: {
    color: "gray",
  },
  removeText: {
    fontSize: 24,
    color: "gray",
    marginLeft: 10,
    alignSelf: "center",
  },
  removeMenu: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 5,
    zIndex: 999,
  },
  removeOption: {
    padding: 10,
    fontSize: 16,
    color: "red",
  },
  buttonBase: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuText: {
    fontSize: 16,
    color: "black",
  },

  addContactModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addContactModalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  addContactHeaderText: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    width: 250,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noNotifications: {
    fontSize: 16,
    color: "gray",
  },
  notificationItem: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
    minWidth: 80,
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
  },
  declineButton: {
    backgroundColor: "#F44336",
  },
  buttonTextWhite: {
    color: "white",
    fontWeight: "bold",
  },
  menuContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 5,
    paddingVertical: 0,
    paddingHorizontal: 5,
  },

  menuItem: {
    paddingVertical: 10,
  },

  menuText: {
    fontSize: 16,
    color: "#333",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});

export default styles;
