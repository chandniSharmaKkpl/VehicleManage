import React, { Component } from "react";
import {
  Text,
  Linking,
  TouchableOpacity,
  TextInput,
  View,
  Alert,
} from "react-native";
import PrimaryButtonwithIcon from "../components/PrimaryButtonwithIcon";
import { StaticTitle } from "../utils/StaticTitle";
import { IMAGE } from "../assets/Images";
import FastImage from "react-native-fast-image";
import Colors from "../assets/Colors";
import FontFamily from "../assets/styles/FontFamily";
import * as globals from "../utils/Globals";
import SnapchatLogin from "react-native-snapchat-login";
import { ComponentStyle } from "../assets/styles/ComponentStyle";

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
  // performSnapchatLogin = () => {
  //   SnapchatLogin.login().then((r2) => {
  //     console.log("login");
  //     console.log(r2);
  //     Alert.alert("login:", r2);
  //   });
  // };

  // performSnapchatGetInfo = () => {
  //   SnapchatLogin.getUserInfo().then((value) => {
  //     console.log("getUserInfo");
  //     console.log(value);
  //     Alert.alert("getUserInfo:", value);
  //   });
  // };

  // navigate Social Profiles
  navigatetoSocialProfiles = (isFrom, name) => {
    let SocialURL;

    if (isFrom == "Snap") {
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
          onPress={() =>
            this.navigatetoSocialProfiles(this.props.isFrom, this.props.URL)
          }
        /> */}
        <TouchableOpacity
          // onPress={() => this.instagramLogin.show()}
          onPress={() =>
            this.navigatetoSocialProfiles(this.props.isFrom, this.props.URL)
          }
          style={ComponentStyle.snapIconContainerView}
        >
          <FastImage
            style={[ComponentStyle.instaiconstyle]}
            source={IMAGE.snap_img}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
        <View style={ComponentStyle.snapInputContainerView}>
          <TextInput
            style={ComponentStyle.snapButtonText}
            placeholder={"Enter Snapchat Username"}
            placeholderTextColor={Colors.black}
            value={this.props.value}
            onChangeText={this.props.onChangeText}
            autoCapitalize="none"
            autoCompleteType="username"
          />
        </View>
      </View>
    );
  }
}
export default SnapchatIntegration;
