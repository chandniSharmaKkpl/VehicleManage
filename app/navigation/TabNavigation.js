import React, { Component } from "react";
import { Image, View, Text, Platform, SafeAreaView } from "react-native";
import {
  TransitionPresets,
  createStackNavigator,
} from "react-navigation-stack";
// import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
import Colors from "../assets/Colors";
import { ComponentStyle } from "../assets/styles/ComponentStyle";
import FastImage from "react-native-fast-image";
import { IMAGE } from "../assets/Images";
import SearchScreen from "../modules/Dashboard/search/SearchScreen";

const SearchStack = createStackNavigator(
  {
    Search: {
      screen: SearchScreen,
    },
  },
  {
    headerMode: "none",
    initialRouteParams: "Search",

    defaultNavigationOptions: {
      headerVisible: false,
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);

const SocialStack = createStackNavigator(
  {
    Search: {
      screen: SearchScreen,
    },
  },
  {
    headerMode: "none",
    initialRouteParams: "Search",

    defaultNavigationOptions: {
      headerVisible: false,
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);

const ChatStack = createStackNavigator(
  {
    Search: {
      screen: SearchScreen,
    },
  },
  {
    headerMode: "none",
    initialRouteParams: "Search",

    defaultNavigationOptions: {
      headerVisible: false,
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);

const UserStack = createStackNavigator(
  {
    Search: {
      screen: SearchScreen,
    },
  },
  {
    headerMode: "none",
    initialRouteParams: "Search",

    defaultNavigationOptions: {
      headerVisible: false,
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);
const TabNavigator = createBottomTabNavigator(
  {
    Search: {
      screen: SearchStack,
      navigationOptions: {
        tabBarLabel: () => {},
      },
    },
    Social: {
      screen: SocialStack,
      navigationOptions: {
        tabBarLabel: () => {},
      },
    },
    Chat: {
      screen: ChatStack,
      navigationOptions: {
        tabBarLabel: () => {},
      },
    },
    User: {
      screen: UserStack,
      navigationOptions: {
        tabBarLabel: () => {},
      },
    },
  },

  {
    defaultNavigationOptions: ({ navigation }) => ({
      initialRouteName: "Search",
      headerVisible: false,
      ...TransitionPresets.FadeFromBottomAndroid,

      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        let labelName = "";

        if (routeName === "Search") {
          labelName = focused ? "Search" : "";
          iconName = IMAGE.search_circle_img;
        } else if (routeName === "Social") {
          labelName = focused ? "Social" : "";
          iconName = IMAGE.social_group_img;
        } else if (routeName === "Chat") {
          labelName = focused ? "Chat" : "";
          iconName = IMAGE.chatboxes_img;
        } else if (routeName === "User") {
          labelName = focused ? "User" : "";
          iconName = IMAGE.user_avatar_fill_img;
        }
        return (
          <SafeAreaView>
            <View style={[ComponentStyle.tabContainer]}>
              <FastImage
                style={[ComponentStyle.tabImage]}
                source={iconName}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={[ComponentStyle.tabLabel]}>{labelName}</Text>
            </View>
          </SafeAreaView>
        );
      },
      //In this code to, flickering screen when navigate after any home screen

      // tabBarOnPress: ({ navigation }) => {
      //   const { routeName } = navigation.state;
      //   navigation.popToTop();
      //   navigation.navigate(routeName);
      // },

      animationEnabled: true,
      swipeEnabled: true,
      unmountOnBlur: true,
      backBehavior: "none", // <-- Here

      tabBarOptions: {
        style: {
          backgroundColor: Colors.primary,
          height: 50,
        },
      },
    }),
  }
);
export default TabNavigator;
