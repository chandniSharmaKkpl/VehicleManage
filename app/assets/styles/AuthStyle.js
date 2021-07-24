import { StyleSheet, Platform } from "react-native";
import Colors from "../Colors";
import { RFPercentage } from "../../utils/ResponsiveFont";
import FontFamily from "./FontFamily";
import * as globals from "../../utils/Globals";

export const AuthStyle = StyleSheet.create({
  /// Common STyle of auth screen's
  onlyFlex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.lite_background,
  },
  logincontainer: {
    flex: 1,
    backgroundColor: Colors.lite_background,
    padding: 10,
  },
  imglogoContainer: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop:
      Platform.OS == "ios"
        ? globals.deviceHeight * 0.07
        : globals.deviceHeight * 0.02,
  },
  imglogo: {
    width: globals.deviceHeight * 0.25,
    height: globals.deviceHeight * 0.25,
    resizeMode: "contain",
  },
  imgcarContainer: {
    flex: 0.2,
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

  loginContainer: {
    flex: 1,
  },

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
    height: 0.7,
    width: globals.deviceWidth * 0.4,
    backgroundColor: Colors.black,
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
    marginBottom: globals.deviceHeight * 0.03,
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
    fontSize: globals.font_12,
    color: Colors.primary,
    textAlign: "center",
    
  },

  /////////////////////////////////////////// SIGN IN SCREEN /////////////////////////////
  bottomCurve: {
    flex: 1,
    height: 100,
    marginTop: globals.deviceHeight * 0.1,
    borderColor: Colors.border_color,
    borderWidth: 0.3,
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
  },
  titleviewStyle: {
    marginTop: 28,
    marginHorizontal: 20,
    // marginBottom: 20,
    height: globals.deviceHeight * 0.06,
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
    color: Colors.lite_black,
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
  termAndConditionView:{
    // alignItems: "center", 
    // alignSelf:'center',
    // marginTop: 3.8, 
    marginLeft:2
  }
});
