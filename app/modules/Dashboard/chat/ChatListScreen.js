import React, { Component } from "react";
import {
  View,
 
  Keyboard,
 
} from "react-native";
import { connect } from "react-redux";
import { AuthStyle } from "../../../assets/styles/AuthStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import { Search } from "../../../components";
import NavigationService from "../../../utils/NavigationService";
import { IMAGE } from "../../../assets/Images";
import { NavigationEvents } from "react-navigation";
import Header from "../../../components/Header";

const TAG = "ChatListScreen ::=";

export class ChatListScreen extends Component {
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
          <Header  title={StaticTitle.msges} isShowSidebar={true} />
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
            placeholderText={StaticTitle.searchbyNameNnum}
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
// )(ChatListScreen);
export default ChatListScreen;
