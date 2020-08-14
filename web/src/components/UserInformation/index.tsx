import React from "react";

import {
  Container,
  Info,
  Item,
  InfoProgress,
  ChangeData,
  Button,
} from "./styles";

const Address: React.FC = () => {
  return (
    <Container>
      <Info>
        <div>
          <Item>
            <p>Name:</p>
            <p>Gustavo Alves</p>
          </Item>
          <Item>
            <p>Cpf:</p>
            <p>9999999-99</p>
          </Item>
          <Item>
            <p>Sex:</p>
            <p>Man</p>
          </Item>
        </div>
        <div>
          <Item>
            <p>Telephone:</p>
            <p>(99) 99999-9999</p>
          </Item>
          <Item>
            <p>Email:</p>
            <p>teste@teste.com.br</p>
          </Item>
          <Item>
            <p>Birth date:</p>
            <p>28-10-2000</p>
          </Item>
        </div>
      </Info>
      <InfoProgress />
      <ChangeData>
        <div>
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">
            I wish to receive promotions and new.
          </label>
        </div>
        <Button>Editar informações</Button>
      </ChangeData>
    </Container>
  );
};

export default Address;
