import { Form as FormikForm } from "formik";

import { Button as DefaultButton } from "../../Styles/utils";

import styled, { css } from "styled-components";

import {
  EmailOutline,
  LockPassword,
  User,
  DateRange,
  PermIdentity,
} from "../../Styles/icons";

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
