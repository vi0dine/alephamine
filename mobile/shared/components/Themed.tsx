import * as React from "react";
import {
  Text as DefaultText,
  TextInput as DefaultTextInput,
  View as DefaultView,
  TouchableOpacity as DefaultTouchableOpacity,
  Switch as DefaultSwitch,
  Alert,
} from "react-native";

import Colors from "../../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import sharedStyles from "../shared.styles";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  lightBorderColor?: string;
  darkBorderColor?: string;
  lightBgColor?: string;
  darkBgColor?: string;
};

export type TextProps = ThemeProps &
  DefaultText["props"] & { copyable?: boolean };
export type ViewProps = ThemeProps & DefaultView["props"];
export type TextInputProps = ThemeProps &
  DefaultTextInput["props"] & { errorMessage?: string; label: string };
export type TouchableOpacityProps = ThemeProps &
  DefaultTouchableOpacity["props"];

export function Text(props: TextProps) {
  const {
    style,
    lightColor,
    darkColor,
    copyable = false,
    ...otherProps
  } = props;
  const color = useThemeColor(
    {
      light: lightColor || Colors.light.text,
      dark: darkColor || Colors.dark.text,
    },
    "text"
  );

  if (copyable) {
    return (
      <DefaultTouchableOpacity
        onLongPress={() => {
          Alert.alert("Copied", "Text copied to clipboard.", [{ text: "OK" }]);
        }}
      >
        <DefaultText
          style={[{ color }, style]}
          {...otherProps}
          allowFontScaling={false}
        />
      </DefaultTouchableOpacity>
    );
  } else {
    return (
      <DefaultText
        style={[{ color }, style]}
        {...otherProps}
        allowFontScaling={false}
      />
    );
  }
}

export function TextInput(props: TextInputProps) {
  const {
    style,
    lightColor,
    darkColor,
    lightBorderColor,
    darkBorderColor,
    lightBgColor,
    darkBgColor,
    label = "",
    value = "",
    errorMessage,
    ...otherProps
  } = props;
  const theme = useColorScheme();
  const color = useThemeColor(
    {
      light: lightColor || Colors[theme].text,
      dark: darkColor || Colors[theme].text,
    },
    "text"
  );
  const borderColor = useThemeColor(
    {
      light: lightBorderColor || `${Colors.light.tint}30`,
      dark: darkBorderColor || `${Colors.dark.tint}30`,
    },
    "border"
  );
  const backgroundColor = useThemeColor(
    { light: lightBgColor, dark: darkBgColor },
    "background"
  );

  return (
    <>
      {label?.length > 0 && value?.length > 0 && (
        <DefaultText style={[sharedStyles.label, { color }]}>
          {label}
        </DefaultText>
      )}
      <DefaultTextInput
        placeholderTextColor={`${color}70`}
        style={[
          sharedStyles.input,
          {
            color,
            backgroundColor,
            borderColor: errorMessage ? "red" : borderColor,
          },
          style,
        ]}
        {...otherProps}
      />
      {errorMessage && (
        <DefaultText style={{ fontSize: 9, color: Colors[theme].danger }}>
          {errorMessage}
        </DefaultText>
      )}
    </>
  );
}

export function Button(props: TouchableOpacityProps) {
  const {
    style,
    lightColor,
    darkColor,
    lightBorderColor,
    darkBorderColor,
    lightBgColor,
    darkBgColor,
    ...otherProps
  } = props;
  const borderColor = useThemeColor(
    { light: lightBorderColor, dark: darkBorderColor },
    "border"
  );
  const backgroundColor = useThemeColor(
    {
      light: lightBgColor || Colors.light.tint,
      dark: darkBgColor || Colors.dark.tint,
    },
    "background"
  );

  return (
    <DefaultTouchableOpacity
      style={[
        sharedStyles.button,
        {
          borderColor,
          backgroundColor: backgroundColor || Colors.light.tint,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor || "transparent", dark: darkColor || "transparent" },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Switch(props: any) {
  const {
    style,
    lightColor,
    darkColor,
    lightBorderColor,
    darkBorderColor,
    lightBgColor,
    darkBgColor,
    ...otherProps
  } = props;

  const theme = useColorScheme();

  return (
    <DefaultSwitch
      trackColor={{
        false: `${Colors[theme].tint}2A`,
        true: `${Colors[theme].tint}BF`,
      }}
      thumbColor={`${Colors[theme].tint}`}
      ios_backgroundColor="#3e3e3e"
      style={[{ marginRight: 10 }, style]}
      {...otherProps}
    />
  );
}
