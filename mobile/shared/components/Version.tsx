import React from "react";
import appVersion from "../../config/version";
import { Text, View } from "./Themed";

const Version = (props) => {
  return (
    <View
      style={[
        {
          position: "absolute",
          bottom: 50,
          right: 20,
        },
        { ...props?.style },
      ]}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 11,
        }}
      >
        v. {appVersion}
      </Text>
    </View>
  );
};

export default Version;
