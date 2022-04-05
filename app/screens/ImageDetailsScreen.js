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
  // image, user, caption, timestamp, likes,

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.imageBack}
          source={{
            uri: "https://img.icons8.com/ios-glyphs/90/ffffff/back.png",
          }}
        />
      </TouchableOpacity>

      <Image style={styles.postImage} source={{ uri: post.image }} />
      <Text style={styles.text}>{post.caption}</Text>
    </SafeAreaView>
  );
};

export default ImageDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#041f37",
    flex: 1,
  },
  imageBack: {
    width: 30,
    height: 30,
    top: 50,
    left: 20,
    position: "absolute",
  },
  postImage: {
    height: "100%",
    resizeMode: "cover",
  },
  text: {
    fontSize: 30,
  },
});
