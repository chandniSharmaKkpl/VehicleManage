import React, { Component } from "react";
import {
  Image,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
import { GiftedChat } from "react-native-gifted-chat";
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

import ChatMessages from "../../../dummyData/ChatMessages";
const avatar = require("../../../assets/images/user.png");

const TAG = "ChatMessagesScreen ::=";

export class ChatMessagesScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      message: "",
      txtmessage: "",
      currentUserId: 1,
      theme: {},
      messages: [],
      isMsgReportPicker: false,
      options: DefaultChatOptions,
      from_id: "",
      to_id: this.props.navigation.state.params.to_id,
    };
    this.onSend = this.onSend.bind(this);
    this.formatMessageAndStore = this.formatMessageAndStore.bind(this);
    this.readMessagesAPI = this.readMessagesAPI.bind(this);
  }

  UNSAFE_componentWillReceiveProps = (newProps) => {
    // console.log(
    //   Platform.OS + " - ChatDetails ---- UNSAFE_componentWillReceiveProps :-->"
    // );
    // this.setState(
    //   (previousState) => {
    //     return {
    //       messages: GiftedChat.append(
    //         previousState.messages,
    //         ...[newProps.chatMessages]
    //       ),
    //       isMessageSend: true,
    //     };
    //   },
    //   () => {
    //     this.callFetchAPI();
    //   }
    // );
  };

  async componentDidMount() {
    if (this.props.userDetails != null && this.props.userDetails != undefined) {
      this.setState(
        {
          from_id: this.props.userDetails.user_data.user_id,
          theme: this.props.theme,
          userDetails: this.props.userDetails,
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

  callFetchAPI = () => {
    this.callMessageDetailsAPI();
  };

  formatMessageAndStore(response) {
    console.log("formatMessageAndStore :-->", response);
    var msgArr = [];

    this.readMessagesAPI(response);

    var messages = response.messages;
    var fromUser = response.from_detail;
    var toUser = response.to_detail;

    messages.forEach((msg) => {
      // console.log("3 msg :->", msg);

      // console.log("fromUser :->", fromUser);
      var fromUserDtl = msg.from_id == fromUser.id ? fromUser : toUser;
      // console.log("fromUserDtl :->", fromUserDtl);

      var avatar_img = avatar;
      if (fromUserDtl.avatar != null && fromUserDtl.avatar != "null") {
        avatar_img = fromUserDtl.avatar;
      }

      // console.log("avatar_img :->", avatar_img);

      var msgDic = {
        _id: msg.id,
        from_id: msg.from_id,
        from_type: msg.from_type,
        to_id: msg.to_id != undefined ? msg.to_id : "",

        text: msg.message,
        created_at: msg.created_at,
        is_received: msg.is_received,
        user: {
          _id: fromUserDtl.id,
          name: fromUserDtl.full_name,
          avatar: avatar_img,
        },
        image: fromUserDtl.image_url,
        sent: this.state.from_id == fromUserDtl.id ? true : false,
        received: parseInt(this.state.is_received) == 1 ? true : false,
        pending: false,
      };

      // console.log("msgDic :->", msgDic);

      msgArr.push(msgDic);
    });

    // console.log("Before msgArr :-->", msgArr);
    msgArr = msgArr.sort((a, b) => parseInt(a._id) < parseInt(b._id));
    // console.log("After msgArr :-->", msgArr);

    this.setState({
      messages: msgArr,
    });
  }

  // Message Details API
  callMessageDetailsAPI = async () => {
    const { to_id } = this.state;
    const { messagesDetails } = this.props;
    let params = new URLSearchParams();
    // Collect the necessary params
    params.append("to_id", to_id);
    messagesDetails(params)
      .then(async (res) => {
        console.log(
          TAG,
          "response of get messagesDetails",
          JSON.stringify(res.value.data.data)
        );
        console.log("this.props.chatMessages======", this.props.chatMessages);
        if (res.value && res.value.data.success == true) {
          //OK 200 The request was fulfilled
          console.log(
            "tres.value.data.success == true   ",
            res.value.data.success
          );

          this.setState({
            messages: res.value.data.data,
          });
          console.log(
            "this.state.messages.length========",
            this.state.messages
          );
          if (this.state.messages.length > 0) {
            // if local state variable already have messages and anyone receive new message then no need to update local state
            // Only update Read flag api
            this.readMessagesAPI(res.value.data.data);
          } else {
            this.formatMessageAndStore(res.value.data.data);
          }
        } else {
          if (res.value && res.value.data.error) {
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
        console.log(TAG, "i am in catch error get messagesDetails", err);
      });
  };

  readMessagesAPI = (response) => {
    const { userDetails } = this.state;
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
        console.log(
          TAG,
          "response of get readMessage",
          JSON.stringify(res.value)
        );
      })
      .catch((err) => {
        console.log(TAG, "i am in catch error readMessage", err);
      });
  };

  async componentWillUnmount() {
    this._isMounted = false;
    await hideMessage();
  }

  onSend(messages = []) {
    const { userDetails } = this.state;

    console.log("onSend() messages :->", userDetails);
    var newMsgs = [];

    messages.forEach((msg) => {
      msg.user.avatar = userDetails.user_data.user_photo;
      msg.user.name = userDetails.user_data.username;
      newMsgs.push(msg);
    });
    console.log("onSend() :->", global.ws);

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

      this.setState(
        (previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, newMsgs),
            isMessageSend: true,
          };
        },
        () => {
          console.log("onSend() messages->", this.state.messages);
        }
      );
    } catch (err) {
      console.log("2nd Error while send socket message. Error:->", err);
      console.log("to_detail :->" + err);
    }
  }

  callSendAPI(messages) {
    var allTextMsg = messages.map((item) => {
      return item.text;
    });
    console.log("in callSendAPI allTextMsg:->", allTextMsg);
    const { insertMessage } = this.props;
    let params = new URLSearchParams();
    // user click on student type chat message
    params.append("to_id", this.state.to_id);
    params.append("message", allTextMsg.join("\n"));

    console.log("param insertMessage :->", params);

    insertMessage(params)
      .then(async (res) => {
        console.log(
          TAG,
          "response of insertMessage",
          JSON.stringify(res.value.data)
        );
        if (res.value && res.value.data.success == true) {
          //OK 200 The request was fulfilled
          if (res.value && res.value.status === 200) {
          }
        } else {
          if (res.value && res.value.data.error) {
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
        console.log(TAG, "i am in catch error insertMessages", err);
      });
  }

  // Render modal faltlist view to choose camera or gallery
  renderOptionsview = (item, index) => {
    return (
      <>
        <TouchableOpacity>
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

  //display gallry picker model
  displayMsgReportPicker = () => {
    this.setState({ isMsgReportPicker: !this.state.isMsgReportPicker });
  };

  setsendText = (text) => {
    this.setState({ txtmessage: text });
  };

  render() {
    const { isMsgReportPicker, options, txtmessage, messages, userDetails } =
      this.state;
    const { isLoading, loaderMessage, theme, chatMessages } = this.props;


    return (
      <>
        <View style={ChatStyle.container}>
          <ChatHeader
            theme={theme}
            isShowBack={true}
            title={"URvi"}
            isShowRighttwo={true}
            isMsgReportPicker={() => this.displayMsgReportPicker()}
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
                        listKey={(item, index) => "D" + index.toString()}
                        keyExtractor={(item, index) => "D" + index.toString()}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </MediaModel>
          </View>
          <GiftedChat
            text={txtmessage}
            onInputTextChanged={(text) => this.setsendText(text)}
            messages={messages}
            onSend={this.onSend}
            user={{
              _id: 1,
            }}
            minInputToolbarHeight={60}
            alwaysShowSend
            scrollToBottom
            renderUsernameOnMessage
            bottomOffset={26}
            onPressAvatar={console.log("onPressAvatar")}
            isTyping={true}
            alwaysShowSends
            placeholder={StaticTitle.chatinput}
            renderInputToolbar={renderInputToolbar}
            renderActions={renderActions}
            renderComposer={renderComposer}
            renderSend={renderSend}
            renderAvatar={renderAvatar}
            renderBubble={renderBubble}
            renderMessage={renderMessage}
            renderMessageText={renderMessageText}
            isCustomViewBottom
            messagesContainerStyle={{
              backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
            }}
            parsePatterns={(linkStyle) => [
              {
                pattern: /#(\w+)/,
                style: linkStyle,
                onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
              },
            ]}
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
  messagesDetails: (params) => dispatch(actions.messagesDetails(params)),
  insertMessage: (params) => dispatch(actions.insertMessage(params)),
  readMessage: (params) => dispatch(actions.readMessage(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessagesScreen);
