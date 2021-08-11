import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { connect } from "react-redux";
import { ChatStyle } from "../../../assets/styles/ChatStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import { Search } from "../../../components";
import NavigationService from "../../../utils/NavigationService";
import { IMAGE } from "../../../assets/Images";
import { NavigationEvents } from "react-navigation";
import ChatHeader from "../../../components/ChatHeader";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../../../assets/Colors";

const TAG = "ChatMessagesScreen ::=";

export class ChatMessagesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messageText: "",
      currentUserId: 1,
      messages: [],
    };
    this.onSend = this.onSend.bind(this);
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "My message",
          createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
          user: {
            _id: 2,
            name: "React Native",
          },
          image: "https://facebook.github.io/react/img/logo_og.png",
          sent: true,
          received: true,
          pending: true,
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  renderInputToolbar(props) {
    return <InputToolbar {...props} containerStyle={ChatStyle.inputToolBar} />;
  }

  render() {
    return (
      <>
        <View style={ChatStyle.container}>
          <ChatHeader isShowBack={true} title={"URvi"} isShowRighttwo={true} />
          <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            showUserAvatar={false}
            user={{
              _id: 1,
            }}
            isTyping={true}
            minInputToolbarHeight={90}
            renderInputToolbar={this.renderInputToolbar}
            alwaysShowSends
            placeholder={StaticTitle.chatinput}
            alwaysShowSend={true}
            renderSend={(props) => (
              <View style={ChatStyle.sendContainer}>
                <Send {...props} containerStyle={ChatStyle.send}>
                  <View style={ChatStyle.sendIconContainer}>
                    <Ionicons
                      name="send"
                      type="MaterialIcons"
                      style={ChatStyle.sendIcon}
                    />
                  </View>
                </Send>
              </View>
            )}
            renderBubble={(props) => {
              return (
                <View>
                  <Bubble
                    {...props}
                    timeTextStyle={{
                      right: { color: Colors.black },
                      left: { color: Colors.black },
                    }}
                    textStyle={{
                      right: {
                        color: Colors.black,
                      },
                    }}
                    wrapperStyle={{
                      left: {
                        backgroundColor: Colors.msgBG,
                      },
                      right: {
                        backgroundColor: Colors.msgBG,
                      },
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      </>
    );
  }
}

// const mapStateToProps = (state) => {

// };

// const mapDispatchToProps = (dispatch) => ({
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ChatMessagesScreen);
export default ChatMessagesScreen;
