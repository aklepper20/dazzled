import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

const ProfileHeader = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assets/profileBackground.jpg")}
    >
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
    </ImageBackground>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {},
  background: {
    flex: 1,
    zIndex: -10,
    height: 280,
  },
  imageBack: {
    width: 30,
    height: 30,
    top: 50,
    left: 20,
    position: "absolute",
  },
});
