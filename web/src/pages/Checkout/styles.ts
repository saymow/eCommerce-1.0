import styled from "styled-components";

import { DeleteBack2 } from "../../Styles/icons";
import { DrawerHandler } from "../../Styles/utils";

interface CheckoutAnimationProps {
  onlyRightSide: boolean;
}

export const Container = styled.div`
  margin: 10rem auto 0 auto;
  width: 100%;
  max-width: 1360px;
  min-height: 100vh;
`;

export const CheckoutContainer = styled.div<CheckoutAnimationProps>`
  margin: 8rem auto;
  box-shadow: var(--box-shadow);
  max-width: 1180px;
  width: 90%;
  height: 54rem;
  border-radius: 0.5rem;
  display: grid;
  grid-template-columns: ${(props) =>
    props.onlyRightSide ? "1fr 3fr" : "7fr 13fr"};
  padding: 1rem;
  color: var(--primary);

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

export const ProductRelated = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 9fr 1fr;

  overflow-y: auto;

  @media (max-width: 920px) {
    overflow: unset;
    position: fixed;
    top: 6rem;
    left: 0;
    bottom: 0;
    z-index: 3;

    width: max(calc(90vw * 0.4), 24rem);

    padding: 0.5rem;
    background: var(--background-primary);

    transform: translateX(-100%);

    transition: transform 200ms ease;

    &.show {
      transform: translateX(0%);
    }
  }
`;

export const TotalPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Products = styled.div`
  overflow-y: auto;
  padding: 0 1rem;
  background-color: rgba(0, 0, 0, 0.02);

  display: flex;
  flex-direction: column;
  align-items: center;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--primary);
    border-radius: 4px;
  }
`;

export const Product = styled.div<CheckoutAnimationProps>`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2fr;
  font-size: ${(props) => (props.onlyRightSide ? "1.2rem" : "2rem")};
  min-height: 9rem;

  border: 1px solid var(--primary);
  margin-bottom: 1.5rem;

  div > a > img {
    object-fit: cover;
    display: block;
    max-height: 12rem;
    height: 100%;
    width: 100%;
  }

  div:last-child {
    padding: 0.5rem;
  }

  div:last-child > p > strong {
    margin-right: 0.2rem;
  }

  div:last-child span {
    font-size: 0.7em;
    position: absolute;
    bottom: 5px;
    right: 5px;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;

    min-height: 20rem;

    div > a > img {
      max-height: 12rem;
    }
  }
`;

export const DeleteIcon = styled(DeleteBack2)`
  cursor: pointer;

  width: 25px;
  height: 25px;

  position: absolute;
  right: 5px;
  top: 5px;
`;

export const Information = styled.div`
  padding: 0 0 1rem 1rem;
`;

export const Drawer = styled(DrawerHandler)``;
