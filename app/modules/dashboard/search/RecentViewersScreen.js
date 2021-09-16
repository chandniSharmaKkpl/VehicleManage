import React, { Component } from "react";
import { View, Keyboard, FlatList, TouchableOpacity, Text } from "react-native";
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

const TAG = "RecentViewersScreen ::=";

export class RecentViewersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationListData: DummyData,
      theme: {},
    };
  }

  componentDidMount() {
    this.setState({ theme: this.props.theme });
  }

  // render friendlist dataItem
  renderFriendList = ({ item, index }) => {
    return (
      <View style={FriendListStyle.itemcell}>
        {item.Img ? (
          <View style={FriendListStyle.imageStyle}>
            <FastImage
              style={[FriendListStyle.imageStyle]}
              source={{
                uri: item.Img,
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
          <Text style={FriendListStyle.titleBig}>{item.Owner_Name}</Text>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 3,
              alignItems: "center",
            }}
          >
            <Text
              style={[
                FriendListStyle.titleSmall,
                { color: this.state.theme.LITE_FONT_COLOR },
              ]}
            >
              {item.Name}
            </Text>
            <Text style={{ marginHorizontal: 5, marginTop: -3 }}>{"|"}</Text>
            <Text
              style={[
                FriendListStyle.titleSmall,
                { color: this.state.theme.LITE_FONT_COLOR },
              ]}
            >
              {item.Num}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[
            FriendListStyle.squareView,
            { backgroundColor: this.state.theme.NAVIGATION_ARROW_COLOR },
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
  // seprate component
  separatorComponent = () => {
    return <View style={FriendListStyle.separatorLine} />;
  };

  render() {
    const { notificationListData } = this.state;
    const { isLoading, loaderMessage, theme } = this.props;
    return (
      <>
        <View
          style={[
            FriendListStyle.container,
            { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
          ]}
        >
          <Header
            isShowBack={true}
            title={StaticTitle.whosearchyou}
            theme={theme}
          />
          <FlatList
            data={notificationListData}
            style={[FriendListStyle.flatliststyle, { paddingVertical: 5 }]}
            renderItem={(item, index) => this.renderFriendList(item, index)}
            keyExtractor={(item, index) => {
              return item.Id;
            }}
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
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentViewersScreen);
