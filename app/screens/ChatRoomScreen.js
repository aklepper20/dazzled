import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import auth, { db } from "../../firebase";
import {
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import { Swipeable } from "react-native-gesture-handler";
import colors from "../config/colors";

const ChatRoomScreen = ({ route }) => {
  const [inputValue, setInputValue] = useState("");
  const [messagesArr, setMessagesArr] = useState([]);

  const scrollViewRef = useRef();

  const singleRoom = route.params;

  useEffect(() => {
    const docRef = doc(db, "rooms", singleRoom.id);
    const colRef = query(
      collection(docRef, "messages"),
      orderBy("timestamp", "asc")
    );
    const unSub = onSnapshot(colRef, (snapshot) => {
      setMessagesArr(snapshot.docs.map((doc) => doc.data()));
    });
    return () => {
      unSub();
    };
  }, [singleRoom.id]);

  const handleSubmit = () => {
    const docRef = doc(db, "rooms", singleRoom.id);
    const colRef = collection(docRef, "messages");

    addDoc(colRef, {
      message: inputValue,
      name: auth.currentUser.email,
      timestamp: serverTimestamp(),
    });
    setInputValue("");
  };

  const rightActions = (text) => {
    return (
      <Text style={styles.timestamp}>
        {text?.timestamp?.toDate().toLocaleString().slice(10, 22)}
      </Text>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.roomContainer}>
          <Text style={styles.nameText}>
            {singleRoom.roomName.toUpperCase()}
          </Text>
        </View>

        <ScrollView
          style={styles.chatContainer}
          alwaysBounceVertical={true}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          {messagesArr.map((text, i) => (
            <Swipeable key={i} renderRightActions={() => rightActions(text)}>
              <View
                style={
                  text.name === auth.currentUser.email
                    ? styles.chatReciever
                    : styles.chatMessage
                }
              >
                <Text
                  style={
                    text.name === auth.currentUser.email
                      ? styles.chatRecieverMessage
                      : styles.chatUser
                  }
                >
                  {text.name}
                </Text>
                <Text>{text.message}</Text>
              </View>
            </Swipeable>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Enter a message..."
            onChangeText={setInputValue}
            value={inputValue}
          />
          <Button
            title="Send"
            color={colors.pink}
            accessibilityLabel="Send message to the chat"
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
    backgroundColor: colors.pink,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  chatRecieverMessage: {
    display: "none",
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
    backgroundColor: colors.white,
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
    backgroundColor: colors.primary,
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 62,
    borderTopColor: colors.lightgrey,
    borderTopWidth: 1,
  },
  input: {
    borderRadius: 30,
    backgroundColor: colors.white,
    flex: 1,
    padding: 10,
    marginHorizontal: 7,
  },
  roomContainer: {
    borderBottomColor: colors.lightgrey,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  nameText: {
    fontSize: 34,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 10,
    color: colors.white,
  },
  timestamp: {
    color: colors.white,
    fontSize: 10,
    marginVertical: 23,
    paddingRight: 5,
  },
});
