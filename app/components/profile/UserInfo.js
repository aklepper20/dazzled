import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import auth from "../../../firebase";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const UserInfo = () => {
  const [userImg, setUserImg] = useState("");
  const [updatedImg, setUpdatedImg] = useState();

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

  const selectAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      setUpdatedImg(result.uri);
    } catch (error) {
      console.log("Error reading an image", error);
    }

    updateUserImg();
  };

  const updateUserImg = async () => {
    try {
      const docRef = doc(db, "users", auth.currentUser.email);
      updateDoc(docRef, {
        avatar: updatedImg,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserImg();
  }, [userImg]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.userImage}
        source={{
          uri: userImg,
        }}
      />
      <TouchableOpacity onPress={selectAvatar}>
        <MaterialCommunityIcons
          style={styles.plusIcon}
          name="plus-circle"
          color="darkgrey"
          size={32}
        />
      </TouchableOpacity>
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
  plusIcon: {
    position: "absolute",
    top: -16,
    left: 32,
  },
});
