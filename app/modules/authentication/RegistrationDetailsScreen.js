import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Keyboard,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { AuthStyle } from "../../assets/styles/AuthStyle";
import { connect } from "react-redux";
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
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { DefaultOptions } from "../../components/DefaultOptions";
import * as actions from "./redux/Actions";
import { showMessage, hideMessage } from "react-native-flash-message";
import { isEmpty } from "../../utils/Validators";
const TAG = "RegistrationDetailsScreen ::=";

export class RegistrationDetailsScreen extends Component {
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
    };
  }

  //display Attch Paper picker model
  displayAttchPaper = () => {
    this.setState({ isattachPaper: !this.state.isattachPaper });
  };

  // close Attch Paper popup
  closeAttchPaper = () => {
    this.setState({ isattachPaper: false });
  }; //display Attch Photo picker model
  displayAttchPhoto = () => {
    this.setState({ isattachphoto: !this.state.isattachphoto });
  };

  // close Attch Photo popup
  closeAttchPhoto = () => {
    this.setState({ isattachphoto: false });
  };

  // save all register details
  saveDeatils = async () => {
    const { txtRegNumber, attachphotoUrl, attachPaperUrl } = this.state;
    if (isEmpty(txtRegNumber)) {
      await showMessage({
        message: StaticTitle.registernumberfieldrequire,
        type: "danger",
        icon: "info",
        duration: 4000,
      });
    } else if (attachPaperUrl == "") {
      await showMessage({
        message: StaticTitle.registrationpaper,
        type: "danger",
        icon: "info",
        duration: 4000,
      });
    } else if (attachphotoUrl == "") {
      await showMessage({
        message: StaticTitle.vehicalphotorequired,
        type: "danger",
        icon: "info",
        duration: 4000,
      });
    } else {
      this.registerDetailAPIcall();
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

    console.log("params----------", JSON.stringify(params));
    registerdetail(params)
      .then(async (res) => {
        console.log("res.value.data---", res.value.data);
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
          }
        }
      })
      .catch((err) => {
        console.log(TAG, "i am in catch error Register screen", err);
      });
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
        if (this.state.isattachPaper) {
          this.setState({
            isattachPaper: false,
            attachPaperUrl: response.uri,
            attachPaperName: response.fileName ? (
              response.fileName
            ) : (
              <GenerateRandomFileName />
            ),
            attachPaperObj: source,
          });
        } else {
          this.setState({
            isattachphoto: false,
            attachphotoUrl: response.uri,
            attachphotoName: response.fileName ? (
              response.fileName
            ) : (
              <GenerateRandomFileName />
            ),
            attachPaperObj: source,
          });
        }
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
        if (this.state.isattachPaper) {
          this.setState({
            isattachPaper: false,
            attachPaperUrl: response.uri,
            attachPaperName: response.fileName ? (
              response.fileName
            ) : (
              <GenerateRandomFileName />
            ),
            attachPaperObj: source,
          });
        } else {
          this.setState({
            isattachphoto: false,
            attachphotoUrl: response.uri,
            attachphotoName: response.fileName ? (
              response.fileName
            ) : (
              <GenerateRandomFileName />
            ),
            attachphotoObj: source,
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
    } = this.state;
    const { isLoading, loaderMessage } = this.props;

    return (
      <>
        <View style={AuthStyle.container}>
          {isLoading && (
            <Loader isOverlay={true} loaderMessage={loaderMessage} />
          )}
          <Header isShowBack={true} title={StaticTitle.registartionDetail} />
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
                <Text style={[AuthStyle.registrationStyle]}>
                  {StaticTitle.registartionDetail}
                </Text>
              </View>
              <View style={[AuthStyle.registerContent]}>
                <Text style={[AuthStyle.registrationContentTextStyle]}>
                  {StaticTitle.registerContent}
                </Text>
              </View>
              <View style={AuthStyle.registernumView}>
                <Input
                  value={this.state.txtRegNumber}
                  inputStyle={{ marginTop: 0, borderColor: Colors.black }}
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
                  bigcontainerstyle={{
                    backgroundColor: attachPaperUrl
                      ? Colors.primary
                      : Colors.pink,
                  }}
                  title={
                    attachPaperName ? attachPaperName : StaticTitle.attachPaper
                  }
                  onPress={() => this.displayAttchPaper()}
                />
                <ButtonwithRightIcon
                  iconName={IMAGE.upload_doc_img}
                  bigcontainerstyle={{
                    backgroundColor: attachphotoUrl
                      ? Colors.primary
                      : Colors.blue,
                  }}
                  title={
                    attachphotoName ? attachphotoName : StaticTitle.attachPhoto
                  }
                  onPress={() => this.displayAttchPhoto()}
                />
              </View>
              <View style={AuthStyle.signinbtnView}>
                <PrimaryButton
                  btnName={StaticTitle.saveDetails}
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
  };
};
const mapDispatchToProps = (dispatch) => ({
  registerdetail: (params) => dispatch(actions.registerdetail(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationDetailsScreen);
