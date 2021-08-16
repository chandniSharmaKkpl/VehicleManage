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
import { Search, Header } from "../../../components";
import NavigationService from "../../../utils/NavigationService";
import { Messages } from "../../../utils/Messages";
import { IMAGE } from "../../../assets/Images";
import { NavigationEvents } from "react-navigation";
import { DummyData } from "../../../dummyData/DummyData";
import FastImage from "react-native-fast-image";

const TAG = "FriendlistScreen ::=";

export class FriendlistScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: "",
      friendListData: DummyData,
    };
  }

  componentDidMount() {}

  // clear States before leave this screen
  clearStates = () => {
    this.setState({
      txtSearch: "",
    });
  };

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
          <Text style={FriendListStyle.titleSmall}>{item.Name}</Text>
          <Text style={FriendListStyle.titleSmall}>{item.Num}</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.gotoFriendDetails(item)}
          style={FriendListStyle.squareView}
        >
          <FastImage
            style={[FriendListStyle.navigateimgStyle]}
            source={IMAGE.navigate_img}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // navigate to FriendDetails screen
  gotoFriendDetails = (item) => {
    NavigationService.navigate("FriendDetail", { FriendData: item });
  };

  // seprate component
  separatorComponent = () => {
    return <View style={FriendListStyle.separatorLine} />;
  };

  render() {
    const { friendListData } = this.state;

    return (
      <>
        <View style={FriendListStyle.container}>
          <NavigationEvents onWillBlur={() => this.clearStates()} />
          <Header title={StaticTitle.frndList} isShowSidebar={true} />
          <Search
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
            data={friendListData}
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

// const mapStateToProps = (state) => {

// };

// const mapDispatchToProps = (dispatch) => ({
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(FriendlistScreen);
export default FriendlistScreen;
