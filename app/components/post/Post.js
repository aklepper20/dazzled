import { StyleSheet, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";

import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostFooter from "./PostFooter";
import Caption from "./Caption";
import CommentsSection from "./CommentsSection";
import Comments from "./Comments";
import Date from "./Date";

const Post = ({ post }) => {
  const [viewComments, setViewComments] = useState(false);
  const [commentStatus, setCommentStatus] = useState("View");

  useEffect(() => {
    if (viewComments) {
      setCommentStatus("Close");
    } else {
      setCommentStatus("View");
    }
  }, [viewComments]);

  return (
    <View style={styles.container}>
      <PostHeader post={post} />
      <PostImage post={post} />
      <PostFooter post={post} />
      <Caption post={post} />
      <CommentsSection
        post={post}
        viewComments={viewComments}
        setViewComments={setViewComments}
        commentStatus={commentStatus}
      />
      <Comments post={post} viewComments={viewComments} />
      <Date post={post} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },

  deleteBox: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    paddingHorizontal: 4,
  },
});

export default Post;
