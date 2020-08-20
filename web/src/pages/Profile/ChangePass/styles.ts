import styled from "styled-components";

import { LockPassword } from "../../../Styles/icons";
import { Button as DefaultButton } from "../../../Styles/utils";

export const Container = styled.div`
  box-shadow: var(--box-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PassIcon = styled(LockPassword)`
  position: absolute;
  display: block;
  border-right: 2px solid var(--shadow-lv1);
  width: 4.2rem;
  height: 4.2rem;
`;

export const FormContainer = styled.main`
  position: relative;

  max-width: 360px;
  margin: 1rem;
  padding: 1rem 2rem;

  border: 1px solid var(--shadow-lv2);
  border-radius: 0.5rem;

  > form {
    margin: 2.2rem 0;
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -3rem;

    width: 1rem;
    height: 6rem;
    border-radius: 1rem;
    background: var(--brand);
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    right: -3rem;

    width: 1rem;
    height: 6rem;
    border-radius: 1rem;
    background: var(--brand);
  }
`;

export const Text = styled.div`
  h1 {
    font-size: 2.7rem;
  }
  p {
    margin-top: 0.6rem;
    color: var(--secondary);
    font-size: 1.3rem;
  }
`;

export const FieldSet = styled.div`
  margin: 1.9rem 0;
`;

export const Button = styled(DefaultButton)`
  margin-top: 2rem;
  background: var(--brand);
`;
