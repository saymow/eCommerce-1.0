import React from "react";
import { Switch, Route } from "react-router-dom";

import { useGlobalState } from "../../Context";

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

  return (
    <Container>
      <ProgressMock steps={steps} stepsLen={steps.length}>
        <Progress>
          <ProgressMade />
          {steps.map((step, index) => (
            <Step
              key={step}
              position={index}
              stepsTotal={steps.length}
              reached={true}
            >
              <div></div>
              <p>{step}</p>
            </Step>
          ))}
        </Progress>
      </ProgressMock>
      <Switch>
        <Route exact path="/checkout/" component={CepSearcher} />
        {!loggedIn && (
          <Route path="/checkout/authenticate" component={Authenticate} />
        )}
        <Route path="/checkout/address" component={AddressForm} />
      </Switch>
    </Container>
  );
};

export default BuyingFlowManager;
