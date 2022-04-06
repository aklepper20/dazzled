import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";

const ChatRoomScreen = ({ route, navigation }) => {
  const [inputValue, setInputValue] = useState("");

  const singleRoom = route.params;

  const handleSubmit = () => {
    console.log("hi you typed", inputValue);
  };

  const messages = [
    {
      chat: "hey whats going on",
      user: "@sam",
      timestamp: "4pm",
    },
    {
      chat: "hi im good",
      user: "@alybaez",
      timestamp: "4pm",
    },
    {
      chat: "its wednesday my dudes",
      user: "@scouttyBOI",
      timestamp: "4pm",
    },
  ];
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
        <View style={styles.chatContainer}>
          {messages.map((text, i) => (
            <View
              style={true ? styles.chatReciever : styles.chatMessage}
              key={i}
            >
              <Text style={styles.chatUser}>{text.user}</Text>
              <View style={styles.timestampContainer}>
                <Text>{text.chat}</Text>
                <Text style={styles.timestamp}>{text.timestamp}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.footer}>
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Enter a message..."
            onChangeText={setInputValue}
          />
          <Button
            title="Send"
            color="green"
            accessibilityLabel="Send message to the chat"
            value={inputValue}
            onPress={handleSubmit}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
  },
  chatMessage: {
    position: "relative",
    fontSize: 16,
    paddingHorizontal: 14,
    marginHorizontal: 30,
    marginBottom: 20,
    paddingVertical: 8,
    marginVertical: 15,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  chatReciever: {
    position: "relative",
    fontSize: 16,
    paddingHorizontal: 14,
    marginHorizontal: 30,
    marginBottom: 20,
    paddingVertical: 8,
    marginVertical: 15,
    alignSelf: "flex-end",
    backgroundColor: "skyblue",
    borderRadius: 20,
  },
  chatUser: {
    position: "absolute",
    top: -15,
    left: 10,
    fontWeight: "600",
    fontSize: 12,
    color: "white",
  },
  container: {
    backgroundColor: "#041f37",
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 62,
    borderTopColor: "lightgray",
    borderTopWidth: 1,
  },
  input: {
    borderRadius: 30,
    backgroundColor: "white",
    flex: 1,
    padding: 10,
    marginHorizontal: 7,
  },
  roomContainer: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginVertical: 10,
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
    color: "white",
  },
  timestamp: {
    marginLeft: 10,
    fontSize: 10,
  },
  timestampContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
