import api from "../../../utils/Api";
import {
  SEARCH_BY_VECHICLE,
  UPDATE_PROFILE,
  GET_FRIEND_LIST,
  GET_FRIEND_DETAILS,
  ADD_FRIEND,
  LOGOUT,
  UPDATE_SETTINGS,
  NOTIFICATION_COUNT,
  SEARCH_FRIEND,WHO_SEARCH_YOU, SWITCH_THEME
} from "./ActionType";

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

export const getfriendlist = (params) => ({
  type: GET_FRIEND_LIST,
  payload: api
    .post("api/friend_list", params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});
export const getfriendDetails = (params) => ({
  type: GET_FRIEND_DETAILS,
  payload: api
    .post("api/friend_detail", params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});
export const addfriend = (params) => ({
  type: ADD_FRIEND,
  payload: api
    .post("api/add_friend", params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});
export const logout = (params) => ({
  type: LOGOUT,
  payload: api
    .post("api/logout", params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});
export const updateUserSettings = (params) => ({
  type: UPDATE_SETTINGS,
  payload: api
    .post("api/updateUserSettings", params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});

export const notificationCount = () => ({
  type: NOTIFICATION_COUNT,
  payload: api
    .get("api/notifications")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});
export const friendsearch = (params) => ({
  type: SEARCH_FRIEND,
  payload: api
    .post("api/friend_search",params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});
export const whosearchedyou = () => ({
  type: WHO_SEARCH_YOU,
  payload: api
    .get("api/notifications/who_searched_you")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});
