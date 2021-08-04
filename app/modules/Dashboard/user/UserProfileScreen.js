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
import { AuthStyle } from "../../../assets/styles/AuthStyle";
import * as globals from "../../../utils/Globals";
import { connect } from "react-redux";
import { UserProfileStyle } from "../../../assets/styles/UserProfileStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import NavigationService from "../../../utils/NavigationService";
import { IMAGE } from "../../../assets/Images";
import { NavigationEvents } from "react-navigation";
import FastImage from "react-native-fast-image";
import { Input, PrimaryButton, MediaModel, Header } from "../../../components";
import { ComponentStyle } from "../../../assets/styles/ComponentStyle";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import InstagramIntegration from "../../../components/InstagramIntegration";
import FacebookIntegration from "../../../components/FacebookIntegration";
import SnapchatIntegration from "../../../components/SnapchatIntegration";
const TAG = "UserProfileScreen ::=";

export class UserProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      options: [
        {
          image: IMAGE.camera_img,
          title: StaticTitle.captureimgfromCamera,
          id: 0,
        },
        {
          image: IMAGE.upload_img,
          title: StaticTitle.uploadfromgallery,
          id: 1,
        },
      ],
    };
    this.input = {};
  }

  componentDidMount() {}

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

  // close media modal
  closemediaPicker = () => {
    this.setState({ isGalleryPicker: false });
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
          name: response.fileName
            ? response.fileName
            : this.generateRandomFileName(),
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

  // In Android file name is not getting by library so we are generating the random string to show the
  generateRandomFileName = () => {
    let length = 5;
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
          name: response.fileName
            ? response.fileName
            : this.generateRandomFileName(),
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

  render() {
    const { photoUrl, options, isGalleryPicker } = this.state;

    return (
      <>
        <View style={UserProfileStyle.container}>
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
              <TouchableOpacity style={UserProfileStyle.squareView}>
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
                <Input
                  value={this.state.txtUserName}
                  placeholderText={StaticTitle.userName}
                  onSubmitEditing={() => this.focusNextTextField("txtCity")}
                  blurOnSubmit={false}
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
                  value={this.state.txtCity}
                  placeholderText={StaticTitle.city}
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
                  onChangeText={(text) =>
                    this.setState({
                      txtModalofCar: text,
                      isModalofCarError: false,
                    })
                  }
                />
                <Input
                  value={this.state.txtColorofCar}
                  placeholderText={StaticTitle.colors}
                  onSubmitEditing={Keyboard.dismiss}
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
                  returnKeyType="done"
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

// const mapStateToProps = (state) => {

// };

// const mapDispatchToProps = (dispatch) => ({
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(UserProfileScreen);
export default UserProfileScreen;
