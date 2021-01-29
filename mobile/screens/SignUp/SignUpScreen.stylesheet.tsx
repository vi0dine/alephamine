import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  form: {
    flex: 1,
    paddingHorizontal: 50,
    paddingVertical: 100,
    backgroundColor: "#1f0039",
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
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4c0982",
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 10,
    textAlign: "center",
  },
  buttonText: {
    color: "#f8f8f8",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
