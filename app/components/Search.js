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
}) => (
  <View style={ComponentStyle.searchContainer}>
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
          borderColor: Colors.white,
        },
      ]}
      placeholder={placeholderText}
      placeholderTextColor={Colors.search_placeholder}
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
          { tintColor: Colors.search_placeholder },
        ]}
        source={IMAGE.search_img}
        resizeMode={FastImage.resizeMode.contain}
      />
    </TouchableOpacity>
  </View>
);

export default Search;
