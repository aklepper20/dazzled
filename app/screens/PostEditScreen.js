import { StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import AddNewPost from "../components/AddNewPost";
import { db } from "../../firebase";
import auth from "../../firebase";
import { onSnapshot, doc } from "firebase/firestore";

const PostEditScreen = ({ navigation }) => {
  const [usersPosts, setUsersPosts] = useState([]);

  // const getUserPosts = async () => {
  //   onSnapshot(doc(db, "users", `${auth.currentUser.email}`), (snapshot) => {
  //     let posts = snapshot
  //       .data()
  //       .postsArr.map((post, id) => ({ ...post, id: id }));
  //     return setUsersPosts(posts);
  //   });
  // };

  // useEffect(() => {
  //   getUserPosts();
  // }, []);
  return (
    <SafeAreaView style={styles.container}>
      <AddNewPost navigation={navigation} usersPosts={usersPosts} />
    </SafeAreaView>
  );
};

export default PostEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#041f37",
  },
});
