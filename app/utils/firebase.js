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
    console.log("Firebase Analytics Log....");
    console.log("title:" + title + " Param:" + JSON.stringify(params));
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
                console.log("in class's iOS APNS Token:=>" + token);
              });
          });
      }
    }

    const authStatus = await firebase.messaging().hasPermission();
    this.isFCMEnabled =
      authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === firebase.messaging.AuthorizationStatus.PROVISIONAL;

    console.log("isFCMEnabled:====>" + this.isFCMEnabled);
    if (!this.isFCMEnabled) {
      console.log("NOT have permission... request for permission()");
      /**
       * If FCM Not Enabled - request enable permission;
       * **/
      try {
        let setPermission = await firebase
          .messaging()
          .requestPermission()
          .then(() => {
            // User has authorised
            console.log("now the FCM Enabled", setPermission);
            this.isFCMEnabled = setPermission;
          })
          .catch((err) => {
            Alert.alert(
              "Roadie",
              "App needs permission for sending remote notification.\nKindly goto Settings to enable permission.",
              [
                {
                  text: "Settings",
                  onPress: () => {
                    console.log("Settings Pressed");
                    // Linking.openURL('app-settings://notification/${com.Fleurieu}');
                    // Linking.openURL('app-settings://notification/<com.whatslocalapp>')
                    Linking.openURL("app-settings:");
                  },
                },
                {
                  text: "Cancel",
                  onPress: () => {
                    console.log("User have pressed cancel.");
                  },
                },
              ],
              { cancelable: false }
            );
            console.log("Error requestPermission  ()=>", err);
          });
      } catch (error) {
        console.log("Error in APNS permission=>", error);
      }
    } else {
      console.log("isFCMEnabled is TRUE");
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
      console.log("Device TOKEN ======>" + fcmToken);
      // user has a device token
      await AsyncStorage.setItem("fcmToken", fcmToken);
    }
  }

  createNotificationListeners = async (callAPI) => {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    // this.notificationListener = firebase.notifications().onNotification((notification) => {
    //   console.log("onNotification()----->");
    //   const { title, body } = notification.data;
    //   this.showAlert(title, body);
    //   console.log("onNotification()----->", notification);
    // });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .messaging()
      .onNotificationOpenedApp(async (remoteMessage) => {
        // alert("Background Push Notification opened");
        console.log(
          "CochPad ::::::::: onNotificationOpenedApp()----->",
          remoteMessage
        );
        const { title, body, detail } = remoteMessage.data;
        if (title !== undefined && body !== undefined && detail !== undefined) {
          DeviceEventEmitter.emit("received_push_notification", {
            title: title,
            body: body,
            detail: detail,
          });
          // this.showAlert(title, body, detail);
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
          // alert("App Closed Push Notification opened");
          console.log(
            "CochPad ::::::::: getInitialNotification()----->",
            remoteMessage
          );
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
            // this.showAlert(title, body, detail);
          }
        }
      });

    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message

      // const {nav} = this.props;
      // const currentScreen = nav.routes[nav.routes.length - 1].routeName;
      console.log("Roadie::::::::: onMessage()----->", message);
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
        console.log("Message handled in the background!", remoteMessage);
        const { title, body, detail } = remoteMessage.data;
        if (title !== undefined && body !== undefined && detail !== undefined) {
          // this.showAlert(title, body, detail);
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
        console.log(
          "CochPad ::::::::: <=============: New Device Token :=============>",
          newDeviceToken
        );

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
