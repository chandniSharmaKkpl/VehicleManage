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
    // width: "80%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    // marginVertical: 2,
    marginHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  itemcellChat: {
    // width: "100%",
    width: globals.deviceWidth,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  rightTime: {
    // width: "20%",
    width: globals.deviceWidth * 0.3,
    paddingRight: 15,
    alignItems: "flex-end",
  },
  titleBig: {
    fontFamily: FontFamily.RalewaySemiBold,
    fontSize: globals.font_14,
    color: Colors.black,
    marginBottom: globals.deviceHeight * 0.003,
  },
  detailsview: {
    flexDirection: "row",
    marginVertical: 3,
    alignItems: "center",
    width: globals.deviceWidth * 0.55,
  },
  titleSmall: {
    fontFamily: FontFamily.RalewaRegular,
    fontSize: globals.font_12,
    color: Colors.lite_black,
    marginBottom: globals.deviceHeight * 0.003,
  },
  readcount: {
    fontSize: globals.font_15,
    color: Colors.white,
    fontFamily: FontFamily.RalewaRegular,
  },
  separatorLine: {
    height: 1,
    backgroundColor: Colors.lite_black,
    opacity: 0.045,
    paddingTop: 1,
    marginHorizontal: 20,
  },
  imageContainer: {
    // width: "20%",
    width: globals.deviceWidth * 0.2,
    alignItems: "center",
  },
  imageStyleChat: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  imageStyle: {
    height: globals.deviceWidth * 0.15,
    width: globals.deviceWidth * 0.15,
    borderRadius: (globals.deviceWidth * 0.15) / 2,
    alignItems: "center",
  },
  multiimageStyle: {
    height: globals.deviceWidth * 0.08,
    width: globals.deviceWidth * 0.08,
    borderRadius: (globals.deviceWidth * 0.08) / 2,
    borderColor: Colors.primary,
    borderWidth: 2,
    alignItems: "center",
    position: "relative",
  },
  chatImgstyle: {
    height: globals.deviceWidth * 0.08,
    width: globals.deviceWidth * 0.08,
    alignItems: "center",
    alignSelf: "center",
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
  userdetailChat: {
    // width: "60%",
    width: globals.deviceWidth * 0.5,
  },
  userdetail: {
    marginHorizontal: 15,
    width: "65%",
  },
  flatliststyle: {
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
    backgroundColor: Colors.primary,
    marginTop: 3,
  },
  redcircleview: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.red,
    alignSelf: "flex-end",
    marginRight: 5,
    position: "absolute",
    right: 7,
  },
});
