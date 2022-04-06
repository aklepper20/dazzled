import { StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import AddNewPost from "../components/postEdit/AddNewPost";

const PostEditScreen = ({ navigation }) => {
  const [usersPosts, setUsersPosts] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <AddNewPost navigation={navigation} usersPosts={usersPosts} />
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
