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
import TermsConditionScreen from '..//modules/authentication/TermsConditionScreen';
import SplashScreen from "..//modules/SplashScreen";
import TabNavigation from "./TabNavigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import * as globals from "../utils/Globals";
import FirstScreen from "../modules/FirstScreen";
import { ScrollView, SafeAreaView, Text } from "react-native";

const DrawerNavigator = createDrawerNavigator(
  {
    TabNavigator: TabNavigation,
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
    initialRouteName: "TabNavigator",
    drawerWidth: globals.deviceWidth * 0.74,
    drawerType: "front",
    overlayColor: "rgba(0,0,0,0.2)",
    navigationOptions: {
      gesturesEnabled: false,
      headerShown: false,
    },
    drawerLockMode: "locked-open",
  }
);

const AppNavigator = createStackNavigator(
  {
    // FirstScreen: {
    //   screen: FirstScreen,
    //   navigationOptions: {
    //     header: null,
    //   },
    // },
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
    TermsCondition:{
      screen:TermsConditionScreen
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

// const RootNavigator = createStackNavigator(
//   {
//     Home: {
//       screen: DrawerNavigator,
//       navigationOptions: {
//         header: null,
//       },
//     },
//   },
//   { initialRouteName: "Home" }
// );

// export default createAppContainer(
//   createSwitchNavigator(
//     {
//       AuthLoading: FirstScreen,
//       // App: DrawerNavigator,
//       Auth: AuthNavigator,
//     },
//     {
//       initialRouteName: "AuthLoading",
//     }
//   )
// );
const MyNavigator = createAppContainer(AppNavigator);

export default withNavigation(MyNavigator);
