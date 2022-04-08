import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";

const Room = ({ room, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: room.image }} />
        <Text style={styles.name}>
          {room.roomName?.length > 11
            ? room.roomName?.slice(0, 7).toLowerCase() + "..."
            : room.roomName?.toLowerCase()}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Room;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 5,
  },
  image: {
    width: 70,
    height: 90,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
  name: {
    color: "white",
  },
});
