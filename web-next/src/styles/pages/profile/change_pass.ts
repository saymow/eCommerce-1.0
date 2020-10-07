import styled from "styled-components";

import { LockPassword } from "styles/icons";
import { Button as DefaultButton } from "styles/utils";

export const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.main`
  position: relative;

  width: 90%;
  max-width: 40rem;
  margin: 1rem;
  padding: 1rem 2rem;

  border: 1px solid var(--shadow-lv2);
  border-radius: 0.5rem;

  > form {
    margin: 3rem 0;
  }
`;

export const Text = styled.div`
  h1 {
    font-size: 2.7rem;
    margin-bottom: 1.2rem;
  }
  p {
    font-size: 1.4rem;
    margin-top: 0.6rem;
    color: var(--secondary);
  }
`;

export const FieldSet = styled.div`
  margin: 1.9rem 0;
`;

export const PassIcon = styled(LockPassword)`
  position: absolute;
  display: block;
  border-right: 2px solid var(--shadow-lv1);
  width: 4.2rem;
  height: 4.2rem;
`;

export const Button = styled(DefaultButton)`
  margin-top: 2rem;
  background: var(--brand);
`;
