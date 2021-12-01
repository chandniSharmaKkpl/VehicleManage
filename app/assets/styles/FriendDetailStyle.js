import { StyleSheet, Platform } from "react-native";
import Colors from "../Colors";
import { RFPercentage } from "../../utils/ResponsiveFont";
import FontFamily from "./FontFamily";
import * as globals from "../../utils/Globals";

export const FriendDetailStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    height: "100%",
    width: globals.deviceWidth,
  },
  halfContainer: {
    flex: 0.5,
    position: "relative",
  },
  backbtnview: {
    position: "absolute",
    top: 45,
    left: 20,
  },
  userdetailview: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    // marginTop: globals.deviceHeight * 0.31,
    marginTop:
      Platform.OS == "android"
        ? globals.deviceHeight / 3.5
        : globals.deviceHeight / 3.3,
  },
  squareView: {
    alignSelf: "flex-start",
    justifyContent: "center",
    width: 35,
    height: 35,
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
    marginTop: 5,
    opacity: 0.5,
  },
  navigateimgStyle: {
    height: 15,
    width: 15,
    color: Colors.black,
  },
  socialicon: {
    height: 19,
    width: 19,
  },
  headingtitle: {
    fontFamily: FontFamily.RalewaySemiBold,
    fontSize: globals.font_24,
    color: Colors.primary,
    textAlign: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.placeholderColor,
  },
  titletext: {
    fontFamily: FontFamily.RalewaRegular,
    fontSize: globals.font_14,
    color: Colors.white,
    textAlign: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop:globals.deviceHeight *0.01,
    backgroundColor:Colors.primary
  },
  middleview: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    marginTop:
      Platform.OS == "android"
        ? globals.deviceHeight / 2.1
        : globals.deviceHeight / 2.4,

    flexDirection: "row",
    alignSelf: "center",
    zIndex: 40,
  },
  circleview: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginHorizontal: 7,
  },
  squareviews:{
    // width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginHorizontal: 5,
  },
  secondhalfview: {
    flex: 0.4,
    position: "relative",
  },
  descriptionContainer: {
    marginTop: globals.deviceHeight * 0.065,
    marginHorizontal: 10,
  },
  dectext: {
    fontFamily: FontFamily.RalewaySemiBold,
    fontSize: globals.font_20,
    color: Colors.black,
    textAlign: "left",
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: "90%",
  },
  itemtext: {
    fontFamily: FontFamily.RalewaRegular,
    fontSize: globals.font_12,
    color: Colors.switchtext,
    textAlign: "left",
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  bottomview: {
    flex: 0.1,
    alignSelf: "flex-end",
    justifyContent: "center",
    marginVertical: 10,
    marginRight: 10,
  },
  bottomcircleview: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.btnSecondaryPrimary,
    // opacity: 0.5,
    marginHorizontal: 17,
  },
  bottomicon: {
    height: 22,
    width: 22,
  },
});
