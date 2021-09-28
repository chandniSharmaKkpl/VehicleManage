import * as actionTypes from "./ActionType";
import { lightTheme, darkTheme } from "../../../assets/Theme";

const initialState = {
  home: {
    isLoading: false,
    isLoggedIn: false,
    loaderMessage: "Loading...",
    isInternetConnection: false,
    theme: { ...lightTheme },
  },
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    //// LOGIN
    case actionTypes.SEARCH_BY_VECHICLE_LOADING:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.SEARCH_BY_VECHICLE_SUCCESS:
      return {
        home: {
          ...state.home,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.SEARCH_BY_VECHICLE_ERROR:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    //// UPDATE_PROFILE
    case actionTypes.UPDATE_PROFILE_LOADING:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        home: {
          ...state.home,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.UPDATE_PROFILE_ERROR:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    //// GET_FRIEND_LIST
    case actionTypes.GET_FRIEND_LIST_LOADING:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.GET_FRIEND_LIST_SUCCESS:
      return {
        home: {
          ...state.home,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.GET_FRIEND_LIST_ERROR:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    //// GET_FRIEND_DETAILS
    case actionTypes.GET_FRIEND_DETAILS_LOADING:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.GET_FRIEND_DETAILS_SUCCESS:
      return {
        home: {
          ...state.home,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.GET_FRIEND_DETAILS_ERROR:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    //// ADD_FRIEND
    case actionTypes.ADD_FRIEND_LOADING:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.ADD_FRIEND_SUCCESS:
      return {
        home: {
          ...state.home,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.ADD_FRIEND_ERROR:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    //// LOGOUT
    case actionTypes.LOGOUT_LOADING:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        home: {
          ...state.home,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.LOGOUT_ERROR:
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
