import { createAppContainer, withNavigation } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SignUpScreen from '..//modules/authentication/SignUpScreen';
import SignInScreen from '..//modules/authentication/SignInScreen';
import LoginScreen from '..//modules/authentication/LoginScreen';
import CreateProfile from '..//modules/authentication/CreateProfile';
import ForgotPasswordScreen from '..//modules/authentication/ForgotPasswordScreen';

const AppNavigator = createStackNavigator(
  {
    
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
      screen:CreateProfile
    },
    ForgotPassword:{
      screen:ForgotPasswordScreen
    }
  },
  {
    initialRouteName: "Login",
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
