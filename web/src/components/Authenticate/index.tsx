import React from "react";
import { Switch, Route } from "react-router-dom";

import SignIn from "../SignIn";
import SignUp from "../SignUp";

interface Props {
  ApiMananger: object;
}

const Authenticate: React.FC<Props> = (props) => {
  console.log(props);

  return (
    <Switch>
      <Route
        exact
        path="/checkout/authenticate/"
        component={() => <SignIn  ApiMananger={props.ApiMananger} />}
      />
      <Route path="/checkout/authenticate/signup" component={SignUp} />
    </Switch>
  );
};

export default Authenticate;
