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
import { connect } from "react-redux";


export class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    console.warn("i am in CDM Register screen");
  }
 

  render() {
    const { isLoading, loaderMessage } = this.props;
    return (
      <>
        
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <View style={{flex:1, alignItems:"center", justifyContent:'center'}}>
              <Text>Register</Text>
          </View>
        
      </>
    );
  }
}

const mapStateToProps = (state) => {

};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
