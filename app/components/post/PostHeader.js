import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

const PostHeader = ({ post }) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.headerContainer}>
        <View style={styles.headerInfo}>
          <Image
            style={styles.headerImg}
            source={{ uri: post.owner_profile }}
          />
          <Text style={styles.headerText}>{post.user}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PostHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    alignItems: "center",
  },
  headerImg: {
    width: 45,
    height: 45,
    borderRadius: 40,
    marginLeft: 6,
    borderWidth: 1.5,
    borderColor: "#ff8501",
    marginTop: 10,
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "grey",
    borderTopWidth: 1,
    flex: 1,
  },
  headerText: {
    color: "white",
    marginLeft: 5,
    fontWeight: "700",
    paddingTop: 10,
  },
});
