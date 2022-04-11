import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/home/Header";
import Post from "../components/post/Post";
import BottomTabs from "../components/home/BottomTabs";
import ChatFeed from "../components/chats/ChatFeed";
import { bottomTabIcons } from "../components/home/BottomTabs";
import { db } from "../../firebase";
import {
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    setLoading(true);
    try {
      const docRef = query(
        collectionGroup(db, "posts"),
        orderBy("timestamp", "desc")
      );
      onSnapshot(docRef, (snapshot) => {
        setAllPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ChatFeed navigation={navigation} />
      <ActivityIndicator animating={loading} size="large" />
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
