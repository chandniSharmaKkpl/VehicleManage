import React from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
import { ComponentStyle } from "../assets/styles/ComponentStyle";
import FastImage from "react-native-fast-image";
import Colors from "../assets/Colors";

const PrimaryTextinputwithIcon = ({
  btnName,
  buttonStyle,
  buttonTextStyle,
  onPress,
  iconName,
  iconStyle,
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
  ...props
}) => {
  return (
    <TouchableOpacity {...props} onPress={onPress}>
      <View style={[ComponentStyle.primaryBtnContainer, buttonStyle]}>
        <FastImage
          style={[ComponentStyle.PrimaryTextinputiconstyle, iconStyle]}
          source={iconName}
          resizeMode={FastImage.resizeMode.contain}
        />
        <TextInput
          value={value}
          returnKeyType={returnKeyType}
          ref={forwardRef}
          onSubmitEditing={onSubmitEditing}
          style={[
            ComponentStyle.snap_inputText,
            inputStyle,
            {
              borderColor: isValidationShow ? Colors.red : Colors.white,
            },
          ]}
          placeholder={placeholderText}
          placeholderTextColor={Colors.black}
          blurOnSubmit={blurOnSubmit}
          onChangeText={onChangeText}
          maxLength={26}
          minLength={2}
          keyboardType={keyboardType}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          underlineColorAndroid="transparent"
          multiline={multiline}
          autoFocus={false}
          numberOfLines={numberOfLines}
        />
      </View>
    </TouchableOpacity>
  );
};
export default PrimaryTextinputwithIcon;
