import React, {
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
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

const BuyingFlowContext = createContext(
  {} as { UserApi: ApiManager; next: () => void }
);

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

  const next = useCallback(() => {
    switch (steps[currentStep]) {
      case "Authenticate": {
        return history.push("/checkout/authenticate");
      }
      case "Address filled": {
        return history.push("/checkout/address");
      }
    }
  }, [currentStep, history, steps]);

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
      <BuyingFlowContext.Provider value={{ UserApi, next }}>
        <Switch>
          <RestrictedRoute
            currentStep={currentStep}
            expectedStep={1}
            exact
            path="/checkout"
            component={CepSearcher}
          />
          {!loggedIn && (
            <RestrictedRoute
              expectedStep={2} //*** */
              currentStep={currentStep}
              path="/checkout/authenticate"
              component={Authenticate}
            />
          )}
          <RestrictedRoute
            expectedStep={steps.indexOf("Address filled") as Steps}
            currentStep={currentStep}
            path="/checkout/address"
            component={AddressForm}
          />
        </Switch>
      </BuyingFlowContext.Provider>
    </Container>
  );
};

export function useBuyingFlowState() {
  const context = useContext(BuyingFlowContext);

  return context;
}

export default BuyingFlowManager;
