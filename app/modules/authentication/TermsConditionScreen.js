import React, { Component } from "react";
import { Text, View, BackHandler } from "react-native";
import { WebView } from "react-native-webview";
import { Header, Loader } from "../../components";
import { AuthStyle } from "../../assets/styles/AuthStyle";
import NavigationService from "../../utils/NavigationService";
import { termsCondURL } from "../../config/BaseURL";
import { connect } from "react-redux";

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
    const { isLoading, loaderMessage, theme } = this.props;

    return (
      <>
        <View
          style={[
            AuthStyle.container,
            { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
          ]}
        >
          <Header
            isShowBack={true}
            onPressed={() => this.props.navigation.openDrawer()}
            title={"Terms And Condition"}
            theme={theme}
          />
          {isLoading && (
            <Loader isOverlay={true} loaderMessage={loaderMessage} />
          )}
          <WebView
            scalesPageToFit
            style={{ width: "100%", height: "100%" }}
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

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.user.isLoading,
    loaderMessage: state.auth.user.loaderMessage,
    theme: state.auth.user.theme,
  };
};
const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TermsConditionScreen);
