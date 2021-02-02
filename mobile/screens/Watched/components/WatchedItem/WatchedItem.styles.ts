import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  watchedItemContainer: {
    backgroundColor: "rgba( 255, 255, 255, 0.25 )",
    borderStyle: "solid",
    borderColor: "rgba( 255, 255, 255, 0.18 )",
    borderWidth: 1,
    height: 120,
    borderRadius: 8,
    marginVertical: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoContainer: {
    flex: 2,
    maxHeight: 110,
    overflow: "hidden",
  },
  itemSubtitleText: {
    color: "#f7edff",
    fontSize: 13,
    fontWeight: "bold",
  },
  itemTitleText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  statusContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
