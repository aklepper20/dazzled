import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import HomeScreen from "./app/screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NewPostButton from "./app/components/NewPostButton";

export default function App() {
  return <HomeScreen />;
}

const styles = StyleSheet.create({});
