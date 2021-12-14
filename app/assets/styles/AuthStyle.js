import { StyleSheet, Platform } from "react-native";
import Colors from "../Colors";
import { RFPercentage } from "../../utils/ResponsiveFont";
import FontFamily from "./FontFamily";
import * as globals from "../../utils/Globals";

export const AuthStyle = StyleSheet.create({
  primaryBG: {
    height: "100%",
    width: "100%",
  },

  //BG image container
  imageOverlay: {
    // backgroundColor: Colors.blackTransparent,
    flex: 1,
  },
  spalshContainer: {
    // justifyContent: "center",
    alignSelf: "center",
    flex: 1,
  },
  splash_imglogo: {
    width: globals.deviceHeight * 0.35,
    height: globals.deviceHeight * 0.35,
    resizeMode: "contain",
  },

  /// Common STyle of auth screen's
  onlyFlex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.liteBg,
  },
  logincontainer: {
    flex: 1,
    backgroundColor: Colors.lite_background,
    padding: 10,
  },
  dropdown_2: {
    alignSelf: "flex-end",
    width: 300,
    marginTop: 32,
    right: 8,
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: "cornflowerblue",
  },
  dropdown_row: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    backgroundColor: Colors.primary,
    // opacity:0.5
  },
  dropdown_row_text: {
    marginHorizontal: 14,
    fontFamily: FontFamily.RalewaRegular,
    fontSize: globals.font_14,
    color: Colors.white,
    textAlignVertical: "center",
    textAlign: "center",
  },
  dropdown: {
    width: "90%",
    // height: 300,
    flex: 1,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: Colors.placeholderColor,
  },
  placeholder_font: {
    color: Colors.placeholderColor,
    fontFamily: FontFamily.RalewaRegular,
    fontSize: globals.font_14,
  },
  pickerinput: {
    height: 45,
    marginHorizontal: 20,
    borderBottomWidth: 0.8,
    marginTop: 20,
    borderBottomColor: Colors.border_color,
  },
  imglogoContainer: {
    // flex: 0.1,
    height: 50,

    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: globals.deviceHeight * 0.07,
  },
  imglogo: {
    width: globals.deviceHeight * 0.25,
    height: globals.deviceHeight * 0.25,
    resizeMode: "contain",
  },
  imgcarContainer: {
    // flex: 0.2,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: globals.deviceHeight * 0.09,
  },
  imgcar: {
    width: globals.deviceHeight * 0.36,
    height: globals.deviceHeight * 0.45,
    resizeMode: "contain",
  },
  titleText: {
    fontFamily: FontFamily.RalewaySemiBold,
    fontSize: globals.font_32,
    color: Colors.primary,
    textAlign: "center",
    justifyContent: "center",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: globals.deviceHeight * 0.09,
    marginBottom: globals.deviceHeight * 0.04,
  },

  /// Login views

  // lineView
  lineViewContainer: {
    flexDirection: "row",
    marginHorizontal: globals.deviceWidth * 0.03,
    alignItems: "center",
    justifyContent: "center",
    marginTop: globals.deviceHeight * 0.02,
    marginBottom: globals.deviceHeight * 0.04,
  },
  lineContainer: {
    height: Platform.OS == "ios" ? 0.7 : 0.9,
    width: globals.deviceWidth * 0.4,
    // backgroundColor: Colors.black,
  },
  smallText: {
    fontFamily: FontFamily.RalewayMedium,
    fontSize: globals.font_12,
    color: Colors.black,
    textAlign: "center",
    alignSelf: "auto",
    marginHorizontal: 8,
    paddingBottom: 4,
  },
  iconStyle: {
    width: 40,
    height: 50,
    marginLeft: 8,
    marginRight: 20,
    marginVertical: 10,
  },

  /// BottomView

  bottomContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: globals.deviceHeight * 0.07,
    flexDirection: "row",
  },
  smallNewAppText: {
    fontFamily: FontFamily.RalewaRegular,
    fontSize: globals.font_12,
    color: Colors.black,
    textAlign: "center",
    marginHorizontal: 2,
  },
  smallSignupText: {
    fontFamily: FontFamily.RalewaySemiBold,
    fontSize: globals.font_11,
    color: Colors.primary,
    textAlign: "center",
  },

  /////////////////////////////////////////// SIGN IN SCREEN /////////////////////////////
  bottomCurve: {
    flex: 1,
    flexGrow: 1,
    // height: 100,
    width: "100%",
    marginTop: globals.deviceHeight * 0.1,
    borderColor: Colors.border_color,
    borderWidth: 0.1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: Colors.white,
    // alignItems: "center",
    // justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16,
    elevation: 24,
    // zIndex: 0,
    // position: 'absolute', //Here is the trick
    // bottom: 0, //Here is the trick
  },
  titleviewStyle: {
    marginTop: 28,
    marginHorizontal: 20,
    marginBottom: 10,
    // height: globals.deviceHeight * 0.06,
  },
  forgotPasswordContainer: {
    padding: 10,
    marginRight: 6,
    width: "45%",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  resetText: {
    fontFamily: FontFamily.RalewaRegular,
    fontSize: RFPercentage(1.5),
    alignSelf: "flex-end",
    color: Colors.placeholderColor,
  },
  bottomsignin: {
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 40,
    paddingBottom: 10,
  },
  signinbtnView: {
    paddingVertical: "5%",
    marginHorizontal: 20,
  },

  //////// SignUp screen
  termAndConditionView: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: -3.5,
    marginLeft: 2,
  },

  // create Social profile
  login_safeAreaStyle: {
    flex: 1,
    marginBottom: 20,
    marginTop: 10,
  },
  dateContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginHorizontal: 20,
    fontSize: 15,
    fontFamily: FontFamily.RalewaRegular,
    borderBottomColor: Colors.border_color,
    borderBottomWidth: 0.8,
    marginVertical: 4,
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
  },
  imageview: {
    marginVertical: globals.deviceHeight * 0.03,
    alignItems: "center",
    justifyContent: "center",
  },
  beforeimgView: {
    height: globals.deviceWidth * 0.3,
    width: globals.deviceWidth * 0.3,
    borderColor: Colors.primary,
    borderRadius: (globals.deviceWidth * 0.3) / 2,
    borderWidth: 0.7,
  },
  imageStyle: {
    height: globals.deviceWidth * 0.3,
    width: globals.deviceWidth * 0.3,
    borderWidth: 0.7,
    borderColor: Colors.primary,
    borderRadius: (globals.deviceWidth * 0.3) / 2,
  },
  settingOpacityContainer: {
    height: globals.deviceWidth * 0.085,
    width: globals.deviceWidth * 0.085,
    borderRadius: (globals.deviceWidth * 0.085) / 2,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    // position: 'absolute',
    alignSelf: "center",
    bottom: 0,
    marginTop: -globals.deviceHeight * 0.04,
    marginLeft: globals.deviceHeight * 0.1,
  },
  settingIconStyle: {
    alignSelf: "center",

    width: globals.deviceWidth * 0.04,
    height: globals.deviceHeight * 0.04,
  },

  //////// Social Profile style
  smallTitle: {
    fontFamily: FontFamily.RalewaRegular,
    fontSize: globals.font_14,
    color: Colors.black,
    textAlign: "center",
    justifyContent: "center",
  },
  separatorLine: {
    height: 0.8,
    backgroundColor: Colors.border_color,
    marginHorizontal: 20,
    marginTop: 10,
  },
  RectangleShapeView: {
    width: 70 * 2,
    height: 60,
    backgroundColor: Colors.white,

    borderWidth: 2,
    borderRadius: 8,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  regoText: {
    fontFamily: FontFamily.RalewayBold,
    fontSize: globals.font_26,
    color: Colors.black,
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  saText: {
    fontFamily: FontFamily.RalewayBold,
    fontSize: globals.font_8,
    color: Colors.black,
    textAlign: "center",
    fontWeight: "bold",
  },
  SnapText: {
    color: Colors.black,
    fontFamily: FontFamily.RalewaRegular,
    fontSize: globals.font_15,
    textAlign: "center",
    justifyContent: "center",
  },

  //// registration screen style
  registrationStyle: {
    fontFamily: FontFamily.RalewaySemiBold,
    textAlign: "left",
    color: Colors.black,
    fontSize: globals.font_20,
    justifyContent: "center",
  },
  registerContent: {
    marginHorizontal: 20,
  },
  registrationContentTextStyle: {
    fontFamily: FontFamily.RalewaRegular,
    color: Colors.black,
    fontSize: globals.font_12,
    justifyContent: "center",
  },
  registernumView: {
    marginTop: 10,
    marginBottom: 20,
  },
});
