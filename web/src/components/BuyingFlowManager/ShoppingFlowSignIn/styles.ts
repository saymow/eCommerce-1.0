import styled from "styled-components";

import { UserPlus } from "../../../Styles/icons";


export const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
