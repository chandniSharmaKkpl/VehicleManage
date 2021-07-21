import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { AuthStyle } from "../../assets/styles/AuthStyle";
import { connect } from "react-redux";
import Colors from "../../assets/Colors";
import { StaticTitle } from "../../utils/StaticTitle";
import PrimaryButton from "../../components/PrimaryButton";
import FBLogin from "../../components/FBLogin";
import GoogleLogin from "../../components/GoogleLogin";
import NavigationService from "../../utils/NavigationService";

const logo_img = require("../../assets/images/roadie_logo.png");
const car_img = require("../../assets/images/car_bg.png");
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
        <View style={AuthStyle.logincontainer}>
          <View style={AuthStyle.imglogoContainer}>
            <Image source={logo_img} style={AuthStyle.imglogo} />
          </View>

          <View style={AuthStyle.imgcarContainer}>
            <Image source={car_img} style={AuthStyle.imgcar} />
          </View>

          <View style={AuthStyle.titleContainer}>
            <Text style={AuthStyle.titleText}>{StaticTitle.login}</Text>
          </View>

          <View style={AuthStyle.loginContainer}>
            <FBLogin />
            <GoogleLogin />
            <View style={AuthStyle.lineViewContainer}>
              <View style={AuthStyle.lineContainer}></View>
              <Text style={AuthStyle.smallText}>{StaticTitle.or}</Text>
              <View style={AuthStyle.lineContainer}></View>
            </View>
            <PrimaryButton
              btnName={StaticTitle.loginwithEmail}
              onPress={() => this.performLoginwithEmail()}
            />
          </View>

          <View style={AuthStyle.bottomContainer}>
            <Text style={AuthStyle.smallNewAppText}>{StaticTitle.newApp}</Text>
            <TouchableOpacity onPress={() => this.gotoSignUpscreen()}>
              <Text style={AuthStyle.smallSignupText}>
                {StaticTitle.signup}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

// const mapStateToProps = (state) => {};

// const mapDispatchToProps = (dispatch) => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
export default LoginScreen;
