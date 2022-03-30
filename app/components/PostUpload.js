import { StyleSheet, Text, View, Image, TextInput, Button } from "react-native";
import React, { useState, useEffect } from "react";

import * as Yup from "yup";
import { Formik } from "formik";
import validUrl from "valid-url";

import { db } from "../../firebase";
import auth from "../../firebase";
import { onSnapshot, doc, setDoc } from "firebase/firestore";
import ImageInput from "./ImageInput";

const PLACEHOLDER_IMG =
  "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("Please enter a URL."),
  caption: Yup.string().max(2200, "Caption has reached the character limit."),
});

const PostUpload = ({ navigation, usersPosts }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(auth.currentUser.email);
  const [imageUri, setImageUri] = useState(null);
  const [cameraRollCaption, setCameraRollCaption] = useState("");

  const getUsername = () => {
    const user = auth.currentUser.email;
    for (let i in user) {
      if (user[i] === "@") {
        setLoggedInUsername("@" + user.split(user[i])[0]);
      }
    }
  };
  useEffect(() => {
    getUsername();
  }, []);

  onSnapshot(doc(db, "users", `${auth.currentUser.email}`), (snapshot) => {
    let posts = snapshot
      .data()
      .postsArr.map((post, id) => ({ ...post, id: id }));
  });

  const addUserPost = async (caption, imageUrl) => {
    const docRef = doc(db, "users", loggedInUserId);

    const newPost = {
      imageUrl: imageUrl,
      caption: caption,
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
  };

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        addUserPost(values.caption, values.imageUrl);
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View style={styles.container}>
            <Image
              style={styles.placeholderImage}
              source={{
                uri: validUrl.isUri(thumbnailUrl)
                  ? thumbnailUrl
                  : PLACEHOLDER_IMG,
              }}
            />
            <View style={styles.captionContainer}>
              <TextInput
                style={styles.inputText}
                placeholder="Enter your caption..."
                placeholderTextColor="grey"
                multiline={true}
                onChangeText={handleChange("caption")}
                onBlue={handleBlur("caption")}
                value={values.caption}
              />
            </View>
          </View>

          <TextInput
            style={styles.inputText}
            placeholder="Enter image Url"
            placeholderTextColor="grey"
            onChangeText={handleChange("imageUrl")}
            onBlue={handleBlur("imageUrl")}
            value={values.imageUrl}
            autoCapitalize="none"
            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
          />
          {errors.imageUrl && (
            <Text style={{ fontSize: 10, color: "red" }}>
              {errors.imageUrl}
            </Text>
          )}
          <Button
            onPress={handleSubmit}
            title="Share Image URL"
            disabled={!isValid}
          ></Button>
          <ImageInput
            usersPosts={usersPosts}
            navigation={navigation}
            imageUri={imageUri}
            setImageUri={setImageUri}
            setCameraRollCaption={setCameraRollCaption}
            cameraRollCaption={cameraRollCaption}
            loggedInUserId={loggedInUserId}
            loggedInUsername={loggedInUsername}
          />
        </>
      )}
    </Formik>
  );
};

export default PostUpload;

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
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  inputText: {
    color: "white",
    fontSize: 20,
  },
});
