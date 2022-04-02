import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Post from "../components/Post";
import BottomTabs from "../components/BottomTabs";
import { bottomTabIcons } from "../components/BottomTabs";
import { db } from "../../firebase";
import auth from "../../firebase";
import {
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [allPosts, setAllPosts] = useState([]);

  // const getUserPosts = async () => {
  // onSnapshot(collectionGroup(db, "users"), (snapshot) => {
  //     setAllPosts(snapshot.docs.map((doc) => doc.data()));
  //   });
  // };
  useEffect(() => {
    const docRef = query(
      collectionGroup(db, "posts"),
      orderBy("timestamp", "desc")
    );
    onSnapshot(docRef, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    // onSnapshot(collectionGroup(db, "posts"), (snapshot) => {
    //   setAllPosts(
    //     snapshot.docs.map((doc) => doc.data())
    //   );
    // });
  }, []);

  // console.log(auth.currentUser.email);
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView>
        {allPosts.map((post, index) => (
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
