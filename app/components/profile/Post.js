import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const Post = ({ image, user, caption, timestamp, likes }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
    </TouchableOpacity>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    backgroundColor: "blue",
    margin: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
