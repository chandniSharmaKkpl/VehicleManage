import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { connect } from "react-redux";
import { AuthStyle } from "../../assets/styles/AuthStyle";
import { StaticTitle } from "../../utils/StaticTitle";
import { PasswordInput, Input, PrimaryButton } from "../../components";
import NavigationService from "../../utils/NavigationService";
import Colors from "../../assets/Colors";
import * as globals from "../../utils/Globals";
import { isEmpty, isEmail } from "../../utils/Validators";
import { Messages } from "../../utils/Messages";

const logo_img = require("../../assets/images/roadie_logo.png");
const car_img = require("../../assets/images/car_bg.png");

const TAG = "SignInScreen ::=";

export class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //initialize variable
      txtEmail: "",
      txtPassword: "",
      isShowPassword: true,
      isEmailError: false,
      isPasswordError: false,
      emailValidMsg: "",
      passwdValidMsg: "",
    };
    this.input = {};
  }
  componentDidMount() {}

  // Focus on next input
  focusNextTextField = (ref) => {
    this.input[ref].focus();
  };

  // sign up(New Register) navigate to Login screen
  gotoLoginscreen = () => {
    NavigationService.navigate("Login");
  };

  // This function show/hide the password
  showPassword() {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  }

   // start of validation
  checkValidation = () => {
   const { txtEmail, txtPassword } = this.state;
   if (isEmpty(txtEmail)) {
     this.setState({
       isEmailError: true,
       emailValidMsg: Messages.email,
     });
     return false;
   }
   if (!isEmail(txtEmail)) {
     this.setState({
       isEmailError: true,
       emailValidMsg: Messages.emailValid,
     });
     return false;
   }
   if (isEmpty(txtPassword)) {
     this.setState({
       isPasswordError: true,
       passwdValidMsg: Messages.password,
     });
     return false;
   }

    return true;
  }

  // Check all validation in this function if all values validate after the call Login API
  gotoSignin = () => {
    if (!this.checkValidation()) {
      return
    }
  };

  render() {
    return (
      <>
        <View style={AuthStyle.container}>
          <TouchableWithoutFeedback
            accessible={false}
            onPress={() => Keyboard.dismiss()}
          >
            <View style={AuthStyle.onlyFlex}>
              <View style={AuthStyle.imglogoContainer}>
                <Image source={logo_img} style={AuthStyle.imglogo} />
              </View>

              <View style={AuthStyle.imgcarContainer}>
                <Image source={car_img} style={AuthStyle.imgcar} />
              </View>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={AuthStyle.bottomCurve}
              >
                <ScrollView
                  ref={(node) => (this.scroll = node)}
                  automaticallyAdjustContentInsets={true}
                  enableOnAndroid={true}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="never"
                  style={{ marginTop: globals.deviceHeight * 0.015 }}
                >
                  <View style={{ elevation: 2 }}>
                    <View style={AuthStyle.titleviewStyle}>
                      <Text
                        style={[AuthStyle.titleText, { textAlign: "left" }]}
                      >
                        {StaticTitle.signin}
                      </Text>
                    </View>
                    <Input
                      value={this.state.txtEmail}
                      placeholderText={StaticTitle.enterUsaerName}
                      onSubmitEditing={() =>
                        this.focusNextTextField("txtPassword")
                      }
                      blurOnSubmit={false}
                      returnKeyType="next"
                      autoCapitalize={"none"}
                      keyboardType={"email-address"}
                      isValidationShow={this.state.isEmailError}
                      validateMesssage={this.state.emailValidMsg}
                      onChangeText={(text) =>
                        this.setState({
                          txtEmail: text,
                          isEmailError: false,
                        })
                      }
                    />
                    <PasswordInput
                      value={this.state.txtPassword}
                      placeholderText={StaticTitle.enterPassword}
                      autoCapitalize={"none"}
                      forwardRef={(ref) => {
                        (this.input.txtPassword = ref),
                          this.input.txtPassword &&
                            this.input.txtPassword.setNativeProps({
                              style: { fontFamily: "Raleway-Regular" },
                            });
                      }}
                      isValidationShow={this.state.isPasswordError}
                      isPasswordError={this.state.isPasswordError}
                      secureTextEntry={this.state.isShowPassword}
                      validateMesssage={this.state.passwdValidMsg}
                      onPasswordShow={() => this.showPassword()}
                      onSubmitEditing={Keyboard.dismiss}
                      isVisible={this.state.isShowPassword}
                      returnKeyType="done"
                      onChangeText={(text) =>
                        this.setState({
                          txtPassword: text,
                          isPasswordError: false,
                        })
                      }
                    />
                    <View style={[AuthStyle.forgotPasswordContainer]}>
                      <TouchableOpacity>
                        <Text style={[AuthStyle.resetText]}>
                          {StaticTitle.forgotPassword}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={AuthStyle.signinbtnView}>
                      <PrimaryButton
                        btnName={StaticTitle.signin}
                        onPress={() => this.gotoSignin()}
                      />
                    </View>
                    <View style={AuthStyle.bottomsignin}>
                      <Text style={AuthStyle.smallNewAppText}>
                        {StaticTitle.backTo}
                      </Text>
                      <TouchableOpacity onPress={() => this.gotoLoginscreen()}>
                        <Text style={AuthStyle.smallSignupText}>
                          {StaticTitle.login}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </>
    );
  }
}

// const mapStateToProps = (state) => {};

// const mapDispatchToProps = (dispatch) => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
export default SignInScreen;
