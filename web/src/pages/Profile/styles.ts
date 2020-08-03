import styled from "styled-components";

export const Container = styled.div`
  margin: auto;
  width: 100%;
  max-width: 1360px;
  min-height: 100vh;
`;

export const ProfileWrapper = styled.section`
  width: 90%;
  margin: 10% 5%;
  padding: 1rem;

  border-radius: 0.5rem;

  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 1rem;
`;
