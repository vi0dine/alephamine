import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  settingsScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1f0039",
    paddingTop: 70,
  },
  notificationSettingContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  notificationSettingSwitch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
  notificationSettingText: {
    color: "#f8f8f8",
    fontSize: 18,
    marginLeft: 20,
  },
  infoContainer: {
    height: 100,
    marginVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    color: "#f8f8f8",
    fontSize: 18,
    margin: 10,
  },
});

export default styles;
