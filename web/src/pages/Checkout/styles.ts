import styled from "styled-components";
import { DeleteBack2 } from "@styled-icons/remix-line";
import { LocalShipping } from "@styled-icons/material"

import { Transitions } from "../../Styles/globalStyles";

interface ShowOptions {
  trigger: boolean
}

interface ShippingSelf {
  selected: boolean;
}

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
  color: var(--primary);
`;

export const ProductRelated = styled.div`
  display: grid;
  grid-template-rows: 9fr 1fr;
  overflow: auto;
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
    padding: 0.5rem;
  }

  div:last-child > p > strong {
    margin-right: 0.2rem;
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

export const DeleteIcon = styled(DeleteBack2)`
  cursor: pointer;

  width: 25px;
  height: 25px;

  position: absolute;
  right: 5px;
  top: 5px;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > div > h1 {
    text-align: center;
    margin: 2rem 0;
    font-size: 3rem;
  }
`;

export const TitleDiv = styled.div<ShowOptions>`
  height: 30%;
  transform: scale(${props => props.trigger ? "0": "1"});
  transition: transform 200ms ease;
`;

export const Form = styled.form<ShowOptions>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: ${props => props.trigger ? "0" : "auto"};
  margin-bottom: 3rem;

  transition: all 200ms ease;

  > div:first-child {
    margin-top: 2rem;
  }

  > div:last-child {
    margin: 2rem 0;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 3rem;
  border-bottom: 1px solid var(--primary);
  background-color: transparent;
  outline: none;

  text-align: center;
`;

export const Button = styled.button`
  cursor: pointer;
  font-size: 2rem;
  width: 100%;
  background-color: var(--primary);
  border: 1px solid var(--primary);
  color: var(--background);
  padding: 1rem;
  border-radius: 0.5rem;
`;

export const Shipping = styled.div`
  margin-top: 1rem;
  width: 70%;
  display: flex;
  flex-direction: column;
`;

export const ShippingSelf = styled.div<ShippingSelf>`
  cursor: pointer;
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 2fr;
  padding: .5rem;
  margin: .5rem;
  font-size: 1.4rem;

  border: 1px solid ${props => props.selected ? "#0f0" : "var(--primary)"};
  transform: scale(${props => props.selected ? 1.1 : 1});

  strong {
    color: ${props => props.selected ? "#57a873" : "inherit"}
  }

  transition: all 200ms ease;

  margin-bottom: .5rem;
`;

export const ShippingIcon = styled(LocalShipping)`
  width: 30px;
  height: 30px;
`;


export const Continue = styled.div<ShowOptions>`
  width: 70%;
  margin: 2rem 0 3rem 0;

  transform: scale(${props => props.trigger ? 1 : 0});

  transition: transform 200ms ease;
`;