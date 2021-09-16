import { combineReducers } from "redux";
import { createNavigationReducer } from "react-navigation-redux-helpers";
import AppNavigator from "../navigation/AppNavigator";
import authReducer from "../modules/authentication/redux/Reducer";
import homeReducer from "../modules/dashboard/redux/Reducer";
const navReducer = createNavigationReducer(AppNavigator);

const appReducer = combineReducers({
  nav: navReducer,
  auth: authReducer,
  home: homeReducer,
});

export default appReducer;
