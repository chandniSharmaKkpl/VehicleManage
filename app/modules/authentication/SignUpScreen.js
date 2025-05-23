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
  StatusBar,
  Linking,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { AuthStyle } from "../../assets/styles/AuthStyle";
import { StaticTitle } from "../../utils/StaticTitle";
import {
  PasswordInput,
  Input,
  PrimaryButton,
  InputWithIcon,
  Loader,
} from "../../components";
import NavigationService from "../../utils/NavigationService";
import * as globals from "../../utils/Globals";
import { NavigationEvents } from "react-navigation";
import * as actions from "./redux/Actions";
import { showMessage, hideMessage } from "react-native-flash-message";
import { termsCondURL } from "../../config/BaseURL";

import {
  isEmpty,
  isEmail,
  isPassword,
  isValidComparedPassword,
  isName,
  isPasswordLength,
  onlycharandnum,
} from "../../utils/Validators";
import moment from "moment";
import DateTimePickerModal from "../../libs/react-native-modal-datetime-picker";
import { Messages } from "../../utils/Messages";
import { IMAGE } from "../../assets/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TAG = "SignUpScreen ::=";

export class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //initialize variable

      // txtEmail: "we@mailinator.com",
      // txtFirstName: "new",
      // txtLastName: "one",
      // txtPassword: "Abcd@1234",
      // txtConfirmPassword: "Abcd@1234",
      // txtDob: "",

      txtEmail: "",
      txtFirstName: "",
      txtLastName: "",
      txtPassword: "",
      txtConfirmPassword: "",
      txtDob: "",

      isShowPassword: true,
      isShowConfirmPassword: true,
      isDatePickerVisible: false,

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

  // clear States before leave this screen
  clearStates = () => {
    this.setState({
      txtEmail: "",
      txtFirstName: "",
      txtLastName: "",
      txtPassword: "",
      txtConfirmPassword: "",
      txtDob: "",

      isShowPassword: true,
      isShowConfirmPassword: true,
      isDatePickerVisible: false,

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
    });
  };

  /**
   * Method for term&condition open in default browser
   */
  handletermconditionClick = () => {
    NavigationService.navigate("TermsCondition");
  };

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
  gotoSignup = async () => {
    if (!this.checkValidation()) {
      return;
    }
    Keyboard.dismiss();
    this.sighUpAPIcall();
    // NavigationService.navigate("CreateProfile");
  };

  //Call API
  sighUpAPIcall = async () => {
    const {
      txtEmail,
      txtFirstName,
      txtLastName,
      txtPassword,
      txtConfirmPassword,
      txtDob,
    } = this.state;
    let params = new URLSearchParams();
    // Collect the necessary params
    params.append("name", txtFirstName);
    params.append("surname", txtLastName);
    params.append("email", txtEmail);
    params.append("password", txtPassword);
    params.append("password_confirm", txtConfirmPassword);
    params.append("birth_date", txtDob);

    const { registeruser } = this.props;
    if (globals.isInternetConnected == true) {
      registeruser(params)
        .then(async (res) => {
          if (res.value.data.success == true) {
            //OK 200 The request was fulfilled
            if (res.value && res.value.invalid_password) {
              this.setState({
                isPasswordError: true,
                passwdValidMsg: res.value.invalid_password,
              });
            } else if (res.value && res.value.status === 200) {
              await showMessage({
                message: res.value.data.message,
                type: "success",
                icon: "auto",
                duration: 4000,
              });
              this.gotoSaveToken(res.value.data.data.token);
              NavigationService.navigate("SignIn");
            } else {
              this.setState({
                isPasswordError: true,
                emailValidMsg: res.value.data.email,
                isEmailError: true,
                passwdValidMsg: res.value.invalid_password,
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
                icon: "auto",
                duration: 4000,
              });
              this.setState({
                emailValidMsg: res.value.data.email,
                isEmailError: true,
              });
            }
          }
        })
        .catch((err) => {
          console.log("i am in catch error registerUser", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  // save access token
  async gotoSaveToken(accessToken) {
    await AsyncStorage.setItem("access_token", accessToken);
    globals.access_token = accessToken;
  }

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

    if (!onlycharandnum(txtFirstName)) {
      this.setState({
        isFirstNameError: true,
        firstNameValidMsg: Messages.nameFail,
      });
      return false;
    }

    if (isEmpty(txtLastName)) {
      this.setState({
        isLastNameError: true,
        lastNameValidMsg: Messages.lname,
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

    if (!onlycharandnum(txtLastName)) {
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
    // if (!onlycharandnum(txtPassword)) {
    //   this.setState({
    //     isPasswordError: true,
    //     passwdValidMsg: Messages.passwordValid,
    //   });
    //   return false;
    // }
    // if (!onlycharandnum(txtConfirmPassword)) {
    //   this.setState({
    //     isConfirmPasswordError: true,
    //     confirmPasswordValidMsg: Messages.passwordValid,
    //   });
    //   return false;
    // }
    if (!isPassword(txtPassword)) {
      this.setState({
        isPasswordError: true,
        passwdValidMsg: Messages.passwordValid,
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
    if (isEmpty(txtDob)) {
      this.setState({
        isDobError: true,
        dobValidMsg: Messages.enterDob,
      });
      return false;
    }
    if (!isEmpty(txtDob)) {
      let replaceDate = txtDob.replace("-", "");
      let age = moment().diff(moment(replaceDate, "DDMMYYYY"), "years");
      if (age < 13) {
        this.setState({
          isDobError: true,
          dobValidMsg: Messages.dobFail,
        });
        return false;
      } else {
        return true;
      }
    }

    return true;
  };

  // show Date Picker
  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  // hide Date Picker
  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  // set Date choose from, picker
  handleConfirm = (date) => {
    this.setState({
      isDatePickerVisible: false,
      txtDob: moment(date).format("DD-MM-YYYY"),
      isDobError: false,
    });
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
                  style={{ marginTop: globals.deviceHeight * 0.015 }}
                >
                  <View>
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
                      theme={theme}
                      value={this.state.txtFirstName}
                      inputStyle={{ marginTop: 0 }}
                      placeholderText={StaticTitle.enterFirstName}
                      onSubmitEditing={() =>
                        this.focusNextTextField("txtLastName")
                      }
                      blurOnSubmit={false}
                      returnKeyType="next"
                      autoFocus={true}
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
                      theme={theme}
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
                      theme={theme}
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
                      theme={theme}
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
                      returnKeyType="next"
                      onChangeText={(text) =>
                        this.setState({
                          txtPassword: text,
                          isPasswordError: false,
                        })
                      }
                    />
                    <PasswordInput
                      theme={theme}
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
                      returnKeyType="next"
                      onChangeText={(text) =>
                        this.setState({
                          txtConfirmPassword: text,
                          isConfirmPasswordError: false,
                        })
                      }
                    />
                    <InputWithIcon
                      theme={theme}
                      onPressIcon={() => this.showDatePicker()}
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
                    <DateTimePickerModal
                      isVisible={this.state.isDatePickerVisible}
                      mode={"date"}
                      date={
                        this.state.txtDob != ""
                          ? moment(this.state.txtDob, "DD-MM-YYYY").toDate()
                          : new Date()
                      }
                      onConfirm={this.handleConfirm}
                      onCancel={this.hideDatePicker}
                      maximumDate={new Date()}
                    />

                    <View style={AuthStyle.signinbtnView}>
                      <Text
                        style={[
                          AuthStyle.smallNewAppText,
                          { color: theme.PRIMARY_TEXT_COLOR },
                        ]}
                      >
                        {StaticTitle.termAndConditionText}
                        <TouchableOpacity
                          onPress={() => this.handletermconditionClick()}
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
                        style={[
                          AuthStyle.smallNewAppText,
                          { color: theme.PRIMARY_TEXT_COLOR },
                        ]}
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
                      <Text
                        style={[
                          AuthStyle.smallNewAppText,
                          { color: theme.PRIMARY_TEXT_COLOR },
                        ]}
                      >
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

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.user.isLoading,
    loaderMessage: state.auth.user.loaderMessage,
    theme: state.auth.user.theme,
  };
};

const mapDispatchToProps = (dispatch) => ({
  registeruser: (formData) => dispatch(actions.registeruser(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
