import { StyleSheet } from "react-native";

const sharedStyles = StyleSheet.create({
  button: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 4,
    marginTop: 8,
    textAlign: "center",
  },
  buttonText: {
    color: "#f8f8f8",
    fontSize: 18,
    fontWeight: "bold",
  },
  label: {
    marginLeft: 5,
    fontSize: 11,
  },
  input: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    height: 48,
    borderWidth: 1,
  },
});

export default sharedStyles;
