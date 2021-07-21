import React, { Component } from "react";
import { Alert } from "react-native";
import PrimaryButtonwithIcon from "../components/PrimaryButtonwithIcon";
import Colors from "../assets/Colors";
import { AuthStyle } from "../assets/styles/AuthStyle";
import { StaticTitle } from "../utils/StaticTitle";
import { WEB_CLIENT_ID } from "../config/GoogleClientId";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

const TAG = "FBLogin ::=";
const googleButton_img = require("../assets/images/google-Button.png");

class GoogleLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      gettingLoginStatus: null,
    };
  }

  async componentDidMount() {
    this.configureGoogleSignIn(); // configure Google SignIn
    await this.getCurrentUser();   // check Current user 
  }


  // check Current user  Silently
  async getCurrentUser() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } catch (error) {
      const errorMessage =
        error.code === statusCodes.SIGN_IN_REQUIRED
          ? "Please sign in :)"
          : error.message;
      this.setState({
        error: new Error(errorMessage),
      });
    }
  }

  // configure Google SignIn with client id
  configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      androidClientId: WEB_CLIENT_ID,
      offlineAccess: true,
      forceConsentPrompt: true,
    });
  }


  // signout fb account from application 
  _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      this.setState({ userInfo: null });
    } catch (error) {
      this.setState({
        error,
      });
    }
  };

  /**
   * Method for login with Google
   * @function performGoogleLogin
   */
  performGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // sign in was cancelled
          //   Alert.alert("cancelled");
          break;
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          Alert.alert("in progress");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // android only
          Alert.alert("play services not available or outdated");
          break;
        default:
          Alert.alert("Something went wrong", error.toString());
          this.setState({
            error,
          });
      }
    }
  };

  render() {
    return (
      <PrimaryButtonwithIcon
        buttonStyle={{ backgroundColor: Colors.google_background }}
        iconName={googleButton_img}
        iconStyle={AuthStyle.iconStyle}
        btnName={StaticTitle.loginwithGoogle}
        onPress={() => this.performGoogleLogin()}
      />
    );
  }
}
export default GoogleLogin;
