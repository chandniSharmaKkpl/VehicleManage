import api from "../../../utils/Api";
import { SEARCH_BY_VECHICLE } from "./ActionType";

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
      // console.log("response searchvehicle", res);
      return res;
    })
    .catch((err) => {
      return err;
    }),
});
