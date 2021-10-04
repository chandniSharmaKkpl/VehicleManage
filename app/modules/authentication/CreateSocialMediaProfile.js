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
import { connect } from "react-redux";
import { ComponentStyle } from "../../assets/styles/ComponentStyle";
import { AuthStyle } from "../../assets/styles/AuthStyle";
import { StaticTitle } from "../../utils/StaticTitle";
import {
  PrimaryButton,
  MediaModel,
  GenerateRandomFileName,
  PrimaryTextinputwithIcon,
  Loader,
} from "../../components";
import NavigationService from "../../utils/NavigationService";
import * as globals from "../../utils/Globals";
import Header from "../../components/Header";
import FastImage from "react-native-fast-image";
import { IMAGE } from "../../assets/Images";
import InstagramIntegration from "../../components/InstagramIntegration";
import FacebookIntegration from "../../components/FacebookIntegration";
import SnapchatIntegration from "../../components/SnapchatIntegration";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { DefaultOptions } from "../../components/DefaultOptions";
import * as actions from "./redux/Actions";
import Colors from "../../assets/Colors";
import { showMessage, hideMessage } from "react-native-flash-message";

const TAG = "CreateSocialMediaProfile ::=";
export class CreateSocialMediaProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: "",
      photoObj: [],
      txtSnapName: "",
      txtInstaName: "",
      txtFbName: "",
      isSnapError: false,
      isInstError: false,
      isFbError: false,
      snapValidMsg: "",
      isGalleryPicker: false,
      options: DefaultOptions,
    };
    this.input = {};
  }

  // Focus on next input
  focusNextTextField = (ref) => {
    this.input[ref].focus();
  };

  // Navigate to Registration Details Screen
  gotoRegistrationDetailsScreen = () => {
    NavigationService.navigate("RegistrationDetails", {
      isFrom: "SocialProfile",
    });
  };

  // Navigate to Dashboard screen
  gotoDashboard = async () => {
    if (globals.isRegistrationDeatils == false) {
      await showMessage({
        message: StaticTitle.registerinfoneeded,
        type: "danger",
        icon: "info",
        duration: 4000,
      });
    } else {
      this.createSocialProfileAPICall();
    }
  };

  // API call begin
  createSocialProfileAPICall = () => {
    const { txtFbName, txtInstaName, txtSnapName, photoUrl, photoObj } =
      this.state;
    var params = new FormData();
    // Collect the necessary params

    if (photoObj.uri == undefined || (photoObj.uri == "") != []) {
      params.append("image", "");
    } else {
      params.append("image", photoObj);
    }
    params.append("fb_username", txtFbName);
    params.append("instalgram_username", txtInstaName);
    params.append("snapchat_username", txtSnapName);

    const { createSocialprofile } = this.props;
    if (globals.isInternetConnected == true) {
      console.log("params======", JSON.stringify(params));
      createSocialprofile(params)
        .then(async (res) => {
          console.log(
            TAG,
            "res.value.data---",
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
              let authToken = res.value.data.data.user_data.token;
              await AsyncStorage.setItem("access_token", authToken);
              globals.access_token = authToken;
              this.getUserData();
            } else {
            }
          } else {
            if (res.value) {
              await showMessage({
                message: res.value.data.image, // "The image field is required.", // update API response here res.value.data.image
                type: "danger",
                icon: "info",
                duration: 4000,
              });
            }
          }
        })
        .catch((err) => {
          console.log(TAG, "i am in catch error create social profile", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  // get user information
  getUserData() {
    const { initializeApp } = this.props;
    initializeApp().then((res) => {
      if (res.value.status === 200) {
        NavigationService.navigate("App");
      } else {
        NavigationService.navigate("Login");
      }
    });
  }

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
        // console.log(TAG, "response---", response);
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

  render() {
    const { photoUrl, isGalleryPicker, options } = this.state;
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
          <Header
            isShowBack={true}
            onPressed={()=>this.props.navigation.openDrawer()}
            title={StaticTitle.createProfile}
            theme={theme}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
            enabled
          >
            <ScrollView
              ref={(node) => (this.scroll = node)}
              automaticallyAdjustContentInsets={true}
              enableOnAndroid={true}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="never"
            >
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
              <SafeAreaView style={AuthStyle.login_safeAreaStyle}>
                <View style={AuthStyle.onlyFlex}>
                  <View style={AuthStyle.imageview}>
                    {photoUrl ? (
                      <View style={AuthStyle.beforeimgView}>
                        <FastImage
                          style={[AuthStyle.imageStyle]}
                          source={{
                            uri: photoUrl,
                            priority: FastImage.priority.normal,
                          }}
                        />
                      </View>
                    ) : (
                      <View style={AuthStyle.beforeimgView}>
                        <Image
                          resizeMethod="resize"
                          source={IMAGE.user}
                          style={AuthStyle.imageStyle}
                        />
                      </View>
                    )}

                    <TouchableOpacity
                      style={AuthStyle.settingOpacityContainer}
                      onPress={() => {
                        this.displayGalleryPicker();
                      }}
                    >
                      <Image
                        resizeMethod="resize"
                        resizeMode="contain"
                        source={IMAGE.edit}
                        style={AuthStyle.settingIconStyle}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={[
                      AuthStyle.imageview,
                      { marginVertical: globals.deviceHeight * 0.01 },
                    ]}
                  >
                    <Text style={[AuthStyle.smallTitle]}>
                      {StaticTitle.addRegistrationDetail}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[
                      AuthStyle.RectangleShapeView,
                      {
                        backgroundColor: Colors.white,
                        borderColor: Colors.black,
                      },
                    ]}
                    onPress={() => this.gotoRegistrationDetailsScreen()}
                  >
                    <Text style={AuthStyle.saText}>{StaticTitle.sa}</Text>
                    <Text style={AuthStyle.regoText}>{StaticTitle.rego}</Text>
                  </TouchableOpacity>

                  <View style={[AuthStyle.imageview]}>
                    <Text style={[AuthStyle.smallTitle]}>
                      {StaticTitle.linkyouraccount}
                    </Text>
                  </View>

                  <View
                    style={[
                      AuthStyle.onlyFlex,
                      { marginHorizontal: globals.deviceWidth * 0.03 },
                    ]}
                  >
                    {/* <InstagramIntegration />
                    <FacebookIntegration />
                    <SnapchatIntegration /> */}

                    <PrimaryTextinputwithIcon
                      isFrom="Instagram"
                      iconName={IMAGE.insta_icon_img}
                      buttonStyle={{ backgroundColor: Colors.snapChat }}
                      buttonTextStyle={AuthStyle.SnapText}
                      value={this.state.txtInstaName}
                      placeholderText={StaticTitle.enterinstname}
                      onSubmitEditing={() =>
                        this.focusNextTextField("txtFbName")
                      }
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
                    />
                  </View>
                  <View style={AuthStyle.signinbtnView}>
                    <PrimaryButton
                      btnName={StaticTitle.continue}
                      onPress={() => this.gotoDashboard()}
                    />
                  </View>
                </View>
              </SafeAreaView>
            </ScrollView>
          </KeyboardAvoidingView>
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
  createSocialprofile: (params) =>
    dispatch(actions.createSocialprofile(params)),
  initializeApp: (params) => dispatch(actions.initializeApp(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateSocialMediaProfile);
