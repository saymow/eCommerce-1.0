import React, { useState, useEffect } from "react";

import { useGlobalState } from "../../../Context";

import { Container, Address, AddAddress, PlusIcon } from "./styles";

import { Address as AddressType } from "../../../Types/buyingFlowRelated_types";

interface AddressBackEndFormated extends AddressType {
  cep: string;
}

const Addresses: React.FC = () => {
  const { UserApi } = useGlobalState();

  const [addresses, setAddresses] = useState<AddressBackEndFormated[]>([]);

  useEffect(() => {
    UserApi.getAddresses().then((response) => setAddresses(response.data));
  }, [UserApi]);

  return (
    <Container>
      {addresses.map(
        ({ city, neighborhood, number, state, street, cep }, i) => (
          <Address key={i}>
            <p>
              {street}, {number}
            </p>
            <p>{neighborhood}</p>
            <p>{cep}</p>
            <p>
              {city} - {state}
            </p>
          </Address>
        )
      )}
      <AddAddress>
        <div>
          <PlusIcon />
        </div>
      </AddAddress>
    </Container>
  );
};

export default Addresses;
