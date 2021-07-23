import React from "react";
import { View, TextInput, Text } from "react-native";
import Colors from "../assets/Colors";
import { ComponentStyle } from "../assets/styles/ComponentStyle";
import { renderIf } from "../utils/Globals";
const Input = ({
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
  ...props
}) => {
  return (
    <View {...props}>
      <TextInput
        value={value}
        returnKeyType={returnKeyType}
        ref={forwardRef}
        onSubmitEditing={onSubmitEditing}
        style={[
          ComponentStyle.inputText,
          inputStyle,
          {
            borderColor: isValidationShow ? Colors.red : Colors.white,
          },
        ]}
        placeholder={placeholderText}
        placeholderTextColor={Colors.lite_black}
        blurOnSubmit={blurOnSubmit}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
        underlineColorAndroid="transparent"
      />
      {renderIf(
        isValidationShow,
        <Text style={[ComponentStyle.errorText]}>{validateMesssage}</Text>
      )}
    </View>
  );
};
export default Input;
