import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { ComponentStyle } from "../assets/styles/ComponentStyle";
import Colors from "../assets/Colors";
import FastImage from "react-native-fast-image";
import * as globals from "../utils/Globals";

const ButtonwithRightIcon = ({
  title,
  onPress,
  iconName,
  bigcontainerstyle,
  attachUrl,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={onPress} {...props}>
      <View style={[ComponentStyle.bigIconBtnContainer, bigcontainerstyle]}>
        <Text numberOfLines={2} style={[ComponentStyle.bigIconLabel]}>
          {title}
        </Text>
        <View
          style={{
            width: globals.deviceWidth * 0.15,
            height: globals.deviceWidth * 0.15,
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "red",
          }}
        >
          {attachUrl ? (
            <FastImage
              style={{
                width: globals.deviceWidth * 0.12,
                height: globals.deviceWidth * 0.12,
                tintColor: Colors.primary,
              }}
              source={{ uri: attachUrl }}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : (
            <FastImage
              style={{
                width: 18,
                height: 18,
                tintColor: Colors.primary,
              }}
              source={iconName}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ButtonwithRightIcon;
