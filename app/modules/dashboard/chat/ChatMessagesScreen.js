import React, { Component } from "react";
import { Image, FlatList, Text, TouchableOpacity, View } from "react-native";
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
import ChatMessages from "../../../dummyData/ChatMessages";
const TAG = "ChatMessagesScreen ::=";

export class ChatMessagesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      txtmessage: "",
      currentUserId: 1,
      messages: [],
      isMsgReportPicker: false,
      options: DefaultChatOptions,
    };
    this.onSend = this.onSend.bind(this);
  }

  componentDidMount() {
    this.setState({ messages: ChatMessages.reverse() });
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
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
    const { isMsgReportPicker, options, txtmessage, messages } = this.state;
    const { isLoading, loaderMessage, theme } = this.props;
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
            messagesContainerStyle={{ backgroundColor: theme.PRIMARY_BACKGROUND_COLOR }}
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
    isLoading: state.home.home.isLoading,
    loaderMessage: state.home.home.loaderMessage,
    theme: state.home.home.theme,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessagesScreen);
