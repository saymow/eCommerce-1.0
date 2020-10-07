import styled from "styled-components";

import { User, UserPlus } from "styles/icons";

export const Container = styled.main`
  position: relative;
  max-width: 56rem;
  width: 90%;
  padding: 2rem 1rem 7rem 1rem;
  background-color: var(--shadow-lv1);
  margin: auto;

  border-radius: 0.5rem;
`;

export const UserDefaultImage = styled.div`
  position: relative;
  margin: 1rem auto 2rem auto;

  width: 20rem;
  height: 20rem;
  background: #b8bbc1;
  border-radius: 50%;
`;

export const SignInContainer = styled.div`
  margin: 1rem auto;
`;

export const UserIcon = styled(User)`
  position: absolute;

  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);

  width: 16rem;
  height: 16rem;
  color: rgba(230, 230, 230, 0.4);
`;

export const LinkWrapper = styled.span`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  cursor: pointer;
  font-size: 1.6rem;
  > a {
    text-decoration: none;
    color: var(--primary);
  }
`;

export const SignUpIcon = styled(UserPlus)`
  width: 2rem;
  height: 2rem;
  margin-right: 0.3rem;
`;
