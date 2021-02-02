import React, { useCallback, useEffect, useState } from "react";
import { Image, Switch, Text, View } from "react-native";
import styles from "./SettingsScreen.styles";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { useAssets } from "expo-asset";
import { useFocusEffect } from "@react-navigation/native";
import { fetchUser, updateUser } from "../../store/User/User.actions";

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const [assets] = useAssets([
    require("../../assets/avatar.png"),
    require("../../assets/bronze-medal.png"),
    require("../../assets/silver-medal.png"),
    require("../../assets/gold-medal.png"),
  ]);
  const user = useSelector((state) => state.UserState);
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(
    false
  );
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(
    false
  );

  const getMedalForAccountType = (type) => {
    if (type === "bronze") {
      return (
        <Image
          style={{ flex: 1, width: "100%", resizeMode: "contain" }}
          source={require("../../assets/bronze-medal.png")}
        />
      );
    } else if (type === "silver") {
      return (
        <Image
          style={{ flex: 1, width: "100%", resizeMode: "contain" }}
          source={require("../../assets/silver-medal.png")}
        />
      );
    } else {
      return (
        <Image
          style={{ flex: 1, width: "100%", resizeMode: "contain" }}
          source={require("../../assets/gold-medal.png")}
        />
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      dispatch(fetchUser(user?.id));

      return () => {
        isActive = false;
      };
    }, [])
  );

  useEffect(() => {
    setTimeout(() => {
      setPushNotificationsEnabled(user?.permit_push_notifications);
      setEmailNotificationsEnabled(user?.permit_mail_notifications);
    }, 1000);
  }, [user]);

  return (
    <LinearGradient
      colors={["#1F0039", "#5a4cc4", "#9623ff"]}
      start={[0.0, 1.0]}
      end={[1.0, 0.0]}
      style={styles.settingsScreenContainer}
    >
      <View>
        <Image source={require("../../assets/avatar.png")} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Email: {user?.email}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.infoText}>Typ konta:</Text>
          <View style={{ height: 48, width: 48, overflow: "hidden" }}>
            {getMedalForAccountType(user?.accountType)}
          </View>
        </View>
      </View>
      <View style={styles.notificationSettingContainer}>
        <Switch
          style={styles.notificationSettingSwitch}
          trackColor={{ false: "#afafaf", true: "#c46bff" }}
          thumbColor={pushNotificationsEnabled ? "#edd6ff" : "#fff4f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(value) => {
            setPushNotificationsEnabled(value);
            dispatch(
              updateUser(user.id, {
                permit_push_notifications: value,
              })
            );
          }}
          value={pushNotificationsEnabled}
        />
        <Text style={styles.notificationSettingText}>Powiadomienia push</Text>
      </View>
      <View style={styles.notificationSettingContainer}>
        <Switch
          style={styles.notificationSettingSwitch}
          trackColor={{ false: "#afafaf", true: "#c46bff" }}
          thumbColor={emailNotificationsEnabled ? "#edd6ff" : "#fff4f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(value) => {
            setEmailNotificationsEnabled(value);
            dispatch(
              updateUser(user.id, {
                permit_mail_notifications: value,
              })
            );
          }}
          value={emailNotificationsEnabled}
        />
        <Text style={styles.notificationSettingText}>Powiadomienia email</Text>
      </View>
    </LinearGradient>
  );
};

export default SettingsScreen;
