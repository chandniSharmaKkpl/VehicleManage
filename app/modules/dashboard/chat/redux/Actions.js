import api from "../../../../utils/Api";
import {
  MESSAGES_LIST,
  MESSAGES_DETAILS,
  INSERT_MESSAGES,
  READ_MESSAGES,
  BLOCK_USER,
  SOCIAL_SHARE_FRIEND,
  REPORT_USER,
  RECEIVED_CHAT_MESSAGE,
  SWITCH_THEME,
  SHARE_SOCIAL_PROFILES,
} from "./ActionType";

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

export const messagesDetails = (params) => ({
  type: MESSAGES_DETAILS,
  payload: api
    .post("api/messages/details", params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});

export const insertMessage = (params) => ({
  type: INSERT_MESSAGES,
  payload: api
    .post("api/messages/insert", params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});

export const readMessage = (params) => ({
  type: READ_MESSAGES,
  payload: api
    .post("api/messages/read", params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});

export const blockUser = (params) => ({
  type: BLOCK_USER,
  payload: api
    .post("api/block", params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});

export const reportUser = (params) => ({
  type: REPORT_USER,
  payload: api
    .post("api/report", params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});
export const receivedChatMessage = (payload) => {
  console.log("in receivedChatMessage() payload :->", payload);
  return {
    type: RECEIVED_CHAT_MESSAGE,
    payload: payload,
  };
};
export const socialsharefriends = (params) => ({
  type: SOCIAL_SHARE_FRIEND,
  payload: api
    .post("api/messages/social_share_friends", params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});
export const sharesocialprofiles = (params) => ({
  type: SHARE_SOCIAL_PROFILES,
  payload: api
    .post("api/messages/social_share_send", params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    }),
});
