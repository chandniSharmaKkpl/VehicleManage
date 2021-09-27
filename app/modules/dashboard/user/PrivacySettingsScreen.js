import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import * as globals from "../../../utils/Globals";
import { connect } from "react-redux";
import { PrivacySettingStyle } from "../../../assets/styles/PrivacySettingStyle";
import { StaticTitle } from "../../../utils/StaticTitle";

import { SwitchComponent, Header } from "../../../components";

const TAG = "PrivacySettingsScreen ::=";

export class PrivacySettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHideCarModelisHideProfile: false,
      isHideCity: false,
      isHideCarModel: false,
      isHideRequestSocial: false,
      isHideShareSocial: false,
      isHideDisplayName: false,
      isHideSearchUser: false,
    };
  }

  componentDidMount() {}

  // change on-off HideProfile
  changeHideProfile = () => {
    this.setState({ isHideProfile: !this.state.isHideProfile });
  };

  // change on-off HideCity
  changeHideCity = () => {
    this.setState({ isHideCity: !this.state.isHideCity });
  };

  // change on-off HideCarModel
  changeHideCarModel = () => {
    this.setState({ isHideCarModel: !this.state.isHideCarModel });
  };

  // change on-off HideRequestSocial
  changeHideRequestSocial = () => {
    this.setState({ isHideRequestSocial: !this.state.isHideRequestSocial });
  };

  // change on-off isHideShareSocial
  changeHideShareSocial = () => {
    this.setState({ isHideShareSocial: !this.state.isHideShareSocial });
  };

  // change on-off isHideDisplayName
  changeHideDisplayName = () => {
    this.setState({ isHideDisplayName: !this.state.isHideDisplayName });
  };

  // change on-off isHideSearchUser
  changeHideSearchUser = () => {
    this.setState({ isHideSearchUser: !this.state.isHideSearchUser });
  };

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
    const { isLoading, loaderMessage, theme } = this.props;
    return (
      <>
        <View
          style={[
            PrivacySettingStyle.container,
            { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
          ]}
        >
          <Header
            isShowBack={true}
            title={StaticTitle.privacysettings}
            theme={theme}
            onPressed={()=>this.props.navigation.openDrawer()}
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
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivacySettingsScreen);
