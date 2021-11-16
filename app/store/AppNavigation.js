import React, { Component } from "react";
import { BackHandler, ToastAndroid, View } from "react-native";
import { NavigationActions } from "react-navigation";
import NavigationService from "../utils/NavigationService";
import { connect } from "react-redux";
import Loader from "../components/Loader";
import { AppWithNavigationState } from "./index";
import * as globals from "../utils/Globals";
import Colors from "../assets/Colors";
import FireBase from "../utils/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SplashScreen from "react-native-splash-screen";

class AppNavigation extends Component {
  constructor(props) {
    super(props);
    this.exitCount = 0;
    this.FCM = new FireBase();

  }

  componentDidMount() {
    // hide SplashScreen
    setTimeout(() => {
      SplashScreen.hide();
    }, 5000);
    this.setAppNotification();

    // manage hardware backpress button in android
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    // manage hardware backpress button in android
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    this.FCM.clearListers();

  }

  // setTimeOut while app will close
  setTimeoutForExitApp = () => {
    this.exitCount += +1;
    setTimeout(() => {
      this.exitCount = 0;
    }, 2500);
  };

  // after 2 time press on hardware back app will close
  exitApp = () => {
    this.setTimeoutForExitApp();
    if (this.exitCount >= 2) {
      BackHandler.exitApp();
    } else {
      ToastAndroid.show(
        "Press back again to exit the app !",
        ToastAndroid.SHORT
      );
    }
    return true;
  };

  // manage hardware backpress button in android
  onBackPress = () => {
    const { nav, dispatch } = this.props;
    console.log("nav.index====", nav.index);
    if (nav.index === 1) {
      console.log("i amin 1 index");
      this.exitApp();
    }
    dispatch(NavigationActions.back());
    return true;
  };

  setAppNotification = async () => {
		// console.log("in setAppNotification() .....");
		let havePermission = await this.FCM.setFCMPermission();
		console.log("havePermission:" + havePermission);
		let push_notification_token = await this.FCM.setFCMToken();
		console.log("push_notification_token------------------------->" + push_notification_token);

		this.FCM.createNotificationListeners(this.callAPI);
	};

  async callAPI(newDeviceToken) {
		// Call api to update on server
		await AsyncStorage.setItem('fcmToken', newDeviceToken);
	}

  render() {
    const { nav, dispatch, isLoading, loaderMessage } = this.props;

    return (
      <View style={{ flex: 1 }}>
        {isLoading && <Loader isOverlay={true} loaderMessage={loaderMessage} />}

        <AppWithNavigationState
          state={nav}
          dispatch={dispatch}
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
