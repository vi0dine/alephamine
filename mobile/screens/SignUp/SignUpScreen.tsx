import React, { useEffect, useState } from "react";
import styles from "./SignUpScreen.stylesheet";
import {
  Image,
  Platform,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { loginUser, signUpUser } from "../../store/User/User.actions";
import { useAssets } from "expo-asset";
import AppLoadingPlaceholder from "expo/build/launch/AppLoadingPlaceholder";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

const SignUpScreen: React.FunctionComponent = () => {
  const [assets] = useAssets([require("../../assets/logo.png")]);
  const { handleSubmit, errors, control } = useForm();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setToken(token));
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        ToastAndroid.show("Nie udzielono uprawnień!", ToastAndroid.LONG);
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  const onSubmit = (values) => {
    if (values?.email?.length && values?.password?.length && token?.length) {
      dispatch(signUpUser(values.email, values.password, token, navigation));
    }
  };

  if (!assets) {
    return <AppLoadingPlaceholder />;
  }

  return (
    <View style={styles.form}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
      </View>
      <View>
        <Text style={styles.label}>Email</Text>
        <Controller
          name={"email"}
          control={control}
          render={(props) => (
            <TextInput
              {...props}
              style={styles.input}
              onChangeText={(val) => props.onChange(val)}
            />
          )}
        />
      </View>
      <View>
        <Text style={styles.label}>Hasło</Text>
        <Controller
          name={"password"}
          control={control}
          render={(props) => (
            <TextInput
              {...props}
              secureTextEntry={true}
              style={styles.input}
              onChangeText={(val) => props.onChange(val)}
            />
          )}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Załóż konto</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Wróć do logowania</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;
