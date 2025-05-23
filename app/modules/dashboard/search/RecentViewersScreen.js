import React, { Component } from "react";
import {
  View,
  Keyboard,
  FlatList,
  Alert,
  TouchableOpacity,
  Text,
  Appearance,
  DeviceEventEmitter,
} from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import { FriendListStyle } from "../../../assets/styles/FriendListStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import { Search } from "../../../components";
import NavigationService from "../../../utils/NavigationService";
import { IMAGE } from "../../../assets/Images";
import { NavigationEvents } from "react-navigation";
import { Header, Loader } from "../../../components";
import FastImage from "react-native-fast-image";
import * as actions from "../redux/Actions";
import * as globals from "../../../utils/Globals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage, hideMessage } from "react-native-flash-message";
import Colors from "../../../assets/Colors";

const colorScheme = Appearance.getColorScheme();
const TAG = "RecentViewersScreen ::=";

export class RecentViewersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentViewerListData: [],
      theme: {},
      user: {},
      recentViewersIdList: [],
    };
  }

  async componentWillUnmount() {
    await AsyncStorage.setItem("IsRead", JSON.stringify(true));

    await AsyncStorage.setItem("total_count", JSON.stringify(parseInt(0)));
    DeviceEventEmitter.emit("total_count_remove");
  }

  async componentDidMount() {
    let token = await AsyncStorage.getItem("access_token");
    globals.access_token = token;

    if (this.props.userDetails != null && this.props.userDetails != undefined) {
      this.setState({ user: this.props.userDetails.user_data });
    }

    await AsyncStorage.setItem("IsRead", JSON.stringify(true));

    await AsyncStorage.setItem("total_count", JSON.stringify(parseInt(0)));
    DeviceEventEmitter.emit("total_count_remove");

    this.setState({ theme: this.props.theme }, () => {
      if (globals.isInternetConnected == true) {
        this.getrecentViewersList();
      } else {
        Alert.alert(globals.warning, globals.noInternet);
      }
    });
  }

  getrecentViewersList = async () => {
    const { whosearchedyou } = this.props;
    if (globals.isInternetConnected == true) {
      if (this.state.user.setting_7 == 1) {
      } else {
        whosearchedyou().then(async (res) => {
          // console.log("res----------whosearchedyou-", JSON.stringify(res));
          if (res.value && res.value.data.success == true) {
            if (res.value && res.value.status === 200) {
              await showMessage({
                message: res.value.data.message,
                type: "success",
                icon: "auto",
                duration: 4000,
              });
              this.setState({
                recentViewerListData: res.value.data.data.who_searched_you,
              });
              for (
                let i = 0;
                i < res.value.data.data.who_searched_you.length;
                i++
              ) {
                this.setState({
                  recentViewersIdList: [
                    ...this.state.recentViewersIdList,
                    res.value.data.data.who_searched_you[i].search_id,
                  ],
                });
              }
              console.log(
                "RecentViewersIdList",
                this.state.recentViewersIdList
              );

              this.readRecentViewers(this.state.recentViewersIdList);
              this.getnotificationCount();
            }
          } else if (res.value && res.value.error == "Unauthenticated") {
            console.log(TAG, "notification count couldn't fetch");
            await showMessage({
              message: res.value.error,
              type: "danger",
              icon: "auto",
              duration: 4000,
            });
          }
        });
      }
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  getnotificationCount = async () => {
    const { notificationCount } = this.props;
    notificationCount().then((res) => {
      if (res.value.status === 200) {
        console.warn("i am in res.val====>", res.value.data);
      }
    });
  };

  readRecentViewers = (idList) => {
    const { searchesRead } = this.props;
    var params = new FormData();
    // Collect the necessary params
    params.append("ids", JSON.stringify(idList));
    console.log("params in recent viewers screen ==>", JSON.stringify(params));

    searchesRead(params)
      .then(async (res) => {
        console.log("resData after readRecentViewers", res.value.data);
      })
      .catch((err) => {
        console.log(TAG, "i am in catch error readRecentViewers", err);
      });
  };

  // navigate to FriendDetails screen
  gotoFriendDetails = (item) => {
    NavigationService.navigate("FriendDetail", { FriendData: item });
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
            {item.name ? item.name + " " + item.surname : ""}
          </Text>
          <View style={FriendListStyle.detailsview}>
            <Text
              style={[
                FriendListStyle.titleSmall,
                { color: this.props.theme.LITE_FONT_COLOR },
              ]}
            >
              {item.updated_time ? item.updated_time : ""}
            </Text>
            <Text
              style={{
                color: colorScheme === "light" ? Colors.black : Colors.white,
                marginHorizontal: 5,
                marginTop: -3,
              }}
            >
              {"|"}
            </Text>
            <Text
              style={[
                FriendListStyle.titleSmall,
                { color: this.props.theme.LITE_FONT_COLOR },
              ]}
            >
              {item.updated_date ? item.updated_date : ""}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.gotoFriendDetails(item)}
          style={[
            FriendListStyle.squareView,
            { backgroundColor: this.props.theme.NAVIGATION_ARROW_COLOR },
          ]}
        >
          <FastImage
            style={[FriendListStyle.navigateimgStyle]}
            source={IMAGE.navigate_img}
          />
        </TouchableOpacity>
      </View>
    );
  };
  // separate component
  separatorComponent = () => {
    return <View style={FriendListStyle.separatorLine} />;
  };

  render() {
    const { recentViewerListData } = this.state;
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
          <Header
            isShowBack={true}
            title={StaticTitle.whosearchyou}
            theme={theme}
            onPressed={() => this.props.navigation.openDrawer()}
          />
          <FlatList
            data={recentViewerListData}
            style={[FriendListStyle.flatliststyle, { paddingVertical: 5 }]}
            renderItem={(item, index) => this.renderFriendList(item, index)}
            keyExtractor={(item, index) => "D" + index.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={this.separatorComponent}
          />
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
  whosearchedyou: (params) => dispatch(actions.whosearchedyou(params)),
  searchesRead: (params) => dispatch(actions.searchesRead(params)),
  notificationCount: (params) => dispatch(actions.notificationCount(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentViewersScreen);
