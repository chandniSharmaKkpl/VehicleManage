import React, { Component } from "react";
import { StatusBar, Platform } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import AppNavigator from "./store/AppNavigation";
import FlashMessage from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";
import * as globals from "./utils/Globals";



export class App extends Component {

  async componentDidMount() {
    console.disableYellowBox = true
    Platform.OS == 'android' ? StatusBar.setBackgroundColor('white', true) : null;
    NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      globals.isInternetConnected = state.isConnected;
      console.log("isInternetConnected==", globals.isInternetConnected);
    });
  }


  componentWillUnmount() {
    NetInfo.addEventListener(state => {
      console.log("componentWillUnmount Connection type", state.type);
      console.log("componentWillUnmount Is connected?", state.isConnected);
      globals.isInternetConnected = state.isConnected;
      console.log("componentWillUnmount isInternetConnected==", globals.isInternetConnected);
    });
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
          position="top" // floating={Platform.OS !== "ios"}
        />
      </Provider>
    );
  }
}

export default App;
