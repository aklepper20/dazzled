import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import SignUpForm from "../components/SignUpForm";
import colors from "../config/colors";

const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={require("../assets/diamond.png")}
        />
        <Text style={styles.logo}>Dazzle</Text>
      </View>
      <SignUpForm navigation={navigation} />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  logo: {
    fontSize: 40,
    color: colors.black,
    fontWeight: "400",
    fontStyle: "italic",
  },

  logoContainer: {
    position: "absolute",
    top: 150,
    alignItems: "center",
  },
  logoImage: {
    height: 90,
    width: 90,
  },
});
