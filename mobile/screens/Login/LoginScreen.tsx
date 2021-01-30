import React from "react";
import styles from "./LoginScreen.stylesheet";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../../store/User/User.actions";
import { useAssets } from "expo-asset";
import AppLoadingPlaceholder from "expo/build/launch/AppLoadingPlaceholder";

const LoginScreen: React.FunctionComponent = () => {
  const [assets] = useAssets([require("../../assets/logo.png")]);
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
          <Text style={styles.buttonText}>Zaloguj się</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.buttonText}>Nie masz konta?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
