import api from "../../../utils/Api";
import {
  USER_LOGIN,
  USER_REGISTER,
  FORGOT_PASSWORD,
  VERIFY_USER,
  SWITCH_THEME,
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
