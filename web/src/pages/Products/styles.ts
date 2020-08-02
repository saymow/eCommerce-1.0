import styled from "styled-components";

import { CartAdd } from "../../Styles/icons";

export const Container = styled.div`
  margin: auto;
  width: 100%;
  max-width: 1360px;
  min-height: 100vh;
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

export const ProductsWrapper = styled.div`
  margin: 10rem auto;
  width: 100%;
`;

export const ProductList = styled.section`
  margin: auto;
  width: 100%;
  max-width: 1080px;
  padding: 0 2rem;

  display: flex;
  flex-wrap: wrap;
`;

export const ProductSelf = styled.div`
  flex-grow: 1;
  margin: 3%;
  flex-basis: 27%;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  color: var(--primary);
  background: #fff;

  transition: all 300ms ease;

  cursor: context-menu;

  img {
    cursor: pointer;
    width: 100%;
  }

  strong {
    cursor: pointer;
    line-height: 5rem;
    font-size: 2rem;
  }

  span {
    position: absolute;
    top: -0.9rem;
    right: -0.9rem;

    font-size: 1.8rem;
    padding: 0.5rem;

    color: #fff;
    background-color: var(--primary);
    transform: rotate(5deg);
  }

  &:hover {
    transform: translateY(-5px);
    background-color: var(--shadow-lv1);

    svg {
      display: block;
    }
  }
`;

export const BuyIcon = styled(CartAdd)`
  cursor: pointer;
  display: none;
  height: 30px;
  width: 30px;

  position: absolute;
  left: 1%;
  top: 1%;

  &:hover {
    transform: scale(1.1);
  }

  transition: all 200ms ease;
`;
