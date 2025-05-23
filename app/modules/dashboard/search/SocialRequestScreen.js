import React, { Component } from "react";
import {
  View,
  Keyboard,
  FlatList,
  Alert,
  TouchableOpacity,
  Text,
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
import Icon from "react-native-vector-icons/AntDesign";
import Colors from "../../../assets/Colors";

const TAG = "SocialRequestScreen ::=";

export class SocialRequestScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requestedListData: [],
      theme: {},
      socialProfilesIdList: [],
      isEmpty: false,
    };
  }

  async componentWillUnmount() {
    await AsyncStorage.setItem("IsRead", JSON.stringify(true));
    await AsyncStorage.setItem("IsReadRequest", JSON.stringify(true));

    await AsyncStorage.setItem("total_count", JSON.stringify(parseInt(0)));
    DeviceEventEmitter.emit("total_count_remove");

    await AsyncStorage.setItem("request_count", JSON.stringify(parseInt(0)));
    DeviceEventEmitter.emit("request_count_remove");

    this.setState({
      isEmpty: false,
    });
  }

  async componentDidMount() {
    await AsyncStorage.setItem("IsRead", JSON.stringify(true));
    await AsyncStorage.setItem("IsReadRequest", JSON.stringify(true));

    await AsyncStorage.setItem("total_count", JSON.stringify(parseInt(0)));
    DeviceEventEmitter.emit("total_count_remove");

    await AsyncStorage.setItem("msg_count", JSON.stringify(parseInt(0)));
    DeviceEventEmitter.emit("msg_count_remove");

    this.setState({ theme: this.props.theme }, () => {
      if (globals.isInternetConnected == true) {
        this.getRequestedList();
      } else {
        Alert.alert(globals.warning, globals.noInternet);
      }
    });
  }

  getRequestedList = async () => {
    const { socialrequestlist } = this.props;
    if (globals.isInternetConnected == true) {
      socialrequestlist().then(async (res) => {
        if (res.value && res.value.data.success == true) {
          if (res.value && res.value.status === 200) {
            if (res.value.data.data.requests.length > 0) {
              await showMessage({
                message: res.value.data.message,
                type: "success",
                icon: "auto",
                duration: 4000,
              });
              this.setState({
                requestedListData: res.value.data.data.requests,
              });
              for (let i = 0; i < res.value.data.data.requests.length; i++) {
                this.setState({
                  socialProfilesIdList: [
                    ...this.state.socialProfilesIdList,
                    res.value.data.data.requests[i].social_profile_id,
                  ],
                });
              }
              console.log(
                "socialProfilesIdList",
                this.state.socialProfilesIdList
              );
              this.readSocialRequests(this.state.socialProfilesIdList);
            } else {
              console.log("in getRequest else");

              this.setState({
                isEmpty: true,
              });
            }
          }
        } else if (res.value && res.value.error == "Unauthenticated") {
          await showMessage({
            message: res.value.error,
            type: "danger",
            icon: "auto",
            duration: 4000,
          });
        }
      });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  readSocialRequests = (idList) => {
    const { socialProfilesRead } = this.props;
    var params = new FormData();
    // Collect the necessary params
    params.append("ids", JSON.stringify(idList));
    console.log("params in social request screen ==>", JSON.stringify(params));

    socialProfilesRead(params)
      .then(async (res) => {
        console.log("resData after readSocialRequests", res.value.data);
      })
      .catch((err) => {
        console.log(TAG, "i am in catch error readSocialRequests", err);
      });
  };

  // render renderRequestedList dataItem
  renderRequestedList = ({ item, index }) => {
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
        <View style={[FriendListStyle.userdetail, { width: "45%" }]}>
          <Text
            style={[
              FriendListStyle.titleBig,
              { color: this.props.theme.LITE_FONT_COLOR },
            ]}
          >
            {item.name ? item.name + " " + item.surname : ""}
          </Text>
          <View
            style={[
              FriendListStyle.detailsview,
              { width: globals.deviceWidth * 0.4 },
            ]}
          >
            <Text
              style={[
                FriendListStyle.titleSmall,
                { color: this.props.theme.LITE_FONT_COLOR },
              ]}
            >
              {item.created_at ? "09:00 PM" : ""}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.approveRequestApi(item.social_profile_id)}
          style={[
            FriendListStyle.squareView,
            {
              marginHorizontal: 10,
              backgroundColor: this.props.theme.NAVIGATION_ARROW_COLOR,
            },
          ]}
        >
          <Icon
            style={{ textAlign: "center", backgroundColor: Colors.success }}
            name="check"
            color={Colors.white}
            size={globals.deviceWidth * 0.05}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.denyRequestApi(item.social_profile_id)}
          style={[
            FriendListStyle.squareView,
            {
              marginLeft: 10,
              backgroundColor: this.props.theme.NAVIGATION_ARROW_COLOR,
            },
          ]}
        >
          <Icon
            style={{ textAlign: "center", backgroundColor: Colors.danger }}
            name="close"
            color={Colors.white}
            size={globals.deviceWidth * 0.05}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // approveRequest API call
  approveRequestApi = (id) => {
    const { approveRequest } = this.props;
    let params = new URLSearchParams();
    // Collect the necessary params
    if (globals.isInternetConnected == true) {
      params.append("id", id);
      approveRequest(params)
        .then(async (res) => {
          console.log(
            TAG,
            "response of approveRequest",
            JSON.stringify(res.value)
          );
          console.warn("i approveRequest====>", res.value.data);
          if (res.value && res.value.data.success == true) {
            //OK 200 The request was fulfilled
            if (res.value && res.value.status === 200) {
              NavigationService.navigate("Search");
              await showMessage({
                message: res.value.data.message,
                type: "success",
                icon: "auto",
                duration: 4000,
              });
              await AsyncStorage.setItem("IsReadRequest", JSON.stringify(true));

              await AsyncStorage.setItem(
                "request_count",
                JSON.stringify(parseInt(0))
              );
              DeviceEventEmitter.emit("request_count_remove");
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
          console.log(TAG, "i am in catch error approveRequest", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  // denyRequest API call
  denyRequestApi = (id) => {
    const { denyRequest } = this.props;
    let params = new URLSearchParams();
    // Collect the necessary params
    if (globals.isInternetConnected == true) {
      params.append("id", id);
      denyRequest(params)
        .then(async (res) => {
          if (res.value && res.value.data.success == true) {
            //OK 200 The request was fulfilled
            if (res.value && res.value.status === 200) {
              NavigationService.navigate("Search");
              await showMessage({
                message: res.value.data.message,
                type: "success",
                icon: "auto",
                duration: 4000,
              });
              await AsyncStorage.setItem("IsReadRequest", JSON.stringify(true));

              await AsyncStorage.setItem(
                "request_count",
                JSON.stringify(parseInt(0))
              );
              DeviceEventEmitter.emit("request_count_remove");
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
          console.log(TAG, "i am in catch error denyRequest", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  // separate component
  separatorComponent = () => {
    return <View style={FriendListStyle.separatorLine} />;
  };

  render() {
    const { requestedListData, isEmpty } = this.state;
    const { isLoading, loaderMessage, theme } = this.props;
    // console.log("requestedListData====", requestedListData);
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
            title={StaticTitle.sharesocialrequest}
            theme={theme}
            onPressed={() => this.props.navigation.openDrawer()}
          />
          {isEmpty ? (
            <View style={FriendListStyle.emptyview}>
              <Text numberOfLines={2} style={FriendListStyle.emptytext}>
                {StaticTitle.noRequests}
              </Text>
            </View>
          ) : (
            <FlatList
              data={requestedListData}
              style={[FriendListStyle.flatliststyle, { paddingVertical: 5 }]}
              renderItem={(item, index) =>
                this.renderRequestedList(item, index)
              }
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  socialrequestlist: (params) => dispatch(actions.socialrequestlist(params)),
  socialProfilesRead: (params) => dispatch(actions.socialProfilesRead(params)),
  denyRequest: (params) => dispatch(actions.denyRequest(params)),
  approveRequest: (params) => dispatch(actions.approveRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialRequestScreen);
