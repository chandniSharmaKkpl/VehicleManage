import api from "../../../utils/Api";
import {
  USER_LOGIN,
  USER_REGISTER,
  FORGOT_PASSWORD,
  SWITCH_THEME,
  CREATE_PROFILE,
  GET_CAR_MODEL,
} from "./ActionType";

export const swicthTheme = (BaseTheme) => ({
  type: SWITCH_THEME,
  payload: {
    baseTheme: BaseTheme,
  },
});

export const login = (params) => ({
  type: USER_LOGIN,
  payload: api
    .post("api/login", params)
    .then((res) => {
      console.log("i am in login api res", JSON.stringify(res));
      // console.log("i am in login api res ststus", JSON.stringify(res.status));
      return res;
    })
    .catch((err) => {
      console.log("i'm in catch error login", JSON.stringify(err));
      return err;
    }),
});

export const registeruser = (params) => ({
  type: USER_REGISTER,
  payload: api
    .post("api/register", params)
    .then((res) => {
      console.log("i am in api/register api res", JSON.stringify(res));
      // console.log("i am in api/register api res ststus", JSON.stringify(res.status));
      return res;
    })
    .catch((err) => {
      console.log("i'm in catch error api/register", JSON.stringify(err));
      return err;
    }),
});

export const forgotpassword = (params) => ({
  type: FORGOT_PASSWORD,
  payload: api
    .post("api/forgot", params)
    .then((res) => {
      console.log("i am in api/forgot api res", JSON.stringify(res));
      // console.log("i am in api/forgot api res ststus", JSON.stringify(res.status));
      return res;
    })
    .catch((err) => {
      console.log("i'm in catch error api/forgot", JSON.stringify(err));
      return err;
    }),
});

export const createprofile = (params) => ({
  type: CREATE_PROFILE,
  payload: api
    .post("api/createprofile1", params)
    .then((res) => {
      console.log("i am in api/createprofile1 api res", JSON.stringify(res));
      // console.log("i am in api/register api res ststus", JSON.stringify(res.status));
      return res;
    })
    .catch((err) => {
      console.log("i'm in catch error api/createprofile1", JSON.stringify(err));
      return err;
    }),
});

export const getcarmodel = (text) => ({
  
  type: GET_CAR_MODEL,
  payload: api
    .get("autoload_car_make_model?q=" + text)
    .then((res) => {
      console.warn("i am in get car model res", res);
      console.warn(
        "i am in get carmodel res ststus",
        JSON.stringify(res.status)
      );
      return res;
    })
    .catch((err) => {
      console.warn(
        "i'm in catch error get car model list",
        JSON.stringify(err)
      );
      return err;
    }),
});
