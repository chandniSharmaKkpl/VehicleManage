import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import * as actions from "../modules/authentication/redux/Actions";
import NavigationService from "../utils/NavigationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as globals from "../utils/Globals";
import { darkTheme, lightTheme } from "../assets/Theme";
import messaging, { firebase } from '@react-native-firebase/messaging';

export class FirstScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // theme: {},
      deviceToken: "",
    };
  }

  // UNSAFE_componentWillReceiveProps = (newProps) => {
  //   const { theme } = newProps;
  //   this.parseData(theme);
  // };

  async componentDidMount() {
    // let them_mode = await AsyncStorage.getItem("them_mode");

    // console.log("FirstScreen componentDidMount ======them_mode", them_mode);
    // var newTheme = lightTheme;
    // if (them_mode === globals.THEME_MODE.DARK) {
    //   newTheme = darkTheme;
    // }
    // this.setState({ theme: them_mode });
    // this.props.swicthTheme(newTheme);
    this.checkPermission();
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
      console.log("Notification have permission");
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
        // Alert.alert("Device Token", fcmToken);
        console.log("Device TOKEN ======>" + fcmToken);
        this.setState({ deviceToken: fcmToken });

        // user has a device token
        await AsyncStorage.setItem("fcmToken", fcmToken);
      } else {
        // await AsyncStorage.setItem("dt_logs", "in else not getToken");
      }
    } else {
      console.log("Already Saved Device TOKEN ======>" + fcmToken);
      this.setState({ deviceToken: fcmToken });
      // await AsyncStorage.setItem("dt_logs", "found dt:" + fcmToken);
    }
  }

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      this.getToken();
      console.log('Authorization status:', authStatus);
    }
  }

  // parse lite and dark theme data
  // parseData = (newTheme) => {
  //   this.setState({ theme: newTheme });
  // };

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
      }
    });
  }
  render() {
    // const { theme } = this.state;
    // if (theme == undefined || theme.PRIMARY_BACKGROUND_COLOR === undefined) {
    //   return <></>;
    // }
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
  // swicthTheme: (params) => dispatch(actions.swicthTheme(params)),
  initializeApp: (params) => dispatch(actions.initializeApp(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FirstScreen);
