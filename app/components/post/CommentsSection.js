import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
const CommentsSection = ({
  post,
  viewComments,
  setViewComments,
  commentStatus,
}) => {
  return (
    <View>
      {!!post.comments.length && (
        <TouchableOpacity onPress={() => setViewComments(!viewComments)}>
          <Text style={styles.comment}>
            {commentStatus} {post.comments.length > 1 ? " all " : ""}{" "}
            {post.comments.length}{" "}
            {post.comments.length > 1 ? "comments" : "comment"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CommentsSection;

const styles = StyleSheet.create({
  comment: {
    color: "grey",
    marginTop: 5,
    marginHorizontal: 15,
  },
});
