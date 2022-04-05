import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";

const ImageDetailsScreen = ({ route, navigation }) => {
  const post = route.params;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.imageBack}
            source={{
              uri: "https://img.icons8.com/ios-glyphs/90/ffffff/back.png",
            }}
          />
        </TouchableOpacity>
        <View style={styles.postContainer}>
          <Text style={styles.caption}>{post.caption}</Text>
          <Image style={styles.postImage} source={{ uri: post.imageUrl }} />
          <View style={styles.userContainer}>
            <Text style={styles.userText}>{post.user}</Text>
            <Text style={styles.userText}>
              {" "}
              {post?.timestamp?.toDate().toLocaleString()}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ImageDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#041f37",
    flex: 1,
  },
  caption: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 30,
    fontWeight: "500",
    color: "white",
  },
  imageBack: {
    width: 30,
    height: 30,
    top: 50,
    left: 20,
    position: "absolute",
    color: "white",
  },
  postImage: {
    height: 400,
    resizeMode: "cover",
  },
  postContainer: {
    marginTop: 80,
  },
  text: {
    fontSize: 30,
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  userText: {
    color: "lightgrey",
  },
});
