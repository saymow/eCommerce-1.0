import styled from "styled-components";
import { LocalShipping } from "@styled-icons/material";

interface ShowOptions {
  trigger: boolean;
}

interface ShippingSelf {
  selected: boolean;
}

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: space-evenly;

  > div > h1 {
    text-align: center;
    margin: 2rem 0;
    font-size: 3rem;
  }

`;

export const TitleDiv = styled.div<ShowOptions>`
  height: 30%;
  transform: scale(${(props) => (props.trigger ? "0" : "1")});
  transition: transform 200ms ease;
`;

export const Form = styled.form<ShowOptions>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: ${(props) => (props.trigger ? "0" : "auto")};
  margin-bottom: 3rem;

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

  transition: all 200ms ease;

  &:hover {
    background-color: transparent;
    color: var(--primary);
  }
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
  padding: 0.5rem;
  margin: 0.5rem;
  font-size: 1.4rem;

  border: 1px solid ${(props) => (props.selected ? "#0f0" : "var(--primary)")};
  transform: scale(${(props) => (props.selected ? 1.1 : 1)});

  strong {
    color: ${(props) => (props.selected ? "#57a873" : "inherit")};
  }

  transition: all 200ms ease;

  margin-bottom: 0.5rem;
`;

export const ShippingIcon = styled(LocalShipping)`
  width: 30px;
  height: 30px;
`;

export const Continue = styled.div<ShowOptions>`
  width: 70%;
  margin: 3rem 0;

  transform: scale(${(props) => (props.trigger ? 1 : 0)});

  transition: transform 200ms ease;
`;
