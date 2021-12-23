import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  AppState,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AuthStyle } from "../../assets/styles/AuthStyle";
import { connect } from "react-redux";
import { StaticTitle } from "../../utils/StaticTitle";
import { PrimaryButton, Loader } from "../../components";
import FBLogin from "../../components/FBLogin";
import GoogleLogin from "../../components/GoogleLogin";
import NavigationService from "../../utils/NavigationService";
import { IMAGE } from "../../assets/Images";
import * as globals from "../../utils/Globals";
import { darkTheme, lightTheme } from "../../assets/Theme";
import * as actions from "./redux/Actions";
import messaging, { firebase } from "@react-native-firebase/messaging";

import AsyncStorage from "@react-native-async-storage/async-storage";

const TAG = "LoginScreen ::=";

export class LoginScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      theme: {},
      deviceToken: "",
      appState: AppState.currentState,
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
    AppState.removeAllListeners("change", this._handleAppStateThemeChange);
  }

  UNSAFE_componentWillReceiveProps = (newProps) => {
    const { theme } = newProps;
    this.parseData(theme);
  };

  _handleAppStateThemeChange = async (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.setState({ appState: nextAppState });

      this.setThemeModes();
    }
    this.setState({ appState: nextAppState });
    this.setThemeModes();
  };

  setThemeModes = async () => {
    let them_mode = await AsyncStorage.getItem("them_mode");

    var newTheme = lightTheme;
    if (them_mode === globals.THEME_MODE.DARK) {
      newTheme = darkTheme;
    }
    this.setState({ theme: them_mode });
    this.props.swicthTheme(newTheme);
  };

  componentDidMount = async () => {
    this.checkPermission();

    this._isMounted = true;
    await this.setThemeModes();
    AppState.addEventListener("change", this._handleAppStateThemeChange);
  };

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
        console.log("Device TOKEN ======>", fcmToken);
        this.setState({ deviceToken: fcmToken });

        // user has a device token
        await AsyncStorage.setItem("fcmToken", fcmToken);
      } else {
        // await AsyncStorage.setItem("dt_logs", "in else not getToken");
      }
    } else {
      console.log("Already Saved Device TOKEN ======>", fcmToken);
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
      console.log("Authorization status:", authStatus);
    }
  }

  // parse lite and dark theme data
  parseData = (newTheme) => {
    this.setState({ theme: newTheme });
  };

  // Login with Email navigate to sign in screen
  performLoginwithEmail = () => {
    NavigationService.navigate("SignIn");
  };

  // sign up(New Register) navigate to sign up screen
  gotoSignUpscreen = () => {
    NavigationService.navigate("SignUp");
  };

  render() {
    const { isLoading, loaderMessage, theme } = this.props;
    // const { theme } = this.state;

    if (theme == undefined || theme.PRIMARY_BACKGROUND_COLOR === undefined) {
      return <></>;
    }
    return (
      <>
        <View
          style={[
            AuthStyle.onlyFlex,
            { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
          ]}
        >
          {isLoading && (
            <Loader isOverlay={true} loaderMessage={loaderMessage} />
          )}
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <View style={AuthStyle.imglogoContainer}>
            <Image
              source={
                theme.mode == "dark" ? IMAGE.dark_Logo_img : IMAGE.logo_img
              }
              style={AuthStyle.imglogo}
            />
          </View>

          <View style={AuthStyle.imgcarContainer}>
            <Image
              source={theme.mode == "dark" ? IMAGE.dark_Car_img : IMAGE.car_img}
              style={AuthStyle.imgcar}
            />
          </View>

          <View style={AuthStyle.titleContainer}>
            <Text style={AuthStyle.titleText}>{StaticTitle.login}</Text>
          </View>
          <ScrollView
            ref={(node) => (this.scroll = node)}
            automaticallyAdjustContentInsets={true}
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="never"
            style={[
              AuthStyle.onlyFlex,
              {
                marginBottom: globals.deviceHeight * 0.04,
                paddingBottom: globals.deviceHeight * 0.02,
              },
            ]}
          >
            <View style={AuthStyle.onlyFlex}>
              <FBLogin />
              <GoogleLogin />
              <View style={AuthStyle.lineViewContainer}>
                <View
                  style={[
                    AuthStyle.lineContainer,
                    { backgroundColor: theme.PRIMARY_TEXT_COLOR },
                  ]}
                ></View>
                <Text
                  style={[
                    AuthStyle.smallText,
                    { color: theme.PRIMARY_TEXT_COLOR },
                  ]}
                >
                  {StaticTitle.or}
                </Text>
                <View
                  style={[
                    AuthStyle.lineContainer,
                    { backgroundColor: theme.PRIMARY_TEXT_COLOR },
                  ]}
                ></View>
              </View>
              <View style={[AuthStyle.signinbtnView, { paddingVertical: 0 }]}>
                <PrimaryButton
                  btnName={StaticTitle.loginwithEmail}
                  onPress={() => this.performLoginwithEmail()}
                />
              </View>
            </View>

            <View style={AuthStyle.bottomContainer}>
              <Text
                style={[
                  AuthStyle.smallNewAppText,
                  { color: theme.PRIMARY_TEXT_COLOR },
                ]}
              >
                {StaticTitle.newApp}
              </Text>
              <TouchableOpacity onPress={() => this.gotoSignUpscreen()}>
                <Text style={AuthStyle.smallSignupText}>
                  {StaticTitle.signup}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.user.isLoading,
    loaderMessage: state.auth.user.loaderMessage,
    theme: state.auth.user.theme,
  };
};

const mapDispatchToProps = (dispatch) => ({
  swicthTheme: (params) => dispatch(actions.swicthTheme(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
