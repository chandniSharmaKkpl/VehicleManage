import React, { Component } from "react";
import { Alert, View } from "react-native";
import { PrimaryButtonwithIcon, Loader } from "../components";
import { IMAGE } from "../assets/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import * as actions from "../modules/authentication/redux/Actions";
import { showMessage, hideMessage } from "react-native-flash-message";
import * as globals from "../utils/Globals";
import NavigationService from "../utils/NavigationService";
import { StaticTitle } from "../utils/StaticTitle";
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk-next";

const TAG = "FBLogin ::=";
let tempuser;
class FBLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Method for login with facebook
   * @function performFBLogin
   */
  performFBLogin = (props) => {
    let tempToken;
    LoginManager.logOut();
    LoginManager.logInWithPermissions(["public_profile"]).then(
      function (result) {
        if (result.isCancelled) {
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            tempToken = data.accessToken;
            const infoRequest = new GraphRequest(
              "/me",
              {
                accessToken: data.accessToken,
                parameters: {
                  fields: {
                    string: "email,name,first_name,last_name",
                  },
                },
              },
              self._responseInfoCallback
            );
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function (error) {}
    );

    _responseInfoCallback = async (error, result) => {
      if (error) {
      } else {
        console.log("resukl=====", result);
        console.log("tempToken====", tempToken);
        // if (result.email) {
        let params = new URLSearchParams();
        // Collect the necessary params
        params.append("accessToken", tempToken);
        params.append("provider", "facebook");
        params.append("provider_id", result.id);
        params.append("name", result.name);
        params.append("email", result.email);

        const { sociallogin } = props;
        sociallogin(params)
          .then(async (res) => {
            console.log("res---sociallogin FB-", res.value.data);
            if (res.value && res.value.data.success == true) {
              //OK 200 The request was fulfilled
              if (res.value && res.value.status === 200) {
                await showMessage({
                  message: res.value.data.message,
                  type: "success",
                  icon: "info",
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
                  icon: "info",
                  duration: 4000,
                });
              }
            }
          })
          .catch((err) => {
            console.log("i am in catch error login", err);
          });
        // }
        // else {
        //   await showMessage({
        //     message:
        //       "Email is required, Please add into your facebook account or Login with Roadie App",
        //     type: "danger",
        //     icon: "info",
        //     duration: 4000,
        //   });
        // }
      }
    };
  };

  // save access token
  async gotoSaveToken(accessToken) {
    console.log(TAG, "accessToken===", accessToken);
    await AsyncStorage.setItem("access_token", accessToken);
    globals.access_token = accessToken;
  }

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

  render() {
    return (
      <>
        <View style={{ marginHorizontal: 10 }}>
          <PrimaryButtonwithIcon
            iconName={IMAGE.facebook_img}
            btnName={StaticTitle.loginwithFB}
            onPress={() => this.performFBLogin(this.props)}
          />
        </View>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(FBLogin);
