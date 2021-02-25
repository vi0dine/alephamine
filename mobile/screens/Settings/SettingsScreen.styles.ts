import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  settingsScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 18,
    marginLeft: 20,
  },
  infoContainer: {
    height: 100,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    margin: 10,
  },
  logoutButtonContainer: {
    marginTop: 32,
    width: "80%",
  },
});

export default styles;
