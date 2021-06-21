import * as actionTypes from "./ActionType";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  loaderMessage: "Loading...",
  isInternetConnection: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_LOADING:
      return {
        ...state,
        isLoading: true,
        loaderMessage: "Please wait...",
      };
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        loaderMessage: "",
      };
    case actionTypes.USER_LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        loaderMessage: "",
      };

    case actionTypes.USER_REGISTER_LOADING:
      return {
        ...state,
        isLoading: true,
        loaderMessage: "Please wait...",
      };
    case actionTypes.USER_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        loaderMessage: "",
      };
    case actionTypes.USER_REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        loaderMessage: "",
      };
    case actionTypes.FORGOT_PASSWORD_LOADING:
      return {
        ...state,
        isLoading: true,
        loaderMessage: "Please wait...",
      };
    case actionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        loaderMessage: "",
      };
    case actionTypes.FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        loaderMessage: "",
      };
    case actionTypes.VERIFY_USER_LOADING:
      return {
        ...state,
        isLoading: true,
        loaderMessage: "Please wait...",
      };
    case actionTypes.VERIFY_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        loaderMessage: "",
      };
    case actionTypes.VERIFY_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        loaderMessage: "",
      };
    default:
      return state;
  }
};

export default authReducer;
