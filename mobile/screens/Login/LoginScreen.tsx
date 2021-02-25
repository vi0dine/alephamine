import React from "react";
import loginScreenStyles from "./LoginScreen.styles";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../../store/User/User.actions";
import { useAssets } from "expo-asset";
import AppLoadingPlaceholder from "expo/build/launch/AppLoadingPlaceholder";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "react-native-appearance";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "../../shared/components/Themed";
import sharedStyles from "../../shared/shared.styles";
import { useFormik } from "formik";
import Colors from "../../constants/Colors";
import OverlayLoader from "../../shared/components/OverlayLoader";
import Version from "../../shared/components/Version";

const LoginScreen: React.FunctionComponent = () => {
  const [assets] = useAssets([require("../../assets/logo.png")]);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.UserState.loading);

  const formik = useFormik({
    initialValues: {
      email: null,
      password: null,
    },
    validationSchema: null,
    onSubmit: (values) => {
      dispatch(loginUser(values?.email, values?.password, navigation));
    },
  });

  if (!assets) {
    return <AppLoadingPlaceholder />;
  }

  return (
    <KeyboardAwareScrollView scrollEnabled={false}>
      {loading && <OverlayLoader message={"Uwierzytelnianie"} />}
      <View
        lightColor={Colors.light.background}
        darkColor={Colors.dark.background}
        style={loginScreenStyles.form}
      >
        <Version />
        <View style={loginScreenStyles.logoContainer}>
          <Image
            style={loginScreenStyles.logo}
            source={require("../../assets/logo.png")}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          <TextInput
            label={"Email"}
            placeholder={"Email"}
            value={formik.values.email}
            onFocus={formik.handleBlur("email")}
            onChangeText={formik.handleChange("email")}
          />
          <TextInput
            label={"Hasło"}
            placeholder={"Hasło"}
            secureTextEntry={true}
            value={formik.values.password}
            onFocus={formik.handleBlur("password")}
            onChangeText={formik.handleChange("password")}
          />
          <Button onPress={() => formik.handleSubmit()}>
            <Text style={sharedStyles.buttonText}>Zaloguj się</Text>
          </Button>
          <Button onPress={() => navigation.navigate("SignUp")}>
            <Text style={sharedStyles.buttonText}>Nie masz konta?</Text>
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
