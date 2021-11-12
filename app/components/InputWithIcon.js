import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import Colors from "../assets/Colors";
import { ComponentStyle } from "../assets/styles/ComponentStyle";
import { renderIf } from "../utils/Globals";
import FastImage from "react-native-fast-image";

const calendar_img = require("../assets/images/calendar.png");

const InputWithIcon = ({
  isShowPassword,
  isVisible,
  placeholderText,
  onPasswordShow,
  secureTextEntry,
  forwardRef,
  onSubmitEditing,
  blurOnSubmit,
  onChangeText,
  value,
  validateMesssage,
  isValidationShow,
  keyboardType,
  maxLength,
  autoCapitalize,
  inputStyle,
  returnKeyType,
  onPressIcon,
  theme,
  ...props
}) => {
  return (
    <View>
      <View {...props} style={[ComponentStyle.passwordInputContainer]}>
        <TextInput
          value={value}
          returnKeyType={returnKeyType}
          ref={forwardRef}
          onSubmitEditing={onSubmitEditing}
          style={[
            ComponentStyle.passwordInputText,
            inputStyle,
            {
              borderColor: isValidationShow ? Colors.red : Colors.white,
            },
          ]}
          placeholder={placeholderText}
          placeholderTextColor={theme.BASIC_FONT_COLOR}
          blurOnSubmit={blurOnSubmit}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          underlineColorAndroid='transparent'
        />
        <TouchableOpacity onPress={onPressIcon}>
          <View
            style={[
              ComponentStyle.eyeContainer,
              { borderColor: isValidationShow ? Colors.red : Colors.white },
            ]}
          >
            <View style={{ marginRight: 15 }}>
              <FastImage
                style={[ComponentStyle.tab_Image]}
                source={calendar_img}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {renderIf(
        isValidationShow,
        <Text style={[ComponentStyle.errorText]}>{validateMesssage}</Text>
      )}
    </View>
  );
};

export default InputWithIcon;
