import React, { Component } from "react";
import {
  View,
  DeviceEventEmitter,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Text,
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

const TAG = "NotificationScreen ::=";

export class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationListData: DummyData,
      theme: {},
      countDeatils: this.props.navigation.state.params.countDeatils,
      searched_avatars: [],
      messages_count: "",
    };
  }

  componentDidMount = async () => {
    let token = await AsyncStorage.getItem("access_token");
    globals.access_token = token;

    let getsearchedCount = await JSON.parse(
      await AsyncStorage.getItem("searched_count")
    );
    if (getsearchedCount != "0") {
      await AsyncStorage.setItem("searched_count", JSON.stringify(parseInt(0)));
      DeviceEventEmitter.emit("NotificationCountRemove");
    }

    DeviceEventEmitter.addListener("ChatCountRemove", () => {
      this.setChatCountsafterreview();
    });

    this.setState({
      theme: this.props.theme,
      searched_avatars: this.state.countDeatils.searched_avatars,
      messages_count: this.state.countDeatils.messages_count,
    });
  };

  setChatCountsafterreview = () => {
    this.setState({
      messages_count: 0,
    });
    console.log("After -----------------", this.state.messages_count);
  };

  gotoRecentViewers = () => {
    NavigationService.navigate("RecentViewers");
  };

  gotoChatdetails = () => {
    NavigationService.navigate("ChatList");
  };

  // render friendlist dataItem
  retunNotificationList = () => {
    console.log(
      "this.state.searched_avatars========",
      this.state.searched_avatars
    );
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
              <FastImage
                resizeMethod="resize"
                source={IMAGE.user}
                style={FriendListStyle.multiimageStyle}
              />
              <FastImage
                resizeMethod="resize"
                source={IMAGE.user}
                style={[FriendListStyle.multiimageStyle, { left: 15 }]}
              />
              <FastImage
                resizeMethod="resize"
                source={IMAGE.user}
                style={[
                  FriendListStyle.multiimageStyle,
                  {
                    right: 10,
                    bottom: 20,
                  },
                ]}
              />
            </View>

            <Text
              numberOfLines={2}
              style={[
                FriendListStyle.notificationtext,
                { color: this.state.theme.LITE_FONT_COLOR },
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
            { color: this.state.theme.LITE_FONT_COLOR },
          ]}
        >
          {"You have new messages"}
        </Text>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const { notificationListData, searched_avatars, messages_count } =
      this.state;
    const { isLoading, loaderMessage, theme } = this.props;
    return (
      <>
        <View style={[{ backgroundColor: theme.PRIMARY_BACKGROUND_COLOR }]}>
          <Header
            isShowBack={true}
            title={StaticTitle.notification}
            onPressed={() => this.props.navigation.openDrawer()}
            isShowSidebar={false}
            isFrom={"Notification"}
            theme={theme}
          />
          {searched_avatars != []
            ? // <FlatList
              //   data={searched_avatars}
              //   style={[FriendListStyle.flatliststyle, { paddingVertical: 5 }]}
              //   renderItem={(item, index) => this.renderFriendList(item, index)}
              //   keyExtractor={(item, index) => "D" + index.toString()}
              //   showsVerticalScrollIndicator={false}
              //   ItemSeparatorComponent={this.separatorComponent}
              // />
              this.retunNotificationList()
            : null}

          {messages_count != "0" ? this.retunChatMsgList() : null}
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
