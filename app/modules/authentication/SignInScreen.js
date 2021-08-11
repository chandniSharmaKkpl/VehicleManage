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
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { connect } from "react-redux";
import { AuthStyle } from "../../assets/styles/AuthStyle";
import { StaticTitle } from "../../utils/StaticTitle";
import { PasswordInput, Input, PrimaryButton, Loader } from "../../components";
import NavigationService from "../../utils/NavigationService";
import * as globals from "../../utils/Globals";
import {
  isEmpty,
  isEmail,
  isPasswordLength,
  isPassword,
} from "../../utils/Validators";
import { Messages } from "../../utils/Messages";
import { IMAGE } from "../../assets/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationEvents } from "react-navigation";
import * as actions from "./redux/Actions";
import { showMessage, hideMessage } from "react-native-flash-message";

const TAG = "SignInScreen ::=";

export class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //initialize variable
      txtEmail: "udattani@mailinator.com",
      txtPassword: "Abcd@1234",
      // txtEmail: "",
      // txtPassword: "",
      isShowPassword: true,
      isEmailError: false,
      isPasswordError: false,
      emailValidMsg: "",
      passwdValidMsg: "",
    };
    this.input = {};
  }

  componentDidMount = async () => {
    const fb_email = await AsyncStorage.getItem("FB_USEREMAIL");
  };

  // clear States before leave this screen
  clearStates = () => {
    this.setState({
      txtEmail: "",
      txtPassword: "",
      isShowPassword: true,
      isEmailError: false,
      isPasswordError: false,
      emailValidMsg: "",
      passwdValidMsg: "",
    });
  };

  // Focus on next input
  focusNextTextField = (ref) => {
    this.input[ref].focus();
  };

  // sign up(New Register) navigate to Login screen
  gotoLoginscreen = () => {
    NavigationService.navigate("Login");
  };

  // user forgot their password then go to ForgotPassword screen
  gotoForgotPasswordscreen = () => {
    NavigationService.navigate("ForgotPassword");
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

    if (!isPasswordLength(txtPassword)) {
      this.setState({
        isPasswordError: true,
        passwdValidMsg: Messages.passwordValidLength,
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

    return true;
  };

  // Check all validation in this function if all values validate after the call Login API
  gotoSignin = () => {
    if (!this.checkValidation()) {
      return;
    }
    Keyboard.dismiss();
    this.signinAPICall();
  };

  //Call API
  signinAPICall = async () => {
    const { txtEmail, txtPassword } = this.state;
    let params = new URLSearchParams();
    // Collect the necessary params
    params.append("email", txtEmail);
    params.append("password", txtPassword);

    const { login } = this.props;
    login(params)
      .then(async (res) => {
        if (res.value && res.value.data.success == true) {
          //OK 200 The request was fulfilled
          if (res.value && res.value.invalid_email) {
            this.setState({
              emailValidMsg: res.value.invalid_email,
              isEmailError: true,
            });
          } else if (res.value && res.value.invalid_password) {
            this.setState({
              isPasswordError: true,
              passwdValidMsg: res.value.invalid_password,
            });
          } else if (res.value && res.value.status === 200) {
            await showMessage({
              message: res.value.data.message,
              type: "success",
              icon: "info",
              duration: 4000,
            });

            this.gotoSaveToken(res.value.data.data.token);
            NavigationService.navigate("CreateProfile");
          } else {
            this.setState({
              isPasswordError: true,
              emailValidMsg: res.value.invalid_email,
              isEmailError: true,
              passwdValidMsg: res.value.invalid_password,
            });
          }
        } else {
          if (res.value && res.value.data.error) {
            await showMessage({
              message: res.value.message,
              type: "danger",
              icon: "info",
              duration: 4000,
            });
          }
        }
      })
      .catch((err) => {
        console.log("i am in catch error login", err);
      });
  };

  // save access token
  async gotoSaveToken(accessToken) {
    console.log(TAG, "access_token=====", accessToken);
    await AsyncStorage.setItem("access_token", accessToken);
    globals.access_token = accessToken;
  }

  render() {
    const { isLoading, loaderMessage } = this.props;
    return (
      <>
        <View style={AuthStyle.container}>
          {isLoading && (
            <Loader isOverlay={true} loaderMessage={loaderMessage} />
          )}
          <NavigationEvents onWillBlur={() => this.clearStates()} />
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <TouchableWithoutFeedback
            accessible={false}
            onPress={() => Keyboard.dismiss()}
          >
            <View style={AuthStyle.onlyFlex}>
              <View style={AuthStyle.imglogoContainer}>
                <Image source={IMAGE.logo_img} style={AuthStyle.imglogo} />
              </View>

              <View style={AuthStyle.imgcarContainer}>
                <Image source={IMAGE.car_img} style={AuthStyle.imgcar} />
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
                  <View>
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
                      autoFocus={true}
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
                      <TouchableOpacity
                        onPress={() => this.gotoForgotPasswordscreen()}
                      >
                        <Text style={[AuthStyle.resetText]}>
                          {StaticTitle.forgotPasswordSignin}
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

const mapStateToProps = (state) => {
  return {
    userDetails: state.auth.user.userDetails,
    isLoading: state.auth.user.isLoading,
    loaderMessage: state.auth.user.loaderMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  login: (params) => dispatch(actions.login(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
