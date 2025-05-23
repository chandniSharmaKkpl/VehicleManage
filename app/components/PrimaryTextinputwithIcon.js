import React from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
import { ComponentStyle } from "../assets/styles/ComponentStyle";
import FastImage from "react-native-fast-image";
import Colors from "../assets/Colors";
import LinearGradient from "react-native-linear-gradient";

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
  isFrom,
  ...props
}) => {
  return isFrom == "Instagram" ? (
    <View {...props} onPress={onPress}>
      <LinearGradient
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 0.7, y: 1.0 }}
        colors={[Colors.orange, Colors.pink, Colors.purple]}
        style={ComponentStyle.primaryBtnContainer}
      >
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
              color: Colors.white,
            },
          ]}
          placeholder={placeholderText}
          placeholderTextColor={Colors.white}
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
      </LinearGradient>
    </View>
  ) : (
    <View {...props} onPress={onPress}>
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
              color: isFrom == "Snap" ? Colors.black : Colors.white,
            },
          ]}
          placeholder={placeholderText}
          placeholderTextColor={isFrom == "Snap" ? Colors.black : Colors.white}
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
    </View>
  );
};
export default PrimaryTextinputwithIcon;
