import styled from "styled-components";

import { Error } from "../../Styles/icons";

export const Container = styled.div`
  height: min(48rem, 75vh);

  background: var(--background-primary);
  border-radius: 1rem;
  box-shadow: var(--box-shadow);

  display: grid;
  grid-template-rows: 4.5fr 1fr;
`;

export const ErrorBody = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ErrorIcon = styled(Error)`
  width: 12rem;
  height: 12rem;

  fill: #f00;
`;

export const Content = styled.main`
  h1,
  p {
    text-align: center;
  }

  h1 {
    margin: 3rem 0 1.5rem 0;
    font-weight: 500;
    font-size: 4rem;
  }

  p {
    font-weight: 300;
    font-size: 3rem;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  width: 100%;
  height: 100%;
  outline: 0;
  border: 0;

  font-size: 3rem;
  color: #fff;
  background: #f00;

  border-radius: 0 0 1rem 1rem;
`;
