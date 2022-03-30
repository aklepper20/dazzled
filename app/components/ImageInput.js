import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
  Text,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

function ImageInput({
  imageUri,
  setImageUri,
  cameraRollCaption,
  setCameraRollCaption,
}) {
  //   const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library.");
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
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
