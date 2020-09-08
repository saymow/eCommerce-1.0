import styled from "styled-components";

import { EmojiSad } from "Styles/icons";

export const Container = styled.div`
  height: 100vh;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 4rem;

    span {
      font-weight: bold;
      border-right: 1px solid var(--primary);
      padding-right: 0.5rem;
      margin-right: 0.5rem;
    }
  }
`;

export const SadIcon = styled(EmojiSad)`
  margin: 2rem;

  width: 8rem;
  height: 8rem;

  fill: var(--brand);
`;
