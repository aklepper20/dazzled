import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import ProfileHeader from "./ProfileHeader";

import { db } from "../../../firebase";
import auth from "../../../firebase";

import { doc, onSnapshot, collection } from "firebase/firestore";

const Profile = () => {
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

  const POSTS = [
    {
      caption: "Beautiful",
      comments: [],
      imageUrl:
        "file:///Users/alybaez/Library/Developer/CoreSimulator/Devices/7F0CE905-6E91-4459-A707-4EF1BFCEC518/data/Containers/Data/Application/C7878476-EDF1-4C73-A8B0-4A59D4FD09CB/Library/Caches/ExponentExperienceData/%2540anonymous%252Fdazzled-fb668737-d1f8-4fb2-b2ce-4d1d322bc93e/ImagePicker/82C7A0BE-9B79-4E56-A651-7ED417E5B6FA.jpg",
      likes_by_users: ["ellen@gmail.com", "nugget@gmail.com"],
      owner_email: "snack@yahoo.com",
      owner_uid: "kXDFcXsGUXZLh5jDNOGy7gmOcSq2",
      timestamp: "March 31, 2022 at 5:51:53 PM UTC-7",
      user: "@snack",
    },
    {
      caption: "Beautiful",
      comments: [],
      imageUrl:
        "file:///Users/alybaez/Library/Developer/CoreSimulator/Devices/7F0CE905-6E91-4459-A707-4EF1BFCEC518/data/Containers/Data/Application/C7878476-EDF1-4C73-A8B0-4A59D4FD09CB/Library/Caches/ExponentExperienceData/%2540anonymous%252Fdazzled-fb668737-d1f8-4fb2-b2ce-4d1d322bc93e/ImagePicker/82C7A0BE-9B79-4E56-A651-7ED417E5B6FA.jpg",
      likes_by_users: ["ellen@gmail.com", "nugget@gmail.com"],
      owner_email: "snack@yahoo.com",
      owner_uid: "kXDFcXsGUXZLh5jDNOGy7gmOcSq2",
      timestamp: "March 31, 2022 at 5:51:53 PM UTC-7",
      user: "@snack",
    },
    {
      caption: "Beautiful",
      comments: [],
      imageUrl:
        "file:///Users/alybaez/Library/Developer/CoreSimulator/Devices/7F0CE905-6E91-4459-A707-4EF1BFCEC518/data/Containers/Data/Application/C7878476-EDF1-4C73-A8B0-4A59D4FD09CB/Library/Caches/ExponentExperienceData/%2540anonymous%252Fdazzled-fb668737-d1f8-4fb2-b2ce-4d1d322bc93e/ImagePicker/82C7A0BE-9B79-4E56-A651-7ED417E5B6FA.jpg",
      likes_by_users: ["ellen@gmail.com", "nugget@gmail.com"],
      owner_email: "snack@yahoo.com",
      owner_uid: "kXDFcXsGUXZLh5jDNOGy7gmOcSq2",
      timestamp: "March 31, 2022 at 5:51:53 PM UTC-7",
      user: "@snack",
    },
    {
      caption: "Beautiful",
      comments: [],
      imageUrl:
        "file:///Users/alybaez/Library/Developer/CoreSimulator/Devices/7F0CE905-6E91-4459-A707-4EF1BFCEC518/data/Containers/Data/Application/C7878476-EDF1-4C73-A8B0-4A59D4FD09CB/Library/Caches/ExponentExperienceData/%2540anonymous%252Fdazzled-fb668737-d1f8-4fb2-b2ce-4d1d322bc93e/ImagePicker/82C7A0BE-9B79-4E56-A651-7ED417E5B6FA.jpg",
      likes_by_users: ["ellen@gmail.com", "nugget@gmail.com"],
      owner_email: "snack@yahoo.com",
      owner_uid: "kXDFcXsGUXZLh5jDNOGy7gmOcSq2",
      timestamp: "March 31, 2022 at 5:51:53 PM UTC-7",
      user: "@snack",
    },
  ];

  return (
    <View>
      <ProfileHeader />
      <Text>HI</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
