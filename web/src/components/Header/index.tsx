import React from "react";
import { useHistory } from "react-router-dom";

import {
  Container,
  LogoContainer,
  LogoIcon,
  ItemList,
  ListItem,
} from "./styles";

import ShoppingCart from '../ShoppingCart';

const Header: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <div>
        <div>
          <LogoContainer onClick={() => history.push("/")}>
            <LogoIcon />
            <strong>E-Commerce</strong>
          </LogoContainer>
        </div>

        <ItemList>
          <ListItem onClick={() => history.push("/products")}>Products</ListItem>

          <ListItem>
            <ShoppingCart />
          </ListItem>
        </ItemList>
      </div>
    </Container>
  );
};

export default Header;
