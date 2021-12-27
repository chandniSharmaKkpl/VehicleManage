import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "@react-native-firebase/app";
import { Alert, DeviceEventEmitter, Linking, Platform } from "react-native";
import NavigationService from "./NavigationService";

export default class FireBase {
  constructor() {
    this.fcmToken;
    this.isFCMEnabled;

    this.alert = "no";

    this.notificationListener;
    this.notificationOpenedListener;
    this.tokenRefreshListener;
    this.messageListener;
    this.backgroundMessageListener;
  }

  logFBEvent = (title, params) => {
    firebase.analytics().logEvent(title, params);
  };

  setFCMPermission = async () => {
    if (Platform.OS === "ios") {
      const isDeviceRegisteredForRemoteMessages =
        firebase.messaging().isDeviceRegisteredForRemoteMessages;
      if (!isDeviceRegisteredForRemoteMessages) {
        firebase
          .messaging()
          .registerDeviceForRemoteMessages()
          .then(() => {
            firebase
              .messaging()
              .getAPNSToken()
              .then((token) => {
                // token not null
              });
          });
      }
    }

    const authStatus = await firebase.messaging().requestPermission();
    this.isFCMEnabled =
      authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === firebase.messaging.AuthorizationStatus.PROVISIONAL;
    if (!this.isFCMEnabled) {
      /**
       * If FCM Not Enabled - request enable permission;
       * **/
      try {
        let setPermission = await firebase
          .messaging()
          .requestPermission()
          .then(() => {
            // User has authorised
            this.isFCMEnabled = setPermission;
          })
          .catch((err) => {
            Alert.alert(
              "What's Local",
              "App needs permission for sending remote notification.\nKindly goto Settings to enable permission.",
              [
                {
                  text: "Settings",
                  onPress: () => {
                    Linking.openURL(
                      "app-settings://notification/<com.whatslocalapp>"
                    );
                  },
                },
                {
                  text: "Cancel",
                  onPress: () => {},
                },
              ],
              { cancelable: false }
            );
          });
      } catch (error) {}
    }
    return this.isFCMEnabled;
  };

  setFCMToken = async () => {
    this.fcmToken = await firebase.messaging().getToken();
    this.saveToken();
    return this.fcmToken;
  };

  async saveToken() {
    let fcmToken = this.fcmToken;
    if (fcmToken) {
      // user has a device token
      await AsyncStorage.setItem("fcmToken", fcmToken);
    }
  }

  createNotificationListeners = async (callAPI) => {
    /*
     * Triggered when a particular notification has been received in foreground
     * */

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .messaging()
      .onNotificationOpenedApp(async (remoteMessage) => {
        console.log(
          "Roadie ::::::::: onNotificationOpenedApp()----->",
          remoteMessage
        );
        const { title, body, detail } = remoteMessage.data;
        if (title !== undefined && body !== undefined && detail !== undefined) {
          DeviceEventEmitter.emit("received_push_notification", {
            title: title,
            body: body,
            detail: detail,
          });
        }
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    this.closedAppNotificationListener = firebase
      .messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          const { title, body, detail } = remoteMessage.data;
          if (
            title !== undefined &&
            body !== undefined &&
            detail !== undefined
          ) {
            DeviceEventEmitter.emit("received_push_notification", {
              title: title,
              body: body,
              detail: detail,
            });
          }
        }
      });

    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      // console.log("this.props :-->",this.props);
      const { title, body, detail } = message.data;
      if (title !== undefined && body !== undefined && detail !== undefined) {
        //this.showAlert(title, body, detail);
        DeviceEventEmitter.emit("received_push_notification", {
          title: title,
          body: body,
          detail: detail,
        });
      }
    });

    // Register background handler .setBackgroundMessageHandler
    this.backgroundMessageListener = firebase
      .messaging()
      .setBackgroundMessageHandler(async (remoteMessage) => {
        const { title, body, detail } = remoteMessage.data;
        if (title !== undefined && body !== undefined && detail !== undefined) {
          DeviceEventEmitter.emit("received_push_notification", {
            title: title,
            body: body,
            detail: detail,
          });
        }
      });

    this.tokenRefreshListener = firebase
      .messaging()
      .onTokenRefresh((newDeviceToken) => {
        callAPI(newDeviceToken);
      });
  };

  /*
  showAlert(title, body, detail) {
    if (this.alert === "yes") {
      return;
    }
    this.alert = "yes"

    Alert.alert(
      title, body,
      [
        {
          text: 'Open Now', onPress: () => {
            console.log('Open-Now Pressed.');
            this.redirectToChatDetails(detail)
            this.alert = "no";
          }
        },
        {
          text: 'Open Later', onPress: () => {
            console.log('Open-Later Pressed.');
            this.alert = "no";
          }
        },
      ],
      { cancelable: false },
    );
  }

  redirectToChatDetails (chatDetail) {
    var object = JSON.parse(chatDetail);
    console.log("redirectToChatDetails() :->",object);
    NavigationService.navigate("ChatDetails", {
      "chatMessage": object
    });
  }
  */

  clearListers() {
    this.notificationListener != undefined && this.notificationListener();
    this.notificationOpenedListener != undefined &&
      this.notificationOpenedListener();
    this.tokenRefreshListener != undefined && this.tokenRefreshListener();
    this.messageListener != undefined && this.messageListener();
    this.backgroundMessageListener != undefined &&
      this.backgroundMessageListener();
  }
}

//// OLD ->>>> https://medium.com/@anum.amin/react-native-integrating-push-notifications-using-fcm-349fff071591
// NEW --->>>> https://dev.to/botreetechnologies/how-to-implement-push-notification-with-firebase-in-react-native-2e7n
