import { AuthStyle } from "../assets/styles/AuthStyle";
import ModalDropdown from "react-native-modal-dropdown-v2";
import React, { Component } from "react";
import { View, Text } from "react-native";
import { StaticTitle } from "../utils/StaticTitle";

const TAG = "DropDownPicker ::=";
const dropDownRef = React.createRef();
const dropdown_renderRow = (rowData) => {
  return (
    <View style={[AuthStyle.dropdown_row]}>
      <Text style={[AuthStyle.dropdown_row_text]}>{rowData.title}</Text>
    </View>
  );
};

const dropdown_renderButtonText = (rowData) => {
  const { title } = rowData;
  return `${title}`;
};

const DropDownPicker = ({
  ref,
  options,
  onSelect,
  defaultValue,
  renderButtonText,
  ...props
}) => {
  return (
    <ModalDropdown
    //   ref={(ref) => (dropDownRef = ref)}
      style={AuthStyle.pickerinput}
      options={options}
      showsVerticalScrollIndicator={false}
      textStyle={AuthStyle.placeholder_font}
      defaultValue={defaultValue}
      dropdownStyle={AuthStyle.dropdown}
      renderRow={dropdown_renderRow}
      onSelect={onSelect}
      renderButtonText={dropdown_renderButtonText}
    />
  );
};
export default DropDownPicker;
