import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import Room from "./Room";
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
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
  container: {
    marginBottom: 13,
  },
  room: {
    marginHorizontal: 6,
  },
});
