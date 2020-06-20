import styled from "styled-components";
import { ShoppingCart } from "styled-icons/evaicons-solid";

export const Container = styled.div`
  position: relative;
`;

export const ShoppingIcon = styled(ShoppingCart)`
  height: 3.4rem;
  width: 3.4rem;
`;

export const BackDrop = styled.div`
  display: none;
  position: fixed;
  top: 6rem;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;

  cursor: auto;

  background-color: rgba(0, 0, 0, 0.1);
  &.show {
    display: block;
  }
`;

export const Cart = styled.div`
  display: none;
  position: absolute;
  z-index: 3;
  top: 48px;
  right: 0;

  width: 320px;
  border-radius: 0 0 0.5rem 0.5rem;
  padding: 1rem 1rem 1rem 0.5rem;

  background-color: var(--background);

  transition: all 200ms ease;

  &.show {
    display: block;
  }
`;

export const ListItem = styled.div`
  max-height: 40vh;
  overflow: auto;

  padding: 0 2rem 1rem 0;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--primary);
    border-radius: 4px;
  }
`;

export const Item = styled.div`
  margin-top: 1rem;
  position: relative;

  padding: 0.2rem;
  border: 1px solid var(--primary);
  display: flex;
  align-items: flex-start;

  color: #000;

  strong {
    margin-right: 0.3rem;
  }

  > div > img {
    width: 60px;
    height: 60px;
  }

  > div > p,
  span {
    font-size: 1.2rem;
  }

  > div > span {
    position: absolute;
    bottom: 0;
    right: 0;

    font-weight: bold;
    color: var(--primary);
    margin: 0.5rem;
  }
`;

export const Button = styled.button`
  margin-top: 1rem;

  font-size: 1.6rem;
  width: 305px;
  padding: 0.8rem;
  cursor: pointer;

  background-color: var(--primary);
  color: var(--background);
  border: 1px solid var(--background);

  transition: all 200ms ease-in-out;

  &:hover {
    color: var(--primary);
    background-color: var(--background);
    border-color: var(--primary);
  }
`;
