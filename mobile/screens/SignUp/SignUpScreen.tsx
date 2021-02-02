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
import shared from "../../shared/shared.styles";
import { useColorScheme } from "react-native-appearance";
import { LinearGradient } from "expo-linear-gradient";

const SignUpScreen: React.FunctionComponent = () => {
  const [assets] = useAssets([require("../../assets/logo.png")]);
  let colorScheme = useColorScheme();
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
    <LinearGradient
      colors={
        colorScheme === "dark"
          ? ["#1F0039", "#271c7f", "#3c0076"]
          : ["#544fff", "#ff9ce7", "#c55aff"]
      }
      start={[0.0, 1.0]}
      end={[1.0, 0.4]}
      style={styles.form}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
      </View>
      <View>
        <Text
          style={colorScheme === "dark" ? shared.labelDark : shared.labelLight}
        >
          Email
        </Text>
        <Controller
          name={"email"}
          control={control}
          render={(props) => (
            <TextInput
              {...props}
              style={
                colorScheme === "dark" ? shared.inputLight : shared.inputDark
              }
              onChangeText={(val) => props.onChange(val)}
            />
          )}
        />
      </View>
      <View>
        <Text
          style={colorScheme === "dark" ? shared.labelDark : shared.labelLight}
        >
          Hasło
        </Text>
        <Controller
          name={"password"}
          control={control}
          render={(props) => (
            <TextInput
              {...props}
              secureTextEntry={true}
              style={
                colorScheme === "dark" ? shared.inputLight : shared.inputDark
              }
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
    </LinearGradient>
  );
};

export default SignUpScreen;
