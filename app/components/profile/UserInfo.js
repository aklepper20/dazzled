import { StyleSheet, Text, View, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";

import auth from "../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

import * as Location from "expo-location";

const UserInfo = () => {
  const [userImg, setUserImg] = useState();
  const [location, setLocation] = useState();

  const getUserImg = async () => {
    try {
      const docRef = doc(db, "users", auth.currentUser.email);
      onSnapshot(docRef, (snapshot) => {
        setUserImg(snapshot.data().avatar);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (!granted) {
        Alert.alert(
          "Permission not granted",
          "Allow the app to use location service.",
          [{ text: "OK" }],
          { cancelable: false }
        );
        return;
      }
      let { coords } = await Location.getCurrentPositionAsync();
      if (coords) {
        const { latitude, longitude } = coords;
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        for (let item of response) {
          let address = `${item.city}, ${item.country}`;

          setLocation(address);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserImg();
    getLocation();
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.userImage}
        source={{
          uri: userImg,
        }}
      />
      <Text style={styles.userText}>{auth.currentUser.email}</Text>
      <Text style={styles.userLocation}>
        {location ? location : "Loading City..."}
      </Text>
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
