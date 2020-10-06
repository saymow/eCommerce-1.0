import React, { useState, useEffect, useCallback } from "react";

import { useGlobalState } from "context";
import { useBuyingFlowState } from "components/ShoppingFlowManager/Controller";

import LoadingBars from "components/LoadingBars";

import { Address as AddressType } from "types/buyingFlowRelated_types";

import {
  Container,
  CenteredContainer,
  AddressesContainer,
  Address,
  OptionsDropdown,
  OptionsIcon,
  Button,
  Message,
  SadIcon,
} from "./styles";

interface Props {
  updateShippmentCostsWheenNeeded: (postalCode: string) => Promise<void>;
}

const ExistingAddresses: React.FC<Props> = ({
  updateShippmentCostsWheenNeeded,
}) => {
  const {
    UserApi,
    modalController: { dispatch: modalDispatch },
    buyingController: { dispatch },
  } = useGlobalState();
  const { next } = useBuyingFlowState();
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<
    AddressType | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAddresses = useCallback(async () => {
    setIsLoading(true);
    await UserApi.getAddresses().then((response) => {
      setIsLoading(false);
    });

    try {
      const response = await UserApi.getAddresses();
      setAddresses(response);
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
  }, [UserApi, modalDispatch]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  async function handleDeleteAddress(id: number) {
    await UserApi.deleteAddress(id);
    await fetchAddresses();
  }

  function handleUpdateAddress(id: number) {
    const address = addresses.find(
      (eachAddress) => eachAddress.id === id
    ) as AddressType;

    modalDispatch({
      type: "update-address",
      payload: {
        address,
      },
      cb: async () => {
        await fetchAddresses();
      },
    });
  }

  function handlePickedAddress(id: number) {
    let addressPicked = addresses.find((address) => address.id === id);

    setSelectedAddress((prev) =>
      prev === addressPicked ? undefined : addressPicked
    );
  }

  async function handleSelectedAddress() {
    setIsLoading(true);

    await updateShippmentCostsWheenNeeded(
      selectedAddress?.postalCode as string
    );

    dispatch({
      type: "set-address",
      payload: selectedAddress as AddressType,
    });

    setIsLoading(false);

    next();
  }

  return isLoading ? (
    <CenteredContainer>
      <LoadingBars />
    </CenteredContainer>
  ) : addresses.length === 0 ? (
    <CenteredContainer>
      <Message>
        <h1>You don't have any address registered yet.</h1>
        <SadIcon />
      </Message>
    </CenteredContainer>
  ) : (
    <Container>
      <AddressesContainer>
        {addresses.map(
          ({ city, neighborhood, number, state, street, postalCode, id }) => (
            <Address
              key={id}
              onClick={() => handlePickedAddress(id as number)}
              className={
                selectedAddress && selectedAddress.id === id ? "selected" : ""
              }
            >
              <p>
                <span>Street</span>: {street}, {number}
              </p>
              <p>
                <span>Neighborhood</span>: {neighborhood}
              </p>
              <p>
                <span>Postal Code</span>: {postalCode}
              </p>
              <p>
                <span>Location</span>: {city} - {state}
              </p>
              <OptionsDropdown>
                <OptionsIcon />
                <ul>
                  <li onClick={() => handleUpdateAddress(id as number)}>
                    Update
                  </li>
                  <li onClick={() => handleDeleteAddress(id as number)}>
                    Delete
                  </li>
                </ul>
              </OptionsDropdown>
            </Address>
          )
        )}
      </AddressesContainer>
      <div>
        <Button onClick={handleSelectedAddress} disabled={!selectedAddress}>
          Next
        </Button>
      </div>
    </Container>
  );
};

export default ExistingAddresses;
