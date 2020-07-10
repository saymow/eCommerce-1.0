import styled, { css } from "styled-components";
import { Form as FormikForm } from "formik";

import { EmailOutline } from "@styled-icons/evaicons-outline";
import { LockPassword } from "@styled-icons/remix-line";
import { SignInAlt } from "@styled-icons/fa-solid";

import { Button as DefaultButton } from "../../Styles/utils";

export const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Form = styled(FormikForm)`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputField = styled.div`
  margin: 1.2rem;
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

export const SignUpMessage = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;

  display: flex;
  align-items: center;

  cursor: pointer;
  font-size: 1.6rem;
  > a {
    text-decoration: none;
    color: var(--primary);
  }
`;

export const SignUpIcon = styled(SignInAlt)`
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 0.4rem;
`;
