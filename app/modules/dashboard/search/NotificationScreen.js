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
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const TAG = "NotificationScreen ::=";

export class NotificationScreen extends Component {
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

  gotoRecentViewers = () => {
    NavigationService.navigate("RecentViewers");
  };

  // render friendlist dataItem
  renderFriendList = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        style={FriendListStyle.itemcell}
        onPress={() => this.gotoRecentViewers()}
      >
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
        <Text
          numberOfLines={2}
          style={[
            FriendListStyle.notificationtext,
            { color: this.state.theme.LITE_FONT_COLOR },
          ]}
        >
          {item.NData}
        </Text>
      </TouchableWithoutFeedback>
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
            title={StaticTitle.notification}
            onPressed={()=>this.props.navigation.openDrawer()}
            isShowSidebar={true}
            isFrom={"Notification"}
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

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
