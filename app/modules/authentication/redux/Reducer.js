import * as actionTypes from "./ActionType";
import { lightTheme, darkTheme } from "../../../assets/Theme";

const initialState = {
  user: {
    isLoading: false,
    isLoggedIn: false,
    userDetails: {},
    carModels:{},
    loaderMessage: "Loading...",
    isInternetConnection: false,
    theme: { ...lightTheme },
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
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
      const data = action.payload.data;
      let apiData = [];
      if (data.success === "true") {
        apiData = data.data;
      }
      return {
        user: {
          ...state.user,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          userDetails: apiData,
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


    //// GET CAR MODEL
    case actionTypes.GET_CAR_MODEL_LOADING:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          loaderMessage: "Please wait...",
        },
      };
    case actionTypes.GET_CAR_MODEL_SUCCESS:
      const cardata = action.payload.data;
      let carmodelData = [];
      if (cardata.success === "true") {
        carmodelData = cardata.data;
      }
      return {
        user: {
          ...state.user,
          isLoading: false,
          isLoggedIn: true,
          ...action.payload,
          loaderMessage: "Loading...",
          carModels: carmodelData,
        },
      };
    case actionTypes.GET_CAR_MODEL_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          loaderMessage: "Loading...",
        },
      };

    default:
      return state;
  }
};

export default authReducer;
