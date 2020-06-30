import React, { useState, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

import { Container, BackDrop, ModalBox } from "./styles";

interface Props {
  children: React.ReactNode;
}

type Ref = {
  openModal: () => void
};

const Portal = forwardRef<Ref, Props>((props, ref) => {
  const [show, setShow] = useState(false);
  const element = document.getElementById("modal-root")

  if(!element) return null; //Since it "could" be null, only that way i can use it on createPortal.

  useImperativeHandle(ref, () => {
    return {
      openModal,
    };
  });

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return !show  
    ? null
    : createPortal(
        <Container>
          <BackDrop onClick={closeModal}></BackDrop>
          <ModalBox>{props.children}</ModalBox>
        </Container>,
        element
      );
});

export default Portal;
