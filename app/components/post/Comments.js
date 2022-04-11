import { Text, View, TextInput, Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";
import auth from "../../../firebase";
import { db } from "../../../firebase";
import {
  arrayRemove,
  arrayUnion,
  updateDoc,
  doc,
  collection,
} from "firebase/firestore";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { v4 as uuidv4 } from "uuid";
const SCREEN_WIDTH = Dimensions.get("window").width;
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
          id: uuidv4(),
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
        post.comments.map((comment) => {
          return (
            <Swipeable>
              <Text style={styles.commentContainer} key={comment.id}>
                <Text style={styles.footerText}>
                  <Text style={styles.captionUsername}>{comment.user}</Text>{" "}
                  {comment.comment}
                </Text>
              </Text>
            </Swipeable>
          );
        })}
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

export default Comments;

const styles = StyleSheet.create({
  captionUsername: {
    fontWeight: "600",
  },
  commentContainer: {
    flexDirection: "row",
    height: 15,
    width: SCREEN_WIDTH,
    marginHorizontal: 15,
    marginTop: 5,
  },
  commentInput: {
    backgroundColor: "transparent",
    height: 24,
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 5,
  },
  footerText: {
    fontSize: 15,
    color: "white",
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
});
