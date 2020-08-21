import React, { useState, useEffect } from "react";

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
} from "./styles";

interface AddressBackEndFormated extends AddressType {
  cep: string;
}

const Addresses: React.FC = () => {
  const { UserApi } = useGlobalState();
  const [addresses, setAddresses] = useState<AddressBackEndFormated[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    UserApi.getAddresses().then((response) => setAddresses(response.data));
    setIsLoading(false);
  }, [UserApi]);

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
            ({ city, neighborhood, number, state, street, cep }, i) => (
              <Address key={i}>
                <p>
                  <span>Street</span>: {street}, {number}
                </p>
                <p>
                  <span>Neighborhood</span>: {neighborhood}
                </p>
                <p>
                  <span>Cep</span>: {cep}
                </p>
                <p>
                  <span>Location</span>: {city} - {state}
                </p>
              </Address>
            )
          )}
          <AddAddress>
            <div>
              <ButtonAdd />
            </div>
          </AddAddress>
        </AddressesContainer>
      )}
    </Container>
  );
};

export default Addresses;
