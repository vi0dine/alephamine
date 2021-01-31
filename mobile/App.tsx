import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/Login/LoginScreen";
import { setupAxios } from "./config/axios";
import { persistor, store } from "./store/store";
// @ts-ignore
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import HomeScreen from "./screens/Home/HomeScreen";
import WatchedScreen from "./screens/Watched/WatchedScreen";
import SettingsScreen from "./screens/Settings/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import SignUpScreen from "./screens/SignUp/SignUpScreen";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const RootStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const AppMainScreens = () => {
  return (
    <Tabs.Navigator
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

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#4c0982",
        inactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen name="Szukaj" component={HomeScreen} />
      <Tabs.Screen name="Obserwowane" component={WatchedScreen} />
      <Tabs.Screen name="Ustawienia" component={SettingsScreen} />
    </Tabs.Navigator>
  );
};

setupAxios();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const App = () => {
  useEffect(() => {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootStack.Navigator initialRouteName={"Login"}>
            <RootStack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="Main"
              component={AppMainScreens}
              options={{ headerShown: false }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
