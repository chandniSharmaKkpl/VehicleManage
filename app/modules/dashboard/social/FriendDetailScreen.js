import React, { Component } from "react";
import {
  View,
  Linking,
  FlatList,
  Alert,
  Text,
  AppState,
  Image,
  ImageBackground,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { connect } from "react-redux";
import { FriendDetailStyle } from "../../../assets/styles/FriendDetailStyle";
import { Loader } from "../../../components";
import NavigationService from "../../../utils/NavigationService";
import { IMAGE } from "../../../assets/Images";
import FastImage from "react-native-fast-image";
import Colors from "../../../assets/Colors";
import LinearGradient from "react-native-linear-gradient";
import * as globals from "../../../utils/Globals";
import * as actions from "../redux/Actions";
import * as chatactions from "../chat/redux/Actions";
import { showMessage } from "react-native-flash-message";

export class FriendDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getfriendData: this.props.navigation.state.params.FriendData,
      previous_screen: this.props.navigation.state.params.previous_screen,
      friendDetail: [],
      user: {},
      loader: false,
      webSocketServerConnected: false,
      isUserRegister: false,
      isrequested: 0,
    };
    global.ws = null;
    this.registerDeviceTimer = null;
    this.closeOrInActiveScreen = this.closeOrInActiveScreen.bind(this);
    this.connectWebSocket = this.connectWebSocket.bind(this);
    this.registerAndSubscribe = this.registerAndSubscribe.bind(this);
    this.searchFromUser = this.searchFromUser.bind(this);
  }

  gotoSocketRegister() {
    // Register is one call at single time, after
    if (!this.state.isUserRegister && this.registerDeviceTimer == null) {
      // Start 3 seconds interval,
      // This will check is internel
      console.warn(
        "i am in props==> before 3=>",
        this.state.webSocketServerConnected
      );
      this.registerDeviceTimer = setInterval(() => {
        console.warn("i am in props==>", this.state.webSocketServerConnected);

        if (this.state.webSocketServerConnected) {
          if (
            this.registerDeviceTimer != undefined ||
            this.registerDeviceTimer != null
          ) {
            clearInterval(this.registerDeviceTimer);
            this.registerDeviceTimer = null;
          }
          this.registerAndSubscribe();
        }
      }, 3000);
    }
  }

  registerAndSubscribe() {
    const { userDetails } = this.props;
    let usersdata = userDetails.user_data;
    const chat_user_id = usersdata.user_id;

    // console.log("registerAndSubscribe() chat_user_id :->", chat_user_id);
    global.ws.send(
      JSON.stringify({ command: "register", userId: chat_user_id })
    );

    this.setState({
      isUserRegister: true,
    });
  }

  componentDidMount = async () => {
    if (this.props.userDetails != null && this.props.userDetails != undefined) {
      this.setState({ user: this.props.userDetails.user_data });
      this.getUserDetails();
      this.connectWebSocket();
      this.gotoSocketRegister();
    }
    AppState.addEventListener("change", this._handleAppStateChange);
  };

  componentWillUnmount() {
    AppState.removeAllListeners("change", this._handleAppStateChange);
    this.closeOrInActiveScreen();
  }

  _handleAppStateChange = (nextAppState) => {
    // console.log("_handleAppStateChange() nextAppState :-->", nextAppState);
    if (nextAppState.match(/background/)) {
      this.closeOrInActiveScreen();
    } else if (nextAppState.match(/active/)) {
      this.connectWebSocket();
    }
  };

  closeOrInActiveScreen() {
    if (this.registerDeviceTimer !== null) {
      clearInterval(this.registerDeviceTimer);
      this.registerDeviceTimer = null;
    }

    if (global.ws !== null) {
      const { userDetails } = this.props;
      let usersdata = userDetails.user_data;
      const chat_user_id = usersdata.user_id;

      // console.log("unregister chat_user_id :->", chat_user_id);

      global.ws.send(
        JSON.stringify({
          command: "unregister",
          userId: chat_user_id,
          offline_user_id: userDetails.user_data.user_id,
        })
      );

      // setTimeout(() => {
      try {
        global.ws.close();
      } catch (err) {
        // console.log("Error while connection close :->", err);
      }
      // }, 3000)
    }
  }

  connectWebSocket() {
    global.ws = new WebSocket("ws://20.37.36.107:56113");
    global.ws.onopen = (data) => {
      if (data.isTrusted === false) {
        this.setState({
          loader: false,
          webSocketServerConnected: true,
        });
      } else {
        this.setState({
          webSocketServerConnected: true,
        });
        alert("Something wen to wrong");
      }
    };

    global.ws.onmessage = ({ data }) => {
      console.log(Platform.OS + " --- WS OnMessage() ---->", data);

      const object = JSON.parse(data);
      if (object.command != undefined) {
        if (object.command == "message") {
          console.log("object.command===", object.command);
          // Message received
          var from_id = Number(object.from);
          // 1st check is current chatDetails screen user have same user-id ot not, if same then only call Reducer

          const { nav } = this.props;
          console.warn(
            "currentScreen from frnd details screen======>",
            JSON.stringify(
              nav.routes[nav.routes.length - 1].routes[0].routes[0].routes[2]
            )
          );
          let currentScreen =
            nav.routes[nav.routes.length - 1].routes[0].routes[0].routes[2]
              .routeName;
          // var payload = {
          //   msg_data: object,
          //   user_data: this.searchFromUser(from_id),
          // };
          // this.props.receivedChatMessage(payload);
          // }
          if (currentScreen == "ChatMessages") {
            const currentScreenParams =
              nav.routes[nav.routes.length - 1].routes[0].routes[0].routes[2]
                .params;

            if (currentScreenParams !== undefined) {
              var userScreenLoadUserId = currentScreenParams.user_info.id;
              console.log("userScreenLoadUserId :->", userScreenLoadUserId);

              console.log("from_id :->", from_id);

              if (parseInt(from_id) == userScreenLoadUserId) {
                console.log("Inside ID both user are matched....");
                var payload = {
                  msg_data: object,
                  user_data: this.searchFromUser(from_id),
                };
                this.props.receivedChatMessage(payload);
              }
            }
          }
        }
        // else if (
        //   object.command == "register" ||
        //   object.command == "unregister"
        // ) {
        //   if (!this.state.isUserRegister && this.registerDeviceTimer == null) {
        //     // Start 3 seconds interval,
        //     // This will check is internel

        //     this.registerDeviceTimer = setInterval(() => {
        //       if (this.state.webSocketServerConnected) {
        //         if (
        //           this.registerDeviceTimer != undefined ||
        //           this.registerDeviceTimer != null
        //         ) {
        //           clearInterval(this.registerDeviceTimer);
        //           this.registerDeviceTimer = null;
        //         }

        //         this.registerAndSubscribe();
        //       }
        //     }, 3000);
        //   }
        // }
      }
    };
    global.ws.onerror = ({ error }) => {
      console.log(Platform.OS + " --- WS OnError() ---->", error);
      // Alert.alert("Websocket Error", error);
      global.ws = null;
    };

    global.ws.onclose = ({ event }) => {
      console.log(Platform.OS + " --- WS onClose() ---->", event);
    };
  }

  searchFromUser(from_id) {
    var user = {};
    if (Number(this.state.getfriendData.id) == Number(from_id)) {
      user = this.state.getfriendData;
    }
    return user;
  }

  // API call of get user details
  getUserDetails = async () => {
    const { getfriendData } = this.state;
    const { getFriendDetails } = this.props;
    let params = new URLSearchParams();
    // Collect the necessary params
    if (globals.isInternetConnected == true) {
      params.append("friend_id", getfriendData.id);
      getFriendDetails(params)
        .then(async (res) => {
          if (res.value && res.value.data.success == true) {
            //OK 200 The request was fulfilled
            if (res.value && res.value.status === 200) {
              await this.friendsearchApi(res.value.data.data.user_data);
              this.setState({
                friendDetail: res.value.data.data.user_data,
                isrequested: res.value.data.data.requested,
              });
            }
          } else {
            if (res.value && res.value.data.error == "Unauthenticated.") {
              {
                NavigationService.navigate("Login");
              }
            } else if (res.value && res.value.data.error) {
              await showMessage({
                message: res.value.message,
                type: "danger",
                icon: "auto",
                duration: 4000,
              });
            }
          }
        })
        .catch((err) => {
          console.log("i am in catch error getFriendDetails", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  friendsearchApi = (frndsearchData) => {
    const { friendsearch } = this.props;
    let params = new URLSearchParams();
    // Collect the necessary params
    if (globals.isInternetConnected == true) {
      params.append("searched_id", frndsearchData.id);
      friendsearch(params)
        .then(async (res) => {
          if (res.value && res.value.data.success == true) {
            //OK 200 The request was fulfilled
            if (res.value && res.value.status === 200) {
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
          console.log("i am in catch error friendsearch", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  // Navigate to back friend list screen
  gotoback = () => {
    NavigationService.back();
  };

  // request for socials
  requestforSocialApi = (friendDetail) => {
    const { requestforsocial } = this.props;
    let params = new FormData();
    // Collect the necessary params
    if (globals.isInternetConnected == true) {
      params.append("to_id", friendDetail.id);

      requestforsocial(params)
        .then(async (res) => {
          if (res.value && res.value.data.success == true) {
            //OK 200 The request was fulfilled
            if (res.value && res.value.status === 200) {
              await showMessage({
                message: res.value.data.message,
                type: "success",
                icon: "auto",
                duration: 4000,
              });
            }
          } else {
            if (res.value && res.value.data.error == "Unauthenticated.") {
              {
                NavigationService.navigate("Login");
              }
            } else if (res.value && res.value.message == "Validation Error.") {
              await showMessage({
                message: res.value.data.to_id,
                type: "danger",
                icon: "auto",
                duration: 4000,
              });
            } else if (
              res.value &&
              res.value.message == "Friend request is already requested."
            ) {
              await showMessage({
                message: res.value.message,
                type: "danger",
                icon: "auto",
                duration: 4000,
              });
            }
          }
        })
        .catch((err) => {
          console.log("i am in catch error addfriend", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  // AddasFriend API
  AddasFriend = () => {
    const { getfriendData, user } = this.state;
    const { addfriend } = this.props;
    let params = new URLSearchParams();
    // Collect the necessary params
    if (globals.isInternetConnected == true) {
      params.append("user_id", user.user_id);
      params.append("friend_id", getfriendData.id);
      addfriend(params)
        .then(async (res) => {
          if (res.value && res.value.data.success == true) {
            //OK 200 The request was fulfilled
            if (res.value && res.value.status === 200) {
              await this.getUserDetails();
              await showMessage({
                message: res.value.data.message,
                type: "success",
                icon: "auto",
                duration: 4000,
              });
            }
          } else {
            if (res.value && res.value.data.error == "Unauthenticated.") {
              {
                NavigationService.navigate("Login");
              }
            } else if (res.value && res.value.data.error) {
              await showMessage({
                message: res.value.message,
                type: "danger",
                icon: "auto",
                duration: 4000,
              });
            }
          }
        })
        .catch((err) => {
          console.log("i am in catch error addfriend", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  // navigate to gotochatdetailscreen
  gotochatdetailscreen = () => {
    const { friendDetail } = this.state;
    NavigationService.navigate("ChatMessages", {
      user_info: friendDetail,
      previous_screen: "friendDetail",
    });
  };

  // navigate Social Profiles
  navigatetoSocialProfiles = (isFrom, name) => {
    console.log("friendDetails", this.state.friendDetail.instagram_username);

    let SocialURL;
    if (isFrom == "Fb") {
      if (this.state.friendDetail.fb_username) {
        SocialURL = this.state.friendDetail.fb_username;
      } else {
        SocialURL = "https://www.facebook.com/";
      }
    } else if (isFrom == "Insta") {
      if (this.state.friendDetail.instagram_username) {
        SocialURL = this.state.friendDetail.instagram_username;
      } else {
        SocialURL = "https://www.instagram.com/";
      }
    } else if (isFrom == "Snap") {
      if (this.state.friendDetail.snapchat_username) {
        SocialURL = this.state.friendDetail.snapchat_username;
      } else {
        SocialURL = "https://www.snapchat.com/";
      }
    }
    // else {
    //   SocialURL = "https://www.google.com/" + name;
    // }
    Linking.openURL(SocialURL);
  };

  returnRequestButton() {
    return (
      // <View style={([FriendDetailStyle.beforesquareview], { marginTop: 15 })}>
      <View
        style={[
          FriendDetailStyle.beforesquareview,
          { marginTop: this.state.previous_screen === "search" ? 15 : 0 },
        ]}
      >
        <TouchableWithoutFeedback
          onPress={() => this.requestforSocialApi(this.state.friendDetail)}
          style={[
            FriendDetailStyle.squareviews,
            {
              backgroundColor: Colors.btnSecondaryPrimary,
            },
          ]}
        >
          <Text
            numberOfLines={1}
            style={[
              FriendDetailStyle.dectext,
              {
                color: Colors.white,
                fontSize: globals.font_14,
                width: "100%",
              },
            ]}
          >
            {"Request for social"}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  returnSocialIconViews = () => {
    const { friendDetail } = this.state;
    return (
      <>
        <TouchableOpacity
          onPress={() =>
            this.navigatetoSocialProfiles("Fb", friendDetail.username)
          }
          style={[
            FriendDetailStyle.circleview,
            {
              backgroundColor: Colors.blue,
              marginTop: this.state.previous_screen === "search" ? 15 : 0,
            },
          ]}
        >
          <FastImage
            style={[FriendDetailStyle.socialicon]}
            source={IMAGE.fb_icon_square}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            this.navigatetoSocialProfiles("Insta", friendDetail.username)
          }
        >
          <LinearGradient
            start={{ x: 0.0, y: 0.5 }}
            end={{ x: 0.7, y: 1.0 }}
            colors={[Colors.orange, Colors.pink, Colors.purple]}
            style={[
              FriendDetailStyle.circleview,
              { marginTop: this.state.previous_screen === "search" ? 15 : 0 },
            ]}
          >
            <FastImage
              style={[FriendDetailStyle.socialicon]}
              source={IMAGE.insta_icon_img}
            />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            this.navigatetoSocialProfiles("Snap", friendDetail.username)
          }
          style={[
            FriendDetailStyle.circleview,
            {
              backgroundColor: Colors.snapChat,
              marginTop: this.state.previous_screen === "search" ? 15 : 0,
            },
          ]}
        >
          <FastImage
            style={[FriendDetailStyle.socialicon]}
            source={IMAGE.snap_img}
          />
        </TouchableOpacity>
      </>
    );
  };

  returnRequestButtonDisable = () => {
    return (
      <View
        style={[
          FriendDetailStyle.beforesquareview,
          { marginTop: this.state.previous_screen === "search" ? 15 : 0 },
        ]}
      >
        <TouchableWithoutFeedback
          onPress={() => null}
          style={[
            FriendDetailStyle.squareviews,
            {
              opacity: 0.7,
              backgroundColor: Colors.btnSecondaryPrimary,
            },
          ]}
        >
          <Text
            numberOfLines={1}
            style={[
              FriendDetailStyle.dectext,
              {
                color: Colors.white,
                fontSize: globals.font_14,
                width: "100%",
              },
            ]}
          >
            {"Requested"}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  render() {
    const { isLoading, loaderMessage, theme } = this.props;
    const { friendDetail, isrequested, user, getfriendData } = this.state;
    return (
      <>
        <View
          style={[
            FriendDetailStyle.container,
            { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
          ]}
        >
          {isLoading && (
            <Loader isOverlay={true} loaderMessage={loaderMessage} />
          )}
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />

          <View style={FriendDetailStyle.halfContainer}>
            <ImageBackground
              style={FriendDetailStyle.imageStyle}
              source={
                friendDetail.avatar
                  ? {
                      uri: friendDetail.avatar,
                    }
                  : IMAGE.user
              }
            >
              <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0.5 }}
                colors={[Colors.black1, Colors.transparent]}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <View
                  style={{
                    justifyContent: "flex-start",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.gotoback()}
                    style={FriendDetailStyle.squareView}
                  >
                    <FastImage
                      style={[FriendDetailStyle.navigateimgStyle]}
                      source={IMAGE.backArrow}
                      tintColor={Colors.black}
                    />
                  </TouchableOpacity>
                  <View style={[FriendDetailStyle.userdetailview]}>
                    {friendDetail.username ? (
                      <Text
                        numberOfLines={2}
                        style={FriendDetailStyle.headingtitle}
                      >
                        {friendDetail.username}
                      </Text>
                    ) : null}
                    {friendDetail.city ? (
                      <Text
                        numberOfLines={1}
                        style={FriendDetailStyle.titletext}
                      >
                        {friendDetail.city}
                      </Text>
                    ) : null}
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>

          <View style={FriendDetailStyle.middleview}>
            {friendDetail.is_friend == false ? (
              <TouchableOpacity
                onPress={() => this.AddasFriend()}
                style={[
                  FriendDetailStyle.circleview,
                  {
                    backgroundColor: Colors.primary,
                    marginTop: this.state.previous_screen === "search" ? 15 : 0,
                  },
                ]}
              >
                <FastImage
                  style={[FriendDetailStyle.socialicon]}
                  source={IMAGE.social_group_img}
                />
              </TouchableOpacity>
            ) : null}
            {friendDetail.setting_4 == 1 && isrequested == 0
              ? this.returnRequestButton()
              : friendDetail.setting_4 == 1 && isrequested == 1
              ? this.returnSocialIconViews()
              : friendDetail.setting_4 == 1 && isrequested == 2
              ? this.returnRequestButtonDisable()
              : this.returnSocialIconViews()}
          </View>

          <View
            style={[
              FriendDetailStyle.secondhalfview,
              { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
            ]}
          >
            <View style={FriendDetailStyle.descriptionContainer}>
              <Text
                numberOfLines={1}
                style={[
                  FriendDetailStyle.dectext,
                  { color: theme.LITE_FONT_COLOR },
                ]}
              >
                {"About" + " " + friendDetail.username}
              </Text>
              <ScrollView
                ref={(node) => (this.scroll = node)}
                automaticallyAdjustContentInsets={true}
                enableOnAndroid={true}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="never"
                style={{ height: globals.deviceHeight * 0.25 }}
              >
                <Text
                  style={[
                    FriendDetailStyle.itemtext,
                    { color: theme.DESCRIPTION_TEXT_COLOR },
                  ]}
                >
                  {friendDetail.user_description}
                </Text>
              </ScrollView>
            </View>
          </View>
          {friendDetail.is_friend == false ? null : (
            <View style={FriendDetailStyle.bottomview}>
              <TouchableOpacity
                onPress={() => this.gotochatdetailscreen()}
                style={[
                  FriendDetailStyle.bottomcircleview,
                  {
                    backgroundColor: theme.CHAT_BTN_COLOR,
                  },
                ]}
              >
                <FastImage
                  style={[FriendDetailStyle.bottomicon]}
                  source={IMAGE.chatboxes_img}
                  tintColor={Colors.white}
                />
              </TouchableOpacity>
            </View>
          )}
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
    userDetails: state.auth.user.userDetails,
  };
};

const mapDispatchToProps = (dispatch) => ({
  receivedChatMessage: (params) =>
    dispatch(chatactions.receivedChatMessage(params)),
  getFriendDetails: (params) => dispatch(actions.getFriendDetails(params)),
  addfriend: (params) => dispatch(actions.addfriend(params)),
  friendsearch: (params) => dispatch(actions.friendsearch(params)),
  requestforsocial: (params) => dispatch(actions.requestforsocial(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendDetailScreen);
