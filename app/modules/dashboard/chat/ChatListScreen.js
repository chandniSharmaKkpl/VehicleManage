import React, { Component } from "react";
import {
  View,
  Keyboard,
  FlatList,
  TouchableWithoutFeedback,
  Text,
  Platform,
  Image,
  AppState,
  Alert,
  TouchableOpacity,
  DeviceEventEmitter,
} from "react-native";
import Colors from "../../../assets/Colors";
import { connect } from "react-redux";
import { FriendListStyle } from "../../../assets/styles/FriendListStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import { Search, Loader } from "../../../components";
import NavigationService from "../../../utils/NavigationService";
import { IMAGE } from "../../../assets/Images";
import { NavigationEvents } from "react-navigation";
import Header from "../../../components/Header";
import { DummyData } from "../../../dummyData/DummyData";
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CHAT_MESSAGE_TYPE } from "../../../utils/Globals";
import * as actions from "./redux/Actions";
import { showMessage, hideMessage } from "react-native-flash-message";
import * as globals from "../../../utils/Globals";
import { ComponentStyle } from "../../../assets/styles/ComponentStyle";

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
      theme: {},
      isUserRegister: false,
      loader: false,
    };
    global.ws = null;
    this.registerDeviceTimer = null;
    this.connectWebSocket = this.connectWebSocket.bind(this);
    this.callMessageListAPI = this.callMessageListAPI.bind(this);
    this.registerAndSubscribe = this.registerAndSubscribe.bind(this);
    this.searchByName = this.searchByName.bind(this);
  }

  searchByName(searchText) {
    // console.log("Value of item is :->", searchText);
    // console.log("this.state.chatName :-->", this.state);
    const newData = Object.values(this.state.chatName).filter((item) => {
      const itemData = item.name.toUpperCase();
      const textData = searchText.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataArray: newData,
      searchTxt: searchText,
    });
  }

  UNSAFE_componentWillReceiveProps = (newProps) => {
    console.log(
      Platform.OS +
        " - UNSAFE_componentWillReceiveProps () newProps.isReceiveChatMessage:",
      newProps.isReceiveChatMessage +
        ", chatMsg Length:" +
        newProps.chatMessages.length
    );
    // When user is inside Inbox screen and any 1-1 or group message is received, then IF condition is true
    if (
      this.state.dataArray.length == newProps.chatList.length &&
      newProps.isReceiveChatMessage == true &&
      newProps.chatMessages.length > 0
    ) {
      console.log("in IF -------------------->");
      // from_id": from_id,
      // "from_type": user_details.user_role == USER_ROLE.COACH ? 1 : 0,
      // "class_id
      var newDataArray = this.state.dataArray;
      newDataArray.forEach((data) => {
        newProps.chatMessages.forEach((msg) => {
          var from_id = msg.from_id;
          var class_id = msg.class_id;
          console.log("from_id :->", from_id);
          console.log("class_id :->", class_id);
          if (class_id !== "") {
            // group message receivee
            // console.log("in IF ---->");
            if (
              data.type == CHAT_MESSAGE_TYPE.CLASS &&
              parseInt(data.id) == parseInt(class_id)
            ) {
              // console.log("in IF-IF ---->",data);
              data.unread_count = parseInt(data.unread_count) + 1;
            }
          } else {
            // console.log("in ELSE ---->");
            if (
              data.type == CHAT_MESSAGE_TYPE.ROADIE &&
              parseInt(data.id) == parseInt(from_id)
            ) {
              // console.log("in ELSE-IF ---->",data);
              data.unread_count = parseInt(data.unread_count) + 1;
            }
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
          console.log(
            Platform.OS +
              " - this.state.dataArray.length:->" +
              this.state.dataArray.length
          );
          console.log(
            " this.state.isUserRegister -->",
            this.state.isUserRegister
          );
          // Register is one call at single time, after
          if (
            this.state.dataArray.length > 0 &&
            !this.state.isUserRegister &&
            this.registerDeviceTimer == null
          ) {
            // Start 3 seconds interval,
            // This will check is internel
            console.log("START INERVAL() ----------------->");
            this.registerDeviceTimer = setInterval(() => {
              console.log(
                "inside Timer this.state.webSocketServerConnected:->",
                this.state.webSocketServerConnected
              );
              if (this.state.webSocketServerConnected) {
                console.log(
                  "in IF this.registerDeviceTimer :->",
                  this.registerDeviceTimer
                );
                if (
                  this.registerDeviceTimer != undefined ||
                  this.registerDeviceTimer != null
                ) {
                  console.log("in side IF this.registerDeviceTimer CLEAR...");
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

  registerAndSubscribe() {
    const { userDetails, chatList } = this.props;
    const chat_user_id = chatList + "_" + userDetails.id;

    console.log("registerAndSubscribe() chat_user_id :->", chat_user_id);
    global.ws.send(
      JSON.stringify({ command: "register", userId: chat_user_id })
    );

    this.setState({
      isUserRegister: true,
    });

    this.state.dataArray.forEach((chatMsg) => {
      if (chatMsg.type == CHAT_MESSAGE_TYPE.CLASS) {
        global.ws.send(
          JSON.stringify({
            command: "subscribe",
            channel: "class_" + chatMsg.id,
          })
        );
      }
    });
  }

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      if (globals.isInternetConnected == true) {
        this.callMessageListAPI();
        this.connectWebSocket();
      } else {
        Alert.alert(globals.warning, globals.noInternet);
      }
    });
    this.setState({ theme: this.props.theme });

    var live_chatMessage =
      JSON.parse(await AsyncStorage.getItem("live_chatMessage")) || {};
    console.log(
      "chatDashboad screen componentDidMount() -----> params.chatMessage :-->",
      live_chatMessage
    );

    if (live_chatMessage != undefined && live_chatMessage.id != undefined) {
      console.log("inSide IF NavigationService.navigate('ChatMessages') ...");
      NavigationService.navigate("ChatMessages", {
        chatMessage: live_chatMessage,
      });
      await AsyncStorage.removeItem("live_chatMessage");
    }

    DeviceEventEmitter.removeAllListeners("fetch_message_list");

    console.log("addEventListener ---> AppState");
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    console.log("_handleAppStateChange() nextAppState :-->", nextAppState);
    if (nextAppState.match(/inactive|background/)) {
      console.log("in IF inactive or background");

      this.closeOrInActiveScreen();
    } else if (nextAppState.match(/active/)) {
      console.log("in IF active");

      this.callMessageListAPI();
      this.connectWebSocket();
    }
  };

  async componentWillUnmount() {
    this._isMounted = false;
    this.focusListener.remove();
    console.log(
      Platform.OS + " --- componentWillUnmount() this.registerDeviceTimer:->",
      this.registerDeviceTimer
    );
    await hideMessage();

    AppState.removeAllListeners("change", this._handleAppStateChange);
    DeviceEventEmitter.removeAllListeners("fetch_message_list");

    this.closeOrInActiveScreen();
  }

  callMessageListAPI() {
    if (globals.isInternetConnected == true) {
      this.getchatListAPI();
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  }

  getchatListAPI = async () => {
    const { user, txtSearch } = this.state;
    const { messagesList } = this.props;
    let params = new URLSearchParams();
    // Collect the necessary params
    params.append("search", txtSearch);

    messagesList(params)
      .then(async (res) => {
        // console.log(
        //   TAG,
        //   "response of get messagesList",
        //   JSON.stringify(res.value.data.data)
        // );
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
            // await showMessage({
            //   message: res.value.message,
            //   type: "danger",
            //   icon: "info",
            //   duration: 4000,
            // });
          }
        }
      })
      .catch((err) => {
        console.log(TAG, "i am in catch error search by vehical name", err);
      });
  };

  closeOrInActiveScreen() {
    console.log("closeOrInActiveScreen :--->");
    if (this.registerDeviceTimer !== null) {
      console.log("closeOrInActiveScreen :---> IN IF");
      clearInterval(this.registerDeviceTimer);
      this.registerDeviceTimer = null;
    }

    if (global.ws !== null) {
      const { userDetails, userRole } = this.props;

      const chat_user_id = userRole + "_" + userDetails.id;

      console.log("unregister chat_user_id :->", chat_user_id);

      global.ws.send(
        JSON.stringify({
          command: "unregister",
          userId: chat_user_id,
          offline_user_id: userDetails.id,
        })
      );

      // setTimeout(() => {
      try {
        global.ws.close();
      } catch (err) {
        console.log("Error while connection close :->", err);
      }
      // }, 3000)
    }
  }

  connectWebSocket() {
    global.ws = new WebSocket("ws://20.37.36.107:56113");
    global.ws.onopen = (data) => {
      console.log(
        Platform.OS + " --- Connected-------------------------",
        data
      );

      if (data.isTrusted === false) {
        this.setState({
          loader: false,
          webSocketServerConnected: true,
        });
      } else {
        this.setState({
          webSocketServerConnected: true,
        });
        // alert("Something wen to wrong");
      }
    };
    global.ws.onmessage = ({ data }) => {
      console.log(
        "============================================================================---->",
        JSON.stringify(data)
      );
      // console.log("data :->",message.data);
      const object = JSON.parse(data);
      console.log("object :->", object);
      if (object.command != undefined) {
        if (object.command == "message") {
          console.log("in IF onMessage commant is 'message'");
          // Message received
          var from_id = Number(object.from.split("_")[1]);

          // 1st check is current chatDetails screen user have same user-id ot not, if same then only call Reducer

          const { nav } = this.props;
          const currentScreen = nav.routes[nav.routes.length - 1].routeName;
          if (currentScreen == "ChatMessages") {
            const currentScreenParams =
              nav.routes[nav.routes.length - 1].params;
            console.log("currentScreenParams :->", currentScreenParams);
            if (currentScreenParams !== undefined) {
              var userScreenLoadUserId = currentScreenParams.chatMessage.id;
              console.log("userScreenLoadUserId :->", userScreenLoadUserId);
              console.log("from_id :->", from_id);

              if (parseInt(from_id) == userScreenLoadUserId) {
                console.log("Inside ID both user are matched....");
                // var payload = {
                //   msg_data: object,
                //   user_data: this.searchFromUser(from_id),
                // };
                // this.props.receivedChatMessage(payload);
              }
            }
          }
        } else if (
          object.command == "register" ||
          object.command == "unregister"
        ) {
          const { userDetails } = this.props;
          if (parseInt(object.offline_user_id) != parseInt(userDetails.id)) {
            var onlineUsers = object.online;
            console.log("command register --- onlineUsers :-->", onlineUsers);
            const { nav } = this.props;
            const currentScreen = nav.routes[nav.routes.length - 1].routeName;
            console.log("online command currentScreen :->", currentScreen);
            if (currentScreen == "ChatDetails") {
              const currentScreenParams =
                nav.routes[nav.routes.length - 1].params;
              console.log("currentScreenParams :->", currentScreenParams);
              if (currentScreenParams !== undefined) {
                var userScreenLoadUserId = currentScreenParams.chatMessage.id;
                onlineUsers.forEach((user) => {
                  var online_user_id = user.split("_")[1];
                  if (online_user_id == userScreenLoadUserId) {
                    DeviceEventEmitter.emit("update_header_online_stattus", {
                      status: true,
                    });
                  }
                });
                onlineUsers.forEach;
              }
            }
            // alwayse update online/offline statime, weather user on chat-details or chat-listing screen
          }
        }
      }
    };
    global.ws.onerror = ({ error }) => {
      console.log(Platform.OS + " --- WS OnError() ---->", error);
      global.ws = null;
    };

    global.ws.onclose = ({ event }) => {
      console.log(Platform.OS + " --- WS onClose() ---->", event);
    };
  }

  // render friendlist dataItem
  renderFriendList = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={FriendListStyle.itemcell}
        onPress={() => this.gotoChatDetails(item)}
      >
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
          <Text style={FriendListStyle.titleBig}>
            {item.name ? item.name + " " + item.surname : "-"}
          </Text>
          <Text
            style={[
              FriendListStyle.titleSmall,
              { color: this.state.theme.LITE_FONT_COLOR },
            ]}
          >
            {item.last_message ? item.last_message : "-"}
          </Text>
        </View>
        <View>
          <Text
            numberOfLines={2}
            style={[
              FriendListStyle.titleSmall,
              {
                color: this.state.theme.LITE_FONT_COLOR,
                width: globals.deviceWidth * 0.15,
              },
            ]}
          >
            {item.last_message_datetime
              ? item.last_message_datetime
              : "Just now"}
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

  // navigate to chat screen
  gotoChatDetails = (user_info) => {
    NavigationService.navigate("ChatMessages", { user_info: user_info });
  };

  // seprate component
  separatorComponent = () => {
    return <View style={FriendListStyle.separatorLine} />;
  };

  render() {
    const { dataArray } = this.state;
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
          <Header
            title={StaticTitle.msges}
            onPressed={() => this.props.navigation.openDrawer()}
            isShowSidebar={true}
            theme={theme}
          />
          <Search
            theme={theme}
            blurOnSubmit={false}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            autoCapitalize={"none"}
            onChangeText={(text) =>
              this.setState({
                searchTxt: text,
              })
            }
            onPress={() => this.searchByName()}
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
  messagesList: (params) => dispatch(actions.messagesList(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatListScreen);
// export default ChatListScreen;
