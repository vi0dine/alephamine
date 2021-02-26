import Constants from "expo-constants";

const { manifest } = Constants;

export const apiURL = () => {
  // return "https://alephamine.viodine.tech/api";
  return `http://${manifest?.debuggerHost.split(":").shift()}:3000/api`;
};
