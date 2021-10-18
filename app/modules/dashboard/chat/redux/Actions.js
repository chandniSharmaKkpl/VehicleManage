import api from "../../../../utils/Api";
import { MESSAGES_LIST } from "./ActionType";

export const swicthTheme = (BaseTheme) => ({
  type: SWITCH_THEME,
  payload: {
    baseTheme: BaseTheme,
  },
});

export const messagesList = (params) => ({
  type: MESSAGES_LIST,
  payload: api
    .post("api/messages/list", params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});
