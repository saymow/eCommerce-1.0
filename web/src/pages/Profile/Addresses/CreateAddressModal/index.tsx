import React, { useState } from "react";

import { useGlobalState } from "../../../../Context";

import ModalMockup from "../../../../Components/Modal";
import AddressForm from "../../../../Components/AddressForm";
import LoadingBars from "../../../../Components/LoadingBars";

import { Container } from "./styles";

import { Address } from "../../../../Types/buyingFlowRelated_types";

interface Props {
  closeModal: () => void;
  cb: () => Promise<void>;
}

const CreateAddressModal: React.FC<Props> = ({ closeModal, cb }) => {
  const {
    UserApi,
    modalController: { dispatch: modalDispatch },
  } = useGlobalState();

  const [isLoading, setIsLoading] = useState(false);

  async function submitHandler(data: Address) {
    try {
      setIsLoading(true);
      await UserApi.postAddress(data);
      cb();
    } catch (err) {
      const { message } = err.response.data;
      modalDispatch({
        type: "error",
        payload: {
          title: "Network connection error",
          message,
        },
      });
    }

    setIsLoading(false);
    closeModal();
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
