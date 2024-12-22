import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Team from "../Screens/Team";
import Home from "../Screens/Home";
import Login from "../auth/Login";
import Regester from "../auth/Regester";
import Bitch from "../Screens/Bitch";
import PLayers from "../Screens/PLayers";
import Classement from "../Screens/Classement";
import SplashScreen from "../auth/SplashScreen";
import Transfer from "../Screens/Transfer";
import Players2 from "../Screens/Players2";
import Points from "../Screens/Points";

const Navigate = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Regestration"
          component={Regester}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="App"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Bitch"
          component={Bitch}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PLayers"
          component={PLayers}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Classement"
          component={Classement}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Transfer"
          component={Transfer}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Players2"
          component={Players2}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Points"
          component={Points}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Team") {
            iconName = focused ? "tshirt-crew" : "tshirt-crew-outline";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Team"
        component={Team}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default Navigate;

const styles = StyleSheet.create({});
