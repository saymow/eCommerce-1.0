import styled from "styled-components";

import { User, UserPlus } from "../../Styles/icons";

export const Container = styled.div`
  margin: auto;
  width: 100%;
  max-width: 1360px;
  min-height: 100vh;
`;

export const AuthContainer = styled.main`
  position: relative;
  max-width: 560px;
  width: 90%;
  padding: 2rem 1rem 7rem 1rem;
  background-color: var(--shadow-lv1);
  margin: 10rem auto 0 auto;

  border-radius: 0.5rem;

  transition: background-color 200ms ease;

  &:hover {
    background-color: var(--shadow-lv2);
  }
`;

export const UserDefaultImage = styled.div`
  position: relative;
  margin: 1rem auto 2rem auto;

  width: 20rem;
  height: 20rem;
  background: #b8bbc1;
  border-radius: 50%;
`;

export const UserIcon = styled(User)`
  position: absolute;

  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);

  width: 16rem;
  height: 16rem;
  color: rgba(230, 230, 230, .4);
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
