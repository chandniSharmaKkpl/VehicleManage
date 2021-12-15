import React, { Component } from "react";
import {
  View,
  DeviceEventEmitter,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { FriendListStyle } from "../../../assets/styles/FriendListStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import { Search } from "../../../components";
import NavigationService from "../../../utils/NavigationService";
import { IMAGE } from "../../../assets/Images";
import { NavigationEvents } from "react-navigation";
import Header from "../../../components/Header";
import FastImage from "react-native-fast-image";
import { DummyData } from "../../../dummyData/DummyData";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { ComponentStyle } from "../../../assets/styles/ComponentStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as globals from "../../../utils/Globals";
import Colors from "../../../assets/Colors";

const TAG = "NotificationScreen ::=";
let getmsgCount;
export class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationListData: DummyData,
      theme: {},
      countDeatils: this.props.navigation.state.params.countDeatils,
      searched_avatars: [],
      messages_count: 0,
      request_count: 0,
    };
  }

  componentDidMount = async () => {
    let token = await AsyncStorage.getItem("access_token");
    globals.access_token = token;

    let reqcount =
      (await JSON.parse(await AsyncStorage.getItem("request_count"))) ||
      this.state.countDeatils.requests_count;
    let isitreadrequest = await AsyncStorage.getItem("IsReadRequest");
    console.log("reqcount-----", reqcount);

    let msgcount =
      (await JSON.parse(await AsyncStorage.getItem("msg_count"))) ||
      this.state.countDeatils.messages_count;
    let isitreadMessage = await AsyncStorage.getItem("IsReadMessage");
    console.log("msgcount-----", msgcount);

    DeviceEventEmitter.addListener("msg_count_remove", () => {
      this.setMsgCountsafterreview();
    });

    DeviceEventEmitter.addListener("request_count_remove", () => {
      this.setRequestCountsafterreview();
    });

    this.setState({
      theme: this.props.theme,
      searched_avatars: this.state.countDeatils.searched_avatars,
      messages_count: isitreadMessage ? 0 : msgcount,
      request_count: isitreadrequest ? 0 : reqcount,
    });
  };

  componentWillUnmount = () => {
    DeviceEventEmitter.removeAllListeners("request_count_remove");
    DeviceEventEmitter.removeAllListeners("msg_count_remove");
  };

  setMsgCountsafterreview = () => {
    this.setState({ messages_count: 0 }, async () => {
      await AsyncStorage.setItem(
        "msg_count",
        JSON.stringify(parseInt(this.state.messages_count))
      );
    });
  };

  setRequestCountsafterreview = () => {
    this.setState({ request_count: 0 }, async () => {
      await AsyncStorage.setItem(
        "request_count",
        JSON.stringify(parseInt(this.state.request_count))
      );
    });
  };

  gotoRecentViewers = () => {
    NavigationService.navigate("RecentViewers");
  };

  gotoChatdetails = () => {
    NavigationService.navigate("ChatList");
  };

  gotoRequestedList = () => {
    NavigationService.navigate("SocialRequest");
  };

  // render friendlist dataItem
  retunNotificationList = () => {
    // console.log(
    //   "this.state.searched_avatars========",
    //   this.state.searched_avatars
    // );
    for (let i = 0; i <= this.state.searched_avatars.length; i++) {
      if (this.state.searched_avatars.length > 3) {
        console.log("NOOO valid");
      } else {
        return (
          <TouchableWithoutFeedback
            style={FriendListStyle.itemcell}
            onPress={() => this.gotoRecentViewers()}
          >
            <View style={FriendListStyle.imageStyle}>
              {this.state.searched_avatars[i] ? (
                <FastImage
                  resizeMethod="resize"
                  source={{
                    uri: this.state.searched_avatars[i],
                  }}
                  style={[
                    FriendListStyle.multiimageStyle,
                    {
                      top: 20,
                      right: 15,
                    },
                  ]}
                />
              ) : (
                <FastImage
                  resizeMethod="resize"
                  source={IMAGE.user}
                  style={[
                    FriendListStyle.multiimageStyle,
                    {
                      top: 20,
                      right: 15,
                    },
                  ]}
                />
              )}
              {this.state.searched_avatars[i] ? (
                <FastImage
                  resizeMethod="resize"
                  source={{
                    uri: this.state.searched_avatars[i],
                  }}
                  style={[
                    FriendListStyle.multiimageStyle,
                    {
                      bottom: 25,
                    },
                  ]}
                />
              ) : (
                <FastImage
                  resizeMethod="resize"
                  source={IMAGE.user}
                  style={[
                    FriendListStyle.multiimageStyle,
                    {
                      bottom: 25,
                    },
                  ]}
                />
              )}
              {this.state.searched_avatars[i] ? (
                <FastImage
                  resizeMethod="resize"
                  source={{
                    uri: this.state.searched_avatars[i],
                  }}
                  style={[
                    FriendListStyle.multiimageStyle,
                    {
                      left: 5,
                      bottom: 35,
                    },
                  ]}
                />
              ) : (
                <FastImage
                  resizeMethod="resize"
                  source={IMAGE.user}
                  style={[
                    FriendListStyle.multiimageStyle,
                    {
                      left: 5,
                      bottom: 35,
                    },
                  ]}
                />
              )}
            </View>

            <Text
              numberOfLines={2}
              style={[
                FriendListStyle.notificationtext,
                { color: this.props.theme.LITE_FONT_COLOR },
              ]}
            >
              {"Someone have searched you up!"}
            </Text>
          </TouchableWithoutFeedback>
        );
      }
    }
  };
  // seprate component
  separatorComponent = () => {
    return <View style={FriendListStyle.separatorLine} />;
  };

  retunChatMsgList = () => {
    return (
      <TouchableWithoutFeedback
        style={FriendListStyle.itemcell}
        onPress={() => this.gotoChatdetails()}
      >
        <View
          style={[FriendListStyle.imageStyle, { justifyContent: "center" }]}
        >
          <FastImage
            resizeMethod="resize"
            source={IMAGE.chatboxe_img}
            style={FriendListStyle.chatImgstyle}
          />
          <View style={ComponentStyle.msgcountcircleview}>
            <Text style={ComponentStyle.messagescountstyle}>
              {this.state.messages_count}
            </Text>
          </View>
        </View>

        <Text
          numberOfLines={1}
          style={[
            FriendListStyle.notificationtext,
            { color: this.props.theme.LITE_FONT_COLOR },
          ]}
        >
          {`You have ${this.state.messages_count} new messages!`}
        </Text>
      </TouchableWithoutFeedback>
    );
  };

  returnRequestList = () => {
    return (
      <TouchableWithoutFeedback
        style={FriendListStyle.itemcell}
        onPress={() => this.gotoRequestedList()}
      >
        <View
          style={[FriendListStyle.imageStyle, { justifyContent: "center" }]}
        >
          <FastImage
            tintColor={Colors.primary}
            resizeMethod="resize"
            source={IMAGE.social_group_img}
            style={[FriendListStyle.chatImgstyle]}
          />
          <View style={ComponentStyle.msgcountcircleview}>
            <Text style={ComponentStyle.messagescountstyle}>
              {this.state.request_count}
            </Text>
          </View>
        </View>

        <Text
          numberOfLines={1}
          style={[
            FriendListStyle.notificationtext,
            { color: this.props.theme.LITE_FONT_COLOR },
          ]}
        >
          {`You have ${this.state.request_count} requests!`}
        </Text>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {
      notificationListData,
      searched_avatars,
      messages_count,
      request_count,
    } = this.state;
    const { isLoading, loaderMessage, theme } = this.props;

    return (
      <>
        <View
          style={[{ backgroundColor: theme.PRIMARY_BACKGROUND_COLOR, flex: 1 }]}
        >
          <Header
            isShowBack={true}
            title={StaticTitle.notification}
            onPressed={() => this.props.navigation.openDrawer()}
            isShowSidebar={false}
            isFrom={"Notification"}
            theme={theme}
          />
          {(searched_avatars.length == 0 || searched_avatars == []) &&
          messages_count == 0 &&
          request_count == 0 ? (
            <View style={FriendListStyle.emptyview}>
              <Text numberOfLines={2} style={FriendListStyle.emptytext}>
                {StaticTitle.noNotifications}
              </Text>
            </View>
          ) : (
            <>
              {searched_avatars.length == 0 || searched_avatars == []
                ? null
                : this.retunNotificationList()}

              {messages_count == 0 ? null : this.retunChatMsgList()}
              {this.returnRequestList()}
              {/* {request_count == 0 ? null : this.returnRequestList()} */}
            </>
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

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
