import styled from "styled-components";

export const Container = styled.div`
  margin: auto;
  width: 100%;
  max-width: 1360px;
  height: calc(100vh + 6rem);
`;

export const ProfileWrapper = styled.section`
  width: 90%;
  margin: 12rem auto;
  height: min(80vh, 480px);
  padding: 1rem;

  border-radius: 0.5rem;

  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 1rem;
`;

export const ContentWrapper = styled.div`
  box-shadow: var(--box-shadow);
`;
