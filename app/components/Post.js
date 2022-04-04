import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import auth from "../../firebase";
import { db } from "../../firebase";
import {
  arrayRemove,
  arrayUnion,
  updateDoc,
  doc,
  collection,
  setDoc,
} from "firebase/firestore";

const Post = ({ post }) => {
  const [viewComments, setViewComments] = useState(false);

  const handleLike = async ({ post }) => {
    const currentStatus = !post.likes_by_users.includes(auth.currentUser.email);
    try {
      const docRef = doc(db, "users", post.owner_email);
      const colRef = collection(docRef, "posts");
      const ref = doc(colRef, post.id);

      await updateDoc(ref, {
        likes_by_users: currentStatus
          ? arrayUnion(auth.currentUser.email)
          : arrayRemove(auth.currentUser.email),
      }).then(() => {
        console.log("Doc added successfully");
      });
    } catch (err) {
      console.error("Error updating: ", err);
    }
  };

  return (
    <View style={styles.container}>
      <PostHeader post={post} />
      <PostImage post={post} />
      <PostFooter post={post} handleLike={handleLike} />
      <Caption post={post} />
      <CommentsSection
        post={post}
        viewComments={viewComments}
        setViewComments={setViewComments}
      />
      <Comments post={post} viewComments={viewComments} />
      <Date post={post} />
    </View>
  );
};

const PostHeader = ({ post }) => (
  <TouchableWithoutFeedback>
    <View style={styles.headerContainer}>
      <View style={styles.headerInfo}>
        {/* <Image style={styles.headerImg} source={{ uri: post?.image }} /> */}
        <Text style={styles.headerText}>{post.user}</Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

const PostImage = ({ post }) => (
  <View style={styles.postImageContainer}>
    <Image style={styles.postImage} source={{ uri: post.imageUrl }} />
  </View>
);

const PostFooter = ({ post, handleLike }) => (
  <View style={styles.footerContainer}>
    <Text style={styles.footerText}>{post.likes_by_users.length} likes</Text>
    <TouchableOpacity onPress={() => handleLike({ post })}>
      <Image
        style={styles.footerIcon}
        source={
          post.likes_by_users.includes(auth.currentUser.email)
            ? require("../assets/filledHeart.png")
            : require("../assets/unfilledHeart.png")
        }
      />
    </TouchableOpacity>
  </View>
);

const Caption = ({ post }) => (
  <Text style={styles.captionText}>
    <Text style={styles.captionUsername}>{post.user}</Text>{" "}
    <Text>{post.caption}</Text>
  </Text>
);

const CommentsSection = ({ post, viewComments, setViewComments }) => {
  return (
    <View>
      {!!post.comments.length && (
        <TouchableOpacity onPress={() => setViewComments(!viewComments)}>
          <Text style={styles.comment}>
            View {post.comments.length > 1 ? " all " : ""}{" "}
            {post.comments.length}{" "}
            {post.comments.length > 1 ? "comments" : "comment"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const Comments = ({ post, viewComments }) => {
  const [comment, setComment] = useState("");

  const postComment = async () => {
    try {
      const docRef = doc(db, "users", post.owner_email);
      const colRef = collection(docRef, "posts");
      const ref = doc(colRef, post.id);

      await updateDoc(ref, {
        comments: arrayUnion({
          user: auth.currentUser.email,
          comment: comment,
        }),
      }).then(() => {
        console.log("Doc added successfully");
      });
    } catch (err) {
      console.error("Error updating: ", err);
    }
    setComment("");
  };
  return (
    <>
      {viewComments &&
        post.comments.map((comment, index) => (
          <Text style={styles.commentContainer} key={index}>
            <Text style={styles.footerText}>
              <Text style={styles.captionUsername}>{comment.user}</Text>{" "}
              {comment.comment}
            </Text>
          </Text>
        ))}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add a comment..."
          keyboardType="default"
          onChangeText={(text) => setComment(text)}
          value={comment}
          style={styles.commentInput}
        />
        <View style={styles.postIt}>
          <Text style={styles.postItText} onPress={postComment}>
            Post
          </Text>
        </View>
      </View>
    </>
  );
};

const Date = ({ post }) => (
  <Text>
    <Text style={styles.date}>
      {post?.timestamp?.toDate().toLocaleString()}
    </Text>
  </Text>
);

const styles = StyleSheet.create({
  commentInput: {
    backgroundColor: "transparent",
    height: 24,
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 5,
  },
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
  date: {
    color: "grey",
    fontWeight: "300",
    fontSize: 12,
  },
  postIt: {
    backgroundColor: "yellow",
    borderRadius: 20,
    height: 25,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  postItText: {
    fontWeight: "600",
  },
  inputContainer: {
    backgroundColor: "lightgray",
    height: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 8,
    borderRadius: 20,
  },
});

export default Post;
