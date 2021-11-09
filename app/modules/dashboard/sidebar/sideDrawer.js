import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Colors from "../../../assets/Colors";
import * as globals from "../../../utils/Globals";
import { IMAGE } from "../../../assets/Images";
import FontFamily from "../../../assets/styles/FontFamily";
import { connect } from "react-redux";
import * as actions from "../redux/Actions";
import { StaticTitle } from "../../../utils/StaticTitle";
import { NavigationActions, StackActions } from "react-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage, hideMessage } from "react-native-flash-message";
import NavigationService from "../../../utils/NavigationService";
import FastImage from "react-native-fast-image";
import { SideDrawerStyle } from "../../../assets/styles/SideDrawerStyle";

class sideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: this.props.userDetails
        ? this.props.userDetails.user_data
        : {},
    };
  }

  async logoutFinal() {
    if (globals.isInternetConnected === true) {
      const { logout } = this.props;
      logout().then(async (res) => {
        if (res && res.value.data && res.value.status === 200) {
          if (res.value.data.success == "logout_success") {
            AsyncStorage.removeItem("access_token");
            AsyncStorage.clear();
            globals.access_token = "";
            await showMessage({
              message: res.value.data.success,
              type: "success",
              icon: "info",
              duration: 4000,
            });
            NavigationService.navigate("Login");
            return;
          }
        } else {
          if (res.value && res.value.data.error == "Unauthenticated.") {
            {
              NavigationService.navigate("Login");
            }
          }
        }
      });
    } else {
      Alert.alert(globals.appName, globals.noInternet);
    }
  }

  /**
   * logOut method
   */
  onPressLogout() {
    this.props.navigation.closeDrawer();
    Alert.alert(globals.appName, StaticTitle.logout, [
      { text: "OK", onPress: () => this.logoutFinal() },
      { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
    ]);
  }

  render() {
    const { userDetails } = this.state;
    const { isLoading, loaderMessage, theme } = this.props;

    return (
      <SafeAreaView style={SideDrawerStyle.container}>
        <View
          style={[
            SideDrawerStyle.container,
            {
              backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
            },
          ]}
        >
          <View style={SideDrawerStyle.drawerSaperator} />

          <View style={SideDrawerStyle.headerSeprate}>
            <View style={SideDrawerStyle.circleview}>
              {userDetails.user_photo ? (
                <FastImage
                  resizeMethod="resize"
                  style={SideDrawerStyle.userimgstyle}
                  source={{
                    uri: userDetails.user_photo,
                  }}
                ></FastImage>
              ) : (
                <FastImage
                  resizeMethod="resize"
                  style={SideDrawerStyle.userimgstyle}
                  source={IMAGE.user}
                ></FastImage>
              )}
            </View>
            <Text numberOfLines={2} style={SideDrawerStyle.usernametext}>
              {userDetails.username ? userDetails.username : "-"}
            </Text>
            <TouchableOpacity
              style={SideDrawerStyle.closedrawerbutton}
              onPress={() => {
                this.props.navigation.closeDrawer();
              }}
            >
              <FastImage
                style={{
                  height: 18,
                  width: 18,
                }}
                source={IMAGE.close_img}
              ></FastImage>
            </TouchableOpacity>
          </View>

          {/* <View style={SideDrawerStyle.beforeDrawerOption}></View>
          <TouchableOpacity
            style={[SideDrawerStyle.dashBoardButtonViewStyle]}
            onPress={() => {
              this.props.navigation.closeDrawer();
              Alert.alert("Coming soon .....");
            }}
          >
            <FastImage
              style={{
                width: 23,
                height: 23,
                tintColor: Colors.black,
              }}
              source={IMAGE.subscription_img}
            />
            <Text
              numberOfLines={1}
              style={[SideDrawerStyle.dashBoardTextStyle]}
            >
              {StaticTitle.subscriptions}
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => NavigationService.navigate("TermsCondition")}
            style={[SideDrawerStyle.dashBoardButtonViewStyle]}
          >
            <FastImage
              style={{
                width: 20,
                height: 20,
                tintColor: Colors.black,
              }}
              source={IMAGE.terms_conditions_img}
            />

            <Text
              numberOfLines={1}
              style={[SideDrawerStyle.dashBoardTextStyle]}
            >
              {StaticTitle.termandcond}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => this.onPressLogout()}
          style={SideDrawerStyle.dashboardBottomView}
        >
          <FastImage
            style={{
              width: 22,
              height: 20,
              tintColor: Colors.white,
            }}
            source={IMAGE.sign_out_img}
          />
          <Text
            style={[
              SideDrawerStyle.dashBoardTextStyle,
              { color: Colors.white },
            ]}
          >
            {"Logout"}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
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
  logout: (formData) => dispatch(actions.logout(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(sideDrawer);
