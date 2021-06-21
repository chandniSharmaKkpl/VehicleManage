import React, { Component } from "react";
import { StatusBar, Platform } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import AppNavigator from "./store/AppNavigation";

console.disableYellowBox = true;

export class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
