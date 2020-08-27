import styled from "styled-components";

import { DeleteBack2 } from "../../Styles/icons";
import { Button as DefaultButton } from "../../Styles/utils";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 1rem;
  height: 42rem;

  @media (max-width: 580px) {
  }
`;

export const CartProducts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: auto;
  padding-right: 1rem;

  border-right: 1px solid var(--primary);

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--primary);
    border-radius: 4px;
  }
`;

export const CartProduct = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin: 0.5rem 0;

  border: 1px solid var(--primary);

  div > a > img {
    display: block;
    height: 8rem;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;

    width: 70%;
    margin: 1rem auto;

    div > a > img {
      width: 100%;
      height: 100%;
    }
  }

  div:last-child {
    padding: 0.5rem;

    > p {
      font-size: 1.6rem;

      strong {
        margin-right: 0.2rem;
      }
    }

    > span {
      position: absolute;
      bottom: 5px;
      right: 5px;
    }
  }
`;

export const ModalOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;

  div > h1 {
    font-size: 2.5rem;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Button = styled(DefaultButton)`
  margin-top: 2rem;
`;

export const DeleteIcon = styled(DeleteBack2)`
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
`;
