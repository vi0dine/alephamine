import { StyleSheet } from "react-native";

const homeScreenStyles = StyleSheet.create({
  homeScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  searchFieldContainer: {
    width: "100%",
  },
  searchField: {
    marginVertical: 20,
    width: "100%",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  searchButtonContainer: {
    width: "100%",
  },
  descriptionContainer: {
    marginVertical: 30,
  },
  descriptionText: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default homeScreenStyles;
