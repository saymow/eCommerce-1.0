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
  margin: 8rem auto;
  width: 100%;
`;

export const ProductList = styled.div`
  margin: auto;
  width: 100%;
  max-width: 860px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-gap: 5rem;
`;

export const ProductSelf = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 280px;

  color: var(--primary);
  background: #fff;

  transition: all 200ms ease;

  cursor: context-menu;

  > img {
    cursor: pointer;
    height: 180px;
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
    filter: brightness(95%);
  }

  &:hover svg {
    display: block;
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
