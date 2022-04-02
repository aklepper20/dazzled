import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";

const Post = ({ image, user, caption }) => {
  return (
    <ScrollView contextSize={(100, 100)} style={styles.container}></ScrollView>
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
});
