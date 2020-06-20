import styled from "styled-components";

import backgroundImage from "../../assets/background.jpeg";

export const Container = styled.div`
  width: 100%;
  margin: auto;
  max-width: 1360px;
  padding: 1.5rem;
`;

export const MainContent = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

export const Img = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;

  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: brightness(40%);
`;

export const Content = styled.div`
  max-width: 75rem;

  h1, p {
    text-shadow: 2px 2px #000;
    color: var(--background);
  }

  h1 {
    line-height: 10rem;
    font-size: 6rem;
  }

  p {
    font-size: 2.5rem;
    line-height: 3.5rem;
  }
`;

export const AditionalContent = styled.div`
`;