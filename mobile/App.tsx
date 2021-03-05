import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./screens/Login/LoginScreen";
import { setupAxios } from "./config/axios";
import { persistor, store } from "./store/store";
// @ts-ignore
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import SignUpScreen from "./screens/SignUp/SignUpScreen";
import * as Notifications from "expo-notifications";
import { Alert, AppState, Platform, SafeAreaView } from "react-native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import BottomTabsNavigator from "./navigation/BottomTabsNavigator";
import appVersion from "./config/version";
import * as Updates from "expo-updates";
import { UpdateEventType } from "expo-updates";
import OverlayLoader from "./shared/components/OverlayLoader";

const RootStack = createStackNavigator();

setupAxios();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const App = () => {
  const [fetchingUpdate, setFetchingUpdate] = useState(appVersion !== "local");

  const handleAppStateChange = (nextState) => {
    if (nextState === "active") {
      checkUpdates();
    }
  };

  const checkUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        setFetchingUpdate(false);
        await Updates.reloadAsync();
      } else {
        setFetchingUpdate(false);
      }
    } catch (e) {
      Alert.alert("Błąd", e);
    }
  };

  useEffect(() => {
    checkUpdates();
    AppState.addEventListener("change", handleAppStateChange);

    const updateSub = Updates.addListener((event) => {
      if (event.type === UpdateEventType.UPDATE_AVAILABLE) {
        checkUpdates();
      } else {
        setFetchingUpdate(false);
      }
    });

    return () => {
      updateSub.remove();
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

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
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ActionSheetProvider>
              <NavigationContainer>
                {fetchingUpdate ? (
                  <OverlayLoader message={"Sprawdzanie aktualizacji..."} />
                ) : (
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
                      component={BottomTabsNavigator}
                      options={{ headerShown: false }}
                    />
                  </RootStack.Navigator>
                )}
              </NavigationContainer>
            </ActionSheetProvider>
          </PersistGate>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
