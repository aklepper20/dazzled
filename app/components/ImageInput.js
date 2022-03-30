import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
  Text,
  TextInput,
  Button,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { db } from "../../firebase";
import auth from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
function ImageInput({
  imageUri,
  setImageUri,
  cameraRollCaption,
  setCameraRollCaption,
  navigation,
  usersPosts,
  loggedInUserId,
  loggedInUsername,
}) {
  const [isValid, setIsValid] = useState(false);

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

    const newPost = {
      imageUrl: imageUri,
      caption: cameraRollCaption,
      user: loggedInUsername,
      owner_uid: auth.currentUser.uid,
      likes: 0,
      likes_by_users: [],
      comments: [],
    };

    let postsRef = usersPosts;
    usersPosts.push(newPost);

    const postPayload = {
      postsArr: postsRef,
    };

    setDoc(docRef, postPayload).then(() => navigation.goBack());
    setImageUri(null);
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
        style={{ color: isValid ? "blue" : "red" }}
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
