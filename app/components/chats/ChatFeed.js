import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Pressable,
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

import { REACT_APP_API_KEY } from "../../../apiKey";

import Room from "./Room";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";

const ChatFeed = ({ navigation }) => {
  const [input, setInput] = useState("");
  const [rooms, setRooms] = useState([]);
  const [inputData, setInputData] = useState("");

  const URL = `https://pixabay.com/api/?key=${REACT_APP_API_KEY}&q=${input}&image_type=photo`;

  const getBackgroundImg = async () => {
    setInputData("");
    const req = await fetch(URL)
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

  const handleAddRoom = () => {
    Alert.prompt("Add New Chat Room", "Please enter a name", [
      { text: "CANCEL", onPress: null },
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

  const fetchRooms = async () => {
    try {
      const colRef = query(collection(db, "rooms"), orderBy("roomName", "asc"));
      onSnapshot(colRef, (snapshot) => {
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            roomName: doc.data().roomName,
            image: doc.data().image,
          }))
        );
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Pressable onPress={handleAddRoom}>
          <View style={styles.addRoom}>
            <MaterialCommunityIcons
              name="plus-circle"
              color={colors.black}
              size={42}
            />

            <Text style={styles.nameText}>Add</Text>
          </View>
        </Pressable>
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
    borderColor: colors.secondary,
    backgroundColor: colors.lightgrey,
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
    borderColor: colors.pink,
  },
  nameText: {
    color: colors.black,
  },
  plusIcon: {
    position: "absolute",
    top: -16,
    left: 32,
  },
});
