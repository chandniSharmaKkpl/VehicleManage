import React, { Component } from "react";
import {
  View,
  Keyboard,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { AuthStyle } from "../../../assets/styles/AuthStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import { Search } from "../../../components";
import NavigationService from "../../../utils/NavigationService";
import { IMAGE } from "../../../assets/Images";
import { NavigationEvents } from "react-navigation";
import { Header, Loader } from "../../../components";
import * as actions from "../redux/Actions";
import * as globals from "../../../utils/Globals";
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FriendListStyle } from "../../../assets/styles/FriendListStyle";
import FastImage from "react-native-fast-image";

const TAG = "SearchScreen ::=";

export class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: "",
      searchListdata: [],
    };
  }

  async componentDidMount() {
    let token = await AsyncStorage.getItem("access_token");
    globals.access_token = token;
  }

  // clear States before leave this screen
  clearStates = () => {
    this.setState({
      txtSearch: "",
    });
  };

  // search vechicle by name
  getSearchResult = () => {
    const { txtSearch } = this.state;
    const { searchvehicle } = this.props;
    let params = new URLSearchParams();

    // Collect the necessary params
    params.append("search_by_vehicle", txtSearch);
    if (globals.isInternetConnected == true) {
      searchvehicle(params)
        .then(async (res) => {
          // console.log(
          //   TAG,
          //   "response of search vehical",
          //   JSON.stringify(res.value.data.data)
          // );
          if (res.value && res.value.data.success == true) {
            //OK 200 The request was fulfilled
            if (res.value && res.value.status === 200) {
              await showMessage({
                message: res.value.data.message,
                type: "success",
                icon: "info",
                duration: 4000,
              });
              this.setSearchdataList(res.value.data.data);
            }
          } else {
            if (res.value && res.value.data.error) {
              await showMessage({
                message: res.value.message,
                type: "danger",
                icon: "info",
                duration: 4000,
              });
            }
          }
        })
        .catch((err) => {
          console.log(TAG, "i am in catch error search by vehical name", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  /// set Search data List
  setSearchdataList = (data) => {
    Keyboard.dismiss();
    this.setState({ searchListdata: data.search_data });
  };

  // render SearchList dataItem
  renderSearchList = ({ item, index }) => {
    return (
      <View style={FriendListStyle.itemcell}>
        {item.user_photo ? (
          <View style={FriendListStyle.imageStyle}>
            <FastImage
              style={[FriendListStyle.imageStyle]}
              source={{
                uri: item.user_photo,
              }}
            />
          </View>
        ) : (
          <View style={FriendListStyle.imageStyle}>
            <FastImage
              resizeMethod="resize"
              source={IMAGE.user}
              style={FriendListStyle.imageStyle}
            />
          </View>
        )}
        <View style={FriendListStyle.userdetail}>
          <Text style={FriendListStyle.titleBig}>
            {item.name + item.surname}
          </Text>
          <Text style={FriendListStyle.titleSmall}>
            {item.car_make_model ? item.car_make_model : "-"}
          </Text>
          <Text style={FriendListStyle.titleSmall}>
            {item.registration_number ? item.registration_number : "-"}
          </Text>
        </View>
        <TouchableOpacity style={FriendListStyle.squareView}>
          <FastImage
            style={[FriendListStyle.navigateimgStyle]}
            source={IMAGE.navigate_img}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // seprate component
  separatorComponent = () => {
    return <View style={FriendListStyle.separatorLine} />;
  };

  render() {
    const { isLoading, loaderMessage, theme } = this.props;
    const { txtSearch, searchListdata } = this.state;

    return (
      <>
        <View style={AuthStyle.container}>
          {isLoading && (
            <Loader isOverlay={true} loaderMessage={loaderMessage} />
          )}
          <NavigationEvents onWillBlur={() => this.clearStates()} />
          <Header isShowBack={false} title={""} isShowRighttwo={true} />
          <Search
            value={txtSearch}
            blurOnSubmit={false}
            returnKeyType="done"
            onSubmitEditing={() => this.getSearchResult()}
            autoCapitalize={"none"}
            onChangeText={(text) =>
              this.setState({
                txtSearch: text,
              })
            }
            placeholderText={StaticTitle.searchbyVehicalNum}
            onPress={() => this.getSearchResult()}
          />
          {searchListdata ? (
            <FlatList
              data={searchListdata}
              style={FriendListStyle.flatliststyle}
              renderItem={(item, index) => this.renderSearchList(item, index)}
              keyExtractor={(item, index) => "D" + index.toString()}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={this.separatorComponent}
            />
          ) : null}
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.home.home.isLoading,
    loaderMessage: state.home.home.loaderMessage,
  };
};
const mapDispatchToProps = (dispatch) => ({
  searchvehicle: (params) => dispatch(actions.searchvehicle(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
