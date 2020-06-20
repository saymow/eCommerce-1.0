import styled from "styled-components";
import { ShoppingBag } from "styled-icons/remix-fill";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  padding: 0 1.5rem;

  background-color: var(--primary);
  color: var(--background);

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

export const LogoContainer = styled.div`
  display: flex;
  align-items: flex-end;

  cursor: pointer;

  > strong {
    margin-left: 0.5rem;
    font-size: 2.5rem;
  }
`;

export const LogoIcon = styled(ShoppingBag)`
  height: 3.6rem;
  width: 3.6rem;
`;

export const ItemList = styled.div`
  display: flex;
  align-items: flex-end;
  cursor: pointer;
`;

export const ListItem = styled.div`
  font-size: 2.5rem;
  margin-left: 2rem;

  &::after {
    border-bottom: 2px solid var(--background);
    display: block;
    width: 0;
    content: "";
    transition: all 200ms ease;
  }

  &:hover::after {
    width: 100%;
  }
`;
