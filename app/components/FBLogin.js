import React, { Component } from "react";
import { View } from "react-native";
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
    LoginManager.logOut();
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function (result) {
        console.log(TAG, `facebook login result : ${JSON.stringify(result)}`);
        if (result.isCancelled) {
          console.log(
            "result.cancelable ::",
            JSON.stringify(result.isCancelled)
          );

          // AsyncStorage.setItem(globals.FB_LOGINKEY, JSON.stringify(result.isCancelled));
        } else {
          console.log(
            `Login success with permissions: ${result.grantedPermissions.toString()}`
          );

          console.log(
            "result.cancelable ::",
            JSON.stringify(result.isCancelled)
          );
          // AsyncStorage.setItem(globals.FB_LOGINKEY, JSON.stringify(result.isCancelled));
          AccessToken.getCurrentAccessToken()
            .then((user) => {
              tempuser = user;
              console.log(TAG, `user info : ${JSON.stringify(user)}`);
              return user;
            })
            .then((user) => {
              const responseInfoCallback = (error, result) => {
                if (error) {
                  console.log(error);
                  alert(`Error fetching data: ${error.toString()}`);
                } else {
                  console.log(TAG, `user result : ${JSON.stringify(result)}`);
                  if (result.hasOwnProperty("email")) {
                    // console.log("result===", result);
                    // console.log("tempuser==", tempuser);
                    let params = new URLSearchParams();
                    // Collect the necessary params
                    params.append("accessToken", tempuser.accessToken);
                    params.append("provider", "facebook");
                    params.append("provider_id", result.id);
                    params.append("name", result.name);
                    params.append("email", result.email);

                    const { sociallogin } = props;
                    sociallogin(params)
                      .then(async (res) => {
                        console.log("res----", res.value.data);
                        if (res.value && res.value.data.success == true) {
                          //OK 200 The request was fulfilled
                          if (res.value && res.value.status === 200) {
                            await showMessage({
                              message: res.value.data.message,
                              type: "success",
                              icon: "info",
                              duration: 4000,
                            });
                            let authToken = res.value.data.data.token;
                            await AsyncStorage.setItem(
                              "access_token",
                              authToken
                            );
                            globals.access_token = authToken;
                            NavigationService.navigate("CreateProfile");
                          }
                        } else {
                          if (res.value && res.value.data.error) {
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
                  } else {
                    console.log(TAG, "email not exist in info");
                  }

                  if (result.hasOwnProperty("first_name")) {
                    console.log("first_name===", result.first_name);
                  } else {
                    console.log(TAG, "first_name not exist in info");
                  }

                  if (result.hasOwnProperty("last_name")) {
                    console.log("last_name===", result.last_name);
                  } else {
                    console.log(TAG, "last_name not exist in info");
                  }

                  if (result.hasOwnProperty("name")) {
                  } else {
                    console.log(TAG, "name not exist in info");
                  }

                  if (result.hasOwnProperty("id")) {
                  } else {
                    console.log(TAG, "id not exist in info");
                  }
                }
              };

              const infoRequest = new GraphRequest(
                "/me",
                {
                  accessToken: user.accessToken,
                  parameters: {
                    fields: {
                      string: "email,name,first_name,last_name",
                    },
                  },
                },
                responseInfoCallback
              );

              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start();
            });
        }
      },
      function (error) {
        console.log(`Login fail with error: ${error}`);
      }
    );
  };

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
});

export default connect(mapStateToProps, mapDispatchToProps)(FBLogin);
