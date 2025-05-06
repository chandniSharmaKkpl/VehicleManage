import React, { Component } from "react";
import {
  Text,
  Linking,
  TouchableOpacity,
  TextInput,
  View,
  Alert,
} from "react-native";
import { StaticTitle } from "../utils/StaticTitle";
import Colors from "../assets/Colors";

import { IMAGE } from "../assets/Images";
import LinearGradient from "react-native-linear-gradient";
import { ComponentStyle } from "../assets/styles/ComponentStyle";
import FastImage from "react-native-fast-image";
import InstagramLogin from "react-native-instagram-login";
import CookieManager from "@react-native-community/cookies";

const TAG = "InstagramIntegration ::=";

class InstagramIntegration extends Component {
  constructor(props) {
    super(props);
    this.instagramLogin = React.createRef();
    this.state = {
      userEmail: "",
      userName: "",
      userInstaId: null,
      profilePic: "",
      token: null,
    };
  }

  /**
   * Method for login with instagram
   * @function performInstaLogin
   */
  // setSuccessofLogin = (data) => {
  //   console.log("Instagram data:", data);
  //   this.setState({
  //     token: data.access_token,
  //     userInstaId: data.user_id,
  //   });
  // };

  // onClear() {
  //   CookieManager.clearAll(true).then((res) => {
  //     this.setState({ token: null });
  //   });
  // }

  // navigate Social Profiles
  navigatetoSocialProfiles = (isFrom, name) => {
    let SocialURL;

    if (isFrom == "Instagram") {
      SocialURL = name;
    } else {
      SocialURL = "https://www.google.com" + name;
    }
    console.log("Social URL", SocialURL);

    Linking.openURL(SocialURL);
  };

  render() {
    return (
      <View style={ComponentStyle.primaryInputView}>
        {/* <InstagramLogin
          ref={(ref) => (this.instagramLogin = ref)}
          appId="381333166902003"
          appSecret="b9af24e1e2efcc64f0dc7f28e96a1b22"
          redirectUrl="https://staging.2excel.com.au/Roadie/privacy_policy"
          scopes={["user_profile", "user_media"]}
          onLoginSuccess={this.setSuccessofLogin}
        /> */}

        <LinearGradient
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 0.7, y: 1.0 }}
          colors={[Colors.orange, Colors.pink, Colors.purple]}
          style={ComponentStyle.primaryIconContainerView}
        >
          <TouchableOpacity
            // onPress={() => this.instagramLogin.show()}
            onPress={() =>
              this.navigatetoSocialProfiles(this.props.isFrom, this.props.URL)
            }
          >
            <FastImage
              style={[ComponentStyle.instaiconstyle]}
              source={IMAGE.insta_icon_img}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 0.7, y: 1.0 }}
          colors={[Colors.orange, Colors.pink, Colors.purple]}
          style={ComponentStyle.primaryInputContainerView}
        >
          <TextInput
            style={ComponentStyle.buttonText}
            placeholder={"Enter Instagram Username"}
            placeholderTextColor={Colors.white}
            value={this.props.value}
            onChangeText={this.props.onChangeText}
            autoCapitalize="none"
            autoCompleteType="username"
          />
        </LinearGradient>
      </View>
    );
  }
}
export default InstagramIntegration;
