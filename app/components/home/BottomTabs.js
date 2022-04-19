import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import colors from "../../config/colors";

import { useNavigation } from "@react-navigation/native";

export const bottomTabIcons = [
  {
    name: "Home",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png",
  },
  {
    name: "Add Post",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/add.png",
  },
  {
    name: "Profile",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/profile.png",
  },
];

const BottomTabs = ({ icons }) => {
  const navigation = useNavigation();

  const handlePress = (icon) => {
    if (icon.name === "HomeScreen") {
      navigation.navigate("HomeScreen");
    }
    if (icon.name === "Add Post") {
      navigation.navigate("PostEditScreen");
    }
    if (icon.name === "Profile") {
      navigation.navigate("ProfileScreen");
    }
  };

  const Icon = ({ icon }) => (
    <TouchableOpacity
      accessible={true}
      accessibilityLabel="Go to Page"
      onPress={() => handlePress(icon)}
    >
      <Image source={{ uri: icon.inactive }} style={styles.icon} />
    </TouchableOpacity>
  );
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: "3%",
    zIndex: 999,
    backgroundColor: colors.primary,
  },
  container: {
    borderColor: "grey",
    borderTopWidth: 1,
    height: 50,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  icon: {
    width: 30,
    height: 30,
  },
});
