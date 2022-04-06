import { StyleSheet, View, Image } from "react-native";
import React from "react";

const PostImage = ({ post }) => (
  <View style={styles.postImageContainer}>
    <Image style={styles.postImage} source={{ uri: post.imageUrl }} />
  </View>
);

export default PostImage;

const styles = StyleSheet.create({
  postImage: {
    height: "100%",
    resizeMode: "cover",
  },
  postImageContainer: {
    width: "100%",
    height: 400,
  },
});
