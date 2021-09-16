import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import NavigationService from "../utils/NavigationService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class FirstScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: false,
    };
  }

  async componentDidMount() {
    await this.fetchUserDetails();
  }

  // fetch user info from asynch storage
  fetchUserDetails = async () => {
    var user = JSON.parse(await AsyncStorage.getItem("user")) || {};

    if (user && user.user_data) {
      NavigationService.reset("Home");
    } else {
      NavigationService.reset("Login");
    }
  };

  render() {
    return <View style={{ height: "100%" }}></View>;
  }
}

export default FirstScreen;
