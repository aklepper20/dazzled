import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import React from "react";

const ChatRoomScreen = ({ route, navigation }) => {
  const singleRoom = route.params;
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
        <View style={styles.roomContainer}>
          <Text style={styles.nameText}>{singleRoom.name.toUpperCase()}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#041f37",
    flex: 1,
  },
  roomContainer: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  imageBack: {
    width: 30,
    height: 30,
    top: 10,
    left: 20,
    position: "absolute",
    color: "white",
  },
  nameText: {
    fontSize: 34,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 10,
  },
});
