import React, { useState } from "react";

import { useGlobalState } from "../../Context";

import ModalMockup from "../Modal";
import AddressForm from "../AddressForm";
import LoadingBars from "../LoadingBars";

import { Container } from "./styles";

import { Address } from "../../Types/buyingFlowRelated_types";

interface Props {
  closeModal: () => void;
  cb: () => Promise<void>;
}

const CreateAddressModal: React.FC<Props> = ({ closeModal, cb }) => {
  const { UserApi } = useGlobalState();

  const [isLoading, setIsLoading] = useState(false);

  async function submitHandler(data: Address) {
    try {
      setIsLoading(true);
      await UserApi.postAddress(data);
      cb();
      closeModal();
    } catch (err) {
      alert("Something went wrong :(");
    }

    setIsLoading(false);
  }

  return (
    <ModalMockup closeModal={closeModal}>
      <Container>
        {isLoading ? (
          <LoadingBars />
        ) : (
          <AddressForm submitHandler={submitHandler} action="Create" />
        )}
      </Container>
    </ModalMockup>
  );
};

export default CreateAddressModal;
