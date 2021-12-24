import React, { Component } from "react";
import {
  View,
  Keyboard,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  AppState,
  DeviceEventEmitter,
} from "react-native";
import { connect } from "react-redux";
import { AuthStyle } from "../../../assets/styles/AuthStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import { Search } from "../../../components";
import NavigationService from "../../../utils/NavigationService";
import { IMAGE } from "../../../assets/Images";
import { NavigationEvents, NavigationState } from "react-navigation";
import { Header, Loader } from "../../../components";
import * as actions from "../redux/Actions";
import * as globals from "../../../utils/Globals";
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FriendListStyle } from "../../../assets/styles/FriendListStyle";
import FastImage from "react-native-fast-image";
import { isEmpty } from "../../../utils/Validators";
import { darkTheme, lightTheme } from "../../../assets/Theme";
import * as Authactions from "../../authentication/redux/Actions";

const TAG = "SearchScreen ::=";
let gettotalCount;
export class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: "Gj",
      searchListdata: [],
      theme: {},

      countDeatils: {},
      appState: AppState.currentState,
      total_count: 0,
    };
    this.alert = "no";
    this.showAlert = this.showAlert.bind(this);
  }

  getActiveRouteState = (route) => {
    if (
      !route.routes ||
      route.routes.length === 0 ||
      route.index >= route.routes.length
    ) {
      return route;
    }

    const childActiveRoute = route.routes[route.index];
    return getActiveRouteState(childActiveRoute);
  };

  async componentDidMount() {
    // this.callInitAPI();
    let token = await AsyncStorage.getItem("access_token");
    globals.access_token = token;

    DeviceEventEmitter.addListener("total_count_remove", () => {
      this.setTotalCountsafterreview();
    });

    // DeviceEventEmitter.addListener(
    //   "received_push_notification",
    //   this.receivedPushNotification.bind()
    // );
    DeviceEventEmitter.addListener("recall_init_api", this.callInitAPI.bind());

    await this.setThemeModes();
    this.setState({ theme: this.props.theme }, () => {
      if (globals.isInternetConnected == true) {
        this.getnotificationCount();
      } else {
        Alert.alert(globals.warning, globals.noInternet);
      }
    });
    AppState.addEventListener("change", this._handleAppStateThemeChange);
  }

  componentWillUnmount = () => {
    DeviceEventEmitter.removeAllListeners("recall_init_api");
    // DeviceEventEmitter.removeAllListeners("received_push_notification");
    DeviceEventEmitter.removeAllListeners("total_count_remove");
    AppState.removeAllListeners("change", this._handleAppStateThemeChange);
  };

  callInitAPI = async () => {
    if (globals.isInternetConnected == true) {
      const { initializeApp } = this.props;
      initializeApp().then(async (res) => {
        // let token = await AsyncStorage.getItem("access_token");
        // globals.access_token = token;
      });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  _handleAppStateThemeChange = async (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.setThemeModes();
    }
    this.setState({ appState: nextAppState });
    this.setThemeModes();
  };

  setThemeModes = async () => {
    let them_mode = await AsyncStorage.getItem("them_mode");

    var newTheme = lightTheme;
    if (them_mode === globals.THEME_MODE.DARK) {
      newTheme = darkTheme;
    }
    this.setState({ theme: them_mode });
    this.props.swicthTheme(newTheme);
  };

  setTotalCountsafterreview = () => {
    this.setState({ total_count: 0 }, async () => {
      await AsyncStorage.setItem(
        "total_count",
        JSON.stringify(parseInt(this.state.total_count))
      );
    });
  };

  getnotificationCount = async () => {
    const { notificationCount } = this.props;
    notificationCount().then((res) => {
      if (res.value && res.value.data.success == true) {
        if (res.value && res.value.status === 200) {
          this.setNotificationCounts(res.value.data.data);
        }
      } else {
        if (res.value && res.value.data.error == "Unauthenticated.") {
          {
            NavigationService.navigate("Login");
          }
        }
        console.log(TAG, "notification count can't fetched");
      }
    });
  };

  setNotificationCounts = async (countDeatils) => {
    let count =
      (await JSON.parse(await AsyncStorage.getItem("total_count"))) ||
      countDeatils.total_count;
    let isitread = await AsyncStorage.getItem("IsRead");

    this.setState({
      countDeatils: countDeatils,
      total_count: isitread ? 0 : count,
    });
  };

  receivedPushNotification = async (msgDetails) => {
    const { nav } = this.props;
    const currentScreen = this.props.navigation.state.routeName;
    const { title, body, detail } = msgDetails;
    var detailObj = JSON.parse(detail);

    if (currentScreen == "ChatMessages") {
      await AsyncStorage.setItem("live_chatMessage", JSON.stringify(detailObj));
      NavigationService.navigate("ChatMessages", { user_info: detailObj });
    } else if (currentScreen == "ChatList") {
      console.log("in ELSE -->", currentScreen.routeName);
      {
        await AsyncStorage.setItem(
          "live_chatMessage",
          JSON.stringify(detailObj)
        );
        NavigationService.navigate("ChatMessages", {
          user_info: detailObj.sender_detail,
        });
      }
    } else {
      this.showAlert(title, body, detail);
    }
  };

  showAlert(title, body, detail) {
    var detailObj = JSON.parse(detail);

    if (this.alert === "yes") {
      return;
    }
    this.alert = "yes";

    Alert.alert(
      title,
      body,
      [
        {
          text: "Open Now",
          onPress: () => {
            console.log("Open-Now Pressed.");

            this.redirectToChatDetails(detail);

            this.alert = "no";
          },
        },
        {
          text: "Open Later",
          onPress: () => {
            console.log("Open-Later Pressed.");
            this.alert = "no";
          },
        },
      ],
      { cancelable: false }
    );
  }

  async redirectToChatDetails(chatDetail) {
    var object = JSON.parse(chatDetail);

    const { nav } = this.props;
    const currentScreen = this.props.navigation.state.routeName; // console.log(
    //   "redirectToChatDetails----------------currentScreen",
    //   currentScreen
    // );

    if (currentScreen == "ChatMessages") {
      await AsyncStorage.setItem("live_chatMessage", JSON.stringify(object));
      NavigationService.navigate("ChatMessages");
    } else if (currentScreen == "ChatList") {
      await AsyncStorage.setItem("live_chatMessage", JSON.stringify(object));
      NavigationService.navigate("ChatMessages", {
        user_info: object.sender_detail,
      });
    } else {
      NavigationService.navigate("ChatList");
    }
  }

  // clear States before leave this screen
  clearStates = () => {
    this.setState({
      txtSearch: "",
    });
  };

  // search vechicle by name
  getSearchResult = async () => {
    const { txtSearch } = this.state;
    if (isEmpty(txtSearch)) {
      await showMessage({
        message: StaticTitle.searchrequired,
        type: "danger",
        icon: "info",
        duration: 4000,
      });
      return false;
    }
    const { searchvehicle } = this.props;
    let params = new URLSearchParams();

    // Collect the necessary params
    params.append("search_by_vehicle", txtSearch);
    if (globals.isInternetConnected == true) {
      searchvehicle(params)
        .then(async (res) => {
          // console.log(
          //   TAG,
          //   "response of search vehical",
          //   JSON.stringify(res.value)
          // );
          if (res.value && res.value.data.success == true) {
            //OK 200 The request was fulfilled
            if (res.value && res.value.status === 200) {
              await showMessage({
                message: res.value.data.message,
                type: "success",
                icon: "info",
                duration: 4000,
              });
              this.setSearchdataList(res.value.data.data);
            }
          } else {
            if (res.value && res.value.data.error == "Unauthenticated.") {
              {
                NavigationService.navigate("Login");
              }
            } else if (res.value && res.value.data.search_by_vehicle) {
              await showMessage({
                message: res.value.data.search_by_vehicle,
                type: "danger",
                icon: "info",
                duration: 4000,
              });
            } else if (res.value && res.value.message) {
              await showMessage({
                message: res.value.message,
                type: "danger",
                icon: "info",
                duration: 4000,
              });
            }
          }
        })
        .catch((err) => {
          console.log(TAG, "i am in catch error search by vehical name", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  /// set Search data List
  setSearchdataList = (data) => {
    Keyboard.dismiss();
    this.setState({ searchListdata: data.search_data });
  };

  // render SearchList dataItem
  renderSearchList = ({ item, index }) => {
    return (
      <View style={FriendListStyle.itemcell}>
        {item.avatar ? (
          <View style={FriendListStyle.imageStyle}>
            <FastImage
              style={[FriendListStyle.imageStyle]}
              source={{
                uri: item.avatar,
              }}
            />
          </View>
        ) : (
          <View style={FriendListStyle.imageStyle}>
            <FastImage
              resizeMethod="resize"
              source={IMAGE.user}
              style={FriendListStyle.imageStyle}
            />
          </View>
        )}
        <View style={FriendListStyle.userdetail}>
          <Text
            style={[
              FriendListStyle.titleBig,
              { color: this.props.theme.LITE_FONT_COLOR },
            ]}
          >
            {item.name ? item.name + " " + item.surname : "-"}
          </Text>
          <Text
            style={[
              FriendListStyle.titleSmall,
              { color: this.props.theme.LITE_FONT_COLOR },
            ]}
          >
            {item.car_make_model ? item.car_make_model : "-"}
          </Text>
          <Text
            style={[
              FriendListStyle.titleSmall,
              { color: this.props.theme.LITE_FONT_COLOR },
            ]}
          >
            {item.registration_number ? item.registration_number : "-"}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            FriendListStyle.squareView,
            { backgroundColor: this.props.theme.NAVIGATION_ARROW_COLOR },
          ]}
          onPress={() => this.navigateToDetailScreen(item, index)}
        >
          <FastImage
            style={[FriendListStyle.navigateimgStyle]}
            source={IMAGE.navigate_img}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // navigate to detailed scren
  navigateToDetailScreen = (item, index) => {
    NavigationService.navigate("FriendDetail", { FriendData: item });
  };

  // seprate component
  separatorComponent = () => {
    return <View style={FriendListStyle.separatorLine} />;
  };

  render() {
    const { isLoading, loaderMessage, theme } = this.props;
    const { txtSearch, searchListdata, countDeatils, total_count } = this.state;
    return (
      <>
        <View
          style={[
            AuthStyle.container,
            { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
          ]}
        >
          {isLoading && (
            <Loader isOverlay={true} loaderMessage={loaderMessage} />
          )}
          <NavigationEvents onWillBlur={() => this.clearStates()} />
          <Header
            isShowBack={false}
            title={""}
            onPressed={() => this.props.navigation.openDrawer()}
            isShowRighttwo={true}
            theme={theme}
            countDeatils={countDeatils}
            total_count={total_count}
          />
          <Search
            theme={theme}
            value={txtSearch}
            blurOnSubmit={false}
            returnKeyType="done"
            onSubmitEditing={() => this.getSearchResult()}
            autoCapitalize={"none"}
            onChangeText={(text) =>
              this.setState({
                txtSearch: text,
              })
            }
            placeholderText={StaticTitle.searchbyVehicalNum}
            onPress={() => this.getSearchResult()}
          />
          <FlatList
            data={searchListdata}
            style={[FriendListStyle.flatliststyle]}
            renderItem={(item, index) => this.renderSearchList(item, index)}
            keyExtractor={(item, index) => "D" + index.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={this.separatorComponent}
          />
          {/* )} */}
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nav: state.nav,
    isLoading: state.home.home.isLoading,
    loaderMessage: state.home.home.loaderMessage,
    theme: state.home.home.theme,
  };
};
const mapDispatchToProps = (dispatch) => ({
  searchvehicle: (params) => dispatch(actions.searchvehicle(params)),
  notificationCount: (params) => dispatch(actions.notificationCount(params)),
  swicthTheme: (params) => dispatch(actions.swicthTheme(params)),
  initializeApp: (params) => dispatch(Authactions.initializeApp(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
