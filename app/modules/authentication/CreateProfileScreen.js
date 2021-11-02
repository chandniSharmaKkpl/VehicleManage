import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Platform,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { AuthStyle } from "../../assets/styles/AuthStyle";
import { StaticTitle } from "../../utils/StaticTitle";
import { Input, PrimaryButton, Loader, DropDownPicker } from "../../components";
import NavigationService from "../../utils/NavigationService";
import * as globals from "../../utils/Globals";
import { isEmpty, isText } from "../../utils/Validators";
import { Messages } from "../../utils/Messages";
import { IMAGE } from "../../assets/Images";
import { NavigationEvents } from "react-navigation";
import * as actions from "./redux/Actions";
import { showMessage, hideMessage } from "react-native-flash-message";
import Colors from "../../assets/Colors";

const TAG = "CreateProfileScreen ::=";

export class CreateProfileScreen extends PureComponent {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      //initialize variable
      cityList: [],
      carModelList: [],
      carColourList: [],

      selectedCity: "",
      selectedModel: "",
      selectedColour: "",

      txtUserName: "",

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

  componentDidMount = async () => {
    this._isMounted = true;
    let token = await AsyncStorage.getItem("access_token");
    globals.access_token = token;
    if (globals.isInternetConnected == true) {
      await this.getcarModelAPI();
      await this.getcarColourAPI();
      await this.getCityAPI();
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  /// get car model data from API
  getcarModelAPI = () => {
    const { getcarmodel } = this.props;
    getcarmodel().then((res) => {
      if (res.value && res.value.status === 200) {
        let modelDataList = res.value.data.data;
        if (this._isMounted) {
          this.setState({
            carModelList: modelDataList,
          });
        }
      } else {
        if (res.value && res.value.data.error == "Unauthenticated.") {
          {
            NavigationService.navigate("Login");
          }
        }
      }
    });
  };

  /// get car colour data from API
  getcarColourAPI = () => {
    const { getcarcolour } = this.props;

    getcarcolour().then((res) => {
      if (res.value && res.value.status === 200) {
        let colourDataList = res.value.data.data;
        if (this._isMounted) {
          this.setState({
            carColourList: colourDataList,
          });
        }
      } else {
        if (res.value && res.value.data.error == "Unauthenticated.") {
          {
            NavigationService.navigate("Login");
          }
        }
      }
    });
  };

  /// get city data from API
  getCityAPI = () => {
    const { getcity } = this.props;
    getcity().then((res) => {
      if (res.value && res.value.status === 200) {
        let cityDataList = res.value.data.data;
        if (this._isMounted) {
          this.setState({
            cityList: cityDataList,
          });
        }
      } else {
        if (res.value && res.value.data.error == "Unauthenticated.") {
          {
            NavigationService.navigate("Login");
          }
        }
      }
    });
  };

  // Focus on next input
  focusNextTextField = (ref) => {
    this.input[ref].focus();
  };

  // clear States before leave this screen
  clearStates = () => {
    this.setState({
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

  // API call begin
  createProfileAPICall = () => {
    const {
      txtUserName,
      selectedCity,
      selectedModel,
      selectedColour,
      txtDescription,
    } = this.state;
    let params = new URLSearchParams();
    // Collect the necessary params
    params.append("username", txtUserName);
    params.append("city", selectedCity);
    params.append("car_make_model", selectedModel);
    params.append("car_colour", selectedColour);
    params.append("car_description", txtDescription);
    if (globals.isInternetConnected == true) {
      const { createprofile } = this.props;
      console.log("params0=====", params);
      createprofile(params)
        .then(async (res) => {
          console.log(
            TAG,
            "res--createprofile-",
            JSON.stringify(res.value.data.data)
          );
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
            if (res.value && res.value.data.error == "Unauthenticated.") {
              {
                NavigationService.navigate("Login");
              }
            } else if (res.value && res.value.data.error) {
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
          console.log(TAG, "i am in catch error create profile one", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  // start of validation
  checkValidation = () => {
    const { txtUserName } = this.state;
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

    return true;
  };

  /// set selected Colour
  setselectedColour = (text) => {
    this.setState({ selectedColour: text });
  };

  // set selected Model
  setselectedModel = (text) => {
    this.setState({ selectedModel: text });
  };

  // set selected City
  setselectedCity = (text) => {
    this.setState({ selectedCity: text });
  };

  render() {
    const { isLoading, loaderMessage, theme } = this.props;
    const { cityList, carModelList, carColourList } = this.state;

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
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            scrollIndicatorInsets={{ right: 1 }}
          >
            <NavigationEvents onWillBlur={() => this.clearStates()} />
            <StatusBar
              barStyle="light-content"
              backgroundColor="transparent"
              translucent={true}
            />

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
              <View
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
                  bounces={false}
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
                      inputStyle={{
                        marginTop: 0,
                        color: Colors.placeholderColor,
                      }}
                      placeholderText={StaticTitle.enterUserName}
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      autoFocus={true}
                      returnKeyType="done"
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

                    <DropDownPicker
                      options={cityList}
                      defaultValue={StaticTitle.selectCity}
                      renderButtonText={(value) => this.setselectedCity(value)}
                    />

                    <DropDownPicker
                      options={carModelList}
                      defaultValue={StaticTitle.chooseModal}
                      renderButtonText={(value) => this.setselectedModel(value)}
                    />

                    <DropDownPicker
                      options={carColourList}
                      defaultValue={StaticTitle.selectColor}
                      renderButtonText={(value) =>
                        this.setselectedColour(value)
                      }
                    />

                    <Input
                      value={this.state.txtDescription}
                      inputStyle={{ color: Colors.placeholderColor }}
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
              </View>
            </View>
          </KeyboardAwareScrollView>
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
  createprofile: (params) => dispatch(actions.createprofile(params)),
  getcarmodel: (text) => dispatch(actions.getcarmodel(text)),
  getcarcolour: (text) => dispatch(actions.getcarcolour(text)),
  getcity: (text) => dispatch(actions.getcity(text)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProfileScreen);
