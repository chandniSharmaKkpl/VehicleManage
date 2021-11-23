import React, { Component } from "react";
import {
  View,
  Linking,
  FlatList,
  Alert,
  Text,
  AppState,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { FriendDetailStyle } from "../../../assets/styles/FriendDetailStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import { Loader } from "../../../components";
import NavigationService from "../../../utils/NavigationService";
import { Messages } from "../../../utils/Messages";
import { IMAGE } from "../../../assets/Images";
import { NavigationEvents } from "react-navigation";
import FastImage from "react-native-fast-image";
import Colors from "../../../assets/Colors";
import LinearGradient from "react-native-linear-gradient";
import * as globals from "../../../utils/Globals";
import * as actions from "../redux/Actions";
import * as chatactions from "../chat/redux/Actions";
import { showMessage, hideMessage } from "react-native-flash-message";

const TAG = "FriendDetailScreen ::=";

export class FriendDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getfriendData: this.props.navigation.state.params.FriendData,
      friendDetail: [],
      user: {},
      loader: false,
      webSocketServerConnected: false,
      isUserRegister: false,
    };
    global.ws = null;
    this.registerDeviceTimer = null;
    this.closeOrInActiveScreen = this.closeOrInActiveScreen.bind(this);
    this.connectWebSocket = this.connectWebSocket.bind(this);
    this.registerAndSubscribe = this.registerAndSubscribe.bind(this);
    this.searchFromUser = this.searchFromUser.bind(this);
  }

  UNSAFE_componentWillReceiveProps = (newProps) => {
    // Register is one call at single time, after
    if (!this.state.isUserRegister && this.registerDeviceTimer == null) {
      // Start 3 seconds interval,
      // This will check is internel

      this.registerDeviceTimer = setInterval(() => {
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
  };

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
      this.setState({ user: this.props.userDetails.user_data }, () => {
        this.getuserDetail();
        this.connectWebSocket();
      });
    }
    AppState.addEventListener("change", this._handleAppStateChange);
  };

  componentWillUnmount() {
    AppState.removeAllListeners("change", this._handleAppStateChange);
    this.closeOrInActiveScreen();
  }

  _handleAppStateChange = (nextAppState) => {
    // console.log("_handleAppStateChange() nextAppState :-->", nextAppState);
    if (nextAppState.match(/inactive|background/)) {
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
    alert(" --- Connected-------------------------");

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
          let currentScreen =
            nav.routes[2].routes[0].routes[1].routes[nav.routes.length - 1]
              .routeName;
          console.log("currentScreen ", currentScreen);

          // var payload = {
          //   msg_data: object,
          //   user_data: this.searchFromUser(from_id),
          // };
          // this.props.receivedChatMessage(payload);
          // }
          if (currentScreen == "ChatMessages") {
            const currentScreenParams =
              nav.routes[2].routes[0].routes[1].routes[nav.routes.length - 1]
                .params;
            console.log("currentScreenParams :->", currentScreenParams);
            console.log("parseInt(from_id)===", parseInt(from_id));
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
        }else if (object.command == "register" || object.command == "unregister"){
          if (!this.state.isUserRegister && this.registerDeviceTimer == null) {
            // Start 3 seconds interval,
            // This will check is internel
      
            this.registerDeviceTimer = setInterval(() => {
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
      }
    };
    global.ws.onerror = ({ error }) => {
      console.log(Platform.OS + " --- WS OnError() ---->", error);
      // Alert.alert("Websocket Error", error);
      global.ws = null;
    };

    global.ws.onclose = ({ event }) => {
      console.log(Platform.OS + " --- WS onClose() ---->", event);
      // console.warn(" --- WS onClose() ---->");
    };
  }

  searchFromUser(from_id) {
    console.log("searchFromUser() from_id :-->", this.state.getfriendData);

    var user = {};

    if (Number(this.state.getfriendData.id) == Number(from_id)) {
      user = this.state.getfriendData;
    }

    return user;
  }

  // API call of get user details
  getuserDetail = async () => {
    const { getfriendData } = this.state;
    const { getfriendDetails } = this.props;
    let params = new URLSearchParams();
    // Collect the necessary params
    if (globals.isInternetConnected == true) {
      params.append("friend_id", getfriendData.id);
      getfriendDetails(params)
        .then(async (res) => {
          // console.log(
          //   TAG,
          //   "response of getfriend Details",
          //   JSON.stringify(res.value.data.data)
          // );
          if (res.value && res.value.data.success == true) {
            //OK 200 The request was fulfilled
            if (res.value && res.value.status === 200) {
              // await showMessage({
              //   message: res.value.data.message,
              //   type: "success",
              //   icon: "info",
              //   duration: 4000,
              // });
              await this.friendsearchApi(res.value.data.data.user_data);
              this.setState({ friendDetail: res.value.data.data.user_data });
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
                icon: "info",
                duration: 4000,
              });
            }
          }
        })
        .catch((err) => {
          console.log(TAG, "i am in catch error getfriendDetails", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  friendsearchApi = (frndsearchData) => {
    // console.log("frndsearchData=============", frndsearchData);
    const { friendsearch } = this.props;
    let params = new URLSearchParams();
    // Collect the necessary params
    if (globals.isInternetConnected == true) {
      params.append("searched_id", frndsearchData.id);
      friendsearch(params)
        .then(async (res) => {
          // console.log(
          //   TAG,
          //   "response of friendsearch",
          //   JSON.stringify(res.value)
          // );
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
          console.log(TAG, "i am in catch error friendsearch", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  // Navigate to back friend list screen
  gotoback = () => {
    NavigationService.back();
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
      // console.log("params====AddasFriend", JSON.stringify(params));
      addfriend(params)
        .then(async (res) => {
          // console.log(
          //   TAG,
          //   "response of addfriend",
          //   JSON.stringify(res.value.data)
          // );
          if (res.value && res.value.data.success == true) {
            //OK 200 The request was fulfilled
            if (res.value && res.value.status === 200) {
              await this.getuserDetail();
              await showMessage({
                message: res.value.data.message,
                type: "success",
                icon: "info",
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
                icon: "info",
                duration: 4000,
              });
            }
          }
        })
        .catch((err) => {
          console.log(TAG, "i am in catch error addfriend", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  // navigate to gotochatdetailscreen
  gotochatdetailscreen = () => {
    const { friendDetail } = this.state;
    NavigationService.navigate("ChatMessages", { user_info: friendDetail });
  };

  // navigate Social Profiles
  navigatetoSocialProfiles = (isFrom, name) => {
    let SocialURL;
    if (isFrom == "Fb") {
      SocialURL = "https://www.facebook.com/" + name;
    } else if (isFrom == "Insta") {
      SocialURL = "https://www.instagram.com/" + name;
    } else if (isFrom == "Snap") {
      SocialURL = "https://www.snapchat.com/" + name;
    } else {
      SocialURL = "https://www.google.com" + name;
    }

    Linking.canOpenURL(SocialURL).then((supported) => {
      if (supported) {
        Linking.openURL(SocialURL);
      } else {
      }
    });
  };

  render() {
    const { isLoading, loaderMessage, theme } = this.props;
    const { friendDetail } = this.state;
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
            {friendDetail.avatar ? (
              <Image
                style={FriendDetailStyle.imageStyle}
                source={{
                  uri: friendDetail.avatar,
                }}
              />
            ) : (
              <Image
                resizeMethod="resize"
                source={IMAGE.user}
                style={[FriendDetailStyle.imageStyle]}
              />
            )}

            <View style={FriendDetailStyle.backbtnview}>
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
            </View>
            <View style={FriendDetailStyle.userdetailview}>
              {friendDetail.username ? (
                <Text numberOfLines={2} style={FriendDetailStyle.headingtitle}>
                  {friendDetail.username}
                </Text>
              ) : null}
              {friendDetail.city ? (
                <Text numberOfLines={1} style={FriendDetailStyle.titletext}>
                  {friendDetail.city}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={FriendDetailStyle.middleview}>
            {friendDetail.is_friend == false ? (
              <TouchableOpacity
                onPress={() => this.AddasFriend()}
                style={[
                  FriendDetailStyle.circleview,
                  { backgroundColor: Colors.primary },
                ]}
              >
                <FastImage
                  style={[FriendDetailStyle.socialicon]}
                  source={IMAGE.social_group_img}
                />
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              onPress={() =>
                this.navigatetoSocialProfiles("Fb", friendDetail.username)
              }
              style={[
                FriendDetailStyle.circleview,
                { backgroundColor: Colors.blue },
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
                style={FriendDetailStyle.circleview}
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
                { backgroundColor: Colors.snapChat },
              ]}
            >
              <FastImage
                style={[FriendDetailStyle.socialicon]}
                source={IMAGE.snap_img}
              />
            </TouchableOpacity>
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
  getfriendDetails: (params) => dispatch(actions.getfriendDetails(params)),
  addfriend: (params) => dispatch(actions.addfriend(params)),
  friendsearch: (params) => dispatch(actions.friendsearch(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendDetailScreen);
