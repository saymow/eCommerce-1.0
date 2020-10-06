import React from "react";

import { Container, AlertIcon, SuccessIcon } from "./styles";

interface Props {
  type: "success" | "warning";
  message: string;
  delay: number;
}

const AlertNotification: React.FC<Props> = ({ message, type, delay }) => {
  return (
    <Container type={type} delay={delay}>
      <div>{type === "success" ? <SuccessIcon /> : <AlertIcon />}</div>

      <div>
        <p>{message}</p>
      </div>
    </Container>
  );
};

export default AlertNotification;
