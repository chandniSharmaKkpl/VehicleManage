import React from "react";
import { View, Image, Text } from "react-native";
import {
  Avatar,
  Bubble,
  SystemMessage,
  Message,
  MessageText,
} from "react-native-gifted-chat";
import FontFamily from "../assets/styles/FontFamily";
import * as globals from "../utils/Globals";
import Colors from "../assets/Colors";
import FastImage from "react-native-fast-image";

export const renderAvatar = (props) => (
  <Avatar
    {...props}
    // containerStyle={{ left: { borderWidth: 3, borderColor: "red" }, right: {} }}
    // imageStyle={{ left: { borderWidth: 3, borderColor: "blue" }, right: {} }}
  />
);

export const renderBubble = (props) => (
  <Bubble
    {...props}
    // renderTime={() => <Text>Time</Text>}
    // renderTicks={() => <Text>Ticks</Text>}

    containerStyle={{
      left: {
        color: Colors.black,
        fontSize: globals.normalize(12),
        fontFamily: FontFamily.RalewaRegular,
      },
      right: {
        color: Colors.black,
        fontSize: globals.normalize(12),
        fontFamily: FontFamily.RalewaRegular,
      },
    }}
    wrapperStyle={{
      left: {
        color: Colors.black,
        backgroundColor: Colors.placeholderColor,
        marginBottom: 10,
        opacity: 0.7,
        paddingVertical: 5,
        justifyContent: "center",
        alignItems: "center",
      },
      right: {
        color: Colors.black,
        backgroundColor: Colors.placeholderColor,
        marginBottom: 10,
        opacity: 0.7,
        paddingVertical: 5,
        justifyContent: "center",
        alignItems: "center",
      },
    }}
    timeTextStyle={{
      right: {
        color: Colors.black,
        fontSize: globals.normalize(12),
        fontFamily: FontFamily.RalewaRegular,
      },
      left: {
        color: Colors.black,
        fontSize: globals.normalize(12),
        fontFamily: FontFamily.RalewaRegular,
      },
    }}
    textStyle={{
      right: {
        color: Colors.black,
        fontSize: globals.normalize(12),
        fontFamily: FontFamily.RalewaRegular,
      },
      left: {
        color: Colors.black,
        fontSize: globals.normalize(12),
        fontFamily: FontFamily.RalewaRegular,
      },
    }}
    bottomContainerStyle={{
      left: {
        color: Colors.black,
        fontSize: globals.normalize(12),
        fontFamily: FontFamily.RalewaRegular,
      },
      right: {
        color: Colors.black,
        fontSize: globals.normalize(12),
        fontFamily: FontFamily.RalewaRegular,
      },
    }}
    tickStyle={{}}
    containerToNextStyle={{
      left: {
        color: Colors.black,
        fontSize: globals.normalize(12),
        fontFamily: FontFamily.RalewaRegular,
      },
      right: {
        color: Colors.black,
        fontSize: globals.normalize(12),
        fontFamily: FontFamily.RalewaRegular,
      },
    }}
    containerToPreviousStyle={{
      left: {
        color: Colors.black,
        fontSize: globals.normalize(12),
        fontFamily: FontFamily.RalewaRegular,
      },
      right: {
        color: Colors.black,
        fontSize: globals.normalize(12),
        fontFamily: FontFamily.RalewaRegular,
      },
    }}
  />
);

export const renderSystemMessage = (props) => (
  <SystemMessage
    {...props}
    containerStyle={{ backgroundColor: "pink" }}
    wrapperStyle={{ borderWidth: 10, borderColor: "white" }}
    textStyle={{ color: "crimson", fontWeight: "900" }}
  />
);

export const renderMessage = (props) => (
  <Message
    {...props}
    // renderDay={() => <Text>Date</Text>}
    // containerStyle={{
    //   left: { backgroundColor: "pink" },
    //   right: { backgroundColor: "gold" },
    // }}
  />
);

export const renderMessageText = (props) => (
  <MessageText
    {...props}
    containerStyle={{
      left: { backgroundColor: Colors.msgBG },
      right: { backgroundColor: Colors.msgBG },
    }}
    textStyle={{
      left: { color: Colors.black },
      right: { color: Colors.black },
    }}
    linkStyle={{
      left: { color: Colors.black },
      right: { color: Colors.black },
    }}
    customTextStyle={{
      lineHeight: 24,
      fontFamily: FontFamily.RalewaRegular,
      fontSize: globals.font_14,
    }}
  />
);

export const renderCustomView = ({ user }) => (
  console.log("user=====", user),
  user.currentMsg_id == user.getparticularMsg_id ? (
    <View
      style={{
        // position: "absolute",
        // top: 35,
        // right: 50,
        width: 30,
        height: 30,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "baseline",
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontFamily: FontFamily.RalewaRegular,
          fontWeight: "400",
        }}
      >
        {user.emoji}
      </Text>
    </View>
  ) : null
);
