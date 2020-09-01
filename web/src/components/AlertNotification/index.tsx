import React, { useState, useEffect } from "react";

import { Container, AlertIcon } from "./styles";

interface Props {
  message?: string;
  delay?: number;
}

const AlertNotification: React.FC<Props> = ({ message, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const timer = delay ? delay : 4;

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), timer * 1000);
    }
  }, [message, timer]);

  return (
    <Container isVisible={isVisible}>
      <div>
        <AlertIcon />
      </div>

      <div>
        <p>{message}</p>
      </div>
    </Container>
  );
};

export default AlertNotification;
