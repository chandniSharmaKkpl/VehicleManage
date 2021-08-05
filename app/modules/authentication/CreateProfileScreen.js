import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { connect } from "react-redux";
import { AuthStyle } from "../../assets/styles/AuthStyle";
import { StaticTitle } from "../../utils/StaticTitle";
import { Input, PrimaryButton, Loader } from "../../components";
import NavigationService from "../../utils/NavigationService";
import * as globals from "../../utils/Globals";
import { isEmpty, isText } from "../../utils/Validators";
import { Messages } from "../../utils/Messages";
import { IMAGE } from "../../assets/Images";
import { NavigationEvents } from "react-navigation";
import * as actions from "./redux/Actions";
import { showMessage, hideMessage } from "react-native-flash-message";

const TAG = "CreateProfileScreen ::=";

export class CreateProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //initialize variable
      txtUserName: "",
      txtCity: "",
      txtModalofCar: "",
      txtColorofCar: "",
      txtDescription: "",

      isUserNameError: false,
      isCityError: false,
      isModalofCarError: false,
      isColorofCarError: false,
      isDescriptionError: false,

      userNameValidMsg: "",
      cityValidMsg: "",
      modalofCarValidMsg: "",
      colorofCarValidMsg: "",
      descriptionValidMsg: "",
    };
    this.input = {};
  }

  // Focus on next input
  focusNextTextField = (ref) => {
    this.input[ref].focus();
  };

  // clear States before leave this screen
  clearStates = () => {
    this.setState({
      txtUserName: "",
      txtCity: "",
      txtModalofCar: "",
      txtColorofCar: "",
      txtDescription: "",

      isUserNameError: false,
      isCityError: false,
      isModalofCarError: false,
      isColorofCarError: false,
      isDescriptionError: false,

      userNameValidMsg: "",
      cityValidMsg: "",
      modalofCarValidMsg: "",
      colorofCarValidMsg: "",
      descriptionValidMsg: "",
    });
  };

  // create a new profile after check validation's
  createProfile = () => {
    if (!this.checkValidation()) {
      return;
    }
    Keyboard.dismiss();
    this.createProfileAPICall();
  };

  createProfileAPICall = () => {
    const {
      txtUserName,
      txtCity,
      txtColorofCar,
      txtModalofCar,
      txtDescription,
    } = this.state;
    let params = new URLSearchParams();
    // Collect the necessary params
    params.append("username", txtUserName);
    params.append("city", txtCity);
    params.append("car_make_model", txtModalofCar);
    params.append("car_colour", txtColorofCar);
    params.append("car_description", txtDescription);

    const { createprofile } = this.props;
    createprofile(params)
      .then(async (res) => {
        console.log("res.value.data===", res.value.data);
        if (res.value && res.value.data.success == true) {
          //OK 200 The request was fulfilled
          if (res.value && res.value.status === 200) {
            await showMessage({
              message: res.value.data.message,
              type: "success",
              icon: "info",
              duration: 4000,
            });
            NavigationService.navigate("CreateSocialMediaProfile");
          } else {
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
    const { txtUserName, txtCity, txtColorofCar, txtModalofCar } = this.state;
    if (isEmpty(txtUserName)) {
      this.setState({
        isUserNameError: true,
        userNameValidMsg: Messages.enterUsername,
      });
      return false;
    }
    if (!isText(txtUserName)) {
      this.setState({
        isUserNameError: true,
        userNameValidMsg: Messages.userNameFail,
      });
      return false;
    }
    if (!isEmpty(txtCity) && !isText(txtCity)) {
      this.setState({
        isCityError: true,
        cityValidMsg: Messages.cityFail,
      });
      return false;
    }

    if (!isEmpty(txtModalofCar) && !isText(txtModalofCar)) {
      this.setState({
        isModalofCarError: true,
        modalofCarValidMsg: Messages.modalFail,
      });
      return false;
    }

    if (!isEmpty(txtColorofCar) && !isText(txtColorofCar)) {
      this.setState({
        isColorofCarError: true,
        colorofCarValidMsg: Messages.colorFail,
      });
      return false;
    }

    return true;
  };

  // get car model from API
  getcarModels = async (text) => {
    const { txtModalofCar } = this.state;
    await this.setState({
      txtModalofCar: text,
      isModalofCarError: false,
    });
    if (isText(txtModalofCar)) {
      const { getcarmodel } = this.props;
      getcarmodel(text).then((res) => {
        console.warn("i am in res.data ===>", JSON.stringify(res.value));
      });
    }
    
  };

  render() {
    const { isLoading, loaderMessage } = this.props;

    return (
      <>
        <View style={AuthStyle.container}>
          {console.log("carModels--", this.props.carModels)}
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
                    <View
                      style={[AuthStyle.titleviewStyle, { marginBottom: 10 }]}
                    >
                      <Text
                        style={[AuthStyle.titleText, { textAlign: "left" }]}
                      >
                        {StaticTitle.createProfile}
                      </Text>
                    </View>
                    <Input
                      value={this.state.txtUserName}
                      inputStyle={{ marginTop: 0 }}
                      placeholderText={StaticTitle.enterUserName}
                      onSubmitEditing={() => this.focusNextTextField("txtCity")}
                      blurOnSubmit={false}
                      autoFocus={true}
                      returnKeyType="next"
                      autoCapitalize={"none"}
                      maxLength={26}
                      minLength={3}
                      isValidationShow={this.state.isUserNameError}
                      validateMesssage={this.state.userNameValidMsg}
                      onChangeText={(text) =>
                        this.setState({
                          txtUserName: text,
                          isUserNameError: false,
                        })
                      }
                    />

                    <Input
                      value={this.state.txtCity}
                      placeholderText={StaticTitle.enterCity}
                      onSubmitEditing={() =>
                        this.focusNextTextField("txtModalofCar")
                      }
                      forwardRef={(ref) => {
                        (this.input.txtCity = ref),
                          this.input.txtCity &&
                            this.input.txtCity.setNativeProps({
                              style: { fontFamily: "Raleway-Regular" },
                            });
                      }}
                      blurOnSubmit={false}
                      maxLength={40}
                      minLength={3}
                      returnKeyType="next"
                      autoCapitalize={"none"}
                      isValidationShow={this.state.isCityError}
                      validateMesssage={this.state.cityValidMsg}
                      onChangeText={(text) =>
                        this.setState({
                          txtCity: text,
                          isCityError: false,
                        })
                      }
                    />
                    <Input
                      value={this.state.txtModalofCar}
                      placeholderText={StaticTitle.makeModal}
                      onSubmitEditing={() =>
                        this.focusNextTextField("txtColorofCar")
                      }
                      forwardRef={(ref) => {
                        (this.input.txtModalofCar = ref),
                          this.input.txtModalofCar &&
                            this.input.txtModalofCar.setNativeProps({
                              style: { fontFamily: "Raleway-Regular" },
                            });
                      }}
                      maxLength={40}
                      minLength={3}
                      blurOnSubmit={false}
                      returnKeyType="next"
                      autoCapitalize={"none"}
                      isValidationShow={this.state.isModalofCarError}
                      validateMesssage={this.state.modalofCarValidMsg}
                      onChangeText={(text) => this.getcarModels(text)}
                    />
                    <Input
                      value={this.state.txtColorofCar}
                      placeholderText={StaticTitle.enterColor}
                      onSubmitEditing={() =>
                        this.focusNextTextField("txtDescription")
                      }
                      forwardRef={(ref) => {
                        (this.input.txtColorofCar = ref),
                          this.input.txtColorofCar &&
                            this.input.txtColorofCar.setNativeProps({
                              style: { fontFamily: "Raleway-Regular" },
                            });
                      }}
                      maxLength={20}
                      minLength={3}
                      blurOnSubmit={false}
                      returnKeyType="next"
                      autoCapitalize={"none"}
                      isValidationShow={this.state.isColorofCarError}
                      validateMesssage={this.state.colorofCarValidMsg}
                      onChangeText={(text) =>
                        this.setState({
                          txtColorofCar: text,
                          isModalofCarError: false,
                        })
                      }
                    />

                    <Input
                      value={this.state.txtDescription}
                      placeholderText={StaticTitle.addDescription}
                      onSubmitEditing={Keyboard.dismiss}
                      forwardRef={(ref) => {
                        (this.input.txtDescription = ref),
                          this.input.txtDescription &&
                            this.input.txtDescription.setNativeProps({
                              style: { fontFamily: "Raleway-Regular" },
                            });
                      }}
                      blurOnSubmit={false}
                      returnKeyType="done"
                      autoCapitalize={"none"}
                      maxLength={280}
                      multiline={true}
                      numberOfLines={4}
                      isValidationShow={this.state.isDescriptionError}
                      validateMesssage={this.state.descriptionValidMsg}
                      onChangeText={(text) =>
                        this.setState({
                          txtDescription: text,
                          isDescriptionError: false,
                        })
                      }
                    />

                    <View
                      style={[AuthStyle.signinbtnView, { marginVertical: 15 }]}
                    >
                      <PrimaryButton
                        btnName={StaticTitle.continue}
                        onPress={() => this.createProfile()}
                      />
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
    carModels: state.auth.user.carModels,
    userDetails: state.auth.user.userDetails,
    isLoading: state.auth.user.isLoading,
    loaderMessage: state.auth.user.loaderMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createprofile: (params) => dispatch(actions.createprofile(params)),
  getcarmodel: (text) => dispatch(actions.getcarmodel(text)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProfileScreen);
