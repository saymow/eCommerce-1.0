import styled, { css } from "styled-components";
import { Form as FormikForm } from "formik";

import { EmailOutline, LockPassword } from "../../Styles/icons";
import { Button as DefaultButton } from "../../Styles/utils";

export const Form = styled(FormikForm)`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputField = styled.div`
  margin: 1.1rem;
`;

export const Button = styled(DefaultButton)`
  margin-top: 2rem;
  width: 60%;
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

export const PasswordIcon = styled(LockPassword)`
  ${IconsCSS}
`;
