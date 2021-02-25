import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

export default {
  window: {
    width: windowWidth,
    height: windowHeight,
  },
  screen: {
    width: screenWidth,
    height: screenHeight,
  },
  isSmallDevice: windowWidth < 375,
};
