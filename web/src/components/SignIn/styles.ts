import styled, { css } from "styled-components";
import { Form as FormikForm } from "formik";

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

export const Form = styled(FormikForm)`
  width: 60%;
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
