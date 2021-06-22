import api from "../../../utils/Api";
import {
  USER_LOGIN,
  USER_REGISTER,
  FORGOT_PASSWORD,
  VERIFY_USER,
  SWITCH_THEME
} from "./ActionType";


export const swicthTheme = (BaseTheme) => ({
  type: SWITCH_THEME,
  payload: {
    baseTheme: BaseTheme
  }
})