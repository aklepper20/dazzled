import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import PostUpload from "./PostUpload";

import { useNavigation } from "@react-navigation/native";

const AddNewPost = () => {
  return (
    <View style={styles.container}>
      <Header />
      <PostUpload />
    </View>
  );
};

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="Back to Homescreen"
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.imageBack}
          source={{
            uri: "https://img.icons8.com/ios-glyphs/90/ffffff/back.png",
          }}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>Add an image</Text>
      <Text></Text>
    </View>
  );
};

export default AddNewPost;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageBack: {
    width: 30,
    height: 30,
  },
  headerText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
    marginRight: 27,
  },
});
