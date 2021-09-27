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

class sideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          } else {
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
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.drawerSaperator} />

          <View
            style={{
              height: globals.deviceHeight * 0.09,
              backgroundColor: Colors.primary,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                marginRight: globals.deviceWidth * 0.08,
                marginVertical: 18,
                justifyContent: "center",
              }}
              onPress={() => {
                this.props.navigation.closeDrawer();
              }}
            >
              <Image
                style={{
                  height: 18,
                  width: 18,
                }}
                source={IMAGE.close_img}
              ></Image>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: Colors.primary,
              width: globals.deviceWidth * 0.74,
              height: globals.deviceHeight * 0.0015,
            }}
          ></View>
          <TouchableOpacity
            style={[styles.dashBoardButtonViewStyle]}
            onPress={() => {
              this.props.navigation.closeDrawer();
            }}
          >
            <Image
              style={{
                width: 23,
                height: 23,
                tintColor: Colors.black,
              }}
              source={IMAGE.subscription_img}
            />
            <Text numberOfLines={1} style={[styles.dashBoardTextStyle]}>
              {StaticTitle.subscriptions}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => NavigationService.navigate("TermsCondition")}
            style={[styles.dashBoardButtonViewStyle]}
          >
            <Image
              style={{
                width: 20,
                height: 20,
                tintColor: Colors.black,
              }}
              source={IMAGE.terms_conditions_img}
            />

            <Text numberOfLines={1} style={[styles.dashBoardTextStyle]}>
              {StaticTitle.termandcond}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => this.onPressLogout()}
          style={styles.dashboardBottomView}
        >
          <Image
            style={{
              width: 22,
              height: 20,
              tintColor: Colors.white,
            }}
            source={IMAGE.sign_out_img}
          />
          <Text style={[styles.dashBoardTextStyle, { color: Colors.white }]}>
            {"Logout"}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lite_background,
  },
  drawerSaperator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.primary,
  },
  dashBoardTextStyle: {
    fontSize: globals.font_16,
    marginLeft: 20,
    color: Colors.black,
    fontFamily: FontFamily.RalewayBold,
  },
  dashboardBottomView: {
    height: globals.deviceHeight * 0.065,
    paddingLeft: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.primary,
  },
  dashBoardButtonViewStyle: {
    height: globals.deviceHeight * 0.055,
    paddingLeft: 10,
    alignItems: "center",
    borderRadius:
      (globals.deviceHeight * 0.055 + globals.deviceWidth * 0.61) / 2,
    marginLeft: globals.deviceWidth * 0.02,
    marginBottom: globals.deviceHeight * 0.02,
    marginTop: globals.deviceHeight * 0.01,
    flexDirection: "row",
  },
});

const mapStateToProps = (state) => {
  return {
    isLoading: state.home.home.isLoading,
    loaderMessage: state.home.home.loaderMessage,
    theme: state.home.home.theme,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: (formData) => dispatch(actions.logout(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(sideDrawer);
