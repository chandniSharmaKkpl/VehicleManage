import React from "react";
import { Switch, Platform } from "react-native";
import Colors from "../assets/Colors";

const SwitchComponent = ({ theme, value, onValueChange, ...props }) => {
  return (
    <Switch
      style={{
        transform:
          Platform.OS == "ios"
            ? [{ scaleX: 0.99 }, { scaleY: 0.9 }]
            : [{ scaleX: 1.2 }, { scaleY: 1.2 }],
        alignSelf: "flex-end",
      }}
      trackColor={{ false: theme.SWITCH_COLOR, true: Colors.primary }}
      thumbColor={Colors.white}
      ios_backgroundColor={Colors.switchhide}
      value={value}
      onValueChange={onValueChange}
    />
  );
};
export default SwitchComponent;
