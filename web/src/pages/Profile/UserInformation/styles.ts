import styled from "styled-components";

import { Button as DefaultButton } from "../../../Styles/utils";

export const Container = styled.section`
  display: grid;
  grid-template-rows: 70% 30%;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "info progress"
    "edit edit";

  box-shadow: var(--box-shadow);
`;

export const Info = styled.main`
  grid-area: info;
  display: grid;
  grid-template-columns: 1fr 1fr;

  /* box-shadow: var(--box-shadow); */

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    padding: 1rem;
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

  border-left: 1px solid var(--shadow-lv2);
`;

export const ChangeData = styled.div`
  grid-area: edit;

  border-top: 1px solid var(--shadow-lv2);

  padding: 0 2rem;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  div:first-child {
    display: flex;
    align-items: center;

    label {
      font-size: 1.4rem;
      font-weight: 500;
      margin-left: 0.6rem;
    }
  }
`;

export const Button = styled(DefaultButton)`
  background: var(--brand);
  width: 25%;
`;
