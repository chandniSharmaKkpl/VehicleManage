import React, { Component } from "react";
import { View, Keyboard } from "react-native";
import { connect } from "react-redux";
import { AuthStyle } from "../../../assets/styles/AuthStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import { Search } from "../../../components";
import NavigationService from "../../../utils/NavigationService";
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

  getSearchResult=()=>{

  }

  render() {
    return (
      <>
        <View style={AuthStyle.container}>
          <NavigationEvents onWillBlur={() => this.clearStates()} />
          <Header isShowBack={false} title={""} isShowRighttwo={true} />
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
            onPress={()=> this.getSearchResult()}
          />
        </View>
      </>
    );
  }
}

// const mapStateToProps = (state) => {};

// const mapDispatchToProps = (dispatch) => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
export default SearchScreen;
