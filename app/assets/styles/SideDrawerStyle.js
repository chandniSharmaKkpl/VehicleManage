import { StyleSheet, Appearance, Platform } from "react-native";
import Colors from "../Colors";
import FontFamily from "./FontFamily";
import * as globals from "../../utils/Globals";

const colorScheme = Appearance.getColorScheme();

export const SideDrawerStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  closedrawerbutton: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  beforeDrawerOption: {
    backgroundColor: Colors.primary,
    width: globals.deviceWidth * 0.74,
    height: globals.deviceHeight * 0.0015,
  },
  headerSeprate: {
    height: globals.deviceHeight * 0.1,
    backgroundColor:
      colorScheme === "light" ? Colors.primary : Colors.darkBottomTabBar,
    flexDirection: "row",
    alignItems: "center",
  },
  circleview: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 10,
    borderColor: Colors.white,
  },
  userimgstyle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  usernametext: {
    fontFamily: FontFamily.RalewayBold,
    fontSize: globals.font_18,
    color: Colors.white,
    width: globals.deviceWidth * 0.4,
  },
  drawerSaperator: {
    width: "100%",
    height: globals.deviceHeight * 0.0,
    backgroundColor: Colors.primary,
  },
  dashBoardTextStyle: {
    fontSize: globals.font_16,
    marginLeft: 20,
    color: Colors.black,
    fontFamily: FontFamily.RalewayBold,
  },
  dashboardBottomView: {
    height: globals.deviceHeight * 0.07,
    paddingLeft: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.primary,
  },
  dashBoardButtonViewStyle: {
    height: globals.deviceHeight * 0.055,
    paddingLeft: 10,
    alignItems: "center",
    borderRadius:
      (globals.deviceHeight * 0.055 + globals.deviceWidth * 0.61) / 2,
    marginLeft: globals.deviceWidth * 0.02,
    marginBottom: globals.deviceHeight * 0.02,
    marginTop: globals.deviceHeight * 0.01,
    flexDirection: "row",
  },
});
