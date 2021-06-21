import React, { Component } from "react";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import { ComponentStyle } from "../assets/styles/ComponentStyle";
import Colors from "../assets/Colors";

const Loader = ({ loaderMessage }) => (
  <View style={ComponentStyle.centerIndicator}>
    <View style={ComponentStyle.middleContainer}>
      <ActivityIndicator
        size={"small"}
        color={Colors.customDarkPrimary}
        style={{ zIndex: 100 }}
      />
      <Text style={ComponentStyle.loadingText}>{loaderMessage}</Text>
    </View>
  </View>
);

export default Loader;
