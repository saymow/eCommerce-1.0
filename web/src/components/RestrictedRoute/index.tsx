import React from "react";
import { Route, Redirect, Prompt } from "react-router-dom";

import { useGlobalState } from "../../Context";
import { useBuyingFlowState } from "../BuyingFlowManager";

import { Steps } from "../../Types/buyingFlowRelated_types";

interface Props {
  exact?: boolean;
  path: string;
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
  const { resetFlow } = useBuyingFlowState();

  return (
    <Route
      {...rest}
      render={() => {
        if (currentStep >= expectedStep && (authenticate ? loggedIn : true)) {
          return (
            <>
              <Prompt
                message={(location) => {
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
