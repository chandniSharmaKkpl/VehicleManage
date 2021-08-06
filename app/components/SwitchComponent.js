import React from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import { ComponentStyle } from "../assets/styles/ComponentStyle";
import Colors from "../assets/Colors";

const SwitchComponent = ({ value, onValueChange, ...props }) => {
  return (
    <Switch
      style={{
        transform: [{ scaleX: 0.99 }, { scaleY: 0.9 }],
        alignSelf: "flex-end",
      }}
      trackColor={{ false: Colors.switchhide, true: Colors.primary }}
      thumbColor={Colors.white}
      ios_backgroundColor={Colors.switchhide}
      value={value}
      onValueChange={onValueChange}
    />
  );
};
export default SwitchComponent;
