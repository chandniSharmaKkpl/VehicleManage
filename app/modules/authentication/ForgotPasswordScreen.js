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
import { Input, PrimaryButton } from "../../components";
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
    forgotpassword(params)
      .then(async (res) => {
        if (res.value && res.value.data.success == true) {
          //OK 200 The request was fulfilled
          if (res.value && res.value.invalid_email) {
            this.setState({
              emailValidMsg: res.value.invalid_email,
              isEmailError: true,
            });
          } else if (res.value && res.value.status === 200) {
            await showMessage({
              message: res.value.data.message,
              type: "success",
              icon: "info",
              duration: 4000,
            });
            NavigationService.navigate("SignIn");
          } else {
            this.setState({
              emailValidMsg: res.value.invalid_email,
              isEmailError: true,
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
    return (
      <>
        <View style={AuthStyle.container}>
          <NavigationEvents onWillBlur={() => this.clearStates()} />
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
                style={[AuthStyle.bottomCurve]}
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
                      <Text style={AuthStyle.smallNewAppText}>
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
    userDetails: state.auth.user.userDetails,
    isLoading: state.auth.user.isLoading,
    loaderMessage: state.auth.user.loaderMessage,
  };
};
const mapDispatchToProps = (dispatch) => ({
  forgotpassword: (params) => dispatch(actions.forgotpassword(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordScreen);
