import { StyleSheet, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import UserInfo from "./UserInfo";
import Post from "./Post";

import { db } from "../../../firebase";
import auth from "../../../firebase";
import { doc, onSnapshot, collection } from "firebase/firestore";

const Profile = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);

  const getPosts = () => {
    const docRef = doc(db, "users", auth.currentUser.email);

    onSnapshot(collection(docRef, "posts"), (snapshot) => {
      setUserPosts(snapshot.docs.map((doc) => doc.data()));
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View style={styles.container}>
      <UserInfo posts={userPosts} />
      <FlatList
        numColumns={3}
        style={styles.postContainer}
        data={userPosts}
        keyExtractor={(post, i) => i.toString()}
        renderItem={({ item }) => (
          <Post
            caption={item.caption}
            image={item.imageUrl}
            likes={item.likes_by_users}
            timestamp={item.timestamp}
            user={item.user}
            onPress={() => navigation.navigate("ImageDetailsScreen", item)}
            navigation={navigation}
          />
        )}
      >
        ))
      </FlatList>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#041f37",
    zIndex: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  postContainer: {
    marginTop: 130,
    marginHorizontal: 18,
  },
});
