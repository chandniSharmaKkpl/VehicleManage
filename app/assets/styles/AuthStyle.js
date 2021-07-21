import { StyleSheet, Platform } from "react-native";
import Colors from "../Colors";
import { RFPercentage } from "../../utils/ResponsiveFont";
import FontFamily from "./FontFamily";
import * as globals from "../../utils/Globals";

export const AuthStyle = StyleSheet.create({
  /// Common STyle of auth screen's
  container: {
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
});
