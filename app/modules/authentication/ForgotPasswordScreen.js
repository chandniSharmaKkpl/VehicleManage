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
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { connect } from "react-redux";
import { AuthStyle } from "../../assets/styles/AuthStyle";
import { StaticTitle } from "../../utils/StaticTitle";
import { Input, PrimaryButton, Loader } from "../../components";
import NavigationService from "../../utils/NavigationService";
import * as globals from "../../utils/Globals";
import { isEmpty, isEmail } from "../../utils/Validators";
import { Messages } from "../../utils/Messages";
import { IMAGE } from "../../assets/Images";
import { NavigationEvents } from "react-navigation";
import { showMessage, hideMessage } from "react-native-flash-message";
import * as actions from "./redux/Actions";

const TAG = "ForgotPasswordScreen ::=";

export class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { txtEmail: "", isEmailError: false, emailValidMsg: "" };
  }

  componentDidMount() {}

  // clear States before leave this screen
  clearStates = () => {
    this.setState({
      txtEmail: "",
      isEmailError: false,
      emailValidMsg: "",
    });
  };

  // sign in navigate to signin screen
  gotoSigninscreen = () => {
    NavigationService.navigate("SignIn");
  };

  // Check all validation in this function if all values validate after the call forgotpassword API
  PerformForgotPassAPI = () => {
    if (!this.checkValidation()) {
      return;
    }
    Keyboard.dismiss();
    this.forgotPasswordAPICall();
  };

  // API CALL
  forgotPasswordAPICall = async () => {
    const { txtEmail, txtPassword } = this.state;
    let params = new URLSearchParams();
    // Collect the necessary params
    params.append("email", txtEmail);

    const { forgotpassword } = this.props;
    if (globals.isInternetConnected == true) {
      forgotpassword(params)
        .then(async (res) => {
          // console.log("res=====forgotpassword", JSON.stringify(res.value.data));
          if (res.value && res.value.data.success == true) {
            //OK 200 The request was fulfilled
            if (res.value && res.value.status === 200) {
              await showMessage({
                message: res.value.data.message,
                type: "success",
                icon: "info",
                duration: 4000,
              });
              NavigationService.navigate("SignIn");
            } else {
              this.setState({
                emailValidMsg: res.value.data.email,
                isEmailError: true,
              });
            }
          } else {
            if (res.value && res.value.data.error == "Unauthenticated.") {
              {
                NavigationService.navigate("Login");
              }
            } else if (res.value && res.value.data.email) {
              await showMessage({
                message: res.value.data.email,
                type: "danger",
                icon: "info",
                duration: 4000,
              });
            }
          }
        })
        .catch((err) => {
          console.log(TAG, "i am in catch error forgot passeord", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  // start of validation
  checkValidation = () => {
    const { txtEmail } = this.state;
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

    return true;
  };

  render() {
    const { isLoading, loaderMessage, theme } = this.props;
    return (
      <>
        <View
          style={[
            AuthStyle.container,
            { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
          ]}
        >
          {isLoading && (
            <Loader isOverlay={true} loaderMessage={loaderMessage} />
          )}
          <NavigationEvents onWillBlur={() => this.clearStates()} />
          <TouchableWithoutFeedback
            accessible={false}
            onPress={() => Keyboard.dismiss()}
          >
            <View style={AuthStyle.onlyFlex}>
              <View style={AuthStyle.imglogoContainer}>
                <Image
                  source={
                    theme.mode == "dark" ? IMAGE.dark_Logo_img : IMAGE.logo_img
                  }
                  style={AuthStyle.imglogo}
                />
              </View>

              <View style={AuthStyle.imgcarContainer}>
                <Image
                  source={
                    theme.mode == "dark" ? IMAGE.dark_Car_img : IMAGE.car_img
                  }
                  style={AuthStyle.imgcar}
                />
              </View>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={[
                  AuthStyle.bottomCurve,
                  { backgroundColor: theme.CURVE_BG_COLORS },
                ]}
              >
                <ScrollView
                  ref={(node) => (this.scroll = node)}
                  automaticallyAdjustContentInsets={true}
                  enableOnAndroid={true}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="never"
                  style={{
                    flex: 1,
                    marginTop: globals.deviceHeight * 0.015,
                  }}
                >
                  <View>
                    <View style={AuthStyle.titleviewStyle}>
                      <Text
                        style={[AuthStyle.titleText, { textAlign: "left" }]}
                      >
                        {StaticTitle.forgotPassword}
                      </Text>
                    </View>
                    <Input
                      theme={theme}
                      value={this.state.txtEmail}
                      placeholderText={StaticTitle.enterUsaerName}
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      returnKeyType="done"
                      autoFocus={true}
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

                    <View style={AuthStyle.signinbtnView}>
                      <PrimaryButton
                        btnName={StaticTitle.continue}
                        onPress={() => this.PerformForgotPassAPI()}
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

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.user.isLoading,
    loaderMessage: state.auth.user.loaderMessage,
    theme: state.auth.user.theme,
  };
};
const mapDispatchToProps = (dispatch) => ({
  forgotpassword: (params) => dispatch(actions.forgotpassword(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordScreen);
