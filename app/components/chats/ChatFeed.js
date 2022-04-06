import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Room from "./Room";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export const USERS = [
  {
    name: "aly baez",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR39d2RW6dWiV3zzeBHJMYeYM6cn8zrB-YeAW8LuSLzHw&s",
  },
  {
    name: "sammmmmmmmmm baez",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR39d2RW6dWiV3zzeBHJMYeYM6cn8zrB-YeAW8LuSLzHw&s",
  },
  {
    name: "aly baez",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR39d2RW6dWiV3zzeBHJMYeYM6cn8zrB-YeAW8LuSLzHw&s",
  },
  {
    name: "sammmmmmmmmm baez",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR39d2RW6dWiV3zzeBHJMYeYM6cn8zrB-YeAW8LuSLzHw&s",
  },
  {
    name: "aly baez",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR39d2RW6dWiV3zzeBHJMYeYM6cn8zrB-YeAW8LuSLzHw&s",
  },
  {
    name: "sammmmmmmmmm baez",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR39d2RW6dWiV3zzeBHJMYeYM6cn8zrB-YeAW8LuSLzHw&s",
  },
  {
    name: "aly baez",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR39d2RW6dWiV3zzeBHJMYeYM6cn8zrB-YeAW8LuSLzHw&s",
  },
  {
    name: "sammmmmmmmmm baez",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR39d2RW6dWiV3zzeBHJMYeYM6cn8zrB-YeAW8LuSLzHw&s",
  },
];

const ChatFeed = ({ navigation }) => {
  const [input, setInput] = useState("");
  console.log(input);

  const handleAddRoom = () => {
    Alert.prompt("Add New Chat Room", "Please enter a name", (name) =>
      setInput(name)
    );
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
          <Text style={styles.name}>Add</Text>
        </View>

        {USERS.map((room, index) => (
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
  name: {
    color: "white",
  },
  plusIcon: {
    position: "absolute",
    top: -16,
    left: 32,
  },
});
