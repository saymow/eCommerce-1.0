import React from "react";
import { useHistory } from "react-router-dom";

import {
  Container,
  LogoContainer,
  PageList,
  UserIcon,
  LogoIcon,
  ItemList,
  ListItem,
} from "./styles";

import ShoppingCart from "../ShoppingCart";

const Header: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <div>
        <PageList>
          <LogoContainer onClick={() => history.push("/")}>
            <LogoIcon />
            <strong>E-Commerce</strong>
          </LogoContainer>
          <ListItem onClick={() => history.push("/products")}>
            Products
          </ListItem>
        </PageList>

        <ItemList>
          <ListItem>
            <UserIcon />
          </ListItem>
          <ListItem>
            <ShoppingCart />
          </ListItem>
        </ItemList>
      </div>
    </Container>
  );
};

export default Header;
