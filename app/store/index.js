import { createStore, applyMiddleware } from "redux";
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
} from "react-navigation-redux-helpers";
import { connect } from "react-redux";
import thunk from "redux-thunk";
import { createPromise } from "redux-promise-middleware";
import { composeWithDevTools } from "remote-redux-devtools";
import AppNavigator from "../navigation/AppNavigator";
import appReducer from "./rootReducers";

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const middleware = createReactNavigationReduxMiddleware((state) => state.nav);

const App = createReduxContainer(AppNavigator);

const mapStateToProps = (state) => ({
  state: state.nav,
});

export const AppWithNavigationState = connect(mapStateToProps, null, null, {
  forwardRef: true,
})(App);

export const store = createStore(
  appReducer,
  {},
  composeWithDevTools(
    applyMiddleware(
      middleware,
      thunk,
      createPromise({ promiseTypeSuffixes: ["LOADING", "SUCCESS", "ERROR"] })
    )
  )
);
