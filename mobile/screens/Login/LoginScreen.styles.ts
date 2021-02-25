import { StyleSheet } from "react-native";
import Layout from "../../constants/Layout";

const loginScreenStyles = StyleSheet.create({
  form: {
    height: Layout.screen.height,
    paddingHorizontal: 50,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "baseline",
  },
  logo: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
  },
  label: {
    marginLeft: 5,
    fontSize: 11,
    color: "#e9ccff",
  },
  input: {
    backgroundColor: "#fff",
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
  },
});

export default loginScreenStyles;
