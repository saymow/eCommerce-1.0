import React from "react";
import { Route, Redirect, Prompt, useLocation } from "react-router-dom";

import { useGlobalState } from "../../Context";

import { Steps } from "../../Types/buyingFlowRelated_types";

interface Props {
  exact?: boolean;
  path: string;
  component: React.FC;
  currentStep: Steps;
  expectedStep: Steps;
  authenticate?: boolean;
}

const RestrictedRoute: React.FC<Props> = ({
  currentStep,
  expectedStep,
  authenticate,
  component: Component,
  ...rest
}) => {
  const {
    userController: { loggedIn },
  } = useGlobalState();

  console.log(useLocation());

  return (
    <Route
      {...rest}
      render={() => {
        if (currentStep === expectedStep && (authenticate ? loggedIn : true)) {
          if (authenticate && loggedIn) {
          }

          return (
            <>
              {/* <Prompt message="Do you really" /> */}
              <Component />
            </>
          );
        } else return <Redirect to="/checkout" />;
      }}
    />
  );
};

export default RestrictedRoute;
