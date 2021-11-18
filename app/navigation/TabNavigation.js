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
import SearchScreen from "../modules/dashboard/search/SearchScreen";
import FriendlistScreen from "../modules/dashboard/social/FriendlistScreen";
import ChatListScreen from "../modules/dashboard/chat/ChatListScreen";
import UserProfileScreen from "../modules/dashboard/user/UserProfileScreen";
import PrivacySettingsScreen from "../modules/dashboard/user/PrivacySettingsScreen";
import FriendDetailScreen from "../modules/dashboard/social/FriendDetailScreen";
import NotificationScreen from "../modules/dashboard/search/NotificationScreen";
import RecentViewersScreen from "../modules/dashboard/search/RecentViewersScreen";
import ChatMessagesScreen from "../modules/dashboard/chat/ChatMessagesScreen";
import RegistrationDetailsScreen from "..//modules/authentication/RegistrationDetailsScreen";
import ShareSocialsScreen from "..//modules/dashboard/chat/ShareSocialsScreen";
const SearchStack = createStackNavigator(
  {
    Search: {
      screen: SearchScreen,
    },
    Notification: {
      screen: NotificationScreen,
    },
    RecentViewers: {
      screen: RecentViewersScreen,
    },
    FriendDetail: {
      screen: FriendDetailScreen,
    },
    ChatList: {
      screen: ChatListScreen,
    },
    ChatMessages: {
      screen: ChatMessagesScreen,
    },
    ShareSocials:{
      screen:ShareSocialsScreen
    }
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
    Friendlist: {
      screen: FriendlistScreen,
    },
    FriendDetail: {
      screen: FriendDetailScreen,
    },
    ChatList: {
      screen: ChatListScreen,
    },
    ChatMessages: {
      screen: ChatMessagesScreen,
    },
    ShareSocials:{
      screen:ShareSocialsScreen
    }
  },
  {
    headerMode: "none",
    initialRouteParams: "Friendlist",

    defaultNavigationOptions: {
      headerVisible: false,
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);

const ChatStack = createStackNavigator(
  {
    ChatList: {
      screen: ChatListScreen,
    },
    ChatMessages: {
      screen: ChatMessagesScreen,
    },
    ShareSocials:{
      screen:ShareSocialsScreen
    }
  },
  {
    headerMode: "none",
    initialRouteParams: "ChatList",

    defaultNavigationOptions: {
      headerVisible: false,
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);

const UserStack = createStackNavigator(
  {
    UserProfile: {
      screen: UserProfileScreen,
    },
    PrivacySettings: {
      screen: PrivacySettingsScreen,
    },
    RegistrationDetails: {
      screen: RegistrationDetailsScreen,
    },
  },
  {
    headerMode: "none",
    initialRouteParams: "UserProfile",

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
          labelName = focused ? "Friends" : "";
          iconName = IMAGE.social_group_img;
        } else if (routeName === "Chat") {
          labelName = focused ? "Messages" : "";
          iconName = IMAGE.chatboxes_img;
        } else if (routeName === "User") {
          labelName = focused ? "Profile" : "";
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
      // In this code to, flickering screen when navigate after any home screen

      tabBarOnPress: ({ navigation }) => {
        const { routeName } = navigation.state;
        navigation.popToTop();
        navigation.navigate(routeName);
      },

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
ChatStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
export default TabNavigator;
