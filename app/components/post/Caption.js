import { StyleSheet, Text } from "react-native";
import React from "react";

const Caption = ({ post }) => (
  <Text style={styles.captionText}>
    <Text style={styles.captionUsername}>{post.user}</Text>{" "}
    <Text>{post.caption}</Text>
  </Text>
);

export default Caption;

const styles = StyleSheet.create({
  captionText: {
    color: "white",
    marginHorizontal: 15,
  },
  captionUsername: {
    fontWeight: "600",
  },
});
