import styled from "styled-components";

import { DeleteBack2 } from "../../Styles/icons";

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
  width: 100%;
  max-width: 1080px;
  height: 540px;
  border-radius: 0.5rem;
  display: grid;
  grid-template-columns: ${(props) =>
    props.onlyRightSide ? "1fr 3fr" : "9fr 11fr"};
  padding: 1rem;
  color: var(--primary);
`;

export const ProductRelated = styled.div`
  display: grid;
  grid-template-rows: 9fr 1fr;
  overflow: hidden;
`;

export const TotalPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Products = styled.div`
  overflow: auto;
  padding: 0 1rem;
  background-color: rgba(0, 0, 0, 0.02);

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

  border: 1px solid var(--primary);
  margin-bottom: 1.5rem;

  div > a > img {
    display: block;
    max-height: 120px;
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
