import Constants from "expo-constants";
const { manifest } = Constants;

export const apiURL = () => {
  // return 'https://alephamine.viodine.tech'
  return `http://${manifest?.debuggerHost?.split(":").shift()}:3000/api`;
};
