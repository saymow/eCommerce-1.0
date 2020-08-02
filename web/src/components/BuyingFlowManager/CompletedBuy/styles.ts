import styled from "styled-components";

import { DoneAll } from "../../../Styles/icons";

export const Container = styled.div`
  height: 100%;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CheckMarkIcon = styled(DoneAll)`
  fill: #0f0;
  width: 45%;
`;

export const Text = styled.p`
  margin: 2rem;

  font-size: 1.8rem;
  text-align: center;

  > a {
    font-weight: 600;
    text-decoration: none;
    color: var(--brand);
  }
`;
