import React from "react";
import { createPortal } from "react-dom";

import { Container, BackDrop, ModalBox } from "./styles";

interface Props {
  closeModal: () => void;
}

const Portal: React.FC<Props> = ({ closeModal, ...props }) => {
  const element = document.getElementById("modal-root");

  if (!element) return null; //Since it "could" be null, only that way i can use it on createPortal.

  return createPortal(
    <Container>
      <BackDrop onClick={closeModal}></BackDrop>
      <ModalBox>{props.children}</ModalBox>
    </Container>,
    element
  );
};

export default Portal;
