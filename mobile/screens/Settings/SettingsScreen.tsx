import React, { useState } from "react";
import { Switch, Text, View } from "react-native";
import styles from "./SettingsScreen.styles";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

const SettingsScreen = () => {
  const user = useSelector((state) => state.UserState);
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(
    false
  );
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(
    false
  );

  return (
    <LinearGradient
      colors={["#1F0039", "#5a4cc4", "#9623ff"]}
      start={[0.0, 1.0]}
      end={[1.0, 0.0]}
      style={styles.settingsScreenContainer}
    >
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Email: {user?.email}</Text>
        {/*<Text style={styles.infoText}>Konto: {user?.accountType}</Text>*/}
      </View>
      {/*<View style={styles.notificationSettingContainer}>*/}
      {/*  <Switch*/}
      {/*    style={styles.notificationSettingSwitch}*/}
      {/*    trackColor={{ false: "#afafaf", true: "#c46bff" }}*/}
      {/*    thumbColor={pushNotificationsEnabled ? "#edd6ff" : "#fff4f4"}*/}
      {/*    ios_backgroundColor="#3e3e3e"*/}
      {/*    onValueChange={(value) => setPushNotificationsEnabled(value)}*/}
      {/*    value={pushNotificationsEnabled}*/}
      {/*  />*/}
      {/*  <Text style={styles.notificationSettingText}>Powiadomienia push</Text>*/}
      {/*</View>*/}
      {/*<View style={styles.notificationSettingContainer}>*/}
      {/*  <Switch*/}
      {/*    style={styles.notificationSettingSwitch}*/}
      {/*    trackColor={{ false: "#afafaf", true: "#c46bff" }}*/}
      {/*    thumbColor={emailNotificationsEnabled ? "#edd6ff" : "#fff4f4"}*/}
      {/*    ios_backgroundColor="#3e3e3e"*/}
      {/*    onValueChange={(value) => setEmailNotificationsEnabled(value)}*/}
      {/*    value={emailNotificationsEnabled}*/}
      {/*  />*/}
      {/*  <Text style={styles.notificationSettingText}>Powiadomienia email</Text>*/}
      {/*</View>*/}
    </LinearGradient>
  );
};

export default SettingsScreen;
