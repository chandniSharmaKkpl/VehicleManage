import React, { Component } from "react";
import { TouchableOpacity, View, TextInput, Text } from "react-native";
import { ComponentStyle } from "../assets/styles/ComponentStyle";
import Colors from "../assets/Colors";
import FastImage from "react-native-fast-image";
import { IMAGE } from "../assets/Images";

const Search = ({
  searchMessage,
  returnKeyType,
  forwardRef,
  onSubmitEditing,
  inputStyle,
  placeholderText,
  blurOnSubmit,
  onChangeText,
  keyboardType,
  maxLength,
  autoCapitalize,
  iconStyle,
  onPress,
  value,
  theme,
}) => (
  <View
    style={[
      ComponentStyle.searchContainer,
      { backgroundColor: theme.CURVE_BG_COLORS },
    ]}
  >
    <TextInput
      value={value}
      searchMessage={searchMessage}
      returnKeyType={returnKeyType}
      ref={forwardRef}
      onSubmitEditing={onSubmitEditing}
      style={[
        ComponentStyle.search_inputText,
        inputStyle,
        {
          color: theme.PRIMARY_TEXT_COLOR,
          borderColor: Colors.white,
        },
      ]}
      placeholder={placeholderText}
      placeholderTextColor={theme.LITE_FONT_COLOR}
      blurOnSubmit={blurOnSubmit}
      onChangeText={onChangeText}
      maxLength={26}
      minLength={2}
      keyboardType={keyboardType}
      maxLength={maxLength}
      autoCapitalize={autoCapitalize}
      underlineColorAndroid="transparent"
      autoFocus={false}
    />
    <TouchableOpacity onPress={onPress}>
      <FastImage
        style={[
          ComponentStyle.search_icon,
          iconStyle,
          { tintColor: theme.prim },
        ]}
        source={IMAGE.search_img}
        resizeMode={FastImage.resizeMode.contain}
      />
    </TouchableOpacity>
  </View>
);

export default Search;
