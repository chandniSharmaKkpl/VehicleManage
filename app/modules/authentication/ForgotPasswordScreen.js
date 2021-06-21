import React, { Component } from "react";
import {
  ImageBackground,
  Text,
  View,
  Keyboard,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { connect } from "react-redux";


export class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
   
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
          <View style={{flex:1, backgroundColor:'red'}}></View>
      </>
    );
  }
}

const mapStateToProps = (state) => {

};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordScreen);
