import React from "react";
import { View, TextInput, TouchableWithoutFeedback, Text } from "react-native";
import Colors from "../assets/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ComponentStyle } from "../assets/styles/ComponentStyle";
import { renderIf } from "../utils/Globals";

const PasswordInput = ({
  isShowPassword,
  isVisible,
  placeholderText,
  onPasswordShow,
  secureTextEntry,
  forwardRef,
  onSubmitEditing,
  blurOnSubmit,
  onChangeText,
  value,
  isValidationShow,
  validateMesssage,
  iconName,
  Style,
  keyboardType,
  placeholderStyle,
  theme,
  ...props
}) => {
  return (
    <View>
      <View {...props} style={[ComponentStyle.passwordInputContainer]}>
        <TextInput
          value={value}
          style={[
            ComponentStyle.passwordInputText,
            { borderColor: isValidationShow ? Colors.red : Colors.white },
          ]}
          placeholderTextColor={theme.LITE_FONT_COLOR}
          ref={forwardRef}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry}
          minLength={6}
          autoCapitalize="none"
          placeholder={placeholderText}
          returnKeyType={"next"}
          blurOnSubmit={blurOnSubmit}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholderStyle={placeholderStyle}
          underlineColorAndroid="transparent"
          {...props}
        />
        <TouchableWithoutFeedback onPress={onPasswordShow}>
          <View
            style={[
              ComponentStyle.eyeContainer,
              { borderColor: isValidationShow ? Colors.red : Colors.white },
            ]}
          >
            <View style={{ marginRight: 15 }}>
              <Icon
                name={isVisible ? "eye-slash" : "eye"}
                size={18}
                color={isVisible ? Colors.placeholderColor : Colors.black}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {renderIf(
        isValidationShow,
        <Text style={[ComponentStyle.errorText]}>{validateMesssage}</Text>
      )}
    </View>
  );
};

export default PasswordInput;
