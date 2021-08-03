import React, { Component } from "react";
import PrimaryButtonwithIcon from "../components/PrimaryButtonwithIcon";
import { StaticTitle } from "../utils/StaticTitle";
import { Alert } from "react-native";
import { IMAGE } from "../assets/Images";
import Colors from "../assets/Colors";
import FontFamily from "../assets/styles/FontFamily";
import * as globals from "../utils/Globals";
import SnapchatLogin from "react-native-snapchat-login";

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
          onPress={() => this.performSnapchatLogin()}
        />
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
          onPress={() => this.performSnapchatGetInfo()}
        />
      </>
    );
  }
}
export default SnapchatIntegration;
