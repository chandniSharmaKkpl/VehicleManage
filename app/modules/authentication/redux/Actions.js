import api from "../../../utils/Api";
import {
  USER_LOGIN,
  USER_REGISTER,
  FORGOT_PASSWORD,
  SWITCH_THEME,
  CREATE_PROFILE,
  GET_CAR_MODEL,
  GET_CAR_COLOUR,
  GET_CITY,
  SOCIAL_LOGIN,
  CREATE_SOCIAL_PROFILE,
  REGISTER_DETAIL,
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
      return res;
    })
    .catch((err) => {
      return err;
    }),
});

export const registeruser = (params) => ({
  type: USER_REGISTER,
  payload: api
    .post("api/register", params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});

export const forgotpassword = (params) => ({
  type: FORGOT_PASSWORD,
  payload: api
    .post("api/forgot", params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});

export const createprofile = (params) => ({
  type: CREATE_PROFILE,
  payload: api
    .post("api/createprofileone", params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});

export const createSocialprofile = (params) => ({
  type: CREATE_SOCIAL_PROFILE,
  payload: api
    .post("api/createprofiletwo", params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});

export const registerdetail = (params) => ({
  type: REGISTER_DETAIL,
  payload: api
    .post("api/register_detail", params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});


export const getcarmodel = () => ({
  type: GET_CAR_MODEL,
  payload: api
    .get("api/autoload_car_make_model")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});

export const getcarcolour = () => ({
  type: GET_CAR_COLOUR,
  payload: api
    .get("api/autoload_car_colour")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});

export const getcity = () => ({
  type: GET_CITY,
  payload: api
    .get("api/autoload_city")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});

export const sociallogin = (params) => ({
  type: SOCIAL_LOGIN,
  payload: api
    .post("api/socialLoginRegister", params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});
