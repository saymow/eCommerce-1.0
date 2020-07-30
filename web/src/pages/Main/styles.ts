import styled from "styled-components";

import backgroundImage from "../../Assets/background.jpeg";

export const Container = styled.div`
  z-index: -1;
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export const MainContent = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100%;
  max-width: 1360px;
  padding: 1.5rem;
  margin: auto;
`;

export const Content = styled.div`
  max-width: 60%;

  h1,
  p {
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
  width: 100%;
`;

export const ContentWrapper = styled.div`
  box-shadow: 3px 3px 20px var(--primary);
  padding: 15rem 0;
  width: 100%;
  background-color: #fff;
`;

export const ContentElement = styled.div`
  width: 100%;
  max-width: 1360px;
  margin: auto;
  padding: 0 5rem;
`;

export const Separetor = styled.div`
  height: 20rem;
  background-color: transparent;
`;

export const AboutUs = styled.section`
  width: 100%;
  max-width: 560px;
  color: var(--primary);

  h2 {
    margin-bottom: 2rem;
    font-size: 4rem;
  }

  p {
    font-weight: 500;
    font-size: 1.6rem;
  }
`;
