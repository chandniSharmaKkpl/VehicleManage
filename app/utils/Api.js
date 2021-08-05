import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert, DeviceEventEmitter } from "react-native";
import { BASE_URL } from "../config/BaseURL";
import NavigationService from "../utils/NavigationService";

function makeFormDataPostHeaders() {
  // console.log("I am in makePostHeaders()");
  let headerObj = {};
  // const accessToken = await AsyncStorage.getItem("access_token");
  // console.log("i am saved access token", accessToken);
  const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMGQ4MWQ2Mzg1Y2ExMDI5NDE1Y2NiNjQ0MTIwNTg4MTM3N2MzNGEyOTc0NTVmZjllNDU0OWEzZDUzMTQxMWFlZDQyMmU3YTc0MTVkNjY3MjQiLCJpYXQiOjE2MjA5Nzg2OTMuMjg4Mjk1LCJuYmYiOjE2MjA5Nzg2OTMuMjg4Mjk5LCJleHAiOjE2NTI1MTQ2OTMuMjUxNjYyLCJzdWIiOiIyMCIsInNjb3BlcyI6WyIqIl19.oLiU9wWmtfrst11dqpUICsGFuDUDsMdsX9tbUSJvZ2aBa_xDShLH8wSVRQtcraCy6yNx7KXsWd6Uyv8C4GK1_ww_h30j_JS-VWtXaHYp27BcsxZdor5ddYLBHdXu9DkldrcWxkLRAPDx87N36CWqlt_LiCV7OwOthimrbNevuie2Hoa6YHWUcFk-zGDfUszF64fYJi4YBt2Rphs_LRPxghuNVFYHtVibkkNz26malm6klMseA4E01yRcUdaE8HH62qNI2v07tEod4IJOoOZ-y8vBh8cdnaQDUtCTgYHt_PJNh9r95PH48Qir2zInkjXHHjAeqxOcZLsxTD-8ILaEXkYE2-8gklMvs9rhAp-uPYzrYScJ3sph1xY39ifmWNQ_PgRxVzBNZHR2eTfJjJEgiC8_6atHX4ZYv0-8N1V7P-loE_7WsoU5GA8oEqhCjZ9fdOyPsvH1AFHt8CU8ONwOxJLzgHxGoArUI-ugUHG1mOtZhNq_xr_6EFfbvyf8RzYH_FHCH8iw4n1RA5-74YlkOAdMMvURmStKtlrIIs1jlKbNYSL5N1ybTvO_B3Eki-RqWHaxZvIAqApYfR52a5Lbw9we2z43xeLlTXUHUISWOSpXoXeJPwuxZacmVcAy94NNYOA4Pjezj3hbtAW8rKQLL3xEu4ahyxuDO4ujL_oHeiA`;
  headerObj = {
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMGQ4MWQ2Mzg1Y2ExMDI5NDE1Y2NiNjQ0MTIwNTg4MTM3N2MzNGEyOTc0NTVmZjllNDU0OWEzZDUzMTQxMWFlZDQyMmU3YTc0MTVkNjY3MjQiLCJpYXQiOjE2MjA5Nzg2OTMuMjg4Mjk1LCJuYmYiOjE2MjA5Nzg2OTMuMjg4Mjk5LCJleHAiOjE2NTI1MTQ2OTMuMjUxNjYyLCJzdWIiOiIyMCIsInNjb3BlcyI6WyIqIl19.oLiU9wWmtfrst11dqpUICsGFuDUDsMdsX9tbUSJvZ2aBa_xDShLH8wSVRQtcraCy6yNx7KXsWd6Uyv8C4GK1_ww_h30j_JS-VWtXaHYp27BcsxZdor5ddYLBHdXu9DkldrcWxkLRAPDx87N36CWqlt_LiCV7OwOthimrbNevuie2Hoa6YHWUcFk-zGDfUszF64fYJi4YBt2Rphs_LRPxghuNVFYHtVibkkNz26malm6klMseA4E01yRcUdaE8HH62qNI2v07tEod4IJOoOZ-y8vBh8cdnaQDUtCTgYHt_PJNh9r95PH48Qir2zInkjXHHjAeqxOcZLsxTD-8ILaEXkYE2-8gklMvs9rhAp-uPYzrYScJ3sph1xY39ifmWNQ_PgRxVzBNZHR2eTfJjJEgiC8_6atHX4ZYv0-8N1V7P-loE_7WsoU5GA8oEqhCjZ9fdOyPsvH1AFHt8CU8ONwOxJLzgHxGoArUI-ugUHG1mOtZhNq_xr_6EFfbvyf8RzYH_FHCH8iw4n1RA5-74YlkOAdMMvURmStKtlrIIs1jlKbNYSL5N1ybTvO_B3Eki-RqWHaxZvIAqApYfR52a5Lbw9we2z43xeLlTXUHUISWOSpXoXeJPwuxZacmVcAy94NNYOA4Pjezj3hbtAW8rKQLL3xEu4ahyxuDO4ujL_oHeiA`,
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    mimeType: "multipart/form-data",
  };
  return headerObj;
}

function makeGetHeaders() {
  // console.log("I am in makeGetHeaders()");
  let headerObj = {};
  const accessToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMGQ4MWQ2Mzg1Y2ExMDI5NDE1Y2NiNjQ0MTIwNTg4MTM3N2MzNGEyOTc0NTVmZjllNDU0OWEzZDUzMTQxMWFlZDQyMmU3YTc0MTVkNjY3MjQiLCJpYXQiOjE2MjA5Nzg2OTMuMjg4Mjk1LCJuYmYiOjE2MjA5Nzg2OTMuMjg4Mjk5LCJleHAiOjE2NTI1MTQ2OTMuMjUxNjYyLCJzdWIiOiIyMCIsInNjb3BlcyI6WyIqIl19.oLiU9wWmtfrst11dqpUICsGFuDUDsMdsX9tbUSJvZ2aBa_xDShLH8wSVRQtcraCy6yNx7KXsWd6Uyv8C4GK1_ww_h30j_JS-VWtXaHYp27BcsxZdor5ddYLBHdXu9DkldrcWxkLRAPDx87N36CWqlt_LiCV7OwOthimrbNevuie2Hoa6YHWUcFk-zGDfUszF64fYJi4YBt2Rphs_LRPxghuNVFYHtVibkkNz26malm6klMseA4E01yRcUdaE8HH62qNI2v07tEod4IJOoOZ-y8vBh8cdnaQDUtCTgYHt_PJNh9r95PH48Qir2zInkjXHHjAeqxOcZLsxTD-8ILaEXkYE2-8gklMvs9rhAp-uPYzrYScJ3sph1xY39ifmWNQ_PgRxVzBNZHR2eTfJjJEgiC8_6atHX4ZYv0-8N1V7P-loE_7WsoU5GA8oEqhCjZ9fdOyPsvH1AFHt8CU8ONwOxJLzgHxGoArUI-ugUHG1mOtZhNq_xr_6EFfbvyf8RzYH_FHCH8iw4n1RA5-74YlkOAdMMvURmStKtlrIIs1jlKbNYSL5N1ybTvO_B3Eki-RqWHaxZvIAqApYfR52a5Lbw9we2z43xeLlTXUHUISWOSpXoXeJPwuxZacmVcAy94NNYOA4Pjezj3hbtAW8rKQLL3xEu4ahyxuDO4ujL_oHeiA"; //global.access_token;
  console.log("i am saved access token ==>", accessToken);
  headerObj = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "text/plain",
    mimeType: "text/plain",
  };
  return headerObj;
}
function makeAuthPostHeaders() {
  // console.warn("I am in makeAuthPostHeaders()");
  let headerObj = {};
  // const accessToken = await AsyncStorage.getItem("access_token");
  // console.warn("i am saved access token", accessToken);
  headerObj = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };
  return headerObj;
}

function makeURLencodedPostHeaders() {
  // console.warn("I am in makeURLencodedPostHeaders()");
  let headerObj = {};
  // const accessToken = await AsyncStorage.getItem("access_token");
  // console.warn("i am saved access token", accessToken);
  const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMGQ4MWQ2Mzg1Y2ExMDI5NDE1Y2NiNjQ0MTIwNTg4MTM3N2MzNGEyOTc0NTVmZjllNDU0OWEzZDUzMTQxMWFlZDQyMmU3YTc0MTVkNjY3MjQiLCJpYXQiOjE2MjA5Nzg2OTMuMjg4Mjk1LCJuYmYiOjE2MjA5Nzg2OTMuMjg4Mjk5LCJleHAiOjE2NTI1MTQ2OTMuMjUxNjYyLCJzdWIiOiIyMCIsInNjb3BlcyI6WyIqIl19.oLiU9wWmtfrst11dqpUICsGFuDUDsMdsX9tbUSJvZ2aBa_xDShLH8wSVRQtcraCy6yNx7KXsWd6Uyv8C4GK1_ww_h30j_JS-VWtXaHYp27BcsxZdor5ddYLBHdXu9DkldrcWxkLRAPDx87N36CWqlt_LiCV7OwOthimrbNevuie2Hoa6YHWUcFk-zGDfUszF64fYJi4YBt2Rphs_LRPxghuNVFYHtVibkkNz26malm6klMseA4E01yRcUdaE8HH62qNI2v07tEod4IJOoOZ-y8vBh8cdnaQDUtCTgYHt_PJNh9r95PH48Qir2zInkjXHHjAeqxOcZLsxTD-8ILaEXkYE2-8gklMvs9rhAp-uPYzrYScJ3sph1xY39ifmWNQ_PgRxVzBNZHR2eTfJjJEgiC8_6atHX4ZYv0-8N1V7P-loE_7WsoU5GA8oEqhCjZ9fdOyPsvH1AFHt8CU8ONwOxJLzgHxGoArUI-ugUHG1mOtZhNq_xr_6EFfbvyf8RzYH_FHCH8iw4n1RA5-74YlkOAdMMvURmStKtlrIIs1jlKbNYSL5N1ybTvO_B3Eki-RqWHaxZvIAqApYfR52a5Lbw9we2z43xeLlTXUHUISWOSpXoXeJPwuxZacmVcAy94NNYOA4Pjezj3hbtAW8rKQLL3xEu4ahyxuDO4ujL_oHeiA`;
  headerObj = {
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMGQ4MWQ2Mzg1Y2ExMDI5NDE1Y2NiNjQ0MTIwNTg4MTM3N2MzNGEyOTc0NTVmZjllNDU0OWEzZDUzMTQxMWFlZDQyMmU3YTc0MTVkNjY3MjQiLCJpYXQiOjE2MjA5Nzg2OTMuMjg4Mjk1LCJuYmYiOjE2MjA5Nzg2OTMuMjg4Mjk5LCJleHAiOjE2NTI1MTQ2OTMuMjUxNjYyLCJzdWIiOiIyMCIsInNjb3BlcyI6WyIqIl19.oLiU9wWmtfrst11dqpUICsGFuDUDsMdsX9tbUSJvZ2aBa_xDShLH8wSVRQtcraCy6yNx7KXsWd6Uyv8C4GK1_ww_h30j_JS-VWtXaHYp27BcsxZdor5ddYLBHdXu9DkldrcWxkLRAPDx87N36CWqlt_LiCV7OwOthimrbNevuie2Hoa6YHWUcFk-zGDfUszF64fYJi4YBt2Rphs_LRPxghuNVFYHtVibkkNz26malm6klMseA4E01yRcUdaE8HH62qNI2v07tEod4IJOoOZ-y8vBh8cdnaQDUtCTgYHt_PJNh9r95PH48Qir2zInkjXHHjAeqxOcZLsxTD-8ILaEXkYE2-8gklMvs9rhAp-uPYzrYScJ3sph1xY39ifmWNQ_PgRxVzBNZHR2eTfJjJEgiC8_6atHX4ZYv0-8N1V7P-loE_7WsoU5GA8oEqhCjZ9fdOyPsvH1AFHt8CU8ONwOxJLzgHxGoArUI-ugUHG1mOtZhNq_xr_6EFfbvyf8RzYH_FHCH8iw4n1RA5-74YlkOAdMMvURmStKtlrIIs1jlKbNYSL5N1ybTvO_B3Eki-RqWHaxZvIAqApYfR52a5Lbw9we2z43xeLlTXUHUISWOSpXoXeJPwuxZacmVcAy94NNYOA4Pjezj3hbtAW8rKQLL3xEu4ahyxuDO4ujL_oHeiA`,
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };
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
    if (request.url === "api/login" || request.url === "api/register" || request.url === "api/forgot") {
      request.headers = makeAuthPostHeaders();
    } else if (
      request.url === "client-detail" ||
      request.url === "horse-detail" ||
      request.url === "book-appointment"
    ) {
      request.headers = makeURLencodedPostHeaders();
    } else {
      request.headers = makeFormDataPostHeaders();
    }
  }
  console.log("<~~~~~~~~~~~ REQUEST:::=>" + JSON.stringify(request));
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
    // console.log("i am in axios get error", error);
    console.log("error.response.data", error.response.data);
    // console.log("error.response.headers", error.response.headers);
    // console.log("error.response.status", error.response.status);
    // console.log("error.request", error.request);
    // console.log("ErrorErrormsg", error.message);
    // console.log("error.config", error.config);

    // try {
    //   showMessage({
    //     // message:
    //     //   err.response.data.message === undefined
    //     //     ? err.response.data.message
    //     //     : "Your credentials are incorrect. Please try again",
    //     message: "Your credentials are incorrect. Please try again",
    //     type: "danger",
    //     icon: "danger",
    //   });
    // } catch (e) {
    //   console.log("i am in catch");
    //   // showMessage({
    //   //   message: err.response.data.message,
    //   //   type: "danger",
    //   //   icon: "danger",
    //   // });
    // }
    // // Alert.alert("EPH", "This Application Require Network Connection!");
    // if (err.response && err.response.status === 401) {
    //   // if you don't return here, then an error will be thrown and you will see a loader infinitely
    //   return true;
    // }
    // if (err.response && err.response.status === 500) {
    // }
    return Promise.reject(error.response.data);
  }
);

export default axiosApi;
