import styled, { css } from "styled-components";

import {
  FacebookSquare,
  Instagram,
  Whatsapp,
  Twitter,
  LinkedinSquare,
  Youtube,
} from "styles/icons";

export const Container = styled.footer`
  width: 100%;
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterContainer = styled.div`
  margin: 2rem 0;
  width: 100%;
  max-width: 1360px;
  display: flex;
  flex-direction: column;

  font-size: 1.3rem;
`;

export const Main = styled.main`
  display: grid;
  grid-template-columns: 3fr 1fr;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    grid-template-rows: 3fr 1fr;
  }
`;

export const Source = styled.div`
  height: 5rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  > div {
    text-align: center;
    > p {
      color: var(--background-primary);
      line-height: 1.8rem;

      strong {
        color: var(--background-primary);
      }
    }
  }
`;

export const Infomation = styled.div`
  display: flex;
  justify-content: space-evenly;

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const Title = styled.h2`
  color: var(--background-primary);
  line-height: 4rem;
  text-transform: uppercase;
`;

export const Location = styled.div`
  p {
    color: var(--background-primary);
  }
`;

export const Menu = styled.ul`
  list-style: none;

  display: flex;
  flex-direction: column;

  > li {
    color: var(--background-primary);
    cursor: pointer;
    text-decoration: underline;
    line-height: 2.2rem;
  }
`;

export const RecentReleases = styled.div`
  p {
    color: var(--background-primary);
  }
`;

export const Contact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 640px) {
    margin-top: 2rem;
    align-items: center;
  }
`;

export const SignUpForm = styled.form`
  display: flex;
  margin: 0.5rem 0 1.5rem 0;
`;

export const Input = styled.input`
  width: 60%;

  font-size: 1.4rem;
  padding: 1rem;
`;

export const Button = styled.button`
  cursor: pointer;
  font-weight: bold;
  padding: 1rem;

  color: var(--background-primary);
  background-color: #c44445;
  box-shadow: 1px 1px 3px #000;

  transition: filter 200ms ease;

  &:hover {
    filter: brightness(80%);
  }
`;

const IconsStyles = css`
  cursor: pointer;
  height: 25px;
  width: 25px;

  fill: var(--background-primary);

  transition: transform 200ms ease;

  &:hover {
    transform: scale(1.2);
  }
`;

export const Icons = styled.div``;

export const FacebookIcon = styled(FacebookSquare)`
  ${IconsStyles}
`;

export const InstagramIcon = styled(Instagram)`
  ${IconsStyles}
`;

export const WhatsappIcon = styled(Whatsapp)`
  ${IconsStyles}
`;

export const TwitterIcon = styled(Twitter)`
  ${IconsStyles}
`;

export const LinkedinIcon = styled(LinkedinSquare)`
  ${IconsStyles}
`;

export const YoutubeIcon = styled(Youtube)`
  ${IconsStyles}
`;
