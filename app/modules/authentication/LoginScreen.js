import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,Alert,
  Image,
  ActivityIndicator,
  TouchableOpacity,StatusBar
} from 'react-native';
import FontFamily from "../../assets/styles/FontFamily";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { connect } from "react-redux";
import {WEB_CLIENT_ID} from '../../config/GoogleClientId';

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo:null,
      gettingLoginStatus:null,
    };
  }

  async componentDidMount() {
    this.configureGoogleSignIn();
    await this.getCurrentUser();
  }

  configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId:WEB_CLIENT_ID,
      androidClientId:WEB_CLIENT_ID,
      offlineAccess: true,
      forceConsentPrompt: true,
    });
  }

  async getCurrentUser() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo});
    } catch (error) {
      const errorMessage =
        error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message;
      this.setState({
        error: new Error(errorMessage),
      });
    }
  }

  _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      this.setState({ userInfo: null});
    } catch (error) {
      this.setState({
        error,
      });
    }
  };


  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // sign in was cancelled
          Alert.alert('cancelled');
          break;
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          Alert.alert('in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // android only
          Alert.alert('play services not available or outdated');
          break;
        default:
          Alert.alert('Something went wrong', error.toString());
          this.setState({
            error,
          });
      }
    }
  };
  
  render() {
    const { isLoading, loaderMessage } = this.props;
    const {userInfo} = this.state;
    return (
      <>
       
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />
           <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.titleText}>
            Example of Google Sign In in React Native
          </Text>
          <Text >
            Example of Google Sign In in React Native
          </Text>
          <View style={styles.container}>
            {userInfo !== null ? (
              <>
                <Image
                  source={{uri: userInfo.user.photo}}
                  style={styles.imageStyle}
                />
                <Text style={styles.text}>
                  Name: {userInfo.user.name}
                </Text>
                <Text style={styles.text}>
                  Email: {userInfo.user.email}
                </Text>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={this._signOut}>
                  <Text>Logout</Text>
                </TouchableOpacity>
              </>
            ) : (
              <GoogleSigninButton
                style={{width: 312, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={this._signIn}
              />
            )}
          </View>
          
        </View>
      </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    fontFamily:FontFamily.RalewayThinItalic
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
  footerHeading: {
    fontSize: 18,
    textAlign: 'center',
    color: 'grey',
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
});

const mapStateToProps = (state) => {
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
