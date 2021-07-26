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
    animationType="slide"
    transparent={true}
    isVisible={modalVisible}
    onBackdropPress={onBackdropPress}
    backdropColor={"rgba(58, 58, 58, 0.8)"}
    backdropOpacity={1}
  >
    <TouchableWithoutFeedback onPress={onPress}>
      <View {...props} style={{}}></View>
    </TouchableWithoutFeedback>
  </ReactModal>
);

export default MediaModel;
