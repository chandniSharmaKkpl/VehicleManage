import * as actionTypes from "./ActionType";
import { lightTheme, darkTheme } from "../../../../assets/Theme";
import moment from "moment";

const initialState = {
  chat: {
    isLoading: false,
    isLoggedIn: false,
    loaderMessage: "Loading...",
    isInternetConnection: false,
    theme: { ...lightTheme },
    chatList: [],
    chatMessages: [],
    isReceiveChatMessage: false,
  },
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    //// LOGIN

    //// MESSAGES_LIST
    case actionTypes.MESSAGES_LIST_LOADING:
      return {
        ...state,
        chat: {
          ...state.chat,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.MESSAGES_LIST_SUCCESS:
      const data = action.payload.data;
      let chat_list = [];
      if (data.message === "Friend list fetched successfully.") {
        chat_list = data.data.friend_list;
      }
      return {
        chat: {
          ...state.chat,
          isLoading: false,
          isLoggedIn: true,
          chatList: chat_list,
          ...action.payload,
          chatMessages: [],
          isReceiveChatMessage: false,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.MESSAGES_LIST_ERROR:
      return {
        ...state,
        chat: {
          ...state.chat,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    //// MESSAGES_DETAILS
    case actionTypes.MESSAGES_DETAILS_LOADING:
      return {
        ...state,
        chat: {
          ...state.chat,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.MESSAGES_DETAILS_SUCCESS:
      var chat_message = action.payload.data.data.to_detail;
      var user_data = action.payload.data.data.from_detail;
      // console.log(
      //   "action.payload.data=======MESSAGES_DETAILS_SUCCESS=======",
      //   action.payload.data.data
      // );
      // console.log(
      //   "reducer RECEIVED_CHAT_MESSAGE chat_message :->" +
      //     JSON.stringify(chat_message)
      // );
      // console.log(
      //   "reducer user_data chat_message :->" + JSON.stringify(user_data)
      // );

      var message = action.payload.data.data.messages;
      var from_id = Number(message[0].from_id);
      var to_id = Number(message[0].to_id);
      var createdAt = moment(
        message[0].created_at,
        "YYYY-MM-DDTHH:mm:ssZ"
      ).format("YYYY/MM/DD HH:mm:ss");
      var messgae_id = message[0].id;
      // console.log("reducer  message :->" + JSON.stringify(message));

      let chat_messages = [];
      if (action.payload.data.message === "Messages fetched successfully.") {
        chat_messages = message;
      }

      var msgDic = {
        _id: messgae_id,
        from_id: from_id,

        to_id: to_id,
        text: message[0].message,
        created_at: createdAt,
        is_received: 0,
        user: {
          _id: user_data.id,
          name: user_data.name,
          avatar: user_data.avatar,
        },
        sent: true,
        received: true,
        pending: false,
      };

      // console.log("- msgDic :->", msgDic);

      return {
        chat: {
          ...state.chat,
          isLoading: false,
          isLoggedIn: true,
          chatMessages: [msgDic],
          ...action.payload,
          isReceiveChatMessage: false,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.MESSAGES_DETAILS_ERROR:
      return {
        ...state,
        chat: {
          ...state.chat,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    // IN-APP MESSAGE RECEIVED ----------------->
    case actionTypes.RECEIVED_CHAT_MESSAGE:
      var chat_message = action.payload.msg_data;
      var user_data = action.payload.user_data;
      console.log(
        "reducer RECEIVED_CHAT_MESSAGE chat_message :->" +
          JSON.stringify(chat_message)
      );

      var message = chat_message.message;
      var from_id = Number(chat_message.from);
      var to_id = Number(chat_message.to);
      var createdAt = moment(
        message[0].createdAt,
        "YYYY-MM-DDTHH:mm:ssZ"
      ).format("YYYY/MM/DD HH:mm:ss");
      var messgae_id = message[0]._id;

      var msgDic = {
        _id: messgae_id,
        from_id: from_id,

        to_id: to_id,
        text: message[0].text,
        created_at: createdAt,
        is_received: 0,
        user: {
          _id: user_data.id,
          name: user_data.name,
          avatar: user_data.avatar,
        },
        sent: true,
        received: true,
        pending: false,
      };

      console.log(Platform.OS + "- msgDic :->", msgDic);

      return {
        ...state,
        chat: {
          ...state.chat,
          chatMessages: [msgDic],
          ...action.payload, // @PENDDING updates When user already on same screen, If is not in same screen then increas unRead count in chatList data
          isReceiveChatMessage: true,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    case actionTypes.SWITCH_THEME:
      // console.log("actionTypes.SWITCH_THEME action.baseTheme :->"+JSON.stringify(action.payload.baseTheme));
      return {
        ...state,
        chat: {
          ...state.chat,
          isLoading: false,
          theme: { ...action.payload.baseTheme },
          loaderMessage: "Loading...",
        },
      };

    default:
      return state;
  }
};

export default chatReducer;
