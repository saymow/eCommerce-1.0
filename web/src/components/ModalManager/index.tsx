import React from "react";

import { useGlobalState } from "../../Context";

import CartModal from "../CartModal";

const ModalManager: React.FC = () => {
  const {
    modalController: { showModal, setShowModal },
  } = useGlobalState();

  switch (showModal) {
    case "cart": 
      return <CartModal setShowModal={setShowModal}/>
    default:
      return null;
  }
};

export default ModalManager;
