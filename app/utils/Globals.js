import { Dimensions, StatusBar, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

// Find the deviceWidth & deviceHeight
export let deviceWidth = Dimensions.get("window").width;
export let deviceHeight = Dimensions.get("window").height;

// Check the device iPad or not
let iPad = DeviceInfo.getModel();
export const timeoutDuration = 30000;
export const appName = 'Roadie';
export const isInternetConnected = true;
export let isTablat = iPad.indexOf("iPad") != -1 || DeviceInfo.isTablet();

// ADD theme modes
export const THEME_MODE = {
  DARK: "dark",
  LIGHT: "light"
}

// Check the return custom condition
export function renderIf(condition, component) {
  if (condition) {
    return component;
  } else {
    return null;
  }
}
