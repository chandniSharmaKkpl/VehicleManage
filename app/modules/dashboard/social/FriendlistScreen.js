import React, { Component } from "react";
import {
  View,
  Keyboard,
  FlatList,
  TouchableWithoutFeedback,
  Text,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { FriendListStyle } from "../../../assets/styles/FriendListStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import { Search, Header, Loader } from "../../../components";
import NavigationService from "../../../utils/NavigationService";
import { Messages } from "../../../utils/Messages";
import { IMAGE } from "../../../assets/Images";
import { NavigationEvents } from "react-navigation";
import { DummyData } from "../../../dummyData/DummyData";
import FastImage from "react-native-fast-image";
import * as actions from "../redux/Actions";
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as globals from "../../../utils/Globals";
import { isEmpty } from "../../../utils/Validators";
import Icon from "react-native-vector-icons/Ionicons";

const TAG = "FriendlistScreen ::=";

export class FriendlistScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: "",
      friendListData: [],
      filterdfriendListData: [],
      user: {},
    };
  }

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.onFocusFunction();
    });
  }

  async componentWillUnmount() {
    this._isMounted = false;
    this.focusListener.remove();
    await hideMessage();
  }

  /// call everytime didmount
  onFocusFunction = async () => {
    this._isMounted = true;
    if (this.props.userDetails != null && this.props.userDetails != undefined) {
      this.setState({ user: this.props.userDetails.user_data }, () => {
        if (globals.isInternetConnected == true) {
          this.getfriendListAPI();
        } else {
          Alert.alert(globals.warning, globals.noInternet);
        }
      });
    }
  };

  // search vechicle by name
  getfriendListAPI = () => {
    const { user, txtSearch } = this.state;
    const { getfriendlist } = this.props;
    let params = new URLSearchParams();
    // Collect the necessary params
    params.append("user_id", user.user_id);
    params.append("search", txtSearch);

    getfriendlist(params)
      .then(async (res) => {
        if (res.value && res.value.data.success == true) {
          //OK 200 The request was fulfilled
          if (res.value && res.value.status === 200) {
            if (this._isMounted) {
              this.setState({
                friendListData: res.value.data.data.friend_list,
                filterdfriendListData: res.value.data.data.friend_list,
              });
            }
          }
        } else {
          if (res.value && res.value.data.error == "Unauthenticated.") {
            {
              NavigationService.navigate("Login");
            }
          } else if (res.value && res.value.data.error) {
            await showMessage({
              message: res.value.message,
              type: "danger",
              icon: "auto",
              duration: 4000,
            });
          }
        }
      })
      .catch((err) => {
        console.log(TAG, "i am in catch error search by vehical name", err);
      });
  };

  // clear States before leave this screen
  clearStates = () => {
    this.setState({
      txtSearch: "",
    });
  };

  getSearchResults = (searchText) => {
    // console.log("Value of item is :->", searchText);
    // console.log("this.state.filterdfriendListData :-->", this.state);
    const newData = Object.values(this.state.filterdfriendListData).filter(
      (item) => {
        const itemnumData = item.registration_number.toUpperCase();
        const itemData = item.name.toUpperCase();
        const textData = searchText.toUpperCase();

        return (
          itemData.indexOf(textData) > -1 || itemnumData.indexOf(textData) > -1
        );
      }
    );
    this.setState({
      friendListData: newData,
      txtSearch: searchText,
    });
  };

  // search vechicle by name
  getSearchResult = async () => {
    const { txtSearch } = this.state;
    if (isEmpty(txtSearch)) {
      await showMessage({
        message: StaticTitle.searchrequired,
        type: "danger",
        icon: "auto",
        duration: 4000,
      });
      return false;
    }
    if (globals.isInternetConnected == true) {
      this.getfriendListAPI();
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  // render friendlist dataItem
  renderFriendList = ({ item, index }) => {
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
          <Text
            style={[
              FriendListStyle.titleBig,
              { color: this.props.theme.LITE_FONT_COLOR },
            ]}
          >
            {item.name ? item.name + " " + item.surname : "-"}
          </Text>
          <Text
            style={[
              FriendListStyle.titleSmall,
              { color: this.props.theme.LITE_FONT_COLOR },
            ]}
          >
            {item.car_make_model ? item.car_make_model : "-"}
          </Text>
          <Text
            style={[
              FriendListStyle.titleSmall,
              { color: this.props.theme.LITE_FONT_COLOR },
            ]}
          >
            {item.registration_number ? item.registration_number : ""}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => this.gotoFriendDetails(item)}
          style={[
            FriendListStyle.squareView,
            { backgroundColor: this.props.theme.NAVIGATION_ARROW_COLOR },
          ]}
        >
          <Icon
            name={"chevron-forward"}
            size={25}
            color={this.props.theme.PRIMARY_TEXT_COLOR}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // navigate to FriendDetails screen
  gotoFriendDetails = (item) => {
    NavigationService.navigate("FriendDetail", {
      FriendData: item,
      previous_screen: "friendList",
    });
  };

  // seprate component
  separatorComponent = () => {
    return <View style={FriendListStyle.separatorLine} />;
  };

  render() {
    const { friendListData, txtSearch } = this.state;
    const { isLoading, loaderMessage, theme } = this.props;
    return (
      <>
        <View
          style={[
            FriendListStyle.container,
            { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
          ]}
        >
          {isLoading && (
            <Loader isOverlay={true} loaderMessage={loaderMessage} />
          )}
          <NavigationEvents onWillBlur={() => this.clearStates()} />
          <Header
            title={StaticTitle.frndList}
            isShowSidebar={true}
            onPressed={() => this.props.navigation.openDrawer()}
            theme={theme}
          />
          <Search
            theme={theme}
            blurOnSubmit={false}
            value={txtSearch}
            returnKeyType="done"
            onSubmitEditing={() => this.getSearchResults(txtSearch)}
            autoCapitalize={"none"}
            onChangeText={(text) =>
              this.setState({
                txtSearch: text,
              })
            }
            placeholderText={StaticTitle.searchbyNameNnum}
            onPress={() => this.getSearchResults(txtSearch)}
          />
          {friendListData.length == 0 || friendListData == [] ? (
            <View style={FriendListStyle.emptyview}>
              <Text numberOfLines={2} style={FriendListStyle.emptytext}>
                {StaticTitle.noFrnds}
              </Text>
            </View>
          ) : (
            <FlatList
              data={friendListData}
              style={FriendListStyle.flatliststyle}
              renderItem={(item, index) => this.renderFriendList(item, index)}
              keyExtractor={(item, index) => "D" + index.toString()}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={this.separatorComponent}
            />
          )}
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
    userDetails: state.auth.user.userDetails,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getfriendlist: (params) => dispatch(actions.getfriendlist(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendlistScreen);
