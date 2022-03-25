import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import React from "react";

const LoginForm = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputField}>
        <TextInput
          placeholderTextColor="#444"
          placeholder="Phone number, email or usename"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
        />
      </View>
      <View>
        <TextInput
          style={styles.inputField}
          placeholderTextColor="#444"
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
        />
      </View>
      <View style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </View>
      <Pressable titleSize={20} style={styles.button}>
        <Text>Log in</Text>
      </Pressable>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "yellow",
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 42,
  },
  container: {
    marginBottom: 80,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
  },
  inputField: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: "white",
    marginBottom: 10,
    borderWidth: 1,
  },
  forgotPassword: {
    alignItems: "flex-end",
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: "blue",
  },
});
