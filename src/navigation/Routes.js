import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { AuthContext } from "../contexts/AuthProvider";

import AuthStack from "../navigation/AuthStack";
import AppStack from "../navigation/AppStack";

const Routes = () => {
  const { user, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FDD700" />
      </View>
    );
  }

  return user ? <AppStack /> : <AuthStack />;
};

export default Routes;
