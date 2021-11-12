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

      isUserRegister: false,
      loader: false,
      is_chat_user_id: "",
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
    // console.log(
    //   Platform.OS +
    //     " - UNSAFE_componentWillReceiveProps () newProps.isReceiveChatMessage:",
    //   newProps.isReceiveChatMessage +
    //     ", chatMsg Length:" +
    //     newProps.chatMessages.length
    // );
    // When user is inside Inbox screen and any 1-1 or group message is received, then IF condition is true
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
    let token = await AsyncStorage.getItem("access_token");
    globals.access_token = token;
    // this.focusListener = this.props.navigation.addListener("didFocus", () => {
    //   this.onFocusFunction();
    // });
  }

  onFocusFunction = async () => {
    let getchatCount = await JSON.parse(
      await AsyncStorage.getItem("chat_count")
    );
    if (getchatCount != "0") {
      await AsyncStorage.setItem("chat_count", JSON.stringify(parseInt(0)));
      DeviceEventEmitter.emit("ChatCountRemove");
    }
    this._isMounted = true;
    if (globals.isInternetConnected == true) {
      this.callMessageListAPI();
      this.connectWebSocket();
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }

    // DeviceEventEmitter.removeAllListeners("fetch_message_list");
    DeviceEventEmitter.addListener("fetch_message_list", this.callAPI.bind());

    AppState.addEventListener("change", this._handleAppStateChange);
  };

  componentWillUnmount() {
    AppState.removeAllListeners("change", this._handleAppStateChange);
    DeviceEventEmitter.removeAllListeners("fetch_message_list");

    this.closeOrInActiveScreen();
    // this.focusListener.remove();
  }

  connectWebSocket() {
    global.ws = new WebSocket("ws://20.37.36.107:56113");

    // console.log(Platform.OS+" --- :::::::::::::::::::::::");
    global.ws.onopen = (data) => {
      // console.log(
      //   Platform.OS + " --- Connected-------------------------",
      //   data
      // );

      // let Root = nav.routes[2].routes[0].routes[nav.routes.length - 1];
      // console.log("navigate--------------nav------", Root);

      // Alert.alert("Websocket connected...");

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
          // Message received
          var from_id = Number(object.from);
          // 1st check is current chatDetails screen user have same user-id ot not, if same then only call Reducer

          // const { nav } = this.props;
          // const currentScreen = this.props.navigation.state.routeName;

          var payload = {
            msg_data: object,
            user_data: this.searchFromUser(from_id),
          };
          this.props.receivedChatMessage(payload);
          // }
          // if (currentScreen == "ChatList") {
          //   const currentScreenParams =
          //     nav.routes[nav.routes.length - 1].params;
          //   console.log("currentScreenParams :->", currentScreenParams);
          //   // if (currentScreenParams !== undefined) {
          //   //   var userScreenLoadUserId = currentScreenParams.chatMessage.id;
          //   //   console.log("userScreenLoadUserId :->", userScreenLoadUserId);
          //   //   console.log("from_id :->", from_id);

          //   //   if (parseInt(from_id) == userScreenLoadUserId) {
          //   //     console.log("Inside ID both user are matched....");
          //       // var payload = {
          //       //   msg_data: object,
          //       //   user_data: this.searchFromUser(from_id),
          //       // };
          //       // this.props.receivedChatMessage(payload);
          //   //   }
          //   // }
          // }
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

  _handleAppStateChange = (nextAppState) => {
    // console.log("_handleAppStateChange() nextAppState :-->", nextAppState);
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
      const chat_user_id = usersdata.user_id;

      // console.log("unregister chat_user_id :->", chat_user_id);

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
        // console.log("Error while connection close :->", err);
      }
      // }, 3000)
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

  callAPI() {
    setTimeout(() => {
      this.callMessageListAPI();
    }, 1000);
  }

  searchFromUser(from_id) {
    // console.log("searchFromUser() from_id :-->", from_id);

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
        // console.log(
        //   TAG,
        //   "response of get messagesList",
        //   JSON.stringify(res.value.data.data)
        // );
        // console.log("this.props.chatList--------", this.props.chatList);
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
    // console.log("Value of item is :->", searchText);
    // console.log("this.state.chatName :-->", this.state);
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
      is_chat_user_id: this.state.is_chat_user_id,
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
            {item.unread_count == 0 ? null : (
              <View style={FriendListStyle.redcircleview}></View>
            )}
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
              {
                fontWeight: item.unread_count == 0 ? null : "bold",
                color: this.props.theme.LITE_FONT_COLOR,
              },
            ]}
          >
            {item.name ? item.name + " " + item.surname : ""}
          </Text>

          <Text
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
        <View>
          <Text
            numberOfLines={1}
            style={[
              FriendListStyle.titleSmall,
              {
                color: this.props.theme.LITE_FONT_COLOR,
                width: globals.deviceWidth * 0.2,
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
