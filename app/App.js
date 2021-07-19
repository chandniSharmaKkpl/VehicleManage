import React, { Component } from "react";
import { StatusBar, Platform, LogBox, Appearance } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import AppNavigator from "./store/AppNavigation";
import FlashMessage from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";
import * as globals from "./utils/Globals";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class App extends Component {
  async componentDidMount() {
    LogBox.ignoreLogs(['Warning: ...']);
    console.log("getColorScheme :->", Appearance.getColorScheme());
    this.setDefaultSettings();   // manage Dark & lite theme
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    Platform.OS == "android"? StatusBar.setBackgroundColor("white", true) : null; // add statusbar color
    // check IsInternet-Connection available or not at the time of page load / first render 
    NetInfo.addEventListener((state) => 
    {
      console.log("Is connected?", state.isConnected);
      globals.isInternetConnected = state.isConnected;
    });
  }

  componentWillUnmount() {
    // check IsInternet-Connection available or not at the time of page exit / leave the page
    NetInfo.addEventListener((state) => {
      console.log("componentWillUnmount Is connected?", state.isConnected);
      globals.isInternetConnected = state.isConnected;
    });
  }

  setDefaultSettings = async () => {
    // set Theme
    let them_mode = await AsyncStorage.getItem('them_mode');
    if (!them_mode) {
      await AsyncStorage.setItem('them_mode', "light");
    }
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
        <FlashMessage
          style={{
            paddingTop:
              Platform.OS === "android" ? StatusBar.currentHeight + 5 : 0,
          }}
          position="top"
        />
      </Provider>
    );
  }
}

export default App;
