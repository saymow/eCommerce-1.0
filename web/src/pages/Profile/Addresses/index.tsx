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
    modalController: { dispatch: modalDispatch },
  } = useGlobalState();
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAddresses = useCallback(async () => {
    // setIsLoading(true);
    // await UserApi.getAddresses().then((response) => {
    //   setAddresses(response.data);
    //   setIsLoading(false);
    // });

    try {
      const response = await UserApi.getAddresses();

      setAddresses(response.data);
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

  function handleCreateAddress() {
    modalDispatch({
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

  return isLoading ? (
    <LoadingBars />
  ) : (
    <Container>
      {addresses.length === 0 ? (
        <Message>
          <h1>You have no addresses registered yet.</h1>
          <div onClick={handleCreateAddress}>
            <ButtonAdd />
          </div>
          <p>Try out register one!</p>
        </Message>
      ) : (
        <AddressesContainer>
          {addresses.map(
            ({ city, neighborhood, number, state, street, postalCode, id }) => (
              <Address key={id}>
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
