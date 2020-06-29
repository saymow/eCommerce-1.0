import styled from "styled-components";
import { ShoppingCart } from "styled-icons/evaicons-solid";
import { ShoppingBags } from "@styled-icons/boxicons-solid";
import { DeleteBack2 } from "@styled-icons/remix-line";

interface ShoppingProps {
  qntd: number;
}

export const Container = styled.div<ShoppingProps>`
  position: relative;

  &::after {
    display: ${props => props.qntd > 0 ? "inline" : "none"};
    content: "${props => props.qntd}";
    position: absolute;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    padding: .1rem;
    top: 12px;
    left: 20px;
    width: 12px;
    height: 12px;
    border-radius: 50%;

    color: #fff;
    background-color: #f00;
  }
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
  cursor: default;
  display: none;
  position: absolute;
  z-index: 3;
  top: 48px;
  right: 0;

  width: 320px;
  border-radius: 0 0 0.5rem 0.5rem;
  padding: 1rem 1rem 1rem 0.5rem;
  box-shadow: 1px 1px 3px var(--primary);

  background-color: var(--background);

  transition: all 200ms ease;

  &.show {
    display: block;
  }
`;

export const ListItem = styled.div`
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

export const Item = styled.div`
  margin-top: 1rem;
  position: relative;

  border: 1px solid var(--primary);
  display: flex;
  align-items: flex-start;

  height: 62px;

  color: #000;

  div:last-child {
    padding: 0.5rem;
  }

  strong {
    margin-right: 0.3rem;
  }

  > div > img {
    width: 80px;
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

export const Button = styled.button`
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
