import styled from "styled-components";
import { DeleteBack2 } from "@styled-icons/remix-line";


export const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 1rem;
  height: 420px;
  width: 620px;
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
  margin: .5rem 0;

  border: 1px solid var(--primary);

  div > a > img {
    display: block;
    max-height: 80px;
    height: 100%;
    width: 100%;
  }

  div:last-child > p {
    font-size: 1.6rem;
  } 

  div:last-child > span {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }

  div:last-child {
    padding: .5rem;
  }

  div:last-child > p > strong {
    margin-right: .2rem;
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
  flex-direction:column;
`;

export const Button = styled.button`
  cursor: pointer;
  margin-top: 2rem;
  padding: 1rem;
  background-color: var(--primary);
  color: #fff;
  border: 1px solid var(--primary);

  transition: all 200ms ease;

  &:hover {
    background-color: #fff;
    color: var(--primary);
  }
`;

export const DeleteIcon = styled(DeleteBack2)`
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
`;