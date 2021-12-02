import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar,
  Platform,
  SafeAreaView,
} from "react-native";
import Colors from "../assets/Colors";
import { ComponentStyle } from "../assets/styles/ComponentStyle";
import { isTablat, renderIf } from "../utils/Globals";
import FastImage from "react-native-fast-image";
import { IMAGE } from "../assets/Images";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import NavigationService from "../utils/NavigationService";
import Icon from "react-native-vector-icons/AntDesign";

const Header = ({
  theme,
  headerStyle,
  title,
  onPress,
  isShowBack,
  isShowRighttwo,
  isShowSidebar,
  isFrom,
  onPressed,
  countDeatils,
  total_count,
  ...props
}) => {
  const gotoBack = async () => {
    NavigationService.back();
  };
  const gotoNotification = async () => {
    NavigationService.navigate("Notification", {
      countDeatils: countDeatils,
    });
  };

  return (
    <SafeAreaView
      style={[
        ComponentStyle.headerContainer,
        { backgroundColor: theme.ANDROID_STATUR_BAR_COLOR },
      ]}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.ANDROID_STATUR_BAR_COLOR}
      />

      <View
        style={[
          ComponentStyle.headerContain,
          {
            justifyContent: "space-between",
          },
        ]}
      >
        {isShowBack == true ? (
          <TouchableOpacity
            onPress={gotoBack}
            style={{ width: wp(15), justifyContent: "center" }}
          >
            <View style={{ paddingLeft: 20, padding: 5 }}>
              <FastImage
                style={[ComponentStyle.tab_Image]}
                source={IMAGE.backArrow}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              width: wp(3),
              height: wp(4),
              marginLeft: 15,
              marginRight: 15,
            }}
          />
        )}

        <View
          style={{
            width: isShowRighttwo == true ? wp(55) : wp(70),
            alignItems: "center",
          }}
        >
          <Text style={ComponentStyle.titleText}>{title}</Text>
        </View>

        {isShowRighttwo == true ? (
          <>
            <TouchableOpacity
              onPress={gotoNotification}
              style={{
                width: wp(5),
                marginLeft: 35,
                height: hp(5),
                padding: 5,
                justifyContent: "center",
              }}
            >
              <FastImage
                style={{
                  width: wp(5.5),
                  height: wp(5.5),
                }}
                source={IMAGE.notification_img}
                resizeMode={FastImage.resizeMode.contain}
              ></FastImage>

              {total_count == "0" || total_count == null? null : (
                <View style={ComponentStyle.countcircleview}>
                  <Text style={ComponentStyle.messagescountstyle}>
                    {total_count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: wp(5),
                height: hp(5),
                marginLeft: 35,
                marginRight: 15,
                padding: 5,
                justifyContent: "center",
              }}
              onPress={onPressed}
            >
              <FastImage
                style={{
                  width: wp(5.5),
                  height: wp(5.5),
                }}
                source={IMAGE.sidebar_img}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          </>
        ) : (
          <View style={{}} />
        )}

        {isShowSidebar == true ? (
          <TouchableOpacity
            onPress={onPressed}
            style={{ width: wp(15), height: hp(5), justifyContent: "center" }}
          >
            <FastImage
              style={{
                width: isFrom == "ShareSocial" ? wp(6) : wp(5.5),
                height: isFrom == "ShareSocial" ? wp(6) : wp(5.5),
                marginLeft: 15,
                marginRight: 20,
              }}
              source={
                isFrom == "Notification"
                  ? IMAGE.notification_img
                  : isFrom == "ShareSocial"
                  ? IMAGE.next_img
                  : IMAGE.sidebar_img
              }
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              width: wp(4),
              height: wp(4),
              marginLeft: 15,
              marginRight: 20,
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
export default Header;
