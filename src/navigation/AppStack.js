import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";
import AddContact from "../screens/AddContact";
import Chat from "../screens/Chat";
import { ContactsProvider } from "../contexts/ContactsContext";

const Stack = createNativeStackNavigator();

const AppStack = () => (
  <ContactsProvider>
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {/* Tabs principais */}
      <Stack.Screen
        name="MainTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />

      {/* Adicionar contato */}
      <Stack.Screen
        name="AddContact"
        component={AddContact}
        options={{
          title: "Adicionar Contato",
          headerBackVisible: false,
          headerStyle: { backgroundColor: "#fff" },
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      {/* Chat */}
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </ContactsProvider>
);

export default AppStack;
