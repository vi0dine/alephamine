import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActiveScreen from "../screens/Watched/tabs/ActiveScreen/ActiveScreen";
import DismissedScreen from "../screens/Watched/tabs/DismissedScreen/DismissedScreen";
import Colors from "../constants/Colors";
import useColorScheme from "../shared/hooks/useColorScheme";

const Watched = createMaterialTopTabNavigator();

const WatchedNavigator = () => {
  const theme = useColorScheme();
  return (
    <Watched.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 10 },
        activeTintColor: Colors[theme].tint,
        inactiveTintColor: `${Colors[theme].tint}4A`,
        indicatorStyle: {
          backgroundColor: Colors[theme].tint,
        },
        indicatorContainerStyle: {
          backgroundColor: Colors[theme].background,
        },
      }}
    >
      <Watched.Screen name="Aktywne" children={() => <ActiveScreen />} />
      <Watched.Screen name="Wyłączone" children={() => <DismissedScreen />} />
    </Watched.Navigator>
  );
};

export default WatchedNavigator;
