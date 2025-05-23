import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert, DeviceEventEmitter } from "react-native";
import { BASE_URL } from "../config/BaseURL";
import NavigationService from "../utils/NavigationService";
import * as globals from "../utils/Globals";
import { showMessage, hideMessage } from "react-native-flash-message";

function makeFormDataPostHeaders() {
  let headerObj = {};
  const accessToken = globals.access_token;
  if (accessToken && accessToken != null) {
    headerObj = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      mimeType: "multipart/form-data",
    };
  }
  return headerObj;
}

function makeGetHeaders() {
  let headerObj = {};
  const getaccessToken = globals.access_token;
  if (getaccessToken && getaccessToken != null) {
    headerObj = {
      Authorization: `Bearer ${getaccessToken}`,
      Accept: "application/json",
    };
  }
  return headerObj;
}
function makeAuthPostHeaders() {
  let headerObj = {};
  headerObj = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };
  return headerObj;
}

function makeURLEncodedPostHeaders() {
  let headerObj = {};
  const accessToken = globals.access_token;
  if (accessToken && accessToken != null) {
    headerObj = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };
  }
  return headerObj;
}

const axiosApi = axios.create({
  withCredentials: true,
  baseURL: `${BASE_URL}`,
});

axiosApi.interceptors.request.use((request) => {
  if (request.method === "get") {
    request.headers = makeGetHeaders();
  } else {
    if (
      request.url === "api/login" ||
      request.url === "api/register" ||
      request.url === "api/forgot" ||
      request.url === "api/socialLoginRegister"
    ) {
      request.headers = makeAuthPostHeaders();
    } else if (
      request.url === "api/createprofileone" ||
      request.url === "api/search_by_vehicle" ||
      request.url === "api/updateProfile" ||
      request.url === "api/friend_list" ||
      request.url === "api/friend_detail" ||
      request.url === "api/add_friend" ||
      request.url === "api/init_app" ||
      request.url === "api/logout" ||
      request.url === "api/messages/list" ||
      request.url === "api/messages/details" ||
      request.url === "api/messages/insert" ||
      request.url === "api/messages/read" ||
      request.url === "api/block" ||
      request.url === "api/report" ||
      request.url === "api/friend_search" ||
      request.url === "api/messages/social_share_friends" ||
      request.url === "api/messages/social_share_send" ||
      request.url === "social_profiles/request" ||
      request.url === "api/social_profiles/approve" ||
      request.url === "api/social_profiles/deny" ||
      request.url === "api/add-user-subscription-details"
    ) {
      request.headers = makeURLEncodedPostHeaders();
    } else {
      request.headers = makeFormDataPostHeaders();
    }
    console.log("<~~~~~~~~~~~ REQUEST:::=>" + JSON.stringify(request));
  }
  return request;
});

const checkRespAndRedirect = (response) => {
  const { data } = response;
  console.log("i am in checkRespAndRedirect =>", JSON.stringify(data));
};

axiosApi.interceptors.response.use(
  (response) => {
    checkRespAndRedirect(response);
    return response;
  },
  (error) => {
    console.log("API error=====", error.response.status);
    console.log("API error=====", error.response);

    if (error.response.status === 401) {
      showMessage({
        message: "Something went wrong,Please try again!",
        type: "danger",
        icon: "danger",
        duration: 4000,
      });
      NavigationService.navigate("Login");
      return Promise.reject(error.response);
    } else if (error.response.status === 500) {
      showMessage({
        message: error.message,
        type: "danger",
        icon: "danger",
        duration: 4000,
      });
      return Promise.reject(error.response);
    } else {
      return Promise.reject(error.response.data);
    }
    // console.log("i am in axios get error", error);
    // console.log("error.response.data", error.response.data);
    // console.log("error.response.headers", error.response.headers);
    // console.log("error.response.status", error.response.status);
    // console.log("error.request", error.request);
    // console.log("ErrorErrormsg", error.message);
    // console.log("error.config", error.config);
  }
);

export default axiosApi;
