import { StyleSheet, Platform } from "react-native";
import Colors from "../Colors";
import { RFPercentage } from "../../utils/ResponsiveFont";
import FontFamily from "./FontFamily";
import * as globals from "../../utils/Globals";

export const FriendListStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.liteBg,
  },
  itemcell: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    // marginVertical: 2,
    marginHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  titleBig: {
    fontFamily: FontFamily.RalewaySemiBold,
    fontSize: globals.font_14,
    color: Colors.black,
    marginBottom: globals.deviceHeight * 0.003,
  },
  titleSmall: {
    fontFamily: FontFamily.RalewaRegular,
    fontSize: globals.font_12,
    color: Colors.lite_black,
    marginBottom: globals.deviceHeight * 0.003,
  },
  readcount: {
    fontSize: globals.font_14,
    color: Colors.white,
    textAlign: "center",
    fontFamily: FontFamily.RalewaRegular,
  },
  separatorLine: {
    height: 1,
    backgroundColor: Colors.lite_black,
    opacity: 0.045,
    paddingTop: 1,
    marginHorizontal: 20,
  },
  imageStyle: {
    height: globals.deviceWidth * 0.15,
    width: globals.deviceWidth * 0.15,
    borderRadius: (globals.deviceWidth * 0.15) / 2,
    alignItems: "center",
  },
  navigateimgStyle: {
    height: 15,
    width: 15,
  },
  squareView: {
    alignSelf: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    backgroundColor: Colors.white,
    borderColor: Colors.border_color,
    borderWidth: 0.1,
    borderRadius: 5,
    shadowColor: Platform.OS == "android" ? "#000" : Colors.placeholderColor,
    shadowOffset: {
      width: 2,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16,
    elevation: 24,
    zIndex: 0,
    alignItems: "center",
  },
  userdetail: {
    marginHorizontal: 15,
    width: "60%",
  },
  flatliststyle: {
    flex: 1,
    marginVertical: 5,
  },
  emptyview: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: 'red',
    justifyContent: "center",
  },
  emptytext: {
    color: Colors.placeholderColor,
    fontSize: globals.font_14,
    fontWeight: "bold",
    width: globals.deviceWidth,
    fontFamily: FontFamily.RalewaRegular,
    alignSelf: "center",
    textAlign: "center",
  },

  ////// NOTIFICATIOn

  notificationtext: {
    fontFamily: FontFamily.RalewaySemiBold,
    fontSize: globals.font_14,
    color: Colors.black,
    marginHorizontal: globals.deviceWidth * 0.04,
    width: globals.deviceWidth * 0.65,
  },

  circleview: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    alignSelf: "flex-end",
    marginRight: 5,
  },
});
