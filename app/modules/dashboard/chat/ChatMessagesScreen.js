import React, { Component } from "react";
import {
  Image,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Appearance,
  Keyboard,
  KeyboardAvoidingView,
  DeviceEventEmitter,
} from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
import {
  Avatar,
  Bubble,
  GiftedAvatar,
  GiftedChat,
  Message,
  MessageImage,
  MessageText,
  Send,
  Time,
} from "react-native-gifted-chat";
import moment from "moment";
import { CHAT_MESSAGE_TYPE } from "../../../utils/Globals";
import { connect } from "react-redux";
import { ComponentStyle } from "../../../assets/styles/ComponentStyle";
import FastImage from "react-native-fast-image";
import { ChatStyle } from "../../../assets/styles/ChatStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import { MediaModel, ChatHeader } from "../../../components";
import NavigationService from "../../../utils/NavigationService";
import { IMAGE } from "../../../assets/Images";
import { NavigationEvents } from "react-navigation";
import * as globals from "../../../utils/Globals";
import { DefaultChatOptions } from "../../../components/DefaultChatOptions";
import {
  renderAvatar,
  renderBubble,
  renderSystemMessage,
  renderMessage,
  renderMessageText,
  renderCustomView,
} from "../../../components/MessageContainer";
import Colors from "../../../assets/Colors";
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSend,
} from "../../../components/InputToolbar";
import { showMessage, hideMessage } from "react-native-flash-message";
import * as actions from "./redux/Actions";
const avatar = require("../../../assets/images/user_default.jpeg");
import AsyncStorage from "@react-native-async-storage/async-storage";
import EmojiSelector, { Categories } from "react-native-emoji-selector";

const colorScheme = Appearance.getColorScheme();

const TAG = "ChatMessagesScreen ::=";
export class ChatMessagesScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      user_name: "",
      user_photo: "",
      message: "",
      txtmessage: "",
      currentUserId: 1,
      theme: {},
      messages: [],
      isMsgReportPicker: false,
      options: DefaultChatOptions,
      from_id: "",
      user_info: this.props.navigation.state.params.user_info,
      previous_screen: this.props.navigation.state.params.previous_screen,
      to_id: "",
      isMessageSend: false,
      emoji: " ",
      isopenEmojiPicker: false,
      currentMsg_id: "",
      getparticularMsg_id: "",
    };
    this.onSend = this.onSend.bind(this);
    this.callSendAPI = this.callSendAPI.bind(this);
    this.readMessagesAPI = this.readMessagesAPI.bind(this);
    this.callFetchAPI = this.callFetchAPI.bind(this);
    this.formatMessageAndStore = this.formatMessageAndStore.bind(this);
  }

  UNSAFE_componentWillReceiveProps = (newProps) => {
    this.setState(
      (previousState) => {
        return {
          messages: GiftedChat.append(
            previousState.messages,
            ...[newProps.chatMessages]
          ),
          isMessageSend: true,
        };
      },
      () => {
        this.callFetchAPI();
      }
    );
  };

  async componentDidMount() {
    this._isMounted = true;
    await AsyncStorage.setItem("IsReadMessage", JSON.stringify(true));
    await AsyncStorage.setItem("IsRead", JSON.stringify(true));

    await AsyncStorage.setItem("msg_count", JSON.stringify(parseInt(0)));
    DeviceEventEmitter.emit("msg_count_remove");

    await AsyncStorage.setItem("total_count", JSON.stringify(parseInt(0)));
    DeviceEventEmitter.emit("total_count_remove");

    if (this.props.userDetails != null && this.props.userDetails != undefined) {
      this.setState(
        {
          from_id: this.props.userDetails.user_data.user_id,
          theme: this.props.theme,
          userDetails: this.props.userDetails,
          user_name:
            this.state.user_info.name + " " + this.state.user_info.surname,
          user_photo: this.state.user_info.avatar,
          to_id: this.state.user_info.id,
        },
        () => {
          if (globals.isInternetConnected == true) {
            this.callFetchAPI();
          } else {
            Alert.alert(globals.warning, globals.noInternet);
          }
        }
      );
    }
  }

  async componentWillUnmount() {
    this._isMounted = false;
    if (this.state.isMessageSend) {
      DeviceEventEmitter.emit("fetch_message_list");
    }
    await AsyncStorage.setItem("IsReadMessage", JSON.stringify(true));
    await AsyncStorage.setItem("IsRead", JSON.stringify(true));

    await AsyncStorage.setItem("msg_count", JSON.stringify(parseInt(0)));
    DeviceEventEmitter.emit("msg_count_remove");

    await AsyncStorage.setItem("total_count", JSON.stringify(parseInt(0)));
    DeviceEventEmitter.emit("total_count_remove");
  }

  callFetchAPI = () => {
    this.callMessageDetailsAPI();
  };

  // Message Details API
  callMessageDetailsAPI = async () => {
    const { to_id } = this.state;
    const { messagesDetails } = this.props;
    let params = new URLSearchParams();
    // Collect the necessary params
    params.append("to_id", to_id);
    messagesDetails(params)
      .then(async (res) => {
        //OK 200 The request was fulfilled
        if (res.value && res.value.data.success == true) {
          if (this.state.messages.length > 0) {
            // if local state variable already have messages and anyone receive new message then no need to update local state
            // Only update Read flag api
            this.readMessagesAPI(res.value.data.data);
          } else {
            this.formatMessageAndStore(res.value.data.data);
            // this.readMessagesAPI(res.value.data.data);
          }
        }
      })
      .catch((err) => {
        console.log(TAG, "i am in catch error get messagesDetails", err);
      });
  };

  formatMessageAndStore(response) {
    var msgArr = [];

    this.readMessagesAPI(response);

    var messages = response.messages;
    var fromUser = response.from_detail;
    var toUser = response.to_detail;

    messages.forEach((msg) => {
      var fromUserDtl = msg.from_id == fromUser.id ? fromUser : toUser;

      var avatar_img = avatar;
      if (fromUserDtl.avatar != null && fromUserDtl.avatar != "null") {
        avatar_img = fromUserDtl.avatar;
      }
      var from_id = Number(this.state.from_id);

      // convert DB's UTC-time into moment object,
      // Gifted-chat module will convert to local time and display on screen
      let currentDate = moment.utc(msg.created_at);

      var msgDic = {
        _id: msg.id,
        from_id: msg.from_id,
        to_id: msg.to_id != undefined ? msg.to_id : "",
        text: msg.message,
        createdAt: currentDate,
        is_received: msg.is_received,
        user: {
          _id: fromUserDtl.id,
          name: fromUserDtl.full_name,
          avatar: avatar_img,
        },
        sent: from_id == fromUserDtl.id ? true : false,
        received: parseInt(msg.is_received) == 1 ? true : false,
        pending: false,
      };

      msgArr.push(msgDic);
    });

    msgArr = msgArr.sort((a, b) => parseInt(a._id) < parseInt(b._id));

    const newArray = [];
    msgArr.forEach((obj) => {
      if (!newArray.some((o) => o._id === obj._id)) {
        newArray.push({ ...obj });
      }
    });

    this.setState({
      messages: newArray,
    });
  }

  readMessagesAPI = (response) => {
    const messages = response.messages;

    var message_ids = "[";
    messages.forEach((msg) => {
      if (parseInt(msg.is_received) == 0 && parseInt(msg.id) > 0) {
        if (String(message_ids).length == 1) {
          message_ids = message_ids + msg.id;
        } else {
          message_ids = message_ids + "," + msg.id;
        }
      }
    });

    message_ids = message_ids + "]";

    if (message_ids == "[]") {
      console.log("Not any message in unread....");
      return;
    }

    const { readMessage } = this.props;
    var params = new FormData();
    // Collect the necessary params
    params.append("ids", message_ids);
    readMessage(params)
      .then(async (res) => {})
      .catch((err) => {
        console.log(TAG, "i am in catch error readMessage", err);
      });
  };

  updateSelectedEmoji = (currentemoji) => {
    let addkey;
    var tempmsgArr = [];
    if (currentemoji) {
      this.state.messages.forEach((msg) => {
        if (msg._id == this.state.getparticularMsg_id) {
          this.setState({ emoji: currentemoji, currentMsg_id: msg._id });
        }
      });
    }
  };

  onLongPress(context, message) {
    if (message._id == this.state.from_id) {
    } else {
      this.setState({ isopenEmojiPicker: true }, () => {
        this.state.messages.map((item) => {
          if (item._id == message._id) {
            this.setState({ getparticularMsg_id: item._id });
          }
        });
      });
    }
  }

  onSend = (message, callback) => {
    this.waitForConnection(() => {
      this.callOnSend(message);
      if (typeof callback !== "undefined") {
        callback();
      }
    }, 1000);
  };

  waitForConnection = (callback, interval) => {
    setTimeout(function () {
      if (global.ws.readyState === 1) {
        callback();
      } else {
        // optional: implement backoff for interval here
        this.waitForConnection(callback, interval);
      }
    }, interval);
  };

  callOnSend = (messages = []) => {
    const { userDetails } = this.props;
    var newMsgs = [];
    messages.forEach((msg) => {
      msg.user.avatar = userDetails.user_data.user_photo;
      msg.user.name = userDetails.user_data.username;
      msg.sent = true;
      msg.received = false;
      newMsgs.push(msg);
    });

    {
      try {
        global.ws.send(
          JSON.stringify({
            command: "message",
            from: this.state.from_id,
            to: this.state.to_id,
            message: messages,
            from_user: userDetails,
          })
        );

        this.callSendAPI(newMsgs);

        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, newMsgs),
            isMessageSend: true,
          };
        });
      } catch (err) {}
    }
  };

  callSendAPI(messages) {
    var allTextMsg = messages.map((item) => {
      return item.text;
    });
    const { insertMessage } = this.props;
    let params = new URLSearchParams();
    // user click on student type chat message
    params.append("to_id", this.state.to_id);
    params.append("message", allTextMsg.join("\n"));

    insertMessage(params)
      .then(async (res) => {
        if (res.value && res.value.data.success == true) {
          //OK 200 The request was fulfilled
          if (res.value && res.value.status === 200) {
          }
        } else {
          if (res.value && res.value.data.success == false) {
          } else if (res.value && res.value.data.error) {
          }
        }
      })
      .catch((err) => {
        console.log(TAG, "i am in catch error insertMessages", err);
      });
  }

  // Render modal faltlist view to choose camera or gallery
  renderOptionsview = (item, index) => {
    return (
      <>
        <TouchableOpacity onPress={() => this.reportorblockuser(item)}>
          <View style={ComponentStyle.viewPopupStyle}>
            <FastImage
              resizeMethod="resize"
              style={ComponentStyle.imagePopupStyle}
              source={item.image}
            ></FastImage>

            <Text style={ComponentStyle.textStylePopup}>{item.title}</Text>
          </View>
        </TouchableOpacity>
        {index < 1 ? <View style={ComponentStyle.lineStyle1}></View> : null}
      </>
    );
  };

  // report User API
  reportUserAPI = () => {
    const { user_info } = this.state;
    const { reportUser } = this.props;
    let params = new URLSearchParams();

    params.append("friend_id", user_info.id);

    reportUser(params)
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
            this.displayMsgReportPicker();
            NavigationService.back();
            DeviceEventEmitter.emit("fetch_message_list");
          }
        } else {
          if (res.value && res.value.data.error) {
          }
        }
      })
      .catch((err) => {
        console.log(TAG, "i am in catch error reportUserAPI", err);
      });
  };

  //block User API
  blockUserAPI = async () => {
    const { user_info } = this.state;
    const { blockUser } = this.props;
    let params = new URLSearchParams();

    params.append("friend_id", user_info.id);

    blockUser(params)
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
            this.displayMsgReportPicker();
            NavigationService.back();
            DeviceEventEmitter.emit("fetch_message_list");
          }
        } else {
          if (res.value && res.value.data.error) {
          }
        }
      })
      .catch((err) => {
        console.log(TAG, "i am in catch error blockUser", err);
      });
  };

  // report or block  user
  reportorblockuser = (item) => {
    if (item.title == "Report User") {
      if (globals.isInternetConnected == true) {
        this.reportUserAPI();
      } else {
        Alert.alert(globals.warning, globals.noInternet);
      }
    } else if (item.title == "Block User") {
      if (globals.isInternetConnected == true) {
        this.blockUserAPI();
      } else {
        Alert.alert(globals.warning, globals.noInternet);
      }
    }
  };

  setsendText = (text) => {
    this.setState({ txtmessage: text });
  };

  //display gallry picker model
  displayMsgReportPicker = () => {
    this.setState({ isMsgReportPicker: !this.state.isMsgReportPicker });
  };
  //display emoji picker model
  displayMsgEmojiPicker = () => {
    this.setState({ isopenEmojiPicker: !this.state.isopenEmojiPicker });
  };

  // navigate to shareSocials
  shareSocials = () => {
    NavigationService.navigate("ShareSocials", {
      from_id: this.state.to_id,
    });
  };

  renderTicks = (message, user_id) => {
    if (message && user_id && parseInt(message.user._id) != parseInt(user_id)) {
      return null;
    }
    if (message && (message.sent || message.received || message.pending)) {
      return (
        <View style={{ flexDirection: "row", marginRight: 10 }}>
          {!!message.received && (
            <Text
              style={{
                color: colorScheme === "dark" ? Colors.white : Colors.black,
                fontSize: 10,
              }}
            >
              ✓
            </Text>
          )}
          {!!message.sent && (
            <Text
              style={{
                color: colorScheme === "dark" ? Colors.white : Colors.black,
                fontSize: 10,
              }}
            >
              ✓
            </Text>
          )}
          {!!message.pending && (
            <Text
              style={{
                color: colorScheme === "dark" ? Colors.white : Colors.black,
                fontSize: 10,
              }}
            >
              🕓
            </Text>
          )}
        </View>
      );
    }
    return null;
  };

  render() {
    const {
      user_name,
      user_photo,
      isMsgReportPicker,
      options,
      txtmessage,
      messages,
      userDetails,
      user_info,
      from_id,
      isopenEmojiPicker,
      emoji,
      currentMsg_id,
      getparticularMsg_id,
    } = this.state;
    const { isLoading, loaderMessage, theme, chatMessages } = this.props;
    var user_id = from_id;
    let platformConf =
      Platform.OS === "ios"
        ? {
            minInputToolbarHeight: 70,
            bottomOffset: 0,
          }
        : {};
    return (
      <>
        <View
          style={[
            ChatStyle.container,
            { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
          ]}
        >
          <ChatHeader
            theme={theme}
            isShowBack={true}
            title={user_name}
            isShowRighttwo={true}
            isuserImage={user_photo}
            isMsgReportPicker={() => this.displayMsgReportPicker()}
            isShareSocials={() => this.shareSocials()}
            previous_screen={this.state.previous_screen}
          />
          <View>
            <MediaModel
              modalVisible={isMsgReportPicker}
              onBackdropPress={() => this.displayMsgReportPicker()}
            >
              <View style={ComponentStyle.modelContainer}>
                <View style={[ComponentStyle.modelView]}>
                  <View style={ComponentStyle.titleviewstyle}>
                    <Text style={[ComponentStyle.choosefilestyle]}>
                      {StaticTitle.moreactions}
                    </Text>
                    <View style={ComponentStyle.lineStyle}></View>
                    <View
                      style={{
                        height: globals.deviceWidth * 0.28,
                      }}
                    >
                      <FlatList
                        style={[ComponentStyle.onlyFlex]}
                        data={options}
                        renderItem={({ item, index }) =>
                          this.renderOptionsview(item, index)
                        }
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => "D" + index.toString()}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </MediaModel>
          </View>

          <GiftedChat
            messages={messages}
            onSend={this.onSend}
            showUserAvatar={false}
            shouldRenderUsername={true}
            messagesContainerStyle={{
              paddingBottom: 40,
              paddingHorizontal: 10,
              backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
            }}
            user={{
              _id: Number(user_id),
              // emoji: this.state.emoji,
              // from_id: this.state.from_id,
              // to_id: this.state.to_id,
              // getparticularMsg_id: getparticularMsg_id,
              // currentMsg_id: currentMsg_id,
            }}
            maxInputLength={1000}
            showAvatarForEveryMessage={false}
            renderMessageImage={(props) => {
              <View>
                <MessageImage {...props} />
              </View>;
            }}
            // onLongPress={(context, message) =>
            //   this.onLongPress(context, message)
            // }
            textInputProps={{}}
            keyboardShouldPersistTaps="never"
            renderTicks={(message) => this.renderTicks(message, user_id)}
            alwaysShowSend={true}
            timeFormat={"HH:mm"}
            style={{ flex: 1 }}
            placeholder={StaticTitle.chatinput}
            renderInputToolbar={renderInputToolbar}
            // renderCustomView={
            //   (getparticularMsg_id == "" || getparticularMsg_id == undefined) &&
            //   (currentMsg_id == "" || currentMsg_id == undefined)
            //     ? null
            //     : getparticularMsg_id == currentMsg_id
            //     ? renderCustomView
            //     : null
            // }
            // renderActions={renderActions}
            // renderComposer={renderComposer}
            renderSend={renderSend}
            // renderAvatar={renderAvatar}
            renderBubble={renderBubble}
            // renderMessage={renderMessage}
            // renderMessageText={renderMessageText}
            isCustomViewBottom
            parsePatterns={(linkStyle) => [
              {
                pattern: /#(\w+)/,
                style: linkStyle,
                onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
              },
            ]}
            {...platformConf}
          />
          {/* {Platform.OS === "android" ? (
            <KeyboardSpacer topSpacing={-160} />
          ) : null} */}
          {/* {isopenEmojiPicker == true ? (
            <EmojiSelector
              onEmojiSelected={(emoji) => this.updateSelectedEmoji(emoji)}
              showSearchBar={true}
              showTabs={true}
              showHistory={true}
              showSectionTitles={true}
              category={Categories.all}
            />
          ) : null} */}
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
  messagesDetails: (params) => dispatch(actions.messagesDetails(params)),
  insertMessage: (params) => dispatch(actions.insertMessage(params)),
  readMessage: (params) => dispatch(actions.readMessage(params)),
  blockUser: (params) => dispatch(actions.blockUser(params)),
  reportUser: (params) => dispatch(actions.reportUser(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessagesScreen);
