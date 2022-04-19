import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import UserInfo from "./UserInfo";
import Post from "./Post";

import { useNavigation } from "@react-navigation/native";

import { db } from "../../../firebase";
import auth from "../../../firebase";
import { doc, onSnapshot, collection } from "firebase/firestore";
import colors from "../../config/colors";

const Profile = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const getPosts = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "users", auth.currentUser.email);

      onSnapshot(collection(docRef, "posts"), (snapshot) => {
        setUserPosts(snapshot.docs.map((doc) => doc.data()));
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
    <View style={styles.container}>
      <UserInfo posts={userPosts} />
      <ActivityIndicator animating={loading} size="large" />
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
            accessible={true}
            accessibilityLabel="Image Details Screen!"
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
    backgroundColor: colors.primary,
    zIndex: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  postContainer: {
    marginTop: 130,
    marginHorizontal: 18,
  },
});
