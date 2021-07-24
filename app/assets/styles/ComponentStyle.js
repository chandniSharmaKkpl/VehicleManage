import { StyleSheet, Platform } from "react-native";
import Colors from "../Colors";
import { RFPercentage } from "../../utils/ResponsiveFont";
import FontFamily from "./FontFamily";
import * as globals from "../../utils/Globals";

export const ComponentStyle = StyleSheet.create({
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
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: "5%",
    borderRadius: 10,
  },
  bigIconLabel: {
    fontFamily: FontFamily.RalewayBold,
    fontSize: RFPercentage(1.3),
    color: Colors.black,
    paddingTop: 10,
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
    fontSize: globals.font_16,
    color: Colors.white,
    textAlign: "center",
    justifyContent: "center",
  },
  //primaryBtnonlyContainer style Finished....

  // Login Input style started
  inputText: {
    height: 55,
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
    height: 55,
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
    height: 55,
    justifyContent: "center",
  },
 
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    marginHorizontal: 20,
  },
  tab_Image: { width: 20, height: 20, tintColor: Colors.primary },


  //// Custom Header style
  headerContainer: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
  },
  headerContain: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  titleText: {
    fontSize: RFPercentage(2.5),
    fontFamily: FontFamily.RalewayBold,
    color: Colors.white,
  },
});
