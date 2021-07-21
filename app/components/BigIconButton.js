import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ComponentStyle } from "../assets/styles/ComponentStyle";
import Colors from "../assets/Colors";
import FastImage from "react-native-fast-image";
const BigIconButton = ({ title, onPress, iconName, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress} {...props}>
      <View style={[ComponentStyle.bigIconBtnContainer]}>
        <FastImage
          style={{
            width: 35,
            height: 35,
            tintColor: Colors.primary,
          }}
          source={iconName}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={[ComponentStyle.bigIconLabel]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default BigIconButton;
