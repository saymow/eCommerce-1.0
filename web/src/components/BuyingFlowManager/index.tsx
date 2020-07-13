import React, { useEffect } from "react";
import { Switch, useHistory } from "react-router-dom";

import { useGlobalState } from "../../Context";
import ApiManager from "../../Services/userApi";

import RestrictedRoute from "../RestrictedRoute";

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

import { Steps } from "../../Types/buyingFlowRelated_types";

const BuyingFlowManager: React.FC = () => {
  const history = useHistory();
  const {
    userController: { loggedIn },
    buyingController: { step: currentStep, dispatch },
  } = useGlobalState();
  const UserApi = new ApiManager(loggedIn);

  const steps = loggedIn
    ? ["Shippment method", "Address filled", "Finish Buy", "completed"]
    : [
        "Shippment method",
        "Authenticate",
        "Address filled",
        "Finish Buy",
        "completed",
      ];

  useEffect(() => {
    return () => dispatch({ type: "set-reset-flow" });
  }, [dispatch]);

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
              <div />
              <p>{step}</p>
            </Step>
          ))}
        </Progress>
      </ProgressMock>
      <Switch>
        <RestrictedRoute
          currentStep={currentStep}
          expectedStep={1}
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
          <RestrictedRoute
            expectedStep={2} //*** */
            currentStep={currentStep}
            path="/checkout/authenticate"
            component={() => <Authenticate ApiMananger={UserApi}/>}
          />
        )}
        <RestrictedRoute
          expectedStep={steps.indexOf("Address filled") as Steps}
          currentStep={currentStep}
          path="/checkout/address"
          component={AddressForm}
        />
      </Switch>
    </Container>
  );
};

export default BuyingFlowManager;
