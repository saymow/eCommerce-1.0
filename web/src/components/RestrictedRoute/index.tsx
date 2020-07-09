import React from "react";
import { Route, Redirect } from "react-router-dom";

import { Steps } from "../../Types/buyingFlowRelated_types";

interface Props {
  exact?: boolean;
  path: string;
  component: React.FC;
  currentStep: Steps;
  expectedStep: Steps;
}

const RestrictedRoute: React.FC<Props> = ({
  currentStep,
  expectedStep,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      render={() => {
        if (currentStep === expectedStep) return <Component {...rest} />;
        else return <Redirect to="/checkout" />;
      }}
    />
  );
};

export default RestrictedRoute;
