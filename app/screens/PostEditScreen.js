import { StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import AddNewPost from "../components/postEdit/AddNewPost";

const PostEditScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AddNewPost />
    </SafeAreaView>
  );
};

export default PostEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#041f37",
  },
});
