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
} from "react-native";
import { connect } from "react-redux";
import { AuthStyle } from "../../assets/styles/AuthStyle";
import { StaticTitle } from "../../utils/StaticTitle";
import { Input, PrimaryButton } from "../../components";
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
import PrimaryButtonwithIcon from "../../components/PrimaryButtonwithIcon";

const TAG = "CreateSocialMediaProfile ::=";

export class CreateSocialMediaProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_imagePath: "",
    };
  }

  // Navigate to back screen
  gotoBackScreen() {
    NavigationService.back();
  }

  render() {
    const { profile_imagePath } = this.state;
    return (
      <>
        <View style={AuthStyle.container}>
          <Header
            onPress={() => this.gotoBackScreen()}
            isShowBack={true}
            title={StaticTitle.createProfile}
          />
          <SafeAreaView style={AuthStyle.login_safeAreaStyle}>
            <View style={AuthStyle.onlyFlex}>
              <View style={AuthStyle.imageview}>
                {profile_imagePath ? (
                  <View style={AuthStyle.beforeimgView}>
                    <FastImage
                      style={[AuthStyle.imageStyle]}
                      source={{
                        uri: profile_imagePath,
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

                <TouchableOpacity style={AuthStyle.settingOpacityContainer}>
                  <Image
                    resizeMethod="resize"
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

              <TouchableOpacity>
                <View style={AuthStyle.RectangleShapeView}>
                  <Text style={AuthStyle.saText}>{StaticTitle.sa}</Text>
                  <Text style={AuthStyle.regoText}>{StaticTitle.rego}</Text>
                </View>
              </TouchableOpacity>
              <View style={[AuthStyle.imageview]}>
                <Text style={[AuthStyle.smallTitle]}>
                  {StaticTitle.linkyouraccount}
                </Text>
              </View>
              <ScrollView
                ref={(node) => (this.scroll = node)}
                automaticallyAdjustContentInsets={true}
                enableOnAndroid={true}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="never"
              >
                <View
                  style={[
                    AuthStyle.onlyFlex,
                    { marginHorizontal: globals.deviceWidth * 0.03 },
                  ]}
                >
                  <InstagramIntegration />
                  <FacebookIntegration />
                  <PrimaryButtonwithIcon
                    iconName={IMAGE.snap_img}
                    btnName={StaticTitle.enterSnapName}
                    buttonStyle={{ backgroundColor: Colors.snapChat }}
                    buttonTextStyle={AuthStyle.SnapText}
                  />
                </View>
                <View style={AuthStyle.signinbtnView}>
                  <PrimaryButton btnName={StaticTitle.continue} />
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      </>
    );
  }
}

// const mapStateToProps = (state) => {};

// const mapDispatchToProps = (dispatch) => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(CreateSocialMediaProfile);
export default CreateSocialMediaProfile;
