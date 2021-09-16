import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import * as globals from "../../../utils/Globals";
import { IMAGE } from "../../../assets/Images";


class sideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.drawerSaperator} />

          <View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                marginRight: 15,
                justifyContent: "center",
              }}
              onPress={() => {
                this.props.navigation.closeDrawer();
              }}
            >
              <Image
                style={{
                  height: 25,
                  width: 25,
                }}
                source={IMAGE.subscription_img}
              ></Image>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "white",
                width: screenWidth * 0.74,
                height: screenHeight * 0.0015,
                marginTop: screenHeight * 0.01,
              }}
            ></View>
            <TouchableOpacity
              style={[styles.dashBoardButtonViewStyle]}
              onPress={() => {
                this.props.navigation.closeDrawer();
               
              }}
            >
              <Image
                style={{
                  width: 23,
                  height: 23,
                  tintColor: "#fff",
                }}
                source={IMAGE.subscription_img}
              />
              <Text numberOfLines={1} style={[styles.dashBoardTextStyle]}>
                {"Manage Subscription"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.dashBoardButtonViewStyle]}
            >
              <Image
                style={{
                  width: 23,
                  height: 23,
                  tintColor: "#fff",
                }}
                source={IMAGE.terms_conditions_img}
              />

              <Text numberOfLines={1} style={[styles.dashBoardTextStyle]}>
                {"Terms & Conditions"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              
              style={[styles.dashBoardButtonViewStyle]}
            >
              <Image
                style={{
                  width: 23,
                  height: 23,
                  tintColor: "#fff",
                }}
                source={IMAGE.sign_out_img}
              />
              <Text style={[styles.dashBoardTextStyle, { color: "white" }]}>
                {"Logout"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090F30",

    opacity: 0.95,
  },
  drawerSaperator: {
    width: "100%",
    height: 1,
  },
  dashBoardTextStyle: {
    fontSize:  18,
    marginLeft: 20,
    color: "white",
  },
  dashBoardButtonViewStyle: {
    height: globals.deviceHeight * 0.055,

    paddingLeft: 10,
    alignItems: "center",
    borderRadius: (globals.deviceHeight * 0.055 + globals.deviceWidth * 0.61) / 2,
    marginLeft: globals.deviceWidth * 0.02,
    marginBottom: globals.deviceHeight * 0.02,
    marginTop: globals.deviceHeight * 0.01,
    flexDirection: "row",
  },
});
export default sideDrawer;
// const mapStateToProps = (state) => {
//   return {
//     nav: state.nav,
//     isLoading: state.login.isLoading,
//     loaderMessage: state.login.loaderMessage,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   logout: (formData) => dispatch(actions.logout(formData)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(sideDrawer);
