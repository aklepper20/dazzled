import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  Button,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { db } from "../../../firebase";
import auth from "../../../firebase";
import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import colors from "../../config/colors";
function ImageInput({
  imageUri,
  setImageUri,
  cameraRollCaption,
  setCameraRollCaption,
  navigation,
  loggedInUserId,
  loggedInUsername,
}) {
  const [isValid, setIsValid] = useState(false);
  const [userProfile, setUserProfile] = useState("");

  const getAllUsers = async () => {
    try {
      onSnapshot(doc(db, "users", auth.currentUser.email), (snapshot) => {
        setUserProfile(snapshot.data().avatar);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    imageUri !== null ? setIsValid(true) : setIsValid(false);
  }, [imageUri]);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library.");
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      setImageUri(result.uri);
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  const addUserPost = async () => {
    const docRef = doc(db, "users", loggedInUserId);
    const colRef = collection(docRef, "posts");
    addDoc(colRef, {
      imageUrl: imageUri,
      caption: cameraRollCaption,
      user: loggedInUsername,
      owner_uid: auth.currentUser.uid,
      owner_email: auth.currentUser.email,
      likes_by_users: [],
      comments: [],
      timestamp: serverTimestamp(),
      owner_profile: userProfile,
    }).then(() => navigation.goBack());
  };

  return (
    <>
      <Text style={styles.titleText}>Tap to add from camera roll</Text>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={selectImage}>
          <View style={styles.imageContainer}>
            {!imageUri && (
              <MaterialCommunityIcons color="black" name="camera" size={40} />
            )}
            {imageUri && (
              <Image source={{ uri: imageUri }} style={styles.image} />
            )}
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.captionContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Enter your caption..."
            placeholderTextColor="grey"
            multiline={true}
            value={cameraRollCaption}
            onChange={(e) => setCameraRollCaption(e.nativeEvent.text)}
          />
        </View>
      </View>
      <Button
        style={{ color: isValid ? colors.pink : colors.lightgrey }}
        onPress={addUserPost}
        title="Share Your Photo"
      ></Button>
    </>
  );
}

const styles = StyleSheet.create({
  captionContainer: {
    flex: 1,
    marginLeft: 12,
  },
  container: {
    margin: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  imageContainer: {
    alignItems: "center",
    backgroundColor: "lightgrey",
    borderRadius: 15,
    height: 100,
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
    width: 100,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  inputText: {
    color: "white",
    fontSize: 20,
    marginTop: 15,
  },
  titleText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 30,
  },
});

export default ImageInput;
