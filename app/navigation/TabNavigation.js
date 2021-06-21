// import React, { Component } from "react";
// import { Image, View, Text, Platform, SafeAreaView } from "react-native";
// import {
//   TransitionPresets,
//   createStackNavigator,
// } from "react-navigation-stack";
// // import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
// import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
// import HomeScreen from "../modules/home/HomeScreen";
// import SettingScreen from "../modules/settings/SettingScreen";
// import InvoiceScreen from "../modules/invoice/InvoiceScreen";
// import CalendarScreen from "../modules/calendar/CalendarScreen";
// import ReportScreen from "../modules/reports/ReportScreen";
// import AddHorseScreen from "../modules/horse/AddHorseScreen";
// import AddClientScreen from "../modules/client/AddClientScreen";
// import BookAppointmentScreen from "../modules/todolist/BookAppointmentScreen";
// import ClientListScreen from "../modules/client/ClientListScreen";
// import LogBookListScreen from "../modules/logbook/LogBookListScreen";
// import ExpensesListScreen from "../modules/expenses/ExpensesListScreen";
// import ClientMultiselectScreen from "../modules/client/ClientMultiselectScreen";
// import ClientDetailScreen from "../modules/client/ClientDetailScreen";
// import AfterSessionDetailScreen from "../modules/todolist/AfterSessionDetailScreen";
// import TodoListScreen from "../modules/todolist/TodoListScreen";
// import Colors from "../assets/styles/Colors";
// import { ComponentStyle } from "../assets/styles/ComponentStyle";
// import {
//   renderIf,
//   deviceWidth,
//   deviceHeight,
//   isTablat,
// } from "../utils/Globles";
// import FastImage from "react-native-fast-image";
// import { IMAGE } from "../assets/styles/Images";
// const HomeStack = createStackNavigator(
//   {
//     Home: {
//       screen: HomeScreen,
//     },
//     BookAppointment: {
//       screen: BookAppointmentScreen,
//     },
//     ClientList: {
//       screen: ClientListScreen,
//     },
//     LogBookList: {
//       screen: LogBookListScreen,
//     },
//     ExpensesList: {
//       screen: ExpensesListScreen,
//     },
//     AddClient: {
//       screen: AddClientScreen,
//     },
//     AddHorse: {
//       screen: AddHorseScreen,
//     },
//     ClientMultiselect: {
//       screen: ClientMultiselectScreen,
//     },
//     ClientDetail: {
//       screen: ClientDetailScreen,
//     },
//     AfterSessionDetail: {
//       screen: AfterSessionDetailScreen,
//     },
//     TodoList: {
//       screen: TodoListScreen,
//     },
//   },
//   {
//     headerMode: "none",
//     // initialRouteParams: "Home",

//     defaultNavigationOptions: {
//       headerVisible: false,
//       ...TransitionPresets.SlideFromRightIOS,
//     },
//   }
// );
// const SettingStack = createStackNavigator(
//   {
//     Setting: {
//       screen: SettingScreen,
//     },
//   },
//   {
//     headerMode: "none",
//     initialRouteParams: "Setting",

//     defaultNavigationOptions: {
//       headerVisible: false,
//       ...TransitionPresets.SlideFromRightIOS,
//     },
//   }
// );
// const InvoiceStack = createStackNavigator(
//   {
//     Invoice: {
//       screen: InvoiceScreen,
//     },
//   },
//   {
//     headerMode: "none",
//     initialRouteParams: "Invoice",

//     defaultNavigationOptions: {
//       headerVisible: false,
//       ...TransitionPresets.SlideFromRightIOS,
//     },
//   }
// );

// const CalendarStack = createStackNavigator(
//   {
//     Calendar: {
//       screen: CalendarScreen,
//     },
//   },
//   {
//     headerMode: "none",
//     initialRouteParams: "Calendar",

//     defaultNavigationOptions: {
//       headerVisible: false,
//       ...TransitionPresets.SlideFromRightIOS,
//     },
//   }
// );

// const ReportStack = createStackNavigator(
//   {
//     Report: {
//       screen: ReportScreen,
//     },
//   },
//   {
//     headerMode: "none",
//     initialRouteParams: "Report",

//     defaultNavigationOptions: {
//       headerVisible: false,
//       ...TransitionPresets.SlideFromRightIOS,
//     },
//   }
// );
// const TabNavigator = createBottomTabNavigator(
//   {
//     Home: {
//       screen: HomeStack,
//       navigationOptions: {
//         tabBarLabel: () => {},
//       },
//     },
//     Setting: {
//       screen: SettingStack,
//       navigationOptions: {
//         tabBarLabel: () => {},
//       },
//     },
//     Invoice: {
//       screen: InvoiceStack,
//       navigationOptions: {
//         tabBarLabel: () => {},
//       },
//     },
//     Calendar: {
//       screen: CalendarStack,
//       navigationOptions: {
//         tabBarLabel: () => {},
//       },
//     },
//     Report: {
//       screen: ReportStack,
//       navigationOptions: {
//         tabBarLabel: () => {},
//       },
//     },
//   },

//   {
//     defaultNavigationOptions: ({ navigation }) => ({
//       initialRouteName: "Home",
//       headerVisible: false,
//       ...TransitionPresets.FadeFromBottomAndroid,

//       tabBarIcon: ({ focused }) => {
//         const { routeName } = navigation.state;
//         let iconName;
//         let labelName = "";

//         if (routeName === "Home") {
//           labelName = focused ? "Dashboard" : "";
//           iconName = focused ? IMAGE.dashboard : IMAGE.dashboardOutline;
//         } else if (routeName === "Setting") {
//           labelName = focused ? "Setting" : "";
//           iconName = focused ? IMAGE.settings : IMAGE.settingsOutline;
//         } else if (routeName === "Invoice") {
//           labelName = focused ? "Invoice" : "";
//           iconName = focused ? IMAGE.dollar : IMAGE.dollarOutline;
//         } else if (routeName === "Calendar") {
//           labelName = focused ? "Calendar" : "";
//           iconName = focused ? IMAGE.calendar : IMAGE.calendarOutline;
//         } else if (routeName === "Report") {
//           labelName = focused ? "Report" : "";
//           iconName = focused ? IMAGE.file : IMAGE.fileOutline;
//         }
//         return (
//           <SafeAreaView>
//             <View style={[ComponentStyle.tabContainer]}>
//               <FastImage
//                 style={[ComponentStyle.tabImage]}
//                 source={iconName}
//                 resizeMode={FastImage.resizeMode.contain}
//               />
//               <Text style={[ComponentStyle.tabLabel]}>{labelName}</Text>
//             </View>
//           </SafeAreaView>
//         );
//       },
//       //In this code to, flickering screen when navigate after any home screen

//       // tabBarOnPress: ({ navigation }) => {
//       //   const { routeName } = navigation.state;
//       //   navigation.popToTop();
//       //   navigation.navigate(routeName);
//       // },

//       animationEnabled: true,
//       swipeEnabled: true,
//       unmountOnBlur: true,
//       backBehavior: "none", // <-- Here

//       tabBarOptions: {
//         style: {
//           backgroundColor: Colors.tabBar,
//           height: isTablat ? 100 : 50,
//         },
//       },
//     }),
//   }
// );
// export default TabNavigator;
