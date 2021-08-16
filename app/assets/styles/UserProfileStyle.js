import { StyleSheet, Platform } from "react-native";
import Colors from "../Colors";
import { RFPercentage } from "../../utils/ResponsiveFont";
import FontFamily from "./FontFamily";
import * as globals from "../../utils/Globals";

export const UserProfileStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lite_background,
  },
  imageview: {
    marginTop: globals.deviceHeight * 0.02,
    marginBottom: globals.deviceHeight * 0.01,
    flexDirection: "row",
    marginHorizontal: globals.deviceWidth * 0.05,
  },
  beforeimgView: {
    height: globals.deviceWidth * 0.26,
    width: globals.deviceWidth * 0.26,
    borderColor: Colors.primary,
    borderRadius: (globals.deviceWidth * 0.26) / 2,
    borderWidth: 0.7,
  },
  imageStyle: {
    height: globals.deviceWidth * 0.26,
    width: globals.deviceWidth * 0.26,
    borderWidth: 0.7,
    borderColor: Colors.primary,
    borderRadius: (globals.deviceWidth * 0.26) / 2,
  },
  settingOpacityContainer: {
    height: globals.deviceWidth * 0.075,
    width: globals.deviceWidth * 0.075,
    borderRadius: (globals.deviceWidth * 0.075) / 2,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 69,
    top: 70,
  },
  settingIconStyle: {
    alignSelf: "center",

    width: globals.deviceWidth * 0.04,
    height: globals.deviceHeight * 0.04,
  },
  registrationView: {
    width: "55%",
    marginLeft: globals.deviceWidth * 0.07,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  RectangleShapeView: {
    width: 70 * 2,
    height: 50,
    backgroundColor: Colors.white,
    borderColor: Colors.black,
    borderWidth: 2,
    borderRadius: 8,
    alignSelf: "flex-start",
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
  changeRegText: {
    fontFamily: FontFamily.RalewaRegular,
    fontSize: globals.font_14,
    color: Colors.black,
    marginBottom: 10,
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
    marginTop:5
  },
  navigateimgStyle: {
    height: 19,
    width: 19,
  },
});
