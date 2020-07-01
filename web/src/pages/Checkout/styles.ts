import styled from "styled-components";

import { Transitions } from "../../Styles/globalStyles";

export const Container = styled(Transitions)`
  margin: 6rem auto 0 auto;
  width: 100%;
  max-width: 1360px;
  height: 100vh;
`;

export const CheckoutConainer = styled.div`
  margin: 8rem auto;
  background-color: rgb(245, 245, 245);
  width: 100%;
  max-width: 1080px;
  height: 540px;
  border-radius: 0.5rem;
  display: grid;
  grid-template-columns: 9fr 11fr;
  padding: 1rem;
`;

export const Products = styled.div`
  overflow: auto;
  padding: 0 1rem;
  background-color: rgba(0,0,0, .02);

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--primary);
    border-radius: 4px;
  }
`;

export const Product = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2fr;

  border: 1px solid var(--primary);
  margin-bottom: 1.5rem;

  div > a > img {
    display: block;
    max-height: 120px;
    height: 100%;
    width: 100%;
  }
  
  div:last-child {
    padding: .5rem;
  }

  div:last-child > p > strong {
    margin-right: .2rem;
  }

  div:last-child > p {
    font-size: 2rem;
  }

  div:last-child span {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
`;

export const Information = styled.div``;
