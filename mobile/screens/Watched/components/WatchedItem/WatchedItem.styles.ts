import { StyleSheet } from "react-native";

const watchedItemStyles = StyleSheet.create({
  watchedItemContainer: {
    height: 120,
    borderRadius: 8,
    marginVertical: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  infoContainer: {
    flex: 2,
    maxHeight: 110,
    overflow: "hidden",
  },
  itemSubtitleText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  itemTitleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statusContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default watchedItemStyles;
