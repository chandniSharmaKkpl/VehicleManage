import React from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";


const GenerateRandomFileName = ({ result, ...props }) => {
  console.log("GenerateRandomFileName");
  let length = 5;
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export default GenerateRandomFileName;
