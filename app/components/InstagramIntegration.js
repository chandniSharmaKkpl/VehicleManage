import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { StaticTitle } from "../utils/StaticTitle";
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk-next";
import { IMAGE } from "../assets/Images";
import LinearGradient from "react-native-linear-gradient";
import { ComponentStyle } from "../assets/styles/ComponentStyle";
import FastImage from "react-native-fast-image";

const TAG = "InstagramIntegration ::=";

class InstagramIntegration extends Component {
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
                    console.log("email===", result.email);
                    // this.setState({ userEmail: result.email });
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
      <TouchableOpacity onPress={() => this.performFBLogin()}>
        <LinearGradient
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 0.7, y: 1.0 }}
          colors={["#F67131", "#DD3770", "#A035B0"]}
          style={ComponentStyle.primaryBtnContainer}
        >
          <FastImage
            style={[ComponentStyle.instaiconstyle]}
            source={IMAGE.insta_icon_img}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={ComponentStyle.buttonText}>{StaticTitle.linkinsta}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
export default InstagramIntegration;
