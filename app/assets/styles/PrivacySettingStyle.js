import { StyleSheet, Platform } from "react-native";
import Colors from "../Colors";
import { RFPercentage } from "../../utils/ResponsiveFont";
import FontFamily from "./FontFamily";
import * as globals from "../../utils/Globals";

export const PrivacySettingStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lite_background,
  },
  maincontainer: {
    flex: 1,
    // backgroundColor: "red",
    marginHorizontal: 10,
    marginVertical: 15,
  },
  headingtitle: {
    fontFamily: FontFamily.RalewaySemiBold,
    fontSize: globals.font_20,
    color: Colors.black,
    textAlign: "left",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  separatorLine: {
    height: 1,
    backgroundColor: Colors.lite_black,
    opacity: 0.045,
    paddingTop: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  itemview: {
    flexDirection: "row",
  },
  itemtext: {
    fontFamily: FontFamily.RalewaRegular,
    fontSize: globals.font_14,
    color: Colors.switchtext,
    textAlign: "left",
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: "80%",
  },
  marginTop: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
});
