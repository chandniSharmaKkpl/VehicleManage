import React, { Component } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { AuthStyle } from "../../assets/styles/AuthStyle";
import { connect } from "react-redux";
import { StaticTitle } from "../../utils/StaticTitle";
import PrimaryButton from "../../components/PrimaryButton";
import FBLogin from "../../components/FBLogin";
import GoogleLogin from "../../components/GoogleLogin";
import NavigationService from "../../utils/NavigationService";
import { IMAGE } from "../../assets/Images";
import * as globals from "../../utils/Globals";

const TAG = "LoginScreen ::=";

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Login with Email navigate to sign in screen
  performLoginwithEmail = () => {
    NavigationService.navigate("SignIn");
  };

  // sign up(New Register) navigate to sign up screen
  gotoSignUpscreen = () => {
    NavigationService.navigate("SignUp");
  };

  render() {
    return (
      <>
        <View style={AuthStyle.onlyFlex}>
          <View style={AuthStyle.imglogoContainer}>
            <Image source={IMAGE.logo_img} style={AuthStyle.imglogo} />
          </View>

          <View style={AuthStyle.imgcarContainer}>
            <Image source={IMAGE.car_img} style={AuthStyle.imgcar} />
          </View>

          <View style={AuthStyle.titleContainer}>
            <Text style={AuthStyle.titleText}>{StaticTitle.login}</Text>
          </View>
          <ScrollView  ref={(node) => (this.scroll = node)}
            automaticallyAdjustContentInsets={true}
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="never" style={[AuthStyle.onlyFlex, {marginBottom:globals.deviceHeight * 0.06}]}>
            <View style={AuthStyle.onlyFlex}>
              <FBLogin />
              <GoogleLogin />
              <View style={AuthStyle.lineViewContainer}>
                <View style={AuthStyle.lineContainer}></View>
                <Text style={AuthStyle.smallText}>{StaticTitle.or}</Text>
                <View style={AuthStyle.lineContainer}></View>
              </View>
              <View style={[AuthStyle.signinbtnView, { paddingVertical: 0 }]}>
                <PrimaryButton
                  btnName={StaticTitle.loginwithEmail}
                  onPress={() => this.performLoginwithEmail()}
                />
              </View>
            </View>

            <View style={AuthStyle.bottomContainer}>
              <Text style={AuthStyle.smallNewAppText}>
                {StaticTitle.newApp}
              </Text>
              <TouchableOpacity onPress={() => this.gotoSignUpscreen()}>
                <Text style={AuthStyle.smallSignupText}>
                  {StaticTitle.signup}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}

// const mapStateToProps = (state) => {};

// const mapDispatchToProps = (dispatch) => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
export default LoginScreen;
