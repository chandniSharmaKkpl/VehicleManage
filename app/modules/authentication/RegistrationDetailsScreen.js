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
} from "../../components";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

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
  saveDeatils = () => {};

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
        if (this.state.isattachPaper) {
          this.setState({
            isattachPaper: false,
            attachPaperUrl: response.uri,
            attachPaperName: response.fileName
              ? response.fileName
              : this.generateRandomFileName(),
            attachPaperObj: source,
          });
        } else {
          this.setState({
            isattachphoto: false,
            attachphotoUrl: response.uri,
            attachphotoName: response.fileName
              ? response.fileName
              : this.generateRandomFileName(),
            attachPaperObj: source,
          });
        }
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
        if (this.state.isattachPaper) {
          this.setState({
            isattachPaper: false,
            attachPaperUrl: response.uri,
            attachPaperName: response.fileName
              ? response.fileName
              : this.generateRandomFileName(),
            attachPaperObj: source,
          });
        } else {
          this.setState({
            isattachphoto: false,
            attachphotoUrl: response.uri,
            attachphotoName: response.fileName
              ? response.fileName
              : this.generateRandomFileName(),
            attachphotoObj: source,
          });
        }
      }
    );
  };

  render() {
    const {
      attachphotoUrl,
      attachPaperObj,
      attachphotoObj,
      attachPaperUrl,
      attachPaperName,
      attachphotoName,
      isattachPaper,
      options,
      isattachphoto,
    } = this.state;
    return (
      <>
        <View style={AuthStyle.container}>
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

// const mapStateToProps = (state) => {};

// const mapDispatchToProps = (dispatch) => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(RegistrationDetailsScreen);
export default RegistrationDetailsScreen;
