import React, { Component } from "react";
import { Text, Linking, TouchableOpacity } from "react-native";
import { StaticTitle } from "../utils/StaticTitle";
import Colors from "../assets/Colors";

import { IMAGE } from "../assets/Images";
import LinearGradient from "react-native-linear-gradient";
import { ComponentStyle } from "../assets/styles/ComponentStyle";
import FastImage from "react-native-fast-image";
import InstagramLogin from "react-native-instagram-login";
const TAG = "InstagramIntegration ::=";

class InstagramIntegration extends Component {
  constructor(props) {
    super(props);
    this.instagramLogin = React.createRef();
    this.state = {
      userEmail: "",
      userName: "",
      userFbId: "",
      profilePic: "",
    };
  }

  /**
   * Method for login with instagram
   * @function performInstaLogin
   */
  setSuccessofLogin = (data) => {};

  // navigate Social Profiles
  navigatetoSocialProfiles = (isFrom, name) => {
    let SocialURL;

    if (isFrom == "Instagram") {
      SocialURL = name;
    } else {
      SocialURL = "https://www.google.com" + name;
    }

    Linking.openURL(SocialURL);
  };

  render() {
    return (
      <>
        <InstagramLogin
          ref={(ref) => (this.instagramLogin = ref)}
          appId="381333166902003"
          appSecret="b9af24e1e2efcc64f0dc7f28e96a1b22"
          redirectUrl="https://staging.2excel.com.au/Roadie/privacy_policy"
          scopes={["user_profile", "user_media"]}
          onLoginSuccess={this.setSuccessofLogin}
        />

        <TouchableOpacity
          // onPress={() => this.instagramLogin.show()}
          onPress={() =>
            this.navigatetoSocialProfiles(this.props.isFrom, this.props.URL)
          }
        >
          <LinearGradient
            start={{ x: 0.0, y: 0.5 }}
            end={{ x: 0.7, y: 1.0 }}
            colors={[Colors.orange, Colors.pink, Colors.purple]}
            style={ComponentStyle.primaryBtnContainer}
          >
            <FastImage
              style={[ComponentStyle.instaiconstyle]}
              source={IMAGE.insta_icon_img}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={ComponentStyle.buttonText}>
              {StaticTitle.linkinsta}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </>
    );
  }
}
export default InstagramIntegration;
