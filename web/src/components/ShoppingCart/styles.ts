import styled from "styled-components";

import { ShoppingCart, ShoppingBags, DeleteBack2 } from "./../../Styles/icons";
import { Button as defaultButton } from "./../../Styles/utils";

interface ShoppingProps {
  qntd: number;
}

export const Container = styled.div<ShoppingProps>`
  position: relative;

  &::after {
    display: ${(props) => (props.qntd > 0 ? "inline" : "none")};
    content: "${(props) => props.qntd}";

    position: absolute;
    top: 1.2rem;
    left: 2rem;

    font-size: 1rem;
    font-weight: bold;
    text-align: center;

    padding: 0.1rem;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;

    color: #fff;
    background-color: #f00;
  }
`;

export const ShoppingIcon = styled(ShoppingCart)`
  height: 3.4rem;
  width: 3.4rem;

  @media (max-width: 480px) {
    height: 2.7rem;
    width: 2.7rem;
  }
`;

export const Cart = styled.div`
  cursor: default;
  display: none;
  position: absolute;
  z-index: 3;
  top: 4.8rem;
  right: 0;

  width: min(32rem, 80vw);
  border-radius: 0 0 0.5rem 0.5rem;
  padding: 1rem 1rem 1rem 0.5rem;
  box-shadow: 1px 1px 3px var(--primary);

  background-color: var(--background-primary);

  transition: all 200ms ease;

  &.show {
    display: block;
  }
`;

export const ListItem = styled.ul`
  height: 30vh;
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

export const Item = styled.li`
  margin-top: 1rem;
  position: relative;

  border: 1px solid var(--primary);
  display: flex;
  align-items: flex-start;

  height: 6.2rem;

  color: #000;

  div:last-child {
    padding: 0.5rem;

    strong {
      margin-right: 0.3rem;
    }

    p,
    span {
      font-size: 1.2rem;
    }

    span {
      position: absolute;
      bottom: 0.2rem;
      right: 0.2rem;

      font-weight: bold;
      color: var(--primary);
    }
  }

  div {
    a > img {
      height: 6rem;
    }
  }
`;

export const DeleteIcon = styled(DeleteBack2)`
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 16px;
  height: 16px;
`;

export const Checkout = styled.div`
  margin-top: 0.5rem;

  > strong {
    font-size: 1.6rem;
    color: var(--primary);
  }
`;

export const Button = styled(defaultButton)``;

export const EmptyBag = styled.div`
  height: 20vh;
  color: var(--primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  p {
    font-size: 1.2rem;
    text-align: center;
  }
`;

export const EmptyBagIcon = styled(ShoppingBags)`
  height: 30px;
  width: 30px;
`;
