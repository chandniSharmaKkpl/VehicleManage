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
} from "react-native";
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

  componentDidMount = async () => {
    this._isMounted = true;
    let token = await AsyncStorage.getItem("access_token");
    globals.access_token = token;
    await this.getcarModelAPI();
    await this.getcarColourAPI();
    await this.getCityAPI();
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

  // API call begin
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
        // console.log("res---", res);
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
        console.log(TAG, "i am in catch error create profile one", err);
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
    // if (!isEmpty(txtCity) && !isText(txtCity)) {
    //   this.setState({
    //     isCityError: true,
    //     cityValidMsg: Messages.cityFail,
    //   });
    //   return false;
    // }

    // if (!isEmpty(txtModalofCar) && !isText(txtModalofCar)) {
    //   this.setState({
    //     isModalofCarError: true,
    //     modalofCarValidMsg: Messages.modalFail,
    //   });
    //   return false;
    // }

    // if (!isEmpty(txtColorofCar) && !isText(txtColorofCar)) {
    //   this.setState({
    //     isColorofCarError: true,
    //     colorofCarValidMsg: Messages.colorFail,
    //   });
    //   return false;
    // }
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
    const { isLoading, loaderMessage } = this.props;
    const { cityList, carModelList, carColourList } = this.state;

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
                  nestedScrollEnabled={true}
                  keyboardShouldPersistTaps="always"
                  ref={(node) => (this.scroll = node)}
                  automaticallyAdjustContentInsets={true}
                  enableOnAndroid={true}
                  showsVerticalScrollIndicator={false}
                  // keyboardShouldPersistTaps="never"
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
                      onSelect={(value) => this.setselectedCity(value)}
                    />

                    <DropDownPicker
                      options={carModelList}
                      defaultValue={StaticTitle.chooseModal}
                      onSelect={(value) => this.setselectedModel(value)}
                    />
                    <DropDownPicker
                      options={carColourList}
                      defaultValue={StaticTitle.selectColor}
                      onSelect={(value) => this.setselectedColour(value)}
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
                      // numberOfLines={4}
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
    userDetails: state.auth.user.userDetails,
    isLoading: state.auth.user.isLoading,
    loaderMessage: state.auth.user.loaderMessage,
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
