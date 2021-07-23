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
import {
  PasswordInput,
  Input,
  PrimaryButton,
  InputWithIcon,
} from "../../components";
import NavigationService from "../../utils/NavigationService";
import Colors from "../../assets/Colors";
import * as globals from "../../utils/Globals";
import {
  isEmpty,
  isEmail,
  isPassword,
  isValidComparedPassword,
  isName,
  isPasswordLength,
  getAge
} from "../../utils/Validators";
import { Messages } from "../../utils/Messages";
const logo_img = require("../../assets/images/roadie_logo.png");
const car_img = require("../../assets/images/car_bg.png");

const TAG = "SignUpScreen ::=";

export class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //initialize variable
      txtEmail: "",
      txtFirstName: "",
      txtLastName: "",
      txtPassword: "",
      txtConfirmPassword: "",
      txtDob: "",

      isShowPassword: true,
      isShowConfirmPassword: true,

      isEmailError: false,
      isFirstNameError: false,
      isLastNameError: false,
      isPasswordError: false,
      isConfirmPasswordError: false,
      isDobError: false,

      emailValidMsg: "",
      firstNameValidMsg: "",
      lastNameValidMsg: "",
      passwdValidMsg: "",
      confirmPasswordValidMsg: "",
      dobValidMsg: "",
    };
    this.input = {};
  }

  componentDidMount() {}

  // Focus on next input
  focusNextTextField = (ref) => {
    this.input[ref].focus();
  };

  // sign up(New Register) navigate to Login screen
  gotoSigninscreen = () => {
    NavigationService.navigate("SignIn");
  };

  // This function show/hide the password
  showPassword() {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  }

  // This function show/hide the Confirm password
  showConfirmPassword() {
    this.setState({
      isShowConfirmPassword: !this.state.isShowConfirmPassword,
    });
  }

  // Check all validation in this function, if all values validate after the call Register API
  gotoSignup = () => {
    if (!this.checkValidation()) {
      return;
    }
  };

  // start of validation
  checkValidation = () => {
    const {
      txtEmail,
      txtFirstName,
      txtLastName,
      txtPassword,
      txtConfirmPassword,
      txtDob,
    } = this.state;
    if (isEmpty(txtFirstName)) {
      this.setState({
        isFirstNameError: true,
        firstNameValidMsg: Messages.name,
      });
      return false;
    }
    if (!isName(txtFirstName)) {
      this.setState({
        isFirstNameError: true,
        firstNameValidMsg: Messages.nameFail,
      });
      return false;
    }
    if (isEmpty(txtLastName)) {
      this.setState({
        isLastNameError: true,
        lastNameValidMsg: Messages.name,
      });
      return false;
    }
    if (!isName(txtLastName)) {
      this.setState({
        isLastNameError: true,
        lastNameValidMsg: Messages.nameFail,
      });
      return false;
    }

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

    if (!isPasswordLength(txtPassword)) {
      this.setState({
        isPasswordError: true,
        passwdValidMsg: Messages.passwordValidLength,
      });
      return false;
    }
    if (!isPasswordLength(txtConfirmPassword)) {
      this.setState({
        isConfirmPasswordError: true,
        confirmPasswordValidMsg: Messages.passwordValidLength,
      });
      return false;
    }

    if (isEmpty(txtConfirmPassword)) {
      this.setState({
        isConfirmPasswordError: true,
        confirmPasswordValidMsg: Messages.confirmPassword,
      });
      return false;
    }

    if (!isPassword(txtPassword)) {
      this.setState({
        isPasswordError: true,
        passwdValidMsg: Messages.passwordValid,
      });
      return false;
    }
    if (!isPassword(txtConfirmPassword)) {
      this.setState({
        isConfirmPasswordError: true,
        confirmPasswordValidMsg: Messages.passwordValid,
      });
      return false;
    }
    if (isValidComparedPassword(txtPassword, txtConfirmPassword)) {
      this.setState({
        isConfirmPasswordError: true,
        confirmPasswordValidMsg: Messages.matchPassword,
      });
      return false;
    }
    // if(getAge(txtDob)){

    // }

    return true;
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
                    <View
                      style={[AuthStyle.titleviewStyle, { marginBottom: 10 }]}
                    >
                      <Text
                        style={[AuthStyle.titleText, { textAlign: "left" }]}
                      >
                        {StaticTitle.signup}
                      </Text>
                    </View>
                    <Input
                      value={this.state.txtFirstName}
                      inputStyle={{ marginTop: 0 }}
                      placeholderText={StaticTitle.enterFirstName}
                      onSubmitEditing={() =>
                        this.focusNextTextField("txtLastName")
                      }
                      blurOnSubmit={false}
                      returnKeyType="next"
                      autoCapitalize={"none"}
                      maxLength={26}
                      minLength={2}
                      isValidationShow={this.state.isFirstNameError}
                      validateMesssage={this.state.firstNameValidMsg}
                      onChangeText={(text) =>
                        this.setState({
                          txtFirstName: text,
                          isFirstNameError: false,
                        })
                      }
                    />

                    <Input
                      value={this.state.txtLastName}
                      placeholderText={StaticTitle.enterLastName}
                      onSubmitEditing={() =>
                        this.focusNextTextField("txtEmail")
                      }
                      forwardRef={(ref) => {
                        (this.input.txtLastName = ref),
                          this.input.txtLastName &&
                            this.input.txtLastName.setNativeProps({
                              style: { fontFamily: "Raleway-Regular" },
                            });
                      }}
                      blurOnSubmit={false}
                      returnKeyType="next"
                      autoCapitalize={"none"}
                      maxLength={26}
                      minLength={2}
                      isValidationShow={this.state.isLastNameError}
                      validateMesssage={this.state.lastNameValidMsg}
                      onChangeText={(text) =>
                        this.setState({
                          txtLastName: text,
                          isLastNameError: false,
                        })
                      }
                    />
                    <Input
                      value={this.state.txtEmail}
                      placeholderText={StaticTitle.enterUsaerName}
                      onSubmitEditing={() =>
                        this.focusNextTextField("txtPassword")
                      }
                      forwardRef={(ref) => {
                        (this.input.txtEmail = ref),
                          this.input.txtEmail &&
                            this.input.txtEmail.setNativeProps({
                              style: { fontFamily: "Raleway-Regular" },
                            });
                      }}
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
                      onSubmitEditing={() =>
                        this.focusNextTextField("txtConfirmPassword")
                      }
                      isValidationShow={this.state.isPasswordError}
                      isPasswordError={this.state.isPasswordError}
                      secureTextEntry={this.state.isShowPassword}
                      validateMesssage={this.state.passwdValidMsg}
                      onPasswordShow={() => this.showPassword()}
                      isVisible={this.state.isShowPassword}
                      returnKeyType="done"
                      onChangeText={(text) =>
                        this.setState({
                          txtPassword: text,
                          isPasswordError: false,
                        })
                      }
                    />
                    <PasswordInput
                      value={this.state.txtConfirmPassword}
                      placeholderText={StaticTitle.confirmPassword}
                      autoCapitalize={"none"}
                      forwardRef={(ref) => {
                        (this.input.txtConfirmPassword = ref),
                          this.input.txtConfirmPassword &&
                            this.input.txtConfirmPassword.setNativeProps({
                              style: { fontFamily: "Raleway-Regular" },
                            });
                      }}
                      onSubmitEditing={() => this.focusNextTextField("txtDob")}
                      isValidationShow={this.state.isConfirmPasswordError}
                      isPasswordError={this.state.isConfirmPasswordError}
                      secureTextEntry={this.state.isShowConfirmPassword}
                      validateMesssage={this.state.confirmPasswordValidMsg}
                      onPasswordShow={() => this.showConfirmPassword()}
                      isVisible={this.state.isShowConfirmPassword}
                      returnKeyType="done"
                      onChangeText={(text) =>
                        this.setState({
                          txtConfirmPassword: text,
                          isConfirmPasswordError: false,
                        })
                      }
                    />
                    <InputWithIcon
                      value={this.state.txtDob}
                      placeholderText={StaticTitle.enterDOB}
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      returnKeyType="done"
                      autoCapitalize={"none"}
                      forwardRef={(ref) => {
                        (this.input.txtDob = ref),
                          this.input.txtDob &&
                            this.input.txtDob.setNativeProps({
                              style: { fontFamily: "Raleway-Regular" },
                            });
                      }}
                      isValidationShow={this.state.isDobError}
                      validateMesssage={this.state.dobValidMsg}
                      onChangeText={(text) =>
                        this.setState({
                          txtDob: text,
                          isDobError: false,
                        })
                      }
                    />

                    <View style={AuthStyle.signinbtnView}>
                      <Text numberOfLines={1} style={AuthStyle.smallNewAppText}>
                        {StaticTitle.termAndConditionText}
                        <TouchableOpacity
                          style={AuthStyle.termAndConditionView}
                        >
                          <Text
                            style={[
                              AuthStyle.smallSignupText,
                              { textDecorationLine: "underline" },
                            ]}
                          >
                            {StaticTitle.termAndCondition}
                          </Text>
                        </TouchableOpacity>
                      </Text>

                      <Text
                        numberOfLines={2}
                        style={[AuthStyle.smallNewAppText]}
                      >
                        {StaticTitle.termAndConditionLast}
                      </Text>
                    </View>

                    <View style={AuthStyle.signinbtnView}>
                      <PrimaryButton
                        btnName={StaticTitle.signup}
                        onPress={() => this.gotoSignup()}
                      />
                    </View>

                    <View style={AuthStyle.bottomsignin}>
                      <Text style={AuthStyle.smallNewAppText}>
                        {StaticTitle.alreadyHaveAccount}
                      </Text>
                      <TouchableOpacity onPress={() => this.gotoSigninscreen()}>
                        <Text style={AuthStyle.smallSignupText}>
                          {StaticTitle.signin}
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

// const mapStateToProps = (state) => {

// };

// const mapDispatchToProps = (dispatch) => ({
// });

// export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
export default SignUpScreen;
