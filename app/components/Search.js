import React, { Component } from "react";
import { ActivityIndicator, View, TextInput, Text } from "react-native";
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
}) => (
  <View style={ComponentStyle.searchContainer}>
    <TextInput
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
    <FastImage
      style={[
        ComponentStyle.search_icon,
        iconStyle,
        { tintColor: Colors.search_placeholder },
      ]}
      source={IMAGE.search_img}
      resizeMode={FastImage.resizeMode.contain}
    />
  </View>
);

export default Search;
