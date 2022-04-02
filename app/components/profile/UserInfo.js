import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import auth from "../../../firebase";

const UserInfo = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.userImage}
        source={{
          uri: "https://i.pinimg.com/originals/2f/fa/e6/2ffae67cccf7d31c352649d8a3d0810c.jpg",
        }}
      />
      <Text style={styles.userText}>{auth.currentUser.email}</Text>
      <Text style={styles.userLocation}>California, USA</Text>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 200,
    position: "absolute",
    top: -75,
    left: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 18,
  },
  userText: {
    fontWeight: "700",
    fontSize: 22,
    marginBottom: 7,
    marginTop: 10,
    color: "white",
  },
  userLocation: {
    fontWeight: "300",
    fontSize: 13,
    color: "white",
  },
});
