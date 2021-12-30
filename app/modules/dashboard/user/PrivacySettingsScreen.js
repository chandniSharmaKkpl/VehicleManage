import React, { Component } from "react";
import {
  View,
  DeviceEventEmitter,
  Alert,
  Text,
  ScrollView,
  Platform,
} from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import * as globals from "../../../utils/Globals";
import { connect } from "react-redux";
import { PrivacySettingStyle } from "../../../assets/styles/PrivacySettingStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import * as actions from "../redux/Actions";
import { SwitchComponent, Header, PrimaryButton } from "../../../components";
import * as Authactions from "../../authentication/redux/Actions";
import { AuthStyle } from "../../../assets/styles/AuthStyle";
import RNIap, {
  acknowledgePurchaseAndroid,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from "react-native-iap";
import NavigationService from "../../../utils/NavigationService";
import FormData from "form-data";
import { renderIf } from "../../../utils/Globals";
const TAG = "PrivacySettingsScreen ::=";
let purchaseUpdateSubscription;
let purchaseErrorSubscription;

export class PrivacySettingsScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isHideProfile: false,
      isHideCity: false,
      isHideCarModel: false,
      isHideRequestSocial: false,
      isHideShareSocial: false,
      isHideDisplayName: false,
      isHideSearchUser: false,
      turnonsubscription_button: false,
      user: {},
      localizedPrice: "",
      description: "",
      isPurchasesLoading: false,
      productID: "",
      currency: "",
      isSubsctiptionTrue: false,
      currentplan: "",
    };
  }

  async componentDidMount() {
    await this.onFocus();
  }

  /// call everytime didmount
  onFocus = async () => {
    this._isMounted = true;
    if (this.props.userDetails != null && this.props.userDetails != undefined) {
      this.setUserInfo(this.props.userDetails);
    }
    const Product_sku_id =
      Platform.OS === "ios"
        ? ["1_month_auto_subscription_"]
        : ["1_month_subscription"];

    try {
      const result = await RNIap.initConnection();
      if (result) {
        const products = await RNIap.getSubscriptions(Product_sku_id);
        for (var index = 0; index < products.length; index++) {
          var product = products[index];
          this.setState({
            localizedPrice: product.localizedPrice,
            description: product.description,
            productID: product.productId,
            currency: product.currency,
            currentplan: product.title,
          });
        }
      }
      if (Platform.OS === "android") {
        RNIap.flushFailedPurchasesCachedAsPendingAndroid()
          .catch(() => {
            // exception can happen here if:
            // - there are pending purchases that are still pending (we can't consume a pending purchase)
            // in any case, you might not want to do anything special with the error
          })
          .then(() => {
            purchaseUpdateSubscription = purchaseUpdatedListener(
              async (purchase) => {
                // Type purchase: ProductPurchase
                if (
                  purchase.purchaseStateAndroid === 1 &&
                  !purchase.isAcknowledgedAndroid
                ) {
                }
                purchaseErrorSubscription = purchaseErrorListener(
                  (error) => {}
                );
              }
            );
          });
        setTimeout(() => {}, 3000);
      }
    } catch (err) {
      showMessage({
        message: err.message,
        type: "danger",
        icon: "danger",
        duration: 4000,
      });
    }
  };

  async componentWillUnmount() {
    this._isMounted = false;
    this.getUserData();
    DeviceEventEmitter.emit("initializeApp");
    if (purchaseUpdateSubscription) {
      purchaseUpdateSubscription.remove();
      purchaseUpdateSubscription = null;
    }
    if (purchaseErrorSubscription) {
      purchaseErrorSubscription.remove();
      purchaseErrorSubscription = null;
    }
    await RNIap.endConnection();
  }

  UNSAFE_componentWillReceiveProps = (newProps) => {
    if (newProps.userDetails) {
      this.setUserInfo(newProps.userDetails);
    }
  };

  gotoRequestPurchase() {
    this.setState({ isPurchasesLoading: true });

    try {
      RNIap.requestPurchase(this.state.productID, true).then((res) => {
        const { subscriptionSuccess } = this.props;
        var params = new FormData();

        if (Platform.OS === "android") {
          let saveData = JSON.parse(res.transactionReceipt);
          params.append("currency", this.state.currency);
          params.append("deviceType", Platform.OS);
          params.append("localizedPrice", this.state.localizedPrice);
          params.append("originalTransactionDateIOS", "");
          params.append("originalTransactionIdentifierIOS", "");
          params.append("productId", res.productId);
          params.append("transactionDate", res.transactionDate);
          params.append("transactionId", res.transactionId);
          params.append("transactionReceipt", res.transactionReceipt);
        } else {
          params.append("currency", this.state.currency);
          params.append("deviceType", Platform.OS);
          params.append("localizedPrice", this.state.localizedPrice);
          params.append("originalTransactionDateIOS", "");
          params.append("originalTransactionIdentifierIOS", "");
          params.append("productId", res.productId);
          params.append("transactionDate", res.transactionDate);
          params.append("transactionId", res.transactionId);
          params.append("transactionReceipt", res.transactionReceipt);
        }

        subscriptionSuccess(params)
          .then(async (res) => {
            //OK 200 The request was fulfilled
            if (res.value.status === 200) {
              this.setState({
                turnonsubscription_button: true,
                isPurchasesLoading: false,
                isSubsctiptionTrue: false,
              });
              showMessage({
                message: res.value.message,
                type: "success",
                icon: "success",
                duration: 3000,
              });
              this.getUserData();
            } else {
              showMessage({
                message: Messages.subscriptionFail,
                type: "danger",
                icon: "danger",
                duration: 4000,
              });
            }
          })
          .catch((err) => {
            this.setState({ isPurchasesLoading: false });
          });
      });
    } catch (err) {
      this.setState({ isPurchasesLoading: false });
    }
  }

  // set userInformation
  setUserInfo = async (user) => {
    if (this._isMounted) {
      if (user) {
        this.setState({
          user: user.user_data,
          isHideProfile: user.user_data.setting_1 == 1 ? true : false,
          isHideCity: user.user_data.setting_2 == 1 ? true : false,
          isHideCarModel: user.user_data.setting_3 == 1 ? true : false,
          isHideRequestSocial: user.user_data.setting_4 == 1 ? true : false,
          isHideShareSocial: user.user_data.setting_5 == 1 ? true : false,
          isHideDisplayName: user.user_data.setting_6 == 1 ? true : false,
          isHideSearchUser: user.user_data.setting_7 == 1 ? true : false,
          isSubsctiptionTrue:
            user.user_data.subscription_status === 0 ? true : false,
        });
      }
    }
  };

  // change on-off HideProfile
  changeHideProfile() {
    this.setState({ isHideProfile: !this.state.isHideProfile });
  }

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
    if (this.state.turnonsubscription_button) {
      this.setState({ isHideSearchUser: !this.state.isHideSearchUser });
      setTimeout(() => {
        this.updateUserSettingsAPI();
      }, 10000);
    } else {
      Alert.alert(globals.appName, globals.subscriptionrequired);
    }
  };

  // API call of update User Settings
  updateUserSettingsAPI() {
    const {
      isHideProfile,
      isHideCity,
      isHideCarModel,
      isHideRequestSocial,
      isHideShareSocial,
      isHideDisplayName,
      isHideSearchUser,
    } = this.state;
    var params = new FormData();
    // Collect the necessary params
    const { updateUserSettings } = this.props;
    params.append("setting_1", isHideProfile ? 1 : 0);
    params.append("setting_2", isHideCity ? 1 : 0);
    params.append("setting_3", isHideCarModel ? 1 : 0);
    params.append("setting_4", isHideRequestSocial ? 1 : 0);
    params.append("setting_5", isHideShareSocial ? 1 : 0);
    params.append("setting_6", isHideDisplayName ? 1 : 0);
    params.append("setting_7", isHideSearchUser ? 1 : 0);
    if (globals.isInternetConnected == true) {
      updateUserSettings(params)
        .then(async (res) => {
          if (res.value && res.value.data.success == true) {
            //OK 200 The request was fulfilled
            if (res.value && res.value.status === 200) {
              this.getUserData();
            }
          } else {
            if (res.value && res.value.data.error == "Unauthenticated.") {
              {
                NavigationService.navigate("Login");
              }
            }
          }
        })
        .catch((err) => {
          console.log(TAG, "i am in catch error updateUserSettings ", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  }

  getUserData() {
    if (globals.isInternetConnected == true) {
      const { initializeApp } = this.props;
      initializeApp().then((res) => {
        if (res.value && res.value.data.success == true) {
          if (res.value && res.value.status === 200) {
          } else {
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
      Alert.alert(globals.warning, globals.noInternet);
    }
  }

  render() {
    const {
      isHideProfile,
      isHideCity,
      isHideCarModel,
      isHideRequestSocial,
      isHideShareSocial,
      isHideDisplayName,
      isHideSearchUser,
      turnonsubscription_button,
      isSubsctiptionTrue,
      currentplan,
      localizedPrice,
    } = this.state;
    const { isLoading, loaderMessage, theme, userDetails } = this.props;

    return (
      <>
        <View
          style={[
            PrivacySettingStyle.container,
            { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
          ]}
        >
          {/* <NavigationEvents onDidFocus={() => this.onFocusFunction()} /> */}
          <Header
            isShowBack={true}
            title={StaticTitle.privacysettings}
            theme={theme}
            onPressed={() => this.props.navigation.openDrawer()}
          />
          <View style={PrivacySettingStyle.maincontainer}>
            <Text
              style={[
                PrivacySettingStyle.headingtitle,
                { color: theme.LITE_FONT_COLOR },
              ]}
            >
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
                  onValueChange={() => this.changeHideProfile()}
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
              <View style={[PrivacySettingStyle.marginTop]}>
                <PrimaryButton
                  onPress={() => this.updateUserSettingsAPI()}
                  btnName={"Update Settings"}
                />
              </View>

              <Text
                style={[
                  PrivacySettingStyle.headingtitle,
                  { color: theme.LITE_FONT_COLOR, marginVertical: 5 },
                ]}
              >
                {StaticTitle.premiumsetting}
              </Text>
              {renderIf(
                this.state.isSubsctiptionTrue,
                <View>
                  <View style={PrivacySettingStyle.separatorLine}></View>

                  <View style={PrivacySettingStyle.itemview}>
                    <Text
                      style={[
                        PrivacySettingStyle.itemtext,
                        { color: theme.DESCRIPTION_TEXT_COLOR },
                      ]}
                    >
                      {currentplan}
                    </Text>
                    <Text
                      style={[
                        PrivacySettingStyle.itemtext,
                        { color: theme.DESCRIPTION_TEXT_COLOR },
                      ]}
                    >
                      {localizedPrice}
                    </Text>
                  </View>

                  <View
                    style={[AuthStyle.signinbtnView, { marginHorizontal: 10 }]}
                  >
                    <PrimaryButton
                      onPress={() => this.gotoRequestPurchase()}
                      btnName={StaticTitle.subscribe}
                    />
                  </View>
                </View>
              )}
              {renderIf(
                !this.state.isSubsctiptionTrue,
                <View
                  style={[AuthStyle.signinbtnView, { marginHorizontal: 10 }]}
                >
                  <PrimaryButton btnName={StaticTitle.subscribed} />
                </View>
              )}
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
    userDetails: state.auth.user.userDetails,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateUserSettings: (params) => dispatch(actions.updateUserSettings(params)),
  initializeApp: (params) => dispatch(Authactions.initializeApp(params)),
  subscriptionSuccess: (params) =>
    dispatch(actions.subscriptionSuccess(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivacySettingsScreen);
