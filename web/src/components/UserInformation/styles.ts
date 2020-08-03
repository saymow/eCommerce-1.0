import styled from "styled-components";

export const Container = styled.section`
  display: grid;
  grid-template-rows: 70% 30%;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "info progress"
    "edit edit";
  padding: 0 1rem;
`;

export const Info = styled.main`
  grid-area: info;
  display: grid;
  grid-template-columns: 1fr 1fr;

  box-shadow: var(--box-shadow);

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
`;

export const Item = styled.div`
  padding: 1rem 0;
  font-size: 1.4rem;

  p:first-child {
    font-weight: 500;
  }
`;

export const InfoProgress = styled.div`
  grid-area: progress;

  box-shadow: var(--box-shadow);
`;

export const ChangeData = styled.div`
  grid-area: edit;

  box-shadow: var(--box-shadow);
`;
