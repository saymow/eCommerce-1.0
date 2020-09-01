import styled from "styled-components";

import { AlertOctagon } from "../../Styles/icons";

interface AlertProps {
  isVisible: boolean;
}

export const Container = styled.div<AlertProps>`
  position: fixed;
  z-index: 100;
  top: 5%;
  right: 50%;
  transform: translateX(50%);

  height: 7rem;
  width: min(48rem, 80vw);
  border-radius: 0.5rem;
  box-shadow: var(--box-shadow);

  background: #feb403;

  display: ${({ isVisible }) => (isVisible ? "grid" : "none")};
  grid-template-columns: 1fr 5fr;
  
  opacity: ${({ isVisible }) => (isVisible ? "1" : "0")};

  transition: opacity 500ms ease, display 1000ms;

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

export const AlertIcon = styled(AlertOctagon)`
  width: 4.5rem;
  height: 4.5rem;

  fill: #fcdf91;
`;
