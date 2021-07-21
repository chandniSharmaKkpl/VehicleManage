import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ComponentStyle } from "../assets/styles/ComponentStyle";

const PrimaryButton = ({ btnName, buttonStyle,buttonTextStyle, onPress, ...props }) => {
  return (
    <TouchableOpacity {...props} onPress={onPress}>
      <View style={[ComponentStyle.primaryBtnonlyContainer, buttonStyle]}>
        <Text style={[ComponentStyle.primaryBtnonlyText, buttonTextStyle]}>{btnName}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default PrimaryButton;
