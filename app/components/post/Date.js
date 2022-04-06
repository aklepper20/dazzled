import { StyleSheet, Text } from "react-native";

import React from "react";

const Date = ({ post }) => (
  <Text>
    <Text style={styles.date}>
      {post?.timestamp?.toDate().toLocaleString()}
    </Text>
  </Text>
);

export default Date;

const styles = StyleSheet.create({
  date: {
    color: "grey",
    fontWeight: "300",
    fontSize: 12,
  },
});
