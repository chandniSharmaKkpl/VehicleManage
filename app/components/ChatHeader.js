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
import { ComponentStyle } from "../assets/styles/ComponentStyle";
import FastImage from "react-native-fast-image";
import { IMAGE } from "../assets/Images";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import NavigationService from "../utils/NavigationService";
import * as globals from "../utils/Globals";

const ChatHeader = ({
  theme,
  headerStyle,
  title,
  onPress,
  isShowBack,
  isShowRighttwo,
  isShowSidebar,
  isFrom,
  isMsgReportPicker,
  isuserImage,
  isShareSocials,
  ...props
}) => {
  const gotoBack = async () => {
    NavigationService.back();
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
            style={{ width: wp(15), height: hp(5), justifyContent: "center" }}
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
            flexDirection: "row",
          }}
        >
          <View style={ComponentStyle.circleview}>
            {isuserImage ? (
              <FastImage
                style={[ComponentStyle.roundedtab_img]}
                source={{
                  uri: isuserImage,
                }}
              />
            ) : (
              <FastImage source={IMAGE.user} style={ComponentStyle.tab_Image} />
            )}
          </View>

          <Text
            numberOfLines={1}
            style={[
              ComponentStyle.titleText,
              {
                alignSelf: "center",
                marginLeft: 10,
                width: globals.deviceWidth * 0.4,
              },
            ]}
          >
            {title}
          </Text>
        </View>
        {isShowRighttwo == true ? (
          <>
            <TouchableOpacity
              onPress={isShareSocials}
              style={{
                width: wp(5),
                marginLeft: 25,
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
                source={IMAGE.share_arrow_img}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: wp(5),
                height: hp(5),
                marginLeft: 20,
                marginRight: 15,
                padding: 5,
                justifyContent: "center",
              }}
              onPress={isMsgReportPicker}
            >
              <FastImage
                style={{
                  width: wp(5.5),
                  height: wp(5.5),
                }}
                source={IMAGE.info_button_img}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          </>
        ) : (
          <View style={{}} />
        )}

        <View
          style={{
            width: wp(4),
            height: wp(4),
            marginLeft: 15,
            marginRight: 20,
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default ChatHeader;
