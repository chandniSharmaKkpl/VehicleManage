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
import { PasswordInput, Input, PrimaryButton } from "../../components";
import NavigationService from "../../utils/NavigationService";
import * as globals from "../../utils/Globals";
import { isEmpty, isPassword, isPasswordLength } from "../../utils/Validators";
import { Messages } from "../../utils/Messages";
import { IMAGE } from "../../assets/Images";
import { NavigationEvents } from "react-navigation";

const TAG = "ResetPasswordScreen ::=";

export class ResetPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtConfirmCode: "",
      txtConfirmPassword: "",
      isShowConfirmPassword: true,
      isConfirmCodeError: false,
      isConfirmPasswordError: false,
      ConfirmCodeValidMsg: "",
      confirmPasswordValidMsg: "",
    };
    this.input = {};
  }

  componentDidMount() {}

  // clear States before leave this screen
  clearStates = () => {
    this.setState({
      txtConfirmCode: "",
      txtConfirmPassword: "",
      isShowConfirmPassword: true,
      isConfirmCodeError: false,
      isConfirmPasswordError: false,
      ConfirmCodeValidMsg: "",
      confirmPasswordValidMsg: "",
    });
  };

  // Focus on next input
  focusNextTextField = (ref) => {
    this.input[ref].focus();
  };

  // sign in navigate to signin screen
  gotoSigninscreen = () => {
    NavigationService.navigate("SignIn");
  };

  // This function show/hide the Confirm password
  showConfirmPassword = () => {
    this.setState({
      isShowConfirmPassword: !this.state.isShowConfirmPassword,
    });
  };

  // check validation and perform Reset password API
  PerformResetpasswordAPI = () => {
    if (!this.checkValidation()) {
      return;
    }
    NavigationService.navigate("SignIn");
  };

  // start of validation
  checkValidation = () => {
    const { txtConfirmPassword } = this.state;

    if (isEmpty(txtConfirmPassword)) {
      this.setState({
        isConfirmPasswordError: true,
        confirmPasswordValidMsg: Messages.newPassword,
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

    if (!isPassword(txtConfirmPassword)) {
      this.setState({
        isConfirmPasswordError: true,
        confirmPasswordValidMsg: Messages.passwordValid,
      });
      return false;
    }

    return true;
  };

  render() {
    return (
      <>
        <View style={AuthStyle.container}>
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
                style={[AuthStyle.bottomCurve, {}]}
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
                        {StaticTitle.resetpassword}
                      </Text>
                    </View>
                    <Input
                      value={this.state.txtConfirmCode}
                      placeholderText={StaticTitle.confirmationCode}
                      onSubmitEditing={() =>
                        this.focusNextTextField("txtConfirmPassword")
                      }
                      forwardRef={(ref) => {
                        (this.input.txtConfirmCode = ref),
                          this.input.txtConfirmCode &&
                            this.input.txtConfirmCode.setNativeProps({
                              style: { fontFamily: "Raleway-Regular" },
                            });
                      }}
                      blurOnSubmit={false}
                      returnKeyType="next"
                      autoCapitalize={"none"}
                      maxLength={26}
                      autoFocus={true}
                      minLength={2}
                      isValidationShow={this.state.isConfirmCodeError}
                      validateMesssage={this.state.ConfirmCodeValidMsg}
                      onChangeText={(text) =>
                        this.setState({
                          txtConfirmCode: text,
                          isConfirmCodeError: false,
                        })
                      }
                    />
                    <PasswordInput
                      theme={theme}
                      value={this.state.txtConfirmPassword}
                      placeholderText={StaticTitle.enternewpassword}
                      autoCapitalize={"none"}
                      forwardRef={(ref) => {
                        (this.input.txtConfirmPassword = ref),
                          this.input.txtConfirmPassword &&
                            this.input.txtConfirmPassword.setNativeProps({
                              style: { fontFamily: "Raleway-Regular" },
                            });
                      }}
                      onSubmitEditing={Keyboard.dismiss}
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

                    <View style={AuthStyle.signinbtnView}>
                      <PrimaryButton
                        btnName={StaticTitle.resetpassword}
                        onPress={() => this.PerformResetpasswordAPI()}
                      />
                    </View>
                    <View style={AuthStyle.bottomsignin}>
                      <Text
                        style={[
                          AuthStyle.smallNewAppText,
                          { color: theme.PRIMARY_TEXT_COLOR },
                        ]}
                      >
                        {StaticTitle.backTo}
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

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ResetPasswordScreen);
export default ResetPasswordScreen;
