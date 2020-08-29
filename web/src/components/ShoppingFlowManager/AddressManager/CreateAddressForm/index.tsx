import React, { useState, useEffect } from "react";

import { useGlobalState } from "../../../../Context";
import { useBuyingFlowState } from "../../Controller";

import AddressForm from "../../../AddressForm";

import { Container } from "./styles";

interface InitialStateFromApi {
  city: string;
  neighborhood: string;
  street: string;
  state: string;
  postalCode: string;
}

interface FormProps extends InitialStateFromApi {
  number: string;
  postalCode: string;
}

const CreateAddressForm: React.FC = () => {
  const {
    buyingController: { dispatch },
  } = useGlobalState();
  const { next, DeliveryApi } = useBuyingFlowState();

  const [initialState, setInitialState] = useState<
    InitialStateFromApi | undefined
  >(undefined);

  useEffect(() => {
    const {
      city,
      neighborhood,
      street,
      uf: state,
      cep,
    } = DeliveryApi.locationByCep;

    setInitialState({
      city,
      neighborhood,
      street,
      state,
      postalCode: cep,
    });
  }, [DeliveryApi.locationByCep]);

  async function submitHandler(values: FormProps) {
    const { state, city, neighborhood, street, number, postalCode } = values;

    dispatch({
      type: "set-address",
      payload: {
        state,
        city,
        neighborhood,
        street,
        number,
        postalCode,
      },
    });

    next();
  }

  if (!initialState) return null;

  return (
    <Container>
      <AddressForm
        initialState={initialState}
        submitHandler={submitHandler}
        action="next"
        disableDefaultButton={true}
      />
    </Container>
  );
};

export default CreateAddressForm;
