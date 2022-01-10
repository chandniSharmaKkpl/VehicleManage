import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  AppState,
  Alert,
  TouchableOpacity,
  DeviceEventEmitter,
} from "react-native";
import { connect } from "react-redux";
import { FriendListStyle } from "../../../assets/styles/FriendListStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import { Search, Loader } from "../../../components";
import NavigationService from "../../../utils/NavigationService";
import { IMAGE } from "../../../assets/Images";
import { NavigationEvents } from "react-navigation";
import Header from "../../../components/Header";
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CHAT_MESSAGE_TYPE } from "../../../utils/Globals";
import * as actions from "./redux/Actions";
import * as globals from "../../../utils/Globals";

const TAG = "ChatListScreen ::=";

export class ChatListScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      webSocketServerConnected: false,
      searchTxt: "",
      dataArray: [],
      chatName: [],

      isUserRegister: false,
      loader: false,
    };
    global.ws = null;
    this.registerDeviceTimer = null;
    this.callAPI = this.callAPI.bind(this);
    this.searchFromUser = this.searchFromUser.bind(this);
    this.getchatListAPI = this.getchatListAPI.bind(this);
    this.connectWebSocket = this.connectWebSocket.bind(this);
    this.callMessageListAPI = this.callMessageListAPI.bind(this);
    this.registerAndSubscribe = this.registerAndSubscribe.bind(this);
    this.searchByName = this.searchByName.bind(this);
    this.updateUnreadCount = this.updateUnreadCount.bind(this);
    this.closeOrInActiveScreen = this.closeOrInActiveScreen.bind(this);
  }
  UNSAFE_componentWillReceiveProps = (newProps) => {
    if (
      this.state.dataArray.length == newProps.chatList.length &&
      newProps.isReceiveChatMessage == true &&
      newProps.chatMessages.length > 0
    ) {
      var newDataArray = this.state.dataArray;
      newDataArray.forEach((data) => {
        newProps.chatMessages.forEach((msg) => {
          var from_id = msg.from_id;
          if (
            data.type == CHAT_MESSAGE_TYPE.ROADIE &&
            parseInt(data.id) == parseInt(from_id)
          ) {
            data.unread_count = parseInt(data.unread_count) + 1;
          }
        });
      });
    } else {
      this.setState(
        {
          dataArray: newProps.chatList,
          chatName: newProps.chatList,
        },
        () => {
          // Register is one call at single time, after
          if (
            this.state.dataArray.length > 0 &&
            !this.state.isUserRegister &&
            this.registerDeviceTimer == null
          ) {
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
      );
    }
  };

  async componentDidMount() {
    this.onFocusFunction();

    let token = await AsyncStorage.getItem("access_token");
    globals.access_token = token;
    // this.focusListener = this.props.navigation.addListener("didFocus", () => {
    //   this.onFocusFunction();
    // });
  }

  onFocusFunction = async () => {
    this._isMounted = true;
    if (globals.isInternetConnected == true) {
      this.callMessageListAPI();
      this.connectWebSocket();
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }

    DeviceEventEmitter.removeAllListeners("fetch_message_list");
    DeviceEventEmitter.addListener("fetch_message_list", this.callAPI.bind());
    // DeviceEventEmitter.addListener(
    //   "received_push_notification",
    //   this.receivedPushNotification.bind()
    // );
    AppState.addEventListener("change", this._handleAppStateChange);
  };

  componentWillUnmount() {
    this._isMounted = false;
    AppState.removeAllListeners("change", this._handleAppStateChange);
    DeviceEventEmitter.removeAllListeners("fetch_message_list");

    this.closeOrInActiveScreen();
    // this.focusListener.remove();
  }

  connectWebSocket() {
    global.ws = new WebSocket("ws://20.37.36.107:56113");
    global.ws.onopen = (data) => {
      console.log("in global.ws.onopen", data);

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
      const object = JSON.parse(data);
      if (object.command != undefined) {
        if (object.command == "message") {
          // Message received
          var from_id = Number(object.from);
          // 1st check is current chatDetails screen user have same user-id ot not, if same then only call Reducer

          const { nav } = this.props;
          // const currentScreen = this.props.navigation.state.routeName;
          // let currentScreen =
          //   nav.routes[2].routes[0].routes[nav.routes.length - 1].routes;

          let currentScreen =
            nav.routes[nav.routes.length - 1].routes[0].routes[
              nav.routes.length - 1
            ].routes;

          // const currentScreen = nav.routes[nav.routes.length - 1].routeName;

          // we can get routeName with below console
          // console.log(
          //   "nav.routes",
          //   JSON.stringify(
          //     nav.routes[nav.routes.length - 1].routes[0].routes[2].routes[1]
          //       .routeName
          //   )
          // );

          console.log("currentScreen", currentScreen);

          if (currentScreen[1].routeName == "ChatMessages") {
            const currentScreenParams = currentScreen[1].params;
            if (currentScreenParams !== undefined) {
              var userScreenLoadUserId = currentScreenParams.user_info.id;
              if (parseInt(from_id) == userScreenLoadUserId) {
                var payload = {
                  msg_data: object,
                  user_data: this.searchFromUser(from_id),
                };
                this.props.receivedChatMessage(payload);
              }
            }
          }
        }
      }
    };
    global.ws.onerror = ({ error }) => {
      global.ws = null;
    };

    global.ws.onclose = ({ event }) => {};
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState.match(/inactive|background/)) {
      this.closeOrInActiveScreen();
    } else if (nextAppState.match(/active/)) {
      this.callMessageListAPI();
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
      let chat_user_id = usersdata.user_id;

      global.ws.send(
        JSON.stringify({
          command: "unregister",
          userId: chat_user_id,
          offline_user_id: userDetails.user_data.user_id,
        })
      );

      try {
        global.ws.close();
      } catch (err) {}
    }
  }

  registerAndSubscribe() {
    const { userDetails } = this.props;
    let usersdata = userDetails.user_data;
    let chat_user_id = usersdata.user_id;

    if (global.ws !== null) {
      global.ws.send(
        JSON.stringify({ command: "register", userId: chat_user_id })
      );
    }

    this.setState({
      isUserRegister: true,
    });
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

  receivedPushNotification = async (msgDetails) => {
    const { nav } = this.props;
    const currentScreen = this.getActiveRouteState(this.props.navigation.state);
    const { title, body, detail } = msgDetails;
    var detailObj = JSON.parse(detail);

    if (currentScreen.routeName == "ChatMessages") {
      await AsyncStorage.setItem("live_chatMessage", JSON.stringify(detailObj));
      NavigationService.navigate("ChatMessages", { user_info: detailObj });
    } else if (currentScreen.routeName == "ChatList") {
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
            this.redirectToChatDetails(detail);
            this.alert = "no";
          },
        },
        {
          text: "Open Later",
          onPress: () => {
            this.alert = "no";
          },
        },
      ],
      { cancelable: false }
    );
  }

  callAPI() {
    setTimeout(() => {
      this.callMessageListAPI();
    }, 1000);
  }

  searchFromUser(from_id) {
    var user = {};
    this.state.dataArray.forEach((msg) => {
      if (Number(msg.id) == Number(from_id)) {
        user = msg;
      }
    });

    return user;
  }

  callMessageListAPI() {
    if (globals.isInternetConnected == true) {
      this.getchatListAPI();
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  }

  getchatListAPI = async () => {
    const { user, searchTxt } = this.state;
    const { messagesList } = this.props;
    let params = new URLSearchParams();
    // Collect the necessary params
    params.append("search", searchTxt);

    messagesList(params)
      .then(async (res) => {
        if (res.value && res.value.data.success == true) {
          //OK 200 The request was fulfilled
          if (res.value && res.value.status === 200) {
            if (this._isMounted) {
              this.setState({
                dataArray: this.props.chatList,
              });
            }
          }
        } else {
          if (res.value && res.value.data.error) {
          }
        }
      })
      .catch((err) => {
        console.log(TAG, "i am in catch error get messagesList", err);
      });
  };

  searchByName(searchText) {
    const newData = Object.values(this.state.chatName).filter((item) => {
      const itemnumData = item.registration_number.toUpperCase();
      const itemData = item.name.toUpperCase();
      const textData = searchText.toUpperCase();
      return (
        itemData.indexOf(textData) > -1 || itemnumData.indexOf(textData) > -1
      );
    });
    this.setState({
      dataArray: newData,
      searchTxt: searchText,
    });
  }

  // navigate to chat screen
  gotoChatDetails = (user_info) => {
    this.updateUnreadCount(user_info);
    NavigationService.navigate("ChatMessages", {
      user_info: user_info,
      previous_screen: "chatList",
    });
  };

  updateUnreadCount(chatMessage) {
    var newDataArray = this.state.dataArray;

    newDataArray.forEach((data) => {
      if (
        data.type == CHAT_MESSAGE_TYPE.ROADIE &&
        chatMessage.from_id == data.from_id &&
        chatMessage.to_id == data.to_id
      ) {
        // record is matched
        data.unread_count = parseInt(0);
      }
    });

    this.setState({
      dataArray: newDataArray,
      chatList: newDataArray,
    });
  }

  // render friendlist dataItem
  renderFriendList = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={FriendListStyle.itemcellChat}
        onPress={() => this.gotoChatDetails(item)}
      >
        {item.avatar ? (
          <View style={FriendListStyle.imageContainerChat}>
            <FastImage
              style={[FriendListStyle.imageStyleChat]}
              source={{
                uri: item.avatar,
              }}
            />
            {item.unread_count == 0 ? null : (
              <View style={FriendListStyle.redcircleview}></View>
            )}
          </View>
        ) : (
          <View style={FriendListStyle.imageContainerChat}>
            <FastImage
              resizeMethod="resize"
              source={IMAGE.user}
              style={FriendListStyle.imageStyleChat}
            />
          </View>
        )}
        <View style={FriendListStyle.userdetailChat}>
          <Text
            style={[
              FriendListStyle.titleBig,
              {
                fontWeight: item.unread_count == 0 ? null : "bold",
                color: this.props.theme.LITE_FONT_COLOR,
              },
            ]}
          >
            {item.name ? item.name + " " + item.surname : ""}
          </Text>

          <Text
            numberOfLines={2}
            style={[
              FriendListStyle.titleSmall,
              {
                fontWeight: item.unread_count == 0 ? null : "bold",
                color: this.props.theme.LITE_FONT_COLOR,
              },
            ]}
          >
            {item.last_message ? item.last_message : ""}
          </Text>
        </View>
        <View style={FriendListStyle.rightTime}>
          <Text
            numberOfLines={1}
            style={[
              FriendListStyle.titleSmall,
              {
                color: this.props.theme.LITE_FONT_COLOR,
              },
            ]}
          >
            {item.last_message_datetime ? item.last_message_datetime : ""}
          </Text>
          {item.unread_count == 0 ? null : (
            <View style={FriendListStyle.circleview}>
              <Text style={[FriendListStyle.readcount]}>
                {item.unread_count}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { dataArray, searchTxt } = this.state;
    const { isLoading, loaderMessage, theme, chatList } = this.props;
    return (
      <>
        <View
          style={[
            FriendListStyle.container,
            { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
          ]}
        >
          {isLoading && (
            <Loader isOverlay={true} loaderMessage={loaderMessage} />
          )}
          <NavigationEvents onDidFocus={() => this.onFocusFunction()} />

          <Header
            title={StaticTitle.msges}
            onPressed={() => this.props.navigation.openDrawer()}
            isShowSidebar={true}
            theme={theme}
          />
          <Search
            theme={theme}
            blurOnSubmit={false}
            value={searchTxt}
            returnKeyType="done"
            onSubmitEditing={() => this.searchByName(searchTxt)}
            autoCapitalize={"none"}
            onChangeText={(text) =>
              this.setState({
                searchTxt: text,
              })
            }
            onPress={() => this.searchByName(searchTxt)}
            placeholderText={StaticTitle.searchbyNameNnum}
          />
          <FlatList
            data={dataArray}
            style={FriendListStyle.flatliststyle}
            renderItem={(item, index) => this.renderFriendList(item, index)}
            keyExtractor={(item, index) => "D" + index.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={this.separatorComponent}
          />
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nav: state.nav,
    isLoading: state.chat.chat.isLoading,
    loaderMessage: state.chat.chat.loaderMessage,
    theme: state.chat.chat.theme,
    chatList: state.chat.chat.chatList,
    userDetails: state.auth.user.userDetails,
    isReceiveChatMessage: state.chat.chat.isReceiveChatMessage,
    chatMessages: state.chat.chat.chatMessages,
  };
};

const mapDispatchToProps = (dispatch) => ({
  receivedChatMessage: (params) =>
    dispatch(actions.receivedChatMessage(params)),
  messagesList: (params) => dispatch(actions.messagesList(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatListScreen);
