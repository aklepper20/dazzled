import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import LoginForm from "../components/LoginForm";

const LoginScreen = () => {
  return (
    <ImageBackground
      blurRadius={5}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Dazzled</Text>
        <Text>Tagline for dazzled</Text>
      </View>
      <LoginForm />
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  logo: {
    fontSize: 50,
    color: "white",
    fontWeight: "400",
    fontStyle: "italic",
  },

  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
});
