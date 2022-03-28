import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";

const Post = ({ post }) => {
  const [viewComments, setViewComments] = useState(false);
  return (
    <View style={styles.container}>
      <PostHeader post={post} />
      <PostImage post={post} />
      <PostFooter post={post} />
      <Caption post={post} />
      <CommentsSection post={post} />
      <Comments post={post} />
    </View>
  );
};

const PostHeader = ({ post }) => (
  <TouchableWithoutFeedback>
    <View style={styles.headerContainer}>
      <View style={styles.headerInfo}>
        <Image style={styles.headerImg} source={{ uri: post.image }} />
        <Text style={styles.headerText}>{post.username}</Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

const PostImage = ({ post }) => (
  <View style={styles.postImageContainer}>
    <Image style={styles.postImage} source={{ uri: post.image }} />
  </View>
);

const PostFooter = ({ post }) => (
  <View style={styles.footerContainer}>
    <Text style={styles.footerText}>{post.likes} likes</Text>
    <TouchableOpacity>
      <Image
        style={styles.footerIcon}
        source={require("../assets/unfilledHeart.png")}
        onPress={() => setViewComments(!viewComments)}
      />
    </TouchableOpacity>
  </View>
);

const Caption = ({ post }) => (
  <Text style={styles.captionText}>
    <Text style={styles.captionUsername}>{post.username}</Text>{" "}
    <Text>{post.caption}</Text>
  </Text>
);

const CommentsSection = ({ post }) => (
  <View>
    {!!post.comments.length && (
      <TouchableOpacity>
        <Text style={styles.comment}>
          View {post.comments.length > 1 ? " all " : ""} {post.comments.length}{" "}
          {post.comments.length > 1 ? "comments" : "comment"}
        </Text>
      </TouchableOpacity>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <Text style={styles.commentContainer} key={index}>
        <Text style={styles.footerText}>
          <Text style={styles.captionUsername}>{comment.user}</Text>{" "}
          {comment.comment}
        </Text>
      </Text>
    ))}
  </>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    alignItems: "center",
  },
  headerImg: {
    width: 70,
    height: 70,
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
  },
  postImage: {
    height: "100%",
    resizeMode: "cover",
  },
  postImageContainer: {
    width: "100%",
    height: 400,
  },
  footerIcon: {
    width: 33,
    height: 33,
    backgroundColor: "white",
    borderRadius: 10,
  },
  footerContainer: {
    marginHorizontal: 15,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 15,
    color: "white",
  },
  captionText: {
    color: "white",
    marginHorizontal: 15,
  },
  captionUsername: {
    fontWeight: "600",
  },
  comment: {
    color: "grey",
    marginTop: 5,
    marginHorizontal: 15,
  },
  commentContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 5,
  },
});

export default Post;