import React from "react";
import { createPortal } from "react-dom";

import { Container, BackDrop, ModalBox } from "./styles";

import { ModalMockup } from "../../Types/modalRelated_types";

const Portal: React.FC<ModalMockup> = (props) => {
  const element = document.getElementById("modal-root");

  if (!element) return null; //Since it "could" be null, only that way i can use it on createPortal.

  return createPortal(
    <Container>
      <BackDrop onClick={() => props.setShowModal()}></BackDrop>
      <ModalBox>{props.children}</ModalBox>
    </Container>,
    element
  );
};

export default Portal;
