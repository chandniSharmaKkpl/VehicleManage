import { StyleSheet, Platform } from "react-native";
import Colors from "../Colors";
import { RFPercentage } from "../../utils/ResponsiveFont";

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
    width:  120,
    height:  110,
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
});
