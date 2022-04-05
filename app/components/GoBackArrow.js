import { StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

const GoBackArrow = () => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        style={styles.imageBack}
        source={{
          uri: "https://img.icons8.com/ios-glyphs/90/ffffff/back.png",
        }}
      />
    </TouchableOpacity>
  );
};

export default GoBackArrow;

const styles = StyleSheet.create({});
