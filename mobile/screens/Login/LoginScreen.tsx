import React from "react";
import styles from "./LoginScreen.stylesheet";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../../store/User/User.actions";
import { useAssets } from "expo-asset";
import AppLoadingPlaceholder from "expo/build/launch/AppLoadingPlaceholder";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "react-native-appearance";
import shared from "../../shared/shared.styles";

const LoginScreen: React.FunctionComponent = () => {
  const [assets] = useAssets([require("../../assets/logo.png")]);
  let colorScheme = useColorScheme();
  const { handleSubmit, errors, control } = useForm();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(loginUser(values.email, values.password, navigation));
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
          style={
            colorScheme === "dark" ? shared.buttonLight : shared.buttonDark
          }
          onPress={handleSubmit(onSubmit)}
        >
          <Text
            style={
              colorScheme === "dark"
                ? shared.buttonLightText
                : shared.buttonDarkText
            }
          >
            Zaloguj się
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={
            colorScheme === "dark" ? shared.buttonLight : shared.buttonDark
          }
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text
            style={
              colorScheme === "dark"
                ? shared.buttonLightText
                : shared.buttonDarkText
            }
          >
            Nie masz konta?
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;
