import { StyleSheet, Platform } from "react-native";
import Colors from "../Colors";
import { RFPercentage } from "../../utils/ResponsiveFont";
import FontFamily from "./FontFamily";
import * as globals from "../../utils/Globals";

export const ComponentStyle = StyleSheet.create({
  onlyFlex: {
    flex: 1,
  },

  //Tab tool bar design mobile or iPad
  //Custom Component name "TabNavigator" Starting....
  tabContainer: {
    width: "500%",
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontFamily: FontFamily.RalewaRegular,
    fontSize: RFPercentage(1.5),
    color: Colors.white,
  },
  tabImage: { width: 25, height: 25, tintColor: Colors.primary },
  //Custom Component name "TabNavigator" Finished...

  //Custom Component name "Loader" Starting....
  centerIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    zIndex: 9999,
    backgroundColor: Colors.blackTransparent,
  },
  middleContainer: {
    width: 120,
    height: 110,
    borderRadius: 10,
    backgroundColor: "#DCDCDC",
    zIndex: 999,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: Colors.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 3,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loadingText: {
    fontSize: RFPercentage(1.5),
    textAlign: "center",
    paddingTop: 10,
    color: Colors.customDarkPrimary,
  },

  //Custom Component name "PrimaryButton" Starting....
  primaryBtnContainer: {
    height: 55,
    backgroundColor: Colors.blue_background,
    borderRadius: 9,
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    marginBottom: globals.deviceHeight * 0.02,
    marginHorizontal: globals.deviceWidth * 0.02,
  },
  primaryBtnText: {
    fontFamily: FontFamily.RalewaySemiBold,
    fontSize: globals.font_16,
    color: Colors.white,
    textAlign: "center",
    justifyContent: "center",
  },
  iconstyle: {
    width: 35,
    height: 35,
    marginLeft: 8,
    marginRight: 24,
    marginVertical: 10,
  },
  //Custom Component name "PrimaryButton" Finished...

  //Custom Component name "BigIconButton" Starting....
  bigIconBtnContainer: {
    // height: 55,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  bigIconLabel: {
    fontFamily: FontFamily.RalewaRegular,
    fontSize: globals.font_15,
    color: Colors.white,
    textAlign: "left",
    justifyContent: "center",
    marginLeft: 5,
    width: globals.deviceWidth * 0.65,
    paddingVertical: 2,
  },
  //Custom Component name "BigIconButton" Finished....

  /// primaryBtnonlyContainer style Starting....
  primaryBtnonlyContainer: {
    height: 55,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    justifyContent: "center",
  },
  primaryBtnonlyText: {
    fontFamily: FontFamily.RalewaySemiBold,
    fontSize: globals.font_18,
    color: Colors.white,
    textAlign: "center",
    justifyContent: "center",
  },
  PrimaryTextinputiconstyle: {
    width: 25,
    height: 25,
    marginLeft: 20,
    marginRight: 24,
    marginVertical: 10,
  },
  //primaryBtnonlyContainer style Finished....

  // Login Input style started
  inputText: {
    height: 45,
    marginHorizontal: 20,
    fontFamily: FontFamily.RalewaRegular,
    fontSize: globals.font_14,
    borderBottomWidth: 0.8,
    marginTop: 20,
    borderBottomColor: Colors.border_color,
    color: Colors.black,
  },
  errorText: {
    fontFamily: FontFamily.RalewaRegular,
    fontSize: RFPercentage(1.5),
    color: Colors.red,
    padding: 5,
    marginHorizontal: 15,
  },
  passwordInputText: {
    height: 45,
    marginTop: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.border_color,
    fontFamily: FontFamily.RalewaRegular,
    fontSize: globals.font_14,
    flex: 1,
    color: Colors.black,
  },
  eyeContainer: {
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.border_color,
    marginTop: 10,
    height: 45,
    justifyContent: "center",
  },

  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    marginHorizontal: 20,
  },
  tab_Image: { width: 20, height: 20, tintColor: Colors.primary },
  roundedtab_img: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    tintColor: Colors.primary,
  },

  //// Custom Header style
  headerContainer: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? globals.deviceHeight * 0.03 : 0,
  },
  headerContain: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  titleText: {
    fontSize: RFPercentage(2.5),
    fontFamily: FontFamily.RalewaySemiBold,
    color: Colors.white,
    // backgroundColor:'red',
    // width:globals.deviceWidth * 0.42
  },
  messagescountstyle: {
    fontSize: RFPercentage(2.2),
    fontFamily: FontFamily.RalewaRegular,
    color: Colors.white,
    textAlign: "center",
    bottom: 5,
  },
  countcircleview: {
    width: globals.deviceWidth * 0.045,
    height: globals.deviceWidth * 0.045,
    borderRadius: (globals.deviceWidth * 0.045) / 2,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: globals.deviceWidth * 0.04,
    left: globals.deviceWidth * 0.04,
    backgroundColor: Colors.red,
  },
  msgcountcircleview: {
    width: globals.deviceWidth * 0.045,
    height: globals.deviceWidth * 0.045,
    borderRadius: (globals.deviceWidth * 0.045) / 2,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    position: "absolute",
    bottom: globals.deviceWidth * 0.09,
    left: globals.deviceWidth * 0.09,
    backgroundColor: Colors.red,
  },
  /////// Social media textinput for snapchat

  snap_inputText: {
    fontFamily: FontFamily.RalewaRegular,
    fontSize: globals.font_14,
    width: globals.deviceWidth * 0.65,
    color: Colors.black,
  },

  /// react-native modal

  modelContainer: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
  },
  modelView: {
    backgroundColor: Colors.white,
    width: "100%",
    borderRadius: 10,
  },

  titleviewstyle: {
    marginVertical: globals.deviceHeight * 0.01,
  },
  choosefilestyle: {
    fontSize: globals.font_16,
    fontFamily: FontFamily.RalewaySemiBold,
    color: Colors.primary,
    paddingTop: 18,
    paddingBottom: 18,
    textAlign: "center",
  },
  lineStyle: {
    height: globals.deviceHeight * 0.002,
    width: "100%",
    backgroundColor: Colors.primary,
    opacity: 0.6,
  },
  viewPopupStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginStart: 22,
  },
  textStylePopup: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: FontFamily.RalewaRegular,
    fontWeight: "400",
    paddingTop: 18,
    paddingBottom: 18,
    paddingHorizontal: globals.deviceWidth * 0.03,
  },
  lineStyle1: {
    height: Platform.OS == "ios" ? 0.1 : 0.5,
    width: "100%",
    backgroundColor: Colors.black,
    opacity: 0.4,
  },
  imagePopupStyle: {
    height: globals.deviceWidth * 0.05,
    width: globals.deviceWidth * 0.05,
    resizeMode: "contain",
  },

  //// Linear gradient button style
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: FontFamily.RalewaRegular,
    fontSize: globals.font_15,
    textAlign: "center",
    color: Colors.white,
  },
  instaiconstyle: {
    width: 25,
    height: 25,
    marginLeft: 20,
    marginRight: 24,
    marginVertical: 10,
  },

  //// SEARCH COMPONENT
  searchContainer: {
    flexDirection: "row",
    height: 49,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginVertical: 5,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: globals.deviceWidth * 0.05,
    marginVertical: globals.deviceHeight * 0.02,
    backgroundColor: Colors.white,
    borderColor: Colors.border_color,
    borderWidth: 0.1,
    borderRadius: 5,
    shadowColor: Platform.OS == "android" ? "#000" : Colors.blackTransparent,
    shadowOffset: {
      width: 2,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16,
    elevation: 24,
    zIndex: 0,
  },
  search_inputText: {
    fontFamily: FontFamily.RalewaRegular,
    fontSize: globals.font_13,
    width: globals.deviceWidth * 0.75,
    color: Colors.search_placeholder,
  },
  search_icon: {
    width: 15,
    height: 15,
    alignSelf: "center",
  },

  /// CHAT HEADER
  circleview: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    // justifyContent: "center",
  },
});
