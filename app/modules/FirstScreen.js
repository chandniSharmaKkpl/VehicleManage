import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import * as actions from "../modules/authentication/redux/Actions";
import NavigationService from "../utils/NavigationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as globals from "../utils/Globals";
import { darkTheme, lightTheme } from "../assets/Theme";

export class FirstScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // theme: {},
    };
  }

  // UNSAFE_componentWillReceiveProps = (newProps) => {
  //   const { theme } = newProps;
  //   this.parseData(theme);
  // };

  async componentDidMount() {
    // let them_mode = await AsyncStorage.getItem("them_mode");

    // console.log("FirstScreen componentDidMount ======them_mode", them_mode);
    // var newTheme = lightTheme;
    // if (them_mode === globals.THEME_MODE.DARK) {
    //   newTheme = darkTheme;
    // }
    // this.setState({ theme: them_mode });
    // this.props.swicthTheme(newTheme);

    const accessToken = await AsyncStorage.getItem("access_token");
    globals.access_token = accessToken;
    if (accessToken === null || accessToken === undefined) {
      NavigationService.reset("Login");
    } else {
      this.getUserData();
    }
  }

  // parse lite and dark theme data
  // parseData = (newTheme) => {
  //   this.setState({ theme: newTheme });
  // };

  getUserData() {
    const { initializeApp } = this.props;
    initializeApp().then((res) => {
      if (res.value.status === 200) {
        NavigationService.reset("Home");
      } else {
        NavigationService.reset("Login");
      }
    });
  }
  render() {
    // const { theme } = this.state;
    // if (theme == undefined || theme.PRIMARY_BACKGROUND_COLOR === undefined) {
    //   return <></>;
    // }
    return <View style={{ height: "100%" }}></View>;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    loaderMessage: state.auth.loaderMessage,
    theme: state.auth.user.theme,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // swicthTheme: (params) => dispatch(actions.swicthTheme(params)),
  initializeApp: (params) => dispatch(actions.initializeApp(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FirstScreen);
