import styled, { css } from "styled-components";
import { Form as FormikForm } from "formik";

import { EmailOutline, LockPassword, UserPlus } from "../../Styles/icons";

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
  margin: 1.1rem;
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

export const SignUpIcon = styled(UserPlus)`
  padding-bottom: 0.3rem;
  width: 2rem;
  height: 2rem;
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
