import { createAppContainer, withNavigation } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SignUpScreen from '..//modules/authentication/SignUpScreen';
import SignInScreen from '..//modules/authentication/SignInScreen';
import LoginScreen from '..//modules/authentication/LoginScreen';
import CreateProfileScreen from '..//modules/authentication/CreateProfileScreen';
import ForgotPasswordScreen from '..//modules/authentication/ForgotPasswordScreen';
import ResetPasswordScreen from '..//modules/authentication/ResetPasswordScreen';
import CreateSocialMediaProfile from '..//modules/authentication/CreateSocialMediaProfile';
import RegistrationDetailsScreen from '..//modules/authentication/RegistrationDetailsScreen';
import SplashScreen from '..//modules/SplashScreen';
import TabNavigation from "./TabNavigation";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: TabNavigation,
    },
    Splash:{
      screen:SplashScreen,
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
    CreateProfile:{
      screen:CreateProfileScreen
    },
    ForgotPassword:{
      screen:ForgotPasswordScreen
    },
    ResetPassword:{
      screen:ResetPasswordScreen
    },
    CreateSocialMediaProfile:{
      screen:CreateSocialMediaProfile
    },
    RegistrationDetails:{
      screen:RegistrationDetailsScreen
    }
  },
  {
    initialRouteName: "CreateSocialMediaProfile",
    defaultNavigationOptions: {
      gestureEnabled: true,
      headerShown: false,
      // header: {
      //   headerStyle: {
      //     backgroundColor: "#fff",
      //   },
      //   headerBackTitleStyle: {
      //     color: "#3c5468",
      //   },
      //   headerTitleStyle: {
      //     fontWeight: "500",
      //     textAlign: "center",
      //     flexGrow: 1,
      //     alignSelf: "center",
      //   },
      // },
    },
  }
);

const MyNavigator = createAppContainer(AppNavigator);

export default MyNavigator;
