import styled from "styled-components";

import { Button as DefaultButton } from "../../../Styles/utils";
import { LogOut } from "../../../Styles/icons";

export const Container = styled.section`
  position: relative;
  height: 100%;

  display: grid;
  grid-template-rows: 7fr 3fr;
  grid-template-columns: 3fr 2fr;
  grid-template-areas:
    "info progress"
    "edit edit";

  @media (max-width: 600px) {
    grid-template-areas: "info" "progress" "edit";
    grid-template-columns: unset;
    grid-template-rows: 1fr 0.7fr 0.5fr;
  }
`;

export const Info = styled.main`
  grid-area: info;
  display: grid;
  grid-template-columns: 1fr 1fr;

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
  width: max(14.5rem, 25%);
`;

export const LogoutButton = styled(LogOut)`
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;

  fill: var(--brand);
  height: 3rem;
  width: 3rem;
`;
