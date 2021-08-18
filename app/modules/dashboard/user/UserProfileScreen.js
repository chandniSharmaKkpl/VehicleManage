import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthStyle } from "../../../assets/styles/AuthStyle";
import * as globals from "../../../utils/Globals";
import { connect } from "react-redux";
import { UserProfileStyle } from "../../../assets/styles/UserProfileStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import NavigationService from "../../../utils/NavigationService";
import { IMAGE } from "../../../assets/Images";
import { NavigationEvents } from "react-navigation";
import FastImage from "react-native-fast-image";
import {
  Input,
  MediaModel,
  Header,
  GenerateRandomFileName,
  DropDownPicker,
  Loader,
} from "../../../components";
import { ComponentStyle } from "../../../assets/styles/ComponentStyle";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import InstagramIntegration from "../../../components/InstagramIntegration";
import FacebookIntegration from "../../../components/FacebookIntegration";
import SnapchatIntegration from "../../../components/SnapchatIntegration";
import { DefaultOptions } from "../../../components/DefaultOptions";
import * as Authactions from "../../authentication/redux/Actions";

const TAG = "UserProfileScreen ::=";

export class UserProfileScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
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

      isGalleryPicker: false,
      photoUrl: "",
      photoObj: [],
      options: DefaultOptions,
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
      isGalleryPicker: false,
      photoUrl: "",
      photoObj: [],

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
        // console.log(TAG, "I am in open camera", response);
        const source = {
          uri: response.uri,
          name: response.fileName ? (
            response.fileName
          ) : (
            <GenerateRandomFileName />
          ),
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
        // console.log(TAG, "response---", response);
        const source = {
          uri: response.uri,
          name: response.fileName ? (
            response.fileName
          ) : (
            <GenerateRandomFileName />
          ),
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
    NavigationService.navigate("RegistrationDetails");
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

  render() {
    const { isLoading, loaderMessage } = this.props;
    const {
      photoUrl,
      options,
      isGalleryPicker,
      cityList,
      carModelList,
      carColourList,
    } = this.state;
    return (
      <>
        <View style={UserProfileStyle.container}>
          {isLoading && (
            <Loader isOverlay={true} loaderMessage={loaderMessage} />
          )}
          <NavigationEvents onWillBlur={() => this.clearStates()} />
          <Header title={StaticTitle.userProfile} isShowSidebar={true} />

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
                      priority: FastImage.priority.normal,
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
                <Text style={UserProfileStyle.changeRegText}>
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
                <FastImage
                  style={[UserProfileStyle.navigateimgStyle]}
                  source={IMAGE.settings_img}
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
                  value={this.state.txtDescription}
                  placeholderText={StaticTitle.addDescription}
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
                  value={this.state.txtUserName}
                  placeholderText={StaticTitle.userName}
                  inputStyle={{ marginTop: 8 }}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  forwardRef={(ref) => {
                    (this.input.txtUserName = ref),
                      this.input.txtUserName &&
                        this.input.txtUserName.setNativeProps({
                          style: { fontFamily: "Raleway-Regular" },
                        });
                  }}
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

                <View
                  style={[
                    AuthStyle.onlyFlex,
                    {
                      marginHorizontal: globals.deviceWidth * 0.03,
                      marginVertical: globals.deviceWidth * 0.08,
                    },
                  ]}
                >
                  <InstagramIntegration />
                  <FacebookIntegration />
                  <SnapchatIntegration />
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
    userDetails: state.auth.user.userDetails,
    isLoading: state.auth.user.isLoading,
    loaderMessage: state.auth.user.loaderMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getcarmodel: (text) => dispatch(Authactions.getcarmodel(text)),
  getcarcolour: (text) => dispatch(Authactions.getcarcolour(text)),
  getcity: (text) => dispatch(Authactions.getcity(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);
