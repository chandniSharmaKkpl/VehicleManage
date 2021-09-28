import { createDrawerNavigator } from "react-navigation-drawer";
import React, { Component } from "react";
import * as globals from "../utils/Globals";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import sideDrawer from "../modules/dashboard/sidebar/sideDrawer";
import FirstScreen from "../modules/FirstScreen";
import TabNavigator from "./TabNavigation";
import AppNavigator from "./AppNavigator";
import TermsConditionScreen from "..//modules/authentication/TermsConditionScreen";

const Drawer = createDrawerNavigator(
  {
    Home: TabNavigator,
    
  },
  {
    contentComponent: sideDrawer,
    initialRouteName: "Home",
    swipeEnabled: true,
    drawerPosition: "right",
    headerMode: "none",
    drawerBackgroundColor: "transparent", 
    drawerWidth: globals.deviceWidth * 0.74,
    drawerType: "front",
    navigationOptions: {
      gesturesEnabled: false,
      headerShown: false,
    },
    drawerLockMode: "locked-open",
  }
);

const RootNavigator = createAppContainer(
  createSwitchNavigator(
    {
      FirstScreen: FirstScreen,
      Auth: AppNavigator,
      App: Drawer,
    },
    {
      initialRouteName: "FirstScreen",
    }
  )
);
export default RootNavigator;
