import React, { Component } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";
import * as actions from "../modules/authentication/redux/Actions";
import NavigationService from "../utils/NavigationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as globals from "../utils/Globals";
import messaging, { firebase } from "@react-native-firebase/messaging";

export class FirstScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceToken: "",
    };
  }

  async componentDidMount() {
    // this.checkPermission();
    const accessToken = await AsyncStorage.getItem("access_token");
    globals.access_token = accessToken;
    if (accessToken === null || accessToken === undefined) {
      NavigationService.reset("Login");
    } else {
      this.getUserData();
    }
  }

  async checkPermission() {
    const authStatus = await messaging().hasPermission();
    const enabled =
      authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === firebase.messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      this.getToken();
    } else {
      this.requestUserPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        this.setState({ deviceToken: fcmToken });
        // user has a device token
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    } else {
      this.setState({ deviceToken: fcmToken });
    }
  }

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      this.getToken();
    }
  }

  getUserData() {
    const { initializeApp } = this.props;
    initializeApp().then(async (res) => {
      if (res.value && res.value.data.success == true) {
        if (res.value && res.value.status == 200) {
          let userdata = res.value.data.data;
          if (
            res.value &&
            res.value.status &&
            userdata.createprofileone == true
          ) {
            NavigationService.navigate("CreateProfile");
          } else if (
            res.value &&
            res.value.status &&
            (userdata.createprofiletwo == true ||
              userdata.register_detail == true)
          ) {
            NavigationService.navigate("CreateSocialMediaProfile");
          } else if (
            res.value &&
            res.value.status &&
            userdata.createprofileone == false &&
            userdata.createprofiletwo == false &&
            userdata.register_detail == false
          ) {
            NavigationService.navigate("App");
          }
        } else {
          NavigationService.navigate("Login");
        }
      } else {
        if (res.value && res.value.data.error == "Unauthenticated.") {
          {
            NavigationService.navigate("Login");
          }
        }
      }
    });
  }
  render() {
    return <View style={{ height: "100%" }}></View>;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    loaderMessage: state.auth.loaderMessage,
    theme: state.auth.user.theme,
  };
};

const mapDispatchToProps = (dispatch) => ({
  initializeApp: (params) => dispatch(actions.initializeApp(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FirstScreen);
