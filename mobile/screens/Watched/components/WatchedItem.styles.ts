import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  watchedItemContainer: {
    height: 120,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  watchedItemBackground: {
    height: 120,
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoContainer: {
    flex: 2,
  },
  itemSubtitleText: {
    color: "#390050",
    fontSize: 13,
    fontWeight: "bold",
  },
  itemTitleText: {
    color: "#270036",
    fontSize: 18,
    fontWeight: "bold",
  },
  statusContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
