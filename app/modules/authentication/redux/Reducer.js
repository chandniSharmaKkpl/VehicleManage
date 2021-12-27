import * as actionTypes from "./ActionType";
import { lightTheme, darkTheme } from "../../../assets/Theme";

const initialState = {
  user: {
    isLoading: false,
    isLoggedIn: false,
    userDetails: {},
    loaderMessage: "Loading...",
    isInternetConnection: false,
    theme: { ...lightTheme },
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    //// INIT_APP
    case actionTypes.INIT_APP_LOADING:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.INIT_APP_SUCCESS:
      const errdata = action.payload.data.error;
      if (errdata == "Unauthenticated.") {
        return {
          user: {
            ...state.user,
            isLoading: false,
            isLoggedIn: true,
            userDetails: [],
            ...action.payload,
            loaderMessage: "Loading...",
          },
        };
      }
      const data = action.payload.data.data;
      let apiData = [];
      if (data.user_data) {
        apiData = data;
      }
      return {
        user: {
          ...state.user,
          isLoading: false,
          isLoggedIn: true,
          userDetails: apiData,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.INIT_APP_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    //// LOGIN
    case actionTypes.USER_LOGIN_LOADING:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        user: {
          ...state.user,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.USER_LOGIN_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    //// REGISTER
    case actionTypes.USER_REGISTER_LOADING:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.USER_REGISTER_SUCCESS:
      return {
        user: {
          ...state.user,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.USER_REGISTER_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    /// FORGOT PASSWORD
    case actionTypes.FORGOT_PASSWORD_LOADING:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        user: {
          ...state.user,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    /// CREATE PROFILE
    case actionTypes.CREATE_PROFILE_LOADING:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.CREATE_PROFILE_SUCCESS:
      return {
        user: {
          ...state.user,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,

          loaderMessage: "Loading...",
        },
      };
    case actionTypes.CREATE_PROFILE_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    /// CREATE_SOCIAL_PROFILE
    case actionTypes.CREATE_SOCIAL_PROFILE_LOADING:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.CREATE_SOCIAL_PROFILE_SUCCESS:
      // const data = action.payload.data;
      // let apiData = [];
      // if (data.success === "true") {
      //   apiData = data.data;
      // }
      return {
        user: {
          ...state.user,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          // userDetails: apiData,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.CREATE_SOCIAL_PROFILE_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    //// GET CAR MODEL
    case actionTypes.GET_CITY_LOADING:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.GET_CITY_SUCCESS:
      return {
        user: {
          ...state.user,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.GET_CITY_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    //// LOGIN WITH SOCIAL
    case actionTypes.SOCIAL_LOGIN_LOADING:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.SOCIAL_LOGIN_SUCCESS:
      return {
        user: {
          ...state.user,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.SOCIAL_LOGIN_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    //// REGISTER_DETAIL
    case actionTypes.REGISTER_DETAIL_LOADING:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.REGISTER_DETAIL_SUCCESS:
      return {
        user: {
          ...state.user,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.REGISTER_DETAIL_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    //// UPDATE_REGISTER_DETAIL
    case actionTypes.UPDATE_REGISTER_DETAIL_LOADING:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.UPDATE_REGISTER_DETAIL_SUCCESS:
      return {
        user: {
          ...state.user,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
        },
      };
    case actionTypes.UPDATE_REGISTER_DETAIL_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    case actionTypes.SWITCH_THEME:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          theme: { ...action.payload.baseTheme },
          loaderMessage: "Loading...",
        },
      };

    default:
      return state;
  }
};

export default authReducer;
