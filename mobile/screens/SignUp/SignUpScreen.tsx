import React, { useEffect, useState } from "react";
import { Image, ToastAndroid } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { signUpUser } from "../../store/User/User.actions";
import { useAssets } from "expo-asset";
import AppLoadingPlaceholder from "expo/build/launch/AppLoadingPlaceholder";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useColorScheme } from "react-native-appearance";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";
import { Button, Text, TextInput, View } from "../../shared/components/Themed";
import signUpScreenStyles from "./SignUpScreen.styles";
import sharedStyles from "../../shared/shared.styles";
import Colors from "../../constants/Colors";
import Version from "../../shared/components/Version";

const SignUpScreen: React.FunctionComponent = () => {
  const [assets] = useAssets([require("../../assets/logo.png")]);
  let colorScheme = useColorScheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: null,
      password: null,
      token: null,
    },
    validationSchema: null,
    onSubmit: (values) => {
      dispatch(
        signUpUser(values?.email, values?.password, values?.token, navigation)
      );
    },
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      formik.setFieldValue("token", token)
    );
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

  if (!assets) {
    return <AppLoadingPlaceholder />;
  }

  return (
    <KeyboardAwareScrollView scrollEnabled={false}>
      <View
        lightColor={Colors.light.background}
        darkColor={Colors.dark.background}
        style={signUpScreenStyles.form}
      >
        <Version />
        <View style={signUpScreenStyles.logoContainer}>
          <Image
            style={signUpScreenStyles.logo}
            source={require("../../assets/logo.png")}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View>
            <TextInput
              label={"Email"}
              placeholder={"Email"}
              value={formik.values.email}
              onFocus={formik.handleBlur("email")}
              onChangeText={formik.handleChange("email")}
            />
          </View>
          <View>
            <TextInput
              label={"Hasło"}
              placeholder={"Hasło"}
              value={formik.values.password}
              onFocus={formik.handleBlur("password")}
              onChangeText={formik.handleChange("password")}
              secureTextEntry={true}
            />
          </View>
          <View>
            <Button onPress={() => {}}>
              <Text style={sharedStyles.buttonText}>Załóż konto</Text>
            </Button>
          </View>
          <View>
            <Button onPress={() => navigation.navigate("Login")}>
              <Text style={sharedStyles.buttonText}>Wróć do logowania</Text>
            </Button>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;
