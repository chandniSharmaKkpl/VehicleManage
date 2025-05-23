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
  multiline,
  numberOfLines,
  autoFocus,
  theme,
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
            color: theme.PRIMARY_TEXT_COLOR,
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
        underlineColorAndroid="transparent"
        multiline={multiline}
        autoFocus={false}
        numberOfLines={numberOfLines}
      />
      {renderIf(
        isValidationShow,
        <Text style={[ComponentStyle.errorText]}>{validateMesssage}</Text>
      )}
    </View>
  );
};
export default Input;
