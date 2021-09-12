import React, { Component } from "react";
import {
  View,
  Keyboard,
  FlatList,
  TouchableWithoutFeedback,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { FriendDetailStyle } from "../../../assets/styles/FriendDetailStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import { Search, Header } from "../../../components";
import NavigationService from "../../../utils/NavigationService";
import { Messages } from "../../../utils/Messages";
import { IMAGE } from "../../../assets/Images";
import { NavigationEvents } from "react-navigation";
import FastImage from "react-native-fast-image";
import Colors from "../../../assets/Colors";
import LinearGradient from "react-native-linear-gradient";
import * as globals from "../../../utils/Globals";

const TAG = "SubscriptionScreen ::=";

 class SubscriptionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentDidMount() {}


  render() {

    return (
      <>
        <View style={FriendDetailStyle.container}>
         
            
        </View>
      </>
    );
  }
}

// const mapStateToProps = (state) => {

// };

// const mapDispatchToProps = (dispatch) => ({
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SubscriptionScreen);
export default SubscriptionScreen;
