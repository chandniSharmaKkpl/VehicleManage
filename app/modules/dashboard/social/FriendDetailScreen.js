import React, { Component } from "react";
import {
  View,
  Keyboard,
  FlatList,
  TouchableWithoutFeedback,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { FriendDetailStyle } from "../../../assets/styles/FriendDetailStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import { Search, Header } from "../../../components";
import NavigationService from "../../../utils/NavigationService";
import { Messages } from "../../../utils/Messages";
import { IMAGE } from "../../../assets/Images";
import { NavigationEvents } from "react-navigation";
import FastImage from "react-native-fast-image";
import Colors from "../../../assets/Colors";
import LinearGradient from "react-native-linear-gradient";
import * as globals from "../../../utils/Globals";

const TAG = "FriendDetailScreen ::=";

export class FriendDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FriendData: this.props.navigation.state.params.FriendData,
    };
  }

  componentDidMount() {}

  // Navigate to back friend list screen
  gotoback = () => {
    NavigationService.back();
  };

  render() {
    const { FriendData } = this.state;

    return (
      <>
        <View style={FriendDetailStyle.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <View style={FriendDetailStyle.halfContainer}>
            <FastImage
              style={FriendDetailStyle.imageStyle}
              source={{
                uri: FriendData.Img,
                priority: FastImage.priority.normal,
              }}
            />
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
                {FriendData.Owner_Name}
              </Text>
              <Text numberOfLines={1} style={FriendDetailStyle.titletext}>
                {FriendData.Name}
              </Text>
            </View>
            <View style={FriendDetailStyle.middleview}>
              <TouchableOpacity
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
              <TouchableOpacity
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
              <TouchableOpacity>
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
          <View style={FriendDetailStyle.secondhalfview}>
            <View style={FriendDetailStyle.descriptionContainer}>
              <Text numberOfLines={1} style={FriendDetailStyle.dectext}>
                {FriendData.Owner_Name}
              </Text>
              <ScrollView
                ref={(node) => (this.scroll = node)}
                automaticallyAdjustContentInsets={true}
                enableOnAndroid={true}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="never"
                  style={{ height: globals.deviceHeight * 0.25,}}
              >
                <Text style={FriendDetailStyle.itemtext}>
                  {StaticTitle.dummy}
                </Text>
              </ScrollView>
            </View>
          </View>
          <View style={FriendDetailStyle.bottomview}>
            <TouchableOpacity
              style={[FriendDetailStyle.bottomcircleview]}
            >
              <FastImage
                  style={[FriendDetailStyle.bottomicon]}
                  source={IMAGE.chatboxes_img}
                  tintColor={Colors.white}
                />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

// const mapStateToProps = (state) => {

// };

// const mapDispatchToProps = (dispatch) => ({
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(FriendDetailScreen);
export default FriendDetailScreen;
