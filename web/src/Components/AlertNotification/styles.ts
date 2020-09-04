import styled, { css, keyframes } from "styled-components";

import { AlertOctagon } from "../../Styles/icons";
import { DoneAll } from "../../Styles/icons";

interface NotificationProps {
  type: "warning" | "success";
  delay: number;
}

const animation = keyframes``;

export const Container = styled.div<NotificationProps>`
  position: fixed;
  z-index: 100;
  top: 5%;
  right: 50%;
  transform: translateX(50%);

  height: 7rem;
  width: min(48rem, 80vw);
  border-radius: 0.5rem;
  box-shadow: var(--box-shadow);

  background: ${({ type }) => (type === "warning" ? "#feb403" : "#409d4b")};

  display: grid;
  grid-template-columns: 1fr 5fr;

  animation: ${animation} ${({ delay }) => delay} ease;

  div {
    display: flex;
    align-items: center;
  }

  div:first-child {
    justify-content: center;
  }

  div:last-child {
    background: rgba(0, 0, 0, 0.05);
    padding-left: 2rem;
    p {
      font-size: 1.6rem;
      color: #fff;
    }
  }
`;

const IconsCSS = css`
  width: 4.5rem;
  height: 4.5rem;
`;

export const AlertIcon = styled(AlertOctagon)`
  ${IconsCSS}
  fill: #fcdf91;
`;

export const SuccessIcon = styled(DoneAll)`
  ${IconsCSS}
  fill: #fff;
`;
