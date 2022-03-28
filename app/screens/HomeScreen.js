import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect } from "react";
import Header from "../components/Header";
import Post from "../components/Post";
import BottomTabs from "../components/BottomTabs";
import { bottomTabIcons } from "../components/BottomTabs";
import { db } from "../../firebase";
import { getDocs, collectionGroup, doc, onSnapshot } from "firebase/firestore";
import { async } from "@firebase/util";
const HomeScreen = ({ navigation }) => {
  // await setDoc(doc(db, "users", authUser.user.uid),

  const fetchPosts = () => {
    // const postsRef = collectionGroup(db, "posts");
    // let allPosts = await getDocs(postsRef);
    // console.log(allPosts);
  };

  useEffect(() => {
    // collectionGroup(db, "posts").onSnapshot((snap) => {
    //   console.log(snap.docs.map((doc) => doc.data()));
    // });
    const newPost = onSnapshot(collectionGroup(db, "posts"), (snapshot) => {
      console.log(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return newPost;
  }, []);

  const posts = [
    {
      name: "aly",
      image:
        "https://images.pexels.com/photos/87611/sun-fireball-solar-flare-sunlight-87611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      username: "bait",
      likes: 94,
      caption: "wow love code",
      comments: [
        {
          user: "sam",
          comment: "wow this is cool",
        },
        {
          user: "ron",
          comment: "sickkkkkk",
        },
      ],
    },
    {
      name: "aly",
      image:
        "https://images.pexels.com/photos/87611/sun-fireball-solar-flare-sunlight-87611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      username: "bait",
      likes: 64,
      caption: "yes bitch lets fucking go",
      comments: [
        {
          user: "bob",
          comment: "its working",
        },
      ],
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} navigation={navigation} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#041f37",
    flex: 1,
  },
});
