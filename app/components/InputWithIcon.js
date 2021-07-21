import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import Colors from "../assets/Colors";
import { ComponentStyle } from "../assets/styles/ComponentStyle";
import { renderIf } from "../utils/Globals";
import FastImage from "react-native-fast-image";

const InputWithIcon = ({
  placeholderText,
  onPressIcon,
  secureTextEntry,
  forwardRef,
  onSubmitEditing,
  blurOnSubmit,
  onChangeText,
  value,
  isValidationShow,
  validateMesssage,
  iconName,
  editable,
  inputStyle,
  ...props
}) => {
  return (
    <View>
      <View {...props} style={[ComponentStyle.passwordInputContainer]}>
        <TextInput
          value={value}
          style={[
            ComponentStyle.iconInputText,
            inputStyle,
            { borderColor: isValidationShow ? Colors.red : Colors.white },
          ]}
          placeholderTextColor={Colors.labelPrimary}
          ref={forwardRef}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          placeholder={placeholderText}
          returnKeyType={"next"}
          blurOnSubmit={blurOnSubmit}
          onChangeText={onChangeText}
          editable={editable}
        />
        <TouchableOpacity onPress={onPressIcon}>
          <View
            style={[
              ComponentStyle.inputIconContainer,
              { borderColor: isValidationShow ? Colors.red : Colors.white },
            ]}
          >
            <View style={{ marginRight: 15 }}>
              <FastImage
                style={[ComponentStyle.tabImage]}
                source={iconName}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {renderIf(
        isValidationShow,
        <Text style={[ComponentStyle.errorText]}>{validateMesssage}</Text>
      )}
    </View>
  );
};

export default InputWithIcon;
