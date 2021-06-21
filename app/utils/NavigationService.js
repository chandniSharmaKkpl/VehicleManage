import { NavigationActions, StackActions } from "react-navigation";

let _navigator;

const setTopLevelNavigator = (navigatorRef) => {
  if (navigatorRef) {
    _navigator = navigatorRef.props;
  }
};

const navigate = (routeName, params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
};

const back = () => {
  _navigator.dispatch(NavigationActions.back());
};

const push = (routeName, params) => {
  const pushAction = StackActions.push({
    routeName,
    params,
  });
  _navigator.dispatch(pushAction);
};

const reset = (routeName, params) => {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName,
        params,
      }),
    ],
  });
  _navigator.dispatch(resetAction);
};

const replace = (routeName, params) => {
  const replaceAction = StackActions.replace({
    routeName,
    params,
  });
  _navigator.dispatch(replaceAction);
};

// add other navigation functions that you need and export them

export default {
  navigate,
  back,
  replace,
  push,
  reset,
  setTopLevelNavigator,
};
