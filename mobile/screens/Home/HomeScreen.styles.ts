import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  homeScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1f0039",
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
  searchButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 8,
    backgroundColor: "#972dff",
  },
  searchButtonText: {
    fontSize: 20,
    color: "#f8f8f8",
    fontWeight: "bold",
  },
  descriptionContainer: {
    marginVertical: 30,
  },
  descriptionText: {
    fontSize: 18,
    textAlign: "center",
    color: "#f8f8f8",
  },
});

export default styles;
