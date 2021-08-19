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
    this.setDefaultSettings();
    subscription = Appearance.addChangeListener(async ({ colorScheme }) => {
      console.log("colorScheme=====", colorScheme);
      await AsyncStorage.setItem("them_mode", Appearance.getColorScheme());
    });

    LogBox.ignoreLogs(["Warning: ..."]);

    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);

    // check IsInternet-Connection available or not at the time of page load / first render
    NetInfo.addEventListener((state) => {
      console.log("Is connected?", state.isConnected);
      globals.isInternetConnected = state.isConnected;
    });
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
