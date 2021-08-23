import api from "../../../utils/Api";
import { SEARCH_BY_VECHICLE, UPDATE_PROFILE } from "./ActionType";

export const swicthTheme = (BaseTheme) => ({
  type: SWITCH_THEME,
  payload: {
    baseTheme: BaseTheme,
  },
});

export const searchvehicle = (params) => ({
  type: SEARCH_BY_VECHICLE,
  payload: api
    .post("api/search_by_vehicle", params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});

export const updateprofile = (params) => ({
  type: UPDATE_PROFILE,
  payload: api
    .post("api/updateProfile", params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});
