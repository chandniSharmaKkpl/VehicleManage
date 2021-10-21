import React, { Component } from "react";
import { StatusBar, Platform, LogBox, TextInput, Text } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import AppNavigator from "./store/AppNavigation";
import FlashMessage from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";
import * as globals from "./utils/Globals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Appearance,
  AppearanceProvider,
  useColorScheme,
} from "react-native-appearance";
import messaging, { firebase } from '@react-native-firebase/messaging';

let subscription;
export class App extends Component {
  constructor(props) {
    // Set allowFontScaling false for Screen
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;
    super(props);
  }

  async componentDidMount() {
    this.checkPermission();
    this.setDefaultSettings();
    subscription = Appearance.addChangeListener(async ({ colorScheme }) => {
      console.log("colorScheme=====", colorScheme);
      await AsyncStorage.setItem("them_mode", Appearance.getColorScheme());
    });

    // check IsInternet-Connection available or not at the time of page load / first render
    NetInfo.addEventListener((state) => {
      console.log("Is connected?", state.isConnected);
      globals.isInternetConnected = state.isConnected;
    });
  }

  async checkPermission() {
    const authStatus = await messaging().hasPermission();
    const enabled =
      authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === firebase.messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Notification have permission");
      this.getToken();
    } else {
      this.requestPermission();
    }
  }


  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        // Alert.alert("Device Token", fcmToken);
        console.log("Device TOKEN ======>" + fcmToken);
        // user has a device token
        await AsyncStorage.setItem("fcmToken", fcmToken);
      } else {
        // await AsyncStorage.setItem("dt_logs", "in else not getToken");
      }
    } else {
      console.log("Already Saved Device TOKEN ======>" + fcmToken);
      // await AsyncStorage.setItem("dt_logs", "found dt:" + fcmToken);
    }
  }
  
  async requestPermission() {
    try {
      const authStatus = await messaging().requestPermission(() => { });
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        // User has authorised
        this.getToken();
      } else {
        console.log("permission rejected.....");
      }
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  }

  componentWillUnmount() {
    subscription.remove();
    // check IsInternet-Connection available or not at the time of page exit / leave the page
    NetInfo.addEventListener((state) => {
      console.log("componentWillUnmount Is connected?", state.isConnected);
      globals.isInternetConnected = state.isConnected;
    });
  }

  setDefaultSettings = async () => {
    // set Theme
    console.log("setDefaultSettings---------");
    let them_mode = await AsyncStorage.getItem("them_mode");
    if (!them_mode) {
      await AsyncStorage.setItem("them_mode", Appearance.getColorScheme());
    }
  };

  render() {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();//Ignore all log notifications
    return (
      <AppearanceProvider>
        <Provider store={store}>
          <AppNavigator />
          <FlashMessage
            style={{
              paddingTop:
                Platform.OS === "android" ? StatusBar.currentHeight + 15 : 0,
            }}
            position="top"
          />
        </Provider>
      </AppearanceProvider>
    );
  }
}

export default App;
