import { createStore, applyMiddleware } from "redux";
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
} from "react-navigation-redux-helpers";
import { connect } from "react-redux";
import thunk from "redux-thunk";
import { createPromise } from "redux-promise-middleware";
import { composeWithDevTools } from "remote-redux-devtools";
import RootNavigator from "../navigation/RootNavigator";
import appReducer from "./rootReducers";

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const middleware = createReactNavigationReduxMiddleware((state) => state.nav);

const App = createReduxContainer(RootNavigator);

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
