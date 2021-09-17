import React, { Component } from "react";
import PrimaryButtonwithIcon from "../components/PrimaryButtonwithIcon";
import { StaticTitle } from "../utils/StaticTitle";
import { Alert } from "react-native";
import { IMAGE } from "../assets/Images";
import Colors from "../assets/Colors";
import FontFamily from "../assets/styles/FontFamily";
import * as globals from "../utils/Globals";
import SnapchatLogin from "react-native-snapchat-login";
import { Linking } from "react-native";

const TAG = "SnapchatIntegration ::=";

class SnapchatIntegration extends Component {
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
   * Method for login with Snapchat
   * @function SnapchatIntegration
   */
  performSnapchatLogin = () => {
    SnapchatLogin.login().then((r2) => {
      console.log("login");
      console.log(r2);
      Alert.alert("login:", r2);
    });
  };

  performSnapchatGetInfo = () => {
    SnapchatLogin.getUserInfo().then((value) => {
      console.log("getUserInfo");
      console.log(value);
      Alert.alert("getUserInfo:", value);
    });
  };

  // navigate Social Profiles
  navigatetoSocialProfiles = (isFrom, name) => {
    let SocialURL;

    if (isFrom == "Snap") {
      SocialURL = name;
    } else {
      SocialURL = "https://www.google.com" + name;
    }

    Linking.canOpenURL(SocialURL).then((supported) => {
      if (supported) {
        Linking.openURL(SocialURL);
      } else {
      }
    });
  };

  render() {
    return (
      <>
        <PrimaryButtonwithIcon
          iconName={IMAGE.snap_img}
          logoStyle={{
            width: 25,
            height: 25,
            marginLeft: 20,
            marginRight: 24,
            marginVertical: 10,
          }}
          buttonStyle={{ backgroundColor: Colors.snapChat }}
          btnName={StaticTitle.linksnap}
          buttonTextStyle={{
            fontFamily: FontFamily.RalewaRegular,
            fontSize: globals.font_15,
            color: Colors.black,
          }}
          onPress={() => this.navigatetoSocialProfiles(this.props.isFrom, this.props.URL)}

          // onPress={() => this.performSnapchatLogin()}
        />
        {/* <PrimaryButtonwithIcon
          iconName={IMAGE.snap_img}
          logoStyle={{
            width: 25,
            height: 25,
            marginLeft: 20,
            marginRight: 24,
            marginVertical: 10,
          }}
          buttonStyle={{ backgroundColor: Colors.snapChat }}
          btnName={StaticTitle.linksnap}
          buttonTextStyle={{
            fontFamily: FontFamily.RalewaRegular,
            fontSize: globals.font_15,
            color: Colors.black,
          }}
          onPress={() => this.performSnapchatGetInfo()}
        /> */}
      </>
    );
  }
}
export default SnapchatIntegration;
