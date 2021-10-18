import * as actionTypes from "./ActionType";
import { lightTheme, darkTheme } from "../../../assets/Theme";

const initialState = {
  home: {
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

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    //// LOGIN
   

       //// UPDATE_SETTINGS
    case actionTypes.MESSAGES_LIST_LOADING:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.MESSAGES_LIST_SUCCESS:
      const data = action.payload.data;
      console.log("MESSAGES_LIST_SUCCESS data :->", data);
      let chat_list = [];
      if (data.message === 'Friend list fetched successfully.') {
        chat_list = data.data;
      }
      return {
        home: {
          ...state.home,
          isLoading: false,
          isLoggedIn: true,
          chatList:[],
          // chatList: [...coach_chat_list.classes, ...coach_chat_list.coaches],
          chatMessages: [],
          isReceiveChatMessage: false,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.MESSAGES_LIST_ERROR:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    case actionTypes.SWITCH_THEME:
      // console.log("actionTypes.SWITCH_THEME action.baseTheme :->"+JSON.stringify(action.payload.baseTheme));
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: false,
          theme: { ...action.payload.baseTheme },
          loaderMessage: "Loading...",
        },
      };

    default:
      return state;
  }
};

export default homeReducer;
