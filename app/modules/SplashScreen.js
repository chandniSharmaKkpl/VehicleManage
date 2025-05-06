import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import { IMAGE } from "../assets/Images";
import { AuthStyle } from "../assets/styles/AuthStyle";
import { connect } from "react-redux";
import NavigationService from "../utils/NavigationService";
import FastImage from "react-native-fast-image";

export class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    setTimeout(() => {
      NavigationService.navigate("Login");
    }, 5000);
  }

  render() {
    return (
      <>
        <ImageBackground
          source={IMAGE.primaryBackground}
          style={[AuthStyle.primaryBG]}
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <View style={[AuthStyle.imageOverlay]}>
            <View style={[AuthStyle.spalshContainer]}>
              <FastImage
                source={IMAGE.logo_img}
                style={AuthStyle.splash_imglogo}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          </View>
        </ImageBackground>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    loaderMessage: state.auth.loaderMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
