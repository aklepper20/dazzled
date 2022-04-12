import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../config/colors";

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Dazzle</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
  },
  logo: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.white,
  },
});
