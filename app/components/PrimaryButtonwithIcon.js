import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ComponentStyle } from "../assets/styles/ComponentStyle";
import FastImage from "react-native-fast-image";
import Colors from "../assets/Colors";

const PrimaryButtonwithIcon = ({
  btnName,
  buttonStyle,
  buttonTextStyle,
  onPress,
  iconName,
  iconStyle,
  ...props
}) => {
  return (
    <TouchableOpacity {...props} onPress={onPress}>
      <View style={[ComponentStyle.primaryBtnContainer, buttonStyle]}>
        <FastImage
          style={[ComponentStyle.iconstyle, iconStyle]}
          source={iconName}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={[ComponentStyle.primaryBtnText, buttonTextStyle]}>
          {btnName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default PrimaryButtonwithIcon;
