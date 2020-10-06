import React from "react";
import { useRouter } from "next/router";

import { useGlobalState } from "../../context";

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
  const history = useRouter();

  const {
    userController: { loggedIn },
  } = useGlobalState();

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
          <ListItem
            onClick={() => history.push(loggedIn ? "/profile/me" : "/signin")}
          >
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
