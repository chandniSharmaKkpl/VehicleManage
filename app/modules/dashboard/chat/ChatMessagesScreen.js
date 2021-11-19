import React, { Component } from "react";
import {
  Image,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Platform,
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
const avatar = require("../../../assets/images/user.jpeg");
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      to_id: "",
      isMessageSend: false,
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
    let getchatCount = await JSON.parse(
      await AsyncStorage.getItem("chat_count")
    );
    if (getchatCount != "0") {
      await AsyncStorage.setItem("chat_count", JSON.stringify(parseInt(0)));
      DeviceEventEmitter.emit("ChatCountRemove");
    }else{
      DeviceEventEmitter.emit("ChatCountRemove");
    }
    
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

  componentWillUnmount() {
    this._isMounted = false;
    if (this.state.isMessageSend) {
      DeviceEventEmitter.emit("fetch_message_list");
    }
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
        // console.log(
        //   TAG,
        //   "response of get messagesDetails",
        //   JSON.stringify(res.value.data.data)
        // );
        // console.log("this.props.chatMessages======", this.props.chatMessages);
        if (res.value && res.value.data.success == true) {
          //OK 200 The request was fulfilled
          // console.log(
          //   "tres.value.data.success == true   ",
          //   res.value.data.success
          // );

          // this.setState({
          //   messages: res.value.data.data,
          // });

          if (this.state.messages.length > 0) {
            // if local state variable already have messages and anyone receive new message then no need to update local state
            // Only update Read flag api
            this.readMessagesAPI(res.value.data.data);
          } else {
            this.formatMessageAndStore(res.value.data.data);
          }
        } else {
          if (res.value && res.value.data.error) {
          }
        }
      })
      .catch((err) => {
        console.log(TAG, "i am in catch error get messagesDetails", err);
      });
  };

  formatMessageAndStore(response) {
    // console.log("response=============formatMessageAndStore=====", response);
    var msgArr = [];

    this.readMessagesAPI(response);

    var messages = response.messages;
    var fromUser = response.from_detail;
    var toUser = response.to_detail;

    messages.forEach((msg) => {
      // console.log(
      //   "3 msg *->",
      //   msg.id
      // );

      // console.log("fromUser :->", fromUser);
      var fromUserDtl = msg.from_id == fromUser.id ? fromUser : toUser;
      // console.log("fromUserDtl :->", fromUserDtl);

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

      // console.log("msgDic :->", msgDic);

      msgArr.push(msgDic);
    });

    // console.log("Before msgArr :-->", msgArr);
    msgArr = msgArr.sort((a, b) => parseInt(a._id) < parseInt(b._id));
    // console.log("After msgArr :-->", msgArr);

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
    // console.log("in messages() :->", messages);

    var message_ids = "[";
    messages.forEach((msg) => {
      if (parseInt(msg.is_received) == 0 && parseInt(msg.id) > 0) {
        // console.log("message_ids.length :-->", String(message_ids).length);
        if (String(message_ids).length == 1) {
          message_ids = message_ids + msg.id;
        } else {
          message_ids = message_ids + "," + msg.id;
        }
      }

      // console.log("in loop message_ids :-->", message_ids);
    });

    message_ids = message_ids + "]";

    // console.log("message_ids :-->", message_ids);
    if (message_ids == "[]") {
      console.log("Not any message in unread....");
      return;
    }

    const { readMessage } = this.props;
    var params = new FormData();
    // Collect the necessary params
    params.append("ids", message_ids);
    readMessage(params)
      .then(async (res) => {
        // console.log(
        //   TAG,
        //   "response of get readMessage",
        //   JSON.stringify(res.value.data)
        // );
      })
      .catch((err) => {
        console.log(TAG, "i am in catch error readMessage", err);
      });
  };

  onSend(messages = []) {
    const { userDetails } = this.props;
    // console.log("onSend() messages  :->", this.props.userDetails);

    var newMsgs = [];
    messages.forEach((msg) => {
      msg.user.avatar = userDetails.user_data.user_photo;
      msg.user.name = userDetails.user_data.username;
      msg.sent = true;
      msg.received = false;
      newMsgs.push(msg);
    });

    // console.log("onSend() :->", global.ws);
    console.log("onSend() newMsgs:->", newMsgs);
    {
      // console.log("in IF singleChat from: " + this.state.from_id + ", to: " + this.state.to_id);
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
      } catch (err) {
        // console.log("2nd Error while send socket message. Error:->", err);
        // console.log("to_detail :->"+err);
      }
    }
  }

  callSendAPI(messages) {
    var allTextMsg = messages.map((item) => {
      return item.text;
    });
    // console.log("in callSendAPI allTextMsg:->", allTextMsg);
    const { insertMessage } = this.props;
    let params = new URLSearchParams();
    // user click on student type chat message
    params.append("to_id", this.state.to_id);
    params.append("message", allTextMsg.join("\n"));

    console.log("param insertMessage :->", params);

    insertMessage(params)
      .then(async (res) => {
        // console.log(
        //   TAG,
        //   "response of insertMessage",
        //   JSON.stringify(res.value.data)
        // );
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

    console.log("param reportUserAPI :->", params);
    reportUser(params)
      .then(async (res) => {
        // console.log(
        //   TAG,
        //   "response of reportUserAPI",
        //   JSON.stringify(res.value.data.message)
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

    console.log("param blockUser :->", params);
    blockUser(params)
      .then(async (res) => {
        console.log(
          TAG,
          "response of blockUser",
          JSON.stringify(res.value.data.message)
        );
        if (res.value && res.value.data.success == true) {
          //OK 200 The request was fulfilled
          if (res.value && res.value.status === 200) {
            await showMessage({
              message: res.value.data.message,
              type: "success",
              icon: "info",
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
        <View style={{ flexDirection: "row", padding: 5 }}>
          {!!message.received && (
            <Text style={{ color: Colors.white, fontSize: 10 }}>✓</Text>
          )}
          {!!message.sent && (
            <Text style={{ color: Colors.white, fontSize: 10 }}>✓</Text>
          )}
          {!!message.pending && (
            <Text style={{ color: Colors.white, fontSize: 10 }}>🕓</Text>
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
              backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
            }}
            user={{
              _id: Number(user_id),
            }}
            maxInputLength={1000}
            showAvatarForEveryMessage={false}
            renderMessageImage={(props) => {
              <View>
                <MessageImage {...props} />
              </View>;
            }}
            textInputProps={{}}
            keyboardShouldPersistTaps="never"
            renderTicks={(message) => this.renderTicks(message, user_id)}
            alwaysShowSend={true}
            timeFormat={"HH:mm"}
            onPressAvatar={console.log("onPressAvatar")}
            alwaysShowSend={true}
            style={{ flex: 1 }}
            placeholder={StaticTitle.chatinput}
            renderInputToolbar={renderInputToolbar}
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
          {Platform.OS === "android" ? (
            <KeyboardSpacer topSpacing={-160} />
          ) : null}
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
