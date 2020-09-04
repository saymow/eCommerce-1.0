import React from "react";

import ModalMockup from "../Modal";

import { Container, ErrorBody, ErrorIcon, Content, Button } from "./styles";

interface Props {
  title: string;
  message: string;
  cb: () => void;
  closeModal: () => void;
}

const NotificationError: React.FC<Props> = ({
  title,
  message,
  cb,
  closeModal,
}) => {
  return (
    <ModalMockup closeModal={closeModal}>
      <Container>
        <ErrorBody>
          <ErrorIcon />
          <Content>
            <h1>{title}</h1>
            <p>{message}</p>
          </Content>
        </ErrorBody>
        <Button
          onClick={() => {
            closeModal();
            cb && cb();
          }}
        >
          Dismiss
        </Button>
      </Container>
    </ModalMockup>
  );
};

export default NotificationError;
