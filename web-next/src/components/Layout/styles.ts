import styled, { css } from "styled-components";

import { Props } from "./index";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const boundedContent = css`
  margin: 10rem auto;
  padding: 1.5rem;

  width: 100%;
  max-width: 1360px;
`;

export const Content = styled.main<Props>`
  flex-grow: 1;

  ${({ unboundedContent }) => !unboundedContent && boundedContent}
`;
