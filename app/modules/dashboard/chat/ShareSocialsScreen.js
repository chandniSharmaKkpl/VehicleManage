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
import * as actions from "./redux/Actions";
import * as globals from "../../../utils/Globals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage, hideMessage } from "react-native-flash-message";
import Icon from "react-native-vector-icons/AntDesign";
import Colors from "../../../assets/Colors";

const TAG = "ShareSocialsScreen ::=";

export class ShareSocialsScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      from_id: this.props.navigation.state.params.from_id,
      socialfrndList: [],
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    let token = await AsyncStorage.getItem("access_token");
    globals.access_token = token;

    if (globals.isInternetConnected == true) {
      await this.getSocialFriendsList();
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // share social links API
  shareSocialLinks = async () => {
    const { sharesocialprofiles } = this.props;
    const { socialfrndList } = this.state;
    let params = new URLSearchParams();

    var too_ids = "[";
    socialfrndList.forEach((msg) => {
      if (String(too_ids).length == 1) {
        too_ids = too_ids + msg.id;
      } else {
        too_ids = too_ids + "," + msg.id;
      }

      console.log("in loop too_ids :-->", too_ids);
    });

    too_ids = too_ids + "]";

    console.log("too_ids :-->", too_ids);
    if (too_ids == "[]") {
      console.log("Not any message in unread....");
      return;
    }

    // Collect the necessary params
    params.append("from_id", this.state.from_id);
    params.append("to_ids", too_ids);
    console.log("sharesocialprofiles PARAMS==========", JSON.stringify(params));

    sharesocialprofiles(params)
      .then(async (res) => {
        console.log(
          TAG,
          "response of sharesocialprofiles",
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
            NavigationService.back();
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
              icon: "info",
              duration: 4000,
            });
          }
        }
      })
      .catch((err) => {
        console.log(TAG, "i am in catch error sharesocialprofiles", err);
      });
  };

  getSocialFriendsList = async () => {
    const { socialsharefriends } = this.props;
    let params = new URLSearchParams();
    // Collect the necessary params
    params.append("from_id", this.state.from_id);
    console.log("socialsharefriends PARAMS==========", JSON.stringify(params));
    console.log("======================  globals.access_token",  globals.access_token);
    socialsharefriends(params)
      .then(async (res) => {
        console.log(
          TAG,
          "response of socialsharefriends",
          JSON.stringify(res.value.data.data)
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
            if (this._isMounted) {
              this.setState({
                socialfrndList: res.value.data.data.friend_list,
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
              icon: "info",
              duration: 4000,
            });
          }
        }
      })
      .catch((err) => {
        console.log(TAG, "i am in catch error socialsharefriends", err);
      });
  };

  // seprate component
  separatorComponent = () => {
    return <View style={FriendListStyle.separatorLine} />;
  };

  // checkboxes tick, untick
  isIconCheckedOrNot = (item, index) => {
    let { socialfrndList } = this.state;

    socialfrndList.map((innerItem, innerIndex) => {
      if (index == innerIndex) {
        innerItem.isChecked = !innerItem.isChecked;
      }
    });
    this.setState({ socialfrndList });
  };

  // render friendlist dataItem
  renderSocialFriendList = ({ item, index }) => {
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
          onPress={() => this.isIconCheckedOrNot(item, index)}
          style={[
            FriendListStyle.squareView,
            { backgroundColor: this.props.theme.NAVIGATION_ARROW_COLOR },
          ]}
        >
          {item.isChecked ? (
            <Icon
              style={{ textAlign: "center" }}
              name="check"
              color={Colors.black}
              size={globals.deviceWidth * 0.05}
            />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { isLoading, loaderMessage, theme } = this.props;
    const { socialfrndList } = this.state;
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
            isFrom={"ShareSocial"}
            title={StaticTitle.shareprofiles}
            theme={theme}
            isShowSidebar={true}
            onPressed={() => this.shareSocialLinks()}
          />
          <FlatList
            data={socialfrndList}
            style={[FriendListStyle.flatliststyle, { paddingVertical: 5 }]}
            renderItem={(item, index) =>
              this.renderSocialFriendList(item, index)
            }
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
    nav: state.nav,
    isLoading: state.chat.chat.isLoading,
    loaderMessage: state.chat.chat.loaderMessage,
    theme: state.chat.chat.theme,
    chatList: state.chat.chat.chatList,
    userDetails: state.auth.user.userDetails,
    isReceiveChatMessage: state.chat.chat.isReceiveChatMessage,
    chatMessages: state.chat.chat.chatMessages,
  };
};

const mapDispatchToProps = (dispatch) => ({
  socialsharefriends: (params) => dispatch(actions.socialsharefriends(params)),
  sharesocialprofiles: (params) =>
    dispatch(actions.sharesocialprofiles(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareSocialsScreen);
