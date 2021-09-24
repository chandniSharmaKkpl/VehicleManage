import { createDrawerNavigator } from "react-navigation-drawer";
import React, { Component } from "react";
import { Image, View, Text, Platform, SafeAreaView } from "react-native";
import * as globals from "../utils/Globals";
import {
  createAppContainer,
  withNavigation,
  createSwitchNavigator,
} from "react-navigation";
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
import {
  createStackNavigator,
  TransitionPresets,
} from "react-navigation-stack";
import SignUpScreen from "../modules/authentication/SignUpScreen";
import SignInScreen from "../modules/authentication/SignInScreen";
import LoginScreen from "../modules/authentication/LoginScreen";
import CreateProfileScreen from "../modules/authentication/CreateProfileScreen";
import ForgotPasswordScreen from "../modules/authentication/ForgotPasswordScreen";
import ResetPasswordScreen from "../modules/authentication/ResetPasswordScreen";
import CreateSocialMediaProfile from "../modules/authentication/CreateSocialMediaProfile";
import RegistrationDetailsScreen from "../modules/authentication/RegistrationDetailsScreen";
import TermsConditionScreen from "../modules/authentication/TermsConditionScreen";
import SplashScreen from "../modules/SplashScreen";
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
import FirstScreen from "../modules/FirstScreen";

const AuthStack = createStackNavigator(
  {
    
    Splash: {
      screen: SplashScreen,
    },
    SignUp: {
      screen: SignUpScreen,
    },
    SignIn: {
      screen: SignInScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    CreateProfile: {
      screen: CreateProfileScreen,
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
    },
    ResetPassword: {
      screen: ResetPasswordScreen,
    },
    TermsCondition: {
      screen: TermsConditionScreen,
    },
    CreateSocialMediaProfile: {
      screen: CreateSocialMediaProfile,
    },
    RegistrationDetails: {
      screen: RegistrationDetailsScreen,
    },
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      gestureEnabled: true,
      headerShown: false,
    },
  }
);

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

const AppStack = createBottomTabNavigator(
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

const Drawer = createDrawerNavigator({
  Home: AppStack,
  FirstScreen: FirstScreen,
},
{
  contentComponent: (props) => {
    return (
      <ScrollView>
        <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
          <Text
            onPress={() => {
              props.navigation.closeDrawer();
            }}
          >
            BlueScreen
          </Text>
          <Text
            onPress={() => {
              props.navigation.closeDrawer();
            }}
          >
            DefaultScreen
          </Text>
        </SafeAreaView>
      </ScrollView>
    );
  },
  initialRouteName: "FirstScreen",
  drawerWidth: globals.deviceWidth * 0.74,
  drawerType: "front",
  overlayColor: "rgba(0,0,0,0.2)",
  navigationOptions: {
    gesturesEnabled: false,
    headerShown: false,
  },
  drawerLockMode: "locked-open",
});

const RootNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: Drawer,
    },
    {
      initialRouteName: "App",
    }
  )
);
export default RootNavigator;
