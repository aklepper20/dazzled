import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.logo}>Dazzled</Text>
      </TouchableOpacity>
      <View style={styles.action}>
        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
          <Image
            style={styles.image}
            source={require("../assets/messaging.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  logo: {
    fontSize: 20,
    fontWeight: "600",
    fontStyle: "italic",
    color: "#84f8cc",
  },
  image: {
    height: 30,
    width: 30,
    color: "white",
  },
  action: {
    color: "#62c934",
    fontSize: 100,
  },
  unreadBadge: {
    backgroundColor: "#ff3250",
    width: 25,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    position: "absolute",
    left: 15,
    bottom: 18,
  },
  unreadBadgeText: {
    color: "white",
    fontWeight: "600",
  },
});
