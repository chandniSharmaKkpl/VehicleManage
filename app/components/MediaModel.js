import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  // Modal,
} from "react-native";
import { ComponentStyle } from "../assets/styles/ComponentStyle";
import Colors from "../assets/Colors";
import ReactModal from "react-native-modal";

const MediaModel = ({
  onPress,
  modalVisible,
  onBackdropPress,
  onRequestClose,
  ...props
}) => (
  <ReactModal
    animationType="slideOutDown"
    transparent={false}
    isVisible={modalVisible}
    onBackdropPress={onBackdropPress}
    backdropColor={"rgb(57,58,58)"}
    backdropOpacity={1}
  >
    <TouchableWithoutFeedback onPress={onPress}>
      <View {...props} style={{}}></View>
    </TouchableWithoutFeedback>
  </ReactModal>
);

export default MediaModel;
