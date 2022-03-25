import React from "react";
import HomeScreen from "./HomeScreen";
import PostEditScreen from "./PostEditScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./LoginScreen";

const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false,
};
const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={screenOptions}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PostEditScreen" component={PostEditScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default SignedInStack;
