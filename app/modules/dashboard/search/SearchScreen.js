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
import { isEmpty } from "../../../utils/Validators";
const TAG = "SearchScreen ::=";

export class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: "Gj",
      searchListdata: [],
      theme: {},
    };
  }

  async componentDidMount() {
    let token = await AsyncStorage.getItem("access_token");
    globals.access_token = token;
    this.setState({ theme: this.props.theme });
  }

  // clear States before leave this screen
  clearStates = () => {
    this.setState({
      txtSearch: "",
    });
  };

  // search vechicle by name
  getSearchResult = async () => {
    const { txtSearch } = this.state;
    if (isEmpty(txtSearch)) {
      await showMessage({
        message: StaticTitle.searchrequired,
        type: "danger",
        icon: "info",
        duration: 4000,
      });
      return false;
    }
    const { searchvehicle } = this.props;
    let params = new URLSearchParams();

    // Collect the necessary params
    params.append("search_by_vehicle", txtSearch);
    if (globals.isInternetConnected == true) {
      searchvehicle(params)
        .then(async (res) => {
          console.log(
            TAG,
            "response of search vehical",
            JSON.stringify(res.value)
          );
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
            if (res.value && res.value.data.search_by_vehicle) {
              console.log("res.value.data.search_by_vehicle\\\\\\",res.value.data.search_by_vehicle);
              await showMessage({
                message: res.value.data.search_by_vehicle,
                type: "danger",
                icon: "info",
                duration: 4000,
              });
            }else if(res.value && res.value.message){
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
        {item.avatar ? (
          <View style={FriendListStyle.imageStyle}>
            <FastImage
              style={[FriendListStyle.imageStyle]}
              source={{
                uri: item.avatar,
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
          <Text
            style={[
              FriendListStyle.titleSmall,
              { color: this.state.theme.LITE_FONT_COLOR },
            ]}
          >
            {item.car_make_model ? item.car_make_model : "-"}
          </Text>
          <Text
            style={[
              FriendListStyle.titleSmall,
              { color: this.state.theme.LITE_FONT_COLOR },
            ]}
          >
            {item.registration_number ? item.registration_number : "-"}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            FriendListStyle.squareView,
            { backgroundColor: this.state.theme.NAVIGATION_ARROW_COLOR },
          ]}
          onPress={() => this.navigateToDetailScreen(item, index)}
        >
          <FastImage
            style={[FriendListStyle.navigateimgStyle]}
            source={IMAGE.navigate_img}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // navigate to detailed scren
  navigateToDetailScreen = (item, index) => {
    NavigationService.navigate("FriendDetail", { FriendData: item });
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
        <View
          style={[
            AuthStyle.container,
            { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
          ]}
        >
          {isLoading && (
            <Loader isOverlay={true} loaderMessage={loaderMessage} />
          )}
          <NavigationEvents onWillBlur={() => this.clearStates()} />
          <Header
            isShowBack={false}
            title={""}
            onPressed={() => this.props.navigation.openDrawer()}
            isShowRighttwo={true}
            theme={theme}
          />
          <Search
            theme={theme}
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
          {/* {searchListdata.length == 0 || searchListdata == [] ? (
            <View style={FriendListStyle.emptyview}>
              <Text numberOfLines={2} style={FriendListStyle.emptytext}>
                {StaticTitle.noFrnds}
              </Text>
            </View>
          ) : ( */}
          <FlatList
            data={searchListdata}
            style={[FriendListStyle.flatliststyle]}
            renderItem={(item, index) => this.renderSearchList(item, index)}
            keyExtractor={(item, index) => "D" + index.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={this.separatorComponent}
          />
          {/* )} */}
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.home.home.isLoading,
    loaderMessage: state.home.home.loaderMessage,
    theme: state.home.home.theme,
  };
};
const mapDispatchToProps = (dispatch) => ({
  searchvehicle: (params) => dispatch(actions.searchvehicle(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
