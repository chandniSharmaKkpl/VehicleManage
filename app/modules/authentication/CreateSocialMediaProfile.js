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
import { connect } from "react-redux";
import { ComponentStyle } from "../../assets/styles/ComponentStyle";
import { AuthStyle } from "../../assets/styles/AuthStyle";
import { StaticTitle } from "../../utils/StaticTitle";
import { Input, PrimaryButton, MediaModel } from "../../components";
import NavigationService from "../../utils/NavigationService";
import Colors from "../../assets/Colors";
import * as globals from "../../utils/Globals";
import { isEmpty, isText } from "../../utils/Validators";
import { Messages } from "../../utils/Messages";
import Header from "../../components/Header";
import FastImage from "react-native-fast-image";
import { IMAGE } from "../../assets/Images";
import InstagramIntegration from "../../components/InstagramIntegration";
import FacebookIntegration from "../../components/FacebookIntegration";
import PrimaryTextinputwithIcon from "../../components/PrimaryTextinputwithIcon";
import SnapchatIntegration from '../../components/SnapchatIntegration';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const TAG = "CreateSocialMediaProfile ::=";

export class CreateSocialMediaProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: "",
      photoObj: [],
      txtSnapName: "",
      isSnapError: false,
      snapValidMsg: "",
      isGalleryPicker: false,
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
  }

  // Navigate to back screen
  gotoBackScreen = () => {
    NavigationService.back();
  };

  // Navigate to Registration Details Screen
  gotoRegistrationDetailsScreen = () => {
    NavigationService.navigate("RegistrationDetails");
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

  render() {
    const { photoUrl, isGalleryPicker, options } = this.state;

    return (
      <>
        <View style={AuthStyle.container}>
          <Header
            onPress={() => this.gotoBackScreen()}
            isShowBack={true}
            title={StaticTitle.createProfile}
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
                    style={AuthStyle.RectangleShapeView}
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
                    <InstagramIntegration />
                    <FacebookIntegration />
                    <SnapchatIntegration />
                    {/* <PrimaryTextinputwithIcon
                      iconName={IMAGE.snap_img}
                      buttonStyle={{ backgroundColor: Colors.snapChat }}
                      buttonTextStyle={AuthStyle.SnapText}
                      value={this.state.txtSnapName}
                      placeholderText={StaticTitle.enterSnapName}
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      returnKeyType="done"
                      autoCapitalize={"none"}
                      autoFocus={false}
                      isValidationShow={this.state.isSnapError}
                      validateMesssage={this.state.snapValidMsg}
                      onChangeText={(text) =>
                        this.setState({
                          txtSnapName: text,
                          isSnapError: false,
                        })
                      }
                    /> */}
                  </View>
                  <View style={AuthStyle.signinbtnView}>
                    <PrimaryButton btnName={StaticTitle.continue} />
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

// const mapStateToProps = (state) => {};

// const mapDispatchToProps = (dispatch) => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(CreateSocialMediaProfile);
export default CreateSocialMediaProfile;
