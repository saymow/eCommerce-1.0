import styled, { css } from "styled-components";
import { Form as FormikForm } from "formik";

import { Button as DefaultButton } from "../../Styles/utils";

import { EmailOutline } from "@styled-icons/evaicons-outline";
import { LockPassword } from "@styled-icons/remix-line";
import { User } from "@styled-icons/boxicons-regular";
import { DateRange } from "@styled-icons/material";
import { PermIdentity } from "@styled-icons/material-sharp";
import { SignInAlt } from "@styled-icons/fa-solid";

export const Container = styled.div`
  position: relative;
  height: 100%;
`;

export const Form = styled(FormikForm)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

export const InputField = styled.div`
  width: 65%;
  margin: 1.2rem;
`;

const IconsCSS = css`
  position: absolute;
  display: block;
  border-right: 2px solid var(--primary);
  width: 4.2rem;
  height: 4.2rem;
`;

export const UserIcon = styled(User)`
  ${IconsCSS}
`;

export const EmailIcon = styled(EmailOutline)`
  ${IconsCSS}
`;

export const PasswordIcon = styled(LockPassword)`
  ${IconsCSS}
`;

export const IdIcon = styled(PermIdentity)`
  ${IconsCSS}
`;

export const DateIcon = styled(DateRange)`
  ${IconsCSS}
`;

export const TwoInputsField = styled.div`
  margin: 1.2rem;
  width: 65%;
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 0.5rem;
`;

export const Button = styled(DefaultButton)`
  margin-top: 1rem;
  width: 40%;
`;

export const LinkWrapper = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;
  font-size: 1.6rem;
  > a {
    text-decoration: none;
    color: var(--primary);
  }
`;

export const LoginIcon = styled(SignInAlt)`
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 0.4rem;
`;
