/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./app/App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
import messaging from "@react-native-firebase/messaging";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

function appCode() {
  // Your application
}

if (Platform.OS == "android") {
  AppRegistry.registerHeadlessTask("appCode", () => HeadlessCheck);
}
