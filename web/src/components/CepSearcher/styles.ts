import styled from "styled-components";
import { LocalShipping } from "@styled-icons/material";

interface ShowOptions {
  trigger: boolean;
}

interface ShippingSelf {
  selected: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  transition: all 2000ms ease;
`;

export const TitleDiv = styled.div<ShowOptions>`
  text-align: center;
  font-size: 1.5rem;
  margin-top: 1rem;

  height: ${(props) => (props.trigger ? "0" : "unset")};
  flex-grow: ${(props) => (props.trigger ? "0" : "1")};
  visibility: ${(props) => (props.trigger ? "hidden" : "visible")};
  transform: scaleY(${(props) => (props.trigger ? "0" : "1")});
  transition: all 200ms ease;
`;

export const Form = styled.form<ShowOptions>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

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
  transform: translateY(${(props) => (props.selected ? "-3px" : "0px")});
  transform: scale(${(props) => (props.selected ? 1.02 : 1)});

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

  transform: scaleY(${(props) => (props.trigger ? 1 : 0)});

  transition: transform 200ms ease;
`;
