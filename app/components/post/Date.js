import { StyleSheet, Text, View } from "react-native";

import React from "react";
import colors from "../../config/colors";

const Date = ({ post }) => (
  <View style={styles.container}>
    <Text style={styles.date}>
      {post?.timestamp?.toDate().toLocaleString().slice(0, 9)}
    </Text>
  </View>
);

export default Date;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginLeft: 18,
  },
  date: {
    color: colors.lightgrey,
    fontWeight: "300",
    fontSize: 12,
  },
});
