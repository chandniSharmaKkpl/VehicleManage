import React, { Component } from "react";
import { View } from "react-native";
import PrimaryButtonwithIcon from "../components/PrimaryButtonwithIcon";
import { IMAGE } from "../assets/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { StaticTitle } from "../utils/StaticTitle";
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk-next";

const TAG = "FBLogin ::=";

class FBLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userName: "",
      userFbId: "",
      profilePic: "",
    };
  }

  /**
   * Method for login with facebook
   * @function performFBLogin
   */
  performFBLogin = () => {
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
                    console.log("result===", result);
                    // console.log("email===", result.email);
                    // this.setState({ userEmail: result.email });
                    AsyncStorage.setItem(
                      "FB_USERINFO",
                      JSON.stringify(result)
                    );
                  } else {
                    console.log(TAG, "email not exist in info");
                  }

                  if (result.hasOwnProperty("first_name")) {
                    console.log("first_name===", result.first_name);
                    // this.setState({ userName: result.first_name });
                  } else {
                    console.log(TAG, "first_name not exist in info");
                  }

                  if (result.hasOwnProperty("last_name")) {
                    console.log("last_name===", result.last_name);
                  } else {
                    console.log(TAG, "last_name not exist in info");
                  }

                  if (result.hasOwnProperty("name")) {
                    // this.setState({ userName: result.name });
                  } else {
                    console.log(TAG, "name not exist in info");
                  }

                  if (result.hasOwnProperty("id")) {
                    // this.setState({ userFbId: result.id });
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
      <View style={{ marginHorizontal: 10 }}>
        <PrimaryButtonwithIcon
          iconName={IMAGE.facebook_img}
          btnName={StaticTitle.loginwithFB}
          onPress={() => this.performFBLogin()}
        />
      </View>
    );
  }
}
export default FBLogin;
