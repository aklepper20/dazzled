import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import Profile from "../components/profile/Profile";

const ProfileScreen = ({ navigation, usersPosts }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Profile navigation={navigation} usersPosts={usersPosts} />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#041f37",
  },
});
