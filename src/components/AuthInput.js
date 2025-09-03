import React from "react";
import { TextInput } from "react-native";
import styles from "../styles/AuthStyles";

const AuthInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  textContentType,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      textContentType={textContentType}
      placeholderTextColor="#888"
    />
  );
};

export default AuthInput;
