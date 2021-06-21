import React, { Component } from "react";
import { BackHandler, ToastAndroid, View } from "react-native";
import { NavigationActions } from "react-navigation";
import NavigationService from "../utils/NavigationService";
import { connect } from "react-redux";
import Loader from "../components/Loader";
import { AppWithNavigationState } from "./index";

class AppNavigation extends Component {
  constructor(props) {
    super(props);
    this.exitCount = 0;
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  setTimeoutForExitApp = () => {
    this.exitCount += +1;
    setTimeout(() => {
      this.exitCount = 0;
    }, 2500);
  };

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

  onBackPress = () => {
    const { nav, dispatch } = this.props;
    console.warn("i am in nav 0-Dispatch", nav, dispatch);
    if (nav.index === 0) {
      console.warn("i amin 0 index");
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
