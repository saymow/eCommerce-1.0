import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { useGlobalState } from "../../Context";

const RestrictedRoute: React.FC<RouteProps> = (props) => {
  const {
    userController: { loggedIn },
  } = useGlobalState();

  console.log(loggedIn);

  return loggedIn === undefined || loggedIn ? (
    <Route {...props} />
  ) : (
    <Redirect to={"/signin"} />
  );
};

export default RestrictedRoute;
