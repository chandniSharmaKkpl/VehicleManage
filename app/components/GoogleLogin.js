import React, { Component } from "react";
import { Alert, Platform, View } from "react-native";
import PrimaryButtonwithIcon from "../components/PrimaryButtonwithIcon";
import Colors from "../assets/Colors";
import { AuthStyle } from "../assets/styles/AuthStyle";
import { StaticTitle } from "../utils/StaticTitle";
import { WEB_CLIENT_ID } from "../config/GoogleClientId";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { connect } from "react-redux";
import { showMessage, hideMessage } from "react-native-flash-message";
import { IMAGE } from "../assets/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as globals from "../utils/Globals";
import NavigationService from "../utils/NavigationService";
import * as actions from "../modules/authentication/redux/Actions";
import DeviceInfo from "react-native-device-info";

const TAG = "GoogleLogin ::=";

class GoogleLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    this.configureGoogleSignIn(); // configure Google SignIn
  }

  // check Current user  Silently
  async getCurrentUser() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
    } catch (error) {
      const errorMessage =
        error.code === statusCodes.SIGN_IN_REQUIRED
          ? "Please sign in :)"
          : error.message;
    }
  }

  // configure Google SignIn with client id
  configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: true,
      hostedDomain: "",
      forceConsentPrompt: true,
    });
  }

  // signout gmail account from application
  _signOut = async () => {
    try {
      // await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {}
  };

  performGoogleLogin = async (props) => {
    const { sociallogin } = props;

    var deviceUUID = DeviceInfo.getUniqueId();
    var deviceName = DeviceInfo.getDeviceNameSync();
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    try {
      await this._signOut();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // const accessToken = await GoogleSignin.getTokens();
      let params = new URLSearchParams();
      // Collect the necessary params
      params.append("accessToken", userInfo.idToken);
      params.append("provider", "google");
      params.append("provider_id", userInfo.user.id);
      params.append("name", userInfo.user.givenName);
      params.append("surname", userInfo.user.familyName);
      params.append("email", userInfo.user.email);
      params.append("device_token", fcmToken);
      params.append("device_uuid", deviceUUID);
      params.append("device_type", Platform.OS == "android" ? "1" : "0");
      params.append("device_name", deviceName);

      sociallogin(params)
        .then(async (res) => {
          if (res.value && res.value.data.success == true) {
            //OK 200 The request was fulfilled
            if (res.value && res.value.status === 200) {
              await showMessage({
                message: res.value.data.message,
                type: "success",
                icon: "auto",
                duration: 4000,
              });
              if (
                res.value &&
                res.value.status &&
                res.value.data.data.createprofileone == true
              ) {
                await this.gotoSaveToken(res.value.data.data.token);
                NavigationService.navigate("CreateProfile");
              } else if (
                res.value.data.data.createprofiletwo == true ||
                res.value.data.data.register_detail == true
              ) {
                await this.gotoSaveToken(res.value.data.data.token);
                NavigationService.navigate("CreateSocialMediaProfile");
              } else if (
                res.value.data.data.createprofileone == false &&
                res.value.data.data.createprofiletwo == false &&
                res.value.data.data.register_detail == false
              ) {
                await this.gotoSaveToken(res.value.data.data.token);
                await this.getUserData();
              }
            }
          } else {
            if (res.value && res.value.data.error == "Unauthenticated.") {
              {
                NavigationService.navigate("Login");
              }
            } else if (res.value && res.value.data.error) {
              await showMessage({
                message: res.value.message,
                type: "danger",
                icon: "auto",
                duration: 4000,
              });
            }
          }
        })
        .catch((err) => {
          console.log("i am in catch error google login", err);
        });
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // sign in was cancelled
          //   Alert.alert("cancelled");
          break;
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in)i already n progress
          Alert.alert("in progress");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // android only
          Alert.alert("play services not available or outdated");
          break;
        default:
          Alert.alert("Something went wrong", error.toString());
      }
    }
  };

  // get user information
  getUserData() {
    const { initializeApp } = this.props;
    initializeApp().then((res) => {
      if (res.value && res.value.status === 200) {
        NavigationService.navigate("App");
      } else {
        NavigationService.navigate("Login");
      }
    });
  }

  // save access token
  async gotoSaveToken(accessToken) {
    await AsyncStorage.setItem("access_token", accessToken);
    globals.access_token = accessToken;
  }

  render() {
    return (
      <View style={{ marginHorizontal: 10 }}>
        <PrimaryButtonwithIcon
          buttonStyle={{ backgroundColor: Colors.google_background }}
          iconName={IMAGE.googleButton_img}
          iconStyle={AuthStyle.iconStyle}
          btnName={StaticTitle.loginwithGoogle}
          onPress={() => this.performGoogleLogin(this.props)}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.user.isLoading,
    loaderMessage: state.auth.user.loaderMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  sociallogin: (params) => dispatch(actions.sociallogin(params)),
  initializeApp: (params) => dispatch(actions.initializeApp(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleLogin);
