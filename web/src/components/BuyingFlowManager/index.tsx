import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { Switch, useHistory } from "react-router-dom";

import { useGlobalState } from "../../Context";
import UserApiManager from "../../Services/userApi";
import DeliveryApiManager from "../../Helper/deliveryRelated_helper";

import RestrictedRoute from "../RestrictedRoute";

import Authenticate from "../Authenticate";
import CepSearcher from "../CepSearcher";
import AddressForm from "../AddressForm";
import Stripe from "../StripeProvider";
import CompletedBuy from "../CompletedBuy";

import {
  Container,
  ProgressMock,
  Progress,
  ProgressMade,
  Step,
} from "./styles";

import { Steps } from "../../Types/buyingFlowRelated_types";

const BuyingFlowContext = createContext(
  {} as {
    DeliveryApi: DeliveryApiManager;
    UserApi: UserApiManager;
    next: () => void;
    receipt_url: string;
    setReceipt_url: Dispatch<SetStateAction<string>>;
  }
);

/* Its very important to declare this class here, otherwise the component will be mounted each
time the route changes and, therefore declaring this class once again, losing all props.*/
const DeliveryApi = new DeliveryApiManager();

const BuyingFlowManager: React.FC = () => {
  const history = useHistory();
  const {
    userController: { loggedIn },
    buyingController: { step: currentStep, dispatch },
  } = useGlobalState();

  const UserApi = new UserApiManager(loggedIn);

  const stepsRef = useRef(
    loggedIn
      ? ["Shippment method", "Address", "Finish Buy", "completed"]
      : [
          "Shippment method",
          "Authenticate",
          "Address",
          "Finish Buy",
          "completed",
        ]
  );

  const [receipt_url, setReceipt_url] = useState("");

  const steps = stepsRef.current;

  const next = useCallback(() => {
    switch (steps[currentStep]) {
      case "Authenticate": {
        return history.push("/checkout/authenticate");
      }
      case "Address": {
        return history.push("/checkout/address");
      }
      case "Finish Buy": {
        return history.push("/checkout/finish_buy");
      }
      case "completed": {
        return history.push("/checkout/buy_completed");
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
      <BuyingFlowContext.Provider
        value={{ UserApi, DeliveryApi, next, receipt_url, setReceipt_url }}
      >
        <Switch>
          <RestrictedRoute
            expectedStep={(steps.indexOf("Shippment method") + 1) as Steps}
            currentStep={currentStep}
            exact
            path="/checkout"
            component={CepSearcher}
          />
          {!loggedIn && (
            <RestrictedRoute
              expectedStep={(steps.indexOf("Authenticate") + 1) as Steps}
              currentStep={currentStep}
              path="/checkout/authenticate"
              component={Authenticate}
            />
          )}
          <RestrictedRoute
            expectedStep={(steps.indexOf("Address") + 1) as Steps}
            currentStep={currentStep}
            authenticate
            path="/checkout/address"
            component={AddressForm}
          />
          <RestrictedRoute
            expectedStep={(steps.indexOf("Finish Buy") + 1) as Steps}
            currentStep={currentStep}
            authenticate
            path="/checkout/finish_buy"
            component={Stripe}
          />
          <RestrictedRoute
            expectedStep={(steps.indexOf("completed") + 1) as Steps}
            currentStep={currentStep}
            authenticate
            path="/checkout/buy_completed"
            component={CompletedBuy}
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
