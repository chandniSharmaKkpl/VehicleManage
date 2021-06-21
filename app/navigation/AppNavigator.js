import { createAppContainer, withNavigation } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import RegisterScreen from '..//modules/authentication/RegisterScreen'
const AppNavigator = createStackNavigator(
  {
    
    Register: {
      screen: RegisterScreen,
    },
  },
  {
    initialRouteName: "Register",
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
