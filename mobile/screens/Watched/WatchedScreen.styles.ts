import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  watchedScreenContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  watchedScreenTitleContainer: {
    width: "100%",
    height: 50,
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
  },
  watchedScreenTitle: {
    color: "#f8f8f8",
    fontSize: 30,
    textAlign: "left",
  },
  watchedBooksListContainer: {
    width: "100%",
    paddingHorizontal: 5,
  },
  watchedBooksList: {},
});

export default styles;
