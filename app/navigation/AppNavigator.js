import {
  createAppContainer,
  withNavigation,
  createSwitchNavigator,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SignUpScreen from "..//modules/authentication/SignUpScreen";
import SignInScreen from "..//modules/authentication/SignInScreen";
import LoginScreen from "..//modules/authentication/LoginScreen";
import CreateProfileScreen from "..//modules/authentication/CreateProfileScreen";
import ForgotPasswordScreen from "..//modules/authentication/ForgotPasswordScreen";
import ResetPasswordScreen from "..//modules/authentication/ResetPasswordScreen";
import CreateSocialMediaProfile from "..//modules/authentication/CreateSocialMediaProfile";
import RegistrationDetailsScreen from "..//modules/authentication/RegistrationDetailsScreen";
import TermsConditionScreen from "..//modules/authentication/TermsConditionScreen";
import SplashScreen from "..//modules/SplashScreen";
import TabNavigation from "./TabNavigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import * as globals from "../utils/Globals";
import FirstScreen from "../modules/FirstScreen";
import { ScrollView, SafeAreaView, Text } from "react-native";

const AppNavigator = createStackNavigator(
  {
    
    Home: {
      screen: TabNavigation,
    },
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


export default AppNavigator;
