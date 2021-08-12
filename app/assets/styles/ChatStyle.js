import { StyleSheet, Platform } from "react-native";
import Colors from "../Colors";
import { RFPercentage } from "../../utils/ResponsiveFont";
import FontFamily from "./FontFamily";
import * as globals from "../../utils/Globals";

export const ChatStyle = StyleSheet.create({
  sendContainer: {
    height: 40,
    width: "18%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.lite_background,
  },
  send: {
    alignItems: "center",
    justifyContent: "center",
  },
  sendIconContainer: {
    height: 35,
    width: 35,
    backgroundColor:Colors.btnSecondaryPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  hapinessicon:{
    height: 20,
    width: 20,
  },
  sendIcon: {
    fontSize: 25,
    color: Colors.white
  },
  inputToolBar: {
    marginHorizontal: 15,
    marginBottom:(Platform.OS =='ios')? 10:20,
    borderRadius: 10,
    borderTopWidth: 4,
    borderTopColor: "transparent",
    height: 50,
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16,
    elevation: 24,
  },
});
