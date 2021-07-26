import React from "react";
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { ComponentStyle } from "../assets/styles/ComponentStyle";
import Colors from "../assets/Colors";
import FastImage from "react-native-fast-image";
const ButtonwithRightIcon = ({ title, onPress, iconName,bigcontainerstyle, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress} {...props}>
      <View style={[ComponentStyle.bigIconBtnContainer, bigcontainerstyle]}>
        <Text numberOfLines={3} style={[ComponentStyle.bigIconLabel]}>{title}</Text>
        <FastImage
          style={{
            width: 18,
            height: 18,
            tintColor: Colors.primary,
          }}
          source={iconName}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    </TouchableOpacity>
  );
};
export default ButtonwithRightIcon;
