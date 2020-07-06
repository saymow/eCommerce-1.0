import React from "react";
import { Switch, Route } from "react-router-dom";

import SignIn from "../SignIn";
import SignUp from "../SignUp";

const Authenticate: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/checkout/authenticate/" component={SignIn} />
      <Route path="/checkout/authenticate/signup" component={SignUp} />
    </Switch>
  );
};

export default Authenticate;
