import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { connect } from "react-redux";
import { AuthStyle } from "../../../assets/styles/AuthStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import { Search } from "../../../components";
import NavigationService from "../../../utils/NavigationService";
import * as globals from "../../../utils/Globals";
import {
  isEmpty,
  isPassword,
  isPasswordLength,
} from "../../../utils/Validators";
import { Messages } from "../../../utils/Messages";
import { IMAGE } from "../../../assets/Images";
import { NavigationEvents } from "react-navigation";
import Header from "../../../components/Header";

const TAG = "SearchScreen ::=";

export class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: "",
    };
  }

  componentDidMount() {}

  // clear States before leave this screen
  clearStates = () => {
    this.setState({
      txtSearch: "",
    });
  };

  render() {
    return (
      <>
        <View style={AuthStyle.container}>
          <NavigationEvents onWillBlur={() => this.clearStates()} />
          <Header isShowBack={false} title={""} isShowSidebar={true} />
          <Search
            blurOnSubmit={false}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            autoCapitalize={"none"}
            onChangeText={(text) =>
              this.setState({
                txtSearch: text,
              })
            }
            placeholderText={StaticTitle.searchbyVehicalNum}
          />
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
// )(SearchScreen);
export default SearchScreen;
