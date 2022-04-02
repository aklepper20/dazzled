import { StyleSheet, View } from "react-native";
import React from "react";
import Profile from "../components/profile/Profile";
import ProfileHeader from "../components/profile/ProfileHeader";

const ProfileScreen = ({ navigation, usersPosts }) => {
  return (
    <>
      <View style={styles.container}>
        <ProfileHeader navigation={navigation} />
        <Profile />
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#041f37",
  },
});
