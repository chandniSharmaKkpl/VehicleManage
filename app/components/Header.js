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

const Header = ({
  headerStyle,
  title,
  onPress,
  isShowBack,
  isShowSidebar,
  ...props
}) => {
  return (
    <SafeAreaView style={ComponentStyle.headerContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.primary}
      />

      <View
        style={[
          ComponentStyle.headerContain,
          {
            justifyContent: isShowBack
              ? "space-between"
              : isShowSidebar
              ? "flex-end"
              : "center",
          },
        ]}
      >
        {renderIf(
          isShowBack,
          <TouchableOpacity onPress={onPress} style={{}}>
            <View style={{ paddingLeft: 20, padding: 5 }}>
              <FastImage
                style={[ComponentStyle.tab_Image]}
                source={IMAGE.backArrow}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          </TouchableOpacity>
        )}

        <View>
          <Text style={ComponentStyle.titleText}>{title}</Text>
        </View>
        {renderIf(
          isShowBack,
          <View>
            <Text style={{ paddingRight: 20 }}></Text>
          </View>
        )}
        {renderIf(
          isShowSidebar,
          <TouchableOpacity onPress={onPress} style={{}}>
            <View
              style={{
                paddingRight: 20,
                
              }}
            >
              <FastImage
                style={[ComponentStyle.tab_Image]}
                source={IMAGE.sidebar_img}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          </TouchableOpacity>
        )}
        {renderIf(
          isShowSidebar,
          <TouchableOpacity onPress={onPress} style={{}}>
            <View style={{ paddingRight: 20,}}>
              <FastImage
                style={[ComponentStyle.tab_Image]}
                source={IMAGE.sidebar_img}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Header;
