import { StyleSheet, Text, View, Image, TextInput, Button } from "react-native";
import React, { useState } from "react";

import * as Yup from "yup";
import { Formik } from "formik";
import validUrl from "valid-url";

const PLACEHOLDER_IMG =
  "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("Please enter a URL."),
  caption: Yup.string().max(2200, "Caption has reached the character limit."),
});

const PostUpload = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        console.log(values);
        navigation.goBack();
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
            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
          />
          {errors.imageUrl && (
            <Text style={{ fontSize: 10, color: "red" }}>
              {errors.imageUrl}
            </Text>
          )}
          <Button
            onPress={handleSubmit}
            title="share"
            disabled={!isValid}
          ></Button>
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
  },
  inputText: {
    color: "white",
    fontSize: 20,
  },
});
