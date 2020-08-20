import React from "react";
import { Route, RouteProps, Redirect, Prompt } from "react-router-dom";

import { useGlobalState } from "../../../Context";

import { Steps } from "../../../Types/buyingFlowRelated_types";

interface Props extends RouteProps {
  availablePaths?: string[];
  component: React.FC;
  currentStep: Steps;
  expectedStep: Steps;
  authenticate?: boolean;
}

const RestrictedRoute: React.FC<Props> = ({
  currentStep,
  expectedStep,
  authenticate,
  availablePaths,
  component: Component,
  ...rest
}) => {
  const {
    userController: { loggedIn },
  } = useGlobalState();

  return (
    <Route
      {...rest}
      render={() => {
        if (currentStep >= expectedStep && (authenticate ? loggedIn : true)) {
          return (
            <>
              <Prompt
                message={(location) => {
                  console.log(availablePaths);

                  if (
                    currentStep === 1 ||
                    !availablePaths ||
                    availablePaths?.includes(location.pathname)
                  )
                    return true;
                  return "Do you really wanna cancel your shopping?";
                }}
              />
              <Component />
            </>
          );
        } else return <Redirect to="/checkout" />;
      }}
    />
  );
};

export default RestrictedRoute;
