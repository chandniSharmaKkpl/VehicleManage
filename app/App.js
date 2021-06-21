import React, { Component } from "react";
import { StatusBar, Platform } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import AppNavigator from "./store/AppNavigation";
import FlashMessage from "react-native-flash-message";

console.disableYellowBox = true;

export class App extends Component {
  componentDidMount() {}
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
