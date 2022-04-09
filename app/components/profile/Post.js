import { StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

const Post = ({ image, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={styles.image} source={{ uri: image }} />
    </TouchableOpacity>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,

    margin: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
