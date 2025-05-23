import React from "react";
import { Appearance, Image } from "react-native";
import {
  InputToolbar,
  Actions,
  Composer,
  Send,
} from "react-native-gifted-chat";
import FastImage from "react-native-fast-image";
import { IMAGE } from "../assets/Images";
import FontFamily from "../assets/styles/FontFamily";
import Icon from "react-native-vector-icons/Ionicons";

import * as globals from "../utils/Globals";
import Colors from "../assets/Colors";

const colorScheme = Appearance.getColorScheme();

export const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    textInputStyle={{
      color: colorScheme === "dark" ? Colors.white : Colors.black,
      fontFamily: FontFamily.RalewaRegular,
      fontSize: globals.font_14,
    }}
    containerStyle={{
      backgroundColor:
        colorScheme === "dark" ? Colors.chatBubbleDark : Colors.white,
      marginHorizontal: 20,
      marginBottom: 20,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 2,
        height: 12,
      },

      shadowOpacity: 0.58,
      shadowRadius: 16,
      elevation: 24,
      paddingTop: 6,
      paddingRight: 3,
      borderRadius: 5,
      borderTopColor:
        colorScheme === "dark"
          ? Colors.dark_background
          : Colors.lite_background,
      borderTopWidth: 1,
    }}
    primaryStyle={{ alignItems: "center" }}
  />
);

export const renderActions = (props) => (
  <Actions
    {...props}
    containerStyle={{
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 4,
      marginRight: 4,
      marginBottom: 0,
    }}
    icon={() => (
      <FastImage
        style={{ width: 22, height: 22 }}
        source={IMAGE.happiness_img}
        resizeMode={FastImage.resizeMode.contain}
      />
    )}
    options={{
      "Choose From Library": () => {},
      Cancel: () => {},
    }}
    optionTintColor={colorScheme === "dark" ? Colors.white : Colors.black}
  />
);

export const renderComposer = (props) => (
  <Composer
    {...props}
    textInputStyle={{
      color: colorScheme === "dark" ? Colors.white : Colors.black,
      // backgroundColor: Colors.white,
      paddingTop: 8.5,
      paddingHorizontal: 12,
      marginLeft: 0,
      fontFamily: FontFamily.RalewaRegular,
      fontSize: globals.font_14,
    }}
  />
);

export const renderSend = (props) => (
  <Send
    {...props}
    disabled={!props.text}
    containerStyle={{
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 4,
      backgroundColor:
        colorScheme === "dark" ? Colors.primary : Colors.btnSecondaryPrimary,
      marginRight: 5,
      // marginTop: 5,
      marginBottom: 10,
      borderRadius: 5,
    }}
  >
    <Icon name={"send"} size={22} color={Colors.white} />
  </Send>
);
