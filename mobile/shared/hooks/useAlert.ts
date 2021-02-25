import { Alert, Platform, ToastAndroid } from "react-native";

const useAlert = (message: string, title = "Błąd") => {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.LONG);
  } else {
    Alert.alert(title, message);
  }
};

export default useAlert;
