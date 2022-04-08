import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";

import { db } from "../../../firebase";
import {
  onSnapshot,
  collection,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import auth from "../../../firebase";

import Room from "./Room";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BackgroundImage } from "react-native-elements/dist/config";

const API_KEY = "26600952-5557394967915b0df995251f6";

const ChatFeed = ({ navigation }) => {
  const [input, setInput] = useState("");
  const [rooms, setRooms] = useState([]);
  const [inputData, setInputData] = useState("");
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${input}&image_type=photo`;

  const getBackgroundImg = async () => {
    setInputData("");

    const req = await fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${input}&image_type=photo`
    )
      .then((response) => response.json())
      .then((data) => {
        setInputData(data.hits[0].largeImageURL);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getBackgroundImg();
  }, [input]);

  //   const docRef = doc(db, "rooms", singleRoom.id);
  //   const colRef = query(
  //     collection(docRef, "messages"),
  //     orderBy("timestamp", "asc")
  //   );
  //   const unSub = onSnapshot(colRef, (snapshot) => {
  //     setMessagesArr(snapshot.docs.map((doc) => doc.data()));
  //   });

  useEffect(() => {
    const colRef = query(collection(db, "rooms"), orderBy("roomName", "asc"));

    const unsub = onSnapshot(colRef, (snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          roomName: doc.data().roomName,
          image: doc.data().image,
        }))
      );
    });

    return () => {
      unsub();
    };
  }, []);

  const handleAddRoom = () => {
    Alert.prompt("Add New Chat Room", "Please enter a name", [
      { text: "CANCEL", onPress: console.log("Canceled") },
      { text: "OK", onPress: (text) => setInput(text) },
    ]);

    if (input) {
      const colRef = collection(db, "rooms");
      addDoc(colRef, {
        image: inputData,
        roomName: input,
      });
    }
    setInput("");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.addRoom}>
          <TouchableOpacity onPress={handleAddRoom}>
            <MaterialCommunityIcons
              name="plus-circle"
              color="black"
              size={42}
            />
          </TouchableOpacity>
          <Text style={styles.nameText}>Add</Text>
        </View>

        {rooms.map((room, index) => (
          <View key={index} style={styles.room}>
            <Room
              room={room}
              onPress={() => navigation.navigate("ChatRoomScreen", room)}
              navigation={navigation}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ChatFeed;

const styles = StyleSheet.create({
  addRoom: {
    width: 70,
    height: 90,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "green",
    backgroundColor: "grey",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginBottom: 13,
  },
  room: {
    marginHorizontal: 6,
  },

  image: {
    width: 70,
    height: 90,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
  nameText: {
    color: "white",
  },
  plusIcon: {
    position: "absolute",
    top: -16,
    left: 32,
  },
});
