import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert, DeviceEventEmitter } from "react-native";
import { BASE_URL } from "../config/BaseURL";
import NavigationService from "../utils/NavigationService";
import * as globals from "../utils/Globals";
import { showMessage, hideMessage } from "react-native-flash-message";

function makeFormDataPostHeaders() {
  // console.log("I am in makePostHeaders()");
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
  // console.log("I am in makeGetHeaders()");
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

function makeURLencodedPostHeaders() {
  // console.warn("I am in makeURLencodedPostHeaders()");
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
    console.warn("i am in url else", request.url);
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
      request.url === "api/friend_search"
    ) {
      request.headers = makeURLencodedPostHeaders();
    } else {
      request.headers = makeFormDataPostHeaders();
    }
  }
  // console.log("<~~~~~~~~~~~ REQUEST:::=>" + JSON.stringify(request));
  return request;
});

const checkRespAndRedirect = (response) => {
  const { data } = response;
  // console.log("i am in checkRespAndRedirect =>", JSON.stringify(data));
};

axiosApi.interceptors.response.use(
  (response) => {
    checkRespAndRedirect(response);
    return response;
  },
  (error) => {
    console.log("API error=====", error);
    return Promise.reject(error.response.data);

    // if (error.response.status === 401) {
    //   return Promise.reject(error.response);
    // } else if (error.response.status === 402) {
    //   showMessage({
    //     message: error.response.data.error,
    //     type: "danger",
    //     icon: "danger",
    //     duration: 4000,
    //   });
    //   AsyncStorage.clear();
    //   NavigationService.reset("Login");
    // }
    // else {
    //   // showMessage({
    //   //   message: "Device offline",
    //   //   type: "danger",
    //   //   icon: "danger",
    //   //   duration: 10000,
    //   // });
    // }
    // console.log("i am in axios get error", error);
    // console.log("error.response.data", error.response.data);
    // console.log("error.response.headers", error.response.headers);
    // console.log("error.response.status", error.response.status);
    // console.log("error.request", error.request);
    // console.log("ErrorErrormsg", error.message);
    // console.log("error.config", error.config);
    // return Promise.reject(error.response);
  }
);

export default axiosApi;
