import React, { Component } from "react";
import {
  View,
  Keyboard,
  FlatList,
  TouchableWithoutFeedback,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { FriendListStyle } from "../../../assets/styles/FriendListStyle";
import { StaticTitle } from "../../../utils/StaticTitle";
import { Search } from "../../../components";
import NavigationService from "../../../utils/NavigationService";
import { IMAGE } from "../../../assets/Images";
import { NavigationEvents } from "react-navigation";
import Header from "../../../components/Header";
import { DummyData } from "../../../dummyData/DummyData";
import FastImage from "react-native-fast-image";
const TAG = "ChatListScreen ::=";

export class ChatListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatListData: DummyData,
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
          <Text
            style={[
              FriendListStyle.titleSmall,
              { color: this.state.theme.LITE_FONT_COLOR },
            ]}
          >
            {item.Name}
          </Text>
          <Text
            style={[
              FriendListStyle.titleSmall,
              { color: this.state.theme.LITE_FONT_COLOR },
            ]}
          >
            {item.Num}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => this.gotoChatDetails()}
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

  // navigate to chat screen
  gotoChatDetails = () => {
    NavigationService.navigate("ChatMessages");
  };

  // seprate component
  separatorComponent = () => {
    return <View style={FriendListStyle.separatorLine} />;
  };

  render() {
    const { chatListData } = this.state;
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
            title={StaticTitle.msges}
            isShowSidebar={true}
            theme={theme}
          />
          <Search
            theme={theme}
            blurOnSubmit={false}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            autoCapitalize={"none"}
            onChangeText={(text) =>
              this.setState({
                txtSearch: text,
              })
            }
            placeholderText={StaticTitle.searchbyNameNnum}
          />
          <FlatList
            data={chatListData}
            style={FriendListStyle.flatliststyle}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatListScreen);
// export default ChatListScreen;
