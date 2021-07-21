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
  primaryBtnonlyContainer:{
    height: 55,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    justifyContent: "center",
  },
  primaryBtnonlyText:{
    fontFamily: FontFamily.RalewaySemiBold,
    fontSize: globals.font_16,
    color: Colors.white,
    textAlign: "center",
    justifyContent: "center",
  }
  //primaryBtnonlyContainer style Finished....
});
