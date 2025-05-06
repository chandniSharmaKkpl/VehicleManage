import React, { Component } from "react";
import { TouchableOpacity, View, TextInput, Text } from "react-native";
import { ComponentStyle } from "../assets/styles/ComponentStyle";
import Icon from "react-native-vector-icons/Ionicons";

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
      <Icon
        name={"search-outline"}
        size={20}
        color={theme.PRIMARY_TEXT_COLOR}
      />
    </TouchableOpacity>
  </View>
);

export default Search;
