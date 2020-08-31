import styled, { css } from "styled-components";
import { Form as formikForm } from "formik";

import {
  EmailOutline,
  User,
  DateRange,
  PermIdentity,
} from "../../../../Styles/icons";

import { Button as DefaultButton } from "../../../../Styles/utils";

export const Container = styled.main`
  padding: 2rem;

  background: var(--background-primary);
  border-radius: 1rem;
  box-shadow: var(--box-shadow);
`;

export const Form = styled(formikForm)`
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const InputDiv = styled.div`
  margin: 1rem 0;
`;

export const TwoInputsDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr;
  grid-gap: 1rem;

  &.inversed {
    grid-template-columns: 4fr 2fr !important;
  }
`;

export const Button = styled(DefaultButton)`
  margin-top: 2rem;
`;

const IconsCSS = css`
  position: absolute;
  display: block;
  border-right: 2px solid var(--shadow-lv1);
  width: 4.2rem;
  height: 4.2rem;
`;

export const EmailIcon = styled(EmailOutline)`
  ${IconsCSS}
`;
export const NameIcon = styled(User)`
  ${IconsCSS}
`;
export const DateIcon = styled(DateRange)`
  ${IconsCSS}
`;
export const CpfIcon = styled(PermIdentity)`
  ${IconsCSS}
`;
