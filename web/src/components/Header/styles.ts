import styled from "styled-components";

import { ShoppingBag, UserCircle } from "../../Styles/icons";

export const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  padding: 0 1.5rem;
  z-index: 99;

  background-color: var(--primary);
  color: var(--background-primary);

  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    width: 100%;
    max-width: 1360px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const PageList = styled.nav`
  display: flex;
  align-items: flex-end;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: flex-end;

  cursor: pointer;
  margin-right: 2rem;

  > strong {
    line-height: 3rem;
    margin-left: 0.5rem;
    font-size: 3rem;
  }
`;

export const LogoIcon = styled(ShoppingBag)`
  height: 4.2rem;
  width: 4.2rem;
`;

export const UserIcon = styled(UserCircle)`
  height: 3.4rem;
`;

export const ItemList = styled.ul`
  display: flex;
  align-items: flex-end;
  cursor: pointer;
`;

export const ListItem = styled.li`
  list-style: none;
  cursor: pointer;
  position: relative;
  font-size: 2.2rem;
  margin-left: 2rem;

  &::after {
    border-bottom: 2px solid var(--background-primary);
    display: block;
    width: 0;
    content: "";
    transition: all 200ms ease;
  }

  &:hover::after {
    width: 100%;
  }
`;
