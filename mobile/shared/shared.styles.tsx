import { StyleSheet } from "react-native";

const shared = StyleSheet.create({
  buttonLight: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5b0b9a",
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 10,
    textAlign: "center",
  },
  buttonDark: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ab4fff",
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 10,
    textAlign: "center",
  },
  buttonLightText: {
    color: "#ffebf4",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonDarkText: {
    color: "#FFEBF4",
    fontSize: 18,
    fontWeight: "bold",
  },
  labelLight: {
    marginLeft: 5,
    fontSize: 11,
    color: "#230042",
  },
  labelDark: {
    marginLeft: 5,
    fontSize: 11,
    color: "#e9ccff",
  },
  inputLight: {
    backgroundColor: "#150031",
    color: "#fff",
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
  },
  inputDark: {
    backgroundColor: "#fff",
    color: "#150031",
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
  },
});

export default shared;
