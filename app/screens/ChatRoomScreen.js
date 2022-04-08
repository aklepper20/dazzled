import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
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

const ChatRoomScreen = ({ route, navigation }) => {
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
        {text?.timestamp?.toDate().toLocaleString().slice(10, 20)}
      </Text>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Image
            style={styles.imageBack}
            source={{
              uri: "https://img.icons8.com/ios-glyphs/90/ffffff/back.png",
            }}
          />
        </TouchableOpacity>
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
            <Swipeable renderRightActions={() => rightActions(text)}>
              <View
                style={
                  text.name === auth.currentUser.email
                    ? styles.chatReciever
                    : styles.chatMessage
                }
                key={i}
              >
                <Text style={styles.chatUser}>{text.name}</Text>
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
    color: "white",
    fontSize: 10,
    marginVertical: 23,
  },
});
