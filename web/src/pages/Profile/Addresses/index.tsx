import React, { useState, useEffect, useCallback } from "react";

import { useGlobalState } from "../../../Context";

import LoadingBars from "../../../Components/LoadingBars";

import { Address as AddressType } from "../../../Types/buyingFlowRelated_types";

import {
  Container,
  AddressesContainer,
  Address,
  AddAddress,
  Message,
  ButtonAdd,
  OptionsDropdown,
  OptionsIcon,
} from "./styles";

const Addresses: React.FC = () => {
  const {
    UserApi,
    modalController: { dispatch },
  } = useGlobalState();
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAddresses = useCallback(async () => {
    setIsLoading(true);
    await UserApi.getAddresses().then((response) => {
      console.log(response);
      setAddresses(response.data);
      setIsLoading(false);
    });
  }, [UserApi]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  function handleCreateAddress() {
    dispatch({
      type: "create-address",
      cb: fetchAddresses,
    });
  }

  async function handleDeleteAddress(id: number) {
    await UserApi.deleteAddress(id);
    await fetchAddresses();
  }

  function handleUpdateAddress(id: number) {
    const address = addresses.find(
      (eachAddress) => eachAddress.id === id
    ) as AddressType;

    dispatch({
      type: "update-address",
      payload: {
        address,
      },
      cb: async () => {
        await fetchAddresses();
      },
    });
  }

  return isLoading ? (
    <LoadingBars />
  ) : (
    <Container>
      {addresses.length === 0 ? (
        <Message>
          <h1>You have no addresses registered yet.</h1>
          <ButtonAdd />
          <p>Try out register one!</p>
        </Message>
      ) : (
        <AddressesContainer>
          {addresses.map(
            (
              { city, neighborhood, number, state, street, postalCode, id },
              i
            ) => (
              <Address key={i}>
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
          <AddAddress>
            <div onClick={handleCreateAddress}>
              <ButtonAdd />
            </div>
          </AddAddress>
        </AddressesContainer>
      )}
    </Container>
  );
};

export default Addresses;
