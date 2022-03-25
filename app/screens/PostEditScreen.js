import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import AddNewPost from "../components/AddNewPost";

const PostEditScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <AddNewPost navigation={navigation} />
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
