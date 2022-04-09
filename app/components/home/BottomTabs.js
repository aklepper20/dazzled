import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

export const bottomTabIcons = [
  {
    name: "Home",
    active: "https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png",
  },
  {
    name: "Add Post",
    active: "https://img.icons8.com/fluency-systems-filled/144/ffffff/add.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/add.png",
  },
  {
    name: "Profile",
    active:
      "https://img.icons8.com/fluency-systems-filled/144/ffffff/profile.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/profile.png",
  },
];

const BottomTabs = ({ icons, navigation }) => {
  const [activeTab, setActiveTab] = useState("Home");

  const handlePress = (icon) => {
    setActiveTab(icon.name);

    if (icon.name === "Add Post") {
      navigation.navigate("PostEditScreen");
    }
    if (icon.name === "Profile") {
      navigation.navigate("ProfileScreen");
    }
    if (icon.name === "Home") {
      navigation.navigate("HomeScreen");
    }
  };

  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => handlePress(icon)}>
      <Image
        source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }}
        style={styles.icon}
      />
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
    backgroundColor: "#041f37",
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
