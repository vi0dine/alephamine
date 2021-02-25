import React, { useCallback, useEffect, useState } from "react";
import { Image } from "react-native";
import styles from "./SettingsScreen.styles";
import { useDispatch, useSelector } from "react-redux";
import { useAssets } from "expo-asset";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  fetchUser,
  logoutUser,
  updateUser,
} from "../../store/User/User.actions";
import { Button, Switch, Text, View } from "../../shared/components/Themed";
import Colors from "../../constants/Colors";
import Version from "../../shared/components/Version";
import sharedStyles from "../../shared/shared.styles";
import OverlayLoader from "../../shared/components/OverlayLoader";

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
    <View
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
      style={styles.settingsScreenContainer}
    >
      {user?.loading && <OverlayLoader message={"Ładowanie"} />}
      <Version style={{ bottom: 10 }} />
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
      <View style={styles.logoutButtonContainer}>
        <Button
          onPress={() => {
            dispatch(logoutUser(navigation));
          }}
        >
          <Text style={sharedStyles.buttonText}>Wyloguj</Text>
        </Button>
      </View>
    </View>
  );
};

export default SettingsScreen;
