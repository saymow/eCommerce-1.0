
import React from "react";
import { useBuyingFlowState } from "../BuyingFlowManager";

import { Container, CheckMarkIcon, Text } from "./styles";

const CompletedBuy: React.FC = () => {
  const { receipt_url } = useBuyingFlowState();

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
