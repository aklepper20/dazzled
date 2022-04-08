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
    <>
      <View style={styles.unreadBadge}>
        <Text style={styles.unreadBadgeText}>11</Text>
      </View>
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
    </>
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
  unreadBadge: {
    backgroundColor: "#ff3250",
    width: 25,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    position: "absolute",
    left: 50,
    bottom: 20,
  },
  unreadBadgeText: {
    color: "white",
    fontWeight: "600",
  },
});
