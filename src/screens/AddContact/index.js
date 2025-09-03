import React from "react";
import { SafeAreaView } from "react-native";
import styles from "../../styles/AddContactStyles";
import AddContactForm from "./components/AddContactForm";
import { useAddContact } from "./hooks/useAddContact";

const AddContact = ({ navigation }) => {
  const { form, handleChange, handleSave } = useAddContact(navigation);

  return (
    <SafeAreaView style={styles.container}>
      <AddContactForm
        form={form}
        onChange={handleChange}
        onSave={handleSave}
        onCancel={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
};

export default AddContact;
