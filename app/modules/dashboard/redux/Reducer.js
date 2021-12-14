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

    //// UPDATE_SETTINGS
    case actionTypes.UPDATE_SETTINGS_LOADING:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.UPDATE_SETTINGS_SUCCESS:
      return {
        home: {
          ...state.home,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.UPDATE_SETTINGS_ERROR:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    //// UPDATE_SETTINGS
    case actionTypes.WHO_SEARCH_YOU_LOADING:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.WHO_SEARCH_YOU_SUCCESS:
      return {
        home: {
          ...state.home,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.WHO_SEARCH_YOU_ERROR:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    case actionTypes.SEARCHES_READ_SUCCESS:
      const data = action.payload.data.data;
      console.log("data=====SEARCHES_READ_SUCCESS", data);
      return {
        home: {
          ...state.home,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };

    //// REQUEST_FOR_SOCIAL
    case actionTypes.REQUEST_FOR_SOCIAL_LOADING:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.REQUEST_FOR_SOCIAL_SUCCESS:
      return {
        home: {
          ...state.home,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.REQUEST_FOR_SOCIAL_ERROR:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    //// SOCIAL_REQUEST_LIST
    case actionTypes.SOCIAL_REQUEST_LIST_LOADING:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.SOCIAL_REQUEST_LIST_SUCCESS:
      return {
        home: {
          ...state.home,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.SOCIAL_REQUEST_LIST_ERROR:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    //// DENY_SOCIAL_REQUEST
    case actionTypes.DENY_SOCIAL_REQUEST_LOADING:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.DENY_SOCIAL_REQUEST_SUCCESS:
      return {
        home: {
          ...state.home,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.DENY_SOCIAL_REQUEST_ERROR:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    //// APPROVE_SOCIAL_REQUEST
    case actionTypes.APPROVE_SOCIAL_REQUEST_LOADING:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.APPROVE_SOCIAL_REQUEST_SUCCESS:
      return {
        home: {
          ...state.home,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.APPROVE_SOCIAL_REQUEST_ERROR:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    //// ADD_SUBSCRIPTION
    case actionTypes.ADD_SUBSCRIPTION_LOADING:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.ADD_SUBSCRIPTION_SUCCESS:
      return {
        home: {
          ...state.home,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.ADD_SUBSCRIPTION_ERROR:
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
