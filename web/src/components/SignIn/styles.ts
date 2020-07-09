import styled, { css } from "styled-components";
import { EmailOutline } from "@styled-icons/evaicons-outline";
import { LockPassword } from "@styled-icons/remix-line";

import { Button as DefaultButton } from "../../Styles/utils";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  width: 60%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputDiv = styled.div`
  position: relative;
  margin: 1.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.input`
  background-color: transparent;
  font-size: 2.6rem;
  padding: 0.5rem 1rem 0.5rem 4.7rem;
  color: var(--primary);
  outline: 0;
  border: 2px solid var(--primary);
  border-radius: 0.5rem;

  &.haveError {
    border-color: #f00;

    ~ svg {
      border-color: #f00;
    }
  }

  &.haveNoErrors:focus {
    border-color: #0f0;

    ~ svg {
      border-color: #0f0;
    }
  }

  &.haveError:focus ~ span,
  &.haveError:hover ~ span {
    opacity: 1;
  }
`;

export const Button = styled(DefaultButton)`
  margin-top: 2rem;
  width: 60%;
`;

const IconsCSS = css`
  position: absolute;
  display: block;
  border-right: 2px solid var(--primary);
  width: 4.2rem;
  height: 4.2rem;
`;

export const EmailIcon = styled(EmailOutline)`
  ${IconsCSS}
`;
export const PasswordIcon = styled(LockPassword)`
  ${IconsCSS}
`;

export const ErrorSpan = styled.span`
  position: absolute;
  opacity: 0;
  top: -2rem;
  height: 1.8em;
  width: 100%;
  padding: 0.2rem;

  font-size: 1.2rem;
  color: #f00;
  background-color: rgba(255, 0, 0, 0.1);

  border: 1px solid #f00;
  border-radius: 0.5rem 0.5rem 0 0;

  transition: opacity 200ms ease;
`;
