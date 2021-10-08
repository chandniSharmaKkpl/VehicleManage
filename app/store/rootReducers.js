import { combineReducers } from "redux";
import { createNavigationReducer } from "react-navigation-redux-helpers";
import RootNavigator from "../navigation/RootNavigator";
import authReducer from "../modules/authentication/redux/Reducer";
import homeReducer from "../modules/dashboard/redux/Reducer";
const navReducer = createNavigationReducer(RootNavigator);

const appReducer = combineReducers({
  nav: navReducer,
  auth: authReducer,
  home: homeReducer,
});

export default appReducer;
