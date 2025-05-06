import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Platform,
  TouchableOpacity,
  FlatList,
  Alert,
  DeviceEventEmitter,
} from "react-native";
import sideDrawer from "../sidebar/sideDrawer";
import { isEmpty, isText } from "../../../utils/Validators";
import { Messages } from "../../../utils/Messages";
import { AuthStyle } from "../../../assets/styles/AuthStyle";
import * as globals from "../../../utils/Globals";
import { connect } from "react-redux";
import { UserProfileStyle } from "../../../assets/styles/UserProfileStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import NavigationService from "../../../utils/NavigationService";
import { IMAGE } from "../../../assets/Images";
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Input,
  MediaModel,
  Header,
  DropDownPicker,
  Loader,
  PrimaryButton,
} from "../../../components";
import { ComponentStyle } from "../../../assets/styles/ComponentStyle";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import InstagramIntegration from "../../../components/InstagramIntegration";
import FacebookIntegration from "../../../components/FacebookIntegration";
import SnapchatIntegration from "../../../components/SnapchatIntegration";
import { DefaultOptions } from "../../../components/DefaultOptions";
import * as Authactions from "../../authentication/redux/Actions";
import Colors from "../../../assets/Colors";
import * as actions from "../redux/Actions";
import { showMessage, hideMessage } from "react-native-flash-message";

const TAG = "UserProfileScreen ::=";

export class UserProfileScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      cityList: [],
      carModelList: [],
      carColourList: [],
      user: {},

      selectedCity: "",
      selectedModel: "",
      selectedColour: "",

      txtUserName: "",
      fname: "",
      surname: "",
      txtDescription: "",
      txtSnapName: "",
      txtInstaName: "",
      txtFbName: "",

      isUserNameError: false,
      isFnameError: false,
      isSurnameError: false,
      isCityError: false,
      isFnameError: false,
      isSurnameError: false,
      isModalofCarError: false,
      isColorofCarError: false,
      isDescriptionError: false,

      userNameValidMsg: "",
      fNameValidMsg: "",
      surnameValidMsg: "",
      cityValidMsg: "",
      fnameValidMsg: "",
      surnameValidMsg: "",
      modalofCarValidMsg: "",
      colorofCarValidMsg: "",
      descriptionValidMsg: "",

      isGalleryPicker: false,
      photoUrl: "",
      photoObj: [],
      options: DefaultOptions,
    };
    this.input = {};
  }

  async componentDidMount() {
    this.onFocusFunction();
    DeviceEventEmitter.addListener("initializeApp", () => {
      this.getUserData();
      this.setUserInfo(this.props.userDetails);
    });
  }

  /// call everytime did mount
  onFocusFunction = async () => {
    this._isMounted = true;
    if (this.props.userDetails != null && this.props.userDetails != undefined) {
      this.setUserInfo(this.props.userDetails);
    }
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
    // this.focusListener.remove();
  }

  // set userInformation
  setUserInfo = async (user) => {
    if (this._isMounted) {
      if (user && user.user_data) {
        if (user.user_data.instagram_username !== "") {
          var instagramDetails =
            user.user_data.instagram_username.split(".com/");
        }
        if (user.user_data.fb_username !== "") {
          var facebookDetails = user.user_data.fb_username.split(".com/");
        }
        if (user.user_data.snapchat_username !== "") {
          var snapchatDetails = user.user_data.snapchat_username.split("add/");
        }

        this.setState({
          user: user.user_data,
          selectedCity: user.user_data.city,
          selectedModel: user.user_data.car_make_model,
          selectedColour: user.user_data.car_colour,
          txtUserName: user.user_data.username,
          fname: user.user_data.name,
          surname: user.user_data.surname,
          txtDescription: user.user_data.user_description,
          photoUrl: user.user_data.avatar,
          txtSnapName: snapchatDetails ? snapchatDetails[1] : "",
          txtInstaName: instagramDetails ? instagramDetails[1] : "",
          txtFbName: facebookDetails ? facebookDetails[1] : "",
        });
      }
    }
  };

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

  //display gallry picker model
  displayGalleryPicker = () => {
    this.setState({ isGalleryPicker: !this.state.isGalleryPicker });
  };

  // Render modal faltlist view to choose camera or gallery
  renderOptionsview = (item, index) => {
    return (
      <>
        <TouchableOpacity onPress={() => this.onselectOptions(item)}>
          <View style={ComponentStyle.viewPopupStyle}>
            <FastImage
              resizeMethod="resize"
              style={ComponentStyle.imagePopupStyle}
              source={item.image}
            ></FastImage>

            <Text style={ComponentStyle.textStylePopup}>{item.title}</Text>
          </View>
        </TouchableOpacity>
        {index < 1 ? <View style={ComponentStyle.lineStyle1}></View> : null}
      </>
    );
  };

  // select camera or gallery option
  onselectOptions = (item) => {
    if (item.title == StaticTitle.captureimgfromCamera) {
      this.captureImage();
    } else if (item.title == StaticTitle.uploadfromgallery) {
      this.chooseMedia();
    }
  };

  // capture img from camera
  captureImage = () => {
    launchCamera(
      {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        const source = {
          uri: response.uri,
          name: response.fileName ? response.fileName : "Dummy.jpg",
          size: response.fileSize,
          type: response.type,
        };
        this.setState({
          isGalleryPicker: false,
          photoUrl: response.uri,
          photoObj: source,
        });
      }
    );
  };

  // choose profile photo from gallery
  chooseMedia = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        const source = {
          uri: response.uri,
          name: response.fileName ? response.fileName : "Dummy.jpg",
          size: response.fileSize,
          type: response.type,
        };
        this.setState({
          isGalleryPicker: false,
          photoUrl: response.uri,
          photoObj: source,
        });
      }
    );
  };

  // Navigate to Registration Details Screen
  gotoRegistrationDetailsScreen = () => {
    NavigationService.navigate("RegistrationDetails", {
      isFrom: "Profile",
      user: this.props.userDetails,
    });
  };

  // Navigate to Settings  Screen
  gotoSettings = () => {
    NavigationService.navigate("PrivacySettings");
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

  // start of validation
  checkValidation = () => {
    const { txtUserName, fname, surname } = this.state;
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
    if (isEmpty(fname)) {
      this.setState({
        isFnameError: true,
        fNameValidMsg: Messages.enterFname,
      });
      return false;
    }
    // if (!isText(fname)) {
    //   this.setState({
    //     isFnameError: true,
    //     fNameValidMsg: Messages.enterFname,
    //   });
    // }
    if (isEmpty(surname)) {
      this.setState({
        isSurnameError: true,
        surnameValidMsg: Messages.enterSurname,
      });
      return false;
    }
    // if (!isText(surname)) {
    //   this.setState({
    //     isSurnameError: true,
    //     surnameValidMsg: Messages.enterSurname,
    //   });
    //   return false;
    // }

    return true;
  };

  // Update profile API call
  updateProfileApiCall = () => {
    const {
      user,
      selectedColour,
      selectedModel,
      selectedCity,
      photoObj,
      txtSnapName,
      txtInstaName,
      txtFbName,
      txtDescription,
      txtUserName,
      fname,
      surname,
    } = this.state;

    if (!this.checkValidation()) {
      return;
    }
    Keyboard.dismiss();
    var params = new FormData();

    // Collect the necessary params
    const { updateprofile } = this.props;
    params.append("email", user.email);
    params.append("username", txtUserName);
    params.append("name", fname);
    params.append("surname", surname);
    if (photoObj.uri == undefined || (photoObj.uri == "") != []) {
      params.append("image", "");
    } else {
      params.append("image", photoObj);
    }
    params.append("city", selectedCity);
    params.append("car_make_model", selectedModel);
    params.append("car_colour", selectedColour);
    params.append("user_description", txtDescription);
    params.append("fb_username", txtFbName);
    params.append("instalgram_username", txtInstaName);
    params.append("snapchat_username", txtSnapName);

    if (globals.isInternetConnected == true) {
      updateprofile(params)
        .then(async (res) => {
          console.log("res", res);

          if (res.value && res.value.data.success == true) {
            //OK 200 The request was fulfilled
            if (res.value && res.value.status === 200) {
              await showMessage({
                message: res.value.data.message,
                type: "success",
                icon: "auto",
                duration: 4000,
              });
              sideDrawer.updateUserInfo({
                userData: res.value.data.data.user_data,
              });

              this.getUserData();
              this.setUserInfo(res.value.data.data);
            }
          } else {
            if (res.value && res.value.data.error == "Unauthenticated.") {
              {
                NavigationService.navigate("Login");
              }
            } else if (res.value) {
              // await showMessage({
              //   message: res.value.data.image, // "The image field is required.", // update API response here res.value.data.image
              //   type: "danger",
              //   icon: "auto",
              //   duration: 4000,
              // });
            }
          }
        })
        .catch((err) => {
          console.log(TAG, "i am in catch error update profile", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  getUserData() {
    if (globals.isInternetConnected == true) {
      const { initializeApp } = this.props;
      initializeApp().then((res) => {});
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  }

  render() {
    const { isLoading, loaderMessage, theme } = this.props;
    const {
      photoUrl,
      options,
      isGalleryPicker,
      cityList,
      carModelList,
      carColourList,
      user,
      selectedColour,
      selectedModel,
      selectedCity,
      fname,
      surname,
    } = this.state;
    return (
      <>
        <View
          style={[
            UserProfileStyle.container,
            { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
          ]}
        >
          {isLoading && (
            <Loader isOverlay={true} loaderMessage={loaderMessage} />
          )}
          <Header
            title={StaticTitle.userProfile}
            isShowSidebar={true}
            theme={theme}
            onPressed={() => this.props.navigation.openDrawer()}
          />

          <View>
            <MediaModel
              modalVisible={isGalleryPicker}
              onBackdropPress={() => this.displayGalleryPicker()}
            >
              <View style={ComponentStyle.modelContainer}>
                <View style={[ComponentStyle.modelView]}>
                  <View style={ComponentStyle.titleviewstyle}>
                    <Text style={[ComponentStyle.choosefilestyle]}>
                      {StaticTitle.filetoupload}
                    </Text>
                    <View style={ComponentStyle.lineStyle}></View>
                    <View
                      style={{
                        height: globals.deviceWidth * 0.28,
                      }}
                    >
                      <FlatList
                        style={[ComponentStyle.onlyFlex]}
                        data={options}
                        renderItem={({ item, index }) =>
                          this.renderOptionsview(item, index)
                        }
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        listKey={(item, index) => "D" + index.toString()}
                        keyExtractor={(item, index) => "D" + index.toString()}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </MediaModel>

            <View style={UserProfileStyle.imageview}>
              {photoUrl ? (
                <TouchableOpacity
                  onPress={() => {
                    this.displayGalleryPicker();
                  }}
                  style={UserProfileStyle.beforeimgView}
                >
                  <FastImage
                    style={[UserProfileStyle.imageStyle]}
                    source={{
                      uri: photoUrl,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.displayGalleryPicker();
                  }}
                  style={UserProfileStyle.beforeimgView}
                >
                  <Image
                    resizeMethod="resize"
                    source={IMAGE.user}
                    style={UserProfileStyle.imageStyle}
                  />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => {
                  this.displayGalleryPicker();
                }}
                style={UserProfileStyle.settingOpacityContainer}
              >
                <Image
                  resizeMethod="resize"
                  resizeMode="contain"
                  source={IMAGE.edit}
                  style={UserProfileStyle.settingIconStyle}
                />
              </TouchableOpacity>
              <View style={UserProfileStyle.registrationView}>
                <Text
                  style={[
                    UserProfileStyle.changeRegText,
                    { color: theme.LITE_FONT_COLOR },
                  ]}
                >
                  {StaticTitle.changeRegistration}
                </Text>
                <TouchableOpacity
                  style={UserProfileStyle.RectangleShapeView}
                  onPress={() => this.gotoRegistrationDetailsScreen()}
                >
                  <Text style={UserProfileStyle.saText}>{StaticTitle.sa}</Text>
                  <Text style={UserProfileStyle.regoText}>
                    {StaticTitle.rego}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.gotoSettings();
                }}
                style={UserProfileStyle.squareView}
              >
                <Icon
                  name={"settings-sharp"}
                  size={20}
                  color={theme.ICON_COLOR}
                />
              </TouchableOpacity>
            </View>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
          >
            <ScrollView
              ref={(node) => (this.scroll = node)}
              automaticallyAdjustContentInsets={true}
              enableOnAndroid={true}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="never"
            >
              <View>
                <Input
                  theme={theme}
                  value={this.state.txtDescription}
                  placeholderText={StaticTitle.addDescription}
                  inputStyle={{ color: Colors.placeholderColor }}
                  onSubmitEditing={() => this.focusNextTextField("txtUserName")}
                  forwardRef={(ref) => {
                    (this.input.txtDescription = ref),
                      this.input.txtDescription &&
                        this.input.txtDescription.setNativeProps({
                          style: { fontFamily: "Raleway-Regular" },
                        });
                  }}
                  blurOnSubmit={false}
                  returnKeyType="next"
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
                <Input
                  theme={theme}
                  value={this.state.txtUserName}
                  placeholderText={StaticTitle.userName}
                  inputStyle={{
                    marginTop: 8,
                    color: Colors.placeholderColor,
                  }}
                  blurOnSubmit={false}
                  onSubmitEditing={() => this.focusNextTextField("fname")}
                  forwardRef={(ref) => {
                    (this.input.txtUserName = ref),
                      this.input.txtUserName &&
                        this.input.txtUserName.setNativeProps({
                          style: { fontFamily: "Raleway-Regular" },
                        });
                  }}
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
                  theme={theme}
                  value={fname}
                  onSubmitEditing={() => this.focusNextTextField("surname")}
                  placeholderText={StaticTitle.name}
                  inputStyle={{
                    marginTop: 8,
                    color: Colors.placeholderColor,
                  }}
                  blurOnSubmit={false}
                  forwardRef={(ref) => {
                    (this.input.fname = ref),
                      this.input.fname &&
                        this.input.fname.setNativeProps({
                          style: { fontFamily: "Raleway-Regular" },
                        });
                  }}
                  autoFocus={true}
                  returnKeyType="next"
                  autoCapitalize={"none"}
                  maxLength={26}
                  minLength={3}
                  isValidationShow={this.state.isFnameError}
                  validateMesssage={this.state.fNameValidMsg}
                  onChangeText={(text) =>
                    this.setState({
                      fname: text,
                      isFnameError: false,
                    })
                  }
                />
                <Input
                  theme={theme}
                  value={surname}
                  placeholderText={StaticTitle.surname}
                  inputStyle={{
                    marginTop: 8,
                    color: Colors.placeholderColor,
                  }}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  forwardRef={(ref) => {
                    (this.input.surname = ref),
                      this.input.surname &&
                        this.input.surname.setNativeProps({
                          style: { fontFamily: "Raleway-Regular" },
                        });
                  }}
                  autoFocus={true}
                  returnKeyType="done"
                  autoCapitalize={"none"}
                  maxLength={26}
                  minLength={3}
                  isValidationShow={this.state.isSurnameError}
                  validateMesssage={this.state.surnameValidMsg}
                  onChangeText={(text) =>
                    this.setState({
                      surname: text,
                      isSurnameError: false,
                    })
                  }
                />
                {user.setting_2 == 1 ? null : (
                  <DropDownPicker
                    options={cityList}
                    defaultValue={
                      selectedCity ? selectedCity : StaticTitle.selectCity
                    }
                    renderButtonText={(value) => this.setselectedCity(value)}
                  />
                )}

                {user.setting_3 == 1 ? null : (
                  <>
                    <DropDownPicker
                      options={carModelList}
                      defaultValue={
                        selectedModel ? selectedModel : StaticTitle.chooseModal
                      }
                      renderButtonText={(value) => this.setselectedModel(value)}
                    />
                    <DropDownPicker
                      options={carColourList}
                      defaultValue={
                        selectedColour
                          ? selectedColour
                          : StaticTitle.selectColor
                      }
                      renderButtonText={(value) =>
                        this.setselectedColour(value)
                      }
                    />
                  </>
                )}

                <View
                  style={[
                    AuthStyle.onlyFlex,
                    {
                      marginHorizontal: globals.deviceWidth * 0.03,
                      marginVertical: globals.deviceWidth * 0.08,
                    },
                  ]}
                >
                  <>
                    <InstagramIntegration
                      isFrom="Instagram"
                      URL={
                        user.instagram_username
                          ? user.instagram_username
                          : "https://www.instagram.com"
                      }
                      value={this.state.txtInstaName}
                      onChangeText={(text) =>
                        this.setState({
                          txtInstaName: text,
                        })
                      }
                    />
                    <FacebookIntegration
                      isFrom="Facebook"
                      URL={
                        user.fb_username
                          ? user.fb_username
                          : "https://www.facebook.com"
                      }
                      value={this.state.txtFbName}
                      onChangeText={(text) =>
                        this.setState({
                          txtFbName: text,
                        })
                      }
                    />
                    <SnapchatIntegration
                      isFrom="Snap"
                      URL={
                        user.snapchat_username
                          ? user.snapchat_username
                          : "https://www.snapchat.com"
                      }
                      value={this.state.txtSnapName}
                      onChangeText={(text) =>
                        this.setState({
                          txtSnapName: text,
                        })
                      }
                    />
                  </>

                  {/* <PrimaryTextinputwithIcon
                    isFrom="Instagram"
                    iconName={IMAGE.insta_icon_img}
                    buttonStyle={{ backgroundColor: Colors.snapChat }}
                    buttonTextStyle={AuthStyle.SnapText}
                    value={this.state.txtInstaName}
                    placeholderText={StaticTitle.enterinstname}
                    onSubmitEditing={() => this.focusNextTextField("txtFbName")}
                    blurOnSubmit={false}
                    returnKeyType="next"
                    autoCapitalize={"none"}
                    autoFocus={false}
                    isValidationShow={this.state.isInstError}
                    onChangeText={(text) =>
                      this.setState({
                        txtInstaName: text,
                        isInstError: false,
                      })
                    }
                  />
                  <PrimaryTextinputwithIcon
                    iconName={IMAGE.fb_icon_square}
                    buttonStyle={{ backgroundColor: Colors.blue }}
                    buttonTextStyle={AuthStyle.SnapText}
                    value={this.state.txtFbName}
                    placeholderText={StaticTitle.enterfbname}
                    onSubmitEditing={() =>
                      this.focusNextTextField("txtSnapName")
                    }
                    forwardRef={(ref) => {
                      (this.input.txtFbName = ref),
                        this.input.txtFbName &&
                          this.input.txtFbName.setNativeProps({
                            style: { fontFamily: "Raleway-Regular" },
                          });
                    }}
                    blurOnSubmit={false}
                    returnKeyType="next"
                    autoCapitalize={"none"}
                    autoFocus={false}
                    isValidationShow={this.state.isFbError}
                    onChangeText={(text) =>
                      this.setState({
                        txtFbName: text,
                        isFbError: false,
                      })
                    }
                  />
                  <PrimaryTextinputwithIcon
                    iconName={IMAGE.snap_img}
                    buttonStyle={{ backgroundColor: Colors.snapChat }}
                    isFrom="Snap"
                    value={this.state.txtSnapName}
                    placeholderText={StaticTitle.enterSnapName}
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    returnKeyType="done"
                    autoCapitalize={"none"}
                    autoFocus={false}
                    isValidationShow={this.state.isSnapError}
                    onChangeText={(text) =>
                      this.setState({
                        txtSnapName: text,
                        isSnapError: false,
                      })
                    }
                    forwardRef={(ref) => {
                      (this.input.txtSnapName = ref),
                        this.input.txtSnapName &&
                          this.input.txtSnapName.setNativeProps({
                            style: { fontFamily: "Raleway-Regular" },
                          });
                    }}
                  /> */}

                  <View
                    style={[AuthStyle.signinbtnView, { marginHorizontal: 10 }]}
                  >
                    <PrimaryButton
                      btnName={StaticTitle.update}
                      onPress={() => this.updateProfileApiCall()}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.home.home.isLoading,
    loaderMessage: state.home.home.loaderMessage,
    theme: state.home.home.theme,
    userDetails: state.auth.user.userDetails,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getcarmodel: (params) => dispatch(Authactions.getcarmodel(params)),
  getcarcolour: (params) => dispatch(Authactions.getcarcolour(params)),
  getcity: (params) => dispatch(Authactions.getcity(params)),
  updateprofile: (params) => dispatch(actions.updateprofile(params)),
  initializeApp: (params) => dispatch(Authactions.initializeApp(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);
