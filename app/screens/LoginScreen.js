import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import React from "react";

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

      <View style={styles.loginButton}></View>
      <View style={styles.registerButton}></View>
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
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#62c934",
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#84f8cc",
  },
});
