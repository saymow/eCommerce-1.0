import styled from "styled-components";

import { Button as DefaultButton } from "../../../Styles/utils";

export const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;

  padding: 0.5rem;
  border: 2px solid var(--primary);
  border-radius: 0.5rem;
  max-height: calc(1rem + 2rem + 20px);
`;

export const ErrorSpan = styled.span`
  opacity: 0;
  width: 80%;
  font-size: 1.2rem;
  color: #f00;
  background-color: rgba(255, 0, 0, 0.1);

  padding-left: 0.3rem;
  min-height: 1.6rem;
  border: 1px solid #f00;
  border-radius: 0.5rem 0.5rem 0 0;
  transition: all 200ms ease;

  &.show {
    opacity: 1;
  }
`;

export const Title = styled.h1`
  position: absolute;
  top: 10%;
  left: 15px;
  color: var(--primary);
  font-size: 3rem;
`;

export const Button = styled(DefaultButton)`
  position: absolute;
  bottom: 15px;
  right: 15px;

  margin: auto;
  width: 30%;
  margin-top: 1rem;
`;
