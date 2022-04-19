import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import ModalOpen from "./ModalOpen";
import auth from "../../../firebase";
import { db } from "../../../firebase";
import {
  arrayRemove,
  arrayUnion,
  updateDoc,
  doc,
  collection,
} from "firebase/firestore";

const PostFooter = ({ post }) => {
  const [visible, setVisible] = useState(false);

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
    <>
      <ModalOpen
        post={post}
        visible={visible}
        setVisible={setVisible}
      ></ModalOpen>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Text style={styles.footerText}>
              {post.likes_by_users.length} likes
            </Text>
          </TouchableOpacity>
        </Text>
        <TouchableOpacity
          accessible={true}
          accessibilityLabel="Like Post!"
          onPress={() => handleLike({ post })}
        >
          <Image
            style={styles.footerIcon}
            source={
              post.likes_by_users.includes(auth.currentUser.email)
                ? require("../../assets/filledHeart.png")
                : require("../../assets/unfilledHeart.png")
            }
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
export default PostFooter;

const styles = StyleSheet.create({
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
});
