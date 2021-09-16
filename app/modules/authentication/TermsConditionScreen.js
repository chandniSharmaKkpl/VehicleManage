import React, { Component } from "react";
import { Text, View, BackHandler } from "react-native";
import { WebView } from "react-native-webview";
import { Header, Loader } from "../../components";
import { AuthStyle } from "../../assets/styles/AuthStyle";
import NavigationService from "../../utils/NavigationService";
import { termsCondURL } from "../../config/BaseURL";

export class TermsConditionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  gotoBackScreen() {
    NavigationService.back();
  }
  backAction = () => {
    this.gotoBackScreen();
    return true;
  };
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  render() {
    const { isLoading, loaderMessage } = this.props;

    return (
      <>
        <View style={[AuthStyle.container]}>
          <Header
            onPress={() => this.gotoBackScreen()}
            isShowBack={true}
            title={"Terms And Condition"}
          />
          {isLoading && (
            <Loader isOverlay={true} loaderMessage={loaderMessage} />
          )}
          <WebView
            scalesPageToFit
            style={{ flex: 1 }}
            source={{
              uri: termsCondURL,
            }}
            javaScriptEnabled={true}
            renderLoading={this.ActivityIndicatorLoadingView}
            startInLoadingState={true}
          />
        </View>
      </>
    );
  }
}

export default TermsConditionScreen;
