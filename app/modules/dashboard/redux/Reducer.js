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
