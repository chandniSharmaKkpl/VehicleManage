import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
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
import Colors from "../../assets/Colors";

import AsyncStorage from "@react-native-async-storage/async-storage";

const TAG = "LoginScreen ::=";

export class LoginScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      theme: {},
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  UNSAFE_componentWillReceiveProps = (newProps) => {
    const { theme } = newProps;
    this.parseData(theme);
  };

  componentDidMount = async () => {
    this._isMounted = true;
    let them_mode = await AsyncStorage.getItem("them_mode");
    await this.fetchUserDetails();

    console.log(TAG, "componentDidMount ======them_mode", them_mode);
    var newTheme = lightTheme;
    if (them_mode === globals.THEME_MODE.DARK) {
      newTheme = darkTheme;
    }
    this.setState({ theme: them_mode });
    this.props.swicthTheme(newTheme);
  };

  // parse lite and dark theme data
  parseData = (newTheme) => {
    this.setState({ theme: newTheme });
  };

  // fetch user info from asynch storage
  fetchUserDetails = async () => {
    var user = JSON.parse(await AsyncStorage.getItem("user")) || {};

    if (user && user.user_data) {
      NavigationService.reset("Home");
    } else {
      // NavigationService.reset("Login");
    }
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
    const { isLoading, loaderMessage } = this.props;
    const { theme } = this.state;
    

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
            <Image source={
                    theme.mode == "dark" ? IMAGE.dark_Car_img : IMAGE.car_img
                  } style={AuthStyle.imgcar} />
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
              <Text style={AuthStyle.smallNewAppText}>
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
    userDetails: state.auth.user.userDetails,
  };
};

const mapDispatchToProps = (dispatch) => ({
  swicthTheme: (params) => dispatch(actions.swicthTheme(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
