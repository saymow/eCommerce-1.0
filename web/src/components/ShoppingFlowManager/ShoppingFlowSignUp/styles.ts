import styled from "styled-components";

import { SignInAlt } from "../../../Styles/icons";

export const Container = styled.div`
  position: relative;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
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
