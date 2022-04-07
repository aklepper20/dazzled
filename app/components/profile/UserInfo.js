import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import auth from "../../../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const UserInfo = () => {
  const [defaultAvatar, setDefaultAvatar] = useState();
  //   const [userAvatar, setUserAvatar] = useState();

  const getUserAvatar = () => {
    // onSnapshot(doc(db, "users", auth.currentUser.email), (snapshot) => {
    //   setDefaultAvatar(snapshot.data().avatar);
    // });
  };

  // useEffect(() => {
  //   getUserAvatar();
  // }, []);

  const pickAvatar = async () => {
    // try {
    //   const result = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //     quality: 0.5,
    //   });
    //   setUserAvatar(result.uri);
    // } catch (error) {
    //   console.log("Error reading an image", error);
    // }
    // updateAvatar();
  };

  // const updateAvatar = async () => {
  //   const avatarRef = doc(db, "users", auth.currentUser.email);
  //   await updateDoc(avatarRef, {
  //     avatar: userAvatar,
  //   });
  //   getUserAvatar();
  // };

  return (
    <View style={styles.container}>
      <Image
        style={styles.userImage}
        source={{
          uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        }}
      />
      <TouchableOpacity onPress={pickAvatar}>
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
