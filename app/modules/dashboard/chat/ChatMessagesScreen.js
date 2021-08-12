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
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  Actions,
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
      isMsgReportPicker: false,
      options: DefaultChatOptions,
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
        {
          _id: 2,
          text: "My message",
          createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
          user: {
            _id: 2,
            name: "React Native",
          },
          video:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
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
    return (
      <InputToolbar
        {...props}
        containerStyle={ChatStyle.inputToolBar}
        primaryStyle={{ alignItems: "center" }}
      />
    );
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

  render() {
    const { isMsgReportPicker, options } = this.state;
    return (
      <>
        <View style={ChatStyle.container}>
          <ChatHeader
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
            renderActions={(props) => (
              <View style={ChatStyle.sendContainer}>
                <TouchableOpacity {...props} containerStyle={ChatStyle.send}>
                  <View
                    style={[
                      ChatStyle.sendIconContainer,
                      { backgroundColor: Colors.white },
                    ]}
                  >
                    <FastImage
                      style={ChatStyle.hapinessicon}
                      source={IMAGE.happiness_img}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
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
                        marginBottom: 10,
                      },
                      right: {
                        backgroundColor: Colors.msgBG,
                        marginBottom: 10,
                      },
                    }}
                    containerToPreviousStyle={{
                      right: { borderTopRightRadius: 10 },
                      left: { borderTopLeftRadius: 10 },
                    }}
                    containerToNextStyle={{
                      right: { borderTopRightRadius: 10 },
                      left: { borderTopLeftRadius: 10 },
                    }}
                    containerStyle={{
                      right: { borderTopRightRadius: 10 },
                      left: { borderTopLeftRadius: 10 },
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
