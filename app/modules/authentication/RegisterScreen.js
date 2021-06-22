import React, { Component } from "react";
import {
  ImageBackground,
  Text,
  View,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { darkTheme, lightTheme } from '../../assets/Theme';
import { connect } from "react-redux";


export class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: {}
    };
  }

  UNSAFE_componentWillReceiveProps = (newProps) => {
    const { theme } = newProps;
    this.parseData(theme);
  }

  parseData = (newTheme) => {
      this.setState({ theme: newTheme });
  }

  componentDidMount = async () => {
    let them_mode = await AsyncStorage.getItem('them_mode');
    var newTheme = lightTheme;
    if (them_mode === THEME_MODE.DARK) {
      newTheme = darkTheme;
    }
    this.setState({ theme: them_mode });
    this.props.swicthTheme(newTheme);
  }

 

  render() {
    const { theme } = this.props;
    return (
      <>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <View style={{flex:1,
            alignItems:"center", justifyContent:'center'}}>
              <Text>Register</Text>
          </View>
        
      </>
    );
  }
}

const mapStateToProps = (state) => {
  theme :state.auth.theme
}; 

const mapDispatchToProps = (dispatch) => ({
  swicthTheme: (params) => dispatch(actions.swicthTheme(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
