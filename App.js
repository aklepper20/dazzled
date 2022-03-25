import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import HomeScreen from "./app/screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PostEditScreen from "./app/screens/PostEditScreen";

export default function App() {
  return <PostEditScreen />;
}

const styles = StyleSheet.create({});
