import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { useGlobalState } from "../../Context";

interface ResctricedRouteProps extends RouteProps {
  authenticated: boolean;
}

const RestrictedRoute: React.FC<ResctricedRouteProps> = ({
  authenticated,
  ...props
}) => {
  const {
    userController: { loggedIn },
  } = useGlobalState();

  const ensureIsLoggedIn = loggedIn === undefined || loggedIn;

  return authenticated ? (
    ensureIsLoggedIn ? (
      <Route {...props} />
    ) : (
      <Redirect to="/signin" />
    )
  ) : ensureIsLoggedIn ? (
    <Redirect to="/profile/me" />
  ) : (
    <Route {...props} />
  );
};

export default RestrictedRoute;
