import { StyleSheet, View } from "react-native";
import React from "react";
import Profile from "../components/profile/Profile";
import ProfileHeader from "../components/profile/ProfileHeader";
import colors from "../config/colors";

const ProfileScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <ProfileHeader />
        <Profile />
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
