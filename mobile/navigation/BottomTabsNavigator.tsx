import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native-appearance";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/Home/HomeScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import React from "react";
import WatchedNavigator from "./WatchedNavigator";
import Colors from "../constants/Colors";

const BottomTabs = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  let colorScheme = useColorScheme();

  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Szukaj") {
            iconName = focused
              ? "ios-search-circle"
              : "ios-search-circle-outline";
          } else if (route.name === "Ustawienia") {
            iconName = focused ? "ios-cog" : "ios-cog-outline";
          } else if (route.name === "Obserwowane") {
            iconName = focused ? "ios-eye" : "ios-eye-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: Colors[colorScheme]["tint"],
        inactiveTintColor: `${Colors[colorScheme]["tint"]}5A`,
        activeBackgroundColor: Colors[colorScheme]["background"],
        inactiveBackgroundColor: Colors[colorScheme]["background"],
        style: {
          height: 48,
        },
      }}
    >
      <BottomTabs.Screen name="Szukaj" component={HomeScreen} />
      <BottomTabs.Screen name="Obserwowane" component={WatchedNavigator} />
      <BottomTabs.Screen name="Ustawienia" component={SettingsScreen} />
    </BottomTabs.Navigator>
  );
};

export default BottomTabsNavigator;
