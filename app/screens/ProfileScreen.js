import { StyleSheet, View } from "react-native";
import React from "react";
import Profile from "../components/profile/Profile";
import ProfileHeader from "../components/profile/ProfileHeader";
import colors from "../config/colors";

const ProfileScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <ProfileHeader navigation={navigation} />
        <Profile navigation={navigation} />
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
