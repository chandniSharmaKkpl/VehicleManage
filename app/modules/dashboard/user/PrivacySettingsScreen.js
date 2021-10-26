import React, { Component } from "react";
import { View,DeviceEventEmitter, Alert, Text, ScrollView } from "react-native";
import * as globals from "../../../utils/Globals";
import { connect } from "react-redux";
import { PrivacySettingStyle } from "../../../assets/styles/PrivacySettingStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import * as actions from "../redux/Actions";
import { SwitchComponent, Header } from "../../../components";
import * as Authactions from "../../authentication/redux/Actions";


const TAG = "PrivacySettingsScreen ::=";

export class PrivacySettingsScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isHideProfile: false,
      isHideCity: false,
      isHideCarModel: false,
      isHideRequestSocial: false,
      isHideShareSocial: false,
      isHideDisplayName: false,
      isHideSearchUser: false,
      user: {},
    };
  }

  async componentWillUnmount() {
    await this.getUserData();
  }

  async componentDidMount() {
    await this.onFocus();
  }

  /// call everytime didmount
  onFocus = async () => {
    this._isMounted = true;
    if (this.props.userDetails != null && this.props.userDetails != undefined) {
      this.setUserInfo(this.props.userDetails);
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
    this.getUserData();
    DeviceEventEmitter.emit("initializeApp");

  }

  // set userInformation
  setUserInfo = async (user) => {
    if (this._isMounted) {
      if (user && user.user_data) {
        this.setState({
          user: user.user_data,
          isHideProfile: user.user_data.setting_1 == 1 ? true : false,
          isHideCity: user.user_data.setting_2 == 1 ? true : false,
          isHideCarModel: user.user_data.setting_3 == 1 ? true : false,
          isHideRequestSocial: user.user_data.setting_4 == 1 ? true : false,
          isHideShareSocial: user.user_data.setting_5 == 1 ? true : false,
          isHideDisplayName: user.user_data.setting_6 == 1 ? true : false,
          isHideSearchUser: user.user_data.setting_7 == 1 ? true : false,
        });
      }
    }
  };

  // change on-off HideProfile
  changeHideProfile = () => {
    this.setState({ isHideProfile: !this.state.isHideProfile }, async () => {
      await this.updateUserSettingsAPI();
    });
  };

  // change on-off HideCity
  changeHideCity = () => {
    this.setState({ isHideCity: !this.state.isHideCity }, async () => {
      await this.updateUserSettingsAPI();
    });
  };

  // change on-off HideCarModel
  changeHideCarModel = () => {
    this.setState({ isHideCarModel: !this.state.isHideCarModel }, async () => {
      await this.updateUserSettingsAPI();
    });
  };

  // change on-off HideRequestSocial
  changeHideRequestSocial = () => {
    this.setState(
      { isHideRequestSocial: !this.state.isHideRequestSocial },
      async () => {
        await this.updateUserSettingsAPI();
      }
    );
  };

  // change on-off isHideShareSocial
  changeHideShareSocial = () => {
    this.setState(
      { isHideShareSocial: !this.state.isHideShareSocial },
      async () => {
        await this.updateUserSettingsAPI();
      }
    );
  };

  // change on-off isHideDisplayName
  changeHideDisplayName = () => {
    this.setState(
      { isHideDisplayName: !this.state.isHideDisplayName },
      async () => {
        await this.updateUserSettingsAPI();
      }
    );
  };

  // change on-off isHideSearchUser
  changeHideSearchUser = () => {
    this.setState(
      { isHideSearchUser: !this.state.isHideSearchUser },
      async () => {
        await this.updateUserSettingsAPI();
      }
    );
  };

  // API call of update User Settings
  updateUserSettingsAPI = () => {
    const {
      isHideProfile,
      isHideCity,
      isHideCarModel,
      isHideRequestSocial,
      isHideShareSocial,
      isHideDisplayName,
      isHideSearchUser,
    } = this.state;
    var params = new FormData();

    // Collect the necessary params
    const { updateUserSettings } = this.props;
    params.append("setting_1", isHideProfile == true ? 1 : 0);
    params.append("setting_2", isHideCity == true ? 1 : 0);
    params.append("setting_3", isHideCarModel == true ? 1 : 0);
    params.append("setting_4", isHideRequestSocial == true ? 1 : 0);
    params.append("setting_5", isHideShareSocial == true ? 1 : 0);
    params.append("setting_6", isHideDisplayName == true ? 1 : 0);
    params.append("setting_7", isHideSearchUser == true ? 1 : 0);

    if (globals.isInternetConnected == true) {
      // console.log("params===updateUserSettings===", JSON.stringify(params));
      updateUserSettings(params)
        .then(async (res) => {
          // console.log(
          //   TAG,
          //   "updateUserSettings res.value.data---",
          //   JSON.stringify(res.value.data)
          // );
          if (res.value && res.value.data.success == true) {
            //OK 200 The request was fulfilled
            if (res.value && res.value.status === 200) {
              this.getUserData();
            } else {
            }
          } else {
          }
        })
        .catch((err) => {
          console.log(TAG, "i am in catch error updateUserSettings ", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  getUserData() {
    if (globals.isInternetConnected == true) {
      const { initializeApp } = this.props;
      initializeApp().then((res) => {
        if (res.value && res.value.data.success == true) {
          if (res.value && res.value.status === 200) {
          } else {
          }
        }
      });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  }

  render() {
    const {
      isHideProfile,
      isHideCity,
      isHideCarModel,
      isHideRequestSocial,
      isHideShareSocial,
      isHideDisplayName,
      isHideSearchUser,
    } = this.state;
    const { isLoading, loaderMessage, theme, userDetails } = this.props;

    return (
      <>
        <View
          style={[
            PrivacySettingStyle.container,
            { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
          ]}
        >
          {/* <NavigationEvents onDidFocus={() => this.onFocusFunction()} /> */}
          <Header
            isShowBack={true}
            title={StaticTitle.privacysettings}
            theme={theme}
            onPressed={() => this.props.navigation.openDrawer()}
          />
          <View style={PrivacySettingStyle.maincontainer}>
            <Text style={PrivacySettingStyle.headingtitle}>
              {StaticTitle.privacysettings}
            </Text>
            <View style={PrivacySettingStyle.separatorLine}></View>
            <ScrollView
              ref={(node) => (this.scroll = node)}
              automaticallyAdjustContentInsets={true}
              enableOnAndroid={true}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="never"
            >
              <View style={PrivacySettingStyle.itemview}>
                <Text
                  style={[
                    PrivacySettingStyle.itemtext,
                    { color: theme.DESCRIPTION_TEXT_COLOR },
                  ]}
                >
                  {StaticTitle.hideprofile}
                </Text>
                <SwitchComponent
                  theme={theme}
                  value={isHideProfile}
                  onValueChange={this.changeHideProfile}
                />
              </View>
              <View style={PrivacySettingStyle.separatorLine}></View>

              <View style={PrivacySettingStyle.itemview}>
                <Text
                  style={[
                    PrivacySettingStyle.itemtext,
                    { color: theme.DESCRIPTION_TEXT_COLOR },
                  ]}
                >
                  {StaticTitle.hidecity}
                </Text>
                <SwitchComponent
                  theme={theme}
                  value={isHideCity}
                  onValueChange={this.changeHideCity}
                />
              </View>
              <View style={PrivacySettingStyle.separatorLine}></View>

              <View style={PrivacySettingStyle.itemview}>
                <Text
                  style={[
                    PrivacySettingStyle.itemtext,
                    { color: theme.DESCRIPTION_TEXT_COLOR },
                  ]}
                >
                  {StaticTitle.hidemodelofcar}
                </Text>
                <SwitchComponent
                  theme={theme}
                  value={isHideCarModel}
                  onValueChange={this.changeHideCarModel}
                />
              </View>
              <View style={PrivacySettingStyle.separatorLine}></View>

              <View style={PrivacySettingStyle.itemview}>
                <Text
                  style={[
                    PrivacySettingStyle.itemtext,
                    { color: theme.DESCRIPTION_TEXT_COLOR },
                  ]}
                >
                  {StaticTitle.requestforsocial}
                </Text>
                <SwitchComponent
                  theme={theme}
                  value={isHideRequestSocial}
                  onValueChange={this.changeHideRequestSocial}
                />
              </View>
              <View style={PrivacySettingStyle.separatorLine}></View>

              <View style={PrivacySettingStyle.itemview}>
                <Text
                  style={[
                    PrivacySettingStyle.itemtext,
                    { color: theme.DESCRIPTION_TEXT_COLOR },
                  ]}
                >
                  {StaticTitle.sharesocial}
                </Text>
                <SwitchComponent
                  theme={theme}
                  value={isHideShareSocial}
                  onValueChange={this.changeHideShareSocial}
                />
              </View>
              <View style={PrivacySettingStyle.separatorLine}></View>

              <View style={PrivacySettingStyle.itemview}>
                <Text
                  style={[
                    PrivacySettingStyle.itemtext,
                    { color: theme.DESCRIPTION_TEXT_COLOR },
                  ]}
                >
                  {StaticTitle.displayname}
                </Text>
                <SwitchComponent
                  theme={theme}
                  value={isHideDisplayName}
                  onValueChange={this.changeHideDisplayName}
                />
              </View>
              <View style={PrivacySettingStyle.separatorLine}></View>

              <Text
                style={[
                  PrivacySettingStyle.headingtitle,
                  { marginVertical: 5 },
                ]}
              >
                {StaticTitle.premiumsetting}
              </Text>
              <View style={PrivacySettingStyle.separatorLine}></View>
              <View style={PrivacySettingStyle.itemview}>
                <Text
                  style={[
                    PrivacySettingStyle.itemtext,
                    { color: theme.DESCRIPTION_TEXT_COLOR },
                  ]}
                >
                  {StaticTitle.hidesearchuser}
                </Text>
                <SwitchComponent
                  theme={theme}
                  value={isHideSearchUser}
                  onValueChange={this.changeHideSearchUser}
                />
              </View>
              <View style={PrivacySettingStyle.separatorLine}></View>
            </ScrollView>
          </View>
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
  updateUserSettings: (params) => dispatch(actions.updateUserSettings(params)),
  initializeApp: (params) => dispatch(Authactions.initializeApp(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivacySettingsScreen);
