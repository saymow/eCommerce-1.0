import React, { useMemo } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";

import { useGlobalState } from "../../Context";

import {
  getStepWhenLoggedIn,
  getStepWhenNotLoggedIn,
} from "../../Helper/buyingStepsRelated_helper";

import Authenticate from "../Authenticate";
import CepSearcher from "../CepSearcher";
import AddressForm from "../AddressForm";

import {
  Container,
  ProgressMock,
  Progress,
  ProgressMade,
  Step,
} from "./styles";

const BuyingFlowManager: React.FC = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const {
    userController: { loggedIn },
  } = useGlobalState();
  const steps = loggedIn
    ? ["Shippment method", "Address filled", "Finish Buy", "completed"]
    : [
        "Shippment method",
        "Authenticate",
        "Address filled",
        "Finish Buy",
        "completed",
      ];

  let currentStep = useMemo(() => {
    let serializedPath = pathname.replace(/\/checkout/, "");

    return loggedIn
      ? getStepWhenLoggedIn(serializedPath)
      : getStepWhenNotLoggedIn(serializedPath);
  }, [pathname, loggedIn]);

  return (
    <Container>
      <ProgressMock>
        <Progress>
          <ProgressMade position={currentStep} stepsTotal={steps.length} />
          {steps.map((step, index) => (
            <Step
              key={step}
              position={index}
              stepsTotal={steps.length}
              reached={currentStep > index}
            >
              <div/>
              <p>{step}</p>
            </Step>
          ))}
        </Progress>
      </ProgressMock>
      <Switch>
        <Route
          exact
          path="/checkout"
          component={() => (
            <CepSearcher
              next={() =>
                history.push(
                  loggedIn ? "/checkout/address" : "/checkout/authenticate"
                )
              }
            />
          )}
        />
        {!loggedIn && (
          <Route path="/checkout/authenticate" component={Authenticate} />
        )}
        <Route path="/checkout/address" component={AddressForm} />
      </Switch>
    </Container>
  );
};

export default BuyingFlowManager;
