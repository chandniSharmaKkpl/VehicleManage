import React, { Component } from "react";
import {
  BackHandler,
  ToastAndroid,
  View,
  Platform,
  StatusBar,
  Text,
} from "react-native";
import { NavigationActions } from "react-navigation";
import NavigationService from "../utils/NavigationService";
import { connect } from "react-redux";
import Loader from "../components/Loader";
import { AppWithNavigationState } from "./index";
import * as globals from "../utils/Globals";
import Colors from "../assets/Colors";
import SplashScreen from "react-native-splash-screen";

let STATUS_BAR_HEIGHT =
  Platform.OS === "ios"
    ? globals.deviceHeight * 0.055
    : globals.deviceHeight * 0.01;

class AppNavigation extends Component {
  constructor(props) {
    super(props);
    this.exitCount = 0;
  }

  componentDidMount() {
    // hide SplashScreen
    setTimeout(() => {
      SplashScreen.hide();
    }, 5000);

    // manage hardware backpress button in android
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    // Platform.OS == "android"
    //   ? StatusBar.setBackgroundColor(Colors.primary, true)
    //   : null; // add android statusbar color
  }

  componentWillUnmount() {
    // manage hardware backpress button in android
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
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
    if (nav.index === 0) {
      console.log("i amin 0 index");
      this.exitApp();
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { nav, dispatch, isLoading, loaderMessage } = this.props;

    return (
      <View style={{ flex: 1 }}>
        {isLoading && <Loader isOverlay={true} loaderMessage={loaderMessage} />}
        {/* <View
          style={{
            width: "100%",
            height: STATUS_BAR_HEIGHT,
            backgroundColor: Colors.primary,
          }}
        >
          <StatusBar barStyle="light-content" backgroundColor="#FFBE0B" />
        </View> */}
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
