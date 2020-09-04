import React, { useState, useEffect } from "react";

import { useGlobalState } from "../../../../Context";
import { useBuyingFlowState } from "../../Controller";

import AddressForm from "../../../AddressForm";
import LoadingBars from "../../../LoadingBars";

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

interface Props {
  updateShippmentCostsWheenNeeded: (postalCode: string) => Promise<void>;
}

const CreateAddressForm: React.FC<Props> = ({
  updateShippmentCostsWheenNeeded,
}) => {
  const {
    buyingController: { dispatch },
  } = useGlobalState();
  const { next, DeliveryApi } = useBuyingFlowState();

  const [initialState, setInitialState] = useState<
    InitialStateFromApi | undefined
  >(undefined);
  const [isLoaading, setIsLoading] = useState(false);

  useEffect(() => {
    setInitialState(DeliveryApi.formatedLocationByCep);
  }, [DeliveryApi.formatedLocationByCep]);

  async function submitHandler(values: FormProps) {
    const { state, city, neighborhood, street, number, postalCode } = values;

    setIsLoading(true);

    await updateShippmentCostsWheenNeeded(postalCode);

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

    setIsLoading(false);

    next();
  }

  if (!initialState) return null;

  return isLoaading ? (
    <LoadingBars />
  ) : (
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
