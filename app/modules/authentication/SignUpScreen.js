import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image, StatusBar, TouchableOpacity
} from 'react-native';
// Import FBSDK
import {
  LoginManager, AccessToken, GraphRequest, GraphRequestManager
} from 'react-native-fbsdk-next';
import { connect } from "react-redux";

const TAG = 'SignUpScreen ::=';

export class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail:'',
      userName:'',
      userFbId:'',
      profilePic:'',
    };
  }
  componentDidMount() {
    console.warn("i am in CDM Register screen");
  }

  

  /**
   * Method for login with facebook
   * @function performFBLogin
   */
  performFBLogin() {
    LoginManager.logOut();
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        console.log(TAG, `facebook login result : ${JSON.stringify(result)}`);
        if (result.isCancelled) {
          console.log("result.cancelable ::", JSON.stringify(result.isCancelled))
        
          // AsyncStorage.setItem(globals.FB_LOGINKEY, JSON.stringify(result.isCancelled));
        } else {
          console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
         
          console.log("result.cancelable ::", JSON.stringify(result.isCancelled))
          // AsyncStorage.setItem(globals.FB_LOGINKEY, JSON.stringify(result.isCancelled));
          AccessToken.getCurrentAccessToken()
            .then(user => {
              console.log(TAG, `user info : ${JSON.stringify(user)}`);
              return user;
            })
            .then(user => {
              const responseInfoCallback = (error, result) => {
                if (error) {
                  console.log(error);
                  alert(`Error fetching data: ${error.toString()}`);
                } else {
                  console.log(TAG, `user result : ${JSON.stringify(result)}`);
                  if (result.hasOwnProperty('email')) {
                    console.log("email===", result.email );
                    // this.setState({ userEmail: result.email });
                  } else {
                    console.log(TAG, 'email not exist in info');
                  }

                  if (result.hasOwnProperty('first_name')) {
                    console.log("first_name===", result.first_name);
                    // this.setState({ userName: result.first_name });
                  } else {
                    console.log(TAG, 'first_name not exist in info');
                  }

                  if (result.hasOwnProperty('last_name')) {
                    console.log("last_name===", result.last_name);
                  } else {
                    console.log(TAG, 'last_name not exist in info');
                  }

                  if (result.hasOwnProperty('name')) {
                    // this.setState({ userName: result.name });
                  } else {
                    console.log(TAG, 'name not exist in info');
                  }

                  if (result.hasOwnProperty('id')) {
                    // this.setState({ userFbId: result.id });
                  } else {
                    console.log(TAG, 'id not exist in info');
                  }
                }
              };

              const infoRequest = new GraphRequest(
                '/me',
                {
                  accessToken: user.accessToken,
                  parameters: {
                    fields: {
                      string: 'email,name,first_name,last_name',
                    },
                  },
                },
                responseInfoCallback
              );

              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start();
            });
        }
      },
      function (error) {
        console.log(`Login fail with error: ${error}`);
      }
    );
  }



  render() {
    const {  userName } = this.state;
    return (
      <>
        
        <SafeAreaView style={{flex: 1}}>
      <Text style={styles.titleText}>
        Example of Facebook Sign In integration in React Native
      </Text>
      <View style={styles.container}>
        
        <Text style={styles.textStyle}> {userName} </Text>
        
        <TouchableOpacity onPress={()=> this.performFBLogin()}>
        <Text style={styles.footerHeading}>
        Facebook Sign In 
      </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footerHeading}>
        Facebook Sign In integration in React Native
      </Text>
     
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
  },
  textStyle: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    padding: 10,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
