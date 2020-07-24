import React, { useEffect } from "react";
import { useBuyingFlowState } from "../BuyingFlowManager";

import { useGlobalState } from "../../Context";

import { Container, CheckMarkIcon, Text } from "./styles";

const CompletedBuy: React.FC = () => {
  const { receipt_url } = useBuyingFlowState();
  const {
    buyingController: { dispatch: buyingControllerDispacth },
    cartManager: { dispatch: cartManagerDispatch },
  } = useGlobalState();

  useEffect(() => {
    return () => {
      buyingControllerDispacth({
        type: "set-reset-flow",
      });
      cartManagerDispatch({
        type: "reset-cart",
      });
    };
  }, [buyingControllerDispacth, cartManagerDispatch]);

  return (
    <Container>
      <CheckMarkIcon />
      <Text>
        You've finished your buy, check your receipt out by clicking{" "}
        <a href={receipt_url} target="_blank">
          here
        </a>
        .
      </Text>
    </Container>
  );
};

export default CompletedBuy;
