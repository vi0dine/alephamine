import React from "react";
import { Text, View } from "./Themed";
import { BlurView } from "expo-blur";
import { ActivityIndicator } from "react-native";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";

const OverlayLoader = ({ message = null, mode = "fullscreen" }) => {
  return (
    <BlurView
      intensity={50}
      style={
        mode === "fullscreen"
          ? {
              position: "absolute",
              top: 0,
              left: 0,
              height: Layout.screen.height,
              width: Layout.screen.width,
              zIndex: 999,
            }
          : {
              flex: 1,
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              zIndex: 999,
            }
      }
    >
      <View
        style={{
          position: "absolute",
          backgroundColor: "transparent",
          width: "100%",
          height: "100%",
          zIndex: 2,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color={Colors.light.tint} size={"large"} />
        <Text
          style={{
            color: Colors.light.tint,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          {message}
        </Text>
      </View>
    </BlurView>
  );
};

export default OverlayLoader;
