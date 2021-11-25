import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Keyboard,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { AuthStyle } from "../../assets/styles/AuthStyle";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as globals from "../../utils/Globals";
import { StaticTitle } from "../../utils/StaticTitle";
import NavigationService from "../../utils/NavigationService";
import { IMAGE } from "../../assets/Images";
import Header from "../../components/Header";
import FastImage from "react-native-fast-image";
import Colors from "../../assets/Colors";
import { ComponentStyle } from "../../assets/styles/ComponentStyle";
import {
  Input,
  PrimaryButton,
  ButtonwithRightIcon,
  MediaModel,
  Loader,
  GenerateRandomFileName,
} from "../../components";
import { Messages } from "../../utils/Messages";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { DefaultOptions } from "../../components/DefaultOptions";
import * as actions from "./redux/Actions";
import { showMessage, hideMessage } from "react-native-flash-message";
import { isEmpty, onlycharandnum } from "../../utils/Validators";
const TAG = "RegistrationDetailsScreen ::=";

export class RegistrationDetailsScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      attachphotoUrl: "",
      attachphotoName: "",
      attachphotoObj: [],
      attachPaperUrl: "",
      attachPaperName: "",
      attachPaperObj: [],
      isattachPaper: false,
      isattachphoto: false,
      txtRegNumber: "",
      isRegNumberError: false,
      regNumberValidMsg: "",
      options: DefaultOptions,
      isFrom: this.props.navigation.state.params.isFrom,
      user: {},
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount = async () => {
    this._isMounted = true;
    if (this.state.isFrom == "Profile") {
      this.setUserInfo();
    }
  };

  // set userInformation
  setUserInfo = async () => {
    var user = this.props.navigation.state.params.user;
    if (this._isMounted) {
      if (user && user.user_data) {
        this.setState({
          user: user,
          attachPaperUrl: user.user_data.registration_paper,
          attachphotoUrl: user.user_data.vehicle_photo,
          txtRegNumber: user.user_data.registration_number,
        });
      }
    }
  };

  //display Attch Paper picker model
  displayAttchPaper = () => {
    this.setState({ isattachPaper: !this.state.isattachPaper });
  };

  // close Attch Paper popup
  closeAttchPaper = () => {
    this.setState({ isattachPaper: false });
  };

  //display Attch Photo picker model
  displayAttchPhoto = () => {
    this.setState({ isattachphoto: !this.state.isattachphoto });
  };

  // close Attch Photo popup
  closeAttchPhoto = () => {
    this.setState({ isattachphoto: false });
  };

  // save all register details
  saveDeatils = async () => {
    const {
      txtRegNumber,
      attachphotoUrl,
      attachPaperUrl,
      isFrom,
      attachPaperObj,
      attachphotoObj,
    } = this.state;

    if (isEmpty(txtRegNumber)) {
      await showMessage({
        message: StaticTitle.registernumberfieldrequire,
        type: "danger",
        icon: "info",
        duration: 4000,
      });
    } else if (!onlycharandnum(txtRegNumber)) {
      await showMessage({
        message: StaticTitle.registernumberfieldvalidation,
        type: "danger",
        icon: "info",
        duration: 4000,
      });
      this.setState({
        isRegNumberError: true,
        regNumberValidMsg: Messages.registernumberfieldvalidation,
      });
    } else {
      if (isFrom == "Profile") {
        if (attachphotoUrl == "" || attachphotoUrl == "Dummy.jpg") {
          await showMessage({
            message: StaticTitle.registrationpaper,
            type: "danger",
            icon: "info",
            duration: 4000,
          });
        } else if (attachPaperUrl == "" || attachPaperUrl == "Dummy.jpg") {
          await showMessage({
            message: StaticTitle.registrationpaper,
            type: "danger",
            icon: "info",
            duration: 4000,
          });
        } else {
          this.updateRegisterDetailAPIcall();
        }
      } else {
        if (
          attachPaperObj.uri == undefined ||
          (attachPaperObj.uri == "") != []
        ) {
          await showMessage({
            message: StaticTitle.registrationpaper,
            type: "danger",
            icon: "info",
            duration: 4000,
          });
        } else if (
          attachphotoObj.uri == undefined ||
          (attachphotoObj.uri == "") != []
        ) {
          await showMessage({
            message: StaticTitle.vehicalphotorequired,
            type: "danger",
            icon: "info",
            duration: 4000,
          });
        } else {
          this.registerDetailAPIcall();
        }
      }
    }
  };

  // API CALL begin of update
  updateRegisterDetailAPIcall = () => {
    const {
      txtRegNumber,
      attachPaperObj,
      attachphotoObj,
      user,
      attachPaperUrl,
      attachphotoUrl,
    } = this.state;
    var params = new FormData();
    // Collect the necessary params
    params.append("id", user.user_data.user_id);
    if (
      attachphotoUrl == "" ||
      attachphotoObj.uri == undefined ||
      (attachphotoObj.uri == "") != []
    ) {
      params.append("vehicle_photo", "");
    } else {
      params.append("vehicle_photo", attachphotoObj);
    }
    if (
      attachPaperUrl == "" ||
      attachPaperObj.uri == undefined ||
      (attachPaperObj.uri == "") != []
    ) {
      params.append("registration_paper", "");
    } else {
      params.append("registration_paper", attachPaperObj);
    }
    params.append("registration_number", txtRegNumber);

    const { updateRegistrationDetail } = this.props;

    // console.log(
    //   "updateRegisterDetailAPIcall params----------",
    //   JSON.stringify(params)
    // );
    if (globals.isInternetConnected == true) {
      updateRegistrationDetail(params)
        .then(async (res) => {
          // console.log(
          //   "updateRegisterDetailAPIcall res.value.data---",
          //   JSON.stringify(res.value)
          // );
          if (res.value && res.value.data.success == true) {
            //OK 200 The request was fulfilled
            if (res.value && res.value.status === 200) {
              await showMessage({
                message: res.value.data.message,
                type: "success",
                icon: "info",
                duration: 4000,
              });
              NavigationService.back();
            } else {
            }
          } else {
            if (res.value && res.value.data.error == "Unauthenticated.") {
              {
                NavigationService.navigate("Login");
              }
            } else if (res.value && res.value.data.registration_paper) {
              await showMessage({
                message: res.value.data.registration_paper,
                type: "danger",
                icon: "info",
                duration: 4000,
              });
            } else if (res.value && res.value.data.vehicle_photo) {
              await showMessage({
                message: res.value.data.vehicle_photo,
                type: "danger",
                icon: "info",
                duration: 4000,
              });
            } else if (res.value && res.value.data.registration_number) {
              await showMessage({
                message: res.value.data.registration_number,
                type: "danger",
                icon: "info",
                duration: 4000,
              });
            }
          }
        })
        .catch((err) => {
          console.log(TAG, "i am in catch error Register screen", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  // API CALL begin
  registerDetailAPIcall = () => {
    const { txtRegNumber, attachPaperObj, attachphotoObj } = this.state;

    var params = new FormData();
    // Collect the necessary params
    params.append("vehicle_photo", attachphotoObj);
    params.append("registration_number", txtRegNumber);
    params.append("registration_paper", attachPaperObj);
    const { registerdetail } = this.props;

    // console.log("params----------", JSON.stringify(params));
    if (globals.isInternetConnected == true) {
      registerdetail(params)
        .then(async (res) => {
          // console.log("res.value.data---", JSON.stringify(res.value.data.data));
          if (res.value && res.value.data.success == true) {
            //OK 200 The request was fulfilled
            if (res.value && res.value.status === 200) {
              await showMessage({
                message: res.value.data.message,
                type: "success",
                icon: "info",
                duration: 4000,
              });
              globals.isRegistrationDeatils = true;
              NavigationService.back();
            } else {
            }
          } else {
            if (res.value && res.value.data.error == "Unauthenticated.") {
              {
                NavigationService.navigate("Login");
              }
            }
            if (res.value && res.value.data.registration_paper) {
              await showMessage({
                message: res.value.data.registration_paper,
                type: "danger",
                icon: "info",
                duration: 4000,
              });
            } else if (res.value && res.value.data.vehicle_photo) {
              await showMessage({
                message: res.value.data.vehicle_photo,
                type: "danger",
                icon: "info",
                duration: 4000,
              });
            } else if (res.value && res.value.data.registration_number) {
              await showMessage({
                message: res.value.data.registration_number,
                type: "danger",
                icon: "info",
                duration: 4000,
              });
            }
          }
        })
        .catch((err) => {
          console.log(TAG, "i am in catch error Register screen", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
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
        if (this.state.isattachPaper) {
          this.setState({
            isattachPaper: false,
            attachPaperUrl: response.uri,
            attachPaperName: response.fileName
              ? response.fileName
              : "Dummy.jpg",
            attachphotoObj: source ? source : "",
          });
        } else {
          this.setState({
            isattachphoto: false,
            attachphotoUrl: response.uri,
            attachphotoName: response.fileName
              ? response.fileName
              : "Dummy.jpg",
            attachPaperObj: source ? source : "",
          });
        }
      }
    );
  };

  // choose profile photo from gallery
  chooseMedia = async () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      async (response) => {
        // console.log(TAG, "response---", response);
        const source = {
          uri: response.uri,
          name: response.fileName ? response.fileName : "Dummy.jpg",
          size: response.fileSize,
          type: response.type,
        };
        if (this.state.isattachPaper) {
          await this.closeAttchPaper();
          this.setState({
            isattachPaper: false,
            attachPaperUrl: response.uri,
            attachPaperName: response.fileName
              ? response.fileName
              : "Dummy.jpg",
            attachPaperObj: source ? source : "",
          });
        } else {
          await this.closeAttchPhoto();
          this.setState({
            isattachphoto: false,
            attachphotoUrl: response.uri,
            attachphotoName: response.fileName
              ? response.fileName
              : "Dummy.jpg",
            attachphotoObj: source ? source : "",
          });
        }
      }
    );
  };

  render() {
    const {
      attachphotoUrl,
      attachPaperUrl,
      attachPaperName,
      attachphotoName,
      isattachPaper,
      options,
      isattachphoto,
      isFrom,
    } = this.state;
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
            onPressed={() => this.props.navigation.openDrawer()}
            title={StaticTitle.registartionDetail}
            theme={theme}
          />
          <ScrollView
            ref={(node) => (this.scroll = node)}
            automaticallyAdjustContentInsets={true}
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="never"
          >
            <MediaModel
              modalVisible={isattachPaper ? isattachPaper : isattachphoto}
              onBackdropPress={() =>
                isattachPaper ? this.closeAttchPaper() : this.closeAttchPhoto()
              }
            >
              <View style={ComponentStyle.modelContainer}>
                <View style={[ComponentStyle.modelView]}>
                  <View style={ComponentStyle.titleviewstyle}>
                    <Text style={[ComponentStyle.choosefilestyle]}>
                      {StaticTitle.attchDoc}
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
            <View style={AuthStyle.onlyFlex}>
              <View style={[AuthStyle.titleviewStyle]}>
                <Text
                  style={[
                    AuthStyle.registrationStyle,
                    { color: theme.LITE_FONT_COLOR },
                  ]}
                >
                  {StaticTitle.registartionDetail}
                </Text>
              </View>
              <View style={[AuthStyle.registerContent]}>
                <Text
                  style={[
                    AuthStyle.registrationContentTextStyle,
                    {
                      color: theme.LITE_FONT_COLOR,
                    },
                  ]}
                >
                  {StaticTitle.registerContent}
                </Text>
              </View>
              <View style={AuthStyle.registernumView}>
                <Input
                  theme={theme}
                  value={this.state.txtRegNumber}
                  inputStyle={{
                    color: Colors.placeholderColor,
                    marginTop: 0,
                    borderColor: Colors.black,
                  }}
                  placeholderText={StaticTitle.enterRegisterNumber}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  returnKeyType="done"
                  autoCapitalize={"none"}
                  isValidationShow={this.state.isRegNumberError}
                  validateMesssage={this.state.regNumberValidMsg}
                  onChangeText={(text) =>
                    this.setState({
                      txtRegNumber: text,
                      isRegNumberError: false,
                    })
                  }
                />
              </View>
              <View style={[AuthStyle.registerContent]}>
                <ButtonwithRightIcon
                  iconName={IMAGE.upload_doc_img}
                  attachUrl={attachPaperUrl}
                  bigcontainerstyle={{
                    backgroundColor: attachPaperUrl
                      ? Colors.primary
                      : Colors.pink,
                  }}
                  title={
                    attachPaperName
                      ? attachPaperName == "Dummy.jpg"
                        ? StaticTitle.attachPaper
                        : attachPaperName
                      : isFrom == "Profile"
                      ? StaticTitle.updateattachPaper
                      : StaticTitle.attachPaper
                  }
                  onPress={() => this.displayAttchPaper()}
                />

                <ButtonwithRightIcon
                  iconName={IMAGE.upload_doc_img}
                  attachUrl={attachphotoUrl}
                  bigcontainerstyle={{
                    backgroundColor: attachphotoUrl
                      ? Colors.primary
                      : Colors.blue,
                  }}
                  title={
                    attachphotoName
                      ? attachphotoName == "Dummy.jpg"
                        ? StaticTitle.attachPhoto
                        : attachphotoName
                      : isFrom == "Profile"
                      ? StaticTitle.updateattachPhoto
                      : StaticTitle.attachPhoto
                  }
                  onPress={() => this.displayAttchPhoto()}
                />
              </View>
              <View style={AuthStyle.signinbtnView}>
                <PrimaryButton
                  btnName={
                    isFrom == "Profile"
                      ? StaticTitle.updatedetail
                      : StaticTitle.saveDetails
                  }
                  onPress={() => this.saveDeatils()}
                />
              </View>
            </View>
          </ScrollView>
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
  registerdetail: (params) => dispatch(actions.registerdetail(params)),
  updateRegistrationDetail: (params) =>
    dispatch(actions.updateRegistrationDetail(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationDetailsScreen);
