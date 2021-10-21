import React, { Component } from "react";
import {
  View,
  Linking,
  FlatList,
  Alert,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { FriendDetailStyle } from "../../../assets/styles/FriendDetailStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import { Loader } from "../../../components";
import NavigationService from "../../../utils/NavigationService";
import { Messages } from "../../../utils/Messages";
import { IMAGE } from "../../../assets/Images";
import { NavigationEvents } from "react-navigation";
import FastImage from "react-native-fast-image";
import Colors from "../../../assets/Colors";
import LinearGradient from "react-native-linear-gradient";
import * as globals from "../../../utils/Globals";
import * as actions from "../redux/Actions";
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TAG = "FriendDetailScreen ::=";

export class FriendDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getfriendData: this.props.navigation.state.params.FriendData,
      friendDetail: [],
      user: {},
    };
  }

  componentDidMount = async () => {
    if (this.props.userDetails != null && this.props.userDetails != undefined) {
      this.setState({ user: this.props.userDetails.user_data }, () => {
        this.getuserDetail();
      });
    }
  };

  // API call of get user details
  getuserDetail = async () => {
    const { getfriendData } = this.state;
    const { getfriendDetails } = this.props;
    let params = new URLSearchParams();
    // Collect the necessary params
    if (globals.isInternetConnected == true) {
      params.append("friend_id", getfriendData.id);
      getfriendDetails(params)
        .then(async (res) => {
          // console.log(
          //   TAG,
          //   "response of getfriend Details",
          //   JSON.stringify(res.value.data.data)
          // );
          if (res.value && res.value.data.success == true) {
            //OK 200 The request was fulfilled
            if (res.value && res.value.status === 200) {
              // await showMessage({
              //   message: res.value.data.message,
              //   type: "success",
              //   icon: "info",
              //   duration: 4000,
              // });
              this.setState({ friendDetail: res.value.data.data.user_data });
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
          console.log(TAG, "i am in catch error getfriendDetails", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  // Navigate to back friend list screen
  gotoback = () => {
    NavigationService.back();
  };

  // AddasFriend API
  AddasFriend = () => {
    const { getfriendData, user } = this.state;
    const { addfriend } = this.props;
    let params = new URLSearchParams();
    // Collect the necessary params
    if (globals.isInternetConnected == true) {
      params.append("user_id", user.user_id);
      params.append("friend_id", getfriendData.id);
      // console.log("params====AddasFriend", JSON.stringify(params));
      addfriend(params)
        .then(async (res) => {
          // console.log(
          //   TAG,
          //   "response of addfriend",
          //   JSON.stringify(res.value.data)
          // );
          if (res.value && res.value.data.success == true) {
            //OK 200 The request was fulfilled
            if (res.value && res.value.status === 200) {
              await this.getuserDetail();
              await showMessage({
                message: res.value.data.message,
                type: "success",
                icon: "info",
                duration: 4000,
              });
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
          console.log(TAG, "i am in catch error addfriend", err);
        });
    } else {
      Alert.alert(globals.warning, globals.noInternet);
    }
  };

  // navigate to gotochatdetailscreen
  gotochatdetailscreen = () => {
    const { friendDetail } = this.state;
    NavigationService.navigate("ChatMessages", { user_info: friendDetail });
  };

  // navigate Social Profiles
  navigatetoSocialProfiles = (isFrom, name) => {
    let SocialURL;
    if (isFrom == "Fb") {
      SocialURL = "https://www.facebook.com/" + name;
    } else if (isFrom == "Insta") {
      SocialURL = "https://www.instagram.com/" + name;
    } else if (isFrom == "Snap") {
      SocialURL = "https://www.snapchat.com/" + name;
    } else {
      SocialURL = "https://www.google.com" + name;
    }

    Linking.canOpenURL(SocialURL).then((supported) => {
      if (supported) {
        Linking.openURL(SocialURL);
      } else {
      }
    });
  };

  render() {
    const { isLoading, loaderMessage, theme } = this.props;
    const { friendDetail } = this.state;
    console.log("friendDetail=======", friendDetail);
    return (
      <>
        <View
          style={[
            FriendDetailStyle.container,
            { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
          ]}
        >
          {isLoading && (
            <Loader isOverlay={true} loaderMessage={loaderMessage} />
          )}
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <View style={FriendDetailStyle.halfContainer}>
            {friendDetail.user_photo ? (
              <FastImage
                style={FriendDetailStyle.imageStyle}
                source={{
                  uri: friendDetail.user_photo,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : (
              <Image
                resizeMethod="resize"
                source={IMAGE.user}
                style={[FriendDetailStyle.imageStyle]}
              />
            )}

            <View style={FriendDetailStyle.backbtnview}>
              <TouchableOpacity
                onPress={() => this.gotoback()}
                style={FriendDetailStyle.squareView}
              >
                <FastImage
                  style={[FriendDetailStyle.navigateimgStyle]}
                  source={IMAGE.backArrow}
                  tintColor={Colors.black}
                />
              </TouchableOpacity>
            </View>
            <View style={FriendDetailStyle.userdetailview}>
              <Text numberOfLines={2} style={FriendDetailStyle.headingtitle}>
                {friendDetail.username}
              </Text>
              <Text numberOfLines={1} style={FriendDetailStyle.titletext}>
                {friendDetail.city}
              </Text>
            </View>
            <View style={FriendDetailStyle.middleview}>
              {friendDetail.is_friend == false ? (
                <TouchableOpacity
                  onPress={() => this.AddasFriend()}
                  style={[
                    FriendDetailStyle.circleview,
                    { backgroundColor: Colors.primary },
                  ]}
                >
                  <FastImage
                    style={[FriendDetailStyle.socialicon]}
                    source={IMAGE.social_group_img}
                  />
                </TouchableOpacity>
              ) : null}

              <TouchableOpacity
                onPress={() =>
                  this.navigatetoSocialProfiles("Fb", friendDetail.username)
                }
                style={[
                  FriendDetailStyle.circleview,
                  { backgroundColor: Colors.blue },
                ]}
              >
                <FastImage
                  style={[FriendDetailStyle.socialicon]}
                  source={IMAGE.fb_icon_square}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.navigatetoSocialProfiles("Insta", friendDetail.username)
                }
              >
                <LinearGradient
                  start={{ x: 0.0, y: 0.5 }}
                  end={{ x: 0.7, y: 1.0 }}
                  colors={[Colors.orange, Colors.pink, Colors.purple]}
                  style={FriendDetailStyle.circleview}
                >
                  <FastImage
                    style={[FriendDetailStyle.socialicon]}
                    source={IMAGE.insta_icon_img}
                  />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.navigatetoSocialProfiles("Snap", friendDetail.username)
                }
                style={[
                  FriendDetailStyle.circleview,
                  { backgroundColor: Colors.snapChat },
                ]}
              >
                <FastImage
                  style={[FriendDetailStyle.socialicon]}
                  source={IMAGE.snap_img}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              FriendDetailStyle.secondhalfview,
              { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
            ]}
          >
            <View style={FriendDetailStyle.descriptionContainer}>
              <Text numberOfLines={1} style={FriendDetailStyle.dectext}>
                {"About" + " " + friendDetail.username}
              </Text>
              <ScrollView
                ref={(node) => (this.scroll = node)}
                automaticallyAdjustContentInsets={true}
                enableOnAndroid={true}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="never"
                style={{ height: globals.deviceHeight * 0.25 }}
              >
                <Text
                  style={[
                    FriendDetailStyle.itemtext,
                    { color: theme.DESCRIPTION_TEXT_COLOR },
                  ]}
                >
                  {friendDetail.user_description}
                </Text>
              </ScrollView>
            </View>
          </View>
          {friendDetail.is_friend == false ? null : (
            <View style={FriendDetailStyle.bottomview}>
              <TouchableOpacity
                onPress={() => this.gotochatdetailscreen()}
                style={[
                  FriendDetailStyle.bottomcircleview,
                  {
                    backgroundColor: theme.CHAT_BTN_COLOR,
                  },
                ]}
              >
                <FastImage
                  style={[FriendDetailStyle.bottomicon]}
                  source={IMAGE.chatboxes_img}
                  tintColor={Colors.white}
                />
              </TouchableOpacity>
            </View>
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
  getfriendDetails: (params) => dispatch(actions.getfriendDetails(params)),
  addfriend: (params) => dispatch(actions.addfriend(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendDetailScreen);
