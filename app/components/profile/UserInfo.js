import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

import auth from "../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { signOut } from "firebase/auth";

import * as Location from "expo-location";

import { MaterialCommunityIcons } from "@expo/vector-icons";

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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
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
      <View style={styles.profileBackground}>
        <Image
          style={styles.userImage}
          source={{
            uri: userImg,
          }}
        />
      </View>
      <TouchableOpacity onPress={handleSignOut}>
        <MaterialCommunityIcons
          name="logout"
          color="yellow"
          size={30}
          style={styles.logout}
        />
      </TouchableOpacity>
      <Text style={styles.userText}>
        {auth.currentUser.email.length >= 11
          ? auth.currentUser.email.slice(0, 10) + "..."
          : auth.currentUser.email}
      </Text>
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
  logout: {
    position: "absolute",
    top: -20,
    right: -150,
  },
  userImage: {
    height: 100,
    width: 100,
    marginBottom: 10,
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
  profileBackground: {
    backgroundColor: "teal",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});
